import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/nociza",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://www.linkedin.com/in/azicon/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://twitter.com/nociza68",
    label: "Twitter",
    icon: FaTwitter,
  },
  {
    href: "https://www.instagram.com/nociza/",
    label: "Instagram",
    icon: FaInstagram,
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
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Icon size={24} />
        </Link>
      ))}
    </div>
  );
}
