import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { label: "Featured Builds", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Project Roadmap", href: "#roadmap" },
  { label: "Philosophy", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.7, 0.18, 1] }}
      className={`fixed inset-x-0 top-0 z-[60] flex flex-col items-start gap-3 px-4 transition-all duration-300 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[rgba(8,5,5,0.72)] py-3.5 shadow-[0_16px_48px_-38px_rgba(0,0,0,0.95)] backdrop-blur-xl backdrop-saturate-125"
          : "border-b border-white/[0.02] py-5"
      }`}
    >
      <a
        href="#top"
        className="shrink-0 text-[15px] font-semibold tracking-[0.01em] text-white/88 transition-colors duration-200 hover:text-white"
      >
        <span>Areeaz</span>
      </a>

      <ul className="flex w-full items-center gap-4 overflow-x-auto pb-1 [scrollbar-width:none] md:w-auto md:gap-6 md:overflow-visible md:pb-0 lg:gap-8 [&::-webkit-scrollbar]:hidden">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="whitespace-nowrap text-[12px] tracking-[0.02em] text-white/55 transition-colors duration-200 hover:text-white sm:text-[13px]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
