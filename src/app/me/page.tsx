"use client";

import dynamic from "next/dynamic";
import DeferredSection from "../../components/deferred-section";
import NameHeader from "../../components/name-header";
import SocialLinks from "../../components/social-links";
import ResumeSection from "../../components/resume-section";
import NavigationArrows from "../../components/navigation-arrows";
import ProfilePicture from "../../components/profile-picture";
import ProjectsSection from "../../components/projects-section";
import { resumeData } from "../../data/resume-data";
import { useSectionObserver } from "../../hooks/use-section-observer";
import { useScrollSnap } from "../../hooks/use-scroll-snap";
import { useSwipe } from "../../hooks/use-swipe";

const LorenzCanvas = dynamic(() => import("../../components/lorenz-canvas"), {
  ssr: false,
});

const CoffeeSection = dynamic(() => import("../../components/coffee-section"), {
  loading: () => (
    <SectionPlaceholder
      title="Coffee Discovery"
      description="Loading the latest brews."
    />
  ),
});

const BooksSection = dynamic(() => import("../../components/books-section"), {
  loading: () => (
    <SectionPlaceholder
      title="Currently Reading"
      description="Loading the active reading stack."
    />
  ),
});

function SectionPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center page-container">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 font-serif">{title}</h2>
        <p className="mt-3 text-lg text-gray-600 font-inconsolata">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function MePage() {
  const { currentAttractor, currentSection } = useSectionObserver();
  const scrollContainerRef = useScrollSnap();

  const sections = ["resume", "projects", "coffee", "books"];

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
      projects: null, // The gallery is already the full project view
      coffee: "/coffee",
      books: "/books",
      // music: "/music", // Temporarily hidden
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
          currentSection === "coffee" || currentSection === "books"
            ? handleSwipeRight
            : undefined
        }
      />

      <div ref={scrollContainerRef} className="scroll-container">
        {/* Resume Section */}
        <section id="resume" className="scroll-section">
          <main className="page-container resume-container">
            <div className="resume-grid grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left Column - Content */}
              <div className="w-full lg:w-[40vw]">
                <NameHeader
                  firstName="Yueheng"
                  altFirstName="Alexander"
                  lastName="Zhang"
                />

                {/* Résumé details */}
                <div className="flex flex-col gap-5 pt-8">
                  {Object.entries(resumeData).map(([key, section]) => (
                    <section
                      key={key}
                      aria-labelledby={`resume-${key}-heading`}
                      className="w-full max-w-xl"
                    >
                      <h2
                        id={`resume-${key}-heading`}
                        className="mb-2 font-medium text-neutral-800"
                      >
                        {section.title}
                      </h2>
                      <div className="pr-6 text-sm font-light leading-6 font-inconsolata">
                        <ResumeSection items={section.items} />
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              {/* Right Column - Image and Social Links */}
              <div className="resume-profile-column flex flex-col items-center justify-center">
                <ProfilePicture size={300} className="resume-portrait" />
                <SocialLinks />
              </div>
            </div>
          </main>
        </section>

        {/* Projects Section */}
        <section id="projects" aria-labelledby="projects-heading" className="scroll-section">
          <ProjectsSection />
        </section>

        {/* Coffee Section */}
        <section id="coffee" className="scroll-section">
          <DeferredSection
            fallback={
              <SectionPlaceholder
                title="Coffee Discovery"
                description="Loading the latest brews."
              />
            }
          >
            <CoffeeSection />
          </DeferredSection>
        </section>

        {/* Books Section */}
        <section id="books" className="scroll-section">
          <DeferredSection
            fallback={
              <SectionPlaceholder
                title="Currently Reading"
                description="Loading the active reading stack."
              />
            }
          >
            <BooksSection />
          </DeferredSection>
        </section>

        {/* Music Section - Temporarily Hidden */}
        {/* <section id="music" className="scroll-section">
          <MusicSection />
        </section> */}
      </div>
    </div>
  );
}
