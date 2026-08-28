import Link from "next/link";
import { ResumeItem } from "../data/resume-data";

interface ResumeSectionProps {
  items: ResumeItem[];
}

export default function ResumeSection({ items }: ResumeSectionProps) {
  return (
    <ul className="list-disc list-inside space-y-1">
      {items.map((item, index) => (
        <li key={index}>
          {item.link && item.title === item.link.text ? (
            <Link
              href={item.link.url}
              target={item.link.url.startsWith("http") ? "_blank" : undefined}
              rel={item.link.url.startsWith("http") ? "noreferrer" : undefined}
              className="body-ref"
            >
              {item.link.text}
            </Link>
          ) : (
            <span className="font-bold">{item.title}</span>
          )}
          {item.period && ` ${item.period}`}
          {item.subtitle && item.title !== item.subtitle && <>: {item.subtitle}</>}
          {item.link && item.title !== item.link.text && (
            <>
              :{" "}
              <Link
                href={item.link.url}
                target={item.link.url.startsWith("http") ? "_blank" : undefined}
                rel={item.link.url.startsWith("http") ? "noreferrer" : undefined}
                className="body-ref"
              >
                {item.link.text}
              </Link>
            </>
          )}
          {item.description && <>: {item.description}</>}
        </li>
      ))}
    </ul>
  );
}
