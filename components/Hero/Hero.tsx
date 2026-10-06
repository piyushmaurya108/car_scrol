"use client";

import { useRef } from "react";
import Headline from "@/components/Headline/Headline";
import Car from "@/components/Car/Car";
import Statistics from "@/components/Statistics/Statistics";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  useHeroAnimation(heroRef);

  return (
    <section
      ref={heroRef}
      className="relative flex h-screen w-full items-center overflow-hidden bg-page"
    >
      <Statistics />

      {/* Road */}
      <div
        data-road
        className="relative h-[calc(var(--car-w)*0.484)] w-full overflow-hidden bg-road"
      >
        {/* Green layer slides in behind the car (translateX, no width changes) */}
        <div data-green className="absolute inset-0 overflow-hidden bg-grass will-change-transform">
          {/* Counter-translated so the headline stays still while the green reveals it */}
          <div
            data-text
            className="absolute inset-0 flex items-center will-change-transform"
          >
            <Headline />
          </div>
        </div>

        <Car />
      </div>
    </section>
  );
}
