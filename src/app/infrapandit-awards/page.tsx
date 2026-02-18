"use client";
import React, { useRef } from "react";
import InfraPanditBanner from "./01_banner";
import AboutInfraPandit from "./02_about";
import Jury from "./03_jury";
import PublicationTabs from "@/_components/molecules/tabs";

import Goal from "./04_goal";

import Gallery from "./05_gallery";
import Involved from "./06_involved";
import Spotlight from "./spotlight";
import InfraPanditAward from "./award";

type TabId = "about" | "jury" | "goal" | "award" | "spotlight" | "gallery";

const tabs: { id: TabId; label: string }[] = [
  { id: "about", label: "About InfraPandit Awards" },
  { id: "jury", label: "The Jury" },
  { id: "goal", label: "The Goal" },
  { id: "gallery", label: "Gallery" },
  { id: "spotlight", label: "Spotlight" },
  { id: "award", label: "Award" },
];

const InfraPandit = () => {
  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    about: useRef<HTMLDivElement | null>(null),
    jury: useRef<HTMLDivElement | null>(null),
    goal: useRef<HTMLDivElement | null>(null),
    gallery: useRef<HTMLDivElement | null>(null),
    spotlight: useRef<HTMLDivElement | null>(null),
    award: useRef<HTMLDivElement | null>(null),
  };

  return (
    <>
      <InfraPanditBanner />
      <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
      <div id="about" ref={sectionRefs.about}>
        <AboutInfraPandit />
      </div>

      <div id="goal" ref={sectionRefs.goal}>
        <Goal />
      </div>
      <div id="award" ref={sectionRefs.award}>
        <InfraPanditAward />
      </div>
      <div id="spotlight" ref={sectionRefs.spotlight}>
        <Spotlight />
      </div>
      <div id="jury" ref={sectionRefs.jury}>
        <Jury />
      </div>
      <div id="gallery" ref={sectionRefs.gallery}>
        <Gallery />
      </div>
      <Involved />
    </>
  );
};

export default InfraPandit;
