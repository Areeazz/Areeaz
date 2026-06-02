import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, stagger } from "../lib/motion";
import { handlePanelKey } from "../lib/panelInteraction";
import TypewriterHeading from "./TypewriterHeading";

const SECURITY_CARDS = [
  {
    title: "Protected Data",
    mobileTitle: "Protected Data",
    body: "We avoid storing sensitive information unless required and structure systems to keep private data protected.",
    mobileBody: "Only required data is stored and structured to reduce exposure.",
  },
  {
    title: "Secure Authentication",
    mobileTitle: "Secure Auth",
    body: "Private dashboards and user areas use authenticated access and role-based permissions when needed.",
    mobileBody: "Private areas use login and role-based access when needed.",
  },
  {
    title: "Payment Safety",
    mobileTitle: "Payment Safety",
    body: "Payments are handled through trusted providers like Stripe so payment details are never stored directly on the platform.",
    mobileBody: "Stripe handles payments so card details are not stored directly.",
  },
  {
    title: "Database Security",
    mobileTitle: "Database Rules",
    body: "Backend systems use permission rules and access controls to ensure users only see the data they are authorized to access.",
    mobileBody: "Access rules limit users to only the data they are allowed to see.",
  },
  {
    title: "Secure Uploads",
    mobileTitle: "Safe Uploads",
    body: "File uploads are restricted, validated, and controlled to reduce risk and protect platform integrity.",
    mobileBody: "Files are restricted by type, size, and permissions.",
  },
  {
    title: "Production Review",
    mobileTitle: "Launch Review",
    body: "Projects are reviewed before launch for exposed keys, unsafe access patterns, broken permissions, and common security mistakes.",
    mobileBody: "Projects are checked for exposed keys, unsafe access, and common risks.",
  },
];

export default function Security() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="security" className="relative scroll-mt-28 px-5 py-16 md:px-14 md:py-40">
      <div className="orb left-[-7%] top-[10%] h-72 w-72 bg-accent-deep/16" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:mb-14 md:flex-row md:items-end md:gap-7 md:pb-9"
        >
          <div>
            <motion.div variants={fadeUp} className="section-tag">
              <span className="num">04</span>
              <span className="inline-block h-px w-6 bg-current" />
              <span>Security</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 max-w-[16ch] font-serif text-[clamp(2.05rem,10vw,2.7rem)] font-semibold leading-[1.04] md:mt-6 md:text-[clamp(2.3rem,5vw,4.75rem)] md:leading-[1]"
            >
              <TypewriterHeading
                lines={[
                  [
                    { text: "Security " },
                    { text: "Built In", className: "text-gradient" },
                  ],
                ]}
              />
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-[36rem] text-[13px] leading-[1.65] text-white/50 md:text-[15px] md:leading-relaxed"
          >
            Every system is built with security in mind from the start &mdash;
            protecting client data, customer information, and payments.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
          className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:gap-4 lg:grid-cols-2 xl:grid-cols-3"
        >
          {SECURITY_CARDS.map((card, index) => {
            const active = activeCard === card.title;

            return (
              <motion.div variants={fadeUp} key={card.title}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  aria-label={`${card.title} security detail`}
                  data-active={active ? "true" : "false"}
                  onClick={() =>
                    setActiveCard((current) =>
                      current === card.title ? null : card.title,
                    )
                  }
                  onKeyDown={(event) =>
                    handlePanelKey(event, () =>
                      setActiveCard((current) =>
                        current === card.title ? null : card.title,
                      ),
                    )
                  }
                  className="group glass h-full min-h-[148px] cursor-pointer rounded-2xl border-white/14 bg-white/[0.028] p-4 shadow-[0_34px_110px_-94px_rgba(255,225,218,0.5)] transition duration-300 hover:-translate-y-1 hover:border-accent/28 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 data-[active=true]:-translate-y-1 data-[active=true]:border-accent/28 data-[active=true]:bg-white/[0.045] min-[360px]:min-h-[178px] md:min-h-[230px] md:rounded-3xl md:p-6"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3 md:gap-5 md:pb-5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/20 bg-accent/8 font-mono text-[9px] text-accent-soft shadow-[0_0_34px_-22px_rgba(255,90,74,0.9)] transition duration-300 group-hover:border-accent/40 group-hover:bg-accent/12 group-data-[active=true]:border-accent/40 group-data-[active=true]:bg-accent/12 md:h-10 md:w-10 md:text-[10px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 min-w-0 whitespace-normal break-words font-serif text-[1.08rem] font-medium leading-[1.12] text-white/92 md:mt-6 md:text-[clamp(1.55rem,2vw,2rem)] md:leading-[1.08]">
                    <span className="md:hidden">{card.mobileTitle}</span>
                    <span className="hidden md:inline">{card.title}</span>
                  </h3>
                  <p className="mt-2.5 min-w-0 whitespace-normal break-words text-[12px] leading-[1.55] text-white/58 md:mt-4 md:text-[14px] md:leading-[1.75]">
                    <span className="md:hidden">{card.mobileBody}</span>
                    <span className="hidden md:inline">{card.body}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
