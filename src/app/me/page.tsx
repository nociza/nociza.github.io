"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import LorenzCanvas from "../../components/lorenz-canvas";

export default function MePage() {
  const [hovered, setHovered] = useState("");
  const [show, setShow] = useState({
    education: true,
    experience: true,
    projects: true,
    skills: true,
    classes: true,
  });

  const handleToggle = (field: keyof typeof show) => {
    setShow({ ...show, [field]: !show[field] });
  };

  return (
    <main className="page-container">
      <LorenzCanvas />
      <title>Speaking of myself</title>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Content */}
        <div className="w-full lg:w-[40vw]">
          <div
            className="w-full lg:w-[40vw] cursor-pointer transition-all duration-300"
            style={{
              color:
                hovered === "Alex"
                  ? "rgba(255, 168, 68, 0.8)"
                  : "rgba(68, 68, 68, 0.9)",
              fontFamily:
                hovered === "Alex"
                  ? "'Playfair Display', 'Dancing Script', 'Brush Script MT', cursive"
                  : "'Inconsolata', 'Fira Code', monospace",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: hovered === "Alex" ? "normal" : "700",
              fontStyle: hovered === "Alex" ? "italic" : "normal",
              maxWidth: "68%",
              letterSpacing: hovered === "Alex" ? "0.05em" : "-0.02em",
              textShadow:
                hovered === "Alex"
                  ? "2px 2px 8px rgba(255, 168, 68, 0.4)"
                  : "2px 2px 4px rgba(0, 0, 0, 0.1)",
              transform:
                hovered === "Alex" ? "translateY(-2px)" : "translateY(0)",
              lineHeight: "1.1",
            }}
            onMouseEnter={() => setHovered("Alex")}
            onMouseLeave={() => setHovered("")}
          >
            {hovered === "Alex" ? "Alexander" : "Yueheng"}
          </div>
          <div
            className="heading-normal"
            style={{
              color: "rgba(68, 68, 68, 0.9)",
              fontFamily: "'Inconsolata', 'Fira Code', monospace",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: "700",
              maxWidth: "68%",
              letterSpacing: "-0.02em",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              lineHeight: "1.1",
            }}
          >
            Zhang
          </div>

          {/* Details Grid */}
          <div className="flex flex-col gap-6 pt-10">
            {/* Education */}
            <div className="flex flex-col items-start gap-2">
              <button
                className="text-left underline hover:no-underline transition-all"
                onClick={() => handleToggle("education")}
              >
                Education
              </button>
              {show.education && (
                <div className="text-sm font-light font-roboto">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span className="font-bold">
                        University of California at Berkeley
                      </span>{" "}
                      (2019 - 2024)
                    </li>
                    <li>
                      <span className="font-bold">MS</span>: Electrical
                      Engineering and Computer Science
                    </li>
                    <li>
                      <span className="font-bold">BA</span>: Computer Science
                      and Economics
                    </li>
                    <li>
                      <span className="font-bold">Research</span>: RISELab,
                      under Prof. Dawn Song on Decentralized Intelligence
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Work Experience */}
            <div className="flex flex-col items-start gap-2">
              <button
                className="text-left underline hover:no-underline transition-all"
                onClick={() => handleToggle("experience")}
              >
                Work Experience
              </button>
              {show.experience && (
                <div className="text-sm font-light font-roboto">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span className="font-bold">Google</span>, Software
                      Engineering Intern (2022)
                    </li>
                    <li>
                      <span className="font-bold">Five9</span>, Software
                      Engineering Intern (2021)
                    </li>
                    <li>
                      <span className="font-bold">Snackpass.co</span>, Full
                      Stack Development Intern (2021)
                    </li>
                    <li>
                      <span className="font-bold">Berkeley EECS Dept.</span>,
                      Undergraduate Student Instructor (2021 – 2022)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Personal Projects */}
            <div className="flex flex-col items-start gap-2">
              <button
                className="text-left underline hover:no-underline transition-all"
                onClick={() => handleToggle("projects")}
              >
                Personal Projects
              </button>
              {show.projects && (
                <div className="text-sm font-light font-roboto">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <Link href="https://www.labotr.com" className="body-ref">
                        Labotr
                      </Link>
                      : The first labor market for AI agents (Sept. 2023 –
                      Present)
                    </li>
                    <li>
                      <Link
                        href="https://www.lifewiki.xyz"
                        className="body-ref"
                      >
                        LifeWiki
                      </Link>
                      : a Web2.5 Social App (July 2022 – Present)
                    </li>
                    <li>
                      <Link href="https://www.colink.app" className="body-ref">
                        Colink
                      </Link>
                      : an opensource decentralized programming abstraction
                      (Aug. 2022 – Present)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Classes Taken */}
            <div className="flex flex-col items-start gap-2">
              <button
                className="text-left underline hover:no-underline transition-all"
                onClick={() => handleToggle("classes")}
              >
                Classes Taken
              </button>
              {show.classes && (
                <div className="text-sm font-light font-roboto">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span className="font-bold">Computer Graphics</span>:{" "}
                      <Link
                        href="https://cal-cs184-student.github.io/project-reports/"
                        className="body-ref"
                      >
                        Project Reports
                      </Link>
                    </li>
                    <li>
                      <span className="font-bold">
                        Comp Vision and Comp Photography
                      </span>
                      :{" "}
                      <Link href="/compvision" className="body-ref">
                        Project Reports
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-col items-start gap-2">
              <button
                className="text-left underline hover:no-underline transition-all"
                onClick={() => handleToggle("skills")}
              >
                Skills
              </button>
              {show.skills && (
                <div className="text-sm font-light font-roboto">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <span className="font-bold">Languages</span>: Golang,
                      Python, Rust, C/C++, Java, Bash, Ruby,
                      Javascript/Typescript, HTML/CSS, SQL
                    </li>
                    <li>
                      <span className="font-bold">Tools</span>: Graphql,
                      RabbitMQ, Nginx, Redis, Kubernetes/Docker, TensorFlow,
                      PyTorch, OpenAI API
                    </li>
                    <li>
                      <span className="font-bold">Frameworks</span>: Rails,
                      React, Node.js, Django, Apache Beam/Kafka/Avro, Telemetry
                    </li>
                    <li>
                      <span className="font-bold">Platforms</span>: GCS (AutoML,
                      VertexAI); AWS (VPC, EC2, S3, CloudFront, Lambda); MongoDB
                      Atlas
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Image and Social Links */}
        <div className="flex flex-col items-center justify-center">
          <Image
            alt="Alex Zhang"
            src="/linkedin_pic_rounded.png"
            width={300}
            height={300}
            className="rounded-full"
            priority
          />
          <div className="flex gap-3 pt-5">
            <Link
              href="https://github.com/nociza"
              aria-label="GitHub"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/azicon/"
              aria-label="LinkedIn"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link
              href="https://twitter.com/nociza68"
              aria-label="Twitter"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTwitter size={24} />
            </Link>
            <Link
              href="https://www.instagram.com/nociza/"
              aria-label="Instagram"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaInstagram size={24} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
