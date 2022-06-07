import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles, headingNormalStyles } from "./index.js";
import Paper from "@mui/material/Paper";

const bodyStyles = {
    color: "rgba(68, 68, 68, 0.7)",
    maxWidth: "68%",
    fontFamily: "Trattatello, fantasy",
    fontSize: "1em",
};

const Navigation = () => {
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
                I'll show you how to 
                <Link
                    to="/"
                    style={{ color: "rgba(255, 168, 68, 0.7)", textDecoration: "none", fontWeight: "bold" }}
                >
                    Navigate
                </Link>
            </p>
        </main>
    );
};

export default Navigation;