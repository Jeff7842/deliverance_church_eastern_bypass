"use client";

import * as React from "react";
import Image from "next/image";
import { GrowHighlight } from "@/components/ui/highlight";
import { PillButton } from "@/components/ui/pill-button";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

// Slide 1 is the Figma photo. 2-4 are placeholders from public/IMAGES until
// the hero slides are supplied (Figma shows four pagination dots).
// Slide 1 copy is from Figma; 2-4 are placeholder copy.
const SLIDES = [
  {
    src: "/IMAGES/DCEB-0865.jpg",
    lines: ["The", "church", "of"],
    accent: "choice",
    tone: "blue",
    text: "Deliverance church eastern bypass is the home to all people far and close. With reach internationally and locally",
  },
  {
    src: "/IMAGES/DCEB-0869.jpg",
    lines: ["A place", "to"],
    accent: "belong",
    tone: "gold",
    text: "Come as you are. Find family, faith and purpose among people who truly care.",
  },
  {
    src: "/IMAGES/DCEB-0876.jpg",
    lines: ["Worship", "with"],
    accent: "joy",
    tone: "red",
    text: "Join us every Sunday as we lift our voices and encounter God's presence together.",
  },
  {
    src: "/IMAGES/DCEB-0885.jpg",
    lines: ["Lives", "made"],
    accent: "new",
    tone: "gold",
    text: "Hope, healing and freedom for every person, every home and every generation.",
  },
  {
    src: "/IMAGES/DCEB-0890.jpg",
    lines: ["Faith", "in"],
    accent: "action",
    tone: "blue",
    text: "We live what we believe, serving our neighbours and standing with the next generation.",
  },
  {
    src: "/IMAGES/DCEB-0902.jpg",
    lines: ["Hope for", "every"],
    accent: "home",
    tone: "red",
    text: "Families grow stronger here, through prayer, community and the Word every week.",
  },
  {
    src: "/IMAGES/DCEB-0905.jpg",
    lines: ["Serving", "our"],
    accent: "city",
    tone: "gold",
    text: "Reaching beyond our walls with love, compassion and practical help.",
  },
] as const;
// Highlight colour is set per slide (first is blue); direction alternates.
const NORMAL_MS = 5000; // a slide lasts 5s with the cursor away
const HOVER_MS = 10000; // ...and 10s while the cursor is on the hero (5s longer)
const ZOOM = 0.12; // photo scales 1 -> 1.12 across the slide's own duration

export function Hero() {
  const [{ i, prev }, setSlide] = React.useState<{ i: number; prev: number | null }>({
    i: 0,
    prev: null,
  });
  const slide = SLIDES[i];
  const rootRef = React.useRef<HTMLElement>(null);
  const hovered = React.useRef(false);
  const progress = React.useRef(0); // 0..1 through the current slide

  const go = React.useCallback((to: number) => {
    // Exit animation starts from the zoom the slide actually reached.
    rootRef.current?.style.setProperty("--hero-end", String(1 + ZOOM * progress.current));
    progress.current = 0;
    setSlide((s) => (s.i === to ? s : { i: to, prev: s.i }));
  }, []);

  // One loop accumulates progress. Hover only changes the divisor, so moving
  // the cursor on or off never restarts the slide; it just slows or speeds it.
  React.useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Count real elapsed time while the page is visible; skip while hidden.
      const dt = document.hidden ? 0 : now - last;
      last = now;
      progress.current += dt / (hovered.current ? HOVER_MS : NORMAL_MS);
      const el = rootRef.current;
      if (progress.current >= 1) {
        el?.style.setProperty("--hero-end", String(1 + ZOOM));
        progress.current = 0;
        setSlide((s) => ({ i: (s.i + 1) % SLIDES.length, prev: s.i }));
      }
      el?.style.setProperty("--hero-p", String(progress.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Welcome"
      className="relative isolate min-h-[640px] overflow-hidden bg-black text-white md:h-[min(var(--panel-h),100svh)] md:min-h-[720px]"
      onMouseEnter={(e) => {
        hovered.current = true;
        e.currentTarget.dataset.hovered = "true";
      }}
      onMouseLeave={(e) => {
        hovered.current = false;
        e.currentTarget.dataset.hovered = "false";
      }}
    >
      {SLIDES.map(({ src }, n) => (
        <div
          key={src}
          aria-hidden
          data-state={n === i ? "in" : n === prev ? "out" : "idle"}
          className="hero-slide absolute inset-0 -z-20"
        >
          <div className="hero-img absolute inset-0 will-change-transform">
            <Image src={src} alt="" fill sizes="100vw" priority={n === 0} className="object-cover" />
          </div>
        </div>
      ))}
      {/* Figma: linear gradient #D9D9D9 0% to #080808 89% */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/10 via-black/30 to-hero-fade" />

      <SiteHeader />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-10 px-(--gutter) pb-20 md:inset-y-0 md:justify-center md:pt-24 md:pb-0">
        <div key={i} className="max-w-[750px]">
          <h1
            className="rise text-display font-bold uppercase"
            style={{ ["--d" as string]: "100ms" }}
          >
            {slide.lines.slice(0, -1).map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            <span className="block">
              {slide.lines[slide.lines.length - 1]}{" "}
              <GrowHighlight key={i} tone={slide.tone} from={i % 2 === 0 ? "left" : "right"}>
                {slide.accent}
              </GrowHighlight>
            </span>
          </h1>
          <p
            className="rise text-body mt-6 max-w-[44rem] text-white/80"
            style={{ ["--d" as string]: "300ms" }}
          >
            {slide.text}
          </p>
        </div>

        <div
          className="rise self-end md:absolute md:right-(--gutter) md:bottom-[18%]"
          style={{ ["--d" as string]: "500ms" }}
        >
          <PillButton href="/about" tone="blue" arrow="left">
            See more
          </PillButton>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3" role="tablist" aria-label="Slides">
        {SLIDES.map((_, n) => (
          <button
            key={n}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Slide ${n + 1}`}
            onClick={() => go(n)}
            className={cn(
              "size-3.5 rounded-full border border-white/70 transition",
              n === i ? "bg-white" : "bg-transparent hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </section>
  );
}
