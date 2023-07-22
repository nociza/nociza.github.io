import * as React from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  Collapse,
  Button,
  Text,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import {
  pageStyles,
  headingNormalStyles,
  bodyRefStyles,
  bodyNormalStyles,
} from "../styles/global";

const Me = () => {
  const [Hovered, setHovered] = useState("");
  const [show, setShow] = useState({
    education: false,
    experience: false,
    projects: false,
    skills: false,
  });

  const handleToggle = (field: keyof typeof show) => {
    setShow({ ...show, [field]: !show[field] });
  };

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
            style={Hovered === "Alex" ? bodyRefStyles : headingNormalStyles}
            onMouseEnter={() => setHovered("Alex")}
            onMouseLeave={() => setHovered("")}
          >
            {Hovered === "Alex" ? "Alexander" : "Yueheng"}
          </Box>
          <Box>Zhang</Box>

          {/* Details Grid */}
          <Grid gridAutoFlow="row" gap={6}>
            <VStack align="start" spacing={2}>
              <Button variant="link" onClick={() => handleToggle("education")}>
                Education
              </Button>
              <Collapse in={show.education}>
                <Text fontSize="sm" fontFamily="Roboto, sans-serif">
                  <UnorderedList>
                    <ListItem>
                      University of California, Berkeley (2019 - 2024)
                    </ListItem>
                    <ListItem>
                      MS: EECS; BA: Computer Science and Economics
                    </ListItem>
                    <ListItem>
                      Research: RISELab, under Prof. Dawn Song
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Collapse>
            </VStack>

            <VStack align="start" spacing={2}>
              <Button variant="link" onClick={() => handleToggle("experience")}>
                Work Experience
              </Button>
              <Collapse in={show.experience}>
                <Text fontSize="sm" fontFamily="Roboto, sans-serif">
                  <UnorderedList>
                    <ListItem>
                      Google, Software Engineering Intern (May – Aug. 2022)
                    </ListItem>
                    <ListItem>
                      Five9, Software Engineering Intern (May – Aug. 2021)
                    </ListItem>
                    <ListItem>
                      Snackpass.co, Full Stack Development Intern (May – Aug.
                      2021)
                    </ListItem>
                    <ListItem>
                      Berkeley EECS Dept., Student Instructor (Mar. 2021 – May
                      2022)
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Collapse>
            </VStack>

            <VStack align="start" spacing={2}>
              <Button variant="link" onClick={() => handleToggle("projects")}>
                Projects
              </Button>
              <Collapse in={show.projects}>
                <Text fontSize="sm" fontFamily="Roboto, sans-serif">
                  <UnorderedList>
                    <ListItem>
                      LifeWiki.xyz: a Web2.5 Social App (July 2022 – Present)
                    </ListItem>
                    <ListItem>
                      Colink.app: an opensource decentralized programming
                      abstraction (Aug. 2022 – Present)
                    </ListItem>
                    <ListItem>Class Projects</ListItem>
                  </UnorderedList>
                </Text>
              </Collapse>
            </VStack>

            <VStack align="start" spacing={2}>
              <Button variant="link" onClick={() => handleToggle("skills")}>
                Skills
              </Button>
              <Collapse in={show.skills}>
                <Text fontSize="sm" fontFamily="Roboto, sans-serif">
                  <UnorderedList>
                    <ListItem>
                      Languages: Golang, Python, Rust, C/C++, Java, Bash, Ruby,
                      Javascript/Typescript, HTML/CSS, SQL
                    </ListItem>
                    <ListItem>
                      Tools: Graphql, RabbitMQ, Nginx, Redis, Kubernetes/Docker,
                      TensorFlow, PyTorch, OpenAI API
                    </ListItem>
                    <ListItem>
                      Frameworks: Rails, React, Node.js, Django, Apache
                      Beam/Kafka/Avro, Telemetry
                    </ListItem>
                    <ListItem>
                      Platforms: GCS (AutoML, VertexAI); AWS (VPC, EC2, S3,
                      CloudFront, Lambda); MongoDB Atlas
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Collapse>
            </VStack>
          </Grid>
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
