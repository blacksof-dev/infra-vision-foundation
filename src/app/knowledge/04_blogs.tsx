"use client";
import { useEffect, useState, useMemo, useRef } from "react";

import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";
import { yearApiResponse } from "../archive/02_newsletter";
import { TabApiRaw } from "./02_researchPapers";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";

// Types

type FilterType = "All" | "Publication year" | "Sectors";

const FILTER_TYPES: FilterType[] = ["All", "Publication year", "Sectors"];
const INITIAL_VISIBLE_COUNT = 3;



interface Sector {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface BlogsApiResponse {
  id: string;
  coverImage: string;
  docFile: string;
  title: string;
  authorName: string;
  authorDesignation: string;
  publishedDate: string;
  content: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  sectorIds: string[];
  sectors: Sector[];
}

interface CardApiResponse {
  blogs: BlogsApiResponse[];
}

let initialLimit = 3;

export default function Blogs() {

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const [limit, setLimit] = useState(initialLimit);

  //Content API Call
  const { data: content } = useApiHook<ApiResponse>({
    url: "/content/knowledge-blogs-content",
    cacheKey: "knowledge-blogs-content",
  });


  // Year tab API Call
  const { data: yearTab } = useApiHook<yearApiResponse>({
    url: "/knowledge/blogs/years?activeOnly=true",
    cacheKey: "knowledge-blogs-year",
  });

  //Sector tab API Call

  const { data: sectorTab } = useApiHook<TabApiRaw[]>({
    url: "/knowledge/sectors?activeOnly=true",
    cacheKey: "knowledge-blogs-sectors",
  });


  //Cards data Api Call
  const { data: cardData } = useApiHook<CardApiResponse>({
    url: `/knowledge/blogs?page=1&limit=${limit}`,
    cacheKey: "knowledge-blogs-cardData",
  });


  const response = cardData?.blogs ?? []



  const activeTabs = useMemo(
    () => sectorTab?.map(tab => tab.name) ?? [],
    [sectorTab]
  );


  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  const handleTabClick = (tab: FilterType) => {

    setSelectedTab(tab);

    if (tab === "Publication year" && yearTab?.length) {
      setSelectedFilter(yearTab[0])
    }
    else if (tab === "Sectors" && sectorTab?.length) {
      setSelectedFilter(activeTabs[0])
    }
    else {
      setSelectedFilter("All")
    }
    setLimit(initialLimit);
  };

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
  };




  const filteredCards = useMemo(() => {
    if (selectedTab === "Publication year" && selectedFilter !== "All") {
      return response.filter(
        (card) =>
          new Date(card.publishedDate).getFullYear() === Number(selectedFilter)
      );
    }

    if (selectedTab === "Sectors" && selectedFilter !== "All") {
      return response.filter((card) =>
        card.sectors.some((sector) => sector.name === selectedFilter)
      );
    }

    return response.slice(0, limit);;
  }, [selectedTab, selectedFilter, response]);



  const handleSeeMore = () => {
    setLimit((prev) => prev + initialLimit);
  };

  const renderFilterButtons = (filters: string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex   gap-3">
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

  if (!content || !yearTab || !sectorTab || !cardData) { return null; }

  return (
    <section id="blogs">
      <div className="w-container blade-top-padding-sm blade-bottom-padding-lg">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">{content.tagName}</h5>
        </div>

        <div className="py-3 max-w-4xl">
          <h1 className="text-black font-light" dangerouslySetInnerHTML={{ __html: content.title }} />
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
          {selectedTab === "Publication year" && renderFilterButtons(yearTab)}
          {selectedTab === "Sectors" && renderFilterButtons(activeTabs)}

          {/* Newsletter Cards */}
          <div
            className={`${selectedTab === "Publication year" ? "pt-8" : "pt-8"
              }`}
          >
            {filteredCards.length === 0 && (
              <div className="flex justify-center"> No results </div>
            )}


            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {filteredCards.slice(0, initialLimit).map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={card.publishedDate}
                    title={card.title}
                    image={card.coverImage}
                    link={card.docFile}
                    category={card.sectors[0]?.name ?? ""}
                    description={card.content}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>
            {initialLimit < filteredCards.length && (
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
