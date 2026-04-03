"use client";

import Link from "next/link";
import SearchableIndex from "../../components/searchable-index";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArxivPaper, papers } from "../../data/site-data";

function PaperCard({ paper, index }: { paper: ArxivPaper; index: number }) {
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

  // Truncate abstract to ~180 characters for archive view
  const truncatedAbstract =
    paper.abstract.length > 180
      ? paper.abstract.substring(0, 180) + "..."
      : paper.abstract;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
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
                {paper.authors.slice(0, 3).join(", ")}
                {paper.authors.length > 3 &&
                  ` +${paper.authors.length - 3} more`}
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
            {paper.categories.slice(0, 3).map((category, index) => (
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

export default function PapersIndexPage() {
  if (papers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-inconsolata mb-2">
            No papers found in the archive
          </p>
          <p className="text-sm text-muted-foreground font-inconsolata mb-6">
            Add arXiv papers to your Notion database to see them here
          </p>
          <Button variant="outline" asChild>
            <Link href="/me">Return to Main Page</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Back Button */}
      <Link
        href="/me"
        className="fixed top-8 left-8 z-50 p-2 bg-white border border-gray-200 rounded-full hover:border-orange-500 transition-colors duration-200 shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-orange-500" />
      </Link>

      <SearchableIndex
        title="Research Papers Archive"
        items={papers}
        searchFields={["title", "authors", "abstract", "arxivId", "categories"]}
        placeholder="Search by title, author, abstract, or arXiv ID..."
        renderItem={(paper, index) => (
          <PaperCard key={paper.id} paper={paper} index={index} />
        )}
      />
    </div>
  );
}
