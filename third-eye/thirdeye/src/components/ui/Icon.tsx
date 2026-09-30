/**
 * Icon.tsx — inline SVG icon set.
 * Hand-rolled instead of an icon library: ~2KB total, no extra
 * dependency, and every icon is decorative (aria-hidden) by default.
 */
import type { SVGProps } from "react";

export type IconName =
  | "globe" | "chat" | "flow" | "shield" | "check" | "x" | "arrow-right"
  | "arrow-up" | "menu" | "sun" | "moon" | "star" | "key" | "lock" | "save"
  | "radar" | "brain" | "eye" | "code" | "alert" | "mail" | "phone"
  | "whatsapp" | "calendar" | "clock" | "sparkles" | "send" | "info"
  | "external" | "chevron-down" | "play" | "reset"
  | "utensils" | "bag" | "stethoscope";

const paths: Record<IconName, React.ReactNode> = {
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.5A8 8 0 0 1 13 4h0a8 8 0 0 1 8 8Z" /><path d="M9 11h6M9 15h4" /></>,
  flow: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="15" width="6" height="6" rx="1.5" /><path d="M9 6h4a2 2 0 0 1 2 2v10" /><path d="M6 9v6a2 2 0 0 0 2 2h4" /></>,
  shield: <><path d="M12 3l7 3v6c0 4.5-3 7.8-7 9c-4-1.2-7-4.5-7-9V6l7-3Z" /><path d="m9 12l2 2l4-4" /></>,
  check: <path d="m4 12l5 5L20 6" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  "arrow-right": <><path d="M4 12h15" /><path d="m13 6l6 6l-6 6" /></>,
  "arrow-up": <><path d="M12 20V5" /><path d="m6 11l6-6l6 6" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  star: <path d="m12 4l2.4 4.9l5.4.8l-3.9 3.8l.9 5.4l-4.8-2.5l-4.8 2.5l.9-5.4L4.2 9.7l5.4-.8Z" />,
  key: <><circle cx="8" cy="14" r="4" /><path d="m11 11l9-9M17 5l2 2M14 8l2 2" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  save: <><path d="M4 7a8 8 0 1 1 1 10" /><path d="M4 4v4h4" /><path d="M12 8v4l3 2" /></>,
  radar: <><circle cx="12" cy="12" r="3" /><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 12l6-6" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3a3 3 0 0 0-1 5.8A3 3 0 0 0 8 18a3 3 0 0 0 4 2V4.5A2.5 2.5 0 0 0 9 4Z" /><path d="M15 4a3 3 0 0 1 3 3a3 3 0 0 1 1 5.8A3 3 0 0 1 16 18a3 3 0 0 1-4 2" /></>,
  eye: <><path d="M2 12s3.8-6 10-6s10 6 10 6s-3.8 6-10 6s-10-6-10-6Z" /><circle cx="12" cy="12" r="2.6" /></>,
  code: <><path d="m8 8l-4 4l4 4M16 8l4 4l-4 4M13 5l-2 14" /></>,
  alert: <><path d="M12 4l9 16H3l9-16Z" /><path d="M12 10v4M12 17.5v.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7l8.5 6l8.5-6" /></>,
  phone: <path d="M6 3h3l2 5l-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2A2 2 0 0 1 6 3Z" />,
  whatsapp: <><path d="M20 12a8 8 0 0 1-11.9 7L4 20l1.1-3.9A8 8 0 1 1 20 12Z" /><path d="M9.2 9.4c.3 2.3 2.1 4.1 4.4 4.4l.9-1.2l1.9.8a4.2 4.2 0 0 1-6.8-5.9l.8 1.9Z" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sparkles: <><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z" /><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8Z" /></>,
  send: <><path d="M4 12L20 4l-8 16l-2-6l-6-2Z" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.5" /></>,
  external: <><path d="M14 4h6v6" /><path d="M20 4L10 14" /><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></>,
  "chevron-down": <path d="m6 9l6 6l6-6" />,
  utensils: <><path d="M6 3v7a2.5 2.5 0 0 0 5 0V3" /><path d="M8.5 10v11" /><path d="M17.5 3c-1.4 1.4-2 3.3-2 5.5c0 1.6.7 2.8 2 3.5V21" /></>,
  bag: <><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 11V7a3 3 0 0 1 6 0v4" /></>,
  stethoscope: <><path d="M6 3v5a4 4 0 0 0 8 0V3" /><path d="M6 3H4.5M14 3h1.5" /><path d="M10 12v2a5 5 0 0 0 5 5a4 4 0 0 0 4-4v-1" /><circle cx="19" cy="10" r="2" /></>,
  play: <path d="M7 4.5v15l13-7.5Z" />,
  reset: <><path d="M4 12a8 8 0 1 0 2.3-5.7" /><path d="M4 4v4h4" /></>,
};

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  /** Give a title only when the icon carries meaning on its own. */
  title?: string;
};

export function Icon({ name, size = 20, title, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
