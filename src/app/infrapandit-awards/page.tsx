"use client";
import React, { useRef } from 'react'
import InfraPanditBanner from './01_banner'
import AboutInfraPandit from './02_about';
import Jury from './03_jury';
import InfraPanditTabs from './tabs';
import Goal from './04_goal';
import './page.css'
import Gallery from './05_gallery';
import Involved from './06_involved';

type TabId = 'about' | 'jury' | 'goal'  | 'gallery';

const InfraPandit = () => {

    const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
        about: useRef<HTMLDivElement | null>(null),
        jury: useRef<HTMLDivElement | null>(null),
        goal: useRef<HTMLDivElement | null>(null),
        gallery: useRef<HTMLDivElement | null>(null),
    };

  return (
    <>
        <InfraPanditBanner />
        <InfraPanditTabs sectionRefs={sectionRefs} />
        <div id='about' ref={sectionRefs.about}>
          <AboutInfraPandit />
        </div>
        <div id='jury' ref={sectionRefs.jury}>
          <Jury />
        </div>
        <div id='goal' ref={sectionRefs.goal}>
          <Goal />
        </div>
        <div id='gallery' ref={sectionRefs.gallery}>
          <Gallery />
        </div>
        <Involved />
    </>
  )
}

export default InfraPandit