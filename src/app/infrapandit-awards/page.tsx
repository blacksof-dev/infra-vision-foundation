"use client";
import React, { useRef } from 'react'
import InfraPanditBanner from './01_banner'
import AboutInfraPandit from './02_about';
import Jury from './03_jury';
import PublicationTabs from "@/_components/molecules/tabs";

import Goal from './04_goal';

import Gallery from './05_gallery';
import Involved from './06_involved';

type TabId = 'about' | 'jury' | 'goal';


const tabs: { id: TabId; label: string }[] = [
  { id: "about", label: "About InfraPandit Awards" },
  { id: "jury", label: "The jury" },
  { id: "goal", label: "The goal" },
];

const InfraPandit = () => {

  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    about: useRef<HTMLDivElement | null>(null),
    jury: useRef<HTMLDivElement | null>(null),
    goal: useRef<HTMLDivElement | null>(null),
    // gallery: useRef<HTMLDivElement | null>(null),
  };

  return (
    <>
      <InfraPanditBanner />
      <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
      <div id='about' ref={sectionRefs.about}>
        <AboutInfraPandit />
      </div>
      <div id='jury' ref={sectionRefs.jury}>
        <Jury />
      </div>
      <div id='goal' ref={sectionRefs.goal}>
        <Goal />
      </div>
      {/* <div id='gallery' ref={sectionRefs.gallery}>
        <Gallery />
      </div> */}
      <Involved />
    </>
  )
}

export default InfraPandit