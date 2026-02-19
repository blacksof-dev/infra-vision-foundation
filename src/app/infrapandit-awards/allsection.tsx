"use client";
import React, { useRef } from "react";
import AboutInfraPandit from "./02_about";
import Jury from "./03_jury";
import PublicationTabs from "@/_components/molecules/tabs";

import Goal from "./04_goal";

import Gallery from "./05_gallery";
 

type TabId = "about" | "jury" | "goal" | "gallery";

const tabs: { id: TabId; label: string }[] = [
  { id: "about", label: "About InfraPandit Awards" },
  { id: "jury", label: "The Jury" },
  { id: "goal", label: "The Goal" },
  { id: "gallery", label: "Gallery" },
];

const Sections = () => {
  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    about: useRef<HTMLDivElement | null>(null),
    jury: useRef<HTMLDivElement | null>(null),
    goal: useRef<HTMLDivElement | null>(null),
    gallery: useRef<HTMLDivElement | null>(null),
  };

  return (
    <>
      <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
      <div id="about">
        <AboutInfraPandit />
      </div>
      <div id="jury">
        <Jury />
      </div>
      <div id="goal">
        <Goal />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
    </>
  );
};

export default Sections;
