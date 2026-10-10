"use client";

import * as React from "react";
import Image from "next/image";
import { MILESTONES } from "@/lib/mock/home";
import { Highlight } from "@/components/ui/highlight";
import { cn } from "@/lib/utils";

const STEPS = MILESTONES.length;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Pinned scroll story, one milestone per viewport of scroll. The photo is the
 * full-screen background; a blurred glass panel sits behind the text and every
 * other element is layered above it. Pattern from rhemafeast, seven steps.
 */
export function History() {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const read = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = boxRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
      });
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  const scaled = progress * STEPS;
  const active = Math.min(STEPS - 1, Math.floor(scaled));
  const local = scaled - active; // 0..1 inside the active step
  const m = MILESTONES[active];
  // 1st milestone text left, 2nd right, 3rd left, and so on.
  const right = active % 2 === 1;

  return (
    <section
      id="history"
      aria-label="Our history"
      ref={boxRef}
      style={{ height: `${STEPS * 100}svh` }}
      className="bg-hero-fade relative text-white"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Background: the milestone photo, full screen, slow parallax zoom. */}
        {MILESTONES.map((item, n) => (
          <Image
            key={item.year}
            src={item.image}
            alt=""
            fill
            sizes="100vw"
            priority={n === 0}
            className={cn(
              "z-0 object-cover transition-opacity duration-700",
              n === active ? "opacity-100" : "opacity-0",
            )}
            style={n === active ? { transform: `scale(${1.05 + local * 0.1})` } : undefined}
          />
        ))}
        <div
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-700",
            right ? "opacity-0" : "opacity-100",
            "bg-gradient-to-r from-black/80 via-black/40 to-black/10",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-700",
            right ? "opacity-100" : "opacity-0",
            "bg-gradient-to-l from-black/80 via-black/40 to-black/10",
          )}
        />

        <div aria-hidden className="absolute inset-x-0 top-0 z-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent" />

        {/* Blurred glass panels behind the text; the active side shows. */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-y-0 left-0 z-10 w-full bg-black/25 backdrop-blur-xl transition-opacity duration-700 [mask-image:linear-gradient(to_right,#000_55%,transparent)] lg:w-[62%]",
            right ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "absolute inset-y-0 right-0 z-10 w-full bg-black/25 backdrop-blur-xl transition-opacity duration-700 [mask-image:linear-gradient(to_left,#000_55%,transparent)] lg:w-[62%]",
            right ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="relative z-20 flex h-full flex-col justify-between px-(--gutter) py-10 md:py-14">
          <header className="flex flex-col gap-3">
            <p className="text-label tracking-widest uppercase opacity-70">Our history</p>
            <h2 className="text-h2 font-semibold">
              Seven <Highlight from="right">milestones</Highlight>
            </h2>
          </header>

          <div
            key={active}
            className={cn("rise flex max-w-[40rem] flex-col gap-4", right && "ml-auto items-end text-right")}
          >
            <span className="text-display text-brand-red leading-none font-bold">{pad(active + 1)}</span>
            <p className="text-h4 opacity-80">{m.year}</p>
            <h3 className="text-h3 font-semibold">{m.title}</h3>
            <p className="text-body opacity-90">{m.body}</p>
          </div>

          <footer className="flex items-center gap-6">
            <span className="text-label font-medium tabular-nums">
              {pad(active + 1)} / {pad(STEPS)}
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25" aria-hidden>
              <div className="bg-brand-red h-full origin-left" style={{ transform: `scaleX(${progress})` }} />
            </div>
            <span className="text-label opacity-70">Scroll</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
