'use client'
import BannerSection from "./01_banner";
import NewsAndMedia from "./03_newsAndMedia";
import Newsletter from "./02_newsletter";
import Gallery from "./04_gallery";
import { useRef } from "react";
import PublicationTabs from "@/_components/molecules/tabs";

type TabId = "newsletter" | "newsandMedia" | "gallery";

const tabs: { id: TabId; label: string }[] = [
    { id: "newsletter", label: "Newsletter" },
    { id: "newsandMedia", label: "News and media" },
    { id: "gallery", label: "Gallery" },
];


export default function Archive() {
    const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
        newsletter: useRef<HTMLDivElement | null>(null),
        newsandMedia: useRef<HTMLDivElement | null>(null),
        gallery: useRef<HTMLDivElement | null>(null),
    };
    return (
        <>
            <BannerSection />
            <PublicationTabs tabs={tabs} sectionRefs={sectionRefs} />
            <div ref={sectionRefs.newsletter}>

                <Newsletter />
            </div>
            <div ref={sectionRefs.newsandMedia}>
                <NewsAndMedia />
            </div>
            <div ref={sectionRefs.gallery}>
                <Gallery />
            </div>
        </>
    )
}
