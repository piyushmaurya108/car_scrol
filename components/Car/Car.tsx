"use client";

import { memo } from "react";

interface CarProps {
  colorScheme?: "orange" | "stealth" | "emerald";
}

/**
 * Supercar component:
 * - Ultra-high-res photorealistic hypercar graphic
 * - Dynamic volumetric twin headlight beams projecting onto the road
 * - High-intensity LED taillight aura & exhaust diffuser glow
 * - Ground contact shadows under tires
 * - Aerodynamic wind streaks
 */
function Car({ colorScheme = "orange" }: CarProps) {
  return (
    <div
      data-car
      className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[var(--car-w)] will-change-transform"
    >
      <div
        data-car-inner
        className="relative h-full w-full origin-center select-none will-change-transform"
      >
        {/* ================= 1. Volumetric Headlight Beams ================= */}
        {/* Upper headlight beam cone */}
        <div
          data-headlight
          className="pointer-events-none absolute left-[88%] top-[14%] h-[70px] w-[55vw] max-w-[650px] -translate-y-1/2 origin-left opacity-90 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(ellipse 90% 50% at 0% 50%, rgba(180, 240, 255, 0.65) 0%, rgba(0, 220, 255, 0.25) 35%, rgba(0, 180, 255, 0.08) 65%, transparent 100%)",
            filter: "blur(5px)",
            transform: "perspective(400px) rotateY(-5deg) scaleY(1.3)",
          }}
        />
        {/* Lower headlight beam cone */}
        <div
          data-headlight
          className="pointer-events-none absolute left-[88%] top-[86%] h-[70px] w-[55vw] max-w-[650px] -translate-y-1/2 origin-left opacity-90 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(ellipse 90% 50% at 0% 50%, rgba(180, 240, 255, 0.65) 0%, rgba(0, 220, 255, 0.25) 35%, rgba(0, 180, 255, 0.08) 65%, transparent 100%)",
            filter: "blur(5px)",
            transform: "perspective(400px) rotateY(-5deg) scaleY(1.3)",
          }}
        />

        {/* Headlight bulb flares (bright white-cyan points) */}
        <div className="absolute left-[92%] top-[19%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_#38bdf8,0_0_30px_#00e5ff]" />
        <div className="absolute left-[92%] top-[81%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_#38bdf8,0_0_30px_#00e5ff]" />

        {/* ================= 2. Tire Contact Shadows & Ground Occlusion ================= */}
        <div
          className="absolute inset-x-[4%] inset-y-[8%] rounded-[30%] bg-black/85 blur-[14px]"
          aria-hidden="true"
        />
        {/* Front tires shadow */}
        <div className="absolute right-[12%] top-[2%] h-4 w-24 rounded-full bg-black/90 blur-[3px]" />
        <div className="absolute right-[12%] bottom-[2%] h-4 w-24 rounded-full bg-black/90 blur-[3px]" />
        {/* Rear tires shadow */}
        <div className="absolute left-[12%] top-[2%] h-4 w-24 rounded-full bg-black/90 blur-[3px]" />
        <div className="absolute left-[12%] bottom-[2%] h-4 w-24 rounded-full bg-black/90 blur-[3px]" />

        {/* ================= 3. The Photorealistic Supercar Body ================= */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/supercar.png"
          alt="High-performance aerodynamic hypercar top view"
          draggable={false}
          className={`relative z-10 h-full w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] ${
            colorScheme === "stealth"
              ? "grayscale contrast-125 brightness-90"
              : colorScheme === "emerald"
              ? "hue-rotate-90 saturate-150"
              : ""
          }`}
        />

        {/* ================= 4. Rear Taillight Glow & Exhaust Diffuser Aura ================= */}
        {/* Red taillight LED strip bloom */}
        <div
          className="absolute left-[0%] top-[12%] h-[76%] w-[18px] -translate-x-1/2 rounded-full bg-rose-500/80 opacity-90 blur-[8px]"
          style={{
            boxShadow:
              "-15px 0 35px rgba(244, 63, 94, 0.9), -30px 0 60px rgba(225, 29, 72, 0.6)",
          }}
        />

        {/* Center exhaust heat shimmer & cyan flame pulse */}
        <div
          data-exhaust
          className="pointer-events-none absolute -left-6 top-1/2 h-8 w-14 -translate-y-1/2 rounded-full bg-cyan-400/40 opacity-70 blur-[7px] transition-all duration-200"
          style={{
            boxShadow: "-10px 0 25px rgba(0, 229, 255, 0.8)",
          }}
        />

        {/* ================= 5. High-Speed Aerodynamic Wind Trails ================= */}
        <div
          data-aero-trails
          className="pointer-events-none absolute inset-0 z-20 overflow-visible opacity-60"
        >
          {/* Top wingtip wind streak */}
          <div className="absolute -left-20 top-[6%] h-[1.5px] w-28 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[0.5px]" />
          {/* Bottom wingtip wind streak */}
          <div className="absolute -left-20 bottom-[6%] h-[1.5px] w-28 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[0.5px]" />
          {/* Cockpit canopy reflection streak */}
          <div className="absolute left-[40%] top-1/2 h-[1px] w-20 -translate-y-1/2 bg-white/40 blur-[0.5px]" />
        </div>
      </div>
    </div>
  );
}

export default memo(Car);
