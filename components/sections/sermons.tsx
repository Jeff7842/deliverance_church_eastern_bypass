"use client";

import * as React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { SERMONS, TOPICS, type Sermon } from "@/lib/mock/church";
import { Container, Section } from "@/components/ui/section";
import { Highlight } from "@/components/ui/highlight";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Tab = "recent" | "last" | "topics";
const TABS: { id: Tab; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "last", label: "Last week" },
  { id: "topics", label: "Categories" },
];

/** Left: paused video poster. Right: tabs and the sermon list. */
export function Sermons() {
  const [tab, setTab] = React.useState<Tab>("recent");
  const [topic, setTopic] = React.useState<string>(TOPICS[0]);
  const [current, setCurrent] = React.useState<Sermon>(SERMONS[0]);
  const [playing, setPlaying] = React.useState(false);

  const list = SERMONS.filter((s) =>
    tab === "topics" ? s.topic === topic : s.group === tab,
  );

  const select = (s: Sermon) => {
    setCurrent(s);
    setPlaying(false);
  };

  return (
    <Section id="sermons" aria-labelledby="sermons-title" className="bg-hero-fade text-white">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="rounded-card relative aspect-video w-full overflow-hidden bg-black">
            {playing && current.youtubeId ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1`}
                title={current.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src={current.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  type="button"
                  aria-label={`Play ${current.title}`}
                  onClick={() => current.youtubeId && setPlaying(true)}
                  className="group absolute inset-0 grid place-items-center"
                >
                  <span className="bg-brand-red grid size-20 place-items-center rounded-full text-white shadow-soft transition-transform group-hover:scale-110">
                    <Icon icon="lucide:play" className="size-8 translate-x-0.5" aria-hidden />
                  </span>
                </button>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-label opacity-70">{current.date}</p>
                  <p className="text-h4 font-semibold">{current.title}</p>
                </div>
              </>
            )}
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-3">
            <p className="text-label tracking-widest uppercase opacity-60">Listen and watch</p>
            <h2 id="sermons-title" className="text-h2 font-semibold">
              <Highlight from="left" tone="red">Sermons</Highlight>
            </h2>
          </Reveal>

          <div role="tablist" aria-label="Sermon groups" className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "text-label rounded-full px-5 py-2 font-medium transition-colors",
                  tab === t.id ? "bg-white text-black" : "border border-white/30 hover:bg-white/10",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "topics" ? (
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={cn(
                    "text-label rounded-full px-4 py-1.5 transition-colors",
                    topic === t ? "bg-brand-blue-bright" : "border border-white/30 hover:bg-white/10",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          ) : null}

          <ul className="flex flex-col gap-3" role="tabpanel">
            {list.length === 0 ? <li className="text-body opacity-70">No sermons here yet.</li> : null}
            {list.map((s) => (
              <li
                key={s.slug}
                className={cn(
                  "rounded-card flex flex-wrap items-center justify-between gap-4 border p-5 transition-colors",
                  s.slug === current.slug ? "border-brand-red bg-white/10" : "border-white/15 hover:bg-white/5",
                )}
              >
                <div className="min-w-0">
                  <p className="text-body truncate font-semibold">{s.title}</p>
                  <p className="text-label opacity-70">
                    {s.minister} &middot; {s.date}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => select(s)}
                    className="bg-brand-blue-bright text-label inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium"
                  >
                    <Icon icon="lucide:play-circle" className="size-4" aria-hidden />
                    Watch
                  </button>
                  <a
                    href={s.audioUrl ?? "#"}
                    aria-disabled={!s.audioUrl}
                    className="text-label inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 font-medium hover:bg-white/10"
                  >
                    <Icon icon="lucide:download" className="size-4" aria-hidden />
                    Audio
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
