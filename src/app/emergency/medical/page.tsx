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
    <div className="flex flex-col min-h-screen pb-6" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Header */}
      <div
        className="px-4 pt-5 pb-5 glass-strong"
        style={{
          background: "linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid rgba(239, 68, 68, 0.2)",
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ 
              backgroundColor: "var(--bg-tertiary)",
              border: "1px solid var(--border-color)"
            }}
          >
            <ArrowLeft size={20} color="var(--text-secondary)" />
          </Link>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ 
              backgroundColor: "rgba(239, 68, 68, 0.18)",
              border: "1.5px solid rgba(239, 68, 68, 0.35)"
            }}
          >
            <Heart size={22} color="var(--sos-red)" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight" style={{ color: "var(--sos-red)" }}>
              Medical Emergency
            </h1>
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              Select the type of emergency
            </p>
          </div>
        </div>

        {/* Quick Call */}
        <a
          href="tel:911"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, #dc2626, #ef4444)",
            color: "white",
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          <Phone size={20} />
          Call Emergency — 911
        </a>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Alert */}
        <div
          className="flex items-start gap-3 p-3.5 rounded-xl"
          style={{ 
            backgroundColor: "rgba(239, 68, 68, 0.12)", 
            border: "1px solid rgba(239, 68, 68, 0.25)"
          }}
        >
          <AlertCircle size={18} color="var(--sos-red)" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium" style={{ color: "var(--sos-red-light)" }}>
            If this is life-threatening, call 911 immediately. Use the SOS button for fastest response.
          </p>
        </div>

        {/* Emergency Types */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            What is the emergency?
          </h2>
          <div className="space-y-2.5">
            {emergencyActions.map((action) => {
              const colors = urgencyColors[action.urgency];
              return (
                <Link
                  key={action.label}
                  href={`/sos-active?type=medical&detail=${encodeURIComponent(action.label)}`}
                  className="flex items-center gap-3 p-4 rounded-xl transition-all active:scale-95 hover:bg-opacity-80"
                  style={{ 
                    backgroundColor: "var(--bg-card)", 
                    border: "1px solid var(--border-color)"
                  }}
                >
                  <div
                    className="px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {colors.label}
                  </div>
                  <span className="text-sm font-medium flex-1" style={{ color: "var(--text-primary)" }}>
                    {action.label}
                  </span>
                  <ChevronRight size={16} color="var(--text-muted)" className="transition-all group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* First Aid Tips */}
        <div
          className="p-4 rounded-2xl"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            border: "1px solid var(--border-color)"
          }}
        >
          <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            While waiting for help:
          </h3>
          <ul className="space-y-2">
            {[
              "Keep the person calm and still",
              "Do not move if spinal injury suspected",
              "Apply pressure to bleeding wounds",
              "Keep them warm and comfortable",
              "Stay on the line with emergency services",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                <span className="text-green-500 mt-0.5 font-bold">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
