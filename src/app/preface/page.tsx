"use client";

import { useState } from "react";
import Link from "next/link";

export default function PrefacePage() {
  const [hovered, setHovered] = useState("");

  return (
    <main className="page-container">
      <title>Preface</title>
      <h1
        className="heading-normal"
        style={{ color: "rgba(68, 68, 68, 0.9)", fontSize: "3em" }}
      >
        Preface
      </h1>
      <p className="body-normal">
        Congradulations! You have found the Preface. So this website isn't a
        hoax after all. For the impatient reader, and those who are in need of a
        blatant overview of my experiences, you would find this{" "}
        <Link href="/me" className="body-ref">
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
          href="/my-gf"
          className={hovered === "carol" ? "body-ref" : "body-normal"}
          onMouseEnter={() => setHovered("carol")}
          onMouseLeave={() => setHovered("")}
        >
          carol
        </Link>
        ogy changes our perspective of the world.
      </p>
    </main>
  );
}
