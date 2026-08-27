import ReadingArchive from "@/components/reading-archive";
import { paperReads } from "@/data/read-data";

export default function PapersIndexPage() {
  return <ReadingArchive kind="paper" entries={paperReads} />;
}
