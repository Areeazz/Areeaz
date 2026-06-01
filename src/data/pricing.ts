import type { MyPriceRow, PriceRow } from "../types";

export const marketPricing: PriceRow[] = [
  {
    name: "Premium Frontend Website",
    sub: "Typical agency range",
    price: "$3,000 - $5,000",
  },
  {
    name: "Booking & Payment Platform",
    sub: "Typical agency range",
    price: "$5,000 - $10,000",
  },
  {
    name: "Custom Dashboard / App",
    sub: "Typical agency range",
    price: "$15,000+",
  },
];

export const myPricing: MyPriceRow[] = [
  {
    name: "Premium Frontend Website",
    sub: "Premium design, responsive build, SEO, launch",
    from: "Independent rate",
    price: "$1,000 - $2,000",
  },
  {
    name: "Booking & Payment Platform",
    sub: "Scheduling, payments, confirmations, booking flow",
    from: "Independent rate",
    price: "$3,000 - $5,000",
  },
  {
    name: "Custom Dashboard / App",
    sub: "Dashboards, portals, workflows, integrations",
    from: "Scoped build",
    price: "Custom Quote",
  },
];
