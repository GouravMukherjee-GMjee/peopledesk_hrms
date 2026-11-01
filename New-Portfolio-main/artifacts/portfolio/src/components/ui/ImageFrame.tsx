import type { ReactNode } from "react";

interface ImageFrameProps {
  /** "browser" = window chrome with address bar; "artboard" = Figma-style selected frame. */
  variant?: "browser" | "artboard";
  label: string;
  children: ReactNode;
  className?: string;
}


export function ImageFrame({ variant = "browser", label, children, className = "" }: ImageFrameProps) {
  if (variant === "artboard") {
    return (
      <figure
        className={`relative rounded-[28px] p-px bg-gradient-to-br from-primary/40 via-border to-primary/10 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 ${className}`}
      >
        <div className="rounded-[27px] bg-card p-2.5 sm:p-3">
          <div className="relative rounded-[18px] overflow-hidden ring-1 ring-border/70 bg-muted">{children}</div>
          <figcaption className="flex items-center justify-between gap-3 px-2 pt-3 pb-1">
            <span className="flex items-center gap-2 text-xs font-medium text-foreground/80 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </span>
            <span className="flex gap-1 flex-shrink-0" aria-hidden="true">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            </span>
          </figcaption>
        </div>
      </figure>
    );
  }

  return (
    <figure className={`relative rounded-2xl border border-border bg-card shadow-xl shadow-slate-900/10 dark:shadow-black/40 overflow-hidden ${className}`}>
      <figcaption className="flex items-center gap-3 px-4 py-2.5 bg-secondary border-b border-border">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="flex-1 max-w-sm mx-auto text-center text-[11px] text-muted-foreground bg-background/80 border border-border/60 rounded-md py-1 px-3 truncate">
          {label}
        </span>
        <span className="w-10" aria-hidden="true" />
      </figcaption>
      <div className="bg-muted">{children}</div>
    </figure>
  );
}
