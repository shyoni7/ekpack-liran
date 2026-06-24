import Anthropic from "@anthropic-ai/sdk";

// Server-only Claude client. Never import this into a client component.
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// סוכן ה-AI משתמש ב-Haiku — מהיר וחסכוני, מספיק לשאלות שירות לקוחות.
export const CHAT_MODEL = "claude-haiku-4-5-20251001";
