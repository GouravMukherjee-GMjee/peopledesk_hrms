import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Layers, Coins, Puzzle, Code2, Check, AlertCircle, Inbox } from "lucide-react";
import { portfolioEasing } from "@/lib/motion";
import { CountUp } from "@/components/ui/CountUp";
import { ImageFrame } from "@/components/ui/ImageFrame";

const capabilities = [
  {
    icon: Coins,
    title: "Design tokens & foundations",
    desc: "Color, type, spacing and radius defined once and reused across web and mobile, so every screen starts from the same base.",
  },
  {
    icon: Puzzle,
    title: "Reusable component library",
    desc: "Variant-rich components with every state designed — default, hover, disabled, error, loading and empty.",
  },
  {
    icon: Code2,
    title: "Developer-ready handoff",
    desc: "Detailed specifications and reusable components that cut design-to-dev handoff time by 20%.",
  },
];

const metrics = [
  { value: "20%", label: "Faster design-to-dev handoff" },
  { value: "2", label: "Design systems built" },
  { value: "WCAG 2.1", label: "Accessibility audits" },
];

const tabs = ["Foundations", "Components", "States", "In Figma"] as const;
type Tab = (typeof tabs)[number];

const swatches = [
  { name: "primary", cls: "bg-primary" },
  { name: "foreground", cls: "bg-foreground" },
  { name: "secondary", cls: "bg-secondary border border-border" },
  { name: "muted", cls: "bg-muted border border-border" },
  { name: "success", cls: "bg-emerald-500" },
  { name: "warning", cls: "bg-amber-500" },
  { name: "danger", cls: "bg-rose-500" },
];

const typeScale = [
  { role: "Display", spec: "56 / 60", cls: "text-4xl sm:text-5xl font-serif font-medium" },
  { role: "Heading", spec: "28 / 36", cls: "text-3xl font-serif font-medium" },
  { role: "Body", spec: "16 / 24", cls: "text-base" },
  { role: "Caption", spec: "12 / 16", cls: "text-xs text-muted-foreground" },
];

const spacing = [4, 8, 12, 16, 24, 32, 48];
const radii = [4, 8, 12, 16, 24];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-3">{title}</p>
      {children}
    </div>
  );
}

function Foundations() {
  return (
    <div className="space-y-7">
      <Group title="Color tokens">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {swatches.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="text-center"
            >
              <div className={`h-12 rounded-xl ${s.cls} shadow-sm`} />
              <p className="text-[11px] font-medium text-muted-foreground mt-1.5">{s.name}</p>
            </motion.div>
          ))}
        </div>
      </Group>

      <Group title="Type scale">
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {typeScale.map((t, i) => (
            <motion.div
              key={t.role}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex items-baseline justify-between gap-4 px-4 py-3 bg-background"
            >
              <span className={`${t.cls} leading-none truncate`}>Aa — {t.role}</span>
              <span className="text-[11px] tabular-nums text-muted-foreground flex-shrink-0">{t.spec}</span>
            </motion.div>
          ))}
        </div>
      </Group>

      <div className="grid sm:grid-cols-2 gap-7">
        <Group title="Spacing (px)">
          <div className="flex items-end gap-2">
            {spacing.map((s, i) => (
              <motion.div
                key={s}
                initial={{ height: 0 }}
                animate={{ height: s + 8 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: portfolioEasing }}
                className="flex-1 rounded-md bg-primary/15 border border-primary/30 flex items-end justify-center pb-1"
              >
                <span className="text-[11px] text-primary font-semibold tabular-nums">{s}</span>
              </motion.div>
            ))}
          </div>
        </Group>
        <Group title="Corner radius (px)">
          <div className="flex gap-3">
            {radii.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex-1 text-center"
              >
                <div
                  className="h-11 border-2 border-primary/40 bg-primary/10"
                  style={{ borderRadius: r }}
                />
                <p className="text-[11px] text-muted-foreground mt-1.5 tabular-nums">{r}</p>
              </motion.div>
            ))}
          </div>
        </Group>
      </div>
    </div>
  );
}

