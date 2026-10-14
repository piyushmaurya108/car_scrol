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
 * Supercar Scroll & Physics Animation Hook
 * Bulletproof, high-performance GSAP ScrollTrigger implementation
 */
export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const road = root.querySelector<HTMLElement>("[data-road]");
      const car = root.querySelector<HTMLElement>("[data-car]");
      const carPhysics = root.querySelector<HTMLElement>("[data-car-physics]");
      const carInner = root.querySelector<HTMLElement>("[data-car-inner]");
      const green = root.querySelector<HTMLElement>("[data-green]");
      const text = root.querySelector<HTMLElement>("[data-text]");
      const roadDashes = root.querySelector<HTMLElement>("[data-road-dashes]");
      const exhaust = root.querySelector<HTMLElement>("[data-exhaust]");
      const headlights = root.querySelectorAll<HTMLElement>("[data-headlight]");

      if (!road || !car || !green || !text) return;

      // Quick setters for GPU transforms (60/120 FPS)
      const setCarX = gsap.quickSetter(car, "x", "px");
      const setGreenX = gsap.quickSetter(green, "x", "px");
      const setTextX = gsap.quickSetter(text, "x", "px");
      const setPhysicsRot = carPhysics ? gsap.quickSetter(carPhysics, "rotation", "deg") : () => {};
      const setPhysicsY = carPhysics ? gsap.quickSetter(carPhysics, "y", "px") : () => {};
      const setPhysicsScale = carPhysics ? gsap.quickSetter(carPhysics, "scale") : () => {};
      const setDashesX = roadDashes ? gsap.quickSetter(roadDashes, "x", "px") : () => {};

      let roadW = 0;
      let carW = 0;

      const measure = () => {
        roadW = road.clientWidth || window.innerWidth;
        carW = car.offsetWidth || 480;
      };

      /** Maps scroll progress and velocity to element positions */
      const render = (progress: number, velocity: number = 0) => {
        const carX = progress * roadW;
        const edge = carX + carW * GREEN_EDGE_RATIO;
        const greenX = Math.min(edge, roadW) - roadW;

        setCarX(carX);
        setGreenX(greenX);
        setTextX(-greenX);

        if (roadDashes) {
          setDashesX(-(carX * 0.4) % 120);
        }

        // Velocity normalization (-1 to +1)
        const normalizedVel = Math.max(-1, Math.min(1, velocity / 1500));
        const absVel = Math.abs(normalizedVel);

        // Smooth suspension squat on acceleration
        setPhysicsRot(-normalizedVel * 1.6);
        setPhysicsY(absVel * 2);
        setPhysicsScale(1 + absVel * 0.015);

        // Modulate engine sound throttle
        if (soundEngine && typeof soundEngine.updateThrottle === "function") {
          soundEngine.updateThrottle(absVel);
        }

        // Exhaust flame bloom
        if (exhaust) {
          exhaust.style.transform = `translateY(-50%) scale(${1 + absVel * 0.7})`;
          exhaust.style.opacity = `${0.5 + absVel * 0.5}`;
        }

        // Headlight beam expansion
        headlights.forEach((hl) => {
          hl.style.opacity = `${0.75 + absVel * 0.25}`;
        });

        // Live HUD updates
        const speedEl = document.getElementById("hud-speed");
        const gearEl = document.getElementById("hud-gear");
        const progressEl = document.getElementById("hud-progress");
        const gForceEl = document.getElementById("hud-gforce");
        const progressBarEl = document.getElementById("hud-progress-bar");

        const currentMph = Math.round(progress * 180 + absVel * 38);
        if (speedEl) speedEl.textContent = `${currentMph}`;

        if (gearEl) {
          let gear = "N";
          if (currentMph > 160) gear = "7";
          else if (currentMph > 120) gear = "6";
          else if (currentMph > 85) gear = "5";
          else if (currentMph > 55) gear = "4";
          else if (currentMph > 30) gear = "3";
          else if (currentMph > 10) gear = "2";
          else if (currentMph > 0) gear = "1";
          gearEl.textContent = gear;
        }

        if (progressEl) {
          progressEl.textContent = `${Math.round(progress * 100)}%`;
        }

        if (progressBarEl) {
          progressBarEl.style.transform = `translateX(${progress * 100 - 100}%)`;
        }

        if (gForceEl) {
          const g = (0.2 + absVel * 1.35).toFixed(2);
          gForceEl.textContent = `${g} G`;
        }
      };

      measure();
      render(0, 0);

      /* ---------------- 1. Intro Entrance Animation ---------------- */
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduced) {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .fromTo(
            carInner || car,
            { opacity: 0, scale: 0.92, x: -40 },
            { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power3.out" }
          )
          .fromTo(
            "[data-letter]",
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.04 },
            0.15
          )
          .fromTo(
            headlights,
            { opacity: 0, scaleX: 0.3 },
            { opacity: 0.9, scaleX: 1, duration: 0.8, ease: "power2.out" },
            0.3
          );
      } else {
        gsap.set(carInner || car, { opacity: 1, scale: 1, x: 0 });
        gsap.set("[data-letter]", { yPercent: 0, opacity: 1 });
        gsap.set(headlights, { opacity: 0.9, scaleX: 1 });
      }

      /* ---------------- 2. Scroll Physics & Timeline ---------------- */
      const state = { progress: 0 };
      const midProgress = Math.max(0.05, (1 - carW / roadW) / 2);

      const cardIn = {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.08,
        ease: "power3.out",
        stagger: 0.02,
      };
      const cardOut = {
        opacity: 0,
        y: 40,
        scale: 0.94,
      };

      // Set initial card state
      gsap.set('[data-card]', cardOut);

      // Single ScrollTrigger timeline - no conflicting instances
      const scrollTl = gsap.timeline({
        scrollTrigger: {
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
        },
      });

      scrollTl
        .to(
          state,
          {
            progress: 1,
            ease: "none",
            duration: 1,
          },
          0
        )
        .fromTo('[data-step="1"]', cardOut, cardIn, midProgress)
        .fromTo('[data-step="2"]', cardOut, cardIn, SECOND_PAIR_PROGRESS);

      // Recalculate once fonts and images load
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }, scope);

    return () => ctx.revert();
  }, [scope]);
}
