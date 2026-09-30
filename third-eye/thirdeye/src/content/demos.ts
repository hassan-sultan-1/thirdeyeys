/**
 * demos.ts — LIVE DEMO PLAYGROUND SCRIPTS
 * ---------------------------------------------------------------
 * These mini demo bots are deliberately RULE-BASED (keyword matching),
 * not AI calls: they are instant, free to run, work offline and always
 * say the same thing during a sales demo.
 *
 * To add an answer: add an entry to `intents` with keywords + reply.
 * The demo for each niche uses fictional sample businesses.
 */

export type DemoIntent = {
  id: string;
  keywords: string[];
  reply: string;
  /** Optional follow-up chips shown after the reply. */
  followUps?: string[];
};

export type Demo = {
  slug: "restaurants" | "shops" | "clinics";
  label: string;
  icon: "utensils" | "bag" | "stethoscope";
  business: string;
  blurb: string;
  greeting: string;
  starters: string[];
  intents: DemoIntent[];
  fallback: string;
  /** Shown as a small caption under the demo window. */
  caption: string;
};

export const demos: Demo[] = [
  {
    slug: "restaurants",
    label: "Restaurant",
    icon: "utensils",
    business: "Sample Café (fictional demo business)",
    blurb:
      "Menu questions, opening hours, delivery area and table bookings — answered instantly while your kitchen stays busy.",
    greeting:
      "Hi! I'm the assistant for Sample Café. I can help with our menu, opening hours, delivery and table bookings. What would you like to know?",
    starters: [
      "What are your opening hours?",
      "Do you have vegetarian options?",
      "Can I book a table for 6?",
      "Do you deliver to my area?",
    ],
    intents: [
      {
        id: "hours",
        keywords: ["hour", "open", "close", "timing", "time"],
        reply:
          "We're open Monday to Thursday 11am–10pm, Friday and Saturday 11am–11:30pm, and Sunday 12pm–9pm. The kitchen stops taking orders 30 minutes before closing.",
        followUps: ["Can I book a table for 6?", "Do you deliver?"],
      },
      {
        id: "menu",
        keywords: ["menu", "food", "dish", "serve", "eat", "special"],
        reply:
          "Our menu has wood-fired pizzas, grilled platters, pastas and a daily chef's special. Starters are from $6, mains from $11. Would you like the vegetarian list or today's special?",
        followUps: ["Do you have vegetarian options?", "Any gluten-free dishes?"],
      },
      {
        id: "veg",
        keywords: ["veg", "vegetarian", "vegan", "halal", "meat"],
        reply:
          "Yes — 9 vegetarian dishes and 4 fully vegan ones, all marked on the menu. All our meat is halal certified.",
        followUps: ["Any gluten-free dishes?", "Can I book a table for 6?"],
      },
      {
        id: "allergy",
        keywords: ["gluten", "allerg", "nut", "dairy", "lactose"],
        reply:
          "We label gluten-free, nut and dairy content on every dish. For a serious allergy I'll flag your booking for the kitchen and ask a staff member to confirm with you — shall I do that?",
        followUps: ["Yes, book a table"],
      },
      {
        id: "booking",
        keywords: ["book", "table", "reserve", "reservation", "seat"],
        reply:
          "I can take that. Tables for up to 8 book instantly; 9 or more get a callback from the manager. Just tell me the date, time and number of guests — for example 'Friday 8pm for 6'.",
        followUps: ["Friday 8pm for 6", "Do you have parking?"],
      },
      {
        id: "confirm",
        keywords: ["friday", "saturday", "tonight", "tomorrow", "pm for", "people", "guests"],
        reply:
          "Done — I've put that request through and sent it to the team. You'll get a confirmation message within a few minutes, plus a reminder the day before. Anything else?",
        followUps: ["Do you have parking?", "Do you deliver?"],
      },
      {
        id: "delivery",
        keywords: ["deliver", "takeaway", "take away", "pickup", "collect"],
        reply:
          "We deliver within 5 km — usually 30–45 minutes. Free over $25, otherwise a $3 fee. Pickup is always available and ready in about 20 minutes.",
        followUps: ["What's on the menu?", "What are your opening hours?"],
      },
      {
        id: "parking",
        keywords: ["park", "location", "address", "where", "direction"],
        reply:
          "We're at 12 Sample Street, with free parking behind the building and street parking out front after 6pm.",
        followUps: ["What are your opening hours?"],
      },
      {
        id: "human",
        keywords: ["human", "manager", "call", "speak", "complain", "staff"],
        reply:
          "Of course — I'll pass this to a person. Leave your name and number and the manager will call you back within the hour during opening times.",
      },
    ],
    fallback:
      "I'm not sure about that one, so I won't guess. I can help with the menu, hours, delivery or bookings — or I can pass your question to a staff member. Which would you prefer?",
    caption:
      "Demo only. A real assistant is trained on your actual menu, hours and booking rules.",
  },
  {
    slug: "shops",
    label: "Shop",
    icon: "bag",
    business: "Sample Store (fictional demo business)",
    blurb:
      "Stock, sizes, delivery times and returns — answered in seconds, with every enquiry turned into a tracked order.",
    greeting:
      "Hello! I'm the assistant for Sample Store. I can check products, sizes, delivery and returns, or take an order enquiry. How can I help?",
    starters: [
      "Do you have this in medium?",
      "How long is delivery?",
      "What's your returns policy?",
      "Where is my order?",
    ],
    intents: [
      {
        id: "stock",
        keywords: ["stock", "available", "have", "size", "medium", "large", "small", "colour", "color"],
        reply:
          "Let me check — that item is in stock in small, medium and navy; large is due back on Friday. Would you like me to hold one for you or message you when large arrives?",
        followUps: ["Hold one for me", "How long is delivery?"],
      },
      {
        id: "hold",
        keywords: ["hold", "reserve", "keep", "put aside"],
        reply:
          "Held for 48 hours under your name. I've sent the details to the shop — just mention your name at the counter, or reply here if you'd like it delivered instead.",
        followUps: ["Deliver it instead", "What are your opening hours?"],
      },
      {
        id: "price",
        keywords: ["price", "cost", "how much", "discount", "sale", "offer"],
        reply:
          "That one is $34.99, and there's currently 15% off when you buy two or more. Prices in the shop and online are always the same.",
        followUps: ["Do you have this in medium?", "How long is delivery?"],
      },
      {
        id: "delivery",
        keywords: ["deliver", "shipping", "post", "how long", "when will"],
        reply:
          "Standard delivery is 2–4 working days for $4, free over $50. Express next-day is $9 if you order before 3pm. Local pickup is free and ready within 2 hours.",
        followUps: ["Where is my order?", "What's your returns policy?"],
      },
      {
        id: "returns",
        keywords: ["return", "refund", "exchange", "wrong", "faulty", "damaged"],
        reply:
          "You have 30 days to return anything unused with the receipt, for a refund or exchange. Faulty items are covered for 12 months and we cover return postage. Want me to start a return?",
        followUps: ["Yes, start a return", "Where is my order?"],
      },
      {
        id: "order",
        keywords: ["order", "track", "where is", "status", "arrived"],
        reply:
          "I can track that — give me your order number or the email you used, and I'll pull up the status and the courier link.",
        followUps: ["What's your returns policy?"],
      },
      {
        id: "hours",
        keywords: ["hour", "open", "close", "address", "where", "location"],
        reply:
          "The shop is at 8 Sample Road, open Monday to Saturday 10am–8pm and Sunday 12pm–6pm. Online orders are taken 24/7.",
      },
      {
        id: "human",
        keywords: ["human", "staff", "manager", "speak", "call", "complain"],
        reply:
          "No problem — I'll hand this to the team. Leave your name and number and someone will get back to you the same working day.",
      },
    ],
    fallback:
      "I don't have that information, and I'd rather not guess. I can help with stock, prices, delivery, returns and orders — or pass you to a member of staff. What works best?",
    caption:
      "Demo only. A real assistant connects to your actual product list and order system.",
  },
  {
    slug: "clinics",
    label: "Clinic",
    icon: "stethoscope",
    business: "Sample Clinic (fictional demo business)",
    blurb:
      "Appointments, hours, fees and what to bring. Scheduling and information only — never medical advice.",
    greeting:
      "Hello, I'm the assistant for Sample Clinic. I can help with appointments, opening hours, fees and what to bring. I can't give medical advice — for anything clinical I'll connect you with our staff.",
    starters: [
      "Book an appointment",
      "What are your opening hours?",
      "How much is a consultation?",
      "What should I bring?",
    ],
    intents: [
      {
        id: "medical",
        keywords: [
          "pain", "symptom", "diagnos", "medicine", "medication", "dose", "treat",
          "hurt", "fever", "sick", "should i", "is it serious", "blood", "rash",
          "pregnan", "chest", "breath",
        ],
        reply:
          "I'm not able to give medical advice or opinions — that has to come from a qualified clinician. I can book you an appointment, or you can call the clinic on [+92 300 0000000] during opening hours. If this is an emergency, please contact your local emergency services immediately.",
        followUps: ["Book an appointment", "What are your opening hours?"],
      },
      {
        id: "book",
        keywords: ["book", "appointment", "schedule", "slot", "see the doctor", "visit"],
        reply:
          "I can arrange that. Which would you prefer: the next available slot, a specific day, or a particular doctor? The soonest general appointment is Thursday 10:20am.",
        followUps: ["Thursday 10:20am works", "Do you have evening slots?"],
      },
      {
        id: "confirm",
        keywords: ["thursday", "works", "yes book", "that time", "confirm", "monday", "tuesday"],
        reply:
          "Booked as a request. Please confirm your full name and phone number and reception will send a confirmation message, plus a reminder 24 hours before. You can reply to that message to reschedule.",
        followUps: ["What should I bring?", "How much is a consultation?"],
      },
      {
        id: "reschedule",
        keywords: ["cancel", "reschedule", "change", "move", "postpone"],
        reply:
          "No problem. Tell me the name the appointment is under and your preferred new day, and I'll send the change to reception. We ask for 24 hours notice where possible so the slot can go to someone else.",
      },
      {
        id: "hours",
        keywords: ["hour", "open", "close", "evening", "weekend", "saturday", "sunday"],
        reply:
          "The clinic is open Monday to Friday 9am–6pm and Saturday 9am–1pm, closed Sunday. Evening slots until 8pm are available on Tuesdays and Thursdays.",
        followUps: ["Book an appointment"],
      },
      {
        id: "fees",
        keywords: ["fee", "cost", "price", "how much", "charge", "insurance", "pay"],
        reply:
          "A standard consultation is $30 and a follow-up within 14 days is $18. We accept cash, card and [insurance provider] — bring your insurance card if you're claiming.",
        followUps: ["What should I bring?", "Book an appointment"],
      },
      {
        id: "bring",
        keywords: ["bring", "prepare", "document", "id", "report", "before"],
        reply:
          "Please bring photo ID, your insurance card if you have one, a list of any medicines you're taking, and any previous test reports related to your visit. Arrive 10 minutes early if it's your first appointment.",
        followUps: ["Where are you located?"],
      },
      {
        id: "location",
        keywords: ["where", "address", "location", "park", "direction", "wheelchair", "access"],
        reply:
          "We're at 3 Sample Avenue, second floor, with lift access and step-free entry. Free patient parking is available at the rear of the building.",
      },
      {
        id: "human",
        keywords: ["human", "reception", "nurse", "doctor", "speak", "call", "staff"],
        reply:
          "I'll pass you to reception. Leave your name and number and a staff member will call you back during opening hours. For anything urgent, please call the clinic directly.",
      },
    ],
    fallback:
      "I'm not sure about that, and I won't guess. I can help with appointments, opening hours, fees, what to bring and how to find us. For anything medical, please speak to our clinical staff.",
    caption:
      "Demo only. Clinic assistants we build handle scheduling and published information — never diagnosis, triage or treatment advice.",
  },
];

