import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { EVENTS, PROJECT, type EventItem } from "@/lib/mock/home";
import { Container, Section } from "@/components/ui/section";
import { HScroller } from "@/components/ui/h-scroller";
import { Highlight } from "@/components/ui/highlight";
import { PillButton } from "@/components/ui/pill-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Reveal } from "@/components/ui/reveal";

const kes = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

/** Ticket card, inverted: details first, poster image below. */
function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group bg-background flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="text-label text-brand-red font-medium tracking-wide uppercase">{event.startsAt}</p>
        <h3 className="text-body line-clamp-2 font-semibold">{event.title}</h3>
        <p className="text-label text-muted-foreground line-clamp-1">{event.venue}</p>
        <p className="text-label mt-auto pt-4">
          {event.priceFromKes === null ? (
            <span className="text-brand-red font-semibold">Free entry</span>
          ) : (
            <>
              Starting <span className="text-brand-red text-body font-semibold">{kes(event.priceFromKes)}</span>
            </>
          )}
        </p>
      </div>
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={event.poster}
          alt={`${event.title} poster`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="bg-brand-blue-bright text-label absolute top-4 left-4 rounded-full px-3 py-1 font-medium text-white">
          {event.category}
        </span>
      </div>
    </Link>
  );
}

export function EventsProgress() {
  const pct = Math.round((PROJECT.raisedKes / PROJECT.goalKes) * 100);

  return (
    <Section id="events" aria-labelledby="events-title" className="bg-background">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-10">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 id="events-title" className="text-h2 font-semibold">
              Upcoming <Highlight from="left" tone="red">events</Highlight>
            </h2>
            <PillButton href="/events" tone="blue" className="shrink-0">
              View more
            </PillButton>
          </Reveal>

          <HScroller label="Upcoming events">
            <ul className="flex w-max items-end gap-0">
              {EVENTS.map((event, n) => (
                <li key={event.slug} className="flex items-end">
                  <span
                    aria-hidden
                    className={`num text-numeral -mr-[0.12em] pl-4 ${n % 2 === 0 ? "num-fill" : "num-stroke"}`}
                  >
                    {n + 1}
                  </span>
                  <div className="relative z-10 w-[302px] shrink-0 sm:mr-10">
                    <EventCard event={event} />
                  </div>
                </li>
              ))}
            </ul>
          </HScroller>

        </div>

        <Reveal>
          <div className="bg-brand-blue rounded-card grid gap-10 p-8 text-white md:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="flex flex-col gap-4">
              <p className="text-label tracking-widest uppercase opacity-70">Project progress</p>
              <h3 className="text-h3 font-semibold">{PROJECT.title}</h3>
              <p className="text-body opacity-80">{PROJECT.summary}</p>
              <div className="mt-2">
                <PillButton href="/projects" tone="gold">
                  Give to this project
                </PillButton>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <ProgressBar value={pct} label={`${kes(PROJECT.raisedKes)} raised of ${kes(PROJECT.goalKes)}`} />
              <ol className="grid gap-4 sm:grid-cols-2">
                {PROJECT.milestones.map((m) => (
                  <li key={m.title} className="flex items-center gap-3">
                    <span
                      className={
                        m.done
                          ? "bg-brand-gold-from grid size-8 shrink-0 place-items-center rounded-full text-black"
                          : "border-white/40 grid size-8 shrink-0 place-items-center rounded-full border"
                      }
                    >
                      {m.done ? <Icon icon="lucide:check" className="size-4" aria-hidden /> : null}
                    </span>
                    <span className={m.done ? "text-body" : "text-body opacity-70"}>{m.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
