import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type TypewriterSegment = {
  text: string;
  className?: string;
};

type TypewriterLine = TypewriterSegment[];

interface TypewriterHeadingProps {
  lines: TypewriterLine[];
  speedMs?: number;
  delayMs?: number;
}

function lineLength(line: TypewriterLine) {
  return line.reduce((total, segment) => total + segment.text.length, 0);
}

function renderFullLines(lines: TypewriterLine[]) {
  return lines.map((line, lineIndex) => (
    <span className="block" key={`full-${lineIndex}`}>
      {line.map((segment, segmentIndex) => (
        <span className={segment.className} key={`full-${lineIndex}-${segmentIndex}`}>
          {segment.text}
        </span>
      ))}
    </span>
  ));
}

export default function TypewriterHeading({
  lines,
  speedMs = 34,
  delayMs = 220,
}: TypewriterHeadingProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px", amount: 0.45 });
  const prefersReducedMotion = useReducedMotion();
  const [visibleChars, setVisibleChars] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const fullText = useMemo(
    () => lines.map((line) => line.map((segment) => segment.text).join("")).join(" "),
    [lines],
  );

  const totalChars = useMemo(
    () => lines.reduce((total, line) => total + lineLength(line), 0),
    [lines],
  );

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    hasAnimated.current = true;
    setHasStarted(true);

    if (prefersReducedMotion) {
      setVisibleChars(totalChars);
      return;
    }

    let animationFrame = 0;
    const timeout = window.setTimeout(() => {
      const start = performance.now();

      const tick = (now: number) => {
        const nextCount = Math.min(totalChars, Math.floor((now - start) / speedMs));
        setVisibleChars(nextCount);

        if (nextCount < totalChars) {
          animationFrame = window.requestAnimationFrame(tick);
        }
      };

      animationFrame = window.requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [delayMs, isInView, prefersReducedMotion, speedMs, totalChars]);

  let consumedChars = 0;
  const isComplete = visibleChars >= totalChars;

  return (
    <span ref={ref} className="relative inline-block" aria-label={fullText}>
      <span aria-hidden="true" className="invisible block">
        {renderFullLines(lines)}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block">
        {lines.map((line, lineIndex) => {
          const start = consumedChars;
          const length = lineLength(line);
          const charsForLine = Math.max(0, Math.min(visibleChars - start, length));
          const shouldShowCursor =
            hasStarted && !isComplete && visibleChars >= start && visibleChars <= start + length;
          let remaining = charsForLine;
          consumedChars += length;

          return (
            <span className="block" key={`typed-${lineIndex}`}>
              {line.map((segment, segmentIndex) => {
                const visibleText = segment.text.slice(0, Math.max(0, remaining));
                remaining -= segment.text.length;

                if (!visibleText) return null;

                return (
                  <span className={segment.className} key={`typed-${lineIndex}-${segmentIndex}`}>
                    {visibleText}
                  </span>
                );
              })}
              {shouldShowCursor ? (
                <motion.span
                  aria-hidden="true"
                  className="ml-[0.05em] inline-block h-[0.78em] w-px translate-y-[0.08em] bg-accent-soft align-baseline"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
            </span>
          );
        })}
      </span>
    </span>
  );
}
