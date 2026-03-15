"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Heart,
  Shield,
  Flame,
  Car,
  MessageCircleHeart,
  MapPin,
  Users,
  AlertTriangle,
  BookOpen,
  Share2,
  Bell,
  ChevronRight,
} from "lucide-react";
import BottomNav from "@/components/ui/BottomNav";

// ─── SOS Button ──────────────────────────────────────────────────────────────

function SOSButton() {
  const [state, setState] = useState<"idle" | "countdown" | "active">("idle");
  const [count, setCount] = useState(3);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = () => {
    if (state !== "idle") return;
    setState("countdown");
    setCount(3);
  };

  const cancel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState("idle");
    setCount(3);
  };

  useEffect(() => {
    if (state === "countdown") {
      intervalRef.current = setInterval(() => {
        setCount((c) => {
          if (c <= 1) {
            clearInterval(intervalRef.current!);
            setState("active");
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state]);

  if (state === "active") {
    return (
      <Link href="/sos-active" className="block">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div
            className="w-48 h-48 rounded-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #DC2626, #991B1B)",
              boxShadow: "0 0 0 12px rgba(220,38,38,0.3), 0 0 0 24px rgba(220,38,38,0.15), 0 20px 60px rgba(220,38,38,0.4)",
              animation: "alert-flash 1s infinite, sos-glow 2s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/5" />
            <span className="text-white text-5xl font-black tracking-widest z-10 animate-pulse">SOS</span>
            <span className="text-red-100 text-sm mt-2 font-semibold z-10">ALERT SENT</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-red-400 animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-red-400 text-base font-bold animate-pulse">
              🚨 Emergency alert activated
            </p>
            <p className="text-red-300 text-sm animate-slide-up">
              Help is on the way - Stay calm
            </p>
          </div>
        </div>
      </Link>
    );
  }

  if (state === "countdown") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-48">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1E293B" strokeWidth="6" opacity="0.3" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#countdown-gradient)"
              strokeWidth="6"
              strokeDasharray="283"
              strokeDashoffset={283 - (count / 3) * 283}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />
            <defs>
              <linearGradient id="countdown-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </svg>
          <div
            className="absolute inset-0 rounded-full flex flex-col items-center justify-center glass-strong"
            style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.9), rgba(249,115,22,0.9))" }}
          >
            <span className="text-white text-7xl font-black animate-pulse">{count}</span>
            <span className="text-red-100 text-sm font-semibold">Sending SOS…</span>
          </div>
        </div>
        <button
          onClick={cancel}
          className="px-10 py-4 rounded-full text-sm font-bold transition-all active:scale-95 glass hover:glass-strong"
          style={{ border: "2px solid var(--border-color)" }}
        >
          <span className="flex items-center gap-2">
            <span>✕</span> Cancel
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        onPointerDown={startCountdown}
        className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-500 active:scale-95 overflow-hidden group card-3d"
        style={{
          background: "linear-gradient(135deg, #DC2626, #ff6b6b, #991B1B)",
          boxShadow: "0 0 0 16px rgba(220,38,38,0.2), 0 24px 80px rgba(220,38,38,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          backgroundSize: "300% 300%",
          animation: "morph-gradient 8s ease-in-out infinite, sos-glow 3s ease-in-out infinite",
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        aria-label="Activate SOS emergency alert"
      >
        {/* Advanced 3D pulse rings */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            animation: "sos-ring 3s ease-out infinite",
            border: "6px solid rgba(220,38,38,0.7)",
            transform: 'translateZ(-20px)'
          }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{
            animation: "sos-ring 3s ease-out infinite 1s",
            border: "4px solid rgba(220,38,38,0.5)",
            transform: 'translateZ(-15px)'
          }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{
            animation: "sos-ring 3s ease-out infinite 2s",
            border: "3px solid rgba(220,38,38,0.3)",
            transform: 'translateZ(-10px)'
          }}
        />
        
        {/* 3D Glass overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.2), transparent, rgba(255,255,255,0.1))",
            backdropFilter: 'blur(8px)',
            transform: 'translateZ(5px)'
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-particle"
              style={{
                top: `${20 + (i * 12)}%`,
                left: `${25 + (i * 10)}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.6
              }}
            />
          ))}
        </div>
        
        <span className="text-white text-7xl font-black tracking-widest z-10 animate-pulse" style={{ 
          textShadow: '0 0 30px rgba(255,255,255,0.5)',
          transform: 'translateZ(10px)'
        }}>SOS</span>
        <span className="text-red-100 text-base font-semibold z-10 mt-2" style={{ 
          transform: 'translateZ(10px)',
          textShadow: '0 0 15px rgba(255,255,255,0.3)'
        }}>Hold to activate</span>
      </button>
      
      <div className="text-center space-y-2">
        <p className="text-base text-center" style={{ color: "var(--text-secondary)" }}>
          Press and hold to send emergency alert
        </p>
        <div className="flex items-center justify-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span>Location services active</span>
          <span>•</span>
          <span>Ready to respond</span>
        </div>
      </div>
    </div>
  );
}

// ─── Emergency Type Card ──────────────────────────────────────────────────────

interface EmergencyCardProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
}

function EmergencyCard({ href, icon, label, sublabel, color, bgColor }: EmergencyCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-4 p-7 rounded-3xl transition-all duration-500 active:scale-95 touch-target card card-3d"
      style={{ 
        backgroundColor: bgColor, 
        border: `1.5px solid ${color}28`,
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: '1200px'
      }}
    >
      {/* Advanced hover gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05, transparent)`,
          transform: 'translateZ(10px)'
        }}
      />
      
      {/* Animated corner dots */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: color }} />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: color }} />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: color }} />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: color }} />
      
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 relative z-10"
        style={{ 
          backgroundColor: `${color}20`,
          boxShadow: `0 8px 25px ${color}30, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
      </div>
      
      <div className="text-center relative z-10 space-y-1.5">
        <p className="text-base font-bold leading-tight transition-all duration-300 tracking-tight" style={{ color, textShadow: `0 0 16px ${color}35` }}>
          {label}
        </p>
        <p className="text-xs font-medium transition-all duration-300" style={{ color: "var(--text-muted)" }}>
          {sublabel}
        </p>
      </div>
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${color}30, inset 0 0 20px ${color}10`,
          background: `radial-gradient(circle at center, ${color}05, transparent)`
        }}
      />
    </Link>
  );
}

