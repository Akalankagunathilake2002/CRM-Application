"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Bot,
  CalendarDays,
  Loader2,
  MessageCircle,
  Rocket,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import api from "@/lib/api";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const quickActions = [
  {
    label: "Book a demo",
    icon: CalendarDays,
    prompt:
      "Explain what I should show in a CRM demo video for this assessment.",
  },
  {
    label: "CRM features",
    icon: Sparkles,
    prompt: "What are the main features of this CRM project?",
  },
  {
    label: "Get started",
    icon: Rocket,
    prompt: "How do I get started using this CRM system?",
  },
  {
    label: "Tech stack",
    icon: Bot,
    prompt: "Explain the tech stack used in this CRM project.",
  },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "👋 Want help with LeadFlow CRM? I’m an AI chatbot here to explain features, demo flow, login, dashboard, leads, and notes.",
    },
    {
      role: "assistant",
      content: "Ask me anything or select an option below.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const visibleHistory = messages.filter(
    (item) => item.role === "user" || item.role === "assistant"
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const finalMessage = text || message;

    if (!finalMessage.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: finalMessage.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        message: finalMessage.trim(),
        history: visibleHistory.slice(-8),
      });

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error.response?.data?.message ||
            "Sorry, I could not connect to the AI service. Please check backend and Groq API key.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[80] flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-white shadow-2xl transition hover:scale-110 hover:bg-blue-600"
          aria-label="Open chatbot"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[90] w-[calc(100vw-32px)] max-w-[560px] overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-slate-950 px-6 py-5 text-white">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-950">
                <Bot size={30} />
                <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
              </div>

              <div>
                <h2 className="text-2xl font-black">LeadBot</h2>
                <p className="text-sm text-slate-300">
                  AI assistant for LeadFlow CRM
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-white transition hover:bg-white/10"
              aria-label="Close chatbot"
            >
              <X size={30} />
            </button>
          </div>

          <div className="max-h-[480px] overflow-y-auto bg-white px-6 py-5">
            <div className="space-y-4">
              {messages.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`flex gap-3 ${
                    item.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {item.role === "assistant" && (
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Bot size={20} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm font-medium leading-6 ${
                      item.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {item.content}
                  </div>

                  {item.role === "user" && (
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                      <UserRound size={18} />
                    </div>
                  )}
                </div>
              ))}

              {messages.length <= 2 && (
                <div className="grid grid-cols-2 gap-3 pl-12">
                  {quickActions.map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.label}
                        onClick={() => sendMessage(action.prompt)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-black text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                      >
                        <Icon size={16} />
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {loading && (
                <div className="flex justify-start gap-3">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Bot size={20} />
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">
                    <Loader2 size={16} className="animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
            <div className="mb-3 rounded-xl bg-white px-4 py-3 text-sm leading-6 text-slate-600">
              LeadBot can explain this CRM project, but AI-generated answers may
              be inaccurate. Check your code and README before submission.
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="h-12 flex-1 rounded-full border border-slate-300 bg-white px-5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500"
              />

              <button
                disabled={loading || !message.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}