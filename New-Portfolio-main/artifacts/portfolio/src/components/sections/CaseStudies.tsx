import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, ChevronDown, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { portfolioEasing } from "@/lib/motion";

interface Metric {
  label: string;
  value: string;
  direction: "up" | "down";
}

const cases = [
  {
    id: "fieldequip",
    title: "FieldEquip",
    kind: "Field Service Management platform",
    company: "Bursys Infotech",
    role: "Senior UX Designer",
    duration: "Feb 2024 – Present",
    summary:
      "Simplified complex multi-step workflows and designed a KPI and reporting dashboard from scratch, so field service teams can see and run operations in real time.",
    meta: ["Senior UX Designer", "9-person cross-functional team", "Web & Mobile"],
    tags: ["SaaS", "Enterprise", "B2B"],
    methods: ["Card sorting", "Tree testing", "Journey mapping", "Usability testing", "NPS / CSAT", "WCAG 2.1 audits"],
    problem:
      "Field service teams were slowed by complex multi-step workflows across Work Orders, Assets, Requests and Inventory, with little real-time visibility into operations.",
    solution:
      "Simplified the multi-step workflows, designed a KPI and reporting dashboard from scratch, and restructured the information architecture around how field technicians work.",
    process: [
      "Restructured the information architecture using card sorting, tree testing and journey mapping of field technician workflows",
      "Designed edge cases and system states (empty, error, loading, success) and ran WCAG 2.1 accessibility audits",
      "Turned business OKRs and the roadmap into design requirements with Product Managers; delivered in Agile sprints with Product, TAM, QA and Engineering",
      "Cut design-to-dev handoff time by 20% with detailed specs and a reusable component library",
    ],
    image: "images/fieldequip-mockup.webp",
    metrics: [
      { label: "Task completion", value: "+25%", direction: "up" },
      { label: "Process completion time", value: "−30%", direction: "down" },
      { label: "Post-launch navigation issues", value: "−35%", direction: "down" },
    ] as Metric[],
  },
  {
    id: "markerspro",
    title: "MarkersPro",
    kind: "EdTech assessment platform",
    company: "Wefivesoft",
    role: "UI/UX Designer",
    duration: "Mar 2021 – Sep 2023",
    summary:
      "Restructured navigation and information architecture and built a design system for a mobile-first EdTech platform used by students and teachers.",
    meta: ["UI/UX Designer", "Agile / Scrum team", "Web & Mobile"],
    tags: ["EdTech", "SaaS", "Design System"],
    methods: ["Personas", "Journey maps", "User flows", "Wireframes", "Prototyping", "UX writing"],
    problem:
      "Students and teachers struggled with confusing navigation and information architecture, hurting engagement and driving users away.",
    solution:
      "Restructured navigation and information architecture, built a reusable design system, and delivered responsive, mobile-first interfaces following WCAG 2.1.",
    process: [
      "Conducted user research and built personas, journey maps, user flows, wireframes and high-fidelity prototypes aligned with product strategy and OKRs",
      "Built and maintained a design system and reusable component library for cross-platform consistency and faster feature delivery",
      "Wrote UX copy for onboarding tooltips, error states and empty states",
      "Handed off to engineering and implemented UI in HTML5, CSS3, Bootstrap and JavaScript; worked with QA to resolve UI defects",
    ],
    image: "images/markerspro-mockup.webp",
    metrics: [
      { label: "User engagement", value: "+30%", direction: "up" },
      { label: "Bounce rate", value: "−25%", direction: "down" },
      { label: "Onboarding drop-off", value: "−18%", direction: "down" },
    ] as Metric[],
  },
];

type Study = (typeof cases)[number];

function CaseStudy({ study, index }: { study: Study; index: number }) {
  const [open, setOpen] = useState(false);
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: portfolioEasing }}
      className={index > 0 ? "pt-16 md:pt-24 mt-16 md:mt-24 border-t border-border" : ""}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Visual */}
        <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
          <ImageFrame variant="artboard" label={`${study.title} · ${study.kind}`}>
          <div className="group relative overflow-hidden aspect-[4/3]">
            <img
              loading="lazy"
              decoding="async"
              src={`${import.meta.env.BASE_URL}${study.image}`}
              alt={`${study.title} interface preview`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="w-10 h-10 rounded-xl bg-background/90 backdrop-blur border border-border flex items-center justify-center text-sm font-bold font-serif text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-background/90 backdrop-blur border border-border text-xs font-semibold text-foreground">
                {study.company}
              </span>
            </div>
          </div>
          </ImageFrame>
        </div>

        {/* Content */}
        <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {study.kind}
          </p>
          <h3 className="mt-3 text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground leading-[1.1]">
            {study.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-muted-foreground">{study.company} · {study.duration}</p>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{study.summary}</p>

          {/* Outcomes */}
          <dl className="mt-8 grid grid-cols-3 border-y border-border divide-x divide-border">
            {study.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: portfolioEasing }}
                className={`py-5 ${i === 0 ? "pr-4" : "px-4"}`}
              >
                <dd className="flex items-center gap-1.5 text-3xl md:text-4xl font-serif font-semibold leading-none text-emerald-600 dark:text-emerald-400 tabular-nums">
                  <CountUp value={m.value} />
                  {m.direction === "up" ? (
                    <TrendingUp size={16} className="opacity-70" />
                  ) : (
                    <TrendingDown size={16} className="opacity-70" />
                  )}
                </dd>
                <dt className="mt-2 text-xs text-muted-foreground leading-snug">{m.label}</dt>
              </motion.div>
            ))}
          </dl>

          {/* Meta */}
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">{study.meta[0]}</span>
            {study.meta.slice(1).map((m) => ` · ${m}`).join("")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-card border border-border text-[11px] font-semibold uppercase tracking-wider rounded-full text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            {open ? "Hide case study" : "Read case study"}
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={16} />
            </motion.span>
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: portfolioEasing }}
            className="overflow-hidden"
          >
            <div className="mt-12 rounded-3xl border border-border bg-card p-6 md:p-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary mb-3">The problem</p>
                  <p className="text-muted-foreground leading-relaxed">{study.problem}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary mb-3">The solution</p>
                  <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary mb-3">Methods</p>
                  <div className="flex flex-wrap gap-1.5">
                    {study.methods.map((m) => (
                      <span
                        key={m}
                        className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground border border-border/60 rounded-lg"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary mb-5">Process &amp; collaboration</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  {study.process.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: portfolioEasing }}
                      className="flex gap-3 text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed"
                    >
                      <Check size={16} className="flex-shrink-0 mt-1 text-primary" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="py-24 md:py-32 bg-secondary/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          title="Selected Work"
          subtitle="Enterprise product design at two companies — outcomes first, then the process behind them."
        />

        <div>
          {cases.map((study, index) => (
            <CaseStudy key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
