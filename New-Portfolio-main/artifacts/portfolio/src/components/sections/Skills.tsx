import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  Layers,
  Search,
  BarChart3,
  Component,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { portfolioEasing } from "@/lib/motion";

/* ── Core strengths: each backed by a result from the resume ── */
const strengths = [
  {
    icon: BarChart3,
    title: "Enterprise UX & dashboards",
    stat: "−30%",
    statLabel: "process completion time",
    body: "Designed FieldEquip's KPI and reporting dashboard from scratch and simplified multi-step workflows across Work Orders, Assets, Requests and Inventory.",
  },
  {
    icon: Search,
    title: "Research-led architecture",
    stat: "−35%",
    statLabel: "post-launch navigation issues",
    body: "Restructured information architecture using card sorting, tree testing and journey mapping of field technician workflows.",
  },
  {
    icon: Component,
    title: "Design systems & accessibility",
    stat: "−20%",
    statLabel: "design-to-dev handoff time",
    body: "Built reusable component libraries at two companies and ran WCAG 2.1 accessibility audits to keep products consistent and inclusive.",
  },
];

/* ── Full toolkit, grouped ── */
interface Group {
  id: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  items: string[];
}

const groups: Group[] = [
  {
    id: "design",
    label: "Product & UX design",
    blurb: "From problem framing to high-fidelity, testable prototypes.",
    icon: Layers,
    items: [
      "End-to-end Product Design",
      "User Flows",
      "Wireframing",
      "High-Fidelity Mockups",
      "Interactive Prototyping",
      "Interaction Design",
      "Information Architecture",
      "Journey Mapping",
      "UX Writing",
      "Design Thinking",
    ],
  },
  {
    id: "research",
    label: "Research & testing",
    blurb: "Evidence behind every design decision.",
    icon: Search,
    items: [
      "User Research",
      "Usability Testing",
      "A/B Testing",
      "Heuristic Evaluation",
      "Card Sorting",
      "Tree Testing",
      "Stakeholder Interviews",
      "Competitive Analysis",
      "NPS / CSAT Tracking",
    ],
  },
  {
    id: "enterprise",
    label: "Data-centric & enterprise UX",
    blurb: "Dense, role-based products made clear.",
    icon: BarChart3,
    items: [
      "Dashboard Design",
      "KPI Visualization",
      "Analytics Widgets",
      "Custom Reports",
      "Enterprise Workflow Simplification",
      "Edge Cases & System States",
    ],
  },
  {
    id: "systems",
    label: "Design systems & accessibility",
    blurb: "Consistent, inclusive interfaces across platforms.",
    icon: Component,
    items: [
      "Component Libraries",
      "Design Tokens",
      "Reusable UI Components",
      "Responsive & Mobile-first",
      "Web, iOS & Android",
      "WCAG 2.1 Audits",
    ],
  },
  {
    id: "collab",
    label: "Handoff & collaboration",
    blurb: "Shipping with Product, QA and Engineering.",
    icon: Users,
    items: [
      "Developer Handoff",
      "Design Specifications",
      "HTML5 / CSS3",
      "JavaScript",
      "Bootstrap",
      "Tailwind CSS",
      "Agile / Scrum",
      "Stakeholder Management",
      "OKR Alignment",
      "Design Reviews",
    ],
  },
  {
    id: "ai",
    label: "AI-assisted workflows",
    blurb: "Using AI where it helps, with a human in control.",
    icon: Sparkles,
    items: [
      "Research synthesis",
      "UX copy",
      "Rapid prototyping",
      "AI assistant behavior & guardrails",
      "Human-in-the-loop design",
    ],
  },
];

/* ── Tools ── */
const tools = [
  { name: "Figma", use: "Design & prototyping", mark: "Fg", bg: "#1E1E1E", fg: "#F24E1E" },
  { name: "FigJam", use: "Workshops & flows", mark: "Fj", bg: "#A259FF", fg: "#FFFFFF" },
  { name: "Adobe XD", use: "Prototyping", mark: "Xd", bg: "#470137", fg: "#FF61F6" },
  { name: "Illustrator", use: "Illustration & icons", mark: "Ai", bg: "#330000", fg: "#FF9A00" },
  { name: "Photoshop", use: "Imagery", mark: "Ps", bg: "#001E36", fg: "#31A8FF" },
  { name: "Miro", use: "Collaboration & mapping", mark: "Mi", bg: "#FFD02F", fg: "#050038" },
  { name: "Zeplin", use: "Developer handoff", mark: "Ze", bg: "#FDBD39", fg: "#1E1E1E" },
  { name: "Optimal Workshop", use: "Card sorting & tree testing", mark: "Ow", bg: "#1D4ED8", fg: "#FFFFFF" },
];

