/**
 * ─────────────────────────────────────────────────────────────
 *  THE ONLY FILE YOU NEED TO EDIT TO GO LIVE.
 *  Replace the TODO values with the real business details.
 * ─────────────────────────────────────────────────────────────
 */

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

export const SITE = {
  brand: "Sthira Living",
  brandFull: "Sthira Living Interiors",
  tagline: "Rooted in Harmony",
  /** The brand strapline. "Sthira" is Sanskrit for steady, firm, stable. */
  motto: "Steady. Firm. Stable.",
  meaning:
    "Sthira (\u0938\u094D\u0925\u093F\u0930) is Sanskrit for steady, firm, stable \u2014 the quality we build into every home we touch.",

  whatsapp: "917981592712",
  phone: "+91 79815 92712",
  domain: "sthiraliving.in",
  email: "hello@sthiraliving.in",
  city: "Hyderabad",
  address: "Jubilee Hills, Hyderabad, Telangana 500033",

  /**
   * TODO: Get a free key at https://web3forms.com — paste your email,
   * they mail you an access key instantly (no signup).
   * This key is a public email alias, safe to ship in client code.
   * Leave as "" and the email backup is skipped (WhatsApp still works).
   */
  web3formsKey: "",

  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    pinterest: "https://pinterest.com",
  },

  stats: [
    { value: 620, suffix: "+", label: "Homes delivered" },
    { value: 12, suffix: " yrs", label: "In business" },
    { value: 45, suffix: " days", label: "Average handover" },
    { value: 10, suffix: " yrs", label: "Warranty" },
  ],
} as const;

export type Service = {
  id: string;
  title: string;
  blurb: string;
  price: string;
  image: string;
  span: string; // bento grid span classes
};

export const SERVICES: Service[] = [
  {
    id: "full-home",
    title: "Full Home Interiors",
    blurb:
      "Everything from the entryway to the balcony, designed as one continuous idea and handed over move-in ready.",
    price: "from ₹6.5L",
    image: img("photo-1586023492125-27b2c045efd7", 1100),
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "kitchen",
    title: "Modular Kitchens",
    blurb: "Soft-close hardware, quartz counters, and storage that actually fits your vessels.",
    price: "from ₹2.5L",
    image: img("photo-1556912173-3bb406ef7e77", 800),
    span: "md:col-span-2",
  },
  {
    id: "wardrobes",
    title: "Wardrobes & Storage",
    blurb: "Floor-to-ceiling, dust-sealed, with interiors planned around what you own.",
    price: "from ₹1.2L",
    image: img("photo-1558997519-83ea9252edf8", 800),
    span: "",
  },
  {
    id: "living",
    title: "Living & Dining",
    blurb: "TV units, crockery walls, and seating that holds a full family gathering.",
    price: "from ₹1.8L",
    image: img("photo-1618221195710-dd6b41faaea6", 800),
    span: "",
  },
  {
    id: "bedroom",
    title: "Bedrooms",
    blurb: "Quiet palettes, generous storage, and lighting layered for actual rest.",
    price: "from ₹1.6L",
    image: img("photo-1615529182904-14819c35db37", 800),
    span: "md:col-span-2",
  },
  {
    id: "lighting",
    title: "False Ceiling & Lighting",
    blurb: "Cove, task, and accent layers wired to scenes — not one harsh tubelight.",
    price: "from ₹90K",
    image: img("photo-1600607687939-ce8a6c25118c", 800),
    span: "md:col-span-2",
  },
];

export type Project = {
  id: string;
  title: string;
  meta: string;
  location: string;
  scope: string;
  duration: string;
  image: string;
  description: string;
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "The Quiet Apartment",
    meta: "3BHK · Full Home",
    location: "Gachibowli, Hyderabad",
    scope: "Full home interiors, modular kitchen, 4 wardrobes",
    duration: "52 days",
    image: img("photo-1586023492125-27b2c045efd7", 1100),
    description:
      "A young couple wanted the noise of the city to stop at the door. Oak veneer, lime-washed walls, and a single clay accent running through every room.",
  },
  {
    id: "p2",
    title: "Warm Minimal Villa",
    meta: "4BHK · Villa",
    location: "Kokapet, Hyderabad",
    scope: "Full home, double-height living, home theatre",
    duration: "88 days",
    image: img("photo-1600210492486-724fe5c67fb0", 1100),
    description:
      "Twenty-two feet of living room height, handled with a travertine feature wall and a suspended light that reads as sculpture from both floors.",
  },
  {
    id: "p3",
    title: "The Chef's Kitchen",
    meta: "Modular Kitchen",
    location: "Banjara Hills, Hyderabad",
    scope: "Island kitchen, breakfast counter, utility",
    duration: "31 days",
    image: img("photo-1556912173-3bb406ef7e77", 1100),
    description:
      "Built for someone who cooks three meals a day. Deep pull-outs, a dedicated masala drawer, and counters at two heights.",
  },
  {
    id: "p4",
    title: "Compact 2BHK",
    meta: "2BHK · Full Home",
    location: "Kondapur, Hyderabad",
    scope: "Full home interiors on a 980 sq ft footprint",
    duration: "38 days",
    image: img("photo-1522708323590-d24dbb6b0267", 1100),
    description:
      "Every wall does two jobs. A foldaway dining table, a bed with 14 cubic feet of storage under it, and mirrors placed to double the light.",
  },
  {
    id: "p5",
    title: "The Reading Room",
    meta: "Study & Library",
    location: "Jubilee Hills, Hyderabad",
    scope: "Home office, floor-to-ceiling library, lounge",
    duration: "26 days",
    image: img("photo-1600585154340-be6161a56a0c", 1100),
    description:
      "Eleven hundred books, a ladder on a brass rail, and a window seat positioned for the four o'clock light.",
  },
  {
    id: "p6",
    title: "Terracotta House",
    meta: "3BHK · Full Home",
    location: "Financial District, Hyderabad",
    scope: "Full home, balcony garden, pooja room",
    duration: "61 days",
    image: img("photo-1616486338812-3dadae4b4ace", 1100),
    description:
      "Handmade Athangudi tiles in the pooja room set the palette for the whole house — burnt orange, ochre, and unfinished teak.",
  },
];

