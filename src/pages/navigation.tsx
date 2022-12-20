import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import {
  pageStyles,
  headingNormalStyles,
  listStyles,
  listItemStyles,
} from "../styles/global";

const Navigation = () => {
  return (
    <main style={pageStyles}>
      <title>Index</title>
      <h1
        style={{
          ...headingNormalStyles,
          color: "black",
        }}
      >
        Index
      </h1>
      <ul style={listStyles}>
        <li style={listItemStyles}>
          <Link
            to="/me"
            style={{
              color: "rgba(68, 68, 68, 0.7)",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            My Resumé
          </Link>
        </li>
        <li style={listItemStyles}>
          <Link
            to="/me"
            style={{
              color: "rgba(68, 68, 68, 0.7)",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            My Resumé
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Navigation;
