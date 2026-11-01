import { motion } from "framer-motion";
import { ArrowRight, Download, Linkedin, Mail, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioEasing } from "@/lib/motion";

const specializations = ["SaaS Platforms", "Enterprise UX", "Field Service", "EdTech"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: portfolioEasing },
});

export function Hero() {
  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex items-center pt-28 pb-16 md:pb-20 overflow-hidden">
      {/* Background: soft grid + brand glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="hero-grid absolute inset-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            <motion.div {...fadeUp(0)}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm mb-7">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                Open to new opportunities
              </div>
            </motion.div>

            <motion.p {...fadeUp(0.08)} className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-4">
              Gourav Mukherjee · Senior UX Designer
            </motion.p>

            <motion.h1
              {...fadeUp(0.16)}
              className="text-5xl md:text-6xl xl:text-[4.25rem] font-serif font-medium leading-[1.05] tracking-tight mb-6"
            >
              Designing{" "}
              <span className="text-primary">scalable UX</span> for complex products.
            </motion.h1>

            <motion.p {...fadeUp(0.24)} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mb-7">
              Senior UX designer with 5+ years in data-heavy enterprise SaaS — turning multi-step workflows,
              dashboards and role-based products into clear, accessible experiences, now exploring AI-assisted workflows.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-2 mb-9">
              {specializations.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 text-xs font-semibold tracking-wide bg-secondary border border-border/60 rounded-full text-secondary-foreground"
                >
                  {s}
                </span>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.36)} className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Button size="lg" className="w-full sm:w-auto rounded-full h-13 px-8 text-base group shadow-md shadow-primary/20" onClick={scrollToWork}>
                View case studies
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href={`${import.meta.env.BASE_URL}Gourav_Mukherjee_Resume.pdf`} download="Gourav_Mukherjee_Resume.pdf" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full rounded-full h-13 px-8 text-base bg-card">
                  <Download className="mr-2 w-4 h-4" />
                  Download resume
                </Button>
              </a>
              <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-1">
                <a
                  href="https://linkedin.com/in/gourav-mukherjee-710503207"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex-1 sm:flex-none sm:w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:gouravmukherjee1907@gmail.com"
                  aria-label="Email Gourav"
                  className="flex-1 sm:flex-none sm:w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — product preview */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: portfolioEasing }}
            className="lg:col-span-5 relative"
          >
            {/* Main browser frame */}
            <div className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-slate-900/15 dark:shadow-black/40 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-secondary border-b border-border">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex-1 max-w-xs mx-auto text-center text-[11px] text-muted-foreground bg-background/80 border border-border/60 rounded-md py-1 truncate px-3">
                  syncuracare-coordination.vercel.app
                </div>
                <span className="w-10" />
              </div>
              <img
                src={`${import.meta.env.BASE_URL}images/projects/syncura-dashboard.webp`}
                alt="Syncura care coordination dashboard"
                width={1902}
                height={907}
                decoding="async"
                className="w-full h-auto"
              />
            </div>

            {/* Floating secondary card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="hidden sm:block absolute -bottom-8 -left-4 w-[50%] rounded-xl border border-border bg-card shadow-xl shadow-slate-900/15 dark:shadow-black/40 overflow-hidden"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/projects/peopledesk-ask-panel.webp`}
                alt="Ask PeopleDesk AI assistant"
                width={1911}
                height={908}
                decoding="async"
                className="w-full h-auto"
              />
            </motion.div>

            {/* Floating metric chips */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-5 -right-3 lg:-right-6 items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 shadow-lg shadow-slate-900/10 dark:shadow-black/40"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <TrendingUp size={16} />
              </span>
              <span>
                <span className="block text-lg font-serif font-semibold leading-none text-foreground">+25%</span>
                <span className="block text-[11px] text-muted-foreground mt-1">Task completion</span>
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
              className="hidden md:flex absolute bottom-10 -right-3 lg:-right-6 items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 shadow-lg shadow-slate-900/10 dark:shadow-black/40"
            >
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <TrendingDown size={16} />
              </span>
              <span>
                <span className="block text-lg font-serif font-semibold leading-none text-foreground">−30%</span>
                <span className="block text-[11px] text-muted-foreground mt-1">Process time</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
