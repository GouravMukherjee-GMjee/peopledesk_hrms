import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { portfolioEasing } from "@/lib/motion";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  domain: string;
  accentBorder: string;
  accentBadge: string;
  accentText: string;
  heroImage?: string;
  gallery?: string[];
  link?: string;
  wideGallery?: boolean;
  captions?: string[];
  problem: string;
  research: { title: string; points: string[] };
  solution: { intro: string; features: { heading: string; points: string[] }[] };
  impact: string[];
}

const projects: Project[] = [
  {
    id: "peopledesk",
    title: "People Desk & Ask People Desk",
    subtitle: "HR platform with an AI assistant that knows when to hand off to a human",
    domain: "HR Tech · AI",
    accentBorder: "border-l-amber-400",
    accentBadge: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    accentText: "text-amber-600 dark:text-amber-400",
    tags: ["HR Tech", "AI Assistant", "Multi-Role", "Web"],
    link: "https://peopledesk-hrms.vercel.app/",
    wideGallery: true,
    heroImage: "images/projects/peopledesk-login.webp",
    gallery: [
      "images/projects/peopledesk-login.webp",
      "images/projects/peopledesk-ask-panel.webp",
      "images/projects/peopledesk-ask-answer.webp",
      "images/projects/peopledesk-dashboard.webp",
      "images/projects/peopledesk-reports.webp",
      "images/projects/peopledesk-roles.webp",
    ],
    captions: [
      "Sign in — workspace login for office and plant teams",
      "Ask PeopleDesk — suggested questions grounded in what the signed-in role can access",
      "Read-only answer — explains the data, then links to the right workflow",
      "HR dashboard — approvals, payroll blockers, incidents and expiring certificates",
      "Reports — workforce analytics, with sample data clearly labeled",
      "Role preview — switch between Employee, Manager, HR, Admin and System Admin",
    ],
    problem:
      "HR teams spend a large share of their time answering the same questions — leave balance, reimbursement rules, payslip queries and policy lookups. Employees wait for answers, and HR has less time for work that needs judgment.",
    research: {
      title: "Insights came from the HR workflows mapped while designing the product:",
      points: [
        "Repeat questions cluster around leave, payroll, reimbursements and policy lookups",
        "People Desk already held the data and workflows behind those questions",
        "A natural-language entry point could connect employees to them faster, without replacing HR in complex cases",
      ],
    },
    solution: {
      intro: "Designed People Desk for office and plant teams, with Ask People Desk as its conversational layer:",
      features: [
        {
          heading: "People Desk Platform",
          points: [
            "Attendance, leave, shifts, payroll, safety and training",
            "Five roles: Employee, Manager, HR, Admin, System Admin",
          ],
        },
        {
          heading: "Self-Serve Answers",
          points: [
            "Plain-language answers, e.g. \"How many leaves do I have left?\"",
            "Answers drawn only from HR-approved policies and documents",
            "Guides employees into the right workflow, such as applying for leave or raising a ticket",
          ],
        },
        {
          heading: "Human Handoff",
          points: [
            "Escalates complex or sensitive cases to HR with context instead of guessing",
            "Respects roles — shows only data the signed-in role can already see",
          ],
        },
      ],
    },
    impact: [
      "Directional goals: fewer repetitive HR queries and faster answers for employees",
      "Clear handoffs for sensitive cases, keeping HR time for work that needs judgment",
      "Trust-first design: approved content only, escalate rather than guess",
      "No measured results yet — would track resolution without HR, escalation rate, helpfulness and time to first answer",
    ],
  },
  {
    id: "syncura",
    title: "Syncura",
    subtitle: "Care coordination platform with a safe, clinician-controlled AI documentation assistant",
    domain: "Healthcare · AI",
    accentBorder: "border-l-emerald-400",
    accentBadge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    accentText: "text-emerald-600 dark:text-emerald-400",
    tags: ["Healthcare", "AI Assistant", "Multi-Role", "Web"],
    link: "https://syncuracare-coordination.vercel.app/",
    wideGallery: true,
    heroImage: "images/projects/syncura-dashboard.webp",
    gallery: [
      "images/projects/syncura-dashboard.webp",
      "images/projects/syncura-journey.webp",
      "images/projects/syncura-patients.webp",
      "images/projects/syncura-beds.webp",
      "images/projects/syncura-appointments.webp",
      "images/projects/syncura-portal.webp",
    ],
    captions: [
      "Administrator dashboard — operations at a glance: overdue tasks, referrals, bed occupancy and wait times",
      "Patient journey — milestones, owners and pending actions across the care pathway",
      "Patients — searchable directory with department, coordinator and next appointment",
      "Bed map — ward occupancy, acuity scores, isolation and cleaning status",
      "Appointments — weekly calendar for the front desk with in-person and phone visits",
      "Patient portal — appointments, visit summary, care plan and care team in plain language",
    ],
    problem:
      "Hospital work is handed between many people, and details get lost at each handoff: referrals go overdue, shift handovers are incomplete, and patients aren't sure what happens next. Clinicians also lose time on documentation.",
    research: {
      title: "Insights came from mapping the patient journey and the handoffs between roles:",
      points: [
        "Care passes from registration to queue, appointment, referral, bedside care, handover and discharge",
        "Every handoff is a point where referrals, tasks and context can be lost",
        "One connected system could make handoffs visible and give each role only the view it needs",
        "Documentation could be faster without taking control away from clinicians",
      ],
    },
    solution: {
      intro: "Designed a staff workspace of 18 modules and a separate patient portal, serving seven roles:",
      features: [
        {
          heading: "Care Coordination",
          points: [
            "Front desk: queue, worklists, appointments and registration",
            "Patient journeys, referrals and tasks with follow-ups",
            "Shift roster, handover summary and bed assignment",
          ],
        },
        {
          heading: "AI Documentation Assistant",
          points: [
            "Drafts summaries from shorthand, organizes notes and suggests follow-up tasks",
            "Highlights missing fields and suggests ICD/CPT codes",
            "Labeled \"AI-generated draft: Not reviewed\" — never enters the record until the clinician signs",
          ],
        },
        {
          heading: "Governance & Patient Portal",
          points: [
            "Audit logs, consent, interpreter needs and role-based permissions",
            "Signed notes are locked; staff-only sections never reach patients",
            "Plain-language visit summaries released only after signing",
          ],
        },
      ],
    },
    impact: [
      "Directional goals: fewer missed handoffs and faster note completion",
      "Clearer patient communication through plain-language summaries",
      "Trust by design: draft only, permission-gated, human sign-off and audit trails",
      "No measured results yet — would track note completion time, AI draft acceptance, overdue referrals and handover completeness",
    ],
  },
  {
    id: "jobsearch",
    title: "Job Search & Professional Networking",
    subtitle: "All-in-one jobs + networking + growth platform",
    domain: "Product Design",
    accentBorder: "border-l-sky-400",
    accentBadge: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    accentText: "text-sky-600 dark:text-sky-400",
    tags: ["Product Design", "SaaS", "B2C", "Web"],
    heroImage: "images/projects/jobsearch-dashboard.webp",
    gallery: ["images/projects/jobsearch-dashboard.webp"],
    problem:
      "Job seekers struggled with fragmented job discovery, no direct communication with recruiters, and no structured way to track applications or build professional visibility on existing platforms.",
    research: {
      title: "User interviews with job seekers and recruiters uncovered:",
      points: [
        "Users want better filtering and personalization in job search",
        "No transparency in application status — silence after applying",
        "Strong demand for a combined networking + job platform",
        "Competitive analysis of LinkedIn and Indeed identified engagement and UX gaps",
      ],
    },
    solution: {
      intro: "Designed a Job Search + Networking Ecosystem:",
      features: [
        {
          heading: "Core Job Features",
          points: [
            "Advanced search with multi-level filters",
            "Application tracking dashboard",
            "Direct chat with HR / recruiters",
          ],
        },
        {
          heading: "Gamified Networking",
          points: [
            "Connection tiers (Level 1 → Platinum) based on engagement",
            "Points for connections, likes, and comments",
            "Rewards: subscription discounts and visibility boosts",
          ],
        },
        {
          heading: "AI & Growth Features",
          points: [
            "AI-driven job and tech recommendations",
            "Social feed with posts, likes, and comments",
            "HR dashboard to post jobs and manage candidates",
          ],
        },
      ],
    },
    impact: [
      "Increased user engagement through gamification mechanics",
      "Improved application transparency for job seekers",
      "Higher recruiter-user interaction rates",
      "Built an all-in-one platform combining jobs + networking + career growth",
    ],
  },
];

