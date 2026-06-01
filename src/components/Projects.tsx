import { motion } from "framer-motion";
import { useState } from "react";
import type { Project, ProjectVisual } from "../types";
import { projects } from "../data/projects";
import { fadeUp, stagger } from "../lib/motion";
import { handlePanelKey, isFromInteractiveChild } from "../lib/panelInteraction";
import { ArrowUpRight, Github } from "./icons";
import TypewriterHeading from "./TypewriterHeading";

/* -------------------------------------------------------------------------
   Concept visuals — on-theme ember mocks shown when no real asset is set.
-------------------------------------------------------------------------- */
function JunkMock() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(135deg,#1f1108 0%,#120805 100%)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 32% at 72% 18%, rgba(255,178,122,0.22), transparent 70%), radial-gradient(50% 42% at 18% 82%, rgba(214,91,47,0.3), transparent 70%)",
        }}
      />
      <div className="absolute inset-x-6 top-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-[#ffc8a0]/70">
        <span>Same-day removal</span>
        <span>(555) 014-0099</span>
      </div>
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center">
        <div className="text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-none text-[#ffe9d8]">
          Haul{" "}
          <em className="font-serif font-medium not-italic text-[#ffb27a]">anything</em>.
          <br />
          Today.
        </div>
        <div className="mt-3 text-[11px] tracking-wide text-[#ffc8a0]/70">
          Fast response / Clean finish
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-5 flex items-center gap-2">
        <span className="rounded-full bg-[rgba(255,178,122,0.12)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#ffb27a]">
          Free quotes
        </span>
        <span className="rounded-full bg-[rgba(255,178,122,0.06)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#ffb27a]/80">
          Custom estimates
        </span>
        <span className="ml-auto font-serif text-[22px] font-medium text-[#ffe9d8]">Reliable crews</span>
      </div>
    </div>
  );
}

function TattooMock() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(135deg,#1a0c10 0%,#0a0608 100%)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 28%, rgba(255,120,90,0.22), transparent 60%), radial-gradient(60% 60% at 82% 82%, rgba(40,18,18,0.6), transparent 60%)",
        }}
      />
      <div className="absolute inset-x-6 top-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-[#ffbcae]/65">
        <span>Private Studio</span>
        <span>EST. 2019</span>
      </div>
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center">
        <div
          className="font-serif text-[clamp(2.3rem,4.8vw,3.2rem)] font-medium leading-[0.98] text-[#f0dcd4]"
          style={{ textShadow: "0 0 40px rgba(255,150,120,0.25)" }}
        >
          Ink
          <br />& Iron
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffbcae]/55">
          Booking now
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffbcae]/45">
        <span>Walk-ins · By appt</span>
        <span>↘ Book a slot</span>
      </div>
    </div>
  );
}

function Web3Mock() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(135deg,#1a0a0a 0%,#0a0606 100%)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 42% at 50% 50%, rgba(255,90,74,0.22), transparent 70%)",
        }}
      />
      <div className="depth-grid" />
      <div className="absolute inset-x-6 top-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-[#ffa39a]/65">
        <span>Spatial · v0.4</span>
        <span>0x4a…f02e</span>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid h-48 w-48 place-items-center">
          <div
            className="absolute inset-0 rounded-full border border-[rgba(255,90,74,0.45)] animate-[spin360_22s_linear_infinite]"
            style={{ boxShadow: "inset 0 0 80px rgba(255,90,74,0.28)" }}
          />
          <div className="absolute inset-7 rounded-full border border-[rgba(255,163,154,0.4)]" />
          <div className="absolute -inset-6 rounded-full border border-[rgba(255,90,74,0.18)]" />
          <div className="text-center font-serif text-[21px] font-medium text-[#ffd7d0]">
            Drop 02
            <span className="mt-2 block font-mono text-[10px] not-italic uppercase tracking-[0.3em] text-[#ffd7d0]/55">
              Tokengated · 24h
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-[#ffa39a]/55">
        <span>Connect wallet</span>
        <span>↗ Enter</span>
      </div>
    </div>
  );
}

const MOCKS: Record<ProjectVisual, () => React.JSX.Element> = {
  junk: JunkMock,
  tattoo: TattooMock,
  web3: Web3Mock,
};

