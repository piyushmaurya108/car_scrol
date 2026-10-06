import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registers GSAP plugins exactly once (safe on the server – it only runs in the browser).
 * Import `gsap` and `ScrollTrigger` from here, never from "gsap" directly.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