// ─── Quick Action ─────────────────────────────────────────────────────────────

interface QuickActionProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}

function QuickAction({ href, icon, label, color }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 active:scale-95 glass-morphism hover:glass-strong card-3d"
      style={{ 
        border: `1px solid rgba(255, 255, 255, 0.08)`,
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))'
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 relative"
        style={{ 
          backgroundColor: `${color}20`,
          boxShadow: `0 6px 20px ${color}25, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
          background: `linear-gradient(135deg, ${color}25, ${color}15)`
        }}
      >
        <div className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
        
        {/* Subtle glow effect */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `0 0 20px ${color}30`,
            background: `radial-gradient(circle at center, ${color}08, transparent)`
          }}
        />
      </div>
      
      <div className="flex-1">
        <span className="text-sm font-semibold transition-all duration-300" style={{ 
          color: "var(--text-secondary)",
          textShadow: `0 0 10px ${color}20`
        }}>
          {label}
        </span>
      </div>
      
      <div className="relative">
        <ChevronRight 
          size={20} 
          color="var(--text-muted)" 
          className="transition-all duration-500 group-hover:translate-x-2 group-hover:scale-125"
          style={{
            filter: `drop-shadow(0 0 8px ${color}20)`
          }}
        />
        
        {/* Animated trail effect */}
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transform: 'translateX(-10px)',
            filter: 'blur(2px)'
          }}
        >
          <ChevronRight 
            size={16} 
            color={color} 
            className="animate-pulse"
          />
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Enhanced 3D Header */}
      <header className="glass-strong animate-slide-down card-3d">
        <div className="flex items-center justify-between px-6 pt-5 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center animate-float card-3d"
                style={{ 
                  background: "linear-gradient(135deg, var(--sos-red), #ff7a7a, var(--sos-red-dark))",
                  boxShadow: "0 14px 44px rgba(239, 68, 68, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
                  backgroundSize: "200% 200%",
                  animation: "float-3d 4s ease-in-out infinite, morph-gradient 6s ease-in-out infinite"
                }}
              >
                <span className="text-white text-sm font-black animate-neon">SOS</span>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                  Imara<span style={{ color: "var(--sos-red)" }}>SOS</span>
                </span>
                <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  Emergency Response Platform
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-morphism animate-pulse"
              style={{ 
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))", 
                border: "1px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 4px 20px rgba(16, 185, 129, 0.2)"
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold" style={{ color: "var(--sos-green)" }}>
                Online
              </span>
            </div>
            <Link
              href="/notifications"
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 glass-morphism hover:glass-strong card-3d"
              aria-label="Notifications"
            >
              <Bell size={20} color="var(--text-secondary)" className="transition-colors group-hover:text-current" />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 px-6 py-6 space-y-8">
        {/* Enhanced Time & Status with 3D effects */}
        <div className="text-center space-y-5 animate-fade-in">
          <div className="relative inline-block card-3d">
            <p className="text-7xl font-black tabular-nums tracking-tight" style={{ 
              color: "var(--text-primary)",
              textShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
              background: "linear-gradient(135deg, var(--text-primary), var(--text-secondary), var(--text-primary))",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "morph-gradient 8s ease-in-out infinite"
            }}>
              {time}
            </p>
            <div 
              className="absolute -inset-4 rounded-2xl opacity-40"
              style={{
                background: "linear-gradient(45deg, var(--sos-purple), var(--sos-blue), var(--sos-pink))",
                filter: "blur(32px)",
                animation: "morph-gradient 6s ease-in-out infinite"
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="font-semibold">Location services active</span>
            <span className="text-xs opacity-50">•</span>
            <span className="font-semibold">GPS ready</span>
          </div>
        </div>

        {/* Ultra-Enhanced SOS Button */}
        <div className="flex justify-center py-6 animate-scale-in">
          <SOSButton />
        </div>

        {/* Ultra-Modern Emergency Types with 3D */}
        <div className="space-y-5 animate-slide-up">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Emergency Type
            </h2>
            <div className="flex-1 mx-4 h-0.5 rounded-full" style={{ 
              background: "linear-gradient(90deg, var(--sos-red), transparent, var(--sos-blue))",
              animation: "morph-gradient 4s ease-in-out infinite"
            }} />
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ 
              background: "linear-gradient(135deg, var(--sos-red), var(--sos-blue))",
              boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)"
            }} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <EmergencyCard
              href="/emergency/medical"
              icon={<Heart size={36} color="#EF4444" strokeWidth={2.5} />}
              label="Medical"
              sublabel="Injury · Illness · Cardiac"
              color="#EF4444"
              bgColor="var(--bg-card)"
            />
            <EmergencyCard
              href="/emergency/police"
              icon={<Shield size={36} color="#3B82F6" strokeWidth={2.5} />}
              label="Police"
              sublabel="Crime · Threat · Violence"
              color="#3B82F6"
              bgColor="var(--bg-card)"
            />
            <EmergencyCard
              href="/emergency/fire"
              icon={<Flame size={36} color="#F97316" strokeWidth={2.5} />}
              label="Fire"
              sublabel="Fire · Gas leak · Explosion"
              color="#F97316"
              bgColor="var(--bg-card)"
            />
            <EmergencyCard
              href="/emergency/accident"
              icon={<Car size={36} color="#EAB308" strokeWidth={2.5} />}
              label="Accident"
              sublabel="Crash · Rescue · Trapped"
              color="#EAB308"
              bgColor="var(--bg-card)"
            />
          </div>
        </div>

        {/* Ultra-Enhanced Talk to Someone */}
        <Link
          href="/support"
          className="group flex items-center gap-6 p-6 rounded-3xl transition-all duration-500 active:scale-95 glass-morphism hover:glass-strong animate-slide-in-right card-3d"
          style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.05))",
            border: "2px solid rgba(139, 92, 246, 0.2)",
            backgroundSize: "200% 200%",
            animation: "morph-gradient 10s ease-in-out infinite"
          }}
        >
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 card-3d"
            style={{ 
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.15))",
              boxShadow: "0 12px 40px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            }}
          >
            <MessageCircleHeart size={40} color="#A78BFA" strokeWidth={2.5} className="transition-colors group-hover:text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-xl transition-colors duration-300" style={{ 
              color: "#C4B5FD",
              textShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
            }}>
              Talk to Someone
            </p>
            <p className="text-sm mt-2 transition-colors duration-300" style={{ color: "var(--sos-purple)" }}>
              Emotional support · Crisis counseling
            </p>
            <p className="text-sm mt-3 font-medium transition-colors duration-300" style={{ color: "var(--text-muted)" }}>
              You are not alone. Help is here.
            </p>
          </div>
          <ChevronRight 
            size={28} 
            color="#A78BFA" 
            className="transition-all duration-500 group-hover:translate-x-3 group-hover:scale-125"
          />
        </Link>

        {/* Enhanced Quick Actions */}
        <div className="space-y-4 animate-slide-in-left">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
              Quick Actions
            </h2>
            <div className="w-8 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--sos-blue), transparent)" }} />
          </div>
          <div className="space-y-3">
            <QuickAction
              href="/location"
              icon={<Share2 size={22} color="#22D3EE" />}
              label="Share My Location"
              color="#22D3EE"
            />
            <QuickAction
              href="/nearby"
              icon={<MapPin size={22} color="#4ADE80" />}
              label="Nearby Help"
              color="#4ADE80"
            />
            <QuickAction
              href="/hazard"
              icon={<AlertTriangle size={22} color="#FBBF24" />}
              label="Report a Hazard"
              color="#FBBF24"
            />
            <QuickAction
              href="/info"
              icon={<BookOpen size={22} color="#F472B6" />}
              label="Emergency Information"
              color="#F472B6"
            />
            <QuickAction
              href="/contacts"
              icon={<Users size={22} color="#60A5FA" />}
              label="Emergency Contacts"
              color="#60A5FA"
            />
          </div>
        </div>

        {/* Enhanced Safety tip */}
        <div className="glass p-5 rounded-2xl animate-fade-in" style={{ border: "1px solid var(--border-color)" }}>
          <div className="flex items-start gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: "rgba(251, 191, 36, 0.2)" }}
            >
              <AlertTriangle size={16} color="#FBBF24" strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                Safety Tip
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Keep your emergency contacts updated and ensure location services are enabled for faster response times.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
