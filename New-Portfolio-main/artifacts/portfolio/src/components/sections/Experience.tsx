import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Award, MapPin, ChevronDown, CalendarDays, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "@/components/ui/CountUp";
import { portfolioEasing } from "@/lib/motion";

interface Role {
  company: string;
  initials: string;
  logo: string;
  productLogo: string;
  role: string;
  product: string;
  start: [number, number]; // [year, month 1-12]
  end: [number, number] | "present";
  period: string;
  location: string;
  current: boolean;
  focus: string[];
  metrics: { value: string; label: string }[];
  bullets: { tag: string; text: string }[];
}

const roles: Role[] = [
  {
    company: "Bursys Infotech India Pvt. Ltd.",
    initials: "BI",
    logo: "images/logos/bursys.webp",
    productLogo: "images/logos/fieldequip.webp",
    role: "Senior UX Designer",
    product: "FieldEquip — Field Service Management (FSM) SaaS Platform (Web & Mobile)",
    start: [2024, 2],
    end: "present",
    period: "Feb 2024 – Present",
    location: "Panchkula, India",
    current: true,
    focus: ["Enterprise SaaS", "Dashboards", "Information architecture", "Design system", "WCAG 2.1", "Agile / Scrum"],
    metrics: [
      { value: "+25%", label: "Task completion" },
      { value: "−30%", label: "Process completion time" },
      { value: "−35%", label: "Navigation issues" },
      { value: "−20%", label: "Design-to-dev handoff time" },
    ],
    bullets: [
      {
        tag: "End-to-end ownership",
        text: "Own end-to-end UX for FieldEquip, from discovery and user research to user flows, high-fidelity Figma prototypes and developer handoff. Raised task completion by 25% (validated through usability testing) and cut design-to-dev handoff time by 20% with detailed specifications and reusable components.",
      },
      {
        tag: "Dashboard",
        text: "Designed the FieldEquip Dashboard from scratch (KPI charts, custom reports, analytics widgets), giving field service teams real-time operational visibility and faster, data-driven decisions.",
      },
      {
        tag: "Workflows",
        text: "Simplified complex multi-step workflows across Work Orders, Asset Management, Requests and Inventory, reducing process completion time by 30%.",
      },
      {
        tag: "Information architecture",
        text: "Restructured the information architecture using card sorting, tree testing and journey mapping of field technician workflows, reducing post-launch navigation issues by 35%.",
      },
      {
        tag: "Accessibility & states",
        text: "Designed edge cases and system states (empty, error, loading, success) and ran WCAG 2.1 accessibility audits, improving product usability, adoption and user satisfaction.",
      },
      {
        tag: "Iteration & strategy",
        text: "Iterated on released designs using usability testing, NPS/CSAT and product analytics; translated business OKRs and the product roadmap into clear design requirements with Product Managers.",
      },
      {
        tag: "Collaboration",
        text: "Collaborated in Agile/Scrum sprints with a 9-person cross-functional team (Product, TAM, QA and Engineering), running design reviews and delivering pixel-perfect handoff that reduced UI-related defects before release.",
      },
      {
        tag: "Design system",
        text: "Maintain a consistent web and mobile UI through a reusable component library and design system guidelines.",
      },
    ],
  },
  {
    company: "Wefivesoft Pvt. Ltd.",
    initials: "WF",
    logo: "images/logos/wefivesoft.webp",
    productLogo: "images/logos/markerspro.webp",
    role: "UI/UX Designer",
    product: "MarkersPro — EdTech SaaS Platform (Web & Mobile)",
    start: [2021, 3],
    end: [2023, 9],
    period: "Mar 2021 – Sep 2023",
    location: "Bangalore, India",
    current: false,
    focus: ["EdTech SaaS", "Design system", "UX writing", "Mobile-first", "WCAG 2.1", "HTML / CSS / JS"],
    metrics: [
      { value: "+30%", label: "User engagement" },
      { value: "−25%", label: "Bounce rate" },
      { value: "−18%", label: "Onboarding drop-off" },
    ],
    bullets: [
      {
        tag: "Engagement & IA",
        text: "Designed UI/UX for the platform in Agile/Scrum sprints; improved user engagement by 30% and reduced bounce rate by 25% by restructuring information architecture and navigation.",
      },
      {
        tag: "Design system",
        text: "Built and maintained a design system with a reusable component library, giving cross-platform UI consistency and faster feature delivery.",
      },
      {
        tag: "Research & prototyping",
        text: "Conducted user research and created personas, journey maps, user flows, wireframes and high-fidelity prototypes aligned with product strategy and OKRs.",
      },
      {
        tag: "UX writing",
        text: "Wrote UX copy for onboarding tooltips, error states and empty states, reducing onboarding drop-off by 18%.",
      },
      {
        tag: "Responsive & accessible",
        text: "Designed responsive, mobile-first interfaces for web and mobile following WCAG 2.1 principles.",
      },
      {
        tag: "Handoff & build",
        text: "Handed off designs to engineering and implemented UI in HTML5, CSS3, Bootstrap and JavaScript; worked with QA to resolve UI defects and keep releases stable.",
      },
    ],
  },
];