export const PROCESS = [
  {
    n: "01",
    title: "Consultation",
    body: "A 45-minute conversation about how you actually live. Free, at your home or on a call.",
  },
  {
    n: "02",
    title: "Design & 3D",
    body: "You see photorealistic 3D of every room before a single sheet is cut. Revise as often as you like.",
  },
  {
    n: "03",
    title: "Transparent Quote",
    body: "Itemised to the last handle. Locked price — no revisions upward halfway through.",
  },
  {
    n: "04",
    title: "Factory Production",
    body: "Machine-cut in our own facility, so tolerances are millimetres and site dust stays low.",
  },
  {
    n: "05",
    title: "Installation & Handover",
    body: "Site-managed daily, snag-listed by us before you see it, handed over move-in ready.",
  },
];

export const WHY_US = [
  { title: "10-year warranty", body: "On all modular work — hardware, panels and finish." },
  { title: "45-day handover", body: "Delayed past the promised date? We pay you rent." },
  { title: "Locked pricing", body: "The quote you sign is the invoice you pay. No mid-project surprises." },
  { title: "In-house factory", body: "No subcontracted carpentry, no quality roulette." },
  { title: "One point of contact", body: "A single project manager from first sketch to handover." },
  { title: "Post-handover service", body: "A hinge loose in year three is still our problem." },
];

export const TESTIMONIALS = [
  {
    quote:
      "They finished nine days early, which I genuinely did not believe was possible. The kitchen alone was worth the whole project.",
    name: "Sruthi & Karthik",
    meta: "3BHK, Gachibowli",
  },
  {
    quote:
      "I was quoted by four firms. Sthira was the only one who asked what we owned before designing the wardrobes.",
    name: "Meghana R.",
    meta: "2BHK, Kondapur",
  },
  {
    quote:
      "The price on the quote was the price on the final bill. After two bad renovation experiences, that mattered more than anything.",
    name: "Ravi Teja",
    meta: "Villa, Kokapet",
  },
  {
    quote:
      "Our project manager answered on a Sunday. Twice. The follow-through after handover has been just as good.",
    name: "Anita & Prashant",
    meta: "4BHK, Banjara Hills",
  },
  {
    quote:
      "They talked us out of two expensive ideas that wouldn't have suited how we live. That is rare.",
    name: "Divya N.",
    meta: "3BHK, Financial District",
  },
];

/** Before / after pair for the drag-slider section. */
/**
 * Before / after MUST be the same room shot from the same position — a
 * bathroom next to a living room reads as two unrelated photos.
 * TODO: replace with the client's own matched pair.
 */
export const BEFORE_AFTER = {
  before: img("photo-1595526114035-0d45ed16cfbf", 1400),
  after: img("photo-1615874959474-d609969a20ed", 1400),
  caption: "Master bedroom · 3BHK, Gachibowli · handed over in 52 days",
};

/** Clickable price markers inside the 360° room. lon/lat are degrees on the
 *  panorama sphere — nudge these if you swap in a different room. */
export const HOTSPOTS = [
  { id: "h1", label: "Wardrobes & storage", price: "from ₹1.2L", lon: -58, lat: -2 },
  { id: "h2", label: "TV unit & console", price: "from ₹1.8L", lon: 38, lat: -6 },
  { id: "h3", label: "Lighting design", price: "from ₹90K", lon: 148, lat: 18 },
];

export const HERO_IMAGE = img("photo-1586023492125-27b2c045efd7", 1800);


/* ────────────────────────────────────────────────────────────
   Packages, estimator, materials and FAQ
   ──────────────────────────────────────────────────────────── */

