"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";

type ChatApiResponse = {
  sessionId: string;
  assistantMessage: ChatMessage;
  userMessage: ChatMessage;
};

function getOrCreateSessionId() {
  const stored = window.localStorage.getItem("krishi-chat-session-id");

  if (stored) {
    return stored;
  }

  const created = `chat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  window.localStorage.setItem("krishi-chat-session-id", created);
  return created;
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ChatAssistant() {
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = getOrCreateSessionId();
    setSessionId(id);

    async function loadHistory() {
      const response = await fetch(`/api/chat?sessionId=${encodeURIComponent(id)}`);
      const data = (await response.json()) as { messages?: ChatMessage[] };
      setMessages(data.messages ?? []);
      setLoadingHistory(false);
    }

    void loadHistory();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const suggestions = useMemo(
    () => [
      "What products do you have?",
      "Price of tomatoes?",
      "What is my latest order status?",
      "What payment methods are available?",
    ],
    [],
  );

  async function sendChat(customMessage?: string) {
    const outgoing = (customMessage ?? message).trim();

    if (!outgoing || !sessionId) {
      return;
    }

    setError("");
    setTyping(true);

    const optimisticMessage: ChatMessage = {
      id: `tmp-${Date.now()}`,
      sessionId,
      role: "user",
      content: outgoing,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, optimisticMessage]);
    setMessage("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        message: outgoing,
      }),
    });

    const data = (await response.json()) as ChatApiResponse & { error?: string };
    setTyping(false);

    if (!response.ok || !data.assistantMessage || !data.userMessage) {
      setError(data.error ?? "Unable to send message right now.");
      setMessages((current) => current.filter((item) => item.id !== optimisticMessage.id));
      return;
    }

    setMessages((current) => [
      ...current.filter((item) => item.id !== optimisticMessage.id),
      data.userMessage,
      data.assistantMessage,
    ]);
  }

  return (
    <div className="surface-card overflow-hidden">
      <div className="border-b border-brand-100 bg-brand-50/70 px-5 py-4">
        <p className="text-lg font-extrabold text-emerald-950">Krishi Bazaar Assistant</p>
        <p className="mt-1 text-sm text-ink-600">
          Ask about products, prices, orders, or general website questions.
        </p>
      </div>

      <div className="space-y-4 bg-[#f6fbf6] px-4 py-5 sm:px-5">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void sendChat(suggestion)}
              className="rounded-full border border-brand-100 bg-white px-3 py-2 text-xs font-medium text-ink-600 hover:border-brand-300 hover:text-brand-700"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="h-[460px] overflow-y-auto rounded-2xl border border-brand-100 bg-white p-4">
          {loadingHistory ? (
            <div className="text-sm text-ink-500">Loading chat history...</div>
          ) : messages.length ? (
            <div className="space-y-4">
              {messages.map((chatMessage) => (
                <div
                  key={chatMessage.id}
                  className={`flex ${chatMessage.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      chatMessage.role === "user"
                        ? "bg-brand-600 text-white"
                        : "border border-brand-100 bg-brand-50/60 text-ink-800"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm leading-6">{chatMessage.content}</p>
                    <p
                      className={`mt-2 text-[11px] ${
                        chatMessage.role === "user" ? "text-white/80" : "text-ink-400"
                      }`}
                    >
                      {formatTime(chatMessage.createdAt)}
                    </p>
                  </div>
                </div>
              ))}

              {typing ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-ink-600">
                    Krishi Bazaar Assistant is typing...
                  </div>
                </div>
              ) : null}
              <div ref={scrollRef} />
            </div>
          ) : (
            <div className="text-sm text-ink-500">
              No messages yet. Start with a question about products, prices, orders, or support.
            </div>
          )}
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void sendChat();
          }}
          className="flex gap-3"
        >
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="input-shell flex-1"
            placeholder="Type your message..."
          />
          <button type="submit" disabled={!message.trim() || typing} className="primary-button disabled:opacity-60">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
