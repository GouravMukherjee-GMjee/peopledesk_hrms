import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  PenTool,
  Pipette,
  Layers,
  Type,
  Crop,
  Move,
  Frame,
  Component,
  Palette,
  Ruler,
  Shapes,
  Brush,
  Wand2,
  Grid3x3,
  Spline,
  MousePointer2,
  type LucideIcon,
} from "lucide-react";

type Item = {
  x: number; // % of viewport width
  y: number; // % of viewport height
  size: number;
  depth: number; // parallax strength on scroll
  dur: number; // float duration (s)
  delay: number;
  rot: number;
  tone: "primary" | "muted";
  icon?: LucideIcon;
  badge?: { text: string; bg: string; fg: string };
  mobile?: boolean;
};

const items: Item[] = [
  // Left margin
  { x: 3, y: 12, size: 34, depth: 0.12, dur: 9, delay: 0, rot: -12, tone: "primary", icon: PenTool },
  { x: 6, y: 28, size: 36, depth: 0.2, dur: 11, delay: 1, rot: 6, tone: "muted", badge: { text: "Fg", bg: "#1E1E1E", fg: "#F24E1E" } },
  { x: 2.5, y: 44, size: 28, depth: 0.28, dur: 10, delay: 2, rot: 14, tone: "muted", icon: Pipette },
  { x: 5.5, y: 60, size: 32, depth: 0.16, dur: 9.5, delay: 0.6, rot: 8, tone: "primary", icon: Spline },
  { x: 3, y: 76, size: 36, depth: 0.3, dur: 12, delay: 1.4, rot: -6, tone: "muted", badge: { text: "Xd", bg: "#470137", fg: "#FF61F6" } },
  { x: 6.5, y: 90, size: 28, depth: 0.14, dur: 11.5, delay: 0.8, rot: 10, tone: "muted", icon: Crop },
  // Right margin
  { x: 94, y: 8, size: 30, depth: 0.2, dur: 11, delay: 0.4, rot: 10, tone: "muted", icon: Layers },
  { x: 91.5, y: 24, size: 36, depth: 0.24, dur: 10, delay: 1.6, rot: -8, tone: "muted", badge: { text: "Ps", bg: "#001E36", fg: "#31A8FF" } },
  { x: 95, y: 40, size: 34, depth: 0.16, dur: 12, delay: 0.5, rot: -8, tone: "primary", icon: Component },
  { x: 92, y: 56, size: 28, depth: 0.32, dur: 13, delay: 1.2, rot: 16, tone: "muted", icon: Ruler },
  { x: 95.5, y: 72, size: 36, depth: 0.2, dur: 10, delay: 2.4, rot: -6, tone: "muted", badge: { text: "Ai", bg: "#330000", fg: "#FF9A00" } },
  { x: 92.5, y: 88, size: 30, depth: 0.26, dur: 9, delay: 0.9, rot: -10, tone: "primary", icon: Frame },
  // Top / bottom edges
  { x: 28, y: 2.5, size: 24, depth: 0.1, dur: 12, delay: 3, rot: 12, tone: "muted", icon: Move, mobile: true },
  { x: 66, y: 2, size: 26, depth: 0.18, dur: 10, delay: 0.3, rot: -6, tone: "primary", icon: Palette, mobile: true },
  { x: 40, y: 94, size: 26, depth: 0.2, dur: 11, delay: 0.6, rot: 10, tone: "primary", icon: Brush, mobile: true },
  { x: 76, y: 95, size: 26, depth: 0.22, dur: 12.5, delay: 1.6, rot: -12, tone: "muted", icon: Wand2, mobile: true },
  { x: 16, y: 96, size: 24, depth: 0.18, dur: 10, delay: 2.8, rot: 8, tone: "muted", icon: Grid3x3, mobile: true },
  { x: 56, y: 96, size: 26, depth: 0.2, dur: 11, delay: 2.2, rot: -16, tone: "muted", icon: Shapes, mobile: true },
  { x: 84, y: 3, size: 24, depth: 0.14, dur: 10.5, delay: 2.5, rot: 6, tone: "muted", icon: Type, mobile: true },
];

function Floating({ item, reduced }: { item: Item; reduced: boolean }) {
  const { scrollY } = useScroll();
  const drift = useSpring(useTransform(scrollY, (v) => -v * item.depth), { stiffness: 60, damping: 20, mass: 0.6 });
  const Icon = item.icon;

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute ${item.mobile ? "" : "hidden xl:block"}`}
      style={{ left: `${item.x}%`, top: `${item.y}%`, y: reduced ? 0 : drift }}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -14, 0], rotate: [item.rot, item.rot + 8, item.rot] }}
        transition={{ duration: item.dur, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotate: item.rot }}
      >
        {Icon ? (
          <Icon
            size={item.size}
            strokeWidth={1.4}
            className={item.tone === "primary" ? "text-primary/[0.22] dark:text-primary/[0.2]" : "text-foreground/[0.12] dark:text-foreground/[0.1]"}
          />
        ) : item.badge ? (
          <span
            className="flex items-center justify-center rounded-xl border-2 border-current font-black tracking-tight opacity-[0.28] dark:opacity-[0.3]"
            style={{
              width: item.size,
              height: item.size,
              color: item.badge.fg,
              fontSize: item.size * 0.34,
            }}
          >
            {item.badge.text}
          </span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

/** A collaborative-cursor with a name tag that drifts across the page. */
function Cursor({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute hidden xl:block left-0 top-0"
      initial={{ x: "10vw", y: "20vh" }}
      animate={
        reduced
          ? undefined
          : {
              x: ["10vw", "88vw", "50vw", "90vw", "10vw"],
              y: ["20vh", "14vh", "80vh", "50vh", "20vh"],
            }
      }
      transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
    >
      <MousePointer2 size={22} className="text-primary/60 fill-primary/40 -rotate-12" strokeWidth={1.6} />
      <span className="ml-4 -mt-1 inline-block rounded-md rounded-tl-none bg-primary/70 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-sm">
        Gourav
      </span>
    </motion.div>
  );
}

export function DesignBackdrop() {
  const reduced = !!useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {items.map((item, i) => (
        <Floating key={i} item={item} reduced={reduced} />
      ))}
      <Cursor reduced={reduced} />
    </div>
  );
}
