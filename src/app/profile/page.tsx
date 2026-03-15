"use client";

import { useState } from "react";
import {
  User,
  Heart,
  Pill,
  AlertTriangle,
  Activity,
  Edit3,
  Check,
  X,
  Shield,
  Phone,
} from "lucide-react";
import BottomNav from "@/components/ui/BottomNav";
import PageHeader from "@/components/ui/PageHeader";

interface MedicalProfile {
  name: string;
  age: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyNote: string;
  organDonor: boolean;
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

function EditableList({
  items,
  onUpdate,
  placeholder,
  color,
}: {
  items: string[];
  onUpdate: (items: string[]) => void;
  placeholder: string;
  color: string;
}) {
  const [newItem, setNewItem] = useState("");

  const add = () => {
    if (!newItem.trim()) return;
    onUpdate([...items, newItem.trim()]);
    setNewItem("");
  };

  const remove = (idx: number) => {
    onUpdate(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
        >
          <span className="text-sm flex-1" style={{ color: "#E2E8F0" }}>
            {item}
          </span>
          <button onClick={() => remove(idx)}>
            <X size={14} color="#64748B" />
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
          style={{
            backgroundColor: "#0F172A",
            border: "1px solid #334155",
            color: "#F8FAFC",
          }}
        />
        <button
          onClick={add}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Check size={16} color={color} />
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<MedicalProfile>({
    name: "Alex Johnson",
    age: "32",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    conditions: ["Type 2 Diabetes", "Hypertension"],
    emergencyNote: "Diabetic — check blood sugar. Carries insulin pen.",
    organDonor: true,
  });

  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const saveProfile = () => {
    setProfile(tempProfile);
    setEditing(false);
  };

  const cancelEdit = () => {
    setTempProfile(profile);
    setEditing(false);
  };

  const current = editing ? tempProfile : profile;

  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ backgroundColor: "var(--bg-primary)" }}>
      <PageHeader
        title="Medical Profile"
        subtitle="Accessible to responders in emergencies"
        accentColor="#F472B6"
      />

      <div className="px-4 py-4 space-y-4">
        {/* Medical ID Banner */}
        <div
          className="flex items-center gap-3 p-3.5 rounded-xl"
          style={{ 
            backgroundColor: "rgba(239, 68, 68, 0.12)", 
            border: "1px solid rgba(239, 68, 68, 0.25)"
          }}
        >
          <Shield size={18} color="var(--sos-red)" />
          <p className="text-xs font-medium" style={{ color: "var(--sos-red-light)" }}>
            This information is shared with emergency responders when you activate SOS.
          </p>
        </div>

        {/* Personal Info */}
        <div
          className="p-4 rounded-2xl"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            border: "1px solid var(--border-color)"
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User size={16} color="#F472B6" />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
                Personal Info
              </span>
            </div>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: "var(--bg-primary)", 
                  color: "var(--sos-blue)", 
                  border: "1px solid var(--border-color)"
                }}
              >
                <Edit3 size={12} />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={saveProfile}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: "rgba(16, 185, 129, 0.15)", 
                    color: "var(--sos-green)",
                    border: "1px solid rgba(16, 185, 129, 0.3)"
                  }}
                >
                  <Check size={12} />
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: "rgba(239, 68, 68, 0.15)", 
                    color: "var(--sos-red)",
                    border: "1px solid rgba(239, 68, 68, 0.3)"
                  }}
                >
                  <X size={12} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs" style={{ color: "#64748B" }}>Full Name</label>
              {editing ? (
                <input
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "#0F172A", border: "1px solid #334155", color: "#F8FAFC" }}
                />
              ) : (
                <p className="text-sm font-semibold mt-1" style={{ color: "#F8FAFC" }}>{profile.name}</p>
              )}
            </div>
            <div>
              <label className="text-xs" style={{ color: "#64748B" }}>Age</label>
              {editing ? (
                <input
                  value={tempProfile.age}
                  onChange={(e) => setTempProfile({ ...tempProfile, age: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "#0F172A", border: "1px solid #334155", color: "#F8FAFC" }}
                />
              ) : (
                <p className="text-sm font-semibold mt-1" style={{ color: "#F8FAFC" }}>{profile.age} years</p>
              )}
            </div>
          </div>

          {/* Blood Type */}
          <div className="mt-3">
            <label className="text-xs" style={{ color: "#64748B" }}>Blood Type</label>
            {editing ? (
              <select
                value={tempProfile.bloodType}
                onChange={(e) => setTempProfile({ ...tempProfile, bloodType: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "#0F172A", border: "1px solid #334155", color: "#F8FAFC" }}
              >
                {bloodTypes.map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="px-3 py-1.5 rounded-xl text-sm font-black"
                  style={{ backgroundColor: "#DC262620", color: "#F87171", border: "1px solid #DC262640" }}
                >
                  {profile.bloodType}
                </div>
                <span className="text-xs" style={{ color: "#64748B" }}>Blood Type</span>
              </div>
            )}
          </div>

          {/* Organ Donor */}
          <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #334155" }}>
            <div className="flex items-center gap-2">
              <Heart size={14} color="#F472B6" />
              <span className="text-xs font-semibold" style={{ color: "#E2E8F0" }}>Organ Donor</span>
            </div>
            <button
              onClick={() => editing && setTempProfile({ ...tempProfile, organDonor: !tempProfile.organDonor })}
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: current.organDonor ? "#15803D20" : "#1E293B",
                color: current.organDonor ? "#4ADE80" : "#64748B",
                border: `1px solid ${current.organDonor ? "#15803D40" : "#334155"}`,
              }}
            >
              {current.organDonor ? "Yes" : "No"}
            </button>
          </div>
        </div>

        {/* Allergies */}
        <div
          className="p-4 rounded-2xl"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            border: "1px solid var(--border-color)"
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} color="#F87171" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Allergies
            </span>
          </div>
          {editing ? (
            <EditableList
              items={tempProfile.allergies}
              onUpdate={(items) => setTempProfile({ ...tempProfile, allergies: items })}
              placeholder="Add allergy…"
              color="#EF4444"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.allergies.length > 0 ? (
                profile.allergies.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                    style={{ backgroundColor: "#DC262620", color: "#F87171", border: "1px solid #DC262640" }}
                  >
                    ⚠ {a}
                  </span>
                ))
              ) : (
                <p className="text-xs" style={{ color: "#64748B" }}>No known allergies</p>
              )}
            </div>
          )}
        </div>

        {/* Medications */}
        <div
          className="p-4 rounded-2xl"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            border: "1px solid var(--border-color)"
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Pill size={16} color="#A78BFA" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Current Medications
            </span>
          </div>
          {editing ? (
            <EditableList
              items={tempProfile.medications}
              onUpdate={(items) => setTempProfile({ ...tempProfile, medications: items })}
              placeholder="Add medication…"
              color="#7C3AED"
            />
          ) : (
            <div className="space-y-1.5">
              {profile.medications.length > 0 ? (
                profile.medications.map((m) => (
                  <div
                    key={m}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ backgroundColor: "#7C3AED15", border: "1px solid #7C3AED30" }}
                  >
                    <Pill size={12} color="#A78BFA" />
                    <span className="text-xs" style={{ color: "#E2E8F0" }}>{m}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs" style={{ color: "#64748B" }}>No current medications</p>
              )}
            </div>
          )}
        </div>

        {/* Medical Conditions */}
        <div
          className="p-4 rounded-2xl"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            border: "1px solid var(--border-color)"
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} color="#60A5FA" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Medical Conditions
            </span>
          </div>
          {editing ? (
            <EditableList
              items={tempProfile.conditions}
              onUpdate={(items) => setTempProfile({ ...tempProfile, conditions: items })}
              placeholder="Add condition…"
              color="#3B82F6"
            />
          ) : (
            <div className="space-y-1.5">
              {profile.conditions.length > 0 ? (
                profile.conditions.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ backgroundColor: "#1D4ED820", border: "1px solid #1D4ED840" }}
                  >
                    <Activity size={12} color="#60A5FA" />
                    <span className="text-xs" style={{ color: "#E2E8F0" }}>{c}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs" style={{ color: "#64748B" }}>No known conditions</p>
              )}
            </div>
          )}
        </div>

        {/* Emergency Note */}
        <div
          className="p-4 rounded-2xl"
          style={{ 
            backgroundColor: "var(--bg-card)", 
            border: "1px solid var(--border-color)"
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Phone size={16} color="#FCD34D" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Note for Responders
            </span>
          </div>
          {editing ? (
            <textarea
              value={tempProfile.emergencyNote}
              onChange={(e) => setTempProfile({ ...tempProfile, emergencyNote: e.target.value })}
              rows={3}
              placeholder="Important information for emergency responders…"
              className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
              style={{ backgroundColor: "#0F172A", border: "1px solid #334155", color: "#F8FAFC" }}
            />
          ) : (
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              {profile.emergencyNote || "No notes added"}
            </p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
