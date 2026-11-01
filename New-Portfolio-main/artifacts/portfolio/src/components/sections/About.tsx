import { motion } from "framer-motion";
import {
  Search,
  Layers,
  Lightbulb,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  GraduationCap,
  Sparkles,
  Download,
  Mail,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioEasing } from "@/lib/motion";

const traits = ["Research-led", "Systems thinker", "User advocate", "Accessibility focused"];


const facts = [
  { icon: Briefcase, label: "Role", value: "Senior UX Designer" },
  { icon: Clock, label: "Experience", value: "5+ years, since 2021" },
  { icon: Building2, label: "Domains", value: "FSM · EdTech · SaaS" },
  { icon: MapPin, label: "Based in", value: "Jamshedpur, Jharkhand, India" },
  { icon: GraduationCap, label: "Education", value: "B.Tech, 2020" },
  { icon: Sparkles, label: "Exploring", value: "AI-assisted workflows" },
];

const journey = [
  {
    when: "Mar 2021",
    title: "UI/UX Designer",
    place: "Wefivesoft",
    detail: "Designed MarkersPro, an EdTech platform, end to end. Built its design system and lifted engagement by 30%.",
  },
  {
    when: "Feb 2024",
    title: "Senior UX Designer",
    place: "Bursys Infotech",
    detail: "Own UX for FieldEquip, a field service platform. Designed its dashboard from scratch and cut process completion time by 30%.",
  },
  {
    when: "Today",
    title: "Exploring AI-assisted workflows",
    place: "Personal projects",
    detail: "Designing human-in-the-loop assistants: People Desk for HR and Syncura for care coordination.",
  },
];

const principles = [
  {
    icon: Search,
    belief: "Research before pixels.",
    detail:
      "Every decision is grounded in evidence, not assumption. User research isn't a phase — it's the lens through which I see every problem.",
  },
  {
    icon: Layers,
    belief: "Systems over screens.",
    detail:
      "I design for scale. A well-built design system outlasts any single screen and helps whole teams ship consistently and confidently.",
  },
  {
    icon: Lightbulb,
    belief: "Clarity over complexity.",
    detail:
      "The best enterprise tools feel obvious. Reducing cognitive load in dense workflows is the hardest — and most impactful — design challenge there is.",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: portfolioEasing },
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-5">{children}</p>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="max-w-3xl mb-12 md:mb-14">
          <motion.div {...fade()} className="flex items-center gap-3 mb-5">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: portfolioEasing }}
              style={{ transformOrigin: "left" }}
              className="w-10 h-[3px] bg-primary rounded-full"
            />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">About me</span>
          </motion.div>
          <motion.h2
            {...fade(0.05)}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-[1.08]"
          >
            Driven by impact, <span className="text-primary">rooted in empathy.</span>
          </motion.h2>
        </div>

        {/* Story + at a glance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <motion.div {...fade(0.1)} className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                I'm a senior UX designer with <strong className="font-semibold text-foreground">5+ years</strong> of experience designing enterprise SaaS — first as a UI/UX designer on MarkersPro, an EdTech platform (2021–2023), and since 2024 as the Senior UX Designer behind FieldEquip, a field service management platform.
              </p>
              <p>
                My work centers on data-heavy, role-based products: dashboards, multi-step workflows, information architecture and design systems. I take problems from research to shipped screens and developer handoff, and I measure the result — task completion up 25%, process time down 30%, engagement up 30%.
              </p>
              <p>
                Lately I've been exploring how AI can assist people at work — HR self-service and clinical documentation — always with a human in control.
              </p>
            </motion.div>

            <motion.div {...fade(0.2)} className="mt-8 flex flex-wrap gap-2">
              {traits.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="px-3.5 py-1.5 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full border border-border/60 tracking-wide"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>

            <motion.div {...fade(0.25)} className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href={`${import.meta.env.BASE_URL}Gourav_Mukherjee_Resume.pdf`} download="Gourav_Mukherjee_Resume.pdf">
                <Button size="lg" className="w-full sm:w-auto rounded-full h-12 px-7 shadow-md shadow-primary/20">
                  <Download className="mr-2 w-4 h-4" />
                  Download resume
                </Button>
              </a>
              <a href="mailto:gouravmukherjee1907@gmail.com">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full h-12 px-7 bg-card">
                  <Mail className="mr-2 w-4 h-4" />
                  Get in touch
                </Button>
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <motion.div {...fade(0.1)} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <p className="px-6 pt-5 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                At a glance
              </p>
              <dl className="grid grid-cols-2 border-t border-border divide-x divide-y divide-border [&>*:nth-child(-n+2)]:border-t-0 [&>*:nth-child(odd)]:border-l-0">
                {facts.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className="group px-5 py-4 hover:bg-secondary/50 transition-colors"
                    >
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon size={15} />
                      </span>
                      <dt className="text-[11px] font-medium text-muted-foreground">{f.label}</dt>
                      <dd className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{f.value}</dd>
                    </motion.div>
                  );
                })}
              </dl>
            </motion.div>

            <motion.blockquote
              {...fade(0.2)}
              className="relative rounded-2xl border border-border bg-card p-6 pl-16 shadow-sm"
            >
              <Quote size={22} className="absolute left-6 top-6 text-primary/50" />
              <p className="font-serif text-lg text-foreground leading-snug">
                Good design is invisible — it just makes things work the way people expect them to.
              </p>
            </motion.blockquote>
          </div>
        </div>


        {/* Journey */}
        <div className="mt-16 md:mt-20">
          <motion.div {...fade()}>
            <Eyebrow>How I got here</Eyebrow>
          </motion.div>
          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: portfolioEasing }}
              style={{ transformOrigin: "left" }}
              className="hidden md:block absolute top-[7px] left-0 right-0 h-px bg-border"
              aria-hidden="true"
            />
            {journey.map((j, i) => {
              const last = i === journey.length - 1;
              return (
                <motion.li
                  key={j.when}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.18, duration: 0.55, ease: portfolioEasing }}
                  className="relative md:pt-8 pl-8 md:pl-0"
                >
                  <span
                    className={`absolute left-0 top-1.5 md:top-0 w-[15px] h-[15px] rounded-full border-2 bg-background ${
                      last ? "border-primary" : "border-muted-foreground/40"
                    }`}
                  >
                    {last && <span className="absolute inset-[3px] rounded-full bg-primary" />}
                  </span>
                  <p className="text-xs font-semibold text-primary tabular-nums">{j.when}</p>
                  <p className="mt-1 text-lg font-serif font-medium text-foreground leading-snug">{j.title}</p>
                  <p className="text-sm font-medium text-muted-foreground">{j.place}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-sm">{j.detail}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Philosophy */}
        <div className="mt-16 md:mt-20">
          <motion.div {...fade()}>
            <Eyebrow>Design philosophy</Eyebrow>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.belief}
                  {...fade(i * 0.1)}
                  className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground/50 tabular-nums">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-foreground leading-snug">{p.belief}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{p.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
