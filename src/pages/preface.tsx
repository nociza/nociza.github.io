import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles } from "../styles/global";

const headingNormalStyles = {
  fontFamily: "Inconsolata",
  fontSize: "5vw",
  fontWeight: "bold",
};

const bodyStyles = {
  color: "rgba(68, 68, 68, 0.7)",
  maxWidth: "68%",
  fontFamily: "Inconsolata",
  fontSize: "2vw",
  textDecoration: "none",
};

const bodyRefs = {
  color: "rgba(255, 168, 68, 0.7)",
  textDecoration: "none",
  fontWeight: "bold",
};

const Preface = () => {
  const [Hovered, setHovered] = useState("");
  return (
    <main style={pageStyles}>
      <title>Preface</title>
      <h1
        style={{
          ...headingNormalStyles,
          color: "black",
        }}
      >
        Preface
      </h1>
      <p style={bodyStyles}>
        Congradulations! You have found the Preface. So this website isn't a
        hoax after all. For the impatient reader, and those who are in need of a
        blatant overview of my experiences, here is how you can{" "}
        <Link to="/navigation" style={bodyRefs}>
          Navigate
        </Link>
        .<br />
        <br />
        Otherwise, we shall indulge in a deeper discussion of how a
        <Link
          to="/my-gf"
          style={Hovered == "carol" ? bodyRefs : bodyStyles}
          onMouseEnter={() => setHovered("carol")}
          onMouseLeave={() => setHovered("")}
        >
          carol
        </Link>
        ogy changes our perspective of the world.
      </p>
    </main>
  );
};

export default Preface;
