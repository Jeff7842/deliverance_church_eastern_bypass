"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { CONTACT, GIVING } from "@/lib/mock/church";
import { useToast } from "@/components/providers/toast-provider";
import { Container, Section } from "@/components/ui/section";
import { Highlight } from "@/components/ui/highlight";
import { Reveal } from "@/components/ui/reveal";

const FIELD =
  "bg-background border-line rounded-input text-body w-full border px-4 py-3 outline-none focus:border-brand-blue-bright focus:ring-2 focus:ring-brand-blue-bright/30";

const DETAILS = [
  { icon: "lucide:map-pin", label: "Visit us", value: CONTACT.address },
  { icon: "lucide:phone", label: "Call us", value: CONTACT.phone },
  { icon: "lucide:mail", label: "Email us", value: CONTACT.email },
  { icon: "lucide:message-circle", label: "WhatsApp", value: CONTACT.whatsapp },
  { icon: "lucide:clock", label: "Office hours", value: CONTACT.hours },
] as const;

/** Contact details left, form right, giving details underneath. */
export function Contact() {
  const toast = useToast();
  const [busy, setBusy] = React.useState(false);

  // ponytail: no backend yet (plan M4). Replace with the server action that
  // writes ContactMessage after Turnstile + consent checks.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      form.reset();
      toast({ variant: "success", title: "Message sent", message: "We will get back to you soon." });
    }, 600);
  };

  return (
    <Section id="contact" aria-labelledby="contact-title" className="bg-muted">
      <Container className="flex flex-col gap-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <h2 id="contact-title" className="text-h2 font-semibold">
              Reach <Highlight from="right">us</Highlight>
            </h2>
            <ul className="flex flex-col gap-4">
              {DETAILS.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="bg-brand-blue grid size-12 shrink-0 place-items-center rounded-full text-white">
                    <Icon icon={d.icon} className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="text-label text-muted-foreground block">{d.label}</span>
                    <span className="text-body font-medium">{d.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <form
              onSubmit={onSubmit}
              className="bg-background rounded-card shadow-soft grid gap-5 p-8 md:grid-cols-2 md:p-10"
            >
              <label className="grid gap-2">
                <span className="text-label font-medium">Full name</span>
                <input name="name" required autoComplete="name" className={FIELD} />
              </label>
              <label className="grid gap-2">
                <span className="text-label font-medium">Email</span>
                <input name="email" type="email" required autoComplete="email" className={FIELD} />
              </label>
              <label className="grid gap-2">
                <span className="text-label font-medium">Phone</span>
                <input name="phone" type="tel" autoComplete="tel" className={FIELD} />
              </label>
              <label className="grid gap-2">
                <span className="text-label font-medium">Subject</span>
                <select name="subject" className={FIELD} defaultValue="general">
                  <option value="general">General enquiry</option>
                  <option value="prayer">Prayer request</option>
                  <option value="visit">Planning a visit</option>
                  <option value="giving">Giving</option>
                </select>
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-label font-medium">Message</span>
                <textarea name="message" required rows={5} className={FIELD} />
              </label>
              <label className="text-label flex items-start gap-3 md:col-span-2">
                <input name="consent" type="checkbox" required className="mt-1 size-4" />
                <span>I agree to be contacted about my message and to the privacy policy.</span>
              </label>
              {/* Turnstile widget mounts here (plan M7). */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={busy}
                  className="bg-brand-blue-bright text-body rounded-full px-8 py-3 font-medium text-white transition hover:brightness-110 disabled:opacity-60"
                >
                  {busy ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          <Reveal>
            <h3 className="text-h3 font-semibold">
              Give <Highlight from="right" tone="red">generously</Highlight>
            </h3>
          </Reveal>
          <ul className="grid gap-6 md:grid-cols-3">
            {GIVING.map((g, n) => (
              <li key={g.title}>
                <Reveal delay={n * 120} className="h-full">
                  <div
                    className={`${g.tone === "mpesa" ? "bg-brand-mpesa" : "bg-brand-red"} rounded-card h-full p-8 text-white`}
                  >
                    <Icon icon={g.icon} className="size-9" aria-hidden />
                    <p className="text-h4 mt-4 font-semibold">{g.title}</p>
                    <ul className="text-body mt-3 opacity-90">
                      {g.lines.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
