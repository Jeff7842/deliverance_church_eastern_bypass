"use client";

import * as React from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/** Bar that fills, with a count-up percentage, when it scrolls into view. */
export function ProgressBar({
  value,
  label,
  className,
}: {
  /** 0 to 100 */
  value: number;
  label: string;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduce ? 0 : 1400;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = ms ? Math.min(1, (now - t0) / ms) : 1;
      setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-label">{label}</span>
        <span className="text-h4 font-semibold" aria-hidden>
          {shown}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="h-4 overflow-hidden rounded-full bg-white/20"
      >
        <div
          className="h-full origin-left rounded-full bg-gradient-to-r from-brand-gold-from to-brand-gold-to transition-transform duration-[1400ms] ease-out-soft"
          style={{ transform: `scaleX(${inView ? value / 100 : 0})` }}
        />
      </div>
    </div>
  );
}
