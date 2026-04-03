export interface ResumeSection {
    title: string;
    items: ResumeItem[];
}

export interface ResumeItem {
    title: string;
    subtitle?: string;
    description?: string;
    link?: {
        url: string;
        text: string;
    };
    period?: string;
}

export const resumeData: Record<string, ResumeSection> = {
    education: {
        title: "Education",
        items: [
            {
                title: "University of California at Berkeley",
                period: "(2019 - 2024)",
            },
            {
                title: "MS",
                subtitle: "Electrical Engineering and Computer Science",
            },
            {
                title: "BA",
                subtitle: "Computer Science and Economics",
            },
            {
                title: "Research",
                subtitle: "RISELab, under Prof. Dawn Song on Decentralized Intelligence",
            },
        ],
    },
    experience: {
        title: "Work Experience",
        items: [
            {
                title: "TikTok",
                subtitle: "Software Engineer (2024 - Present)",
            },
            {
                title: "Google",
                subtitle: "Software Engineering Intern (2022)",
            },
            {
                title: "Five9",
                subtitle: "Software Engineering Intern (2021)",
            },
            {
                title: "Snackpass.co",
                subtitle: "Full Stack Development Intern (2021)",
            },
            {
                title: "Berkeley EECS Dept.",
                subtitle: "Undergraduate Student Instructor (2021 – 2022)",
            },
        ],
    },
    projects: {
        title: "Current Projects",
        items: [
            {
                title: "cuti",
                description: "Provider-aware AI dev environment for containerized coding, multi-agent orchestration, auth wiring, and operator tooling.",
                link: {
                    url: "https://github.com/nociza/cuti",
                    text: "cuti",
                },
            },
            {
                title: "clawie",
                description: "Central control plane for isolated claws, shared addons, provider cutovers, and runtime supervision.",
                link: {
                    url: "https://github.com/nociza/clawie",
                    text: "clawie",
                },
            },
            {
                title: "OmniView",
                description: "Self-hosted machine control plane with a hub, native client, and host agents for telemetry and remote launch workflows.",
                link: {
                    url: "https://github.com/nociza/OmniView",
                    text: "OmniView",
                },
            },
            {
                title: "TSMC",
                description: "Local-first second brain for AI chats with active work across auth, dashboards, CLI/service flows, search, and graph APIs.",
                link: {
                    url: "https://github.com/nociza/tsmc",
                    text: "TSMC",
                },
            },
        ],
    },
    classes: {
        title: "Course Projects",
        items: [
            {
                title: "Computer Graphics",
                link: {
                    url: "https://cal-cs184-student.github.io/project-reports/",
                    text: "Project Reports",
                },
            },
            {
                title: "Comp Vision and Comp Photography",
                link: {
                    url: "/compvision",
                    text: "Project Reports",
                },
            },
        ],
    },
    skills: {
        title: "Skills",
        items: [
            {
                title: "Languages",
                subtitle: "Golang, Python, Rust, C/C++, Java, Bash, Ruby, Javascript/Typescript, HTML/CSS, SQL",
            },
            {
                title: "Tools",
                subtitle: "Graphql, RabbitMQ, Nginx, Redis, Kubernetes/Docker, TensorFlow, PyTorch, OpenAI API",
            },
            {
                title: "Frameworks",
                subtitle: "Rails, React, Node.js, Django, Apache Beam/Kafka/Avro, Telemetry",
            },
            {
                title: "Platforms",
                subtitle: "GCS (AutoML, VertexAI); AWS (VPC, EC2, S3, CloudFront, Lambda); MongoDB Atlas",
            },
        ],
    },
}; 
