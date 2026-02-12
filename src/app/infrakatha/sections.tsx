"use client";
import { useRef } from "react";

import About from "./02_about";

import PastEvents from "./04_past";

import PublicationTabs from "@/_components/molecules/tabs";

type TabId = "about" | "upcoming" | "past";

const tabs: { id: TabId; label: string }[] = [
  { id: "about", label: "About Infrakatha" },
  // { id: "upcoming", label: "Upcoming sessions" },
  { id: "past", label: "Past Sessions" },
];

export default function Section() {
  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    about: useRef<HTMLDivElement | null>(null),
    upcoming: useRef<HTMLDivElement | null>(null),
    past: useRef<HTMLDivElement | null>(null),
  };

  return (
    <div>
      <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
      <div ref={sectionRefs.about}>
        <About />
      </div>
      {/* <div ref={sectionRefs.upcoming}>
                <UpcomingSession />
            </div> */}
      <div ref={sectionRefs.past}>
        <PastEvents />
      </div>
    </div>
  );
}