function ProjectPreview({ p }: { p: Project }) {
  if (p.id === "fettys" && p.image) {
    return (
      <div className="absolute inset-0 grid place-items-center overflow-hidden bg-[linear-gradient(145deg,rgba(18,10,10,0.96),rgba(4,3,3,0.98))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,90,74,0.18),transparent_48%),linear-gradient(180deg,rgba(255,225,218,0.055),transparent_58%)]" />
        <div className="absolute inset-8 rounded-[1.35rem] border border-white/8 bg-black/24 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_90px_-50px_rgba(255,90,74,0.65)] backdrop-blur-md" />
        <img
          className="relative z-10 max-h-[78%] max-w-[82%] object-contain drop-shadow-[0_22px_42px_rgba(0,0,0,0.58)] transition-transform duration-700 ease-out group-hover:scale-[1.035] group-data-[active=true]:scale-[1.035]"
          src={p.image}
          alt={`${p.title.lead} ${p.title.accent} logo`}
          loading="lazy"
        />
      </div>
    );
  }

  if (p.video) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={p.video}
        autoPlay
        muted
        loop
        playsInline
        poster={p.image}
      />
    );
  }
  if (p.image) {
    return (
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={p.image}
        alt={`${p.title.lead} ${p.title.accent}`}
        loading="lazy"
      />
    );
  }
  const Mock = MOCKS[p.visual];
  return <Mock />;
}

/* -------------------------------------------------------------------------
   Card
-------------------------------------------------------------------------- */
function ProjectCard({
  p,
  active,
  onActivate,
}: {
  p: Project;
  active: boolean;
  onActivate: () => void;
}) {
  const hasLiveSite = Boolean(p.liveUrl && p.liveUrl !== "#");
  const liveLabel = p.id === "fettys" ? "View Live Site" : "Live demo";

  return (
    <motion.div variants={fadeUp}>
      <article
        role="button"
        tabIndex={0}
        aria-pressed={active}
        aria-label={`${p.title.lead} ${p.title.accent} project card`}
        data-active={active ? "true" : "false"}
        onClick={(event) => {
          if (isFromInteractiveChild(event)) return;
          onActivate();
        }}
        onKeyDown={(event) => handlePanelKey(event, onActivate)}
        className="group glass relative grid cursor-pointer overflow-hidden rounded-3xl transition-[transform,border-color,box-shadow,background-color] duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_36px_90px_-30px_rgba(255,90,74,0.45)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/45 data-[active=true]:-translate-y-1.5 data-[active=true]:border-white/20 data-[active=true]:shadow-[0_36px_90px_-30px_rgba(255,90,74,0.45)] md:grid-cols-[1.05fr_1fr]"
      >
      {/* visual */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#120808]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(255,90,74,0.1), transparent 70%)",
          }}
        />
        <span className="absolute left-7 top-7 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
          {p.badge}
        </span>
        <a
          className="absolute inset-6 overflow-hidden rounded-2xl border border-white/5 transition-transform duration-700 ease-out group-hover:scale-[1.03] group-data-[active=true]:scale-[1.03]"
          href={p.liveUrl ?? "#"}
          target={hasLiveSite ? "_blank" : undefined}
          rel={hasLiveSite ? "noopener noreferrer" : undefined}
          aria-label={`${liveLabel}: ${p.title.lead} ${p.title.accent}`}
        >
          <ProjectPreview p={p} />
        </a>
      </div>

      {/* info */}
      <div className="flex flex-col gap-6 border-t border-white/10 p-8 md:border-l md:border-t-0 md:p-11">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          {p.index} / Selected Work
        </div>
        <h3 className="font-serif text-[clamp(1.85rem,2.8vw,2.45rem)] font-medium leading-[1.05]">
          <TypewriterHeading
            lines={[
              [
                { text: `${p.title.lead} ` },
                { text: p.title.accent, className: "text-gradient" },
              ],
            ]}
          />
        </h3>
        <p className="max-w-[46ch] text-[15px] leading-relaxed text-white/55">{p.description}</p>

        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-3">
          <a
            className="btn btn-ghost !px-4 !py-2.5 text-[12.5px] !text-accent-soft hover:!text-white"
            href={p.liveUrl ?? "#"}
            target={hasLiveSite ? "_blank" : undefined}
            rel={hasLiveSite ? "noopener noreferrer" : undefined}
          >
            {liveLabel}
            <ArrowUpRight />
          </a>
          <a
            className="btn btn-ghost !px-4 !py-2.5 text-[12.5px]"
            href={p.githubUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="!h-3.5 !w-3.5" />
            GitHub
          </a>
        </div>
      </div>
      </article>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   Section
-------------------------------------------------------------------------- */
export default function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section id="work" className="relative px-6 py-28 md:px-14 md:py-40">
      <div className="orb left-[-6%] top-[8%] h-72 w-72 bg-accent-deep/30" />
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
              <span className="num">01</span>
              <span className="inline-block h-px w-6 bg-current" />
              <span>Selected Work</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-[16ch] font-serif text-[clamp(2.3rem,5vw,4.75rem)] font-semibold leading-[1]"
            >
              <TypewriterHeading
                lines={[
                  [{ text: "Featured", className: "text-gradient" }],
                  [{ text: "Builds" }],
                ]}
              />
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-[24rem] text-[15px] leading-relaxed text-white/50">
            A focused look at the current featured build: a local-service platform
            with a real launch path, mobile-first design, and booking flow.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-8"
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              p={p}
              active={activeProject === p.id}
              onActivate={() =>
                setActiveProject((current) => (current === p.id ? null : p.id))
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
