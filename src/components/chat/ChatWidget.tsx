"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X, PawPrint, Send } from "lucide-react";
import type { ChatMessage } from "@/types";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "היי! אני העוזר הווירטואלי של E.K.PACK. אפשר לשאול אותי על השירותים, המחירים, שעות הפעילות ועוד.",
};

// ממיר /services/slug בתוך טקסט לקישור לחיץ
function renderContent(text: string) {
  const parts = text.split(/(\/services\/[a-z-]+)/g);
  return parts.map((part, i) =>
    part.startsWith("/services/") ? (
      <a key={i} href={part} className="text-brand-green underline">
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.filter((m) => m !== WELCOME),
        }),
      });
      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "מצטער, אירעה תקלה. אנא נסו שוב או פנו אלינו ב-WhatsApp.",
        };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* כפתור פתיחה */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "סגור צ'אט" : "פתח צ'אט"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transition-transform hover:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed bottom-24 right-5 z-40 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* כותרת */}
            <div className="flex items-center gap-2 bg-brand-blue px-4 py-3 text-white">
              <PawPrint className="h-5 w-5" aria-hidden="true" />
              <span className="font-bold">עוזר E.K.PACK</span>
            </div>

            {/* הודעות */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-brand-green text-white"
                        : "bg-brand-cream text-foreground"
                    }`}
                  >
                    {m.content ? renderContent(m.content) : "..."}
                  </div>
                </div>
              ))}
            </div>

            {/* קלט */}
            <div className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="הקלידו שאלה..."
                aria-label="הודעה לצ'אט"
                className="flex-1 rounded-full border border-border px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading}
                aria-label="שלח"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white disabled:opacity-50"
              >
                <Send className="h-4 w-4 -scale-x-100" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
