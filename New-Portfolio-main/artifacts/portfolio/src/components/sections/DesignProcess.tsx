import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Users, Target, Lightbulb, PenTool, FlaskConical, ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { portfolioEasing } from "@/lib/motion";

const steps = [
  {
    phase: "01",
    label: "Empathize",
    icon: Users,
    tagline: "Understand the real problem",
    description: "Deep-dive into user needs through interviews, observation and workflow mapping to understand the problem behind the request.",
    methods: ["User interviews", "Field observation", "Stakeholder interviews", "Surveys & analytics"],
    outputs: ["Research findings", "Empathy maps", "Workflow maps"],
    practice: "Mapped field technician workflows to see where FieldEquip users lost time.",
  },
  {
    phase: "02",
    label: "Define",
    icon: Target,
    tagline: "Turn research into direction",
    description: "Synthesize research into clear problem statements, personas and journey maps that guide every decision that follows.",
    methods: ["Problem statements", "Personas", "Journey maps", "HMW questions"],
    outputs: ["Problem statement", "Personas", "Journey maps"],
    practice: "Built personas and journey maps for MarkersPro, aligned with product strategy and OKRs.",
  },
  {
    phase: "03",
    label: "Ideate",
    icon: Lightbulb,
    tagline: "Explore, then converge",
    description: "Generate a wide solution space, then converge on the most promising ideas with the team and test the structure early.",
    methods: ["Affinity mapping", "Card sorting", "Tree testing", "User flows"],
    outputs: ["Information architecture", "User flows", "Concept options"],
    practice: "Used card sorting and tree testing to restructure FieldEquip's information architecture.",
  },
  {
    phase: "04",
    label: "Prototype",
    icon: PenTool,
    tagline: "Make it testable",
    description: "Build lo-fi to hi-fi Figma prototypes to test ideas and validate flows before a line of code is written.",
    methods: ["Lo-fi wireframes", "Hi-fi prototypes", "Design systems", "Handoff specs"],
    outputs: ["Interactive prototype", "Component library", "Developer specs"],
    practice: "Delivered hi-fi prototypes and detailed specs, cutting design-to-dev handoff time by 20%.",
  },
  {
    phase: "05",
    label: "Test",
    icon: FlaskConical,
    tagline: "Validate, then iterate",
    description: "Validate with real users through usability tests, heuristic reviews, accessibility audits and analytics. Then iterate.",
    methods: ["Usability testing", "Heuristic review", "A/B testing", "WCAG 2.1 audits"],
    outputs: ["Usability findings", "Accessibility report", "Iteration backlog"],
    practice: "Validated a 25% rise in task completion through usability testing and ran WCAG 2.1 audits.",
  },
];

const howIWork = [
  {
    heading: "Research methods",
    body: "Stakeholder interviews, usability testing, card sorting, tree testing, heuristic evaluation, competitive analysis and NPS/CSAT tracking.",
  },
  {
    heading: "Tools",
    body: "Figma and FigJam for design and prototyping, Miro and Optimal Workshop for research, Zeplin for handoff, plus AI-assisted workflows for research synthesis, copy and prototyping.",
  },
  {
    heading: "Collaboration",
    body: "Agile/Scrum sprints with Product, TAM, QA and Engineering; OKR-aligned design requirements, regular design reviews and detailed handoff specs.",
  },
];

const AUTOPLAY_MS = 6000;

