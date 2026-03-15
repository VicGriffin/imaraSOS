"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  Phone,
  Trash2,
  Edit3,
  Star,
  X,
  Check,
} from "lucide-react";
import BottomNav from "@/components/ui/BottomNav";
import PageHeader from "@/components/ui/PageHeader";

interface Contact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary: boolean;
  color: string;
}

const initialContacts: Contact[] = [
  { id: "1", name: "Jane Doe", relation: "Sister", phone: "+1 555-0101", isPrimary: true, color: "#A78BFA" },
  { id: "2", name: "John Smith", relation: "Friend", phone: "+1 555-0102", isPrimary: false, color: "#60A5FA" },
  { id: "3", name: "Dr. Sarah Lee", relation: "Doctor", phone: "+1 555-0103", isPrimary: false, color: "#34D399" },
];

const relationColors: Record<string, string> = {
  Sister: "#A78BFA",
  Brother: "#A78BFA",
  Mother: "#F472B6",
  Father: "#60A5FA",
  Friend: "#34D399",
  Doctor: "#FCD34D",
  Spouse: "#FB923C",
  Other: "#94A3B8",
};

function AddContactModal({ onClose, onAdd }: { onClose: () => void; onAdd: (c: Omit<Contact, "id">) => void }) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Friend");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (!name || !phone) return;
    onAdd({
      name,
      relation,
      phone,
      isPrimary: false,
      color: relationColors[relation] || "#94A3B8",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div
        className="w-full max-w-[430px] rounded-t-3xl p-5 pb-8 animate-slide-up"
        style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold" style={{ color: "#F8FAFC" }}>
            Add Emergency Contact
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#0F172A" }}
          >
            <X size={16} color="#94A3B8" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                color: "#F8FAFC",
              }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Relationship
            </label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                color: "#F8FAFC",
              }}
            >
              {["Sister", "Brother", "Mother", "Father", "Spouse", "Friend", "Doctor", "Other"].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555-0000"
              className="w-full mt-1.5 px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                color: "#F8FAFC",
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!name || !phone}
            className="w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-95 mt-2"
            style={{
              background: name && phone ? "linear-gradient(135deg, #1D4ED8, #2563EB)" : "#1E293B",
              color: name && phone ? "white" : "#475569",
            }}
          >
            <Check size={16} className="inline mr-2" />
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [showModal, setShowModal] = useState(false);

  const addContact = (c: Omit<Contact, "id">) => {
    setContacts((prev) => [...prev, { ...c, id: Date.now().toString() }]);
  };

  const removeContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const togglePrimary = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => ({ ...c, isPrimary: c.id === id ? !c.isPrimary : c.isPrimary }))
    );
  };

  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ backgroundColor: "#0F172A" }}>
      <PageHeader
        title="Emergency Contacts"
        subtitle="Notified automatically during SOS"
        accentColor="#60A5FA"
      />

      <div className="px-4 py-4 space-y-4">
        {/* Info Banner */}
        <div
          className="flex items-start gap-3 p-3 rounded-xl"
          style={{ backgroundColor: "#1D4ED820", border: "1px solid #1D4ED840" }}
        >
          <Users size={16} color="#60A5FA" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs" style={{ color: "#93C5FD" }}>
            These contacts will be automatically notified with your location when you activate SOS.
          </p>
        </div>

        {/* Contacts List */}
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 rounded-2xl"
              style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black flex-shrink-0"
                  style={{ backgroundColor: `${contact.color}20`, color: contact.color }}
                >
                  {contact.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold truncate" style={{ color: "#F8FAFC" }}>
                      {contact.name}
                    </p>
                    {contact.isPrimary && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0"
                        style={{ backgroundColor: "#EAB30820", color: "#FCD34D" }}
                      >
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                    {contact.relation} · {contact.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #334155" }}>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold flex-1 justify-center transition-all active:scale-95"
                  style={{ backgroundColor: "#15803D20", color: "#4ADE80" }}
                >
                  <Phone size={14} />
                  Call
                </a>
                <button
                  onClick={() => togglePrimary(contact.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold flex-1 justify-center transition-all active:scale-95"
                  style={{
                    backgroundColor: contact.isPrimary ? "#EAB30820" : "#1E293B",
                    color: contact.isPrimary ? "#FCD34D" : "#64748B",
                    border: "1px solid #334155",
                  }}
                >
                  <Star size={14} />
                  {contact.isPrimary ? "Primary" : "Set Primary"}
                </button>
                <button
                  onClick={() => removeContact(contact.id)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
                  style={{ backgroundColor: "#DC262620", border: "1px solid #DC262630" }}
                >
                  <Trash2 size={14} color="#F87171" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Contact Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{
            backgroundColor: "#1E293B",
            border: "2px dashed #334155",
            color: "#60A5FA",
          }}
        >
          <Plus size={18} />
          Add Emergency Contact
        </button>

        {/* Tips */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#64748B" }}>
            Tips
          </h3>
          <ul className="space-y-1.5">
            {[
              "Add at least 3 emergency contacts",
              "Include a family member and a close friend",
              "Ensure contacts know they are listed",
              "Keep phone numbers up to date",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs" style={{ color: "#94A3B8" }}>
                <span className="text-blue-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showModal && (
        <AddContactModal onClose={() => setShowModal(false)} onAdd={addContact} />
      )}

      <BottomNav />
    </div>
  );
}
