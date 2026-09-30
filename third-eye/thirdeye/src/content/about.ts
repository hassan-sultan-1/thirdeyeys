/**
 * about.ts — ABOUT PAGE CONTENT
 * Replace the three team placeholders with real names, roles and photos.
 * Photos: drop images in /public/team/ and set `photo: "/team/name.jpg"`.
 */

export const about = {
  mission:
    "Give small businesses the same quality of digital systems — and the same standard of security — that large companies pay agencies a fortune for.",
  story: [
    "Third Eye is a three-person team. We are fully online, which keeps our costs low and our prices honest.",
    "We started because we kept seeing the same thing: a restaurant with a beautiful dining room and a broken website, a clinic keeping patient details in an unprotected spreadsheet, a shop answering the same question forty times a day. The tools to fix all of this already exist. Most small businesses just never get offered them at a fair price, in language they can follow.",
    "Our background is in cybersecurity and information assurance. That is why security is built into everything we ship instead of being sold later as an upgrade.",
  ],
  values: [
    {
      title: "Say it plainly",
      body: "If we cannot explain it without jargon, we have not understood it well enough yet.",
    },
    {
      title: "Secure by default",
      body: "Encryption, backups, access control and least privilege are part of the base price, always.",
    },
    {
      title: "No invented proof",
      body: "We do not publish fake testimonials, borrowed logos or awards we did not win. Sample figures are labelled as samples.",
    },
    {
      title: "You own your systems",
      body: "Your domain, your data, your code. You can leave with everything at any time.",
    },
  ],
  approach: [
    {
      title: "Listen before we build",
      body: "Every project starts with the boring question: what actually takes up your time? We solve that first.",
    },
    {
      title: "Ship small, ship often",
      body: "You see working pages early and give feedback while changes are still cheap.",
    },
    {
      title: "Test like an attacker",
      body: "Before launch we check input handling, access control, headers, backups and AI prompt-injection paths.",
    },
    {
      title: "Stay after launch",
      body: "Monitoring, updates and monthly reviews. A site nobody maintains becomes a risk within a year.",
    },
  ],
  team: [
    {
      name: "[HASSAN SULTAN]",
      role: "[Founder & Security Lead]",
      bio: "[Cybersecurity and Information Assurance professional focused on helping clients protect their digital assets, secure systems and networks, identify vulnerabilities, and strengthen overall security and risk management..]",
      photo: "",
      initials: "T1",
      links: [{ label: "LinkedIn", href: "[www.linkedin.com/in/hassan-sultan-0a67382b6]" }],
    },
    {
      name: "[ZAID AHMAD]",
      role: "[Full-Stack Developer]",
      bio: "[Builds websites and integrations, turning ideas into functional, user-friendly digital experiences. The favorite part of the job is bringing concepts to life through clean code and seamless technology.
]",
      photo: "",
      initials: "T2",
      links: [{ label: "LinkedIn", href: "[https://linkedin.com/in/profile]" }],
    },
    {
      name: "[HASHIR KHAN]",
      role: "[AI & Automation Engineer]",
      bio: "[Designs AI assistants and automations, with a focus on making AI responses accurate, reliable, and useful through smart workflows and careful validation.
.]",
      photo: "",
      initials: "T3",
      links: [{ label: "LinkedIn", href: "[https://linkedin.com/in/profile]" }],
    },
  ],
};
