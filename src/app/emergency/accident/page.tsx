"use client";

import Link from "next/link";
import { Car, Phone, ArrowLeft, ChevronRight, AlertCircle } from "lucide-react";

const emergencyActions = [
  { label: "Person trapped in vehicle", urgency: "critical" },
  { label: "Multi-vehicle collision", urgency: "critical" },
  { label: "Pedestrian hit by vehicle", urgency: "critical" },
  { label: "Vehicle in water / Flooding", urgency: "critical" },
  { label: "Person fallen / Trapped", urgency: "high" },
  { label: "Industrial accident", urgency: "high" },
  { label: "Building collapse", urgency: "critical" },
  { label: "Drowning / Water rescue", urgency: "critical" },
  { label: "Single vehicle accident", urgency: "high" },
  { label: "Motorcycle accident", urgency: "high" },
];

const urgencyColors: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: "#DC262620", text: "#F87171", label: "Critical" },
  high: { bg: "#EA580C20", text: "#FB923C", label: "Urgent" },
  medium: { bg: "#EAB30820", text: "#FCD34D", label: "Moderate" },
};

export default function AccidentEmergencyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-6" style={{ backgroundColor: "#0F172A" }}>
      {/* Header */}
      <div
        className="px-4 pt-5 pb-4"
        style={{
          background: "linear-gradient(180deg, #1A1200 0%, #0F172A 100%)",
          borderBottom: "1px solid #EAB30830",
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
            style={{ backgroundColor: "#EAB30820" }}
          >
            <Car size={22} color="#EAB308" />
          </div>
          <div>
            <h1 className="text-lg font-black" style={{ color: "#EAB308" }}>
              Accident / Rescue
            </h1>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Select the type of accident
            </p>
          </div>
        </div>

        {/* Quick Call */}
        <a
          href="tel:911"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #A16207, #CA8A04)",
            color: "white",
          }}
        >
          <Phone size={20} />
          Call Rescue Services — 911
        </a>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Safety Alert */}
        <div
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{ backgroundColor: "#EAB30810", border: "1px solid #EAB30830" }}
        >
          <AlertCircle size={18} color="#FCD34D" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: "#FDE68A" }}>
            Do not move injured persons unless there is immediate danger. Turn on hazard lights and secure the scene.
          </p>
        </div>

        {/* Accident Types */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            Type of accident
          </h2>
          <div className="space-y-2">
            {emergencyActions.map((action) => {
              const colors = urgencyColors[action.urgency];
              return (
                <Link
                  key={action.label}
                  href={`/sos-active?type=accident&detail=${encodeURIComponent(action.label)}`}
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

        {/* First Response Tips */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: "#E2E8F0" }}>
            At the accident scene:
          </h3>
          <ul className="space-y-1.5">
            {[
              "Ensure your own safety first",
              "Turn on hazard lights and set up warning triangles",
              "Do not move injured persons unless in danger",
              "Check for breathing and pulse",
              "Keep victims warm and calm until help arrives",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs" style={{ color: "#94A3B8" }}>
                <span className="text-yellow-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
