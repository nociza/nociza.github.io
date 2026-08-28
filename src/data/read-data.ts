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
  favoriteRank?: number;
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
export const activeBookReads = bookReads
  .filter((entry) => entry.status === "active")
  .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
export const completedBookReads = bookReads
  .filter((entry) => entry.status === "completed")
  .sort((left, right) => (right.completedAt ?? right.updatedAt).localeCompare(left.completedAt ?? left.updatedAt));
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

export function readDate(value?: string, yearOnly = false): string | null {
  if (!value) return null;
  if (yearOnly || /^\d{4}$/.test(value)) return value.slice(0, 4);
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}
