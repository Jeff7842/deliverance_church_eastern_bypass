"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

const BG = {
  gold: "bg-gradient-to-r from-brand-gold-from to-brand-gold-to",
  red: "bg-brand-red",
  blue: "bg-brand-blue-bright",
} as const;

type Tone = keyof typeof BG;

/**
 * One word set in a coloured box: the Figma headline signature. The box grows
 * in from the left or right edge when the word scrolls into view.
 */
export function Highlight({
  tone = "blue",
  from = "left",
  className,
  children,
}: {
  tone?: Tone;
  from?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.6);
  return (
    <span
      ref={ref}
      className={cn("relative isolate inline-block px-[0.12em] font-normal", tone === "gold" ? "text-black" : "text-white", className)}
    >
      <span
        aria-hidden
        data-in={inView}
        className={cn(
          "hl-bg absolute inset-0 -z-10",
          BG[tone],
          from === "left" ? "origin-left" : "origin-right",
        )}
      />
      {children}
    </span>
  );
}

/** Highlight for the hero: grows on slide change (CSS animation, no scroll). */
export function GrowHighlight({
  tone,
  from,
  children,
}: {
  tone: Tone;
  from: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <span className="relative isolate inline-block px-[0.12em] font-normal">
      <span
        aria-hidden
        className={cn(
          "grow-bg absolute inset-0 -z-10",
          BG[tone],
          from === "left" ? "origin-left" : "origin-right",
        )}
      />
      <span className={tone === "gold" ? "grow-text-dark" : undefined}>{children}</span>
    </span>
  );
}
