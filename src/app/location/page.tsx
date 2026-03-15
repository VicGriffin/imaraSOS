"use client";

import { useState } from "react";
import {
  MapPin,
  Share2,
  Copy,
  Check,
  Users,
  Clock,
  ArrowLeft,
  Navigation,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

const contacts = [
  { id: "1", name: "Jane Doe", relation: "Sister", color: "#A78BFA" },
  { id: "2", name: "John Smith", relation: "Friend", color: "#60A5FA" },
  { id: "3", name: "Dr. Sarah Lee", relation: "Doctor", color: "#34D399" },
];

const durations = [
  { id: "15m", label: "15 minutes" },
  { id: "1h", label: "1 hour" },
  { id: "4h", label: "4 hours" },
  { id: "24h", label: "24 hours" },
  { id: "indefinite", label: "Until I stop" },
];

export default function LocationPage() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>(["1"]);
  const [duration, setDuration] = useState("1h");
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const startSharing = () => {
    setSharing(true);
  };

  const stopSharing = () => {
    setSharing(false);
  };

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = "https://imarasos.app/track/abc123xyz";

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
            style={{ backgroundColor: "#22D3EE20" }}
          >
            <Share2 size={22} color="#22D3EE" />
          </div>
          <div>
            <h1 className="text-lg font-black" style={{ color: "#22D3EE" }}>
              Share My Location
            </h1>
            <p className="text-xs" style={{ color: "#64748B" }}>
              Let trusted contacts track you in real-time
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Map Preview */}
        <div
          className="relative h-48 rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          {/* Map grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`h${i}`}
                className="absolute border-b"
                style={{ top: `${(i + 1) * 12.5}%`, left: 0, right: 0, borderColor: "#334155" }}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`v${i}`}
                className="absolute border-r"
                style={{ left: `${(i + 1) * 12.5}%`, top: 0, bottom: 0, borderColor: "#334155" }}
              />
            ))}
          </div>

          {/* Location dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div
                className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                style={{ backgroundColor: "#22D3EE" }}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              {sharing && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ backgroundColor: "#22D3EE40" }}
                />
              )}
            </div>
          </div>

          {/* Status overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ backgroundColor: "rgba(15,23,42,0.9)" }}
            >
              <div
                className={`w-2 h-2 rounded-full ${sharing ? "bg-green-400 animate-pulse" : "bg-gray-500"}`}
              />
              <span className="text-xs font-semibold" style={{ color: sharing ? "#4ADE80" : "#64748B" }}>
                {sharing ? "Live location sharing active" : "Location sharing paused"}
              </span>
              {sharing && (
                <span className="text-xs ml-auto" style={{ color: "#22D3EE" }}>
                  {durations.find((d) => d.id === duration)?.label}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Current Location */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <Navigation size={18} color="#22D3EE" />
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>
              Current Location
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
              Lat: -1.2921° · Lon: 36.8219° · Accuracy: ±5m
            </p>
          </div>
          <div
            className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
          />
        </div>

        {/* Share with contacts */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            Share with
          </p>
          <div className="space-y-2">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleContact(c.id)}
                className="flex items-center gap-3 w-full p-3.5 rounded-xl transition-all active:scale-95"
                style={{
                  backgroundColor: selectedContacts.includes(c.id) ? `${c.color}15` : "#1E293B",
                  border: `1.5px solid ${selectedContacts.includes(c.id) ? c.color : "#334155"}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ backgroundColor: `${c.color}20`, color: c.color }}
                >
                  {c.name[0]}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                    {c.name}
                  </p>
                  <p className="text-xs" style={{ color: "#64748B" }}>
                    {c.relation}
                  </p>
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: selectedContacts.includes(c.id) ? c.color : "#334155",
                  }}
                >
                  {selectedContacts.includes(c.id) && <Check size={12} color="white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            Share for
          </p>
          <div className="flex flex-wrap gap-2">
            {durations.map((d) => (
              <button
                key={d.id}
                onClick={() => setDuration(d.id)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all"
                style={{
                  backgroundColor: duration === d.id ? "#22D3EE20" : "#1E293B",
                  color: duration === d.id ? "#22D3EE" : "#64748B",
                  border: `1.5px solid ${duration === d.id ? "#22D3EE" : "#334155"}`,
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Share Link */}
        <div
          className="p-4 rounded-xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <LinkIcon size={14} color="#64748B" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Shareable Link
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs flex-1 truncate" style={{ color: "#94A3B8" }}>
              {shareLink}
            </p>
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold flex-shrink-0 transition-all"
              style={{
                backgroundColor: copied ? "#15803D20" : "#0F172A",
                color: copied ? "#4ADE80" : "#60A5FA",
                border: "1px solid #334155",
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Action Button */}
        {!sharing ? (
          <button
            onClick={startSharing}
            disabled={selectedContacts.length === 0}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
            style={{
              background: selectedContacts.length > 0
                ? "linear-gradient(135deg, #0E7490, #0891B2)"
                : "#1E293B",
              color: selectedContacts.length > 0 ? "white" : "#475569",
            }}
          >
            <Share2 size={20} />
            Start Sharing Location
          </button>
        ) : (
          <div className="space-y-3">
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ backgroundColor: "#15803D20", border: "1px solid #15803D40" }}
            >
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: "#4ADE80" }}>
                  Location sharing active
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                  {selectedContacts.length} contact{selectedContacts.length > 1 ? "s" : ""} can see your location
                </p>
              </div>
              <Clock size={16} color="#4ADE80" />
            </div>
            <button
              onClick={stopSharing}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
              style={{ backgroundColor: "#DC262620", color: "#F87171", border: "1px solid #DC262640" }}
            >
              Stop Sharing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
