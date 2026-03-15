"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Users,
  CheckCircle,
  Clock,
  X,
  Siren,
} from "lucide-react";

interface AlertStep {
  id: string;
  label: string;
  status: "pending" | "active" | "done";
  icon: React.ReactNode;
}

export default function SOSActivePage() {
  const [elapsed, setElapsed] = useState(0);
  const [steps, setSteps] = useState<AlertStep[]>([
    {
      id: "location",
      label: "GPS location acquired",
      status: "pending",
      icon: <MapPin size={16} />,
    },
    {
      id: "alert",
      label: "Emergency alert sent",
      status: "pending",
      icon: <Siren size={16} />,
    },
    {
      id: "contacts",
      label: "Notifying emergency contacts",
      status: "pending",
      icon: <Users size={16} />,
    },
    {
      id: "responders",
      label: "Connecting to responders",
      status: "pending",
      icon: <Phone size={16} />,
    },
  ]);

  // Simulate alert progression
  useEffect(() => {
    const delays = [500, 1200, 2200, 3500];
    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < i ? "done" : idx === i ? "active" : s.status,
          }))
        );
        if (i === delays.length - 1) {
          setTimeout(() => {
            setSteps((prev) => prev.map((s) => ({ ...s, status: "done" })));
          }, 800);
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Elapsed timer
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const allDone = steps.every((s) => s.status === "done");

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Alert Header */}
      <div
        className="px-5 pt-5 pb-4"
        style={{
          background: "linear-gradient(180deg, #7F1D1D 0%, #991B1B 100%)",
          borderBottom: "1px solid #DC2626",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-200 text-sm font-bold uppercase tracking-wider">
              SOS Active
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-900/50">
            <Clock size={12} color="#FCA5A5" />
            <span className="text-red-200 text-xs font-mono font-bold">
              {formatTime(elapsed)}
            </span>
          </div>
        </div>

        <div className="text-center py-4">
          <div
            className="w-28 h-28 rounded-full mx-auto flex flex-col items-center justify-center mb-3"
            style={{
              background: "rgba(220,38,38,0.3)",
              border: "3px solid #DC2626",
              boxShadow: "0 0 30px rgba(220,38,38,0.5)",
            }}
          >
            <span className="text-white text-3xl font-black">SOS</span>
            <span className="text-red-300 text-xs">ACTIVE</span>
          </div>
          <h1 className="text-white text-xl font-black">Emergency Alert Sent</h1>
          <p className="text-red-200 text-sm mt-1">
            Help is on the way. Stay calm.
          </p>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-5">
        {/* Alert Steps */}
        <div
          className="p-4 rounded-2xl space-y-3"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
            Alert Status
          </h2>
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  backgroundColor:
                    step.status === "done"
                      ? "#15803D20"
                      : step.status === "active"
                      ? "#DC262620"
                      : "#0F172A",
                  border: `1.5px solid ${
                    step.status === "done"
                      ? "#15803D"
                      : step.status === "active"
                      ? "#DC2626"
                      : "#334155"
                  }`,
                  color:
                    step.status === "done"
                      ? "#4ADE80"
                      : step.status === "active"
                      ? "#F87171"
                      : "#475569",
                }}
              >
                {step.status === "done" ? (
                  <CheckCircle size={16} />
                ) : step.status === "active" ? (
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                ) : (
                  step.icon
                )}
              </div>
              <span
                className="text-sm font-medium"
                style={{
                  color:
                    step.status === "done"
                      ? "#4ADE80"
                      : step.status === "active"
                      ? "#F8FAFC"
                      : "#475569",
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Location Card */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} color="#4ADE80" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Your Location
            </span>
          </div>
          <p className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>
            GPS coordinates acquired
          </p>
          <p className="text-xs mt-1" style={{ color: "#64748B" }}>
            Lat: -1.2921° N · Lon: 36.8219° E
          </p>
          <div
            className="mt-3 h-24 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#0F172A", border: "1px solid #334155" }}
          >
            <div className="text-center">
              <MapPin size={24} color="#DC2626" className="mx-auto mb-1" />
              <p className="text-xs" style={{ color: "#64748B" }}>
                Location shared with responders
              </p>
            </div>
          </div>
        </div>

        {/* Contacts Notified */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} color="#60A5FA" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Contacts Notified
            </span>
          </div>
          {[
            { name: "Jane Doe", relation: "Sister", status: "Notified" },
            { name: "John Smith", relation: "Friend", status: "Notified" },
          ].map((c) => (
            <div key={c.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: "#1D4ED820", color: "#60A5FA" }}
                >
                  {c.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#E2E8F0" }}>
                    {c.name}
                  </p>
                  <p className="text-xs" style={{ color: "#64748B" }}>
                    {c.relation}
                  </p>
                </div>
              </div>
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{ backgroundColor: "#15803D20", color: "#4ADE80" }}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href="tel:911"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #15803D, #16A34A)",
              color: "white",
            }}
          >
            <Phone size={20} />
            Call Emergency Services
          </a>

          {allDone && (
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 animate-fade-in"
              style={{
                backgroundColor: "#1E293B",
                color: "#94A3B8",
                border: "1px solid #334155",
              }}
            >
              <X size={20} />
              Cancel Alert — I&apos;m Safe
            </Link>
          )}
        </div>

        {/* Reassurance */}
        <div
          className="p-4 rounded-2xl text-center"
          style={{ backgroundColor: "#1E1B4B", border: "1px solid #7C3AED30" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#C4B5FD" }}>
            You are not alone.
          </p>
          <p className="text-xs mt-1" style={{ color: "#7C3AED" }}>
            Emergency services have been notified. Stay in a safe location if possible.
          </p>
        </div>
      </div>
    </div>
  );
}
