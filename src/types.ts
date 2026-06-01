export type ProjectVisual = "junk" | "tattoo" | "web3";

export interface Project {
  id: string;
  index: string;
  badge: string;
  title: { lead: string; accent: string };
  description: string;
  stack: string[];
  visual: ProjectVisual;
  /** Optional real preview asset; falls back to the styled mock when absent. */
  image?: string;
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface PriceRow {
  name: string;
  sub: string;
  price: string;
}

export interface MyPriceRow extends PriceRow {
  from: string;
}
