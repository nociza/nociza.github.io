import Link from "next/link";
import { ArrowRight, FileText, ExternalLink, Loader2 } from "lucide-react";
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

  // Truncate abstract to ~120 characters for better card layout
  const truncatedAbstract =
    paper.abstract.length > 120
      ? paper.abstract.substring(0, 120) + "..."
      : paper.abstract;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-inconsolata leading-tight">
            {paper.title}
          </CardTitle>
          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
            <FileText className="w-4 h-4 text-muted-foreground" />
            {paper.status && (
              <Badge variant={getStatusVariant(paper.status)}>
                {paper.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-inconsolata">
            {paper.authors.length > 0 ? (
              <>
                {paper.authors.slice(0, 2).join(", ")}
                {paper.authors.length > 2 &&
                  ` +${paper.authors.length - 2} more`}
              </>
            ) : (
              "Authors not available"
            )}
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
              className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600"
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

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center page-container">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-inconsolata">Loading papers...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center page-container">
        <div className="text-center">
          <p className="text-red-500 font-inconsolata mb-4">
            Failed to load papers data from Notion
          </p>
          <p className="text-muted-foreground font-inconsolata text-sm">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
            Interesting Papers
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-inconsolata">
            Research papers that caught my attention and sparked curiosity
          </p>
          <Button
            variant="link"
            className="text-orange-500 hover:text-orange-600 p-0"
            asChild
          >
            <Link href="/papers" className="inline-flex items-center gap-2">
              View Full Papers Archive
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.length > 0 ? (
            papers
              .slice(0, 6)
              .map((paper) => <PaperCard key={paper.id} paper={paper} />)
          ) : (
            <div className="col-span-full text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-inconsolata mb-2">
                No papers currently being tracked
              </p>
              <p className="text-sm text-muted-foreground font-inconsolata">
                Add arXiv papers to your Notion database to see them here
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
