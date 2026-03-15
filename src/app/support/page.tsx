"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  PhoneCall,
  Heart,
  Shield,
  Wind,
  Sun,
  ChevronRight,
} from "lucide-react";

const supportOptions = [
  {
    id: "call",
    icon: <Phone size={26} color="#A78BFA" />,
    title: "Call a Counselor",
    description: "Speak directly with a trained support counselor",
    action: "Call Now",
    href: "tel:+18002738255",
    color: "#7C3AED",
    bgColor: "#1E1B4B",
    borderColor: "#7C3AED30",
  },
  {
    id: "chat",
    icon: <MessageCircle size={26} color="#34D399" />,
    title: "Chat with Support",
    description: "Text-based chat with a counselor — private and secure",
    action: "Start Chat",
    href: "/support/chat",
    color: "#10B981",
    bgColor: "#022C22",
    borderColor: "#10B98130",
  },
  {
    id: "callback",
    icon: <PhoneCall size={26} color="#60A5FA" />,
    title: "Request a Callback",
    description: "We'll call you back as soon as a counselor is available",
    action: "Request Call",
    href: "/support/callback",
    color: "#3B82F6",
    bgColor: "#0C1A2E",
    borderColor: "#3B82F630",
  },
];

const crisisTypes = [
  { icon: <Wind size={18} color="#A78BFA" />, label: "Panic attack", color: "#7C3AED" },
  { icon: <Heart size={18} color="#F472B6" />, label: "Emotional distress", color: "#EC4899" },
  { icon: <Shield size={18} color="#60A5FA" />, label: "Domestic violence", color: "#3B82F6" },
  { icon: <Sun size={18} color="#FCD34D" />, label: "Mental health crisis", color: "#EAB308" },
];

