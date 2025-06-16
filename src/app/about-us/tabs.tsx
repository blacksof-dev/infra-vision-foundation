"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useSelector } from 'react-redux';


type TabId = 'who_we_are' | 'infravisionaries' | 'vision_and_mission' | 'our_pulse' | 'project_pathway';

const tabs: { id: TabId; label: string }[] = [
  { id: "who_we_are", label: "Who we are" },
  { id: "infravisionaries", label: "The Infravisionaries" },
  { id: "vision_and_mission", label: "Vision and Mission" },
  { id: "our_pulse", label: "Our pulse" },
  { id: "project_pathway", label: "The project pathway" },
];



type Props = {
  sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>>;
};

export default function AboutUsTabs({ sectionRefs }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("who_we_are");
  const [isStickyVisible, setStickyVisible] = useState(true);

  const handleTabClick = (id: TabId) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
    setActiveTab(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibilityMap: { id: TabId; ratio: number }[] = [];

        entries.forEach((entry) => {
          const matchedTab = Object.entries(sectionRefs).find(
            ([_, ref]) => ref.current === entry.target
          );
          if (matchedTab) {
            visibilityMap.push({
              id: matchedTab[0] as TabId,
              ratio: entry.isIntersecting ? entry.intersectionRatio : 0,
            });
          }
        });

        // Sort by most visible section
        visibilityMap.sort((a, b) => b.ratio - a.ratio);

        // Determine most visible tab section
        if (visibilityMap.length > 0 && visibilityMap[0].ratio > 0) {
          const topVisible = visibilityMap[0].id;
          if (topVisible !== activeTab) {
            setActiveTab(topVisible);
          }
          setStickyVisible(true); // Only show if one is in view
        } else {
          setStickyVisible(false); // Hide if none of the three are visible
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionRefs, activeTab]);

  return (
  <div
    className={clsx(
      "border-b border-darkgray/16",
      "bg-white",
      "z-50",
      "sticky",
      "top-0",
      isStickyVisible ? "block" : "hidden"
    )}
  >
    <div className="w-container overflow-x-auto">
      <div className="flex gap-5 sm:gap-20 md:pt-8 justify-start w-max whitespace-nowrap px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={clsx(
              "py-4 text-sm md:text-lg cursor-pointer text-darkgray border-b-2 transition-all min-w-max",
              activeTab === tab.id
                ? "text-pink border-pink font-medium"
                : "border-transparent"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

}
