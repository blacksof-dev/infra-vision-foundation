"use client";
import { useEffect, useState, useMemo, useRef } from "react";

import image_01 from "@/../public/assets/archive/newsAndMedia/01.jpg";
import image_02 from "@/../public/assets/archive/newsAndMedia/02.jpg";
import image_03 from "@/../public/assets/archive/newsAndMedia/03.jpg";

import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Card from "@/_components/molecules/cardTemplate";
import Image from "next/image";
import { NewsCard } from "@/_components/molecules/newsCard";

// Types
type FilterType = "All" | "Publication Year" | "sectors";
type SectorType =
  | "All"
  | "Transportation"
  | "Water and Sanitation"
  | "Energy"
  | "Urban Planning"
  | "Rural and Agri Infra"
  | "Education"
  | "Health Infra";

interface NewsletterCard {
  id: number;
  img: any; // Consider using a more specific type for images
  category: string;
  title: string;
  sectors: SectorType;
  date: string;
  description: string;
  link: string;
}

// Constants
const FILTER_TYPES: FilterType[] = ["All", "Publication Year", "sectors"];
const YEARS = ["2025", "2024"] as const;
const SECTORS: SectorType[] = [
  "All",
  "Transportation",
  "Water and Sanitation",
  "Energy",
  "Urban Planning",
  "Rural and Agri Infra",
  "Education",
  "Health Infra",
];
const INITIAL_VISIBLE_COUNT = 3;

const allcards = [
  {
    id: 1,
    img: image_01,
    category: "News",
    title: "",
    sectors: "",
    date: "Aug 15, 2025",
    description: "Group taxation regime for infrastructure",
    link: "https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html",
  },
  {
    id: 2,
    img: image_02,
    category: "News",
    title: "",
    sectors: "",
    date: "July 24, 2024",
    description: "Infra outlays: A strategic downplay",
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
  },
  {
    id: 3,
    img: image_03,
    category: "News",
    title: "",
    sectors: "",
    date: "July 24, 2024",
    description: "Budget signals shift in infra strategy",
    link: "https://www.moneycontrol.com/news/business/economy/budget-signals-shift-in-infra-strategy-as-govt-pushes-states-private-sector-to-pitch-in-12777120.html",
  },
];

export default function NewsAndMedia() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      // const containerRect = container.getBoundingClientRect();
      // const tabRect = tab.getBoundingClientRect();
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    setSelectedFilter(
      tab === "Publication Year"
        ? YEARS[0]
        : tab === "sectors"
          ? SECTORS[0]
          : "All"
    );
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index)
  };

  const filteredCards = useMemo(() => {
    if (selectedTab === "Publication Year") {
      return allcards.filter(
        (card) => card.date.split(" ").pop() === selectedFilter
      );
    }
    if (selectedTab === "sectors" && selectedFilter !== "All") {
      return allcards.filter((card) => card.sectors === selectedFilter);
    }
    return allcards;
  }, [selectedTab, selectedFilter]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT);
  };

  const renderFilterButtons = (filters: readonly string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex  gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            className={`text-base cursor-pointer text-nowrap rounded-[50px] px-3 py-1 sm:px-6 sm:py-3
                            ${selectedFilter === filter
                ? "border border-pink text-white bg-pink font-medium"
                : "border border-lightgray/30"
              }`}
            onClick={() => handleFilterClick(filter, index)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="news-and-media">
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">News and Media</h5>
        </div>

        <div className="py-3 max-w-3xl">
          <h1 className="text-black font-light">
            <span className="text-black font-medium">
              {" "}
              The Infravision Foundation{" "}
            </span>
            in the public sphere
          </h1>
        </div>

        {/* Filter Section */}
        <div className="pt-5">
          <div className="flex flex-col sm:flex-row gap-6 border-b border-darkgray/20">
            <div className="sm:border-r sm:border-darkgray/20">
              <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
                Filter by
              </h5>
            </div>

            <div className="flex flex-row gap-5">
              {FILTER_TYPES.map((tab) => (
                <button
                  key={tab}
                  className={`mt-auto text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4
                                        ${selectedTab === tab
                      ? "border border-pink text-pink font-medium"
                      : "border border-lightgray/30"
                    }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Buttons */}
          {selectedTab === "Publication Year" && renderFilterButtons(YEARS)}
          {selectedTab === "sectors" && renderFilterButtons(SECTORS)}

          {/* Newsletter Cards */}
          <div
            className={`${selectedTab === "Publication Year" ? "pt-8" : "pt-8"
              }`}
          >
            {
              filteredCards.length === 0 && <div className="flex justify-center"> No results </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {filteredCards.slice(0, visibleCount).map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={card.date}
                    title={card.title}
                    image={card.img.src}
                    link={card.link}
                    category={card.category}
                    description={card.description}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>
            {visibleCount < filteredCards.length && (
              <div className="flex justify-center mb-4">
                <UnderlineWithHover
                  size="xxlsize"
                  color="pink"
                  bgColor="pink"
                  text="See more"
                  role="button"
                  borderColor="white"
                  handlefun={handleSeeMore}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
