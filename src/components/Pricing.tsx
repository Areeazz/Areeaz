import { motion } from "framer-motion";
import { useState } from "react";
import { marketPricing, myPricing } from "../data/pricing";
import { fadeUp, stagger } from "../lib/motion";
import { handlePanelKey } from "../lib/panelInteraction";
import { Check } from "./icons";
import TypewriterHeading from "./TypewriterHeading";

const buildIncludes = [
  { full: "Premium modern UI/UX", short: "Modern UI/UX" },
  { full: "Fully mobile responsive design", short: "Mobile responsive" },
  { full: "SEO optimization for businesses", short: "Business SEO" },
  { full: "Fast loading performance", short: "Fast loading" },
  { full: "Custom branding integration", short: "Brand integration" },
  { full: "Smooth animations and interactions", short: "Smooth motion" },
  { full: "Deployment + live launch", short: "Live launch" },
  { full: "Custom domain setup", short: "Custom domain" },
  { full: "Clean scalable codebase", short: "Scalable codebase" },
  { full: "Modern React/Vite architecture", short: "React/Vite build" },
  { full: "Basic accessibility", short: "Accessibility" },
  { full: "Ongoing update support available", short: "Update support" },
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
    mobileBody: "Understand the vision, brand, and workflow.",
  },
  {
    step: "02",
    title: "Planning",
    body: "Layouts, structure, features, and user experience are mapped around the business needs.",
    mobileBody: "Map structure, features, and user experience.",
  },
  {
    step: "03",
    title: "Development",
    body: "Modern systems are built using scalable full-stack technologies and responsive design.",
    mobileBody: "Build with scalable tech and responsive design.",
  },
  {
    step: "04",
    title: "Refinement",
    body: "Feedback, revisions, optimization, and polishing ensure the final system feels clean and intuitive.",
    mobileBody: "Revise, optimize, and polish the final system.",
  },
  {
    step: "05",
    title: "Launch",
    body: "The website or platform is deployed live with domain setup and production-ready infrastructure.",
    mobileBody: "Deploy live with domain and production setup.",
  },
  {
    step: "06",
    title: "Ownership Options",
    body: "Clients can either maintain full ownership and control of the project or continue with ongoing support and updates.",
    mobileBody: "Keep full control or continue with support.",
  },
];

