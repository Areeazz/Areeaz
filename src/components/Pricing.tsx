import { motion } from "framer-motion";
import { useState } from "react";
import { marketPricing, myPricing } from "../data/pricing";
import { fadeUp, stagger } from "../lib/motion";
import { handlePanelKey } from "../lib/panelInteraction";
import { Check } from "./icons";
import TypewriterHeading from "./TypewriterHeading";

const buildIncludes = [
  "Premium modern UI/UX",
  "Fully mobile responsive design",
  "SEO optimization for businesses",
  "Fast loading performance",
  "Custom branding integration",
  "Smooth animations and interactions",
  "Deployment + live launch",
  "Custom domain setup",
  "Clean scalable codebase",
  "Modern React/Vite architecture",
  "Basic accessibility",
  "Ongoing update support available",
];

const pricingSources = [
  { label: "Clutch", href: "https://clutch.co/web-designers/pricing" },
  { label: "WebFX", href: "https://www.webfx.com/web-design/pricing/" },
  { label: "Ramotion", href: "https://www.ramotion.com/blog/website-design-cost/" },
];

const projectProcess = [
  {
    step: "01",
    title: "Creativity",
    body: "Every project starts with understanding the client's vision, brand, and workflow.",
  },
  {
    step: "02",
    title: "Planning",
    body: "Layouts, structure, features, and user experience are mapped around the business needs.",
  },
  {
    step: "03",
    title: "Development",
    body: "Modern systems are built using scalable full-stack technologies and responsive design.",
  },
  {
    step: "04",
    title: "Refinement",
    body: "Feedback, revisions, optimization, and polishing ensure the final system feels clean and intuitive.",
  },
  {
    step: "05",
    title: "Launch",
    body: "The website or platform is deployed live with domain setup and production-ready infrastructure.",
  },
  {
    step: "06",
    title: "Ownership Options",
    body: "Clients can either maintain full ownership and control of the project or continue with ongoing support and updates.",
  },
];