const detailTabs = ["Problem", "Research", "Solution", "Impact"] as const;
type DetailTab = (typeof detailTabs)[number];

const AUTOPLAY_MS = 5000;

function hostOf(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function Showcase({ project }: { project: Project }) {
  const gallery = project.gallery ?? [];
  const reduced = useReducedMotion();
  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [detail, setDetail] = useState<DetailTab>("Problem");

  const playing = gallery.length > 1 && !paused && !reduced;

  const go = (i: number) => {
    setDirection(i > activeImage ? 1 : -1);
    setActiveImage(i);
  };
  const step = (d: number) => go((activeImage + d + gallery.length) % gallery.length);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setDirection(1);
      setActiveImage((i) => (i + 1) % gallery.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, activeImage, gallery.length]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left: story + facts */}
      <div className="lg:col-span-4 order-1">
        <div className="lg:sticky lg:top-28 space-y-7">
          <div>
            <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${project.accentBadge}`}>
              {project.domain}
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-medium text-foreground leading-[1.1] tracking-tight">
              {project.title}
            </h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{project.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-card text-secondary-foreground text-[11px] font-semibold uppercase tracking-wider rounded-full border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              View live prototype
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">Design case study — no live prototype.</p>
          )}
        </div>
      </div>

      {/* Right: gallery + tabs */}
      <div className="lg:col-span-8 order-2 space-y-6">
        {gallery.length > 0 && (
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative rounded-2xl border border-border bg-card shadow-xl shadow-slate-900/10 dark:shadow-black/40 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-secondary border-b border-border">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex-1 max-w-md mx-auto text-center text-[11px] text-muted-foreground bg-background/80 border border-border/60 rounded-md py-1 truncate px-3">
                  {hostOf(project.link) || project.title}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground tabular-nums w-10 text-right">
                  {activeImage + 1}/{gallery.length}
                </span>
              </div>

              <div className="relative bg-muted overflow-hidden">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.img
                    key={gallery[activeImage]}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ opacity: 0, x: 32 * d }),
                      center: { opacity: 1, x: 0 },
                      exit: (d: number) => ({ opacity: 0, x: -32 * d }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: portfolioEasing }}
                    src={`${import.meta.env.BASE_URL}${gallery[activeImage]}`}
                    alt={project.captions?.[activeImage] ?? project.title}
                    className="w-full h-auto max-h-[560px] object-cover object-top"
                  />
                </AnimatePresence>

                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => step(-1)}
                      aria-label="Previous screenshot"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 border border-border shadow-md flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => step(1)}
                      aria-label="Next screenshot"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 border border-border shadow-md flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Autoplay progress */}
              {gallery.length > 1 && (
                <div className="h-0.5 bg-border/60">
                  {playing && (
                    <motion.div
                      key={`${activeImage}-${project.id}`}
                      className="h-full bg-primary origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
              <div className="min-h-[2.5rem] flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={activeImage}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted-foreground"
                  >
                    {project.captions?.[activeImage] ?? project.title}
                  </motion.p>
                </AnimatePresence>
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-2 flex-shrink-0 overflow-x-auto no-scrollbar">
                  {gallery.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => go(i)}
                      aria-label={`Show screenshot ${i + 1}`}
                      aria-current={activeImage === i}
                      className={`relative w-16 h-10 rounded-md overflow-hidden border-2 flex-shrink-0 transition-all ${
                        activeImage === i ? "border-primary opacity-100 scale-105" : "border-border opacity-50 hover:opacity-90"
                      }`}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}${img}`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Case study tabs */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div role="tablist" className="flex border-b border-border overflow-x-auto no-scrollbar">
            {detailTabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={detail === t}
                onClick={() => setDetail(t)}
                className={`relative flex-1 min-w-[5.5rem] px-3 sm:px-5 py-3.5 text-[13px] sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                  detail === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
                {detail === t && (
                  <motion.span
                    layoutId={`detail-underline-${project.id}`}
                    className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary"
                    transition={{ duration: 0.3, ease: portfolioEasing }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 min-h-[11rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={detail}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: portfolioEasing }}
              >
                {detail === "Problem" && (
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl">{project.problem}</p>
                )}

                {detail === "Research" && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">{project.research.title}</p>
                    <ul className="space-y-3">
                      {project.research.points.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex gap-3 text-sm md:text-base text-muted-foreground"
                        >
                          <ArrowRight size={15} className={`flex-shrink-0 mt-1 ${project.accentText}`} />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {detail === "Solution" && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-5">{project.solution.intro}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.solution.features.map((f, i) => (
                        <motion.div
                          key={f.heading}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08, ease: portfolioEasing }}
                          className="rounded-xl p-5 border border-border bg-background hover:-translate-y-0.5 hover:shadow-md transition-all"
                        >
                          <h5 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">{f.heading}</h5>
                          <ul className="space-y-2">
                            {f.points.map((p) => (
                              <li key={p} className="text-sm text-muted-foreground flex gap-2">
                                <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${project.accentText}`} style={{ background: "currentColor" }} />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {detail === "Impact" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.impact.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, ease: portfolioEasing }}
                        className="flex gap-3 items-start bg-background border border-border rounded-xl p-4"
                      >
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-emerald-500" />
                        <span className="text-sm text-foreground leading-snug">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PersonalProjects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <section id="projects" className="py-24 md:py-32 bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          title="Personal Projects"
          subtitle="Self-initiated case studies — AI-assisted workflows for HR, care coordination and careers, built as live prototypes."
          alignment="left"
        />

        {/* Project selector with previews */}
        <div role="tablist" aria-label="Projects" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, index) => {
            const isActive = project.id === activeId;
            return (
              <motion.button
                key={project.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(project.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: portfolioEasing }}
                className={`group relative flex md:flex-col text-left rounded-2xl border overflow-hidden bg-card transition-all duration-300 ${
                  isActive
                    ? "border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/30"
                    : "border-border hover:border-foreground/20 hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <div className="relative w-28 md:w-full flex-shrink-0 md:aspect-[16/9] bg-muted overflow-hidden">
                  {project.heroImage && (
                    <img
                      src={`${import.meta.env.BASE_URL}${project.heroImage}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.04] ${
                        isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                      }`}
                    />
                  )}
                  <span className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-background/90 backdrop-blur border border-border flex items-center justify-center text-xs font-bold font-serif text-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4 md:p-5 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${project.accentBadge}`}>
                      {project.domain}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="project-dot"
                        className="w-2 h-2 rounded-full bg-primary"
                        transition={{ duration: 0.3, ease: portfolioEasing }}
                      />
                    )}
                  </div>
                  <h4 className="mt-2.5 font-serif text-lg font-medium text-foreground leading-snug line-clamp-2">
                    {project.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug line-clamp-2 hidden sm:block">
                    {project.subtitle}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active project */}
        <div className="mt-12 md:mt-16">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: portfolioEasing }}
            >
              <Showcase project={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
