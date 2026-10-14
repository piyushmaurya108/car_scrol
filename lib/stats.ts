export type StatTone = "lime" | "dark" | "sky" | "orange";

export interface Stat {
  id: string;
  value: string;
  numericVal: number;
  unit: string;
  label: string;
  subtitle: string;
  tone: StatTone;
  row: "top" | "bottom";
  category: string;
  delta: string;
  /** Reveal order: 1 = appears when car reaches the middle, 2 = shortly after. */
  step: 1 | 2;
}

export const STATS: Stat[] = [
  {
    id: "pickup-a",
    value: "58%",
    numericVal: 58,
    unit: "%",
    label: "Increase in pick up point use",
    subtitle: "Automated logistics hubs & point dispatch",
    tone: "lime",
    row: "top",
    category: "FLEET EFFICIENCY",
    delta: "+18.4% vs benchmark",
    step: 1,
  },
  {
    id: "pickup-b",
    value: "27%",
    numericVal: 27,
    unit: "%",
    label: "Increase in pick up point use",
    subtitle: "High-density urban micro-routes",
    tone: "dark",
    row: "top",
    category: "ROUTE DENSITY",
    delta: "+9.2% optimized",
    step: 2,
  },
  {
    id: "calls-a",
    value: "23%",
    numericVal: 23,
    unit: "%",
    label: "Decreased in customer phone calls",
    subtitle: "Predictive AI status & driver telemetry",
    tone: "sky",
    row: "bottom",
    category: "CUSTOMER SATISFACTION",
    delta: "-3.2h response latency",
    step: 1,
  },
  {
    id: "calls-b",
    value: "40%",
    numericVal: 40,
    unit: "%",
    label: "Decreased in customer phone calls",
    subtitle: "Autonomous self-service resolution",
    tone: "orange",
    row: "bottom",
    category: "INQUIRY RESOLUTION",
    delta: "99.4% first-contact rate",
    step: 2,
  },
];
