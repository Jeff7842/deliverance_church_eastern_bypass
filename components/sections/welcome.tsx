"use client";

import { Logo } from "@/components/brand/logo";
import { Highlight } from "@/components/ui/highlight";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { useInView } from "@/lib/use-in-view";

/**
 * Two halves: a white logo panel and the blue welcome panel. Behind the blue
 * sits a red layer as wide as the blue plus the bar width, so it spills past
 * the blue's left edge. Intro (about 2.3s in total, under 5s): the red layer
 * grows in from the right over white, then the blue follows over it.
 */
export function Welcome() {
  const [ref, inView] = useInView<HTMLElement>(0.25);

  return (
    <section
      ref={ref}
      data-in={inView}
      aria-labelledby="welcome-title"
      className="grid min-h-[640px] overflow-hidden bg-white lg:h-(--panel-h) lg:grid-cols-2"
    >
      <div className="relative grid place-items-center overflow-hidden bg-white text-black">
        <Logo priority className="h-auto w-[150%] max-w-none" />
      </div>

      <div className="relative z-10 text-white">
        {/* Red layer: blue's width plus the bar, spilling out on the left. */}
        <div
          aria-hidden
          className="grow-right bg-brand-red shadow-divider absolute inset-y-0 right-0 left-[calc(-1*var(--bar-w))]"
          style={{ ["--dur" as string]: "1.2s", ["--delay" as string]: "0s" }}
        />

        {/* Blue layer follows; the waves live inside it. */}
        <div
          aria-hidden
          className="grow-right bg-brand-blue absolute inset-0 overflow-hidden"
          style={{ ["--dur" as string]: "1.3s", ["--delay" as string]: "0.8s" }}
        >
          <svg
            className="absolute inset-0 size-full opacity-60"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMidYMid slice"
          >
            {Array.from({ length: 14 }, (_, n) => (
              <path
                key={n}
                className="wave-line"
                style={{ ["--wo" as string]: `-${(n * 0.32).toFixed(2)}s` }}
                d={`M-40 ${n * 30 + 20} Q 60 ${n * 30 - 8} 160 ${n * 30 + 20} T 360 ${n * 30 + 20} T 440 ${n * 30 + 20}`}
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="relative flex h-full flex-col justify-center gap-8 px-(--gutter) py-16">
          <Reveal delay={1500}>
            <h2 id="welcome-title" className="text-h2 font-semibold">
              Welcome to
              <br />
              the <Highlight tone="red" from="right">fellowship</Highlight>
            </h2>
          </Reveal>

          <Reveal delay={1650}>
            <p className="text-body-lg max-w-[36rem]">
              Wherever you are on your journey, there&rsquo;s a place for you at TC. Here you&rsquo;ll find
              a welcoming community ready to walk through life with you&mdash;a place where
              you&rsquo;ll instantly feel welcomed, relaxed, and comfortable among family and friends.
              Whether you&rsquo;re walking through the doors for the first time or have been with us for
              years, you&rsquo;ll find a warm, authentic environment where people truly care.
            </p>
          </Reveal>

          <Reveal delay={1800}>
            <PillButton href="/about" tone="gold">
              Learn more
            </PillButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
