import { anthropic, CHAT_MODEL } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/knowledge";
import type { ChatMessage } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 30;

// Rate limiting בסיסי בזיכרון
const hits = new Map<string, { count: number; resetAt: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  e.count += 1;
  return e.count > 20;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ error: "יותר מדי בקשות" }), {
      status: 429,
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "הסוכן אינו זמין כרגע. אנא פנו ב-WhatsApp." }),
      { status: 503 }
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return new Response(JSON.stringify({ error: "בקשה לא תקינה" }), {
      status: 400,
    });
  }

  // הגבלת אורך היסטוריה והודעות (הגנה מפני שימוש לרעה)
  const trimmed = messages.slice(-12).map((m) => ({
    role: m.role,
    content: String(m.content).slice(0, 2000),
  }));

  const system = await buildSystemPrompt();

  // Streaming response ל-client
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const claudeStream = await anthropic.messages.stream({
          model: CHAT_MODEL,
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: system,
              // caching של ה-system prompt — חוסך עלות בשיחות חוזרות
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: trimmed,
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch {
        controller.enqueue(
          encoder.encode("מצטער, אירעה תקלה. אנא נסו שוב או פנו אלינו ב-WhatsApp.")
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
