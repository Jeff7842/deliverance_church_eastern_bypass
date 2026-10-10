// Single source of truth for everything the landing page says.
// TODO(church): every value marked PLACEHOLDER must be replaced with the real detail before launch.

export const church = {
  name: "Deliverance Church Eastern Bypass",
  shortName: "DC Eastern Bypass",
  tagline: "A place of freedom, healing and new beginnings.",
  description:
    "Join Deliverance Church Eastern Bypass for worship, prayer and community. Everyone is welcome — come as you are and meet Jesus.",
  address: "Eastern Bypass, Nairobi, Kenya", // PLACEHOLDER: exact street / landmark
  phone: "+254 700 000 000", // PLACEHOLDER
  email: "info@example.org", // PLACEHOLDER
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Deliverance+Church+Eastern+Bypass", // PLACEHOLDER: replace with the pinned location
  copyrightYear: 2026,
  siteUrl: "https://example.org", // PLACEHOLDER: real domain, used for SEO
  social: {
    facebook: "#", // PLACEHOLDER
    youtube: "#", // PLACEHOLDER
    instagram: "#", // PLACEHOLDER
  },
  // PLACEHOLDER: how members give (M-Pesa paybill / till, bank). Never hard-code real account numbers
  // unless the church treasurer confirms them.
  giving: {
    mpesa: "Paybill 000000 · Account: Offering",
    note: "Contact the church office to confirm giving details.",
  },
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Ministries", href: "#ministries" },
  { label: "Give", href: "#give" },
  { label: "Visit", href: "#visit" },
];

// PLACEHOLDER: replace with the real service schedule.
export const services = [
  { day: "Sunday", time: "8:00 AM", name: "First Service", detail: "Worship, the Word and prayer." },
  { day: "Sunday", time: "10:30 AM", name: "Second Service", detail: "Includes Sunday School for children." },
  { day: "Wednesday", time: "6:00 PM", name: "Midweek Prayer", detail: "Stand together in prayer." },
  { day: "Friday", time: "6:00 PM", name: "Youth Fellowship", detail: "Teens and young adults." },
];

export const ministries = [
  { name: "Children", text: "A safe, joyful place where little ones learn about Jesus." },
  { name: "Youth", text: "Faith, friendship and purpose for teens and young adults." },
  { name: "Women", text: "Sisters encouraging one another in faith and life." },
  { name: "Men", text: "Brothers growing in character, leadership and service." },
  { name: "Worship & Music", text: "Choir and band leading the church into God's presence." },
  { name: "Prayer & Counselling", text: "People who will pray with you and walk with you." },
];

export const beliefs = [
  { title: "Welcome", text: "No matter your story, there is a seat for you here." },
  { title: "Word", text: "We teach the Bible with clarity and practical application." },
  { title: "Worship", text: "We honour God with our voices, our lives and our service." },
  { title: "Family", text: "We grow best together, in small groups and as one church." },
];
