import * as React from "react";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { StaticImage } from "gatsby-plugin-image";
import {
  pageStyles,
  headingNormalStyles,
  bodyRefStyles,
  bodyNormalStyles,
} from "../styles/global";
import { Grid, Box } from "@chakra-ui/react";

const Me = () => {
  const [Hovered, setHovered] = useState("");
  return (
    <main style={pageStyles}>
      <title>Speaking of myself</title>
      <Grid gridGap={2} gridAutoFlow="column dense">
        <Grid
          w="40vw"
          gridAutoFlow="row"
          style={{
            ...headingNormalStyles,
            color: "black",
          }}
        >
          <Box
            w="40vw"
            style={Hovered == "Alex" ? bodyRefStyles : headingNormalStyles}
            onMouseEnter={() => setHovered("Alex")}
            onMouseLeave={() => setHovered("")}
          >
            {Hovered == "Alex" ? "Alexander" : "Yueheng"}
          </Box>
          <Box>Zhang</Box>
        </Grid>
        <Box w="25vw">
          <StaticImage
            alt="Alex Zhang"
            src="../images/linkedin_pic_rounded.png"
            jpgOptions={{
              quality: 100,
              progressive: true,
            }}
          />
        </Box>
      </Grid>
    </main>
  );
};

export default Me;
