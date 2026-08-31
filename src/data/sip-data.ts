import sipJson from "../../public/data/sips.json";

export type SipKind = "tea" | "coffee";
export type SipScalar = string | number | null;

export interface SipEntry {
  id: string;
  slug: string;
  title: string;
  kind: SipKind;
  excerpt: string;
  body: string;
  image: {
    src: string;
    alt: string;
  };
  observedAt: string;
  receivedAt: string;
  publishedAt: string;
  subject: Record<string, SipScalar>;
  brew: Record<string, SipScalar>;
  tastingNotes: string[];
  rating: number | null;
  tags: string[];
  setupIds: string[];
  activity: {
    state: "current" | "archived";
    refreshedAt: string | null;
    expiresAt: string | null;
  };
}

// The collection is validated before every build; the extra `unknown` hop
// avoids TypeScript treating omitted JSON object keys as explicit undefined.
export const sipEntries = sipJson as unknown as SipEntry[];

export function findSip(slug: string): SipEntry | undefined {
  return sipEntries.find((entry) => entry.slug === slug);
}

export function isSipCurrent(entry: SipEntry, now: number = Date.now()): boolean {
  if (entry.activity.state !== "current" || !entry.activity.expiresAt) return false;
  const expiry = Date.parse(entry.activity.expiresAt);
  return Number.isFinite(expiry) && expiry > now;
}

export function formatSipShortDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatSipDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatSipLabel(value: string): string {
  const labels: Record<string, string> = {
    temperature_c: "Temperature",
    dose_g: "Dose",
    water_g: "Water",
    steep_seconds: "Steep time",
  };
  return labels[value] ?? value.replace(/_/g, " ").replace(/^./, (character: string) => character.toUpperCase());
}

export function formatSipValue(key: string, value: SipScalar): string {
  if (value === null) return "";
  if (key === "temperature_c") return `${value}°C`;
  if (key === "dose_g" || key === "water_g") return `${value} g`;
  if (key === "steep_seconds") return `${value} sec`;
  return String(value);
}
