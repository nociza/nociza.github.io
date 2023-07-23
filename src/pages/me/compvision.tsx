import React, { useEffect } from "react";

const ComputerVisionProjectReports = () => {
  return (
    //@ts-ignore
    <div style={styles.container}>
      <h3 style={styles.h3}>CS184/284A - Computer Vision: Project Reports</h3>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <a
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-acm/"
            style={styles.a}
          >
            Project 1: <b>Colorizing the Prokudin-Gorskii photo collection</b>
          </a>
        </li>
        <li style={styles.li}>
          <a
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-acm/"
            style={styles.a}
          >
            Project 2: <b>Fun with Filters and Frequencies</b>
          </a>
        </li>
        <li style={styles.li}>
          <a
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj3/cs194-26-acm/"
            style={styles.a}
          >
            Project 3: <b>Face Morphing</b>
          </a>
        </li>
        <li style={styles.li}>
          <a
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4A/cs194-26-acm/"
            style={styles.a}
          >
            Project 4A: <b>Image Warping and Mosaiacing</b>
          </a>
        </li>
        <li style={styles.li}>
          <a
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-acm/"
            style={styles.a}
          >
            Project 4B: <b>Auto-alignment, Image Warping and Mosaiacing</b>
          </a>
        </li>
        <li style={styles.li}>
          <a
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-acm/"
            style={styles.a}
          >
            Project 5: <b>Facial Keypoint Detection with Neural Networks</b>
          </a>
        </li>
        <li style={styles.li}>
          <a
            href="https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-acm/"
            style={styles.a}
          >
            Final Project:{" "}
            <b>Augmented Reality & A Neural Algorithm for Artistic Style</b>
          </a>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 960,
    margin: "3rem auto",
    textAlign: "center",
  },
  h3: {
    fontSize: "1.8rem",
    marginBottom: "2rem",
  },
  ul: {
    listStyleType: "none",
  },
  li: {
    marginBottom: "1rem",
  },
  a: {
    color: "#333",
    textDecoration: "none",
    fontSize: "1.2rem",
    transition: "color 0.2s",
  },
};

export default ComputerVisionProjectReports;
