import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { label: "Featured Builds", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Project Roadmap", href: "#roadmap" },
  { label: "Security", href: "#security" },
  { label: "Philosophy", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.7, 0.18, 1] }}
      className={`fixed inset-x-0 top-0 z-[60] flex flex-col transition-all duration-300 ${
        menuOpen
          ? "border-b border-white/[0.08] bg-[#080505] shadow-[0_18px_58px_-38px_rgba(0,0,0,0.98)]"
          : scrolled
            ? "border-b border-white/[0.08] bg-[rgba(8,5,5,0.72)] shadow-[0_16px_48px_-38px_rgba(0,0,0,0.95)] backdrop-blur-xl backdrop-saturate-125"
            : "border-b border-white/[0.02]"
      }`}
    >
      <div
        className={`flex w-full items-center justify-between px-4 transition-all duration-300 sm:px-6 md:px-10 ${
          scrolled || menuOpen ? "py-3.5" : "py-5"
        }`}
      >
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 text-[15px] font-semibold tracking-[0.01em] text-white/88 transition-colors duration-200 hover:text-white"
        >
          <span>Areeaz</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
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

        <button
          ref={buttonRef}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/72 transition duration-300 hover:border-white/18 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/45 md:hidden"
        >
          <span className="relative h-3.5 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 h-px w-4 rounded-full bg-current transition duration-300 ${
                menuOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-4 rounded-full bg-current transition duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 rounded-full bg-current transition duration-300 ${
                menuOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 0.7, 0.18, 1] }}
            className="w-full overflow-hidden border-t border-white/[0.07] bg-[#080505] md:hidden"
          >
            <ul className="flex flex-col px-4 pb-3 sm:px-6">
              {LINKS.map((l, index) => (
                <li key={l.href} className="border-b border-white/[0.06] last:border-b-0">
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-1 py-3.5 text-[13px] font-medium tracking-[0.01em] text-white/68 transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/35"
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-[10px] text-white/28">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
