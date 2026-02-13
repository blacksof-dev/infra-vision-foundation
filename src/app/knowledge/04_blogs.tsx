"use client";
import { useEffect, useState, useMemo, useRef } from "react";

import img_01 from "@/../public/assets/knowledeg/blogs/01.jpg";
import img_02 from "@/../public/assets/knowledeg/blogs/02.jpg";
import img_03 from "@/../public/assets/knowledeg/blogs/03.jpg";
import img_04 from "@/../public/assets/knowledeg/blogs/04.jpg";
import img_05 from "@/../public/assets/knowledeg/blogs/05.jpg";
import img_06 from "@/../public/assets/knowledeg/blogs/06.jpg";
import img_07 from "@/../public/assets/knowledeg/blogs/07.jpg";
import img_08 from "@/../public/assets/knowledeg/blogs/08.jpg";
import img_09 from "@/../public/assets/knowledeg/blogs/09.jpg";
import img_10 from "@/../public/assets/knowledeg/blogs/marine.png";
import img_11 from "@/../public/assets/knowledeg/blogs/urban challenges.jpg";
import img_12 from "@/../public/assets/knowledeg/blogs/transit.png";
import img_13 from "@/../public/assets/knowledeg/blogs/fiveHourLate.png";

import { UnderlineWithHover } from "@/_components/atoms/buttons";

import { NewsCard } from "@/_components/molecules/newsCard";

// Types
type FilterType = "All" | "Publication year" | "Sectors";
type SectorType =
  | "All"
  | "Transportation"
  | "Energy"
  | "Urban Planning"
  | "Rural and Agri Infra"
  | "Infrastructure";

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
const FILTER_TYPES: FilterType[] = ["All", "Publication year", "Sectors"];
const YEARS = ["2025", "2024", "2023"] as const;
const SECTORS: SectorType[] = [
  "All",
  "Transportation",
  "Energy",
  "Urban Planning",
  "Rural and Agri Infra",
  "Infrastructure",
];

const INITIAL_VISIBLE_COUNT = 3;

