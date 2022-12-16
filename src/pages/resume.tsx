import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles, headingNormalStyles } from "./index";

const listStyles = {
  maxWidth: "68%",
  fontFamily: "Chalkduster, fantasy",
};

const Resume = () => {
  return (
    <main style={pageStyles}>
      <title>My Resume</title>
      <h1
        style={{
          ...headingNormalStyles,
          color: "black",
        }}
      >
        My Resumé
      </h1>
      <ul style={listStyles}>
        <li>
          <Link
            to="/resume"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            My Resumé
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Resume;
