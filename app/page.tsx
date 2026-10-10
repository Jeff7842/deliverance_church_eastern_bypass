import { beliefs, church, ministries, nav, services } from "./content";

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";
const eyebrow = "text-sm font-semibold uppercase tracking-widest text-gold";
const h2 = "mt-2 text-3xl font-bold tracking-tight sm:text-4xl";
const button =
  "inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: church.name,
  description: church.description,
  url: church.siteUrl,
  telephone: church.phone,
  email: church.email,
  address: { "@type": "PostalAddress", streetAddress: church.address },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
        <div className={`${container} flex h-16 items-center justify-between`}>
          <a href="#top" className="text-lg font-bold tracking-tight">
            {church.shortName}
          </a>
          <nav aria-label="Main" className="hidden gap-8 text-sm font-medium md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-white/80 hover:text-gold">
                {item.label}
              </a>
            ))}
          </nav>
          {/* Mobile menu: <details> works with zero JavaScript. */}
          <details className="group relative md:hidden">
            <summary className="cursor-pointer list-none rounded px-3 py-2 text-sm font-semibold ring-1 ring-white/30">
              Menu
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 mt-2 flex w-48 flex-col rounded-xl bg-white p-2 text-navy shadow-xl"
            >
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="rounded px-3 py-2.5 font-medium hover:bg-navy/5">
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section
          id="top"
          className="relative isolate overflow-hidden bg-navy text-white"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(212,163,63,0.28),transparent),radial-gradient(50%_50%_at_10%_90%,rgba(80,110,200,0.25),transparent)]"
          />
          <div className={`${container} py-24 sm:py-32 lg:py-40`}>
            <p className={eyebrow}>You are welcome here</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              {church.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              {church.tagline} Come as you are, and leave encouraged.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#services" className={`${button} bg-gold text-navy hover:bg-gold-light`}>
                Plan your visit
              </a>
              <a href="#about" className={`${button} border border-white/40 hover:bg-white/10`}>
                Learn more
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-16 py-20 sm:py-28">
          <div className={container}>
            <p className={eyebrow}>About us</p>
            <h2 className={h2}>A church family for every season of life</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              {church.description}
            </p>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {beliefs.map((b) => (
                <li key={b.title} className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="text-xl font-semibold">{b.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-16 bg-navy py-20 text-white sm:py-28">
          <div className={container}>
            <p className={eyebrow}>Service times</p>
            <h2 className={h2}>Join us this week</h2>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {services.map((s) => (
                <li
                  key={`${s.day}-${s.time}`}
                  className="flex gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
                >
                  <div className="w-28 shrink-0">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gold">{s.day}</p>
                    <p className="mt-1 text-2xl font-bold">{s.time}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{s.name}</h3>
                    <p className="mt-1 leading-7 text-white/70">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* MINISTRIES */}
        <section id="ministries" className="scroll-mt-16 py-20 sm:py-28">
          <div className={container}>
            <p className={eyebrow}>Ministries</p>
            <h2 className={h2}>Find your place to belong and serve</h2>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ministries.map((m) => (
                <li key={m.name} className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="mt-2 leading-7 text-muted">{m.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* GIVE */}
        <section id="give" className="scroll-mt-16 bg-gold-soft py-20 sm:py-24">
          <div className={`${container} text-center`}>
            <p className={eyebrow}>Give</p>
            <h2 className={h2}>Partner with what God is doing</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
              Your giving supports worship, outreach and the care of families in our community.
            </p>
            <p className="mt-8 inline-block rounded-2xl bg-white px-6 py-4 text-lg font-semibold shadow-sm">
              M-Pesa: {church.giving.mpesa}
            </p>
            <p className="mt-3 text-sm text-muted">{church.giving.note}</p>
          </div>
        </section>

        {/* VISIT */}
        <section id="visit" className="scroll-mt-16 py-20 sm:py-28">
          <div className={`${container} grid gap-10 lg:grid-cols-2`}>
            <div>
              <p className={eyebrow}>Visit us</p>
              <h2 className={h2}>We saved you a seat</h2>
              <address className="mt-6 space-y-3 text-lg not-italic leading-8">
                <p>{church.address}</p>
                <p>
                  <a className="underline decoration-gold underline-offset-4" href={`tel:${church.phone.replace(/\s/g, "")}`}>
                    {church.phone}
                  </a>
                </p>
                <p>
                  <a className="underline decoration-gold underline-offset-4" href={`mailto:${church.email}`}>
                    {church.email}
                  </a>
                </p>
              </address>
              <a
                href={church.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${button} mt-8 bg-navy text-white hover:bg-navy-light`}
              >
                Get directions
              </a>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-8">
              <h3 className="text-xl font-semibold">What to expect</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted">
                <li>Services last about 2 hours with live worship and a practical message.</li>
                <li>Dress however you are comfortable.</li>
                <li>Ushers will help you find a seat and a children’s class.</li>
                <li>Parking and security are available on site.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy py-10 text-white/70">
        <div className={`${container} flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between`}>
          <p>
            © {church.copyrightYear} {church.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li><a className="hover:text-gold" href={church.social.facebook}>Facebook</a></li>
            <li><a className="hover:text-gold" href={church.social.youtube}>YouTube</a></li>
            <li><a className="hover:text-gold" href={church.social.instagram}>Instagram</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
