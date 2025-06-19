"use client";
import BannerSection from "./01_banner";
import NewsAndMedia from "./03_newsAndMedia";
import Newsletter from "./02_newsletter";
import Gallery from "./04_gallery";
import { useRef } from "react";
import PublicationTabs from "@/_components/molecules/tabs";
import Video from "./05_video";

type TabId = "newsletter" | "newsandMedia" | "video" | "gallery";

const tabs: { id: TabId; label: string }[] = [
  { id: "newsletter", label: "Newsletters" },
  { id: "newsandMedia", label: "News and media" },
  { id: "video", label: "Video" },
  { id: "gallery", label: "Gallery" },
];

export default function Archive() {
  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    newsletter: useRef<HTMLDivElement | null>(null),
    newsandMedia: useRef<HTMLDivElement | null>(null),
    gallery: useRef<HTMLDivElement | null>(null),
    video: useRef<HTMLDivElement | null>(null),
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
      <div ref={sectionRefs.video}>
        <Video />
      </div>
      <div ref={sectionRefs.gallery}>
        <Gallery />
      </div>
    </>
  );
}
