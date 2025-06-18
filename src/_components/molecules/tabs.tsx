"use client";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSelector } from 'react-redux';
import { useHeader } from "@/context/useHeader";


type TabId = string;

type Tab = { id: TabId; label: string };

type Props = {
  tabs: Tab[];
  sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>>;
};

export default function OutreachTabs({ sectionRefs, tabs }: Props) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("");
  const [isStickyVisible, setStickyVisible] = useState(true);
  const { isHeaderVisible } = useHeader()
  const handleTabClick = (id: TabId, index: number) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
    setActiveTab(id);
    scrollToCenter(index);
  };

  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
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


        if (visibilityMap.length > 0 && visibilityMap[0].ratio > 0) {
          const topVisible = visibilityMap[0].id;
          if (topVisible !== activeTab) {
            setActiveTab(topVisible);
          }
          setStickyVisible(true);
        } else {
          setStickyVisible(false)
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
      ref={containerRef}
      className={clsx(
        "border-b overflow-hidden  border-darkgray/16 transition-all duration-200 ease-linear",
        "bg-white",
        "z-50",
        "sticky",
        "top-0",
        isStickyVisible ? "block" : "hidden",
        isHeaderVisible ? "sticky top-20 xl:top-24" : "top-0"
      )}
    >
      <div className="flex gap-5 w-container w-full sm:gap-20 md:pt-8  justify-start    z-40  ">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => handleTabClick(tab.id, index)}
            className={clsx(
              "py-4 text-nowrap text-sm md:text-lg cursor-pointer  text-darkgray border-b-2 transition-all",
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

  );
}
