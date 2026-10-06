export type StatTone = "lime" | "dark" | "sky" | "orange";

export interface Stat {
  id: string;
  value: string;
  label: string;
  tone: StatTone;
  row: "top" | "bottom";
  /** Reveal order: 1 = appears when the car reaches the middle, 2 = shortly after. */
  step: 1 | 2;
}

export const STATS: Stat[] = [
  { id: "pickup-a", value: "58%", label: "Increase in pick up point use", tone: "lime", row: "top", step: 1 },
  { id: "pickup-b", value: "27%", label: "Increase in pick up point use", tone: "dark", row: "top", step: 2 },
  { id: "calls-a", value: "23%", label: "Decreased in customer phone calls", tone: "sky", row: "bottom", step: 1 },
  { id: "calls-b", value: "40%", label: "Decreased in customer phone calls", tone: "orange", row: "bottom", step: 2 },
];
