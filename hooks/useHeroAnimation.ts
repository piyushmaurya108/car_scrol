"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  GREEN_EDGE_RATIO,
  PIN_SCROLL_VH,
  SCRUB_SMOOTHING,
  SECOND_PAIR_PROGRESS,
} from "@/lib/constants";
import { soundEngine } from "@/lib/soundEngine";

/**
 * Supercar Scroll & Physics Animation Hook:
 * 1. Intro sequence:
 *    - Letters stagger up from masks
 *    - Car glides into starting position with subtle headlight beam power-on
 * 2. Scroll Physics & Scrubbing:
 *    - Car travels 0 -> 100% across the track with fluid inertia (scrub: 0.8s)
 *    - Dynamic suspension physics: squat, pitch & yaw rotation reacting to scroll velocity
 *    - Headlight beam intensity modulates with speed
 *    - Exhaust diffuser bloom reacts to throttle
 *    - Live HUD telemetry (Speedometer MPH, G-Force, Gear, Progress %) updates in real-time
 *    - Green velocity reveal layer counter-translates flawlessly
 *    - Telemetry cards spring in with 3D perspective at midpoint & second threshold
 */
export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const road = root.querySelector<HTMLElement>("[data-road]")!;
      const car = root.querySelector<HTMLElement>("[data-car]")!;
      const carInner = root.querySelector<HTMLElement>("[data-car-inner]")!;
      const green = root.querySelector<HTMLElement>("[data-green]")!;
      const text = root.querySelector<HTMLElement>("[data-text]")!;
      const roadDashes = root.querySelector<HTMLElement>("[data-road-dashes]");
      const exhaust = root.querySelector<HTMLElement>("[data-exhaust]");
      const headlights = root.querySelectorAll<HTMLElement>("[data-headlight]");

      // Quick setters for ultra-high 60/120 FPS GPU transforms without reflow
      const setCarX = gsap.quickSetter(car, "x", "px");
      const setGreenX = gsap.quickSetter(green, "x", "px");
      const setTextX = gsap.quickSetter(text, "x", "px");
      const setCarRot = carInner ? gsap.quickSetter(carInner, "rotation", "deg") : () => {};
      const setCarY = carInner ? gsap.quickSetter(carInner, "y", "px") : () => {};
      const setCarScale = carInner ? gsap.quickSetter(carInner, "scale", "") : () => {};
      const setDashesX = roadDashes ? gsap.quickSetter(roadDashes, "x", "px") : () => {};

      let roadW = 0;
      let carW = 0;

      const measure = () => {
        roadW = road.clientWidth;
        carW = car.offsetWidth;
      };

      /** Maps scroll progress to positions and physics */
      const render = (progress: number, velocity: number = 0) => {
        const carX = progress * roadW;
        const edge = carX + carW * GREEN_EDGE_RATIO;
        const greenX = Math.min(edge, roadW) - roadW;

        setCarX(carX);
        setGreenX(greenX);
        setTextX(-greenX);

        // Parallax speed road markings
        if (roadDashes) {
          setDashesX(-(carX * 0.35) % 120);
        }

        // Dynamic suspension physics based on velocity
        const normalizedVel = Math.max(-1, Math.min(1, velocity / 1800));
        const absVel = Math.abs(normalizedVel);

        // Subtle aerodynamic tilt: squat on acceleration (-1.4deg), lift on brake (+0.8deg)
        const targetRot = -normalizedVel * 1.5;
        const targetY = absVel * 2.5;
        const targetScale = 1 + absVel * 0.02;

        setCarRot(targetRot);
        setCarY(targetY);
        setCarScale(targetScale);

        // Sound engine modulation
        if (soundEngine && typeof soundEngine.updateThrottle === "function") {
          soundEngine.updateThrottle(absVel);
        }

        // Exhaust flame bloom
        if (exhaust) {
          exhaust.style.transform = `translateY(-50%) scale(${1 + absVel * 0.6})`;
          exhaust.style.opacity = `${0.5 + absVel * 0.5}`;
        }

        // Headlights reach expansion at high speed
        headlights.forEach((hl) => {
          hl.style.opacity = `${0.75 + absVel * 0.25}`;
        });

        // Update live HUD telemetry elements
        const speedEl = document.getElementById("hud-speed");
        const gearEl = document.getElementById("hud-gear");
        const progressEl = document.getElementById("hud-progress");
        const gForceEl = document.getElementById("hud-gforce");

        if (speedEl) {
          const currentMph = Math.round(progress * 180 + absVel * 38);
          speedEl.textContent = `${currentMph}`;
        }
        if (gearEl) {
          const currentMph = progress * 180 + absVel * 38;
          let gear = "N";
          if (currentMph > 160) gear = "7";
          else if (currentMph > 120) gear = "6";
          else if (currentMph > 85) gear = "5";
          else if (currentMph > 55) gear = "4";
          else if (currentMph > 30) gear = "3";
          else if (currentMph > 12) gear = "2";
          else if (currentMph > 1) gear = "1";
          gearEl.textContent = gear;
        }
        if (progressEl) {
          progressEl.textContent = `${Math.round(progress * 100)}%`;
        }
        if (gForceEl) {
          const g = (0.2 + absVel * 1.35).toFixed(2);
          gForceEl.textContent = `${g} G`;
        }
      };

      measure();
      render(0, 0);

      /* ---------------------------- 1. Intro Animation ---------------------------- */
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduced) {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from("[data-letter]", {
            yPercent: 120,
            opacity: 0,
            duration: 1.2,
            stagger: 0.04,
          })
          .from(
            "[data-car-inner]",
            {
              opacity: 0,
              scale: 0.88,
              x: -60,
              duration: 1.1,
              ease: "back.out(1.2)",
            },
            0.15
          )
          .from(
            "[data-headlight]",
            {
              opacity: 0,
              scaleX: 0.2,
              duration: 0.9,
              ease: "power2.out",
            },
            0.4
          );
      }

      /* ------------------------- 2. Scroll Physics & Pin ------------------------ */
      const state = { progress: 0 };
      const midProgress = Math.max(0.05, (1 - carW / roadW) / 2);

      const cardIn = {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.1,
        ease: "power3.out",
        stagger: 0.03,
      };
      const cardOut = {
        opacity: 0,
        y: 45,
        scale: 0.92,
        rotateX: -10,
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * PIN_SCROLL_VH)}`,
        pin: true,
        scrub: SCRUB_SMOOTHING,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          measure();
          render(state.progress, 0);
        },
        onUpdate: (self) => {
          render(state.progress, self.getVelocity());
        },
      });

      gsap
        .timeline({
          scrollTrigger: st,
        })
        .to(
          state,
          {
            progress: 1,
            ease: "none",
            duration: 1,
            onUpdate: () => render(state.progress, st.getVelocity()),
          },
          0
        )
        // Reveal cards dynamically at milestones
        .fromTo('[data-step="1"]', cardOut, cardIn, midProgress)
        .fromTo('[data-step="2"]', cardOut, cardIn, SECOND_PAIR_PROGRESS);

      // Refresh ScrollTrigger when fonts and images finish loading
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    }, scope);

    return () => ctx.revert();
  }, [scope]);
}
