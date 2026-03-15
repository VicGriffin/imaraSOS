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
      className="sticky top-0 z-40 px-4 pt-4 pb-3"
      style={{ backgroundColor: "#0F172A", borderBottom: "1px solid #1E293B" }}
    >
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{ backgroundColor: "#1E293B" }}
          aria-label="Go back"
        >
          <ArrowLeft size={20} color="#94A3B8" />
        </Link>
        <div>
          <h1 className="text-lg font-bold leading-tight" style={{ color: accentColor }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
