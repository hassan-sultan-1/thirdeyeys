/**
 * industries.ts — INDUSTRY CONTENT (Restaurants / Shops / Clinics)
 * Used by the /industries page tabs and the home page industry cards.
 */

export type Industry = {
  slug: "restaurants" | "shops" | "clinics";
  name: string;
  /** Inline SVG icon name (see components/ui/Icon.tsx) */
  icon: "utensils" | "bag" | "stethoscope";
  headline: string;
  intro: string;
  problems: string[];
  solution: string;
  features: string[];
  /** Optional compliance / safety note shown in a highlighted box. */
  note?: string;
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants & Cafés",
    icon: "utensils",
    headline: "Take bookings and answer menu questions while the kitchen is busy",
    intro:
      "Most restaurant enquiries are the same five questions: are you open, do you deliver, is there parking, do you have vegetarian options, can I book for six. Your site and assistant should handle all of them.",
    problems: [
      "Phone rings during service and nobody can pick up",
      "Menu on social media is out of date or hard to read on a phone",
      "Table bookings arrive by DM, phone and walk-in with no single list",
      "No-shows on busy evenings",
      "Customers cannot find opening hours or delivery areas",
    ],
    solution:
      "A fast mobile menu page you can update yourself, plus an AI assistant that knows your menu, hours, delivery zone and booking rules. Bookings land in one place and reminders go out automatically.",
    features: [
      "Always-current digital menu with photos and dietary tags",
      "Table booking form or link to your booking system",
      "AI assistant: hours, delivery area, allergens, parking, group bookings",
      "Automatic booking confirmation and reminder messages",
      "Click-to-call and WhatsApp order buttons",
      "Google Business and 'near me' search setup",
      "QR code menu for tables",
    ],
  },
  {
    slug: "shops",
    name: "Shops & Retail",
    icon: "bag",
    headline: "Answer product and order questions without a full online store",
    intro:
      "You do not always need a complicated e-commerce platform. Often you need a clear product showcase, real stock information and a fast way for people to ask 'do you have this in my size?'",
    problems: [
      "Customers message on three different apps asking the same things",
      "No clear list of what you stock or what it costs",
      "Orders and enquiries get lost between WhatsApp and a notebook",
      "Returns and delivery questions eat staff time",
      "Hard to compete with bigger shops that appear first on Google",
    ],
    solution:
      "A product showcase that is easy to keep current, an assistant that answers product, stock, delivery and returns questions, and simple automation that turns every enquiry into a tracked order.",
    features: [
      "Product catalogue with categories, photos and prices",
      "AI assistant: availability, sizes, delivery times, returns policy",
      "Order enquiry form that feeds one shared list",
      "Automatic 'we received your order' and follow-up messages",
      "Optional payment link or full checkout when you are ready",
      "Local SEO so nearby shoppers find you",
      "Stock update workflow your staff can actually follow",
    ],
  },
  {
    slug: "clinics",
    name: "Clinics & Practices",
    icon: "stethoscope",
    headline: "Scheduling and clear information — handled safely",
    intro:
      "Clinics get buried in appointment calls. An assistant can take the scheduling load off reception while staying strictly inside safe boundaries: logistics and published information only.",
    problems: [
      "Reception phone is engaged all morning",
      "Patients ask for hours, location, fees and documents to bring",
      "No-shows waste appointment slots",
      "Patient details sitting in unprotected spreadsheets or chat apps",
      "Staff pasting confidential information into public AI tools",
    ],
    solution:
      "An appointment request and information assistant with a hard boundary around clinical topics, plus private, access-controlled handling of any patient information — encrypted, logged and minimal.",
    features: [
      "Appointment request and rescheduling flow",
      "AI assistant: hours, location, parking, fees, what to bring, doctor availability",
      "Automatic appointment reminders to cut no-shows",
      "Clear escalation to a human for anything clinical",
      "Encrypted storage, role-based staff access, minimal data retention",
      "Private AI option so information never goes to a public chatbot",
      "Staff guidance on safe AI use",
    ],
    note:
      "Important: clinic assistants we build handle scheduling and general published information only. They never give medical advice, diagnosis, triage or treatment guidance. Any health question is answered with a clear message to contact the clinic or, in an emergency, local emergency services.",
  },
];
