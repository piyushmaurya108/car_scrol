"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat, StatTone } from "@/lib/stats";
import { cn } from "@/utils/cn";
import { Activity, Gauge, TrendingUp, Zap, Sparkles } from "lucide-react";

const ICONS = {
  lime: Zap,
  dark: Gauge,
  sky: Activity,
  orange: TrendingUp,
};

const TONE_STYLES: Record<
  StatTone,
  {
    border: string;
    glow: string;
    pill: string;
    badgeText: string;
    numGradient: string;
    accentBg: string;
  }
> = {
  lime: {
    border: "border-lime-400/30 hover:border-lime-400/60",
    glow: "hover:shadow-[0_0_35px_rgba(217,249,64,0.22)]",
    pill: "bg-lime-400/15 border-lime-400/30 text-lime-300",
    badgeText: "text-lime-400",
    numGradient: "from-lime-300 via-lime-400 to-emerald-400",
    accentBg: "from-lime-500/10 via-transparent to-transparent",
  },
  dark: {
    border: "border-slate-700/50 hover:border-cyan-400/40",
    glow: "hover:shadow-[0_0_35px_rgba(0,229,255,0.18)]",
    pill: "bg-slate-800/80 border-slate-700/60 text-slate-300",
    badgeText: "text-cyan-400",
    numGradient: "from-white via-slate-200 to-slate-400",
    accentBg: "from-cyan-500/10 via-transparent to-transparent",
  },
  sky: {
    border: "border-sky-400/30 hover:border-sky-400/60",
    glow: "hover:shadow-[0_0_35px_rgba(56,189,248,0.22)]",
    pill: "bg-sky-400/15 border-sky-400/30 text-sky-300",
    badgeText: "text-sky-400",
    numGradient: "from-sky-300 via-sky-400 to-cyan-400",
    accentBg: "from-sky-500/10 via-transparent to-transparent",
  },
  orange: {
    border: "border-orange-500/30 hover:border-orange-500/60",
    glow: "hover:shadow-[0_0_35px_rgba(255,112,32,0.25)]",
    pill: "bg-orange-500/15 border-orange-500/30 text-orange-300",
    badgeText: "text-orange-400",
    numGradient: "from-orange-300 via-orange-400 to-amber-500",
    accentBg: "from-orange-500/10 via-transparent to-transparent",
  },
};

export default function StatisticCard({
  value,
  numericVal,
  unit,
  label,
  subtitle,
  tone,
  category,
  delta,
  step,
}: Stat) {
  const Icon = ICONS[tone] || Sparkles;
  const style = TONE_STYLES[tone];
  const [displayNum, setDisplayNum] = useState<number>(numericVal);
  const cardRef = useRef<HTMLElement>(null);
  const animatedRef = useRef<boolean>(false);

  // Trigger smooth number counting when card becomes visible
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            let current = 0;
            const target = numericVal;
            const duration = 1200;
            const startTime = performance.now();

            const stepAnim = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              // Ease out quad
              const ease = 1 - (1 - progress) * (1 - progress);
              setDisplayNum(Math.round(current + (target - current) * ease));
              if (progress < 1) {
                requestAnimationFrame(stepAnim);
              } else {
                setDisplayNum(target);
              }
            };
            requestAnimationFrame(stepAnim);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [numericVal]);

  return (
    <article
      ref={cardRef}
      data-card
      data-step={step}
      className={cn(
        "group relative overflow-hidden rounded-2xl will-change-transform",
        "bg-[#0e121b]/85 backdrop-blur-2xl p-[clamp(0.9rem,1.8vw,2.2rem)]",
        "border transition-all duration-300 ease-out",
        "shadow-[0_20px_50px_rgba(0,0,0,0.65)]",
        "w-[clamp(180px,26vw,340px)] flex-shrink-0",
        style.border,
        style.glow
      )}
    >
      {/* Specular ambient background gradient */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-100",
          style.accentBg
        )}
      />

      {/* Top row: Category tag + icon */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[clamp(0.6rem,0.75vw,0.75rem)] font-bold tracking-wider uppercase",
            style.pill
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
          {category}
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:text-white transition-colors">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {/* Hero Stat Number */}
      <div className="relative z-10 mt-3 flex items-baseline gap-1">
        <span
          className={cn(
            "font-display text-[clamp(2.4rem,4.8vw,4.8rem)] font-black leading-none tracking-tight bg-gradient-to-br bg-clip-text text-transparent",
            style.numGradient
          )}
        >
          {displayNum}
        </span>
        <span
          className={cn(
            "font-display text-[clamp(1.4rem,2.8vw,2.6rem)] font-bold",
            style.badgeText
          )}
        >
          {unit || "%"}
        </span>
      </div>

      {/* Delta benchmark pill */}
      <div className="relative z-10 mt-1 flex items-center gap-1.5 font-mono text-[clamp(0.65rem,0.8vw,0.8rem)] text-emerald-400 font-semibold">
        <TrendingUp className="h-3 w-3" />
        <span>{delta}</span>
      </div>

      {/* Primary Label */}
      <p className="relative z-10 mt-2 font-display text-[clamp(0.85rem,1.15vw,1.15rem)] font-semibold leading-snug text-slate-100">
        {label}
      </p>

      {/* Subtitle / Telemetry Detail */}
      <p className="relative z-10 mt-1 text-[clamp(0.7rem,0.85vw,0.85rem)] leading-relaxed text-slate-400 line-clamp-2">
        {subtitle}
      </p>

      {/* Bottom corner accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-colors" />
    </article>
  );
}
