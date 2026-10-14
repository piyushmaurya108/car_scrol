import { STATS } from "@/lib/stats";
import StatisticCard from "@/components/StatisticCard/StatisticCard";

/**
 * Two rows of high-tech telemetry cards:
 * - Upper quadrant (top row)
 * - Lower quadrant (bottom row)
 * Positioned above and below the racetrack road with responsive gap & placement.
 */
export default function Statistics() {
  const top = STATS.filter((s) => s.row === "top");
  const bottom = STATS.filter((s) => s.row === "bottom");

  return (
    <div className="pointer-events-auto absolute inset-0 z-30 select-none overflow-hidden">
      {/* Top quadrant cards (Row 1) */}
      <div className="absolute left-[3vw] top-[5%] flex flex-wrap gap-[1.4vw] md:left-[48%] md:top-[7%] lg:left-[50%] lg:top-[8%]">
        {top.map((s) => (
          <StatisticCard key={s.id} {...s} />
        ))}
      </div>

      {/* Bottom quadrant cards (Row 2) */}
      <div className="absolute bottom-[5%] left-[3vw] flex flex-wrap gap-[1.4vw] md:bottom-[7%] md:left-[42%] lg:bottom-[8%] lg:left-[44%]">
        {bottom.map((s) => (
          <StatisticCard key={s.id} {...s} />
        ))}
      </div>
    </div>
  );
}
