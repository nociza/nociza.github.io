import readsJson from "../../public/data/reads.json";

export type ReadStatus = "planned" | "active" | "paused" | "completed" | "abandoned";
export type BookFormat = "physical" | "ebook" | "audiobook";

export interface ReadProgress {
  percent?: number;
  current?: number;
  total?: number;
  unit?: string;
  label?: string;
  remaining?: string;
}

export interface ReadLink {
  label: string;
  url: string;
}

export interface ReadIdentifiers {
  isbn10?: string;
  isbn13?: string;
  doi?: string;
  arxiv?: string;
  goodreads?: string;
}

interface ReadBase {
  id: string;
  kind: "book" | "paper";
  title: string;
  authors: string[];
  status: ReadStatus;
  excerpt?: string;
  reflection?: string;
  tags?: string[];
  rating?: number;
  progress?: ReadProgress;
  identifiers?: ReadIdentifiers;
  links?: ReadLink[];
  cover?: string;
  publishedAt?: string;
  startedAt?: string;
  completedAt?: string;
  addedAt: string;
  updatedAt: string;
}

export interface BookRead extends ReadBase {
  kind: "book";
  format: BookFormat;
  year?: number;
  publisher?: string;
  pages?: number;
  narrators?: string[];
}

export interface PaperRead extends ReadBase {
  kind: "paper";
  abstract?: string;
  categories?: string[];
  venue?: string;
  url?: string;
}

export type ReadEntry = BookRead | PaperRead;

export const readEntries = readsJson as ReadEntry[];
export const bookReads = readEntries.filter((entry): entry is BookRead => entry.kind === "book");
export const paperReads = readEntries.filter((entry): entry is PaperRead => entry.kind === "paper");

export function readStatusLabel(status: ReadStatus): string {
  return {
    planned: "Up next",
    active: "In progress",
    paused: "Paused",
    completed: "Finished",
    abandoned: "Set aside",
  }[status];
}

export function bookFormatLabel(format: BookFormat): string {
  return {
    physical: "Book",
    ebook: "Ebook",
    audiobook: "Audiobook",
  }[format];
}

export function readDate(value?: string): string | null {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}