/**
 * SITE ASSISTANT FALLBACK KNOWLEDGE
 * Used by the always-on chat widget when the AI API is unavailable
 * (no key configured, rate limited, provider down). Keeps the widget useful.
 */
export const fallbackKnowledge: DemoIntent[] = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "salam", "assalam", "good morning", "good evening"],
    reply:
      "Hi! I'm the Third Eye assistant. I can explain our services, give you a price range, or help you book a free consultation. What would you like to know?",
    followUps: ["What do you build?", "How much does a website cost?", "Book a consultation"],
  },
  {
    id: "services",
    keywords: ["service", "what do you", "offer", "build", "do you make", "help with"],
    reply:
      "We build four things: professional websites, AI chat assistants, workflow automation, and private/secure AI for sensitive data. Security is built into all of them. Which one sounds closest to what you need?",
    followUps: ["Tell me about AI chatbots", "How much does it cost?"],
  },
  {
    id: "chatbot",
    keywords: ["chatbot", "chat bot", "assistant", "ai agent", "bot"],
    reply:
      "An AI assistant answers your customers 24/7 using your own information — menu, hours, services, policies. If it doesn't know, it says so and offers a human. Typically ready in 1–2 weeks. You can try three live demos on our Live Demos page.",
    followUps: ["See the demos", "How much does it cost?"],
  },
  {
    id: "automation",
    keywords: ["automation", "automate", "workflow", "reminder", "admin", "spreadsheet"],
    reply:
      "Automation removes repetitive admin: booking reminders, confirmations, weekly reports, copying data between tools. Most clients start with one or two workflows. Our ROI calculator on the pricing page shows what that's worth in hours.",
    followUps: ["How much does it cost?", "Book a consultation"],
  },
  {
    id: "security",
    keywords: ["secure", "security", "safe", "hack", "encrypt", "privacy", "gdpr", "data"],
    reply:
      "Security is our background. Every build gets HTTPS, security headers, encrypted storage, access control, backups and monitoring — at no extra charge. We don't claim certifications we don't hold. The Security & Trust page explains it all in plain language.",
    followUps: ["Take the security quiz", "Book a consultation"],
  },
  {
    id: "pricing",
    keywords: ["price", "cost", "how much", "budget", "fee", "quote", "expensive", "package", "plan"],
    reply:
      "There are three packages, each with a one-time setup fee plus a monthly plan: Starter, Growth and Secure Pro. The figures on the pricing page are placeholders while the site is being finalised — use the estimator for a ballpark and book a free call for a fixed written quote.",
    followUps: ["Open the pricing estimator", "Book a consultation"],
  },
  {
    id: "websites",
    keywords: ["website", "web site", "redesign", "page", "site"],
    reply:
      "Our websites are custom built, mobile-first and fast, with forms, spam protection, HTTPS and backups included. Most launch in about 2–3 weeks. Want a rough price?",
    followUps: ["How much does it cost?", "Book a consultation"],
  },
  {
    id: "booking",
    keywords: ["book", "consultation", "call", "meeting", "appointment", "talk", "contact", "reach"],
    reply:
      "Happy to help — the free consultation is 30 minutes, online, with no obligation. Head to the Contact page to pick a time, or send the form and we'll reply within one business day.",
    followUps: ["What happens on the call?"],
  },
  {
    id: "process",
    keywords: ["how does it work", "process", "step", "timeline", "how long", "start"],
    reply:
      "Four steps: a free consultation, a written plan with a fixed quote, the build (with security and accessibility checks along the way), then launch, training and ongoing support.",
    followUps: ["Book a consultation", "How much does it cost?"],
  },
  {
    id: "industries",
    keywords: ["restaurant", "cafe", "shop", "retail", "clinic", "doctor", "store", "salon"],
    reply:
      "We focus on restaurants, shops and clinics. Each gets a different setup — menus and table bookings, product and order questions, or appointment scheduling. Note that clinic assistants handle scheduling and information only, never medical advice.",
    followUps: ["See the demos", "Book a consultation"],
  },
  {
    id: "team",
    keywords: ["who are you", "team", "about", "where are you", "company", "people"],
    reply:
      "We're a three-person team working fully online, with a background in cybersecurity and information assurance. We work with clients remotely by video call, email and WhatsApp.",
    followUps: ["What do you build?"],
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "great", "perfect", "cheers"],
    reply: "You're welcome! Anything else I can help with before you go?",
  },
];

export const fallbackDefault =
  "I'm running in offline mode right now, so I can only answer common questions about our services, pricing, security and booking. For anything else, send us a message on the Contact page and a person will reply within one business day.";
