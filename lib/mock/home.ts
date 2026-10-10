// Placeholder content for the home page until the database is wired (plan M3).
// Shapes mirror the design-set tables (Event, Project, ProjectMilestone,
// TimelineEntry) so swapping to real reads is a data-source change only.

const photo = (n: string) => `/IMAGES/DCEB-${n}.jpg`;

export type EventItem = {
  slug: string;
  category: string;
  startsAt: string; // display string until real dates arrive
  title: string;
  venue: string;
  priceFromKes: number | null; // null = free
  poster: string;
};

export const EVENTS: EventItem[] = [
  {
    slug: "youth-conference",
    category: "Youth",
    startsAt: "Sat 18 Oct 2026, 10:00 AM",
    title: "Youth Conference: Rise and Build",
    venue: "DCEB Main Sanctuary, Eastern Bypass",
    priceFromKes: null,
    poster: photo("0828"),
  },
  {
    slug: "marriage-retreat",
    category: "Marriage",
    startsAt: "Sat 25 Oct 2026, 08:00 AM",
    title: "Marriage Retreat: Two Become One",
    venue: "Eastern Bypass Gardens, Ruiru",
    priceFromKes: 1500,
    poster: photo("0837"),
  },
  {
    slug: "prayer-night",
    category: "Prayer",
    startsAt: "Fri 31 Oct 2026, 09:00 PM",
    title: "All-Night Prayer and Worship",
    venue: "DCEB Main Sanctuary, Eastern Bypass",
    priceFromKes: null,
    poster: photo("0840"),
  },
  {
    slug: "community-outreach",
    category: "Outreach",
    startsAt: "Sun 09 Nov 2026, 12:00 PM",
    title: "Community Outreach and Medical Camp",
    venue: "Kamulu Grounds, Eastern Bypass",
    priceFromKes: 300,
    poster: photo("0850"),
  },
  {
    slug: "worship-night",
    category: "Worship",
    startsAt: "Fri 14 Nov 2026, 06:30 PM",
    title: "Night of Worship and Testimonies",
    venue: "DCEB Main Sanctuary, Eastern Bypass",
    priceFromKes: null,
    poster: photo("0856"),
  },
  {
    slug: "kids-fun-day",
    category: "Children",
    startsAt: "Sat 22 Nov 2026, 10:00 AM",
    title: "Kids Fun Day and Talent Show",
    venue: "Children's Wing, Eastern Bypass",
    priceFromKes: 200,
    poster: photo("0863"),
  },
  {
    slug: "leaders-summit",
    category: "Leadership",
    startsAt: "Sat 29 Nov 2026, 08:30 AM",
    title: "Leaders Summit: Serve to Lead",
    venue: "Eastern Bypass Conference Hall",
    priceFromKes: 1000,
    poster: photo("0864"),
  },
  {
    slug: "thanksgiving-service",
    category: "Service",
    startsAt: "Sun 07 Dec 2026, 09:30 AM",
    title: "Year-End Thanksgiving Service",
    venue: "DCEB Main Sanctuary, Eastern Bypass",
    priceFromKes: null,
    poster: photo("0868"),
  },
  {
    slug: "carols-evening",
    category: "Worship",
    startsAt: "Sat 20 Dec 2026, 05:00 PM",
    title: "Carols Evening and Community Dinner",
    venue: "Eastern Bypass Gardens, Ruiru",
    priceFromKes: 500,
    poster: photo("0869"),
  },
  {
    slug: "watch-night",
    category: "Prayer",
    startsAt: "Wed 31 Dec 2026, 10:00 PM",
    title: "Watch Night Service",
    venue: "DCEB Main Sanctuary, Eastern Bypass",
    priceFromKes: null,
    poster: photo("0876"),
  },
];

export const PROJECT = {
  title: "Sanctuary Expansion Project",
  summary: "Building room for the next generation to worship, learn and belong.",
  goalKes: 25_000_000,
  raisedKes: 16_250_000,
  milestones: [
    { title: "Land secured", done: true },
    { title: "Foundation complete", done: true },
    { title: "Walls and roof", done: false },
    { title: "Interior and fit-out", done: false },
  ],
};

export type Milestone = {
  year: number;
  title: string;
  body: string;
  image: string;
};

// Seven placeholder milestones (the real list is supplied later).
export const MILESTONES: Milestone[] = [
  {
    year: 2005,
    title: "A small prayer circle begins",
    body: "A handful of families start meeting in a living room to pray for the neighbourhood.",
    image: photo("0853"),
  },
  {
    year: 2008,
    title: "The first Sunday service",
    body: "The gathering outgrows the house and opens its doors for a public Sunday service.",
    image: photo("0856"),
  },
  {
    year: 2011,
    title: "A home of our own",
    body: "The congregation moves into its first permanent building on the Eastern Bypass.",
    image: photo("0863"),
  },
  {
    year: 2014,
    title: "Children and youth ministries",
    body: "Dedicated teams are formed to disciple the next generation every week.",
    image: photo("0864"),
  },
  {
    year: 2017,
    title: "Reaching beyond our walls",
    body: "Outreach teams carry the message to schools, estates and unreached communities.",
    image: photo("0865"),
  },
  {
    year: 2020,
    title: "Worship goes online",
    body: "Services are streamed so families near and far can join, wherever they are.",
    image: photo("0868"),
  },
  {
    year: 2024,
    title: "A vision for a bigger sanctuary",
    body: "Plans begin for a new sanctuary that makes room for every family that calls DCEB home.",
    image: photo("0869"),
  },
];
