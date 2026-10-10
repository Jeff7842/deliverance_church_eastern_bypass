"use client";

import { MINISTRIES } from "@/lib/mock/church";
import { PillButton } from "@/components/ui/pill-button";
import { WorksWheel } from "@/components/ui/works-wheel";

const ITEMS = MINISTRIES.map((m) => ({
  title: m.title,
  image: m.image,
  description: m.description,
  href: `/departments/${m.slug}`,
}));

/** Ministries wheel: title, short description and Learn more on the left. */
export function Ministries() {
  return (
    <section id="ministries" aria-label="Ministries" className="h-svh min-h-[640px]">
      <WorksWheel
        data-lenis-prevent
        items={ITEMS}
        label="Ministries"
        action="Learn more"
        cardScale={1.3}
        ringBoost={1.1}
        drumShift={120}
        renderLabel={(label) => (
          <h2 className="bg-brand-blue-bright rounded-input px-[0.4em] py-[0.1em] font-bold text-white">
            {label}
          </h2>
        )}
        renderTitle={(item) => (
          <div className="font-heading font-semibold">
            <div>{item.title}</div>
            <p className="text-body text-muted-foreground mt-4 max-w-[26rem] font-sans font-normal tracking-normal">
              {item.description}
            </p>
            <div className="pointer-events-auto mt-6 font-sans tracking-normal">
              <PillButton href={item.href ?? "/departments"} tone="blue">
                Learn more
              </PillButton>
            </div>
          </div>
        )}
      />
    </section>
  );
}
