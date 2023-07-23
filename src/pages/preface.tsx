import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import {
  pageStyles,
  headingNormalStyles,
  bodyRefStyles,
  bodyNormalStyles,
} from "../styles/global";

const Preface = () => {
  const [Hovered, setHovered] = useState("");
  return (
    <main style={pageStyles}>
      <title>Preface</title>
      <h1
        style={{
          ...headingNormalStyles,
          color: "rgba(68, 68, 68, 0.9)",
          fontSize: "3em",
        }}
      >
        Preface
      </h1>
      <p style={bodyNormalStyles}>
        Congradulations! You have found the Preface. So this website isn't a
        hoax after all. For the impatient reader, and those who are in need of a
        blatant overview of my experiences, you would find this{" "}
        <Link to="/me" style={bodyRefStyles}>
          Summary
        </Link>{" "}
        suites your needs.
        <br />
        <br />
        The completion of this personal website has long existed on a certain
        list somewhere on one of the productivity tools I've signed up for with
        my school email for free student subscriptions. The relavent item has
        manifested itself in multiple lists across multiple productivity tools
        and frameworks, each claiming to be essential, and each having a very
        aluring student subscription deal that I definitely should take'
        advantage of.
        <br />
        <br />
        Otherwise, we shall indulge in a deeper discussion of how a
        <Link
          to="/my-gf"
          style={Hovered == "carol" ? bodyRefStyles : bodyNormalStyles}
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