export default function Pricing() {
  const [activeBuildFeature, setActiveBuildFeature] = useState<string | null>(null);
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<string | null>(null);

  return (
    <section id="pricing" className="relative px-6 py-28 md:px-14 md:py-40">
      <div className="orb right-[-4%] top-[18%] h-80 w-80 bg-accent/20" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row md:items-end"
        >
          <div>
            <motion.div variants={fadeUp} className="section-tag">
              <span className="num">02</span>
              <span className="inline-block h-px w-6 bg-current" />
              <span>Pricing</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-[16ch] font-serif text-[clamp(2.3rem,5vw,4.75rem)] font-semibold leading-[1]"
            >
              <TypewriterHeading
                lines={[
                  [{ text: "Web Firm Quality." }],
                  [{ text: "Independent Rates.", className: "text-gradient" }],
                ]}
              />
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-[24rem] text-[15px] leading-relaxed text-white/50">
            Agency-level design, development, and systems thinking &mdash; without agency
            overhead.
          </motion.p>
        </motion.div>

        <div className="mb-7 max-w-4xl text-xs font-normal leading-6 tracking-wide text-white/40 md:mb-8">
          <p>
            Typical agency pricing ranges are based on publicly available web design and custom
            software pricing guides.
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-normal tracking-wide text-white/38">
            {pricingSources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-white/10 pb-0.5 transition duration-300 hover:border-accent/45 hover:text-white/70"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Market */}
          <motion.div variants={fadeUp} className="glass rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.26em] text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              Agency / Web Firm Pricing
            </div>
            <h3 className="mt-4 font-serif text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium leading-[1.07]">
              <TypewriterHeading
                lines={[
                  [{ text: "Typical web firm" }],
                  [{ text: "ranges." }],
                ]}
              />
            </h3>
            <p className="mt-2 text-[13px] text-white/40">
              Published ranges vary by scope, complexity, platform, and team size.
            </p>
            <ul className="mt-9">
              {marketPricing.map((m) => (
                <li
                  key={m.name}
                  className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-5 last:border-b sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="flex flex-col gap-1">
                    <b className="text-[16px] font-medium">{m.name}</b>
                    <span className="text-[12px] text-white/40">{m.sub}</span>
                  </div>
                  <div className="font-serif text-[21px] font-medium text-white/45 sm:shrink-0 sm:text-right">
                    {m.price}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Mine */}
          <motion.div
            variants={fadeUp}
            className="glass-strong relative rounded-3xl p-8 md:p-10"
          >
            <div
              className="absolute -top-px right-8 z-10 -translate-y-1/2 rounded-full bg-accent px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#06070f]"
              style={{ boxShadow: "0 0 40px rgba(255,90,74,0.5)" }}
            >
              My Pricing
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Independent Pricing
              </div>
              <h3 className="mt-4 font-serif text-[clamp(1.75rem,2.4vw,2.25rem)] font-medium leading-[1.07]">
                <TypewriterHeading
                  lines={[
                    [{ text: "Lower overhead," }],
                    [{ text: "direct builder access.", className: "text-gradient" }],
                  ]}
                />
              </h3>
              <p className="mt-2 text-[13px] text-white/50">
                Faster communication, tighter scopes, and fewer layers between strategy and shipped software.
              </p>
              <ul className="mt-9">
                {myPricing.map((m) => (
                  <li
                    key={m.name}
                    className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-5 last:border-b sm:flex-row sm:items-center sm:gap-6"
                  >
                    <div className="flex flex-col gap-1">
                      <b className="text-[16px] font-medium">{m.name}</b>
                      <span className="text-[12px] text-white/45">{m.sub}</span>
                    </div>
                    <div className="text-left sm:shrink-0 sm:text-right">
                      <span className="mb-1 block max-w-none font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-white/40 sm:max-w-[10rem]">
                        {m.from}
                      </span>
                      <span className="text-gradient font-serif text-[24px] font-medium">
                        {m.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
          className="mt-16"
        >
          <motion.div
            variants={fadeUp}
            className="glass relative overflow-hidden rounded-3xl p-7 shadow-[0_34px_110px_-92px_rgba(255,225,218,0.46)] md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,225,218,0.035),transparent_58%)]" />
            <div className="relative flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.26em] text-white/38">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  Build Standard
                </div>
                <h3 className="mt-4 font-serif text-[clamp(1.8rem,2.8vw,2.65rem)] font-medium leading-[1.06] text-white/92">
                  <TypewriterHeading lines={[[{ text: "What Every Build Includes" }]]} />
                </h3>
              </div>
              <p className="max-w-[29rem] text-[14px] leading-relaxed text-white/50">
                Every project is built with performance, responsiveness, and long-term
                scalability in mind.
              </p>
            </div>

            <div className="relative mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {buildIncludes.map((feature) => {
                const active = activeBuildFeature === feature;

                return (
                  <div
                    key={feature}
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    aria-label={`${feature} build standard`}
                    data-active={active ? "true" : "false"}
                    onClick={() =>
                      setActiveBuildFeature((current) =>
                        current === feature ? null : feature,
                      )
                    }
                    onKeyDown={(event) =>
                      handlePanelKey(event, () =>
                        setActiveBuildFeature((current) =>
                          current === feature ? null : feature,
                        ),
                      )
                    }
                    className="group flex min-h-[58px] cursor-pointer items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.018] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent/[0.045] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 data-[active=true]:-translate-y-0.5 data-[active=true]:border-accent/30 data-[active=true]:bg-accent/[0.045]"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/20 bg-accent/10 text-accent-soft transition duration-300 group-hover:border-accent/40 group-hover:bg-accent/15 group-data-[active=true]:border-accent/40 group-data-[active=true]:bg-accent/15">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[13px] font-medium leading-snug text-white/70">
                      {feature}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          id="roadmap"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
          className="mt-20 scroll-mt-28"
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end"
          >
            <div>
              <div className="section-tag">
                <span className="num">03</span>
                <span className="inline-block h-px w-6 bg-current" />
                <span>Process</span>
              </div>
              <h3 className="mt-6 max-w-[16ch] font-serif text-[clamp(2.25rem,4.5vw,4.35rem)] font-semibold leading-[1]">
                <TypewriterHeading lines={[[{ text: "Project Roadmap" }]]} />
              </h3>
            </div>
            <p className="max-w-[34rem] text-[15px] leading-relaxed text-white/50">
              From first idea to final launch, every project follows a structured
              path built around clarity, execution, and ownership.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass relative overflow-hidden rounded-3xl p-7 md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,90,74,0.12),transparent_34%),linear-gradient(180deg,rgba(255,225,218,0.035),transparent_62%)]" />
            <div className="relative">
              <div className="relative grid gap-4 lg:grid-cols-3">
                {projectProcess.map((item) => (
                  <motion.div
                    variants={fadeUp}
                    key={item.title}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={activeRoadmapStep === item.title}
                      aria-label={`${item.step} ${item.title} roadmap step`}
                      data-active={activeRoadmapStep === item.title ? "true" : "false"}
                      onClick={() =>
                        setActiveRoadmapStep((current) =>
                          current === item.title ? null : item.title,
                        )
                      }
                      onKeyDown={(event) =>
                        handlePanelKey(event, () =>
                          setActiveRoadmapStep((current) =>
                            current === item.title ? null : item.title,
                          ),
                        )
                      }
                      className="group relative h-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.018] p-5 pl-14 transition duration-300 hover:-translate-y-0.5 hover:border-accent/28 hover:bg-accent/[0.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 data-[active=true]:-translate-y-0.5 data-[active=true]:border-accent/28 data-[active=true]:bg-accent/[0.04] lg:pl-5"
                    >
                      <span className="absolute left-4 top-5 grid h-9 w-9 place-items-center rounded-full border border-accent/25 bg-[#140b0b] font-mono text-[10px] text-accent-soft shadow-[0_0_28px_-14px_rgba(255,90,74,0.9)] transition duration-300 group-hover:border-accent/45 group-hover:bg-accent/10 group-data-[active=true]:border-accent/45 group-data-[active=true]:bg-accent/10 lg:static">
                        {item.step}
                      </span>
                      <h4 className="font-serif text-[23px] font-medium leading-none text-white lg:mt-5">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-[13px] leading-[1.7] text-white/55">
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