export function DesignProcess() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const areaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(areaRef, { amount: 0.35 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const playing = inView && !paused && !reduced;
  const step = steps[active];
  const Icon = step.icon;

  const go = (i: number) => {
    const n = (i + steps.length) % steps.length;
    setDir(n > active ? 1 : -1);
    setActive(n);
  };

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setDir(1);
      setActive((a) => (a + 1) % steps.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
      tabRefs.current[(active + 1) % steps.length]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
      tabRefs.current[(active - 1 + steps.length) % steps.length]?.focus();
    }
  };

  return (
    <section id="process" className="py-24 md:py-32 bg-secondary/20 border-y border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          title="My Design Process"
          subtitle="A human-centered, iterative approach that keeps real users at the center of every decision."
        />

        <div
          ref={areaRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {/* Step list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: portfolioEasing }}
            role="tablist"
            aria-label="Design process phases"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="lg:col-span-4 lg:self-start flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-1 lg:pb-0 relative"
          >
            {/* Vertical progress rail (desktop) */}
            <div className="hidden lg:block absolute left-[37px] top-9 bottom-9 w-px bg-border" aria-hidden="true" />
            <motion.div
              className="hidden lg:block absolute left-[37px] top-9 w-px bg-primary origin-top"
              style={{ height: "calc(100% - 4.5rem)" }}
              animate={{ scaleY: active / (steps.length - 1) }}
              transition={{ duration: 0.5, ease: portfolioEasing }}
              aria-hidden="true"
            />

            {steps.map((s, i) => {
              const SIcon = s.icon;
              const isActive = i === active;
              const done = i < active;
              return (
                <button
                  key={s.phase}
                  role="tab"
                  ref={(el) => { tabRefs.current[i] = el; }}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => go(i)}
                  className={`relative flex-shrink-0 flex items-center gap-4 text-left rounded-2xl border px-4 py-3.5 transition-colors min-w-[11rem] lg:min-w-0 ${
                    isActive ? "border-transparent" : "border-transparent hover:bg-card/70"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="process-active"
                      className="absolute inset-0 rounded-2xl bg-card border border-primary/30 shadow-md shadow-primary/10"
                      transition={{ duration: 0.35, ease: portfolioEasing }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground"
                        : done
                          ? "bg-card border-primary text-primary"
                          : "bg-card border-border text-muted-foreground"
                    }`}
                  >
                    {done ? <Check size={18} strokeWidth={2.5} /> : <SIcon size={18} strokeWidth={1.8} />}
                  </span>
                  <span className="relative z-10 min-w-0">
                    <span className="block text-[11px] font-bold tracking-[0.18em] text-muted-foreground/70 uppercase">
                      Phase {s.phase}
                    </span>
                    <span className={`block font-serif text-lg leading-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                      {s.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: portfolioEasing }}
            className="lg:col-span-8 relative"
          >
            <div className="absolute -inset-5 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 rounded-3xl blur-2xl pointer-events-none" aria-hidden="true" />
            <div className="relative bg-card border border-border rounded-3xl shadow-lg shadow-slate-900/5 dark:shadow-black/30 overflow-hidden">
              <div role="tabpanel" className="p-6 md:p-9 min-h-[27rem]">
                <AnimatePresence mode="wait" initial={false} custom={dir}>
                  <motion.div
                    key={step.phase}
                    custom={dir}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: 28 * d }),
                      center: { opacity: 1, x: 0 },
                      exit: (d: number) => ({ opacity: 0, x: -28 * d }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: portfolioEasing }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          <Icon size={26} strokeWidth={1.6} />
                        </span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            Phase {step.phase} of 0{steps.length}
                          </p>
                          <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground leading-tight">
                            {step.label}
                          </h3>
                        </div>
                      </div>
                      <span className="hidden sm:block text-6xl font-serif font-medium text-foreground/[0.06] leading-none select-none">
                        {step.phase}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-primary">{step.tagline}</p>
                    <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      {step.description}
                    </p>

                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-3">Methods</p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.methods.map((m, i) => (
                            <motion.span
                              key={m}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                              className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground border border-border/60 rounded-lg"
                            >
                              {m}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-3">What I produce</p>
                        <ul className="space-y-2">
                          {step.outputs.map((o, i) => (
                            <motion.li
                              key={o}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.12 + i * 0.06 }}
                              className="flex items-center gap-2.5 text-sm text-foreground"
                            >
                              <Check size={14} className="text-primary flex-shrink-0" strokeWidth={2.5} />
                              {o}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="mt-8 flex gap-3 rounded-2xl border border-primary/20 bg-primary/[0.05] p-4"
                    >
                      <Sparkles size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary mb-1">In practice</p>
                        <p className="text-sm text-foreground/90 leading-relaxed">{step.practice}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Autoplay progress */}
              <div className="h-0.5 bg-border/60">
                {playing && (
                  <motion.div
                    key={active}
                    className="h-full bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </div>

              {/* Footer controls */}
              <div className="flex items-center justify-between gap-4 px-6 md:px-9 py-4 border-t border-border bg-secondary/40">
                <button
                  onClick={() => go(active - 1)}
                  aria-label="Previous phase"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={16} /> Previous
                </button>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {steps.map((s, i) => (
                    <button
                      key={s.phase}
                      tabIndex={-1}
                      onClick={() => go(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? "w-7 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => go(active + 1)}
                  aria-label="Next phase"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* How I work */}
        <div className="mt-16 md:mt-20 pt-12 border-t border-border/50">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif font-medium mb-6"
          >
            How I work
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howIWork.map((item, i) => (
              <motion.div
                key={item.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: portfolioEasing }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-2.5">{item.heading}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-sm text-muted-foreground text-center max-w-lg mx-auto italic"
        >
          This is a guide, not a rigid checklist — the process adapts to project constraints, but user validation always anchors every decision.
        </motion.p>
      </div>
    </section>
  );
}
