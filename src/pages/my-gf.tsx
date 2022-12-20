import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { headingNormalStyles, pageStyles } from "../styles/global";

const MyGF = () => {
  return (
    <div style={pageStyles}>
      <h1 style={headingNormalStyles}>Brain with Water</h1>
      <StaticImage alt="Brain with water" src="../images/brainwater.jpeg" />
    </div>
  );
};

export default MyGF;
