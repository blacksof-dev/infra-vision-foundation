"use client";
import { useEffect, useState, useMemo, useRef } from "react";

import img_01 from "@/../public/assets/knowledeg/researchPapers/01.jpg";
import img_02 from "@/../public/assets/knowledeg/researchPapers/02.jpg";
import img_03 from "@/../public/assets/knowledeg/researchPapers/03.jpg";
import img_04 from "@/../public/assets/knowledeg/researchPapers/04.jpg";
import img_05 from "@/../public/assets/knowledeg/researchPapers/05.jpg";
import img_06 from "@/../public/assets/knowledeg/researchPapers/06.jpg";

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
    img: img_01,
    category: "Rural and Agri Infra",
    title: "",
    sectors: "Rural and Agri Infra",
    date: "November, 2024",
    description:
      "Study on the implementation of compensatory afforestation in India",
    link: "/assets/knowledeg/researchPapers/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
  },
  {
    id: 2,
    img: img_02,
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: "January, 2025",
    description: "The case for developing high-speed rail corridors in India",
    link: "/assets/pdf/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
  },
  {
    id: 3,
    img: img_03,
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: "January, 2025",
    description: "Safe highways in India: Challenges and solutions",
    link: "/assets/pdf/Safe-Highways-in-India-Challenges-and-Solutions_August-2024.pdf",
  },
  {
    id: 4,
    img: img_04,
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: "January, 2025",
    description:
      "Strategies to improve the financial performance of the metro rail system",
    link: "/assets/pdf/Metro-Rail-Systems-Whitepaper.pdf",
  },
  {
    id: 5,
    img: img_05,
    category: "Urban Planning",
    title: "",
    sectors: "Urban Planning",
    date: "January, 2025",
    description: "Sustainability ratings for Infrastructure projects in India",
    link: "/assets/pdf/Sustainability-Rating-Infra-Whitepaper-2.pdf",
  },
  {
    id: 6,
    img: img_06,
    category: "Energy",
    title: "",
    sectors: "Energy",
    date: "January, 2025",
    description: "Mass scale rooftop solar programme for poverty alleviation",
    link: "/assets/pdf/solar.pdf",
  },
];

export default function ResearchPapers() {
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
    scrollToCenter(index);
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
      <div className="flex  gap-3 ">

        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            className={`text-base text-nowrap cursor-pointer rounded-[50px] px-3 py-1 sm:px-6 sm:py-3
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
    <section id="research-papers">
      <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">Research Papers</h5>
        </div>

        <div className="py-3 max-w-4xl">
          <h1 className="text-black font-light">
            Data-powered studies from the ground,
            <span className="text-black font-medium">
              {" "}
              fuelled by expert insight
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
              <div className="flex justify-center mt-8">
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
