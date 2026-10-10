"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

/**
 * Horizontal scroller with edge buttons. A button only shows when there is
 * more content in that direction. Children are laid out in one bottom-aligned
 * row; the track bleeds to the viewport edges.
 */
export function HScroller({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [edge, setEdge] = React.useState({ left: false, right: true });

  const update = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const left = el.scrollLeft > 8;
    const right = el.scrollLeft < el.scrollWidth - el.clientWidth - 8;
    setEdge((e) => (e.left === left && e.right === right ? e : { left, right }));
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const raf = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const by = (dir: -1 | 1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn =
    "absolute top-1/2 z-20 grid size-14 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-soft transition-opacity duration-300";

  return (
    <div className={cn("relative", className)}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -mx-(--gutter) overflow-x-auto scroll-smooth px-(--gutter) pb-2 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => by(-1)}
        className={cn(btn, "-left-4", edge.left ? "opacity-100" : "pointer-events-none opacity-0")}
        tabIndex={edge.left ? 0 : -1}
      >
        <Icon icon="lucide:chevron-left" className="size-7" aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => by(1)}
        className={cn(btn, "-right-4", edge.right ? "opacity-100" : "pointer-events-none opacity-0")}
        tabIndex={edge.right ? 0 : -1}
      >
        <Icon icon="lucide:chevron-right" className="size-7" aria-hidden />
      </button>
    </div>
  );
}