const certifications = [
  { name: "Google UX Design Professional Certificate", issuer: "Google / Coursera", year: "2024" },
  { name: "IBM Enterprise Design Thinking Practitioner", issuer: "IBM Skills Build", year: "2023" },
  { name: "UX Design Fundamentals", issuer: "Interaction Design Foundation", year: "2022" },
];

const VISIBLE = 3;

/** "2 yrs 10 mos" — inclusive of the start and end months. */
function duration(role: Role) {
  const now = new Date();
  const [ey, em] = role.end === "present" ? [now.getFullYear(), now.getMonth() + 1] : role.end;
  const months = (ey - role.start[0]) * 12 + (em - role.start[1]) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo${m > 1 ? "s" : ""}` : ""].filter(Boolean).join(" ");
}

function RoleCard({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const shown = open ? role.bullets : role.bullets.slice(0, VISIBLE);
  const hidden = role.bullets.length - VISIBLE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.05, ease: portfolioEasing }}
      className="relative lg:pl-16"
    >
      {/* Timeline node */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className={`absolute left-0 top-6 w-10 h-10 rounded-xl hidden lg:flex items-center justify-center border-2 z-10 text-xs font-bold tracking-tight ${
          role.current
            ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "bg-card border-border text-muted-foreground"
        }`}
      >
        <Briefcase size={16} />
        {role.current && (
          <span className="absolute -inset-1.5 rounded-2xl border border-primary/40 animate-ping opacity-40" aria-hidden="true" />
        )}
      </motion.div>

      <div className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-foreground/15 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
        {/* Left rail: role summary */}
        <aside className="lg:col-span-4 bg-secondary/40 border-b lg:border-b-0 lg:border-r border-border rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
          <div className="p-6 md:p-7 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {role.current && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Current
                </span>
              )}
              <span className="text-[11px] font-bold uppercase tracking-wider bg-card text-foreground/70 px-2.5 py-1 rounded-full border border-border">
                {duration(role)}
              </span>
            </div>

            <h3 className="text-2xl font-serif font-medium text-foreground leading-tight">{role.role}</h3>
            <p className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} className="flex-shrink-0" />
                {role.period}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="flex-shrink-0" />
                {role.location}
              </span>
            </p>

            {/* Company → Project, clearly labeled */}
            <div className="mt-6 space-y-3">
              {[
                { label: "Company", src: role.logo, name: role.company, sub: null as string | null },
                { label: "Project", src: role.productLogo, name: role.product.split(" — ")[0], sub: (role.product.split(" — ")[1] ?? "").replace(/\s*\(.*\)$/, "") },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-2.5">{item.label}</p>
                  <div className="flex items-center gap-3.5">
                    <span className="flex-shrink-0 w-24 h-12 rounded-lg bg-white border border-border/70 flex items-center justify-center px-2">
                      <img
                        src={`${import.meta.env.BASE_URL}${item.src}`}
                        alt={`${item.name} logo`}
                        loading="lazy"
                        decoding="async"
                        className="max-h-8 max-w-full w-auto object-contain"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground leading-snug">{item.name}</span>
                      {item.sub && <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">{item.sub}</span>}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mt-6 mb-2.5">Focus areas</p>
            <div className="flex flex-wrap gap-1.5">
              {role.focus.map((f, i) => (
                <motion.span
                  key={f}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="px-2.5 py-1 text-xs font-medium bg-card text-secondary-foreground border border-border/70 rounded-lg"
                >
                  {f}
                </motion.span>
              ))}
            </div>
          </div>
        </aside>

        {/* Right: outcomes + contributions */}
        <div className="lg:col-span-8 min-w-0">
          <div className={`grid grid-cols-2 ${role.metrics.length === 4 ? "md:grid-cols-4" : "sm:grid-cols-3"} divide-x divide-border border-b border-border`}>
            {role.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`px-5 py-5 ${i >= 2 && role.metrics.length === 4 ? "border-t border-border md:border-t-0" : ""}`}
              >
                <p className="text-2xl md:text-3xl font-serif font-semibold text-emerald-600 dark:text-emerald-400 leading-none tabular-nums">
                  <CountUp value={m.value} />
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-4">
              Responsibilities &amp; contributions
            </p>
            <ul className="space-y-4">
              <AnimatePresence initial={false}>
                {shown.map((b, i) => (
                  <motion.li
                    key={b.text}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, delay: i >= VISIBLE ? (i - VISIBLE) * 0.04 : 0, ease: portfolioEasing }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center tabular-nums">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{b.tag}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{b.text}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {hidden > 0 && (
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary px-4 py-2 rounded-full border border-primary/25 hover:bg-primary/5 transition-colors"
              >
                {open ? "Show less" : `Show ${hidden} more`}
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={16} />
                </motion.span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section id="experience" className="py-24 md:py-32 bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          title="Experience"
          subtitle="Five-plus years designing enterprise SaaS across Field Service Management and EdTech."
          alignment="left"
        />

        {/* Timeline */}
        <div ref={trackRef} className="relative mt-4">
          <div className="hidden lg:block absolute left-5 top-8 bottom-8 w-px bg-border" aria-hidden="true" />
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="hidden lg:block absolute left-5 top-8 bottom-8 w-px bg-primary"
            aria-hidden="true"
          />
          <div className="space-y-8 md:space-y-10">
            {roles.map((role) => (
              <RoleCard key={role.company} role={role} />
            ))}
          </div>
        </div>

        {/* Education & certifications */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: portfolioEasing }}
            className="bg-card border border-border rounded-2xl p-6 md:p-7 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <GraduationCap size={18} />
              </span>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Education</h3>
            </div>
            <p className="text-lg font-serif font-medium text-foreground">Bachelor of Technology (B.Tech)</p>
            <p className="text-sm text-muted-foreground mt-1">Trident Academy of Technology, Bhubaneswar, Odisha</p>
            <p className="text-xs font-semibold text-foreground/70 mt-4 inline-block bg-secondary border border-border/60 rounded-lg px-3 py-1.5">
              Graduated Aug 2020
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: portfolioEasing }}
            className="bg-card border border-border rounded-2xl p-6 md:p-7 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award size={18} />
              </span>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Certifications</h3>
            </div>
            <ul className="divide-y divide-border">
              {certifications.map((c, i) => (
                <motion.li
                  key={c.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">{c.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.issuer}</p>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums flex-shrink-0">{c.year}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
