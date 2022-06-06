import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles, headingNormalStyles } from "./index.js";
import Paper from "@mui/material/Paper";

const Preface = () => {
    return (
        <main style={pageStyles}>
            <title>Preface</title>
            <h1 style={headingNormalStyles}>
                <span style={{color: "blue"}}>Preface</span>
                Test
            </h1>
            <p>Congradulations! You have found the Preface. So this website isn't a hoax after all. </p>
        </main>
    );
};

export default Preface;