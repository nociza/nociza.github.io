import Link from "next/link";
import {
  Github,
  Instagram,
  Linkedin,
  LucideIcon,
  Twitter,
} from "lucide-react";

interface SocialLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/nociza",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/azicon/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://twitter.com/nociza68",
    label: "Twitter",
    icon: Twitter,
  },
  {
    href: "https://www.instagram.com/nociza/",
    label: "Instagram",
    icon: Instagram,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-col items-center pt-5">
      <div className="flex gap-3">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <Icon size={20} strokeWidth={1.75} />
          </Link>
        ))}
      </div>
      <p className="mt-2 max-w-xs text-center font-inconsolata text-xs leading-5 text-gray-500">
        Tea and coffee notes are published with{" "}
        <a
          href="https://github.com/nociza/siplogue"
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap text-gray-700 underline decoration-gray-300 underline-offset-4 transition hover:text-gray-950 hover:decoration-gray-500"
        >
          Sip ↗
        </a>
        , an open-source photo-to-journal skill.
      </p>
      <a
        href="https://www.goodreads.com/user/show/84703211-alex-zhang"
        target="_blank"
        rel="noreferrer"
        className="mt-1 font-inconsolata text-xs text-gray-500 underline decoration-gray-300 underline-offset-4 transition hover:text-gray-950 hover:decoration-gray-500"
      >
        Reading on Goodreads ↗
      </a>
    </div>
  );
}
