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
    <div className="flex gap-3 pt-5">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Icon size={20} strokeWidth={1.75} />
        </Link>
      ))}
    </div>
  );
}
