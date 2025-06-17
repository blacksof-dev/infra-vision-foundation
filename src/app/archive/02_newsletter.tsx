"use client";
import { useEffect, useState, useMemo } from "react";

import newsletter_1 from "@/../public/assets/archive/newsletter/01.png";
import newsletter_2 from "@/../public/assets/archive/newsletter/02.png";
import newsletter_3 from "@/../public/assets/archive/newsletter/03.png";
import newsletter_4 from "@/../public/assets/archive/newsletter/04.png";
import newsletter_5 from "@/../public/assets/archive/newsletter/05.png";
import newsletter_6 from "@/../public/assets/archive/newsletter/06.png";

import { UnderlineWithHover } from "@/_components/atoms/buttons";

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

const secondFilter = ["2025", "2024"];
const thridFilter = [
  "All",
  "Transportation",
  "Water and Sanitation",
  "Energy",
  "Urban Planning",
  "Rural and Agri Infra",
  "Education",
  "Health Infra",
];
const allcards = [
  {
    id: 1,
    img: newsletter_1,
    category: "Volume 24",
    title: "",
    sectors: "",
    date: "May 2025",
    description:
      "The Infravision Foundation’s quadruple impact, Rumjhum Chatterjee at The Edge and more.",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-May-2025.pdf",
  },
  {
    id: 2,
    img: newsletter_2,
    category: "Volume 23",
    title: "",
    sectors: "",
    date: "April 2025",
    description:
      "From urban decarbonisation and Noida to CAIRA’s first-ever engagement in Arunachal Pradesh and beyond.",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-April-2025.pdf",
  },
  {
    id: 3,
    img: newsletter_3,
    category: "Volume 22",
    title: "",
    sectors: "",
    date: "March 2025",
    description: "New Report urges fast tracking of High-Speed Rail.",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-March-2025.pdf",
  },
  {
    id: 4,
    img: newsletter_4,
    category: "Volume 21",
    title: "",
    sectors: "",
    date: "February 2025",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-February-2025-Newsletter.pdf",
  },
  {
    id: 5,
    img: newsletter_5,
    category: "Volume 20",
    title: "",
    sectors: "",
    date: "January 2025",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-January-2025.pdf",
  },
  {
    id: 6,
    img: newsletter_6,
    category: "Volume 19",
    title: "",
    sectors: "",
    date: "December 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-December-2024.pdf",
  },
];

export default function Newsletters() {
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

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

  const handleFilterClick = (filterName: string) => {
    setSelectedFilter(filterName);
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
    <div className="pt-5">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`text-base cursor-pointer rounded-[50px] px-3 py-1 sm:px-6 sm:py-3
                            ${selectedFilter === filter
                ? "border border-pink text-white bg-pink font-medium"
                : "border border-lightgray/30"
              }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="newsletters">
      <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">Newsletters</h5>
        </div>

        <div className="py-3 max-w-[690px]">
          <h1 className="text-black font-light">
            Data and findings from the ground,{" "}
            <span className="text-black font-medium">
              fuelled by expert foresight
            </span>
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
