import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { isMobile } from "react-device-detect";
import { pageStyles, headingNormalStyles } from "./index.js";
import Paper from "@mui/material/Paper";

const listStyles = {
    color: "rgba(68, 68, 68, 0.7)",
    maxWidth: "68%",
    fontFamily: "Chalkduster, fantasy",
};

const Navigation = () => {
    return (
        <main style={pageStyles}>
            <Paper />
            <title>Navigation</title>
            <h1 style={{
                ...headingNormalStyles,
                color: "black"
            }}>Navigation</h1>
            <ul style={listStyles}>
                <li><Link
                    to="/resume"
                    style={{ color: "rgba(68, 68, 68, 0.7)", textDecoration: "none", fontWeight: "bold" }}
                >
                    My Resumé
                </Link></li>
            </ul>
        </main>
    );
};

export default Navigation;