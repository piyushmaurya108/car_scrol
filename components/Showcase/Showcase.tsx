"use client";

import {
  Zap,
  Gauge,
  Cpu,
  Flame,
  ShieldCheck,
  Wind,
  Layers,
  ArrowRight,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const SPECS = [
  {
    icon: Flame,
    title: "Twin-Turbo 4.0L Hybrid V8",
    value: "980 BHP",
    detail: "Combined system output with triple axial-flux electric motors",
    metric: "0–60 MPH in 2.1s",
    tag: "POWERTRAIN",
  },
  {
    icon: Wind,
    title: "Active Aerodynamic Flaps",
    value: "840 KG",
    detail: "High-speed downforce generated at 180 MPH with DRS airbrake",
    metric: "0.31 Cd Aero Drag",
    tag: "AERODYNAMICS",
  },
  {
    icon: Layers,
    title: "Pre-Preg Carbon Monocoque",
    value: "1,280 KG",
    detail: "Motorsport-grade resin transfer carbon cell with titanium subframes",
    metric: "52,000 Nm/deg Rigidity",
    tag: "CHASSIS",
  },
  {
    icon: Cpu,
    title: "Neural CAN-Bus Telemetry",
    value: "1,000 HZ",
    detail: "Predictive dynamic yaw controller & 4-wheel independent torque vectoring",
    metric: "< 1ms Control Latency",
    tag: "TELEMETRY",
  },
];

export default function Showcase() {
  return (
    <section id="specs" className="relative bg-[#07080d] py-24 px-4 md:px-8 border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-tr from-orange-600/10 via-cyan-500/10 to-transparent blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            ENGINEERING OVERVIEW
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            UNCOMPROMISING SPEED. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
              SCIENTIFIC PRECISION.
            </span>
          </h2>
          <p className="mt-4 font-sans text-base md:text-lg text-slate-400 leading-relaxed">
            Every component of the APEX GT-V has been sculpted for zero drag and maximum
            aerodynamic downforce. Built with Formula-grade carbon composites and telemetry AI.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/10 bg-[#0e121b]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_20px_40px_rgba(255,106,26,0.15)]"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    {spec.tag}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Big Stat Value */}
                <div className="font-display text-3xl font-black tracking-tight text-white mb-1">
                  {spec.value}
                </div>

                {/* Metric pill */}
                <div className="inline-block font-mono text-xs font-semibold text-emerald-400 mb-3">
                  {spec.metric}
                </div>

                {/* Title */}
                <h3 className="font-display text-base font-bold text-slate-200 mb-2">
                  {spec.title}
                </h3>

                {/* Detail */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {spec.detail}
                </p>

                {/* Bottom line accent */}
                <div className="mt-4 h-[2px] w-8 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Performance Spec Matrix Banner */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0d1019] via-[#121724] to-[#0d1019] p-8 md:p-12 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.7)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <span className="font-mono text-xs text-slate-400 uppercase">TOP SPEED</span>
              <div className="font-display text-4xl md:text-5xl font-black text-white mt-1">
                218 <span className="text-lg font-bold text-orange-400">MPH</span>
              </div>
              <p className="font-mono text-[11px] text-slate-400 mt-1">ELECTRONICALLY MANAGED</p>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="font-mono text-xs text-slate-400 uppercase">0 – 124 MPH</span>
              <div className="font-display text-4xl md:text-5xl font-black text-white mt-1">
                6.4 <span className="text-lg font-bold text-cyan-400">SEC</span>
              </div>
              <p className="font-mono text-[11px] text-slate-400 mt-1">LAUNCH CONTROL ACTIVE</p>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="font-mono text-xs text-slate-400 uppercase">LATERAL GRIP</span>
              <div className="font-display text-4xl md:text-5xl font-black text-white mt-1">
                1.75 <span className="text-lg font-bold text-emerald-400">G</span>
              </div>
              <p className="font-mono text-[11px] text-slate-400 mt-1">MICHELIN CUP 2R TIRES</p>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="font-mono text-xs text-slate-400 uppercase">CURB WEIGHT</span>
              <div className="font-display text-4xl md:text-5xl font-black text-white mt-1">
                1,280 <span className="text-lg font-bold text-amber-400">KG</span>
              </div>
              <p className="font-mono text-[11px] text-slate-400 mt-1">DRY TRACK SPECIFICATION</p>
            </div>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6 md:p-8">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white">
              Experience the GT-V On Track
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Private track sessions and custom bespoke orders now open for delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition-all"
            >
              Back To Top
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Apex GT-V Configurator reserved for demo. Thank you!");
              }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(255,106,26,0.4)] hover:scale-105 transition-all"
            >
              <span>Build Specification</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono">
          <p>© 2026 APEX MOTORS / ITZFIZZ SCROLL HERO. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 sm:mt-0">DESIGNED WITH NEXT.JS, GSAP & TAILWIND</p>
        </div>
      </div>
    </section>
  );
}
