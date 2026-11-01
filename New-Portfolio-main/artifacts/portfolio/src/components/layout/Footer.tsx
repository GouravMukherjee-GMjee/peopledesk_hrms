import { motion } from "framer-motion";
import {
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ArrowUp,
  ArrowRight,
  Download,
  GitMerge,
} from "lucide-react";
import { portfolioEasing } from "@/lib/motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
];

const contacts = [
  {
    label: "LinkedIn",
    value: "gourav-mukherjee",
    href: "https://linkedin.com/in/gourav-mukherjee-710503207",
    icon: Linkedin,
  },
  {
    label: "Email",
    value: "gouravmukherjee1907@gmail.com",
    href: "mailto:gouravmukherjee1907@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+91 79923 12865",
    href: "tel:+917992312865",
    icon: Phone,
  },
  {
    label: "Based in",
    value: "Jamshedpur, Jharkhand, India",
    href: null as string | null,
    icon: MapPin,
  },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: portfolioEasing },
});

const colTitle = "text-white/55 text-xs font-semibold uppercase tracking-[0.15em] mb-5";

export function Footer() {
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" });

  const goTo = (e: React.MouseEvent, href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: reduce() ? "auto" : "smooth",
    });
  };

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: "hsl(226 18% 9%)" }}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* ── Call to action card ── */}
        <motion.div
          {...reveal()}
          className="relative mt-16 md:mt-24 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/25 via-white/[0.03] to-white/[0.02] px-6 py-12 md:px-14 md:py-16"
        >
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 mb-4">Get in touch</p>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-white tracking-tight leading-[1.1]">
                Let's build something <span className="text-blue-300">clear and useful</span> together.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 max-w-xl leading-relaxed">
                I'm open to new senior UX and product design roles. If you're working on a complex product, I'd love to hear about it.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
              <a
                href="mailto:gouravmukherjee1907@gmail.com"
                className="group flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail size={16} />
                Send a message
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href={`${import.meta.env.BASE_URL}Gourav_Mukherjee_Resume.pdf`}
                download="Gourav_Mukherjee_Resume.pdf"
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Download size={16} />
                Download resume
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 py-14 md:py-16">
          <motion.div {...reveal(0.05)} className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <GitMerge size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-none">GMux</p>
                <p className="text-white/55 text-xs mt-1">Multi-Experience. One Identity.</p>
              </div>
            </div>
            <h3 className="mt-6 text-white text-2xl font-serif font-medium leading-snug">Gourav Mukherjee</h3>
            <p className="text-white/60 text-sm mt-1">Senior UX Designer</p>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
              Designing enterprise SaaS for field service management and EdTech — from research to pixel-perfect delivery.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-300 text-xs font-medium">Open to new opportunities</span>
            </div>
          </motion.div>

          <motion.nav {...reveal(0.12)} aria-label="Footer" className="md:col-span-3">
            <p className={colTitle}>Navigate</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => goTo(e, link.href)}
                    className="group inline-flex items-center text-white/65 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 group-hover:mr-2 h-px bg-blue-400 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div {...reveal(0.2)} className="md:col-span-4">
            <p className={colTitle}>Contact</p>
            <ul className="space-y-4">
              {contacts.map(({ label, value, href, icon: Icon }) => {
                const inner = (
                  <>
                    <span className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon size={15} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] text-white/45 leading-none mb-1">{label}</span>
                      <span className="block text-sm text-white/80 break-words">{value}</span>
                    </span>
                    {href && (
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 group-hover:opacity-70 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 ml-auto flex-shrink-0"
                      />
                    )}
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-3 text-white/65 hover:text-white transition-colors duration-200"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 text-white/65">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/45 text-xs">© {new Date().getFullYear()} Gourav Mukherjee. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <p className="text-white/45 text-xs">Designed in Figma · Built with React</p>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-blue-600 hover:bg-blue-600 transition-all duration-300"
            >
              <ArrowUp size={15} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
