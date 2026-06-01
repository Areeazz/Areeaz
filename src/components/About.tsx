import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, stagger } from "../lib/motion";
import { handlePanelKey } from "../lib/panelInteraction";
import TypewriterHeading from "./TypewriterHeading";

const TECH_STACK = [
  {
    group: "Frontend",
    items: ["React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "Spline"],
  },
  {
    group: "Backend",
    items: ["Next.js", "Supabase", "PostgreSQL", "Stripe", "Resend"],
  },
];

export default function About() {
  const [activeStackGroup, setActiveStackGroup] = useState<string | null>(null);

  return (
    <section id="about" className="relative px-6 py-28 md:px-14 md:py-40">
      <div className="orb left-[-8%] bottom-[10%] h-72 w-72 bg-accent-deep/18" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/40"
            >
              04 / Philosophy
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 max-w-[12ch] font-serif text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[1]"
            >
              <TypewriterHeading
                lines={[
                  [{ text: "Maximum Effort." }],
                  [{ text: "Every Project.", className: "text-gradient" }],
                ]}
              />
            </motion.h2>
          </div>

          <motion.div
            variants={stagger}
            className="max-w-[68ch] pt-4 text-[15px] leading-[1.85] text-white/62 md:pt-7 md:text-[16px]"
          >
            <motion.p variants={fadeUp}>
              I am a 22-year-old software engineer committed to putting
              everything into every project regardless of size or scope.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5">
              Every build is approached with the same mindset: create something
              that is clean, reliable, scalable, and worth being proud of. From
              planning and architecture to development and deployment, every
              detail matters.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5">
              I work directly with clients to understand their goals, build
              around real-world workflows, and deliver systems designed to
              perform long after launch.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5">
              The final product reflects both my work and the client&apos;s
              vision, which is why I take ownership of every stage of development
              and focus on getting it right.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          id="tech-stack"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 scroll-mt-28 border-t border-white/10 pt-10 md:mt-20 md:pt-12"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col"
          >
            <div>
              <h3 className="mt-3 font-serif text-[clamp(1.8rem,3vw,3rem)] font-medium leading-tight text-white">
                <TypewriterHeading lines={[[{ text: "Technology Stack" }]]} />
              </h3>
            </div>
          </motion.div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {TECH_STACK.map((stack) => (
              <motion.div
                key={stack.group}
                variants={fadeUp}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeStackGroup === stack.group}
                  aria-label={`${stack.group} technology stack`}
                  data-active={activeStackGroup === stack.group ? "true" : "false"}
                  onClick={() =>
                    setActiveStackGroup((current) =>
                      current === stack.group ? null : stack.group,
                    )
                  }
                  onKeyDown={(event) =>
                    handlePanelKey(event, () =>
                      setActiveStackGroup((current) =>
                        current === stack.group ? null : stack.group,
                      ),
                    )
                  }
                  className="group glass h-full cursor-pointer rounded-3xl p-6 transition duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.035] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 data-[active=true]:-translate-y-0.5 data-[active=true]:border-white/18 data-[active=true]:bg-white/[0.035]"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/56">
                      {stack.group}
                    </h4>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35 transition duration-300 group-hover:bg-accent-soft/70 group-data-[active=true]:bg-accent-soft/70" />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[12px] font-normal tracking-wide text-white/66 transition duration-300 group-hover:border-white/14 group-hover:text-white/78 group-data-[active=true]:border-white/14 group-data-[active=true]:text-white/78"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
