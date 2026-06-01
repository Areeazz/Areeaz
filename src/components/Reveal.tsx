import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Scroll-triggered fade/rise used across every section for a cohesive reveal. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
