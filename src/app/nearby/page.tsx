"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Navigation,
  Heart,
  Shield,
  Flame,
  Clock,
  Star,
} from "lucide-react";
import BottomNav from "@/components/ui/BottomNav";
import PageHeader from "@/components/ui/PageHeader";

type Category = "all" | "hospital" | "police" | "fire";

interface NearbyPlace {
  id: string;
  name: string;
  type: "hospital" | "police" | "fire";
  distance: string;
  duration: string;
  address: string;
  phone: string;
  rating: number;
  open24h: boolean;
}

const places: NearbyPlace[] = [
  {
    id: "1",
    name: "City General Hospital",
    type: "hospital",
    distance: "0.8 km",
    duration: "3 min",
    address: "123 Medical Drive",
    phone: "+1 555-1000",
    rating: 4.5,
    open24h: true,
  },
  {
    id: "2",
    name: "Central Police Station",
    type: "police",
    distance: "1.2 km",
    duration: "5 min",
    address: "456 Law Street",
    phone: "+1 555-2000",
    rating: 4.2,
    open24h: true,
  },
  {
    id: "3",
    name: "Fire Station No. 7",
    type: "fire",
    distance: "1.5 km",
    duration: "6 min",
    address: "789 Rescue Ave",
    phone: "+1 555-3000",
    rating: 4.8,
    open24h: true,
  },
  {
    id: "4",
    name: "St. Mary's Clinic",
    type: "hospital",
    distance: "2.1 km",
    duration: "8 min",
    address: "321 Health Blvd",
    phone: "+1 555-4000",
    rating: 4.0,
    open24h: false,
  },
  {
    id: "5",
    name: "North District Police",
    type: "police",
    distance: "2.8 km",
    duration: "11 min",
    address: "654 Safety Road",
    phone: "+1 555-5000",
    rating: 4.1,
    open24h: true,
  },
  {
    id: "6",
    name: "Emergency Medical Center",
    type: "hospital",
    distance: "3.2 km",
    duration: "13 min",
    address: "987 Care Lane",
    phone: "+1 555-6000",
    rating: 4.7,
    open24h: true,
  },
];

const typeConfig = {
  hospital: { icon: Heart, color: "#EF4444", label: "Hospital" },
  police: { icon: Shield, color: "#3B82F6", label: "Police" },
  fire: { icon: Flame, color: "#F97316", label: "Fire Station" },
};

const categoryFilters: Array<{ id: Category; label: string; color: string }> = [
  { id: "all", label: "All", color: "#94A3B8" },
  { id: "hospital", label: "Hospitals", color: "#EF4444" },
  { id: "police", label: "Police", color: "#3B82F6" },
  { id: "fire", label: "Fire", color: "#F97316" },
];

function PlaceCard({ place }: { place: NearbyPlace }) {
  const config = typeConfig[place.type];
  const Icon = config.icon;

  return (
    <div
      className="p-4 rounded-2xl"
      style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Icon size={22} color={config.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-bold" style={{ color: "#F8FAFC" }}>
                {place.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                {place.address}
              </p>
            </div>
            {place.open24h && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                style={{ backgroundColor: "#15803D20", color: "#4ADE80" }}
              >
                24h
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <MapPin size={12} color="#64748B" />
              <span className="text-xs font-semibold" style={{ color: config.color }}>
                {place.distance}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} color="#64748B" />
              <span className="text-xs" style={{ color: "#64748B" }}>
                {place.duration} away
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} color="#FCD34D" />
              <span className="text-xs" style={{ color: "#64748B" }}>
                {place.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #334155" }}>
        <a
          href={`tel:${place.phone}`}
          className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95"
          style={{ backgroundColor: "#15803D20", color: "#4ADE80" }}
        >
          <Phone size={14} />
          Call
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(place.name + " " + place.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95"
          style={{ backgroundColor: `${config.color}20`, color: config.color }}
        >
          <Navigation size={14} />
          Directions
        </a>
      </div>
    </div>
  );
}

export default function NearbyPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = activeCategory === "all"
    ? places
    : places.filter((p) => p.type === activeCategory);

  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ backgroundColor: "#0F172A" }}>
      <PageHeader
        title="Nearby Help"
        subtitle="Hospitals, police & fire stations near you"
        accentColor="#4ADE80"
      />

      <div className="px-4 py-4 space-y-4">
        {/* Map Placeholder */}
        <div
          className="relative h-44 rounded-2xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "#1E293B", border: "1px solid #334155" }}
        >
          {/* Simulated map grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute border-b"
                style={{
                  top: `${(i + 1) * 12.5}%`,
                  left: 0,
                  right: 0,
                  borderColor: "#334155",
                }}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute border-r"
                style={{
                  left: `${(i + 1) * 12.5}%`,
                  top: 0,
                  bottom: 0,
                  borderColor: "#334155",
                }}
              />
            ))}
          </div>

          {/* Location markers */}
          <div className="absolute" style={{ top: "40%", left: "45%" }}>
            <div
              className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
              style={{ backgroundColor: "#DC2626" }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <div className="absolute" style={{ top: "25%", left: "60%" }}>
            <Heart size={16} color="#EF4444" />
          </div>
          <div className="absolute" style={{ top: "55%", left: "30%" }}>
            <Shield size={16} color="#3B82F6" />
          </div>
          <div className="absolute" style={{ top: "35%", left: "70%" }}>
            <Flame size={16} color="#F97316" />
          </div>

          <div className="text-center z-10">
            <MapPin size={28} color="#4ADE80" className="mx-auto mb-1" />
            <p className="text-xs font-semibold" style={{ color: "#4ADE80" }}>
              Your Location
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
              Tap to open in Maps
            </p>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{ backgroundColor: "#0F172A", color: "#4ADE80", border: "1px solid #334155" }}
          >
            Open Maps
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all"
              style={{
                backgroundColor: activeCategory === cat.id ? `${cat.color}20` : "#1E293B",
                color: activeCategory === cat.id ? cat.color : "#64748B",
                border: `1.5px solid ${activeCategory === cat.id ? cat.color : "#334155"}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#64748B" }}>
            {filtered.length} locations found nearby
          </p>
          <div className="space-y-3">
            {filtered.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
