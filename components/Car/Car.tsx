"use client";

import { memo } from "react";

interface CarProps {
  colorScheme?: "orange" | "stealth" | "emerald";
}

/**
 * Supercar component:
 * - [data-car]: outer wrapper moved by scroll position (x: carX)
 * - [data-car-physics]: middle wrapper for suspension squat/pitch (rotation, y, scale)
 * - [data-car-inner]: inner wrapper for intro fade-in (opacity, scale)
 * - Headlight volumetric beams, exhaust bloom, and contact tire shadows
 */
function Car({ colorScheme = "orange" }: CarProps) {
  return (
    <div
      data-car
      style={{ width: "var(--car-w, clamp(260px, 32vw, 680px))" }}
      className="pointer-events-none absolute left-0 top-0 z-20 h-full will-change-transform"
    >
      <div
        data-car-physics
        className="h-full w-full will-change-transform origin-center"
      >
        <div
          data-car-inner
          className="relative h-full w-full select-none will-change-transform"
        >
          {/* ================= 1. Volumetric Headlight Beams ================= */}
          <div
            data-headlight
            className="pointer-events-none absolute left-[88%] top-[14%] h-[65px] w-[50vw] max-w-[600px] -translate-y-1/2 origin-left opacity-90 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(ellipse 90% 50% at 0% 50%, rgba(180, 240, 255, 0.75) 0%, rgba(0, 220, 255, 0.3) 40%, rgba(0, 180, 255, 0.08) 70%, transparent 100%)",
              filter: "blur(4px)",
              transform: "perspective(400px) rotateY(-5deg) scaleY(1.3)",
            }}
          />
          <div
            data-headlight
            className="pointer-events-none absolute left-[88%] top-[86%] h-[65px] w-[50vw] max-w-[600px] -translate-y-1/2 origin-left opacity-90 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(ellipse 90% 50% at 0% 50%, rgba(180, 240, 255, 0.75) 0%, rgba(0, 220, 255, 0.3) 40%, rgba(0, 180, 255, 0.08) 70%, transparent 100%)",
              filter: "blur(4px)",
              transform: "perspective(400px) rotateY(-5deg) scaleY(1.3)",
            }}
          />

          {/* Headlight projector flares */}
          <div className="absolute left-[92%] top-[19%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_#38bdf8,0_0_30px_#00e5ff]" />
          <div className="absolute left-[92%] top-[81%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_#38bdf8,0_0_30px_#00e5ff]" />

          {/* ================= 2. Tire Contact Shadows & Ground Occlusion ================= */}
          <div
            className="absolute inset-x-[4%] inset-y-[8%] rounded-[30%] bg-black/90 blur-[12px]"
            aria-hidden="true"
          />

          {/* ================= 3. The Photorealistic Supercar Body ================= */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/supercar.png"
            alt="Orange sports car, top view"
            draggable={false}
            className={`relative z-10 h-full w-full object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] ${
              colorScheme === "stealth"
                ? "grayscale contrast-125 brightness-90"
                : colorScheme === "emerald"
                ? "hue-rotate-90 saturate-150"
                : ""
            }`}
            onError={(e) => {
              // Graceful fallback to SVG if image fails
              (e.target as HTMLImageElement).src = "/car.svg";
            }}
          />

          {/* ================= 4. Rear Taillight Glow & Exhaust Diffuser Aura ================= */}
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
            <div className="absolute -left-20 top-[6%] h-[1.5px] w-28 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[0.5px]" />
            <div className="absolute -left-20 bottom-[6%] h-[1.5px] w-28 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-[0.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Car);
