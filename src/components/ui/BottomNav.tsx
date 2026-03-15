"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MapPin, BookOpen, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/contacts", icon: Users, label: "Contacts" },
  { href: "/nearby", icon: MapPin, label: "Nearby" },
  { href: "/info", icon: BookOpen, label: "Info" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 safe-bottom glass-strong animate-slide-up card-3d"
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: 'blur(26px) saturate(210%)',
        background: 'linear-gradient(135deg, rgba(20, 27, 44, 0.85), rgba(20, 27, 44, 0.65))',
        boxShadow: '0 -20px 80px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
      }}
    >
      <div className="flex items-center justify-around px-4 py-4">
        {navItems.map(({ href, icon: Icon, label }, index) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-500 touch-target relative card-3d"
              style={{
                color: isActive ? "var(--sos-red)" : "var(--text-muted)",
                backgroundColor: isActive ? "rgba(239, 68, 68, 0.18)" : "transparent",
                border: isActive ? "1.5px solid rgba(239, 68, 68, 0.35)" : "1px solid transparent",
                transformStyle: 'preserve-3d',
                perspective: '1200px'
              }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active indicator with glow */}
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: "var(--sos-red)",
                      boxShadow: '0 0 18px rgba(239, 68, 68, 0.7)'
                    }}
                  />
                  <div 
                    className="w-8 h-0.5 rounded-full opacity-60"
                    style={{ backgroundColor: "var(--sos-red)" }}
                  />
                </div>
              )}
              
              {/* 3D Icon container */}
              <div className="relative transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                <Icon 
                  size={26} 
                  strokeWidth={isActive ? 3 : 2}
                  className="transition-all duration-500"
                  style={{
                    filter: isActive ? `drop-shadow(0 0 15px rgba(220, 38, 38, 0.4))` : `drop-shadow(0 0 8px var(--text-muted))`,
                    transform: 'translateZ(5px)'
                  }}
                />
                
                {/* Icon glow on hover */}
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    filter: `drop-shadow(0 0 20px ${isActive ? 'rgba(220, 38, 38, 0.6)' : 'var(--sos-purple)'})`,
                    transform: 'scale(1.2) translateZ(-5px)'
                  }}
                >
                  <Icon 
                    size={26} 
                    strokeWidth={2}
                    style={{ opacity: 0.3 }}
                  />
                </div>
              </div>
              
              <span className="text-xs font-bold transition-all duration-500" style={{ 
                textShadow: isActive ? '0 0 10px rgba(220, 38, 38, 0.3)' : 'none',
                transform: 'translateZ(2px)'
              }}>
                {label}
              </span>
              
              {/* Advanced hover effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.1), transparent 70%)",
                  boxShadow: 'inset 0 0 20px rgba(139, 92, 246, 0.05)',
                  transform: 'translateZ(3px)'
                }}
              />
              
              {/* Floating particles for active state */}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-white rounded-full animate-particle"
                      style={{
                        top: `${20 + (i * 20)}%`,
                        left: `${30 + (i * 20)}%`,
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0.7
                      }}
                    />
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
