import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Collapse,
  Button,
  Text,
  VStack,
  UnorderedList,
  ListItem,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import {
  pageStyles,
  headingNormalStyles,
  bodyRefStyles,
} from "../styles/global";
import { Link } from "gatsby";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
// @ts-ignore
import { renderCanvas } from "../components/renderCanvas";

const Me = () => {
  const [Hovered, setHovered] = useState("");
  const [show, setShow] = useState({
    education: false,
    experience: false,
    projects: false,
    skills: false,
    classes: false,
  });

  const handleToggle = (field: keyof typeof show) => {
    setShow({ ...show, [field]: !show[field] });
  };

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <main style={pageStyles}>
      TODO: Add a toggle for canvas
      <canvas
        style={{
          position: "absolute",
          pointerEvents: "none",
          inset: 0,
          zIndex: -1,
        }}
        id="canvas"
      />
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
          <Grid gridAutoFlow="row" gap={6} paddingTop={10}>
            <VStack align="start" spacing={2}>
              <Button variant="link" onClick={() => handleToggle("education")}>
                Education
              </Button>
              <Collapse in={show.education}>
                <Text
                  fontSize="sm"
                  fontFamily="Roboto, sans-serif"
                  fontWeight={"light"}
                >
                  <UnorderedList>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        University of California at Berkeley
                      </Text>{" "}
                      (2019 - 2024)
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        MS
                      </Text>
                      : Electrical Engineering and Computer Science
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        BA
                      </Text>
                      : Computer Science and Economics
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Research
                      </Text>
                      : RISELab, under Prof. Dawn Song on Decentralized
                      Intelligence
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
                <Text
                  fontSize="sm"
                  fontFamily="Roboto, sans-serif"
                  fontWeight="light"
                >
                  <UnorderedList>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Google
                      </Text>
                      , Software Engineering Intern (2022)
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Five9
                      </Text>
                      , Software Engineering Intern (2021)
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Snackpass.co
                      </Text>
                      , Full Stack Development Intern (2021)
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Berkeley EECS Dept.
                      </Text>
                      , Undergraduate Student Instructor (2021 – 2022)
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Collapse>
            </VStack>

            <VStack align="start" spacing={2}>
              <Button variant="link" onClick={() => handleToggle("projects")}>
                Personal Projects
              </Button>
              <Collapse in={show.projects}>
                <Text
                  fontSize="sm"
                  fontFamily="Roboto, sans-serif"
                  fontWeight="light"
                >
                  <UnorderedList>
                    <ListItem>
                      <Link to="https://www.lifewiki.xyz" style={bodyRefStyles}>
                        LifeWiki
                      </Link>
                      : a Web2.5 Social App (July 2022 – Present)
                    </ListItem>
                    <ListItem>
                      <Link to="https://www.colink.app" style={bodyRefStyles}>
                        Colink
                      </Link>
                      : an opensource decentralized programming abstraction
                      (Aug. 2022 – Present)
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Collapse>
            </VStack>

            <VStack align="start" spacing={2}>
              <Button variant="link" onClick={() => handleToggle("classes")}>
                Classes Taken
              </Button>
              <Collapse in={show.classes}>
                <Text
                  fontSize="sm"
                  fontFamily="Roboto, sans-serif"
                  fontWeight="light"
                >
                  <UnorderedList>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Computer Graphics
                      </Text>
                      :{" "}
                      <Link
                        to="https://cal-cs184-student.github.io/project-reports/"
                        style={bodyRefStyles}
                      >
                        Project Reports
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Comp Vision and Comp Photography
                      </Text>
                      :{" "}
                      <Link to="compvision" style={bodyRefStyles}>
                        Project Reports
                      </Link>
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Collapse>
            </VStack>

            {/* Skills */}
            <VStack align="start" spacing={2}>
              <Button variant="link" onClick={() => handleToggle("skills")}>
                Skills
              </Button>
              <Collapse in={show.skills}>
                <Text
                  fontSize="sm"
                  fontFamily="Roboto, sans-serif"
                  fontWeight="light"
                >
                  <UnorderedList>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Languages
                      </Text>
                      : Golang, Python, Rust, C/C++, Java, Bash, Ruby,
                      Javascript/Typescript, HTML/CSS, SQL
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Tools
                      </Text>
                      : Graphql, RabbitMQ, Nginx, Redis, Kubernetes/Docker,
                      TensorFlow, PyTorch, OpenAI API
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Frameworks
                      </Text>
                      : Rails, React, Node.js, Django, Apache Beam/Kafka/Avro,
                      Telemetry
                    </ListItem>
                    <ListItem>
                      <Text as="span" fontWeight="bold">
                        Platforms
                      </Text>
                      : GCS (AutoML, VertexAI); AWS (VPC, EC2, S3, CloudFront,
                      Lambda); MongoDB Atlas
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Collapse>
            </VStack>
          </Grid>
        </Grid>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <StaticImage
            alt="Alex Zhang"
            placeholder="blurred"
            src="../images/linkedin_pic_rounded.png"
            width={300}
            height={300}
          />
          <HStack spacing={3} paddingTop={5}>
            <IconButton
              as={Link}
              //@ts-ignore
              href="https://github.com/nociza"
              aria-label="GitHub"
              icon={<FaGithub />}
              rounded={"full"}
            />
            <IconButton
              as={Link}
              //@ts-ignore
              href="https://www.linkedin.com/in/azicon/"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              rounded={"full"}
            />
            <IconButton
              as={Link}
              //@ts-ignore
              href="https://twitter.com/nociza68"
              aria-label="Twitter"
              icon={<FaTwitter />}
              rounded={"full"}
            />
            <IconButton
              as={Link}
              //@ts-ignore
              href="https://www.instagram.com/nociza/"
              aria-label="Instagram"
              icon={<FaInstagram />}
              rounded={"full"}
            />
            {/* Add more social media icons as needed */}
          </HStack>
        </Box>
      </Grid>
    </main>
  );
};

export default Me;
