"use client";

import Link from "next/link";
import { Shield, Phone, ArrowLeft, ChevronRight, AlertCircle } from "lucide-react";

const emergencyActions = [
  { label: "Active threat / Armed person", urgency: "critical" },
  { label: "Physical assault / Violence", urgency: "critical" },
  { label: "Robbery / Theft in progress", urgency: "critical" },
  { label: "Domestic violence", urgency: "critical" },
  { label: "Kidnapping / Abduction", urgency: "critical" },
  { label: "Suspicious person / Activity", urgency: "high" },
  { label: "Break-in / Burglary", urgency: "high" },
  { label: "Stalking / Harassment", urgency: "high" },
  { label: "Missing person", urgency: "medium" },
  { label: "Noise complaint / Disturbance", urgency: "low" },
];

const urgencyColors: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: "#DC262620", text: "#F87171", label: "Critical" },
  high: { bg: "#EA580C20", text: "#FB923C", label: "Urgent" },
  medium: { bg: "#EAB30820", text: "#FCD34D", label: "Moderate" },
  low: { bg: "#1D4ED820", text: "#60A5FA", label: "Non-urgent" },
};

export default function PoliceEmergencyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-6" style={{ backgroundColor: "#0F172A" }}>
      {/* Header */}
      <div
        className="px-4 pt-5 pb-4"
        style={{
          background: "linear-gradient(180deg, #0A0F1A 0%, #0F172A 100%)",
          borderBottom: "1px solid #3B82F630",
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
            style={{ backgroundColor: "#3B82F620" }}
          >
            <Shield size={22} color="#3B82F6" />
          </div>
          <div>
            <h1 className="text-lg font-black" style={{ color: "#3B82F6" }}>
              Police Emergency
            </h1>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Select the type of incident
            </p>
          </div>
        </div>

        {/* Quick Call */}
        <a
          href="tel:911"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #1D4ED8, #2563EB)",
            color: "white",
          }}
        >
          <Phone size={20} />
          Call Police — 911
        </a>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Safety Alert */}
        <div
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{ backgroundColor: "#3B82F610", border: "1px solid #3B82F630" }}
        >
          <AlertCircle size={18} color="#60A5FA" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: "#93C5FD" }}>
            If you are in immediate danger, press SOS or call 911. Do not confront the threat.
          </p>
        </div>

        {/* Incident Types */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            What is happening?
          </h2>
          <div className="space-y-2">
            {emergencyActions.map((action) => {
              const colors = urgencyColors[action.urgency];
              return (
                <Link
                  key={action.label}
                  href={`/sos-active?type=police&detail=${encodeURIComponent(action.label)}`}
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

        {/* Safety Tips */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: "#E2E8F0" }}>
            Stay safe:
          </h3>
          <ul className="space-y-1.5">
            {[
              "Move to a safe location if possible",
              "Do not confront the suspect",
              "Note descriptions: clothing, vehicle, direction",
              "Keep your phone charged and accessible",
              "Stay on the line with the dispatcher",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs" style={{ color: "#94A3B8" }}>
                <span className="text-blue-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
