"use client";
import React, { useRef } from 'react'
import OutreachBanner from './01_Banner'
import PublicationTabs from './tabs'
import Highlight from './02_highlight';
import Upcoming from './03_upcoming';
import Past from './04_past';
import Involved from './05_involved';

type TabId = 'highlight' | 'upcoming' | 'past';

const OutreachAndEngagements = () => {

  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    highlight: useRef<HTMLDivElement | null>(null),
    upcoming: useRef<HTMLDivElement | null>(null),
    past: useRef<HTMLDivElement | null>(null),
  };
  
  const otherSectionRefs = [
    useRef<HTMLDivElement | null>(null), 
    useRef<HTMLDivElement | null>(null), 
  ];

  return (
    <>
      <OutreachBanner />
      <PublicationTabs sectionRefs={sectionRefs} />
      <div id="highlight" ref={sectionRefs.highlight}>
        <Highlight />
      </div>
      <div id='upcoming' ref={sectionRefs.upcoming}>
        <Upcoming />
      </div>
      <div id='past' ref={sectionRefs.past}>
        <Past />
      </div>
      <Involved />
    </>
  )
}

export default OutreachAndEngagements