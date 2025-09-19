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
  { id: "newsandMedia", label: "In the News" },
  { id: "video", label: "Videos" },
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
      <div id="newsletters" ref={sectionRefs.newsletter}>
        <Newsletter />
      </div>
      <div id="newsandMedia" ref={sectionRefs.newsandMedia}>
        <NewsAndMedia />
      </div>
      <div id="videos" ref={sectionRefs.video}>
        <Video />
      </div>
      <div id="gallery" ref={sectionRefs.gallery}>
        <Gallery />
      </div>
    </>
  );
}
