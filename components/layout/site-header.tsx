"use client";

import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/brand/logo";
import { PillButton } from "@/components/ui/pill-button";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Departments", href: "/departments" },
  { label: "Resources", href: "/resources" },
  { label: "Reach Us", href: "/contact" },
];

/** Floats over the hero: logo, glass nav pill, red Give pill. */
export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-30 px-(--gutter) pt-5 md:pt-10">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Home" className="size-14 shrink-0 overflow-hidden rounded-full bg-white md:size-16">
          <Logo priority className="size-full scale-[1.9] object-contain" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 rounded-full border border-white/30 bg-white/15 px-9 py-5 text-sm text-white backdrop-blur-md lg:flex"
        >
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:opacity-70">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <PillButton href="/give" tone="red">
            Give
          </PillButton>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md lg:hidden"
          >
            <Icon icon={open ? "lucide:x" : "lucide:menu"} className="size-5" />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="mt-3 grid gap-1 rounded-3xl border border-white/30 bg-black/60 p-4 text-white backdrop-blur-md lg:hidden"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
