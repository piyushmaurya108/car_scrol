import { STATS } from "@/lib/stats";
import StatisticCard from "@/components/StatisticCard/StatisticCard";

/** Two rows of cards: one above the road, one below. */
export default function Statistics() {
  const top = STATS.filter((s) => s.row === "top");
  const bottom = STATS.filter((s) => s.row === "bottom");

  return (
    <>
      <div className="absolute left-[4vw] top-[6%] flex gap-[1.5vw] md:left-[49%] md:top-[9%]">
        {top.map((s) => (
          <StatisticCard key={s.id} {...s} />
        ))}
      </div>

      <div className="absolute bottom-[6%] left-[4vw] flex gap-[1.5vw] md:bottom-[9%] md:left-[43%]">
        {bottom.map((s) => (
          <StatisticCard key={s.id} {...s} />
        ))}
      </div>
    </>
  );
}
