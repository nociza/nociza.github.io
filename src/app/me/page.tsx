"use client";

import Image from "next/image";
import LorenzCanvas from "../../components/lorenz-canvas";
import NameHeader from "../../components/name-header";
import CollapsibleSection from "../../components/collapsible-section";
import SocialLinks from "../../components/social-links";
import ResumeSection from "../../components/resume-section";
import CoffeeSection from "../../components/coffee-section";
import BooksSection from "../../components/books-section";
import MusicSection from "../../components/music-section";
import NavigationArrows from "../../components/navigation-arrows";
import { resumeData } from "../../data/resume-data";
import { useCollapsibleSections } from "../../hooks/use-collapsible-sections";
import { useSectionObserver } from "../../hooks/use-section-observer";
import { useScrollSnap } from "../../hooks/use-scroll-snap";
import { useSwipe } from "../../hooks/use-swipe";

export default function MePage() {
  const { isOpen, toggle } = useCollapsibleSections({
    education: false,
    experience: false,
    projects: false,
    skills: false,
    classes: false,
  });

  const { currentAttractor, currentSection } = useSectionObserver();
  const scrollContainerRef = useScrollSnap();

  const sections = ["resume", "coffee", "books", "music"];

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleNavigate = (direction: "up" | "down") => {
    const currentIndex = sections.findIndex(
      (section) => section === currentSection
    );
    let targetIndex: number;

    if (direction === "down" && currentIndex < sections.length - 1) {
      targetIndex = currentIndex + 1;
    } else if (direction === "up" && currentIndex > 0) {
      targetIndex = currentIndex - 1;
    } else {
      return;
    }

    handleSectionClick(sections[targetIndex]);
  };

  const handleSwipeRight = () => {
    // Navigate to the appropriate archive page based on current section
    const archiveRoutes = {
      resume: null, // No archive for resume
      coffee: "/coffee",
      books: "/books",
      music: "/music",
    };

    const route = archiveRoutes[currentSection as keyof typeof archiveRoutes];
    if (route) {
      window.location.href = route;
    }
  };

  // Add swipe gesture support
  useSwipe({
    onSwipeRight: currentSection !== "resume" ? handleSwipeRight : undefined,
    onSwipeUp: () => {
      const currentIndex = sections.findIndex(
        (section) => section === currentSection
      );
      if (currentIndex > 0) {
        handleSectionClick(sections[currentIndex - 1]);
      }
    },
    onSwipeDown: () => {
      const currentIndex = sections.findIndex(
        (section) => section === currentSection
      );
      if (currentIndex < sections.length - 1) {
        handleSectionClick(sections[currentIndex + 1]);
      }
    },
  });

  return (
    <div className="relative">
      <LorenzCanvas attractorType={currentAttractor} />

      <NavigationArrows
        currentSection={currentSection}
        sections={sections}
        onNavigate={handleNavigate}
        onSwipeRight={
          currentSection !== "resume" ? handleSwipeRight : undefined
        }
      />

      <div ref={scrollContainerRef} className="scroll-container">
        {/* Resume Section */}
        <section id="resume" className="scroll-section">
          <main className="page-container">
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
        </section>

        {/* Coffee Section */}
        <section id="coffee" className="scroll-section">
          <CoffeeSection />
        </section>

        {/* Books Section */}
        <section id="books" className="scroll-section">
          <BooksSection />
        </section>

        {/* Music Section */}
        <section id="music" className="scroll-section">
          <MusicSection />
        </section>
      </div>
    </div>
  );
}
