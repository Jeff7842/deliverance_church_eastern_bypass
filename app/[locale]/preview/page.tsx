"use client";

import { Toast } from "@/components/ui/toast";
import { WorksWheel } from "@/components/ui/works-wheel";
import CardDeckCarousel from "@/components/ui/card-deck-carousel";

// Foundation preview (M0). Replaced by the landing page once Figma is read.
const img = (n: string) => `/IMAGES/DCEB-${n}.jpg`;
const MINISTRIES = ["0828", "0837", "0840", "0850", "0853", "0856"].map((n, i) => ({
  title: ["Kids Ministry", "Youth", "Worship", "Prayer", "Women", "Men"][i],
  image: img(n),
  href: `#m${i}`,
  description: "A short description of this ministry.",
}));

export default function Page() {
  return (
    <main className="flex flex-col gap-10 p-6">
      <div className="flex flex-wrap gap-4">
        <Toast variant="success" title="Success" message="Everything seems great" />
        <Toast variant="error" title="Error" message="Something went wrong" />
        <Toast variant="warning" title="Warning" message="Check this first" />
        <Toast variant="info" title="Info" message="For your information" />
      </div>
      <div className="h-[80vh]">
        <WorksWheel
          items={MINISTRIES}
          label="Ministries"
          action="Learn more"
          renderTitle={(item) => (
            <div className="font-heading">
              <div>{item.title}</div>
              <p className="font-sans text-sm text-muted-foreground">{item.description}</p>
            </div>
          )}
        />
      </div>
      <CardDeckCarousel
        height="80vh"
        aspect="3 / 4"
        slides={["0863", "0864", "0865", "0868"].map((n) => ({ image: img(n), title: `Leader ${n}` }))}
      />
    </main>
  );
}
