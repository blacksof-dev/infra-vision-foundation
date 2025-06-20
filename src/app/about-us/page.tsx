"use client";
import React, { useRef } from 'react'
import AboutUsBanner from './01_banner'
import WhoWeAre from './02_who_we_are';
import PublicationTabs from "@/_components/molecules/tabs";
import Infravisionaries from './03_infravisionaries';
import VisionMission from './04_vision_mission';
import './page.css'
import Pulse from './05_pulse';
import Pathway from './06_pathway';
import Involved from './07_involved';


type TabId = 'who_we_are' | 'infravisionaries' | 'vision_and_mission' | 'our_pulse' | 'project_pathway';

const tabs: { id: TabId; label: string }[] = [
  { id: "who_we_are", label: "Who we are" },
  { id: "infravisionaries", label: "The Infravisionaries" },
  { id: "vision_and_mission", label: "Vision and Mission" },
  { id: "our_pulse", label: "Our Foundational Pillars" },
  { id: "project_pathway", label: "The project pathway" },
];


const AboutUs = () => {

    const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
        who_we_are: useRef<HTMLDivElement | null>(null),
        infravisionaries: useRef<HTMLDivElement | null>(null),
        vision_and_mission: useRef<HTMLDivElement | null>(null),
        our_pulse: useRef<HTMLDivElement | null>(null),
        project_pathway: useRef<HTMLDivElement | null>(null),
    };

  return (
    <>
        <AboutUsBanner />
        <PublicationTabs tabs={tabs}  sectionRefs={sectionRefs} />
        <div id='who_we_are' ref={sectionRefs.who_we_are}>
            <WhoWeAre />
        </div>
        <div id='infravisionaries' ref={sectionRefs.infravisionaries}>
            <Infravisionaries />
        </div>
        <div id='vision_and_mission' ref={sectionRefs.vision_and_mission}>
            <VisionMission />
        </div>
        <div id='our-pulse' ref={sectionRefs.our_pulse}>
            <Pulse />
        </div>
        <div id='project-pathway' ref={sectionRefs.project_pathway}>
            <Pathway />
        </div>
        <Involved />
    </>
  )
}

export default AboutUs