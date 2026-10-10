"use client";

import * as React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { Logo } from "@/components/brand/logo";
import { useToast } from "@/components/providers/toast-provider";
import { CONTACT, SERVICES } from "@/lib/mock/church";

const COLUMNS = [
  {
    title: "About",
    links: [
      ["Our story", "/about"],
      ["Leadership", "/about#leaders"],
      ["Our history", "/#history"],
      ["Projects", "/projects"],
    ],
  },
  {
    title: "Ministries",
    links: [
      ["Departments", "/departments"],
      ["Home fellowships", "/fellowships"],
      ["Programmes", "/programmes"],
      ["Go Ye outreach", "/goye"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Sermons", "/resources/sermons"],
      ["Blog", "/resources/blog"],
      ["Bulletins", "/resources/bulletins"],
      ["Announcements", "/resources/announcements"],
    ],
  },
] as const;

const LOCALES = [
  { code: "en", label: "English" },
  { code: "sw", label: "Kiswahili" },
] as const;

/** Full-bleed brand footer with language and theme controls. */
export function SiteFooter() {
  const toast = useToast();
  const { resolvedTheme, setTheme } = useTheme();
  const sunday = SERVICES.filter((s) => s.dow === 0);

  // ponytail: stores the choice only; locale routing arrives with next-intl (plan M3).
  const onLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.documentElement.lang = e.target.value;
    document.cookie = `NEXT_LOCALE=${e.target.value}; path=/; max-age=31536000`;
  };

  const onNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    toast({ variant: "info", title: "Check your inbox", message: "Confirm your e-mail to finish subscribing." });
  };

  return (
    <footer className="bg-brand-blue relative text-white">
      <svg
        aria-hidden
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="text-brand-red absolute inset-x-0 top-0 h-6 w-full -translate-y-full"
      >
        <path fill="currentColor" d="M0 60V30C240 0 480 60 720 30S1200 0 1440 30V60Z" />
      </svg>

      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-(--gutter) py-20 lg:grid-cols-[1.3fr_repeat(3,1fr)_1.2fr]">
        <div className="flex flex-col gap-5">
          <div className="size-24 overflow-hidden rounded-full bg-white">
            <Logo className="size-full scale-[1.9] object-contain" />
          </div>
          <p className="text-h4 font-semibold">The church of choice</p>
          <p className="text-label opacity-80">{CONTACT.address}</p>
          <p className="text-label opacity-80">{CONTACT.phone}</p>
        </div>

        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title} className="flex flex-col gap-3">
            <p className="text-label tracking-widest uppercase opacity-60">{c.title}</p>
            {c.links.map(([label, href]) => (
              <Link key={href} href={href} className="text-body hover:underline">
                {label}
              </Link>
            ))}
          </nav>
        ))}

        <div className="flex flex-col gap-4">
          <p className="text-label tracking-widest uppercase opacity-60">Sunday services</p>
          {sunday.slice(0, 2).map((s) => (
            <p key={s.id} className="text-body">
              {s.name}: {s.start}
            </p>
          ))}
          <form onSubmit={onNewsletter} className="mt-2 flex gap-2">
            <label className="sr-only" htmlFor="footer-email">
              E-mail
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Your e-mail"
              className="text-label min-w-0 flex-1 rounded-full bg-white/15 px-4 py-2 placeholder:text-white/60"
            />
            <button type="submit" className="bg-brand-red text-label rounded-full px-4 py-2 font-medium">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 px-(--gutter) py-6">
          <p className="text-label opacity-80">
            &copy; Deliverance Church Eastern Bypass. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="text-label hover:underline">
              Privacy
            </Link>
            <Link href="/cookies" className="text-label hover:underline">
              Cookies
            </Link>

            <label className="text-label flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5">
              <Icon icon="lucide:globe" className="size-4" aria-hidden />
              <span className="sr-only">Language</span>
              <select
                defaultValue="en"
                onChange={onLocale}
                className="bg-transparent outline-none [&>option]:text-black"
              >
                {LOCALES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="grid size-10 place-items-center rounded-full border border-white/30 hover:bg-white/10"
            >
              <Icon icon="lucide:moon" className="size-5 dark:hidden" aria-hidden />
              <Icon icon="lucide:sun" className="hidden size-5 dark:block" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
