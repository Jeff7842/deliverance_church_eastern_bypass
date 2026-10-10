import { Hero } from "@/components/sections/hero";
import { Welcome } from "@/components/sections/welcome";
import { EventsProgress } from "@/components/sections/events-progress";
import { History } from "@/components/sections/history";
import { Ministries } from "@/components/sections/ministries";
import { Leadership } from "@/components/sections/leadership";
import { OrderOfService } from "@/components/sections/order-of-service";
import { Sermons } from "@/components/sections/sermons";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Welcome />
        <EventsProgress />
        <History />
        <Ministries />
        <Leadership />
        <OrderOfService />
        <Sermons />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
