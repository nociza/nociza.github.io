"use client";

import Link from "next/link";
import SearchableIndex from "../../components/searchable-index";
import { ArrowLeft, FileText, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePapersData } from "../../hooks/use-papers-data";

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

// Extended archive data with sample arXiv papers
const allPapersData: ArxivPaper[] = [
  {
    id: "1",
    arxivId: "2301.07041",
    url: "https://arxiv.org/abs/2301.07041",
    title: "Attention Is All You Need",
    authors: [
      "Ashish Vaswani",
      "Noam Shazeer",
      "Niki Parmar",
      "Jakob Uszkoreit",
    ],
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    publishedDate: "2023-01-17",
    categories: ["cs.LG", "cs.CL"],
    status: "reading",
  },
  {
    id: "2",
    arxivId: "2005.14165",
    url: "https://arxiv.org/abs/2005.14165",
    title: "Language Models are Few-Shot Learners",
    authors: ["Tom B. Brown", "Benjamin Mann", "Nick Ryder", "Melanie Subbiah"],
    abstract:
      "Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training on a large corpus of text followed by fine-tuning on a specific task. While typically task-agnostic in architecture, this method still requires task-specific fine-tuning datasets of thousands or tens of thousands of examples.",
    publishedDate: "2020-05-28",
    categories: ["cs.CL"],
    status: "completed",
  },
  {
    id: "3",
    arxivId: "1706.03762",
    url: "https://arxiv.org/abs/1706.03762",
    title: "Attention Is All You Need",
    authors: [
      "Ashish Vaswani",
      "Noam Shazeer",
      "Niki Parmar",
      "Jakob Uszkoreit",
    ],
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism.",
    publishedDate: "2017-06-12",
    categories: ["cs.CL", "cs.LG"],
    status: "bookmarked",
  },
  {
    id: "4",
    arxivId: "2103.00020",
    url: "https://arxiv.org/abs/2103.00020",
    title:
      "Learning Transferable Visual Models From Natural Language Supervision",
    authors: [
      "Alec Radford",
      "Jong Wook Kim",
      "Chris Hallacy",
      "Aditya Ramesh",
    ],
    abstract:
      "State-of-the-art computer vision systems are trained to predict a fixed set of predetermined object categories. This restricted form of supervision limits their generality and usability since additional labeled data is needed to specify any other visual concept.",
    publishedDate: "2021-02-26",
    categories: ["cs.CV", "cs.LG"],
    status: "reading",
  },
];

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
  const { papers, loading, error } = usePapersData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-inconsolata">Loading papers archive...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-red-500 font-inconsolata mb-4">
            Failed to load papers data
          </p>
          <p className="text-muted-foreground font-inconsolata text-sm mb-6">
            {error}
          </p>
          <Button variant="outline" asChild>
            <Link href="/me">Return to Main Page</Link>
          </Button>
        </div>
      </div>
    );
  }

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
        searchFields={["title", "authors", "abstract", "arxivId"]}
        placeholder="Search by title, author, abstract, or arXiv ID..."
        renderItem={(paper, index) => (
          <PaperCard key={paper.id} paper={paper} index={index} />
        )}
      />
    </div>
  );
}
