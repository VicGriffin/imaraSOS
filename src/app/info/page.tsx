"use client";

import { useState } from "react";
import {
  BookOpen,
  Heart,
  Flame,
  Droplets,
  Wind,
  Zap,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";
import BottomNav from "@/components/ui/BottomNav";
import PageHeader from "@/components/ui/PageHeader";

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  steps: string[];
  warning?: string;
}

const guides: GuideSection[] = [
  {
    id: "cpr",
    title: "CPR — Cardiopulmonary Resuscitation",
    icon: <Heart size={20} />,
    color: "#EF4444",
    warning: "Only perform CPR if the person is unresponsive and not breathing normally.",
    steps: [
      "Call 911 immediately or have someone else call",
      "Place the person on their back on a firm surface",
      "Kneel beside them and place heel of hand on center of chest",
      "Place other hand on top, interlace fingers",
      "Push hard and fast — at least 2 inches deep, 100-120 times per minute",
      "After 30 compressions, give 2 rescue breaths (tilt head, lift chin, seal mouth)",
      "Continue 30:2 ratio until help arrives or person recovers",
    ],
  },
  {
    id: "choking",
    title: "Choking — Heimlich Maneuver",
    icon: <Wind size={20} />,
    color: "#F97316",
    steps: [
      "Ask 'Are you choking?' — if they cannot speak, act immediately",
      "Stand behind the person and wrap your arms around their waist",
      "Make a fist with one hand, place thumb side against abdomen (above navel, below ribs)",
      "Grasp fist with other hand",
      "Give quick, upward thrusts — repeat until object is expelled",
      "If person becomes unconscious, begin CPR",
      "For infants: use back blows and chest thrusts instead",
    ],
  },
  {
    id: "bleeding",
    title: "Severe Bleeding Control",
    icon: <Droplets size={20} />,
    color: "#DC2626",
    steps: [
      "Call 911 for severe bleeding",
      "Put on gloves if available to protect yourself",
      "Apply firm, direct pressure with a clean cloth or bandage",
      "Do not remove the cloth — add more on top if it soaks through",
      "Elevate the injured area above heart level if possible",
      "For limb wounds: apply tourniquet 2-3 inches above wound if bleeding is life-threatening",
      "Note the time tourniquet was applied and tell responders",
    ],
  },
  {
    id: "burns",
    title: "Burns — First Aid",
    icon: <Flame size={20} />,
    color: "#EA580C",
    steps: [
      "Remove the person from the source of the burn",
      "Cool the burn with cool (not cold) running water for 10-20 minutes",
      "Do NOT use ice, butter, or toothpaste",
      "Remove jewelry and clothing near the burn (unless stuck to skin)",
      "Cover loosely with a sterile bandage or clean cloth",
      "Do not break blisters",
      "Seek medical attention for burns larger than 3 inches or on face/hands/feet",
    ],
  },
  {
    id: "stroke",
    title: "Stroke — FAST Recognition",
    icon: <Zap size={20} />,
    color: "#8B5CF6",
    warning: "Every minute counts during a stroke. Call 911 immediately.",
    steps: [
      "F — FACE: Ask them to smile. Does one side droop?",
      "A — ARMS: Ask them to raise both arms. Does one drift down?",
      "S — SPEECH: Ask them to repeat a phrase. Is it slurred or strange?",
      "T — TIME: If any signs, call 911 immediately",
      "Note the time symptoms started — tell the paramedics",
      "Do not give food or water",
      "Keep them calm and comfortable until help arrives",
    ],
  },
  {
    id: "fracture",
    title: "Fractures & Broken Bones",
    icon: <BookOpen size={20} />,
    color: "#3B82F6",
    steps: [
      "Do not try to straighten the bone",
      "Immobilize the injured area using a splint or padding",
      "Apply ice wrapped in cloth to reduce swelling",
      "Elevate the limb if possible",
      "For open fractures (bone visible): cover with clean cloth, do not push bone back",
      "Watch for signs of shock: pale skin, rapid breathing, weakness",
      "Seek immediate medical attention",
    ],
  },
];

const emergencyNumbers = [
  { service: "Emergency Services", number: "911", color: "#DC2626" },
  { service: "Poison Control", number: "1-800-222-1222", color: "#F97316" },
  { service: "Suicide Prevention", number: "988", color: "#8B5CF6" },
  { service: "Non-Emergency Police", number: "311", color: "#3B82F6" },
];

function GuideCard({ guide }: { guide: GuideSection }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-3 w-full p-4 text-left transition-all"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${guide.color}20`, color: guide.color }}
        >
          {guide.icon}
        </div>
        <span className="text-sm font-bold flex-1" style={{ color: "#F8FAFC" }}>
          {guide.title}
        </span>
        {expanded ? (
          <ChevronUp size={18} color="#64748B" />
        ) : (
          <ChevronDown size={18} color="#64748B" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 animate-fade-in">
          {guide.warning && (
            <div
              className="flex items-start gap-2 p-3 rounded-xl mb-3"
              style={{ backgroundColor: `${guide.color}15`, border: `1px solid ${guide.color}30` }}
            >
              <span className="text-xs font-bold" style={{ color: guide.color }}>
                ⚠ {guide.warning}
              </span>
            </div>
          )}
          <ol className="space-y-2">
            {guide.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${guide.color}20`, color: guide.color }}
                >
                  {idx + 1}
                </div>
                <span className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function InfoPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ backgroundColor: "#0F172A" }}>
      <PageHeader
        title="Emergency Information"
        subtitle="First aid guides & safety tips"
        accentColor="#F472B6"
      />

      <div className="px-4 py-4 space-y-5">
        {/* Emergency Numbers */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Phone size={16} color="#F87171" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Emergency Numbers
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {emergencyNumbers.map((e) => (
              <a
                key={e.service}
                href={`tel:${e.number.replace(/\D/g, "")}`}
                className="flex flex-col p-3 rounded-xl transition-all active:scale-95"
                style={{ backgroundColor: `${e.color}15`, border: `1px solid ${e.color}30` }}
              >
                <span className="text-lg font-black" style={{ color: e.color }}>
                  {e.number}
                </span>
                <span className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                  {e.service}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* First Aid Guides */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            First Aid Guides
          </p>
          <div className="space-y-2">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>

        {/* General Safety Tips */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h3 className="text-sm font-bold mb-3" style={{ color: "#E2E8F0" }}>
            General Safety Tips
          </h3>
          <div className="space-y-2">
            {[
              { tip: "Keep a first aid kit at home and in your car", icon: "🩺" },
              { tip: "Know the location of your nearest hospital", icon: "🏥" },
              { tip: "Learn CPR — it saves lives", icon: "❤️" },
              { tip: "Keep emergency contacts updated in your phone", icon: "📱" },
              { tip: "Have a family emergency plan and meeting point", icon: "🏠" },
              { tip: "Keep medications and medical info accessible", icon: "💊" },
              { tip: "Install smoke and carbon monoxide detectors", icon: "🔔" },
            ].map((item) => (
              <div key={item.tip} className="flex items-start gap-3">
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
                  {item.tip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
