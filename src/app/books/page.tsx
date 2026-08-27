import ReadingArchive from "@/components/reading-archive";
import { bookReads } from "@/data/read-data";

export default function BooksIndexPage() {
  return <ReadingArchive kind="book" entries={bookReads} />;
}
