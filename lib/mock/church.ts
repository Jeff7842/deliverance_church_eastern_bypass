// Placeholder church content for the remaining home sections (plan M3 swaps
// these for database reads). Names, numbers and addresses are NOT real.

const photo = (n: string) => `/IMAGES/DCEB-${n}.jpg`;

export const MINISTRIES = [
  { slug: "kids", title: "Kids Ministry", image: photo("0876"), description: "A safe, joyful place where children meet Jesus every Sunday." },
  { slug: "youth", title: "Youth Ministry", image: photo("0881"), description: "Teens and young adults growing in faith, friendship and purpose." },
  { slug: "worship", title: "Worship Team", image: photo("0883"), description: "Musicians and singers who lead the church into God's presence." },
  { slug: "prayer", title: "Prayer Ministry", image: photo("0885"), description: "Intercessors standing in the gap for families and the nation." },
  { slug: "women", title: "Women's Fellowship", image: photo("0887"), description: "Women encouraging, equipping and praying for one another." },
  { slug: "men", title: "Men's Fellowship", image: photo("0890"), description: "Men building godly homes, character and community leadership." },
  { slug: "missions", title: "Missions and Outreach", image: photo("0902"), description: "Taking the good news to schools, estates and unreached places." },
  { slug: "media", title: "Media Team", image: photo("0905"), description: "Sound, visuals and streaming that carry the service further." },
] as const;

export type Person = { name: string; role: string; image: string };
export type Couple = { husband: Person; wife: Person; title: string };

export const COUPLES: Couple[] = [
  {
    title: "Senior Pastors",
    husband: { name: "Pastor John Doe", role: "Senior Pastor", image: photo("0828") },
    wife: { name: "Pastor Jane Doe", role: "Co-Pastor", image: photo("0837") },
  },
  {
    title: "Associate Pastors",
    husband: { name: "Pastor Peter Mwangi", role: "Associate Pastor", image: photo("0840") },
    wife: { name: "Mrs. Grace Mwangi", role: "Women's Ministry", image: photo("0850") },
  },
  {
    title: "Elders",
    husband: { name: "Elder Samuel Otieno", role: "Chair of Elders", image: photo("0853") },
    wife: { name: "Mrs. Ruth Otieno", role: "Hospitality", image: photo("0856") },
  },
  {
    title: "Ministry Heads",
    husband: { name: "Mr. David Kamau", role: "Youth Ministry", image: photo("0863") },
    wife: { name: "Mrs. Esther Kamau", role: "Children's Ministry", image: photo("0864") },
  },
];

export type Service = {
  id: string;
  day: string;
  dow: number; // 0 = Sunday
  start: string; // 24h HH:MM
  end: string;
  name: string;
  location: string;
  language: string;
};

export const SERVICES: Service[] = [
  { id: "sun-1", day: "Sunday", dow: 0, start: "07:00", end: "09:00", name: "First Service", location: "Main Sanctuary", language: "English" },
  { id: "sun-2", day: "Sunday", dow: 0, start: "09:30", end: "11:30", name: "Second Service", location: "Main Sanctuary", language: "English / Kiswahili" },
  { id: "sun-kids", day: "Sunday", dow: 0, start: "09:30", end: "11:30", name: "Children's Church", location: "Children's Wing", language: "English" },
  { id: "wed", day: "Wednesday", dow: 3, start: "17:30", end: "19:00", name: "Midweek Service", location: "Main Sanctuary", language: "English" },
  { id: "fri", day: "Friday", dow: 5, start: "18:00", end: "20:00", name: "Prayer Night", location: "Prayer Room", language: "English / Kiswahili" },
  { id: "sat-youth", day: "Saturday", dow: 6, start: "16:00", end: "18:00", name: "Youth Service", location: "Youth Hall", language: "English" },
];

export type Sermon = {
  slug: string;
  title: string;
  minister: string;
  date: string;
  group: "recent" | "last";
  topic: string;
  poster: string;
  youtubeId: string | null;
  audioUrl: string | null;
};

export const SERMONS: Sermon[] = [
  { slug: "walking-in-faith", title: "Walking in Faith", minister: "Pastor John Doe", date: "Sun 05 Oct 2026", group: "recent", topic: "Faith", poster: photo("0868"), youtubeId: null, audioUrl: null },
  { slug: "the-power-of-prayer", title: "The Power of Prayer", minister: "Pastor Peter Mwangi", date: "Wed 08 Oct 2026", group: "recent", topic: "Prayer", poster: photo("0869"), youtubeId: null, audioUrl: null },
  { slug: "building-strong-families", title: "Building Strong Families", minister: "Pastor Jane Doe", date: "Sun 28 Sep 2026", group: "last", topic: "Family", poster: photo("0876"), youtubeId: null, audioUrl: null },
  { slug: "generous-living", title: "Generous Living", minister: "Pastor John Doe", date: "Sun 28 Sep 2026", group: "last", topic: "Giving", poster: photo("0881"), youtubeId: null, audioUrl: null },
  { slug: "purpose-and-calling", title: "Purpose and Calling", minister: "Elder Samuel Otieno", date: "Wed 24 Sep 2026", group: "last", topic: "Purpose", poster: photo("0883"), youtubeId: null, audioUrl: null },
];

export const TOPICS = ["Faith", "Prayer", "Family", "Giving", "Purpose"] as const;

export const CONTACT = {
  address: "Deliverance Church Eastern Bypass, Eastern Bypass Road, Nairobi",
  phone: "+254 700 000 000",
  email: "info@dceb.example",
  whatsapp: "+254 700 000 000",
  hours: "Mon to Fri, 9:00 AM to 5:00 PM",
};

export const GIVING = [
  { icon: "lucide:smartphone", tone: "mpesa", title: "M-Pesa Paybill", lines: ["Business no: 000000", "Account: DCEB"] },
  { icon: "lucide:landmark", tone: "red", title: "Bank transfer", lines: ["Bank: Example Bank", "A/C name: DCEB", "A/C no: 0000000000"] },
  { icon: "lucide:globe", tone: "red", title: "International", lines: ["SWIFT: EXAMPLEXX", "Reference: DCEB Giving"] },
] as const;
