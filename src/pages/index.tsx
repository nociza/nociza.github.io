import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles } from "../styles/global";

const myName = "Yueheng[Alex] Zhang";
const bookTitle = "The Book of";
const explainThe =
  "[definite article] Makes the thing you're describing seem more important than it really is.";
const explainBook =
  "[n.] A written or printed work consisting of pages glued or sewn together along one side and bound in covers - Well not really. This here is neither made of paper nor does it have any important things in it. But rather a spontaneous slurry of unrelated stuff that I found time to put here. I'll call it a book nonetheless. It makes this webpage sound cool.";
const explainOf =
  "[preposition] If you're reading this, you're probably looking for the preface. If you're not, you're probably looking for the rest of the book. I wish you the best of luck in your endeavors.";

/* ================================== Functions ======================================== */

const switchExplainer = (isHoveredMe: any) => {
  var styleToUse: any = dictEntryStyles;
  var textToUse = "";
  switch (isHoveredMe) {
    case "Me":
      styleToUse = headingVeryFaintStyles;
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
    <span style={styleToUse}>
      <br />
      {textToUse}
    </span>
  );
};

const wordHoverableSentence = (sentence: any, clickCallback: any) => {
  const words = sentence.split(/ /g);
  return words.map((w: any) => (
    <span onMouseEnter={() => clickCallback(w)}>{w} </span>
  ));
};

/* ================================== Styles ======================================== */
const titleStyles = isMobile
  ? {
      color: "rgba(68, 68, 68, 0.7)",
      margin: "0 0 24px 0",
      maxWidth: "68%",
      fontFamily: "Trattatello, fantasy",
      fontSize: "6em",
    }
  : {
      color: "rgba(68, 68, 68, 0.7)",
      margin: "0 0 24px 0",
      fontFamily: "Trattatello, fantasy",
      fontSize: "6em",
    };
const headingNormalStyles = {
  color: "rgba(68, 68, 68, 0.7)",
  maxWidth: "68%",
  fontFamily: "Trattatello, fantasy",
  fontSize: "3em",
};
const headingAccentStyles = {
  color: "rgba(255, 168, 68, 0.7)",
  textDecoration: "none",
  fontFamily: "Trattatello, fantasy",
  fontSize: "3em",
};
const headingVeryFaintStyles = {
  color: "rgba(68, 68, 68, 0.1)",
  fontFamily: "Chalkduster, fantasy",
  fontSize: "2em",
};
const dictEntryStyles = {
  color: "rgba(68, 68, 68, 0.9)",
  fontFamily: "Courier New, monospace",
  fontSize: "0.68em",
  maxWidth: "20%",
  marginTop: "0",
  marginBottom: "0",
};

/* ================================== Exports ======================================== */
const IndexPage = () => {
  const [Hovered, setHovered] = useState("");
  return (
    <main style={pageStyles}>
      <title>Book of Me</title>
      <h1>
        <span style={headingNormalStyles}>
          {wordHoverableSentence(bookTitle, (w: any) => setHovered(w))}
        </span>
        <Link
          to="/preface"
          style={headingAccentStyles}
          onMouseEnter={() => setHovered("Me")}
        >
          Me
        </Link>
        {" \n"}
        {switchExplainer(Hovered)}
      </h1>
    </main>
  );
};

export default IndexPage;
