"use client";

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingScreen({ isLoading, message = "Loading..." }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="relative inline-block">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center animate-float"
            style={{
              background: "linear-gradient(135deg, var(--sos-red), var(--sos-red-dark))",
              boxShadow: "0 8px 25px rgba(220, 38, 38, 0.4)",
            }}
          >
            <span className="text-white text-lg font-black">SOS</span>
          </div>
          
          {/* Pulse rings */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              animation: "sos-ring 2s ease-out infinite",
              border: "2px solid rgba(220, 38, 38, 0.4)",
            }}
          />
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className="text-lg font-semibold" style={{ color: "var(--text-secondary)" }}>
            {message}
          </p>
          
          {/* Loading dots */}
          <div className="flex justify-center gap-1">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--sos-red)", animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--sos-red)", animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--sos-red)", animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
