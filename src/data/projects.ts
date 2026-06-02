import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "fettys",
    index: "01",
    badge: "Local Service / Website",
    title: { lead: "Fetty's", accent: "Junk Removal" },
    description:
      "Premium local-service platform featuring modern visuals, mobile-first design, real-results showcase, and integrated booking flow. (Work in Progress)",
    mobileDescription:
      "Mobile-first local-service platform with real-results proof and booking flow. (Work in Progress)",
    stack: ["React", "Vite", "Tailwind", "Framer Motion", "Vercel"],
    visual: "junk",
    image: "/previews/fettys-original-logo.jpg",
    liveUrl: "https://fettysjunk.com",
    githubUrl: "https://github.com/Areeazz",
  },
];
