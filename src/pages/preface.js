import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles } from "./index.js";
import Paper from "@mui/material/Paper";



const headingNormalStyles = {
    color: "rgba(68, 68, 68, 1)",
    maxWidth: "68%",
    fontFamily: "Trattatello, fantasy",
    fontSize: "3em",
};

const Preface = () => {
    return (
        <main style={pageStyles}>
            <Paper />
            <title>Preface</title>
            <h1 styles={headingNormalStyles}>Preface</h1>
            <p>Congradulations! You have found the Preface. So this website isn't a hoax after all. </p>
        </main>
    );
};

export default Preface;