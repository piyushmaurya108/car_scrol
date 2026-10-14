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
      <Navbar
        driveMode={driveMode}
        setDriveMode={setDriveMode}
        carColor={carColor}
        setCarColor={setCarColor}
      />

      <section
        ref={heroRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#07090e] select-none"
      >
        {/* Ambient Racetrack Lighting & Gradients */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Top spotlight */}
          <div className="absolute top-0 left-1/4 h-[40vh] w-[50vw] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
          {/* Bottom warm exhaust glow */}
          <div className="absolute bottom-0 right-1/4 h-[40vh] w-[50vw] rounded-full bg-orange-500/[0.04] blur-[120px]" />
          {/* Subtle circuit speed lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        {/* Floating Telemetry Metric Cards */}
        <Statistics />

        {/* ==================== THE HIGH-SPEED RACETRACK ROAD ==================== */}
        <div
          data-road
          className="relative z-10 h-[calc(var(--car-w)*0.482)] w-full overflow-hidden bg-[#0c0e15] border-y border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.95)]"
        >
          {/* Asphalt Surface Texture */}
          <div className="absolute inset-0 bg-asphalt opacity-90" />

          {/* Top Racing Kerb (Red/White Grand Prix Rumble Strip) */}
          <div className="absolute top-0 left-0 right-0 h-2.5 racing-kerb z-30 border-b border-black/40 shadow-sm" />

          {/* Bottom Racing Kerb (Red/White Grand Prix Rumble Strip) */}
          <div className="absolute bottom-0 left-0 right-0 h-2.5 racing-kerb z-30 border-t border-black/40 shadow-sm" />

          {/* Center Road Markings with Parallax translation */}
          <div
            data-road-dashes
            className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] road-dashes opacity-60 z-10"
          />

          {/* Track Sector Distance Markings */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-between px-12 font-mono text-[10px] tracking-widest text-slate-400 opacity-60">
            <span>SECTOR 01 // 000M</span>
            <span className="hidden sm:inline">APEX SPEED TRAP // 150M</span>
            <span>SECTOR 02 // 300M</span>
            <span className="hidden md:inline">FINISH LINE // 500M</span>
          </div>

          {/* ==================== GREEN VELOCITY REVEAL LAYER ==================== */}
          {/* Slides in with translateX behind the car without changing width */}
          <div
            data-green
            className="absolute inset-0 z-10 overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 will-change-transform shadow-[inset_0_0_50px_rgba(0,0,0,0.25)]"
          >
            {/* Fine carbon weave texture over the green strip */}
            <div className="absolute inset-0 bg-carbon opacity-15 mix-blend-overlay" />

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

        {/* Cockpit Telemetry HUD Bar */}
        <TelemetryBar />
      </section>
    </>
  );
}
