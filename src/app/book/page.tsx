"use client";

import { useState } from "react";
import Link from "next/link";

const myName = "Yueheng[Alex] Zhang";
const bookTitle = "The Book of";
const explainThe =
  "[definite article] Makes the thing you're describing seem more important than it really is.";
const explainBook =
  "[n.] A written or printed work consisting of pages glued or sewn together along one side and bound in covers - Well not really. This here is neither made of paper nor does it have any important things in it. But rather a spontaneous slurry of unrelated stuff that I found time to put here. I'll call it a book nonetheless. It makes this webpage sound cool.";
const explainOf =
  "[preposition] If you're reading this, you're probably looking for the preface. If you're not, you're probably looking for the rest of the book. I wish you the best of luck in your endeavors.";

export default function BookPage() {
  const [hovered, setHovered] = useState("");

  const switchExplainer = (isHoveredMe: string) => {
    let styleToUse = "dict-entry";
    let textToUse = "";

    switch (isHoveredMe) {
      case "Me":
        styleToUse = "heading-very-faint";
        textToUse = myName;
        break;
      case "The":
        textToUse = explainThe;
        break;
      case "Book":
        textToUse = explainBook;
        break;
      case "of":
        textToUse = explainOf;
        break;
      default:
        break;
    }

    return (
      <span className={styleToUse}>
        <br />
        {textToUse}
      </span>
    );
  };

  const wordHoverableSentence = (
    sentence: string,
    clickCallback: (word: string) => void
  ) => {
    const words = sentence.split(/ /g);
    return words.map((word, index) => (
      <span key={index} onMouseEnter={() => clickCallback(word)}>
        {word}{" "}
      </span>
    ));
  };

  return (
    <main className="page-container">
      <title>Book of Me</title>
      <h1>
        <span className="heading-fancy">
          {wordHoverableSentence(bookTitle, (w) => setHovered(w))}
        </span>
        <Link
          href="/preface"
          className="heading-accent"
          onMouseEnter={() => setHovered("Me")}
        >
          Me
        </Link>
        {" \n"}
        {switchExplainer(hovered)}
      </h1>
    </main>
  );
}
