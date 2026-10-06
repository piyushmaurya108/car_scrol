import type { Stat, StatTone } from "@/lib/stats";
import { cn } from "@/utils/cn";

const TONES: Record<StatTone, string> = {
  lime: "bg-card-lime text-ink",
  dark: "bg-card-dark text-white",
  sky: "bg-card-sky text-ink",
  orange: "bg-card-orange text-ink",
};

export default function StatisticCard({ value, label, tone, step }: Stat) {
  return (
    <article
      data-card
      data-step={step}
      className={cn(
        "max-w-[44vw] rounded-2xl p-[clamp(0.9rem,2vw,2.8rem)] will-change-transform md:max-w-none",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        TONES[tone],
      )}
    >
      <p className="text-[clamp(2rem,4.6vw,5.2rem)] font-extrabold leading-none tracking-tight">
        {value}
      </p>
      <p className="mt-[0.6em] text-[clamp(0.7rem,1.25vw,1.6rem)] leading-snug">{label}</p>
    </article>
  );
}
