"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  accentColor?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backHref = "/",
  accentColor = "#60A5FA",
}: PageHeaderProps) {
  return (
    <div
      className="sticky top-0 z-40 px-4 pt-5 pb-4 glass-strong"
      style={{ 
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
        backdropFilter: 'blur(20px) saturate(180%)'
      }}
    >
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 hover:scale-110 hover:bg-opacity-80"
          style={{ 
            backgroundColor: "var(--bg-tertiary)",
            border: "1px solid var(--border-color)"
          }}
          aria-label="Go back"
        >
          <ArrowLeft size={20} color="var(--text-secondary)" />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold leading-tight tracking-tight" style={{ color: accentColor }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs mt-1 font-medium" style={{ color: "var(--text-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
