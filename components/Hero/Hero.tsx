"use client";

import { useRef, useState } from "react";
import Headline from "@/components/Headline/Headline";
import Car from "@/components/Car/Car";
import Statistics from "@/components/Statistics/Statistics";
import Navbar from "@/components/Navbar/Navbar";
import TelemetryBar from "@/components/HUD/TelemetryBar";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [driveMode, setDriveMode] = useState<"sport" | "track" | "drift">("sport");
  const [carColor, setCarColor] = useState<"orange" | "stealth" | "emerald">("orange");

  useHeroAnimation(heroRef);

  return (
    <>
      {/* Top Navbar */}
      <Navbar
        driveMode={driveMode}
        setDriveMode={setDriveMode}
        carColor={carColor}
        setCarColor={setCarColor}
      />

      {/* Main Pinned Hero Animation Viewport */}
      <section
        ref={heroRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#07090e] select-none"
      >
        {/* Ambient Racetrack Lighting & Gradients */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Top cyan atmospheric spotlight */}
          <div className="absolute -top-20 left-1/4 h-[50vh] w-[50vw] rounded-full bg-cyan-500/[0.08] blur-[140px]" />
          {/* Bottom warm exhaust orange glow */}
          <div className="absolute -bottom-20 right-1/4 h-[50vh] w-[50vw] rounded-full bg-orange-500/[0.08] blur-[140px]" />
          {/* Subtle grid pattern for aerospace track feeling */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-60" />
        </div>

        {/* Floating Telemetry Metric Cards */}
        <Statistics />

        {/* ==================== THE HIGH-SPEED RACETRACK ROAD ==================== */}
        <div
          data-road
          style={{
            height: "calc(var(--car-w, clamp(260px, 32vw, 680px)) * 0.482)",
            minHeight: "150px",
          }}
          className="relative z-10 w-full overflow-hidden bg-[#161922] border-y-2 border-slate-700/60 shadow-[0_0_100px_rgba(0,0,0,0.95)]"
        >
          {/* Asphalt Surface Texture */}
          <div className="absolute inset-0 bg-asphalt opacity-95" />

          {/* Top Racing Kerb (Red/White Grand Prix Rumble Strip) */}
          <div className="absolute top-0 left-0 right-0 h-3 racing-kerb z-30 border-b border-black/50 shadow-sm" />

          {/* Bottom Racing Kerb (Red/White Grand Prix Rumble Strip) */}
          <div className="absolute bottom-0 left-0 right-0 h-3 racing-kerb z-30 border-t border-black/50 shadow-sm" />

          {/* Center Road Markings with Parallax translation */}
          <div
            data-road-dashes
            className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[4px] road-dashes opacity-70 z-10"
          />

          {/* Track Sector Distance Markings */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-between px-8 md:px-14 font-mono text-[11px] font-bold tracking-widest text-slate-400 opacity-80">
            <span>SECTOR 01 // 000M</span>
            <span className="hidden sm:inline">SPEED TRAP // 150M</span>
            <span>SECTOR 02 // 300M</span>
            <span className="hidden md:inline">FINISH LINE // 500M</span>
          </div>

          {/* Starting Lane Grid Guide */}
          <div className="pointer-events-none absolute left-[3vw] top-1/2 -translate-y-1/2 z-10 font-mono text-xs font-bold text-orange-400/40 tracking-widest">
            GRID // 01 [LAUNCH PAD]
          </div>

          {/* ==================== GREEN VELOCITY REVEAL LAYER ==================== */}
          {/* Slides in with translateX behind the car without changing width */}
          <div
            data-green
            className="absolute inset-0 z-10 overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 will-change-transform shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]"
          >
            {/* Fine carbon weave texture over the green strip */}
            <div className="absolute inset-0 bg-carbon opacity-20 mix-blend-overlay" />

            {/* Glowing Laser Blade Edge right at the reveal boundary */}
            <div className="absolute right-0 top-0 bottom-0 w-[5px] bg-white energy-laser z-20" />

            {/* Counter-translated so headline stays fixed while the layer unmasks */}
            <div
              data-text
              className="absolute inset-0 flex items-center will-change-transform z-10"
            >
              <Headline />
            </div>
          </div>

          {/* ==================== THE CAR ==================== */}
          <Car colorScheme={carColor} />
        </div>
      </section>

      {/* Cockpit Telemetry HUD Bar (Rendered outside the pinned section so it never gets displaced) */}
      <TelemetryBar />
    </>
  );
}
