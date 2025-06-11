'use client'
import { useRef } from "react";
import BannerSection from "./01_banner";
import About from "./02_about";
import UpcomingSession from "./03_upcomingSession";
import PastEvents from "./04_past";
import GetInvolvedSection from "./05_getInvolved";
import PublicationTabs from "../../_components/molecules/tabs";

type TabId = "about" | "upcoming" | "past";

const tabs: { id: TabId; label: string }[] = [
    { id: "about", label: "About InfraKatha" },
    { id: "upcoming", label: "Upcoming sessions" },
    { id: "past", label: "Past sessions" },
];


export default function page() {
    const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
        about: useRef<HTMLDivElement | null>(null),
        upcoming: useRef<HTMLDivElement | null>(null),
        past: useRef<HTMLDivElement | null>(null),
    };

    return (
        <>
            <BannerSection />
            <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
            <div ref={sectionRefs.about}>
                <About />
            </div>
            <div ref={sectionRefs.upcoming}>
                <UpcomingSession />
            </div>
            <div ref={sectionRefs.past}>
                <PastEvents />
            </div>
            <GetInvolvedSection />
        </>
    )
}
