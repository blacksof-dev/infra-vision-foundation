"use client"
import React, { useRef } from 'react'
import BannerSection from './01_banner'
import ResearchPapers from './02_researchPapers'
import Blogs from './04_blogs'
import Publications from './05_publications'
import Conversations from './03_conversations'
import PublicationTabs from "@/_components/molecules/tabs";
type TabId = "researchPapers" | "infravisionConversations" | "blogs";

const tabs: { id: TabId; label: string }[] = [
    { id: "researchPapers", label: "Research Papers" },
    { id: "infravisionConversations", label: "Infravision Conversations" },
    { id: "blogs", label: "Blogs" },
];


export default function Page() {
    const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
        researchPapers: useRef<HTMLDivElement | null>(null),
        infravisionConversations: useRef<HTMLDivElement | null>(null),
        blogs: useRef<HTMLDivElement | null>(null),
    };

    return (
        <main>
            <BannerSection />
            <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
            <div ref={sectionRefs.researchPapers}>
                <ResearchPapers />
            </div>
            <div ref={sectionRefs.infravisionConversations}>
                <Conversations />
            </div>
            <div ref={sectionRefs.blogs}>
                <Blogs />
            </div>
            <Publications />
        </main>
    )
}
