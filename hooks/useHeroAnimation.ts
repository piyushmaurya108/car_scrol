"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { GREEN_EDGE_RATIO, PIN_SCROLL_VH, SCRUB_SMOOTHING, SECOND_PAIR_PROGRESS } from "@/lib/constants";

/**
 * All hero motion lives here:
 *  1. Intro  – car fades in (time-based, plays once). The headline letters are staggered in too,
 *              but they sit on the green layer, so they only become visible as the car uncovers them.
 *  2. Scroll – hero is pinned; scroll progress (0 → 1) directly drives the car, the green reveal,
 *              the counter-translated headline AND the cards (scrubbed, NOT autoplay).
 *              Cards stay hidden until the car reaches the middle of the screen:
 *              58% + 23% first, then 27% + 40%.
 *
 * Only transforms are animated → no layout reflow, GPU-composited.
 */
export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const road = root.querySelector<HTMLElement>("[data-road]")!;
      const car = root.querySelector<HTMLElement>("[data-car]")!;
      const green = root.querySelector<HTMLElement>("[data-green]")!;
      const text = root.querySelector<HTMLElement>("[data-text]")!;

      // quickSetter = cheapest way to write transforms inside a hot loop.
      const setCarX = gsap.quickSetter(car, "x", "px");
      const setGreenX = gsap.quickSetter(green, "x", "px");
      const setTextX = gsap.quickSetter(text, "x", "px");

      // Measurements are cached and only refreshed on ScrollTrigger refresh (resize etc.),
      // never inside the scroll update.
      let roadW = 0;
      let carW = 0;

      const measure = () => {
        roadW = road.clientWidth;
        carW = car.offsetWidth;
      };

      /** Maps scroll progress to element positions. */
      const render = (progress: number) => {
        const carX = progress * roadW; // car's left edge travels 0 → off-screen right
        const edge = carX + carW * GREEN_EDGE_RATIO; // green edge hides under the car's rear
        const greenX = Math.min(edge, roadW) - roadW; // -roadW … 0
        setCarX(carX);
        setGreenX(greenX);
        setTextX(-greenX); // cancel the parent's movement so text doesn't slide
      };

      measure();
      render(0);

      /* ---------------------------- 1. Intro ---------------------------- */
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduced) {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from("[data-letter]", { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.05 })
          .from("[data-car-inner]", { opacity: 0, scale: 0.92, duration: 0.9 }, 0.1);
      }

      /* ------------------------- 2. Scroll + pin ------------------------ */
      const state = { progress: 0 };

      // Progress at which the car's centre is at the screen centre.
      const midProgress = Math.max(0.05, (1 - carW / roadW) / 2);
      const cardIn = { opacity: 1, y: 0, scale: 1, duration: 0.07, ease: "power3.out", stagger: 0.02 };
      const cardOut = { opacity: 0, y: 40, scale: 0.94 };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * PIN_SCROLL_VH)}`,
            pin: true,
            scrub: SCRUB_SMOOTHING, // scroll position directly controls the timeline
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              measure();
              render(state.progress);
            },
          },
        })
        .to(state, {
          progress: 1,
          ease: "none", // 1:1 with scroll; smoothing comes from scrub
          duration: 1,
          onUpdate: () => render(state.progress),
        }, 0)
        // Cards are scroll-linked too: hidden until the car reaches the middle.
        .fromTo('[data-step="1"]', cardOut, cardIn, midProgress)
        .fromTo('[data-step="2"]', cardOut, cardIn, SECOND_PAIR_PROGRESS);

      // Fonts / images can change layout – recalc once they're ready.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    }, scope);

    // Reverts every tween + ScrollTrigger created inside the context (no leaks, Strict Mode safe).
    return () => ctx.revert();
  }, [scope]);
}
