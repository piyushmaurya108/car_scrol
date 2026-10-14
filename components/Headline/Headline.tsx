import { HEADLINE } from "@/lib/constants";

/**
 * Supercar Hero Headline:
 * Splits the headline into per-letter masked spans for GSAP's staggered reveal.
 * Features luxury motorsport typography, specular gradient fills, and telemetry sub-badge.
 */
export default function Headline() {
  const words = HEADLINE.split(" ");

  return (
    <div className="relative pl-[5vw] select-none">
      {/* Telemetry sub-header badge */}
      <div className="mb-2 flex items-center gap-3 opacity-90">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-2.5 py-0.5 font-mono text-[clamp(0.6rem,0.9vw,0.85rem)] font-bold tracking-widest text-emerald-300 uppercase shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AERODYNAMIC TELEMETRY
        </span>
        <span className="font-mono text-[clamp(0.6rem,0.8vw,0.8rem)] tracking-wider text-slate-800 font-semibold uppercase">
          980 HP HYBRID • 0-60 MPH 2.1S
        </span>
      </div>

      {/* Main Staggered Headline */}
      <h1
        aria-label={HEADLINE}
        className="whitespace-nowrap font-display text-[clamp(3.5rem,8.4vw,9.5rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-slate-950"
      >
        {words.map((word, wi) => (
          <span key={wi} aria-hidden className="mr-[0.3em] inline-block last:mr-0">
            {word.split("").map((char, ci) => (
              <span key={ci} className="inline-block overflow-hidden align-bottom">
                <span
                  data-letter
                  className="inline-block will-change-transform transition-all"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        ))}
      </h1>
    </div>
  );
}