export const PACKAGES = [
  {
    id: "essentials",
    name: "Essentials",
    price: "₹4.5L",
    unit: "for a 2BHK",
    blurb: "The fixed pieces done properly — everything you cannot add later without tearing something out.",
    includes: [
      "Modular kitchen with soft-close hardware",
      "Wardrobes in every bedroom",
      "TV unit and living storage",
      "Basic lighting and electrical",
      "Painting throughout",
    ],
    featured: false,
  },
  {
    id: "complete",
    name: "Complete",
    price: "₹7.5L",
    unit: "for a 2BHK",
    blurb: "Everything in Essentials, plus the layers that make a house read as finished.",
    includes: [
      "Everything in Essentials",
      "False ceiling with layered lighting",
      "Crockery unit and foyer storage",
      "Study or work nook",
      "Wallpaper and accent finishes",
      "Bathroom vanities",
    ],
    featured: true,
  },
  {
    id: "signature",
    name: "Signature",
    price: "₹12L+",
    unit: "for a 2BHK",
    blurb: "Bespoke joinery, imported finishes and a designer who stays on the project start to finish.",
    includes: [
      "Everything in Complete",
      "Bespoke, non-catalogue joinery",
      "Imported laminates and veneers",
      "Italian quartz or granite counters",
      "Home automation ready wiring",
      "Styling, soft furnishing and decor",
    ],
    featured: false,
  },
];

/** Inputs for the cost estimator. All figures are rupees. */
export const ESTIMATOR = {
  properties: [
    { id: "1bhk", label: "1 BHK", base: 320000 },
    { id: "2bhk", label: "2 BHK", base: 450000 },
    { id: "3bhk", label: "3 BHK", base: 650000 },
    { id: "4bhk", label: "4 BHK", base: 850000 },
    { id: "villa", label: "Villa", base: 1250000 },
  ],
  tiers: [
    { id: "essentials", label: "Essentials", multiplier: 1 },
    { id: "complete", label: "Complete", multiplier: 1.55 },
    { id: "signature", label: "Signature", multiplier: 2.45 },
  ],
  addons: [
    { id: "ceiling", label: "False ceiling & lighting", price: 95000 },
    { id: "wallpaper", label: "Wallpaper & accent walls", price: 45000 },
    { id: "bath", label: "Bathroom vanities", price: 70000 },
    { id: "study", label: "Study / work nook", price: 85000 },
    { id: "pooja", label: "Pooja unit", price: 60000 },
    { id: "decor", label: "Styling & soft furnishing", price: 120000 },
  ],
  /** The quote lands within ± this fraction of the estimate. */
  spread: 0.12,
};

export const MATERIALS = [
  { name: "Hettich", note: "Hinges & channels" },
  { name: "Blum", note: "Lift-up systems" },
  { name: "Century Ply", note: "BWP plywood" },
  { name: "Merino", note: "Laminates" },
  { name: "Asian Paints", note: "Finishes" },
  { name: "Kohler", note: "Sanitaryware" },
  { name: "Havells", note: "Electricals" },
  { name: "Saint-Gobain", note: "Glass & mirrors" },
];

export const FAQS = [
  {
    q: "What does a full home interior actually cost?",
    a: "For a 2BHK in Hyderabad, most of our projects land between ₹4.5L and ₹9L depending on the finishes and how much joinery you need. A 3BHK typically runs ₹6.5L to ₹14L. The estimator above will get you within about 12% in under a minute, and the site visit gives you an exact, itemised figure.",
  },
  {
    q: "How long does it take?",
    a: "Forty-five days is our average from design sign-off to handover for a full 2BHK or 3BHK. Villas run 70 to 90 days. If we miss the date we committed to in writing, we pay your rent for the overrun.",
  },
  {
    q: "Do I have to pay for the design?",
    a: "No. The consultation, the 3D designs and as many revisions as you need are free, and you owe us nothing until you decide to go ahead. You keep the designs either way.",
  },
  {
    q: "Can the price change halfway through?",
    a: "Not from our side. The quote you sign is itemised to the last handle and locked. It only moves if you ask for something that was not in the original scope — and we will tell you what it costs before we do it, not after.",
  },
  {
    q: "What is covered by the warranty?",
    a: "Ten years on all modular work — the panels, the hardware and the finish. That covers manufacturing defects, delamination, and hinges or channels that fail. Normal wear and water damage from plumbing leaks are not included.",
  },
  {
    q: "Do you work outside Hyderabad?",
    a: "We deliver across Hyderabad and Secunderabad, including Gachibowli, Kokapet, Financial District, Kondapur, Miyapur and Banjara Hills. For projects further out, message us and we will tell you honestly whether we can service it properly.",
  },
  {
    q: "What if I only want the kitchen done?",
    a: "That is completely fine — roughly a third of our projects are a single room or a single kitchen. There is no minimum project value.",
  },
];
