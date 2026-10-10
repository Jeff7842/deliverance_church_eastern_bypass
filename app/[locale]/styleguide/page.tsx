"use client";

import { Container, Section } from "@/components/ui/section";
import { Highlight } from "@/components/ui/highlight";
import { PillButton } from "@/components/ui/pill-button";
import { Toast } from "@/components/ui/toast";
import { useTheme } from "next-themes";

// Visual reference for every token (plan section 2b). If a page looks
// different from this, the page is wrong, not the token.
const COLOURS = [
  ["brand-blue", "bg-brand-blue"],
  ["brand-blue-bright", "bg-brand-blue-bright"],
  ["brand-red", "bg-brand-red"],
  ["brand-gold", "bg-gradient-to-r from-brand-gold-from to-brand-gold-to"],
  ["hero-fade", "bg-hero-fade"],
  ["background", "bg-background border border-line"],
  ["foreground", "bg-foreground"],
  ["muted", "bg-muted"],
  ["success", "bg-success"],
  ["error", "bg-error"],
  ["warning", "bg-warning"],
  ["info", "bg-info"],
] as const;

const TYPE = [
  ["display 100/150", "text-display font-bold uppercase"],
  ["h2 72/84", "text-h2 font-semibold"],
  ["h3 40/48", "text-h3 font-semibold"],
  ["h4 28/36", "text-h4 font-semibold"],
  ["body-lg 24/40", "text-body-lg"],
  ["body 20/32", "text-body"],
  ["label 14/20", "text-label font-medium"],
] as const;

const SPACE = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32] as const;

export default function Styleguide() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <main>
      <Section>
        <Container className="flex flex-col gap-16">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-h2 font-semibold">
              Style<Highlight>guide</Highlight>
            </h1>
            <button
              type="button"
              className="rounded-full border border-line px-5 py-2 text-label"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              Theme: {resolvedTheme ?? "..."}
            </button>
          </header>

          <div>
            <h2 className="text-h4 mb-6 font-semibold">Colour</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {COLOURS.map(([name, cls]) => (
                <div key={name}>
                  <div className={`h-24 rounded-card ${cls}`} />
                  <p className="text-label mt-2">{name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-h4 mb-6 font-semibold">Type (Poppins headings, Inter body)</h2>
            <div className="flex flex-col gap-6">
              {TYPE.map(([label, cls]) => (
                <div key={label}>
                  <p className="text-label text-muted-foreground">{label}</p>
                  <p className={cls}>The church of choice</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-h4 mb-6 font-semibold">Spacing (Tailwind step x 4px)</h2>
            <div className="flex flex-col gap-2">
              {SPACE.map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <span className="text-label w-24">space-{s} = {s * 4}px</span>
                  <span className="h-4 rounded-full bg-brand-blue" style={{ width: s * 4 }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-h4 mb-6 font-semibold">Buttons</h2>
            <div className="flex flex-wrap items-center gap-4">
              <PillButton href="#" tone="red">Give</PillButton>
              <PillButton href="#" tone="blue" arrow="left">See more</PillButton>
              <PillButton href="#" tone="gold">Learn more</PillButton>
            </div>
          </div>

          <div>
            <h2 className="text-h4 mb-6 font-semibold">Toast</h2>
            <div className="flex flex-wrap gap-4">
              <Toast variant="success" title="Success" message="Everything seems great" />
              <Toast variant="error" title="Error" message="Something went wrong" />
              <Toast variant="warning" title="Warning" message="Check this first" />
              <Toast variant="info" title="Info" message="For your information" />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