export default function Pricing() {
  const [activeBuildFeature, setActiveBuildFeature] = useState<string | null>(null);
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<string | null>(null);

  return (
    <section id="pricing" className="relative px-5 py-16 md:px-14 md:py-40">
      <div className="orb right-[-4%] top-[18%] h-80 w-80 bg-accent/20" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:mb-16 md:flex-row md:items-end md:gap-8 md:pb-9"
        >
          <div>
            <motion.div variants={fadeUp} className="section-tag">
              <span className="num">02</span>
              <span className="inline-block h-px w-6 bg-current" />
              <span>Pricing</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 max-w-[16ch] font-serif text-[clamp(2.05rem,10vw,2.7rem)] font-semibold leading-[1.04] md:mt-6 md:text-[clamp(2.3rem,5vw,4.75rem)] md:leading-[1]"
            >
              <TypewriterHeading
                lines={[
                  [{ text: "Web Firm Quality." }],
                  [{ text: "Independent Rates.", className: "text-gradient" }],
                ]}
              />
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-[24rem] text-[13px] leading-[1.65] text-white/50 md:text-[15px] md:leading-relaxed">
            <span className="md:hidden">Agency-level builds without agency overhead.</span>
            <span className="hidden md:inline">
              Agency-level design, development, and systems thinking &mdash; without agency
              overhead.
            </span>
          </motion.p>
        </motion.div>

        <div className="mb-5 max-w-4xl text-[11px] font-normal leading-5 tracking-wide text-white/40 md:mb-8 md:text-xs md:leading-6">
          <p>
            <span className="md:hidden">Typical ranges based on public pricing guides.</span>
            <span className="hidden md:inline">
              Typical agency pricing ranges are based on publicly available web design and custom
              software pricing guides.
            </span>
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-normal tracking-wide text-white/38 md:mt-2.5 md:gap-x-5 md:gap-y-1.5 md:text-xs">
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

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {/* Market */}
          <div
            className="glass rounded-2xl p-5 shadow-[0_34px_110px_-92px_rgba(255,225,218,0.38)] md:rounded-3xl md:p-10"
          >
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 md:text-[11px] md:tracking-[0.26em]">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              Agency / Web Firm Pricing
            </div>
            <h3 className="mt-3 font-serif text-[1.55rem] font-medium leading-[1.08] md:mt-4 md:text-[clamp(1.75rem,2.4vw,2.25rem)] md:leading-[1.07]">
              <TypewriterHeading
                lines={[
                  [{ text: "Typical web firm" }],
                  [{ text: "ranges." }],
                ]}
              />
            </h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-white/40 md:mt-2 md:text-[13px]">
              <span className="md:hidden">Ranges vary by scope and team size.</span>
              <span className="hidden md:inline">
                Published ranges vary by scope, complexity, platform, and team size.
              </span>
            </p>
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10 md:mt-9">
              {marketPricing.map((m) => (
                <li
                  key={m.name}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3.5 md:gap-6 md:py-5"
                >
                  <div className="min-w-0">
                    <b className="block whitespace-normal break-words text-[14px] font-medium leading-snug text-white/84 md:text-[16px]">
                      {m.name}
                    </b>
                    <span className="mt-1 block text-[11px] leading-snug text-white/40 md:text-[12px]">
                      {m.sub}
                    </span>
                  </div>
                  <div className="shrink-0 text-right font-serif text-[18px] font-medium leading-tight text-white/45 md:text-[21px]">
                    {m.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Areeaz */}
          <div className="glass-strong relative rounded-2xl p-5 pt-7 md:rounded-3xl md:p-10">
            <div
              className="absolute -top-px right-5 z-10 -translate-y-1/2 rounded-full bg-accent px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#06070f] md:right-8 md:px-3.5 md:text-[10px] md:tracking-[0.2em]"
              style={{ boxShadow: "0 0 40px rgba(255,90,74,0.5)" }}
            >
              Areeaz Rates
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent md:text-[11px] md:tracking-[0.26em]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Areeaz / Independent Pricing
              </div>
              <h3 className="mt-3 font-serif text-[1.55rem] font-medium leading-[1.08] md:mt-4 md:text-[clamp(1.75rem,2.4vw,2.25rem)] md:leading-[1.07]">
                <TypewriterHeading
                  lines={[
                    [{ text: "Lower overhead," }],
                    [{ text: "direct builder access.", className: "text-gradient" }],
                  ]}
                />
              </h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/50 md:mt-2 md:text-[13px]">
                <span className="md:hidden">Direct access, tighter scopes, faster decisions.</span>
                <span className="hidden md:inline">
                  Faster communication, tighter scopes, and fewer layers between strategy and shipped software.
                </span>
              </p>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10 md:mt-9">
                {myPricing.map((m) => (
                  <li
                    key={m.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3.5 md:gap-6 md:py-5"
                  >
                    <div className="min-w-0">
                      <b className="block whitespace-normal break-words text-[14px] font-medium leading-snug text-white/88 md:text-[16px]">
                        {m.name}
                      </b>
                      <span className="mt-1 block text-[11px] leading-snug text-white/45 md:text-[12px]">
                        {m.sub}
                      </span>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="mb-1 block max-w-[7.5rem] font-mono text-[9px] uppercase leading-snug tracking-[0.14em] text-white/40 md:max-w-[10rem] md:text-[10px] md:tracking-[0.16em]">
                        {m.from}
                      </span>
                      <span className="text-gradient block font-serif text-[20px] font-medium leading-tight md:text-[24px]">
                        {m.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
          className="mt-10 md:mt-16"
        >
          <motion.div
            variants={fadeUp}
            className="glass relative overflow-hidden rounded-2xl p-5 shadow-[0_34px_110px_-92px_rgba(255,225,218,0.46)] md:rounded-3xl md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,225,218,0.035),transparent_58%)]" />
            <div className="relative flex flex-col justify-between gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:gap-5 md:pb-7">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/38 md:text-[11px] md:tracking-[0.26em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  Build Standard
                </div>
                <h3 className="mt-3 font-serif text-[1.65rem] font-medium leading-[1.08] text-white/92 md:mt-4 md:text-[clamp(1.8rem,2.8vw,2.65rem)] md:leading-[1.06]">
                  <TypewriterHeading lines={[[{ text: "What Every Build Includes" }]]} />
                </h3>
              </div>
              <p className="max-w-[29rem] text-[12px] leading-[1.6] text-white/50 md:text-[14px] md:leading-relaxed">
                <span className="md:hidden">Baseline quality included in every build.</span>
                <span className="hidden md:inline">
                  Every project is built with performance, responsiveness, and long-term
                  scalability in mind.
                </span>
              </p>
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-2.5 min-[380px]:grid-cols-3 md:mt-7">
              {buildIncludes.map((feature) => {
                const active = activeBuildFeature === feature.full;

                return (
                  <div
                    key={feature.full}
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    aria-label={`${feature.full} build standard`}
                    data-active={active ? "true" : "false"}
                    onClick={() =>
                      setActiveBuildFeature((current) =>
                        current === feature.full ? null : feature.full,
                      )
                    }
                    onKeyDown={(event) =>
                      handlePanelKey(event, () =>
                        setActiveBuildFeature((current) =>
                            current === feature.full ? null : feature.full,
                        ),
                      )
                    }
                    className="group flex min-h-[46px] cursor-pointer items-center justify-center rounded-xl border border-white/8 bg-white/[0.018] px-2 py-2 text-center transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent/[0.045] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 data-[active=true]:-translate-y-0.5 data-[active=true]:border-accent/30 data-[active=true]:bg-accent/[0.045] md:min-h-[58px] md:justify-start md:gap-3 md:rounded-2xl md:p-3.5 md:text-left"
                  >
                    <span className="hidden h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/20 bg-accent/10 text-accent-soft transition duration-300 group-hover:border-accent/40 group-hover:bg-accent/15 group-data-[active=true]:border-accent/40 group-data-[active=true]:bg-accent/15 md:grid">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0 flex-1 whitespace-normal break-words text-[10.5px] font-medium leading-[1.2] text-white/70 md:text-[13px] md:leading-snug">
                      <span className="md:hidden">{feature.short}</span>
                      <span className="hidden md:inline">{feature.full}</span>
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
          className="mt-12 scroll-mt-24 md:mt-20 md:scroll-mt-28"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:mb-8 md:flex-row md:items-end md:gap-5 md:pb-8"
          >
            <div>
              <div className="section-tag">
                <span className="num">03</span>
                <span className="inline-block h-px w-6 bg-current" />
                <span>Process</span>
              </div>
              <h3 className="mt-4 max-w-[16ch] font-serif text-[clamp(2rem,10vw,2.55rem)] font-semibold leading-[1.04] md:mt-6 md:text-[clamp(2.25rem,4.5vw,4.35rem)] md:leading-[1]">
                <TypewriterHeading lines={[[{ text: "Project Roadmap" }]]} />
              </h3>
            </div>
            <p className="max-w-[34rem] text-[13px] leading-[1.65] text-white/50 md:text-[15px] md:leading-relaxed">
              <span className="md:hidden">
                A clear path from idea to launch and ownership.
              </span>
              <span className="hidden md:inline">
                From first idea to final launch, every project follows a structured
                path built around clarity, execution, and ownership.
              </span>
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass relative overflow-hidden rounded-2xl p-4 md:rounded-3xl md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,90,74,0.12),transparent_34%),linear-gradient(180deg,rgba(255,225,218,0.035),transparent_62%)]" />
            <div className="relative">
              <div className="relative grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:gap-4 lg:grid-cols-3">
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
                      className="group glass h-full min-h-[148px] cursor-pointer rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/24 hover:bg-white/[0.032] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 data-[active=true]:-translate-y-1 data-[active=true]:border-accent/24 data-[active=true]:bg-white/[0.032] min-[360px]:min-h-[178px] md:min-h-[230px] md:rounded-3xl md:p-6"
                    >
                      <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3 md:gap-5 md:pb-5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/20 bg-accent/8 font-mono text-[9px] text-accent-soft shadow-[0_0_34px_-22px_rgba(255,90,74,0.9)] transition duration-300 group-hover:border-accent/40 group-hover:bg-accent/12 group-data-[active=true]:border-accent/40 group-data-[active=true]:bg-accent/12 md:h-10 md:w-10 md:text-[10px]">
                          {item.step}
                        </span>
                      </div>
                      <h4 className="mt-4 min-w-0 whitespace-normal break-words font-serif text-[1.08rem] font-medium leading-[1.12] text-white/92 md:mt-6 md:text-[clamp(1.55rem,2vw,2rem)] md:leading-[1.08]">
                        {item.title}
                      </h4>
                      <p className="mt-2.5 min-w-0 whitespace-normal break-words text-[12px] leading-[1.55] text-white/54 md:mt-4 md:text-[14px] md:leading-[1.75]">
                        <span className="md:hidden">{item.mobileBody}</span>
                        <span className="hidden md:inline">{item.body}</span>
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
