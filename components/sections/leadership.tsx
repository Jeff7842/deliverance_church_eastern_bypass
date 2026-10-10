"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { COUPLES, type Person } from "@/lib/mock/church";
import CardDeckCarousel, { type Slide } from "@/components/ui/card-deck-carousel";
import { Container, Section } from "@/components/ui/section";
import { Highlight } from "@/components/ui/highlight";

function PersonCard({ person }: { person: Person }) {
  return (
    <figure className="rounded-image relative overflow-hidden">
      <Image src={person.image} alt={person.name} fill sizes="(min-width: 768px) 380px, 45vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-h4 font-semibold">{person.name}</p>
        <p className="text-body opacity-80">{person.role}</p>
      </figcaption>
    </figure>
  );
}

const SLIDES: Slide[] = [
  ...COUPLES.map((c) => ({
    title: c.title,
    caption: `${c.husband.name} & ${c.wife.name}`,
    content: (
      <div className="bg-background grid h-full grid-cols-2 gap-3 p-3">
        <PersonCard person={c.husband} />
        <PersonCard person={c.wife} />
      </div>
    ),
  })),
  {
    title: "See more",
    caption: "Meet the rest of our leaders",
    content: (
      <div className="bg-brand-blue grid h-full place-items-center text-white">
        <Link
          href="/about#leaders"
          // The deck captures the pointer on its card; keep the link clickable.
          onPointerDown={(e) => e.stopPropagation()}
          className="group flex flex-col items-center gap-5"
        >
          <span className="grid size-24 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
            <Icon icon="lucide:arrow-right" className="size-10" aria-hidden />
          </span>
          <span className="text-h4 font-semibold">See more</span>
        </Link>
      </div>
    ),
  },
];

/** Leaders as couples on a throwable deck, ending on a See more card. */
export function Leadership() {
  return (
    <Section id="leaders" aria-labelledby="leaders-title" className="bg-muted">
      <Container className="flex flex-col items-center gap-10">
        <h2 id="leaders-title" className="text-h2 text-center font-semibold">
          Our <Highlight from="left" tone="red">leaders</Highlight>
        </h2>
        <div className="w-full">
          <CardDeckCarousel
            slides={SLIDES}
            height="clamp(680px, 92svh, 960px)"
            cardWidth="min(94vw, 1000px)"
            aspect="16 / 10"
            scatter={5}
            autoplay={6000}
            background="transparent"
            ariaLabel="Church leaders"
          />
        </div>
      </Container>
    </Section>
  );
}
