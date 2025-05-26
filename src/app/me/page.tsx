"use client";

import Image from "next/image";
import LorenzCanvas from "../../components/lorenz-canvas";
import NameHeader from "../../components/name-header";
import CollapsibleSection from "../../components/collapsible-section";
import SocialLinks from "../../components/social-links";
import ResumeSection from "../../components/resume-section";
import { resumeData } from "../../data/resume-data";
import { useCollapsibleSections } from "../../hooks/use-collapsible-sections";

export default function MePage() {
  const { isOpen, toggle } = useCollapsibleSections({
    education: false,
    experience: false,
    projects: false,
    skills: false,
    classes: false,
  });

  return (
    <main className="page-container">
      <LorenzCanvas />
      <title>Speaking of myself</title>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Content */}
        <div className="w-full lg:w-[40vw]">
          <NameHeader
            firstName="Yueheng"
            altFirstName="Alexander"
            lastName="Zhang"
          />

          {/* Details Grid */}
          <div className="flex flex-col gap-3 pt-10">
            {Object.entries(resumeData).map(([key, section]) => (
              <CollapsibleSection
                key={key}
                title={section.title}
                isOpen={isOpen(key)}
                onToggle={() => toggle(key)}
              >
                <ResumeSection items={section.items} />
              </CollapsibleSection>
            ))}
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
          <SocialLinks />
        </div>
      </div>
    </main>
  );
}
