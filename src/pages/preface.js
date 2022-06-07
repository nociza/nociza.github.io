import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles, headingNormalStyles } from "./index.js";
import Paper from "@mui/material/Paper";

const bodyStyles = {
    color: "rgba(68, 68, 68, 0.7)",
    maxWidth: "68%",
    fontFamily: "Chalkduster, fantasy",
    fontSize: "1em",
    textDecoration: "none",
};

const bodyRefs = {
    color: "rgba(255, 168, 68, 0.7)",
    textDecoration: "none",
    fontWeight: "bold",
}

const Preface = () => {
    const [Hovered, setHovered] = useState("");
    return (
        <main style={pageStyles}>
            <Paper />
            <title>Preface</title>
            <h1 style={{
                ...headingNormalStyles,
                color: "black"
            }}>Preface</h1>
            <p style={bodyStyles}>
                Congradulations! You have found the Preface. So this website isn't a hoax after all.
                For the impatient reader, and those who are in need of a blatant overview of my experiences,
                here is how you can {" "}
                <Link
                    to="/navigation"
                    style={bodyRefs}
                >
                    Navigate
                </Link>.<br /><br />
                Otherwise, we shall indulge in a deeper discussion of how a
                <Link
                    to="/my-gf"
                    style={Hovered == "carol" ? bodyRefs : bodyStyles}
                    onMouseEnter={() => setHovered("carol")}
                    onMouseLeave={() => setHovered("")}
                >
                    carol
                </Link>ogy changes our perspective of the world.

            </p>
        </main>
    );
};

export default Preface;