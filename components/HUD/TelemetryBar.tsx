"use client";

import { ChevronDown, Gauge, Cpu, Zap, Compass } from "lucide-react";

export default function TelemetryBar() {
  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-40 px-4 md:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-white/10 bg-[#080b13]/85 px-4 py-2.5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        {/* Speedometer Cluster */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Gauge className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span
                id="hud-speed"
                className="font-mono text-2xl md:text-3xl font-black text-white tracking-tight"
              >
                0
              </span>
              <span className="font-mono text-[11px] font-bold text-orange-400 uppercase">
                MPH
              </span>
            </div>
            <p className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
              GPS GROUND VELOCITY
            </p>
          </div>
        </div>

        {/* Gear Selector & G-Force */}
        <div className="flex items-center gap-4 border-x border-white/10 px-4 md:px-6">
          {/* Gear */}
          <div className="text-center">
            <div className="flex items-center justify-center">
              <span className="font-mono text-[10px] text-slate-400 uppercase mr-1">GEAR</span>
              <span
                id="hud-gear"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 font-mono text-sm font-black text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              >
                N
              </span>
            </div>
            <span className="font-mono text-[9px] text-slate-400">7-SPD DCT</span>
          </div>

          {/* G-Force */}
          <div className="text-center hidden sm:block">
            <div className="font-mono text-xs font-bold text-cyan-300">
              <span id="hud-gforce">0.20 G</span>
            </div>
            <span className="font-mono text-[9px] text-slate-400 uppercase">LATERAL G</span>
          </div>
        </div>

        {/* Center: Scroll Instruction */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-300">
            <span>SCROLL TO ACCELERATE</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-orange-400" />
          </div>
          <div className="mt-0.5 h-1 w-28 overflow-hidden rounded-full bg-white/10">
            <div
              id="hud-progress-bar"
              className="h-full w-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-100"
              style={{ transform: "translateX(-100%)" }}
            />
          </div>
        </div>

        {/* Track Sector & Progress Percentage */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span
                id="hud-progress"
                className="font-mono text-lg md:text-xl font-bold text-emerald-400"
              >
                0%
              </span>
            </div>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
              SECTOR 1 COMPLETE
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
            <Compass className="h-4 w-4 animate-spin-slow" />
          </div>
        </div>
      </div>
    </div>
  );
}
