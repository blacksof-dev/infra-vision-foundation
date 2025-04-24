"use client";
import { useRef } from "react";
import ResourceBanner from "./01_banner";
import Blog from "./02_blogs";
import Video from "./03_video";
import NewsAndMedia from "./04_newsMedia";
import Gallery from "./05_gallery";
import ResourceNewsLetter from "./06_newsletter";
import ResourceTabs from "./tabs";

type TabId = "blogs" | "videos" | "newsmedia" | "gallery";

export default function Resource() {
  const sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>> = {
    blogs: useRef<HTMLDivElement | null>(null),
    videos: useRef<HTMLDivElement | null>(null),
    newsmedia: useRef<HTMLDivElement | null>(null),
    gallery: useRef<HTMLDivElement | null>(null),
  };

  const otherSectionRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];
  return (
    <>
       <ResourceBanner />

      <ResourceTabs sectionRefs={sectionRefs} />

      <div id="blogs" ref={sectionRefs.blogs}>
        <Blog />
      </div> 

      <div id="videos" ref={sectionRefs.videos}>
        <Video />
      </div>

      <div id="newsmedia" ref={sectionRefs.newsmedia}>
        <NewsAndMedia />
      </div> 

      <div id="gallery" ref={sectionRefs.gallery}>
        <Gallery />
      </div>

      <div ref={otherSectionRefs[0]}>
        <ResourceNewsLetter />
      </div>
    </>
  );
}
