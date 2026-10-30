import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X, Sparkles, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithAssistant } from "@/lib/ai-chat.functions";
import { toast } from "sonner";

interface Msg { role: "user" | "assistant"; content: string; }
const STORAGE = "acg:assistant:v1";
const SUGGESTIONS = [
  "What career suits a CS student who loves problem solving?",
  "Give me a 12-week roadmap for data science.",
  "How do I prepare for a software engineering interview?",
  "What should I put on my resume as a fresher?",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const chat = useServerFn(chatWithAssistant);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setMsgs(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(msgs));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next = [...msgs, { role: "user" as const, content: q }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await chat({ data: { messages: next } });
      setMsgs([...next, { role: "assistant", content: res.content }]);
    } catch (e: any) {
      toast.error(e?.message ?? "Assistant failed");
      setMsgs(next); // keep the user's msg
    } finally {
      setBusy(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-primary shadow-glow grid place-items-center text-white hover:scale-110 transition"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[min(400px,calc(100vw-2rem))] h-[min(600px,calc(100vh-8rem))] rounded-3xl bg-card border border-border shadow-glow overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-border bg-gradient-primary text-white flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/20 grid place-items-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold">AI Career Assistant</p>
                <p className="text-xs text-white/80">Ask about careers, roadmaps, interviews</p>
              </div>
              <button
                onClick={() => { setMsgs([]); localStorage.removeItem(STORAGE); }}
                className="ml-auto text-xs px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25"
              >Clear</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Try asking:</p>
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="w-full text-left text-sm px-3 py-2.5 rounded-xl border border-border hover:bg-muted transition"
                    >{s}</button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-gradient-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}>{m.content}</div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 rounded-2xl bg-muted text-sm inline-flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="p-3 border-t border-border flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                }}
                rows={1}
                placeholder="Ask anything about your career…"
                className="flex-1 resize-none max-h-24 px-3 py-2.5 rounded-xl bg-muted/60 border border-border text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-primary text-white disabled:opacity-40 shadow-soft"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
