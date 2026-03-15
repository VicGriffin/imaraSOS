"use client";

import Link from "next/link";
import { Flame, Phone, ArrowLeft, ChevronRight, AlertCircle } from "lucide-react";

const emergencyActions = [
  { label: "Building fire / Structure fire", urgency: "critical" },
  { label: "Person trapped in fire", urgency: "critical" },
  { label: "Gas leak / Explosion risk", urgency: "critical" },
  { label: "Wildfire / Bush fire", urgency: "critical" },
  { label: "Vehicle fire", urgency: "high" },
  { label: "Electrical fire", urgency: "high" },
  { label: "Chemical fire / Hazmat", urgency: "critical" },
  { label: "Small contained fire", urgency: "medium" },
  { label: "Smoke without visible fire", urgency: "high" },
];

const urgencyColors: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: "#DC262620", text: "#F87171", label: "Critical" },
  high: { bg: "#EA580C20", text: "#FB923C", label: "Urgent" },
  medium: { bg: "#EAB30820", text: "#FCD34D", label: "Moderate" },
};

export default function FireEmergencyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-6" style={{ backgroundColor: "#0F172A" }}>
      {/* Header */}
      <div
        className="px-4 pt-5 pb-4"
        style={{
          background: "linear-gradient(180deg, #1A0800 0%, #0F172A 100%)",
          borderBottom: "1px solid #F9731630",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1E293B" }}
          >
            <ArrowLeft size={20} color="#94A3B8" />
          </Link>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#F9731620" }}
          >
            <Flame size={22} color="#F97316" />
          </div>
          <div>
            <h1 className="text-lg font-black" style={{ color: "#F97316" }}>
              Fire Emergency
            </h1>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Select the type of fire emergency
            </p>
          </div>
        </div>

        {/* Quick Call */}
        <a
          href="tel:911"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #C2410C, #EA580C)",
            color: "white",
          }}
        >
          <Phone size={20} />
          Call Fire Department — 911
        </a>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Safety Alert */}
        <div
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{ backgroundColor: "#F9731610", border: "1px solid #F9731630" }}
        >
          <AlertCircle size={18} color="#FB923C" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: "#FDBA74" }}>
            Evacuate immediately. Do not use elevators. Close doors behind you to slow fire spread.
          </p>
        </div>

        {/* Fire Types */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            Type of fire emergency
          </h2>
          <div className="space-y-2">
            {emergencyActions.map((action) => {
              const colors = urgencyColors[action.urgency];
              return (
                <Link
                  key={action.label}
                  href={`/sos-active?type=fire&detail=${encodeURIComponent(action.label)}`}
                  className="flex items-center gap-3 p-4 rounded-xl transition-all active:scale-95"
                  style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
                >
                  <div
                    className="px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {colors.label}
                  </div>
                  <span className="text-sm font-medium flex-1" style={{ color: "#E2E8F0" }}>
                    {action.label}
                  </span>
                  <ChevronRight size={16} color="#475569" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Evacuation Tips */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: "#E2E8F0" }}>
            Fire evacuation rules:
          </h3>
          <ul className="space-y-1.5">
            {[
              "GET OUT — leave immediately, do not collect belongings",
              "Stay low if there is smoke — crawl if needed",
              "Feel doors before opening — if hot, use another exit",
              "Meet at your designated assembly point",
              "Never go back into a burning building",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs" style={{ color: "#94A3B8" }}>
                <span className="text-orange-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
