"use client";

import { useState } from "react";
import { Volume2, VolumeX, Shield, Gauge, Sliders, ChevronRight } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface NavbarProps {
  driveMode: "sport" | "track" | "drift";
  setDriveMode: (mode: "sport" | "track" | "drift") => void;
  carColor: "orange" | "stealth" | "emerald";
  setCarColor: (color: "orange" | "stealth" | "emerald") => void;
}

export default function Navbar({
  driveMode,
  setDriveMode,
  carColor,
  setCarColor,
}: NavbarProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleSound = () => {
    if (soundEngine && typeof soundEngine.toggleMute === "function") {
      const active = soundEngine.toggleMute();
      setIsPlayingAudio(active);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-8 md:py-4 transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#0b0e17]/75 px-4 py-2.5 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_0_20px_rgba(255,106,26,0.5)]">
            <Gauge className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-black tracking-wider text-white">
                APEX <span className="text-orange-500">GT-V</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>
            <p className="font-mono text-[10px] text-slate-400 hidden sm:block">
              HYBRID 980 HP // TELEMETRY
            </p>
          </div>
        </div>

        {/* Center: Drive Mode & Color Switcher */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-1">
          {(["sport", "track", "drift"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setDriveMode(mode)}
              className={`rounded-lg px-3 py-1 font-mono text-xs font-bold uppercase transition-all ${
                driveMode === mode
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(255,106,26,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}

          <div className="mx-1.5 h-4 w-px bg-white/10" />

          {/* Color livery switcher */}
          <div className="flex items-center gap-1.5 px-1.5">
            <button
              onClick={() => setCarColor("orange")}
              title="Papaya Orange"
              className={`h-4 w-4 rounded-full bg-orange-500 transition-all ${
                carColor === "orange"
                  ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
            />
            <button
              onClick={() => setCarColor("stealth")}
              title="Stealth Carbon"
              className={`h-4 w-4 rounded-full bg-slate-400 transition-all ${
                carColor === "stealth"
                  ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
            />
            <button
              onClick={() => setCarColor("emerald")}
              title="Cyber Emerald"
              className={`h-4 w-4 rounded-full bg-emerald-400 transition-all ${
                carColor === "emerald"
                  ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
            />
          </div>
        </div>

        {/* Right action group: Sound Toggle & Config CTA */}
        <div className="flex items-center gap-2.5">
          {/* Interactive Web Audio Supercar Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
              isPlayingAudio
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.35)]"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">V8 AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">ENGINE SFX</span>
              </>
            )}
          </button>

          {/* Test Drive CTA */}
          <a
            href="#specs"
            className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,106,26,0.3)] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,106,26,0.6)]"
          >
            <span>CONFIGURE</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
