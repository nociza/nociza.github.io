"use client";

import Link from "next/link";
import SearchableIndex from "../../components/searchable-index";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
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

  // Truncate abstract to ~200 characters for archive view
  const truncatedAbstract =
    paper.abstract.length > 200
      ? paper.abstract.substring(0, 200) + "..."
      : paper.abstract;

  return (
    <Card>
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

export default function PapersIndexPage() {
  const { papers, loading, error } = usePapersData();

  return (
    <div className="relative">
      {/* Back Button */}
      <Link
        href="/me"
        className="fixed top-8 left-8 z-50 p-2 bg-white border border-gray-200 rounded-full hover:border-orange-500 transition-colors duration-200"
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
