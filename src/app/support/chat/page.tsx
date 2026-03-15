"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Heart } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "user" | "counselor";
  time: string;
}

const counselorResponses = [
  "I hear you, and I want you to know that you're not alone in this. I'm here with you.",
  "Thank you for reaching out. That took courage. Can you tell me more about what you're experiencing right now?",
  "It sounds like you're going through something really difficult. Your feelings are completely valid.",
  "I'm here to listen and support you. Take your time — there's no rush.",
  "You're safe here. Whatever you share with me stays between us.",
  "I understand this is hard. Let's take this one step at a time together.",
];

let responseIndex = 0;

export default function SupportChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      text: "Hello, I'm here to support you. This is a safe, confidential space. How are you feeling right now?",
      sender: "counselor",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = counselorResponses[responseIndex % counselorResponses.length];
      responseIndex++;
      const counselorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "counselor",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };
      setTyping(false);
      setMessages((prev) => [...prev, counselorMsg]);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#0F172A" }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-5 pb-4 flex-shrink-0"
        style={{ borderBottom: "1px solid #1E293B" }}
      >
        <Link
          href="/support"
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#1E293B" }}
        >
          <ArrowLeft size={20} color="#94A3B8" />
        </Link>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)" }}
        >
          <Heart size={18} color="white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold" style={{ color: "#F8FAFC" }}>
            Support Counselor
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs" style={{ color: "#4ADE80" }}>
              Online · Confidential
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className="max-w-[80%] px-4 py-3 rounded-2xl"
              style={{
                backgroundColor:
                  msg.sender === "user" ? "#7C3AED" : "#1E293B",
                borderBottomRightRadius: msg.sender === "user" ? "4px" : "16px",
                borderBottomLeftRadius: msg.sender === "counselor" ? "4px" : "16px",
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "#F8FAFC" }}>
                {msg.text}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: msg.sender === "user" ? "#C4B5FD" : "#64748B" }}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start animate-fade-in">
            <div
              className="px-4 py-3 rounded-2xl"
              style={{ backgroundColor: "#1E293B", borderBottomLeftRadius: "4px" }}
            >
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#A78BFA",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick Responses */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0">
        {["I'm feeling anxious", "I need help", "I'm scared", "I'm not okay"].map((quick) => (
          <button
            key={quick}
            onClick={() => setInput(quick)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: "#1E293B", color: "#A78BFA", border: "1px solid #7C3AED40" }}
          >
            {quick}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid #1E293B" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message…"
          className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none"
          style={{
            backgroundColor: "#1E293B",
            border: "1px solid #334155",
            color: "#F8FAFC",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95"
          style={{
            background: input.trim() ? "linear-gradient(135deg, #7C3AED, #A78BFA)" : "#1E293B",
          }}
        >
          <Send size={18} color={input.trim() ? "white" : "#475569"} />
        </button>
      </div>
    </div>
  );
}
