"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/** Intro on scroll: rise + fade when it enters the viewport. */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      data-in={inView}
      className={cn("reveal", className)}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
