"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [["/me", "Home"], ["/me#projects", "Projects"], ["/books", "Reading"], ["/sips", "Siplogue"], ["/navigation", "Index"]] as const;

export default function SiteNavigation() {
  const pathname = usePathname();
  return <nav className="site-navigation" aria-label="Main navigation">
    {destinations.map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}>{label}</Link>)}
  </nav>;
}
