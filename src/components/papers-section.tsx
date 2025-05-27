import Link from "next/link";
import { ArrowRight, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePapersData } from "../hooks/use-papers-data";

interface ArxivPaper {
  id: string;
  arxivId: string;
  url: string;
  title: string;
  authors: string[];
  abstract: string;
  publishedDate: string;
  categories: string[];
  status?: "reading" | "completed" | "bookmarked";
}

interface PaperCardProps {
  paper: ArxivPaper;
}

function PaperCard({ paper }: PaperCardProps) {
  const getStatusVariant = (status?: string) => {
    switch (status) {
      case "reading":
        return "default";
      case "completed":
        return "secondary";
      case "bookmarked":
        return "outline";
      default:
        return "outline";
    }
  };

  // Truncate abstract to ~150 characters
  const truncatedAbstract =
    paper.abstract.length > 150
      ? paper.abstract.substring(0, 150) + "..."
      : paper.abstract;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-inconsolata leading-tight">
            {paper.title}
          </CardTitle>
          <div className="flex items-center gap-2 ml-2">
            <FileText className="w-4 h-4" />
            {paper.status && (
              <Badge variant={getStatusVariant(paper.status)}>
                {paper.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-inconsolata">
            {paper.authors.slice(0, 3).join(", ")}
            {paper.authors.length > 3 && ` +${paper.authors.length - 3} more`}
          </p>
          <p className="text-xs text-muted-foreground font-inconsolata">
            arXiv:{paper.arxivId} •{" "}
            {new Date(paper.publishedDate).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground font-inconsolata mb-3 leading-relaxed">
          {truncatedAbstract}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {paper.categories.slice(0, 2).map((category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              arXiv
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PapersSection() {
  const { papers, loading, error } = usePapersData();
  return (
    <section className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
            Interesting Papers
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-inconsolata">
            Interesting papers that I came across
          </p>
          <Button variant="outline" asChild>
            <Link href="/papers" className="inline-flex items-center gap-2">
              View Full Papers Archive
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-muted-foreground">
              Loading papers...
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-muted-foreground">
              Error loading papers: {error}
            </div>
          ) : (
            papers.map((paper) => <PaperCard key={paper.id} paper={paper} />)
          )}
        </div>
      </div>
    </section>
  );
}
