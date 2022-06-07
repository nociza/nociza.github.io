import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles, headingNormalStyles } from "./index.js";
import Paper from "@mui/material/Paper";

const listStyles = {
    maxWidth: "68%",
    fontFamily: "Chalkduster, fantasy",
};

const Resume = () => {
    return (
        <main style={pageStyles}>
            <Paper />
            <title>My Resume</title>
            <h1 style={{
                ...headingNormalStyles,
                color: "black"
            }}>My Resumé</h1>
            <ul style={listStyles}>
                <li><Link
                    to="/resume"
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                    My Resumé
                </Link></li>
            </ul>
        </main>
    );
};

export default Resume;