"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";

type TabId = "research" | "whitepapers" | "newsletters";

const tabs: { id: TabId; label: string }[] = [
  { id: "research", label: "Research papers" },
  { id: "whitepapers", label: "White papers" },
  { id: "newsletters", label: "Newsletters" },
];

type Props = {
  sectionRefs: Record<TabId, React.RefObject<HTMLDivElement | null>>;
};

export default function PublicationTabs({ sectionRefs }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("research");
  const [isStickyVisible, setStickyVisible] = useState(true);

  const handleTabClick = (id: TabId) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
    setActiveTab(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSections: TabId[] = [];

        entries.forEach((entry) => {
          const matchedTab = Object.entries(sectionRefs).find(
            ([_, ref]) => ref.current === entry.target
          );
          if (matchedTab && entry.isIntersecting) {
            visibleSections.push(matchedTab[0] as TabId);
          }
        });

        // Set active tab if one is in view
        if (visibleSections.length > 0) {
          setActiveTab(visibleSections[0]);
          setStickyVisible(true);
        } else {
          setStickyVisible(false); // Hide sticky when none are visible
        }
      },
      {
        threshold: 0.4, // You can tweak this
      }
    );

    // Observe only tab sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  return (
    <div
      className={clsx(
        "w-container",
        "z-50",
        "sticky",
        "top-0",
        isStickyVisible ? "block" : "hidden"
      )}
    >
      <div className="flex gap-8 border-b border-gray-200 justify-start bg-white sticky top-0 z-40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={clsx(
              "py-4 text-base md:text-lg font-medium text-darkgray border-b-2 transition-all",
              activeTab === tab.id
                ? "text-pink border-pink"
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
