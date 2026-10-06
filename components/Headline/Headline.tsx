import { HEADLINE } from "@/lib/constants";

/**
 * Splits the headline into per-letter masked spans so GSAP can
 * stagger each character up from below its mask.
 */
export default function Headline() {
  const words = HEADLINE.split(" ");

  return (
    <h1
      aria-label={HEADLINE}
      className="whitespace-nowrap pl-[5vw] font-display text-[8.8vw] font-black leading-none tracking-[0.01em] text-ink"
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="mr-[0.28em] inline-block last:mr-0">
          {word.split("").map((char, ci) => (
            <span key={ci} className="inline-block overflow-hidden align-bottom">
              <span data-letter className="inline-block will-change-transform">
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