function BreathingExercise() {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [count, setCount] = useState(0);

  const startBreathing = () => {
    setPhase("inhale");
    setCount(4);

    let step = 0;
    const phases: Array<{ phase: "inhale" | "hold" | "exhale"; duration: number }> = [
      { phase: "inhale", duration: 4 },
      { phase: "hold", duration: 4 },
      { phase: "exhale", duration: 6 },
    ];

    const runPhase = (idx: number) => {
      if (idx >= phases.length * 3) {
        setPhase("idle");
        return;
      }
      const p = phases[idx % phases.length];
      setPhase(p.phase);
      setCount(p.duration);

      let c = p.duration;
      const t = setInterval(() => {
        c--;
        setCount(c);
        if (c <= 0) {
          clearInterval(t);
          step++;
          runPhase(step);
        }
      }, 1000);
    };

    runPhase(0);
  };

  const phaseText: Record<string, string> = {
    idle: "Tap to start",
    inhale: "Breathe in…",
    hold: "Hold…",
    exhale: "Breathe out…",
  };

  const phaseColor: Record<string, string> = {
    idle: "#64748B",
    inhale: "#A78BFA",
    hold: "#60A5FA",
    exhale: "#34D399",
  };

  return (
    <div
      className="p-4 rounded-2xl text-center"
      style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
    >
      <h3 className="text-sm font-bold mb-3" style={{ color: "#E2E8F0" }}>
        Breathing Exercise
      </h3>
      <button
        onClick={phase === "idle" ? startBreathing : undefined}
        className="w-24 h-24 rounded-full mx-auto flex flex-col items-center justify-center transition-all"
        style={{
          backgroundColor: `${phaseColor[phase]}15`,
          border: `2px solid ${phaseColor[phase]}`,
          transform: phase === "inhale" ? "scale(1.1)" : phase === "exhale" ? "scale(0.9)" : "scale(1)",
          transition: "all 1s ease-in-out",
        }}
      >
        <span className="text-2xl font-black" style={{ color: phaseColor[phase] }}>
          {phase !== "idle" ? count : ""}
        </span>
        <span className="text-xs font-medium mt-1" style={{ color: phaseColor[phase] }}>
          {phaseText[phase]}
        </span>
      </button>
      <p className="text-xs mt-3" style={{ color: "#64748B" }}>
        4-4-6 breathing technique to calm anxiety
      </p>
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen pb-6" style={{ backgroundColor: "#0F172A" }}>
      {/* Header */}
      <div
        className="px-4 pt-5 pb-5"
        style={{
          background: "linear-gradient(180deg, #0D0A1A 0%, #0F172A 100%)",
          borderBottom: "1px solid #7C3AED30",
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1E293B" }}
          >
            <ArrowLeft size={20} color="#94A3B8" />
          </Link>
          <div>
            <h1 className="text-lg font-black" style={{ color: "#C4B5FD" }}>
              Talk to Someone
            </h1>
            <p className="text-xs" style={{ color: "#64748B" }}>
              You are not alone. Help is here.
            </p>
          </div>
        </div>

        {/* Reassurance message */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E1B4B", border: "1px solid #7C3AED30" }}
        >
          <p className="text-sm font-semibold leading-relaxed" style={{ color: "#DDD6FE" }}>
            Whatever you&apos;re going through right now, you don&apos;t have to face it alone.
            Our counselors are here to listen, support, and help you through this.
          </p>
          <p className="text-xs mt-2" style={{ color: "#7C3AED" }}>
            All conversations are confidential and judgment-free.
          </p>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Crisis Types */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            We support people experiencing
          </p>
          <div className="grid grid-cols-2 gap-2">
            {crisisTypes.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 p-3 rounded-xl"
                style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
              >
                {c.icon}
                <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            How would you like support?
          </p>
          <div className="space-y-3">
            {supportOptions.map((opt) => (
              <Link
                key={opt.id}
                href={opt.href}
                className="flex items-center gap-4 p-4 rounded-2xl transition-all active:scale-95"
                style={{
                  backgroundColor: opt.bgColor,
                  border: `1.5px solid ${opt.borderColor}`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${opt.color}20` }}
                >
                  {opt.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "#F8FAFC" }}>
                    {opt.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                    {opt.description}
                  </p>
                </div>
                <ChevronRight size={18} color="#475569" />
              </Link>
            ))}
          </div>
        </div>

        {/* Breathing Exercise */}
        <BreathingExercise />

        {/* Crisis Hotlines */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h3 className="text-sm font-bold mb-3" style={{ color: "#E2E8F0" }}>
            Crisis Hotlines
          </h3>
          <div className="space-y-2">
            {[
              { name: "National Suicide Prevention", number: "988", color: "#A78BFA" },
              { name: "Crisis Text Line", number: "Text HOME to 741741", color: "#34D399" },
              { name: "Domestic Violence Hotline", number: "1-800-799-7233", color: "#F472B6" },
              { name: "SAMHSA Helpline", number: "1-800-662-4357", color: "#60A5FA" },
            ].map((h) => (
              <div key={h.name} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#E2E8F0" }}>
                    {h.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: h.color }}>
                    {h.number}
                  </p>
                </div>
                <a
                  href={`tel:${h.number.replace(/\D/g, "")}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${h.color}20` }}
                >
                  <Phone size={16} color={h.color} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Grounding technique */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: "#E2E8F0" }}>
            5-4-3-2-1 Grounding Technique
          </h3>
          <p className="text-xs mb-3" style={{ color: "#64748B" }}>
            Focus on your senses to calm anxiety:
          </p>
          {[
            { num: "5", text: "things you can SEE", color: "#A78BFA" },
            { num: "4", text: "things you can TOUCH", color: "#60A5FA" },
            { num: "3", text: "things you can HEAR", color: "#34D399" },
            { num: "2", text: "things you can SMELL", color: "#F472B6" },
            { num: "1", text: "thing you can TASTE", color: "#FCD34D" },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-3 py-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                {item.num}
              </div>
              <span className="text-xs" style={{ color: "#94A3B8" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