const SKILLS_AUTOPLAY_MS = 4000;

export function Skills() {
  const [active, setActive] = useState(groups[0].id);
  const group = groups.find((g) => g.id === active) ?? groups[0];
  const areaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(areaRef, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const playing = inView && !paused && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setActive((cur) => groups[(groups.findIndex((g) => g.id === cur) + 1) % groups.length].id);
    }, SKILLS_AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, active]);

  return (
    <section id="skills" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          title="Skills & Tools"
          subtitle="The disciplines, methods and software I use to take a product from research to pixel-perfect delivery."
        />

        {/* Core strengths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {strengths.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: portfolioEasing }}
                className="group flex flex-col bg-card border border-border rounded-2xl p-6 md:p-7 shadow-sm hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon size={20} />
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground/60 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-serif font-medium text-foreground leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.body}</p>
                <div className="mt-6 pt-5 border-t border-border flex items-baseline gap-3">
                  <span className="text-3xl font-serif font-semibold text-emerald-600 dark:text-emerald-400 leading-none tabular-nums">
                    <CountUp value={s.stat} />
                  </span>
                  <span className="text-xs text-muted-foreground">{s.statLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full toolkit */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: portfolioEasing }}
          className="mt-16 md:mt-20"
        >
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-2">The full toolkit</p>
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground">Skills by discipline</h3>
            </div>
            <p className="hidden md:block text-sm text-muted-foreground">
              {groups.reduce((n, g) => n + g.items.length, 0)} skills across {groups.length} areas
            </p>
          </div>

          <div
            ref={areaRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6"
          >
            {/* Group selector */}
            <div
              role="tablist"
              aria-label="Skill areas"
              className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-1 lg:pb-0"
            >
              {groups.map((g) => {
                const Icon = g.icon;
                const isActive = g.id === active;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(g.id)}
                    className={`relative flex-shrink-0 flex items-center gap-3.5 text-left rounded-xl px-4 py-3 transition-colors min-w-[13rem] lg:min-w-0 ${
                      isActive ? "" : "hover:bg-secondary/70"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skill-active"
                        className="absolute inset-0 rounded-xl bg-card border border-primary/30 shadow-md shadow-primary/10"
                        transition={{ duration: 0.35, ease: portfolioEasing }}
                      />
                    )}
                    <span
                      className={`relative z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                    <span className="relative z-10 flex-1 min-w-0">
                      <span className={`block text-sm font-semibold leading-snug ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                        {g.label}
                      </span>
                    </span>
                    <span className="relative z-10 text-[11px] font-semibold tabular-nums text-muted-foreground">
                      {g.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Panel */}
            <div className="lg:col-span-8 bg-card border border-border rounded-2xl shadow-sm overflow-hidden min-h-[18rem] flex flex-col">
              <div className="h-0.5 bg-border/60">
                {playing && (
                  <motion.div
                    key={active}
                    className="h-full bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: SKILLS_AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </div>
              <div className="p-6 md:p-8 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: portfolioEasing }}
                >
                  <h4 className="text-xl md:text-2xl font-serif font-medium text-foreground">{group.label}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground">{group.blurb}</p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {group.items.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.92, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.035, duration: 0.3, ease: portfolioEasing }}
                        className="px-3.5 py-2 text-sm font-medium text-secondary-foreground bg-secondary border border-border/70 rounded-xl hover:border-primary/40 hover:text-foreground transition-colors"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tools */}
        <div className="mt-16 md:mt-20">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-2">Tools</p>
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground">Where I work</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 4) * 0.07, duration: 0.45, ease: portfolioEasing }}
                className="group flex items-center gap-3.5 bg-card border border-border rounded-2xl p-4 shadow-sm hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span
                  className="flex-shrink-0 w-11 h-11 rounded-xl ring-1 ring-black/5 dark:ring-white/15 flex items-center justify-center text-[13px] font-black tracking-tight group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: tool.bg, color: tool.fg }}
                  aria-hidden="true"
                >
                  {tool.mark}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground leading-snug">{tool.name}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">{tool.use}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
