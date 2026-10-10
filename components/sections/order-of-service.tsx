"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { SERVICES, type Service } from "@/lib/mock/church";
import { Container, Section } from "@/components/ui/section";
import { Highlight } from "@/components/ui/highlight";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const time12 = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

/** Minutes until the next start of `s` from `now` (0 to 7 days). */
function minutesUntil(s: Service, now: Date) {
  const [h, m] = s.start.split(":").map(Number);
  const target = new Date(now);
  target.setHours(h, m, 0, 0);
  target.setDate(now.getDate() + ((s.dow - now.getDay() + 7) % 7));
  if (target <= now) target.setDate(target.getDate() + 7);
  return Math.round((target.getTime() - now.getTime()) / 60000);
}

function until(min: number) {
  const d = Math.floor(min / 1440);
  const h = Math.floor((min % 1440) / 60);
  if (d > 0) return `in ${d}d ${h}h`;
  if (h > 0) return `in ${h}h ${min % 60}m`;
  return `in ${min}m`;
}

/** Weekly timetable as rounded rows; the next service pulses. */
export function OrderOfService() {
  const [now, setNow] = React.useState<Date | null>(null);

  // Read the clock after mount so server and client markup agree.
  React.useEffect(() => {
    const first = window.setTimeout(() => setNow(new Date()), 0);
    const tick = window.setInterval(() => setNow(new Date()), 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(tick);
    };
  }, []);

  const next = React.useMemo(() => {
    if (!now) return null;
    return SERVICES.map((s) => ({ s, min: minutesUntil(s, now) })).sort((a, b) => a.min - b.min)[0];
  }, [now]);

  return (
    <Section id="services" aria-labelledby="services-title" className="bg-background">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-col gap-3">
          <p className="text-label text-muted-foreground tracking-widest uppercase">Join us</p>
          <h2 id="services-title" className="text-h2 font-semibold">
            Order of <Highlight from="right">service</Highlight>
          </h2>
        </Reveal>

        <div className="text-label text-muted-foreground hidden grid-cols-[0.9fr_1.4fr_1.5fr_1.2fr_1fr] gap-4 px-8 tracking-widest uppercase md:grid">
          <span>Day</span>
          <span>Service</span>
          <span>Time</span>
          <span>Location</span>
          <span>Language</span>
        </div>

        <ul className="flex flex-col gap-3">
          {SERVICES.map((s, n) => {
            const isNext = next?.s.id === s.id;
            return (
              <li key={s.id}>
                <Reveal delay={n * 80}>
                  <div
                    className={cn(
                      "rounded-card relative grid gap-2 border px-6 py-5 transition-colors md:grid-cols-[0.9fr_1.4fr_1.5fr_1.2fr_1fr] md:items-center md:gap-4 md:px-8",
                      isNext
                        ? "bg-brand-blue border-transparent text-white"
                        : "bg-muted border-line hover:border-brand-blue",
                    )}
                  >
                    <span className="text-body font-semibold">{s.day}</span>
                    <span className="text-body flex flex-wrap items-center gap-2">
                      {s.name}
                      {isNext && next ? (
                        <span className="text-brand-blue text-label inline-flex animate-pulse items-center gap-1 rounded-full bg-white px-3 py-0.5 font-medium">
                          Next {until(next.min)}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-body inline-flex items-center gap-2 whitespace-nowrap">
                      <Icon icon="lucide:clock" className="size-4 opacity-70" aria-hidden />
                      {time12(s.start)} - {time12(s.end)}
                    </span>
                    <span className="text-body inline-flex items-center gap-2">
                      <Icon icon="lucide:map-pin" className="size-4 opacity-70" aria-hidden />
                      {s.location}
                    </span>
                    <span className="text-label opacity-80">{s.language}</span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