function Components() {
  const [on, setOn] = useState(true);
  const [checked, setChecked] = useState(true);
  return (
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
      <Group title="Buttons">
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Primary</span>
          <span className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold border border-border">Secondary</span>
          <span className="px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground">Outline</span>
          <span className="px-4 py-2 rounded-lg bg-muted text-muted-foreground/60 text-sm font-semibold cursor-not-allowed">Disabled</span>
        </div>
      </Group>

      <Group title="Badges">
        <div className="flex flex-wrap gap-2">
          {[
            ["Active", "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"],
            ["Pending", "bg-amber-500/10 text-amber-700 dark:text-amber-300"],
            ["Overdue", "bg-rose-500/10 text-rose-700 dark:text-rose-300"],
            ["Draft", "bg-secondary text-muted-foreground border border-border"],
          ].map(([label, cls]) => (
            <span key={label} className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
              {label}
            </span>
          ))}
        </div>
      </Group>

      <Group title="Text field">
        <div className="space-y-2.5">
          <div className="px-3 py-2 rounded-lg border border-border bg-background text-sm text-muted-foreground">Default</div>
          <div className="px-3 py-2 rounded-lg border-2 border-primary bg-background text-sm text-foreground ring-4 ring-primary/10">Focused</div>
          <div>
            <div className="px-3 py-2 rounded-lg border-2 border-rose-500 bg-background text-sm text-foreground">Error</div>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">This field is required</p>
          </div>
        </div>
      </Group>

      <Group title="Controls (try them)">
        <div className="space-y-4">
          <button
            onClick={() => setOn((v) => !v)}
            role="switch"
            aria-checked={on}
            className="flex items-center gap-3 text-sm text-foreground"
          >
            <span className={`relative w-10 h-6 rounded-full transition-colors ${on ? "bg-primary" : "bg-border"}`}>
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow ${on ? "right-1" : "left-1"}`}
              />
            </span>
            Notifications {on ? "on" : "off"}
          </button>
          <button
            onClick={() => setChecked((v) => !v)}
            role="checkbox"
            aria-checked={checked}
            className="flex items-center gap-3 text-sm text-foreground"
          >
            <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${checked ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
              {checked && <Check size={12} strokeWidth={3} />}
            </span>
            Remember me
          </button>
        </div>
      </Group>
    </div>
  );
}

function States() {
  const cards = [
    {
      label: "Default",
      body: (
        <>
          <p className="text-xs text-muted-foreground">Open work orders</p>
          <p className="text-2xl font-serif font-semibold text-foreground mt-1">128</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">+12 this week</p>
        </>
      ),
    },
    {
      label: "Loading",
      body: (
        <div className="space-y-2.5">
          <div className="skeleton h-3 w-2/3 rounded" />
          <div className="skeleton h-7 w-1/3 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      ),
    },
    {
      label: "Empty",
      body: (
        <div className="flex flex-col items-center text-center gap-1.5 py-1">
          <Inbox size={22} className="text-muted-foreground" />
          <p className="text-xs font-semibold text-foreground">No work orders yet</p>
          <p className="text-[11px] text-muted-foreground">Create one to get started</p>
        </div>
      ),
    },
    {
      label: "Error",
      body: (
        <div className="flex flex-col items-center text-center gap-1.5 py-1">
          <AlertCircle size={22} className="text-rose-500" />
          <p className="text-xs font-semibold text-foreground">Couldn't load data</p>
          <p className="text-[11px] text-rose-600 dark:text-rose-400 underline underline-offset-2">Try again</p>
        </div>
      ),
    },
    {
      label: "Success",
      body: (
        <div className="flex flex-col items-center text-center gap-1.5 py-1">
          <span className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Check size={15} strokeWidth={3} />
          </span>
          <p className="text-xs font-semibold text-foreground">Order submitted</p>
          <p className="text-[11px] text-muted-foreground">WO-2041 is now scheduled</p>
        </div>
      ),
    },
  ];
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-5">
        Every component ships with its edge cases — designed once, reused everywhere.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, ease: portfolioEasing }}
            className="rounded-xl border border-border bg-background p-4 flex flex-col"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">{c.label}</span>
            <div className="flex-1 flex flex-col justify-center">{c.body}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InFigma() {
  return (
    <ImageFrame variant="artboard" label="Design System · Figma file">
      <img
        loading="lazy"
        decoding="async"
        src={`${import.meta.env.BASE_URL}images/design-system.webp`}
        alt="Design system components in Figma"
        className="w-full h-auto"
      />
    </ImageFrame>
  );
}


const AUTOPLAY_MS = 7000;

export function DesignSystem() {
  const [tab, setTab] = useState<Tab>("Foundations");
  const explorerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(explorerRef, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const playing = inView && !paused && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setTab((cur) => tabs[(tabs.indexOf(cur) + 1) % tabs.length]);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, tab]);

  return (
    <section id="design-systems" className="py-24 md:py-32 bg-secondary/30 border-y border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left: copy */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Layers size={16} className="text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Design Systems</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground leading-tight">
                Building systems, not just screens.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                I build and maintain design systems that keep products consistent, speed up delivery and hold quality as teams and features grow.
              </p>
            </motion.div>

            <div className="space-y-3">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="group flex gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon size={17} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-0.5">{cap.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: interactive system explorer */}
          <motion.div
            ref={explorerRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: portfolioEasing, delay: 0.1 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 rounded-3xl blur-2xl pointer-events-none" />

            <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-xl shadow-slate-900/10 dark:shadow-black/40">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/60">
                <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="ml-4 text-xs text-muted-foreground font-medium">Design system explorer</span>
                <span className="ml-auto text-[11px] font-medium text-muted-foreground tabular-nums">
                  {tabs.indexOf(tab) + 1} / {tabs.length}
                </span>
              </div>

              <div role="tablist" className="flex border-b border-border overflow-x-auto no-scrollbar">
                {tabs.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`relative flex-1 min-w-[6.25rem] px-3 sm:px-4 py-3 text-[13px] sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                      tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                    {tab === t && (
                      <motion.span
                        layoutId="ds-tab-underline"
                        className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary"
                        transition={{ duration: 0.3, ease: portfolioEasing }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="h-0.5 bg-border/60">
                {playing && (
                  <motion.div
                    key={tab}
                    className="h-full bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </div>

              <div className="p-5 md:p-7 min-h-[30rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: portfolioEasing }}
                  >
                    {tab === "Foundations" && <Foundations />}
                    {tab === "Components" && <Components />}
                    {tab === "States" && <States />}
                    {tab === "In Figma" && <InFigma />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results band */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: portfolioEasing }}
          className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-border bg-card shadow-sm divide-y sm:divide-y-0 sm:divide-x divide-border overflow-hidden"
        >
          {metrics.map((m) => (
            <div key={m.label} className="px-6 py-6 md:px-8 md:py-7">
              <dd className="text-3xl md:text-4xl font-serif font-semibold text-foreground leading-none whitespace-nowrap">
                <CountUp value={m.value} />
              </dd>
              <dt className="mt-2.5 text-sm text-muted-foreground">{m.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
