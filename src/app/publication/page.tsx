"use client";
import { useRef } from "react";
import PublicationBanner from "./01_banner";
import ReserachPaper from "./02_research";
import WhitePaper from "./03_whitePaper";
import Insights from "./04_newsletter";
import InfravisionTalk from "./05_infravisionTalk";
import Permission from "./06_permission";
import PublicationTabs from "./tabs";

type TabId = 'research' | 'whitepapers' | 'newsletters';

export default function Publication() {

  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    research: useRef<HTMLDivElement | null>(null),
    whitepapers: useRef<HTMLDivElement | null>(null),
    newsletters: useRef<HTMLDivElement | null>(null),
  };

  const otherSectionRefs = [
    useRef<HTMLDivElement | null>(null), 
    useRef<HTMLDivElement | null>(null), 
  ];

  return (
    <>
      <PublicationBanner />
      <PublicationTabs sectionRefs={sectionRefs} />


      <div id="research" ref={sectionRefs.research}>
        <ReserachPaper />
      </div>

      <div id="whitepapers" ref={sectionRefs.whitepapers}>
        <WhitePaper />
      </div>

      <div id="newsletters" ref={sectionRefs.newsletters}>
        <Insights />
      </div>

      <div ref={otherSectionRefs[0]}>
        <InfravisionTalk />
      </div>

      <div ref={otherSectionRefs[1]}>
        <Permission />
      </div>
    </>
  );
}
