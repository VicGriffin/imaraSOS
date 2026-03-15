"use client";

import Link from "next/link";
import { Heart, Phone, ArrowLeft, ChevronRight, AlertCircle } from "lucide-react";

const emergencyActions = [
  { label: "Cardiac Arrest / CPR needed", urgency: "critical" },
  { label: "Severe bleeding / Trauma", urgency: "critical" },
  { label: "Unconscious / Not breathing", urgency: "critical" },
  { label: "Stroke symptoms", urgency: "high" },
  { label: "Severe allergic reaction", urgency: "high" },
  { label: "Broken bones / Fracture", urgency: "medium" },
  { label: "Severe pain", urgency: "medium" },
  { label: "Diabetic emergency", urgency: "medium" },
  { label: "Poisoning / Overdose", urgency: "high" },
  { label: "Childbirth emergency", urgency: "critical" },
];

const urgencyColors: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: "#DC262620", text: "#F87171", label: "Critical" },
  high: { bg: "#EA580C20", text: "#FB923C", label: "Urgent" },
  medium: { bg: "#EAB30820", text: "#FCD34D", label: "Moderate" },
};

export default function MedicalEmergencyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-6" style={{ backgroundColor: "#0F172A" }}>
      {/* Header */}
      <div
        className="px-4 pt-5 pb-4"
        style={{
          background: "linear-gradient(180deg, #1A0000 0%, #0F172A 100%)",
          borderBottom: "1px solid #EF444430",
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
            style={{ backgroundColor: "#EF444420" }}
          >
            <Heart size={22} color="#EF4444" />
          </div>
          <div>
            <h1 className="text-lg font-black" style={{ color: "#EF4444" }}>
              Medical Emergency
            </h1>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Select the type of emergency
            </p>
          </div>
        </div>

        {/* Quick Call */}
        <a
          href="tel:911"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #991B1B, #DC2626)",
            color: "white",
          }}
        >
          <Phone size={20} />
          Call Emergency — 911
        </a>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Alert */}
        <div
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{ backgroundColor: "#EF444410", border: "1px solid #EF444430" }}
        >
          <AlertCircle size={18} color="#F87171" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: "#FCA5A5" }}>
            If this is life-threatening, call 911 immediately. Use the SOS button for fastest response.
          </p>
        </div>

        {/* Emergency Types */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            What is the emergency?
          </h2>
          <div className="space-y-2">
            {emergencyActions.map((action) => {
              const colors = urgencyColors[action.urgency];
              return (
                <Link
                  key={action.label}
                  href={`/sos-active?type=medical&detail=${encodeURIComponent(action.label)}`}
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

        {/* First Aid Tips */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: "#E2E8F0" }}>
            While waiting for help:
          </h3>
          <ul className="space-y-1.5">
            {[
              "Keep the person calm and still",
              "Do not move if spinal injury suspected",
              "Apply pressure to bleeding wounds",
              "Keep them warm and comfortable",
              "Stay on the line with emergency services",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs" style={{ color: "#94A3B8" }}>
                <span className="text-green-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
