"use client";
import React, { useRef } from "react";
import BannerSection from "./01_banner";
import Overview from "./02_overview";
import Ceremony from "./04_ceremony";
import Luminaries from "./05_luminaries";
import Gallery from "./06_gallery";
import GetInvolved from "./07_getInvolved";
import Spotlight from "./03_spotlight";
import PublicationTabs from "@/_components/molecules/tabs";

type TabId = "overview" | "spotlight" | "ceremony" | "luminaries" | "gallery";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "spotlight", label: "The InfraShakti Awardees" },
  { id: "ceremony", label: "Snippets from the Ceremony" },
  { id: "luminaries", label: "The Luminaries" },
  { id: "gallery", label: "Gallery" },
];

export default function InfraShakti() {
  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    overview: useRef<HTMLDivElement | null>(null),
    spotlight: useRef<HTMLDivElement | null>(null),
    ceremony: useRef<HTMLDivElement | null>(null),
    luminaries: useRef<HTMLDivElement | null>(null),
    gallery: useRef<HTMLDivElement | null>(null),
  };

  return (
    <>
      <BannerSection />
      <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
      <div id="overview" ref={sectionRefs.overview}>
        <Overview />
      </div>

      <div id="spotlight" ref={sectionRefs.spotlight}>
        <Spotlight />
      </div>

      <div id="ceremony" ref={sectionRefs.ceremony}>
        <Ceremony />
      </div>

      <div id="luminaries" ref={sectionRefs.luminaries}>
        <Luminaries />
      </div>

      <div id="gallery" ref={sectionRefs.gallery}>
        <Gallery />
      </div>
      <GetInvolved />
    </>
  );
}
