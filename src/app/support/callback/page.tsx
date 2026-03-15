"use client";

import { useState } from "react";
import { ArrowLeft, PhoneCall, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const timeSlots = [
  "As soon as possible",
  "Within 30 minutes",
  "Within 1 hour",
  "Within 2 hours",
  "Today, any time",
];

const topics = [
  "Anxiety / Panic",
  "Depression",
  "Domestic violence",
  "Grief / Loss",
  "Relationship issues",
  "Substance use",
  "Suicidal thoughts",
  "Trauma / PTSD",
  "Other",
];

export default function CallbackPage() {
  const [phone, setPhone] = useState("");
  const [selectedTime, setSelectedTime] = useState("As soon as possible");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!phone) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-6 text-center" style={{ backgroundColor: "#0F172A" }}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: "#7C3AED20", border: "2px solid #7C3AED" }}
        >
          <CheckCircle size={44} color="#A78BFA" />
        </div>
        <h1 className="text-2xl font-black mb-2" style={{ color: "#F8FAFC" }}>
          Callback Requested
        </h1>
        <p className="text-sm mb-1" style={{ color: "#94A3B8" }}>
          A counselor will call you {selectedTime.toLowerCase()}.
        </p>
        <p className="text-xs mb-8" style={{ color: "#64748B" }}>
          We&apos;ll call {phone}. Please keep your phone nearby.
        </p>
        <div
          className="w-full p-4 rounded-2xl mb-6"
          style={{ backgroundColor: "#1E1B4B", border: "1px solid #7C3AED30" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} color="#A78BFA" />
            <span className="text-xs font-bold" style={{ color: "#A78BFA" }}>
              What to expect
            </span>
          </div>
          <ul className="space-y-1.5 text-left">
            {[
              "A trained counselor will call from a private number",
              "The call is completely confidential",
              "There is no time limit — take as long as you need",
              "You can end the call at any time",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "#94A3B8" }}>
                <span className="text-purple-400 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/support"
          className="w-full py-4 rounded-2xl font-bold text-sm text-center transition-all active:scale-95"
          style={{ backgroundColor: "#1E293B", color: "#A78BFA", border: "1px solid #7C3AED40" }}
        >
          Back to Support
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
            href="/support"
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1E293B" }}
          >
            <ArrowLeft size={20} color="#94A3B8" />
          </Link>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#3B82F620" }}
          >
            <PhoneCall size={22} color="#60A5FA" />
          </div>
          <div>
            <h1 className="text-lg font-black" style={{ color: "#60A5FA" }}>
              Request a Callback
            </h1>
            <p className="text-xs" style={{ color: "#64748B" }}>
              A counselor will call you back
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Reassurance */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E1B4B", border: "1px solid #7C3AED30" }}
        >
          <p className="text-sm" style={{ color: "#DDD6FE" }}>
            You don&apos;t have to go through this alone. A trained counselor will call you back at a time that works for you.
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
            Your Phone Number *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555-0000"
            className="w-full mt-2 px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              backgroundColor: "#1E293B",
              border: "1px solid #334155",
              color: "#F8FAFC",
            }}
          />
        </div>

        {/* Preferred Time */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
            When should we call?
          </label>
          <div className="mt-2 space-y-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className="flex items-center gap-3 w-full p-3.5 rounded-xl transition-all active:scale-95 text-left"
                style={{
                  backgroundColor: selectedTime === slot ? "#3B82F620" : "#1E293B",
                  border: `1.5px solid ${selectedTime === slot ? "#3B82F6" : "#334155"}`,
                }}
              >
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: selectedTime === slot ? "#3B82F6" : "#475569",
                    backgroundColor: selectedTime === slot ? "#3B82F6" : "transparent",
                  }}
                >
                  {selectedTime === slot && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-sm" style={{ color: selectedTime === slot ? "#F8FAFC" : "#94A3B8" }}>
                  {slot}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
            What would you like to talk about? (Optional)
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(selectedTopic === topic ? "" : topic)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: selectedTopic === topic ? "#7C3AED20" : "#1E293B",
                  color: selectedTopic === topic ? "#A78BFA" : "#64748B",
                  border: `1px solid ${selectedTopic === topic ? "#7C3AED" : "#334155"}`,
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
            Anything else you&apos;d like us to know? (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Share anything that might help the counselor prepare…"
            className="w-full mt-2 px-4 py-3 rounded-xl text-sm outline-none resize-none"
            style={{
              backgroundColor: "#1E293B",
              border: "1px solid #334155",
              color: "#F8FAFC",
            }}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!phone}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
          style={{
            background: phone ? "linear-gradient(135deg, #1D4ED8, #2563EB)" : "#1E293B",
            color: phone ? "white" : "#475569",
          }}
        >
          <PhoneCall size={20} />
          Request Callback
        </button>
      </div>
    </div>
  );
}
