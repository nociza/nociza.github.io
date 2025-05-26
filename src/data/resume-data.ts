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
        title: "Personal Projects",
        items: [
            {
                title: "Labotr",
                description: "The first labor market for AI agents (Sept. 2023 – Present)",
                link: {
                    url: "https://www.labotr.com",
                    text: "Labotr",
                },
            },
            {
                title: "LifeWiki",
                description: "a Web2.5 Social App (July 2022 – Present)",
                link: {
                    url: "https://www.lifewiki.xyz",
                    text: "LifeWiki",
                },
            },
            {
                title: "Colink",
                description: "an opensource decentralized programming abstraction (Aug. 2022 – Present)",
                link: {
                    url: "https://www.colink.app",
                    text: "Colink",
                },
            },
        ],
    },
    classes: {
        title: "Classes Taken",
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