const allcards = [
  {
    id: 13,
    img: img_13,
    slug: "an-express-train-journey-that-tested-patience-policy-and-people",
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: "February 13, 2026",
    description:
      "An express train journey that tested patience, policy, and people: Ticket confirmed, time cancelled",
    link: "/blogs/an-express-train-journey-that-tested-patience-policy-and-people",
  },
  {
    id: 12,
    img: img_12,
    slug: "transit-oriented-development-and-urban-mobility-in-india",
    category: "Urban Planning",
    title: "",
    sectors: "Urban Planning",
    date: "December 31, 2025",
    description: "Transit-Oriented Development and urban mobility in India",
    link: "/blogs/transit-oriented-development-and-urban-mobility-in-india",
  },

  {
    id: 11,
    img: img_11,
    slug: "a-catalyst-for-next-gen-urban-projects",
    category: "Urban Planning",
    title: "",
    sectors: "Urban Planning",
    date: "December 31, 2025",
    description: "Urban Challenge Fund: A catalyst for next-gen urban projects",
    link: "/blogs/a-catalyst-for-next-gen-urban-projects",
  },

  {
    id: 10,
    img: img_10,
    slug: "infrastructure-bottlenecks-in-india-marine-export-sector",
    category: "Infrastructure",
    title: "",
    sectors: "Infrastructure",
    date: "December 31, 2025",
    description:
      "Choppy waters: Infrastructure bottlenecks in India’s marine export sector",
    link: "/blogs/infrastructure-bottlenecks-in-india-marine-export-sector",
  },

  {
    id: 9,
    img: img_09,
    slug: "why-arunachal-agriculture-needs-better-infrastructure",
    category: "Rural and Agri Infra",
    title: "",
    sectors: "Rural and Agri Infra",
    date: "December 31, 2025",
    description:
      "Two days to Tawang: Why Arunachal’s agriculture needs better infrastructure",
    link: "/blogs/why-arunachal-agriculture-needs-better-infrastructure",
  },

  {
    id: 1,
    img: img_01,
    slug: "how-to-make-india-highways-safe",
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: "October 16, 2024",
    description: "How to make India’s highways safe",
    link: "/blogs/how-to-make-india-highways-safe",
  },
  {
    id: 2,
    img: img_02,
    slug: "rural-and-agri-infra",
    category: "Rural and Agri Infra",
    title: "",
    sectors: "Rural and Agri Infra",
    date: "November 25, 2023",
    description: "Agri-warehousing: A problem of capacity",
    link: "/blogs/rural-and-agri-infra",
  },
  {
    id: 3,
    img: img_03,
    slug: "multi-utility-infra-the-way-to-go",
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: "October 9, 2023",
    description: "Multi-utility Infra, the way to go!",
    link: "/blogs/multi-utility-infra-the-way-to-go",
  },
  {
    id: 4,
    img: img_04,
    slug: "our-metro-rail-systems-must-be-sustainable-financially",
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: "October 5, 2023",
    description: "Our metro rail systems must be sustainable, financially",
    link: "/blogs/our-metro-rail-systems-must-be-sustainable-financially",
  },
  {
    id: 5,
    img: img_05,
    slug: "india-needs-sustainability-ratings-for-infrastructure-projects",
    category: "Urban Planning",
    title: "",
    sectors: "Urban Planning",
    date: "September 25, 2023",
    description:
      "India needs sustainability ratings for Infrastructure projects",
    link: "/blogs/india-needs-sustainability-ratings-for-infrastructure-projects",
  },
  {
    id: 6,
    img: img_06,
    slug: "urban-mobility-in-india-why-metro-is-not-the-only-solution",
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: "August 26, 2023",
    description:
      "Urban mobility in India – Why metro is not the only solution!",
    link: "/blogs/urban-mobility-in-india-why-metro-is-not-the-only-solution",
  },
  {
    id: 7,
    img: img_07,
    slug: "getting-surety-bonds-market-ready",
    category: "Infrastructure",
    title: "",
    sectors: "Infrastructure",
    date: "May 18, 2023",
    description: "Getting Surety Bonds Market Ready",
    link: "/blogs/getting-surety-bonds-market-ready",
  },
  {
    id: 8,
    img: img_08,
    slug: "rooftop-solar-for-poverty-alleviation",
    category: "Energy",
    title: "",
    sectors: "Energy",
    date: "March 2, 2023",
    description: "Rooftop Solar for Poverty Alleviation",
    link: "/blogs/rooftop-solar-for-poverty-alleviation",
  },
];

export default function Blogs() {
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
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    setSelectedFilter(
      tab === "Publication year"
        ? YEARS[0]
        : tab === "Sectors"
          ? SECTORS[0]
          : "All",
    );
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
  };

  const filteredCards = useMemo(() => {
    if (selectedTab === "Publication year") {
      return allcards.filter(
        (card) => card.date.split(" ").pop() === selectedFilter,
      );
    }
    if (selectedTab === "Sectors" && selectedFilter !== "All") {
      return allcards.filter((card) => card.category === selectedFilter);
    }
    return allcards;
  }, [selectedTab, selectedFilter]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT);
  };

  const renderFilterButtons = (filters: readonly string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex   gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            className={`text-base text-nowrap cursor-pointer rounded-[50px] px-3 py-1 sm:px-6 sm:py-3
                            ${
                              selectedFilter === filter
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
    <section id="blogs">
      <div className="w-container blade-top-padding-sm blade-bottom-padding-lg">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">Blogs</h5>
        </div>

        <div className="py-3 max-w-4xl">
          <h1 className="text-black font-light">
            Championing infrastructure issues
            <br />
            <span className="text-black font-medium">
              {" "}
              and recommending solutions
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
                                        ${
                                          selectedTab === tab
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
          {selectedTab === "Publication year" && renderFilterButtons(YEARS)}
          {selectedTab === "Sectors" && renderFilterButtons(SECTORS)}

          {/* Newsletter Cards */}
          <div
            className={`${
              selectedTab === "Publication year" ? "pt-8" : "pt-8"
            }`}
          >
            {filteredCards.length === 0 && (
              <div className="flex justify-center"> No results </div>
            )}
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
              <div className="flex justify-center sm:mt-4 mb-4">
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
