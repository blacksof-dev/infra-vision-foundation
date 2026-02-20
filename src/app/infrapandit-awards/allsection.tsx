"use client";
import React, { useRef } from "react";
import PublicationTabs from "@/_components/molecules/tabs";
import AboutInfraPandit from "./02_about";
import Jury from "./03_jury";
import Gallery from "./05_gallery";
import Goal from "./04_goal";
type TabId = "about" | "jury" | "goal" | "gallery";

const tabs: { id: TabId; label: string }[] = [
  { id: "about", label: "About InfraPandit Awards" },
  { id: "jury", label: "The Jury" },
  { id: "goal", label: "The Goal" },
  { id: "gallery", label: "Gallery" },
];

export default function Knowledge() {
  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    about: useRef<HTMLDivElement | null>(null),
    jury: useRef<HTMLDivElement | null>(null),
    goal: useRef<HTMLDivElement | null>(null),
    gallery: useRef<HTMLDivElement | null>(null),
  };

  return (
    <main>
      <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
      <div id="about" ref={sectionRefs.about}>
        <AboutInfraPandit />
      </div>
      <div id="jury" ref={sectionRefs.jury}>
        <Jury />
      </div>
      <div id="goal" ref={sectionRefs.goal}>
        <Goal />
      </div>
      <div id="gallery" ref={sectionRefs.gallery}>
        <Gallery />
      </div>
    </main>
  );
}
