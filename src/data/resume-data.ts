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
        title: "KaonLabs",
        subtitle: "Researcher (2026 - Present)",
        link: {
          url: "https://www.kaonlabs.com/",
          text: "KaonLabs",
        },
      },
      {
        title: "TikTok",
        subtitle: "Software Engineer (2024 - 2026)",
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
};
