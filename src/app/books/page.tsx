import ReadingArchive from "@/components/reading-archive";
import { activeBookReads, completedBookReads } from "@/data/read-data";

export default function BooksIndexPage() {
  return <ReadingArchive kind="book" entries={[...activeBookReads, ...completedBookReads]} />;
}
