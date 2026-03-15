"use client";

import { useState } from "react";
import {
  AlertTriangle,
  MapPin,
  Camera,
  Send,
  CheckCircle,
  Zap,
  Droplets,
  Construction,
  Wind,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type HazardType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
};

const hazardTypes: HazardType[] = [
  { id: "road", label: "Broken Road / Pothole", icon: <Construction size={20} />, color: "#EAB308" },
  { id: "electrical", label: "Exposed Wires / Electrical", icon: <Zap size={20} />, color: "#F97316" },
  { id: "gas", label: "Gas Leak / Smell", icon: <Wind size={20} />, color: "#EF4444" },
  { id: "flood", label: "Flooding / Water Hazard", icon: <Droplets size={20} />, color: "#3B82F6" },
  { id: "fire_risk", label: "Fire Risk / Dry Brush", icon: <AlertTriangle size={20} />, color: "#DC2626" },
  { id: "structure", label: "Unsafe Structure / Building", icon: <Construction size={20} />, color: "#8B5CF6" },
  { id: "other", label: "Other Hazard", icon: <AlertTriangle size={20} />, color: "#94A3B8" },
];

const urgencyLevels = [
  { id: "immediate", label: "Immediate Danger", color: "#DC2626" },
  { id: "high", label: "High Risk", color: "#F97316" },
  { id: "medium", label: "Moderate Risk", color: "#EAB308" },
  { id: "low", label: "Low Risk", color: "#64748B" },
];

export default function HazardPage() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const handleSubmit = () => {
    if (!selectedType || !urgency) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-6 text-center" style={{ backgroundColor: "#0F172A" }}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: "#15803D20", border: "2px solid #15803D" }}
        >
          <CheckCircle size={44} color="#4ADE80" />
        </div>
        <h1 className="text-2xl font-black mb-2" style={{ color: "#F8FAFC" }}>
          Hazard Reported
        </h1>
        <p className="text-sm mb-1" style={{ color: "#94A3B8" }}>
          Thank you for keeping your community safe.
        </p>
        <p className="text-xs mb-8" style={{ color: "#64748B" }}>
          Authorities have been notified and will investigate.
        </p>
        <div
          className="w-full p-4 rounded-2xl mb-6 text-left"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>
            Report Summary
          </p>
          <p className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>
            {hazardTypes.find((h) => h.id === selectedType)?.label}
          </p>
          <p className="text-xs mt-1" style={{ color: "#64748B" }}>
            Urgency: {urgencyLevels.find((u) => u.id === urgency)?.label}
          </p>
          {description && (
            <p className="text-xs mt-1" style={{ color: "#64748B" }}>
              {description}
            </p>
          )}
          <p className="text-xs mt-2" style={{ color: "#4ADE80" }}>
            📍 Location shared with authorities
          </p>
        </div>
        <Link
          href="/"
          className="w-full py-4 rounded-2xl font-bold text-sm text-center transition-all active:scale-95"
          style={{ background: "linear-gradient(135deg, #1D4ED8, #2563EB)", color: "white" }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-6" style={{ backgroundColor: "#0F172A" }}>
      {/* Header */}
      <div
        className="px-4 pt-5 pb-4"
        style={{ borderBottom: "1px solid #1E293B" }}
      >
        <div className="flex items-center gap-3">
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
            <AlertTriangle size={22} color="#EAB308" />
          </div>
          <div>
            <h1 className="text-lg font-black" style={{ color: "#FCD34D" }}>
              Report a Hazard
            </h1>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Help keep your community safe
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Hazard Type */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            Type of Hazard *
          </p>
          <div className="grid grid-cols-1 gap-2">
            {hazardTypes.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedType(h.id)}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all active:scale-95 text-left"
                style={{
                  backgroundColor: selectedType === h.id ? `${h.color}20` : "#1E293B",
                  border: `1.5px solid ${selectedType === h.id ? h.color : "#334155"}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${h.color}20`, color: h.color }}
                >
                  {h.icon}
                </div>
                <span className="text-sm font-medium" style={{ color: selectedType === h.id ? "#F8FAFC" : "#94A3B8" }}>
                  {h.label}
                </span>
                {selectedType === h.id && (
                  <CheckCircle size={16} color={h.color} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Urgency Level */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            Urgency Level *
          </p>
          <div className="grid grid-cols-2 gap-2">
            {urgencyLevels.map((u) => (
              <button
                key={u.id}
                onClick={() => setUrgency(u.id)}
                className="py-3 px-4 rounded-xl text-sm font-bold transition-all active:scale-95"
                style={{
                  backgroundColor: urgency === u.id ? `${u.color}20` : "#1E293B",
                  border: `1.5px solid ${urgency === u.id ? u.color : "#334155"}`,
                  color: urgency === u.id ? u.color : "#64748B",
                }}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>
            Description (Optional)
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe the hazard in more detail…"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
            style={{
              backgroundColor: "#1E293B",
              border: "1px solid #334155",
              color: "#F8FAFC",
            }}
          />
        </div>

        {/* Location */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#4ADE8020" }}
          >
            <MapPin size={20} color="#4ADE80" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>
              {locationShared ? "Location attached" : "Attach your location"}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
              {locationShared ? "GPS coordinates will be included" : "Helps authorities find the hazard faster"}
            </p>
          </div>
          <button
            onClick={() => setLocationShared(!locationShared)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{
              backgroundColor: locationShared ? "#15803D20" : "#1D4ED820",
              color: locationShared ? "#4ADE80" : "#60A5FA",
              border: `1px solid ${locationShared ? "#15803D40" : "#1D4ED840"}`,
            }}
          >
            {locationShared ? "✓ Added" : "Add"}
          </button>
        </div>

        {/* Photo */}
        <button
          className="flex items-center gap-3 w-full p-4 rounded-xl transition-all active:scale-95"
          style={{ backgroundColor: "#1E293B", border: "2px dashed #334155" }}
        >
          <Camera size={20} color="#64748B" />
          <span className="text-sm" style={{ color: "#64748B" }}>
            Add a photo (optional)
          </span>
        </button>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!selectedType || !urgency}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
          style={{
            background: selectedType && urgency
              ? "linear-gradient(135deg, #A16207, #CA8A04)"
              : "#1E293B",
            color: selectedType && urgency ? "white" : "#475569",
          }}
        >
          <Send size={18} />
          Submit Hazard Report
        </button>
      </div>
    </div>
  );
}
