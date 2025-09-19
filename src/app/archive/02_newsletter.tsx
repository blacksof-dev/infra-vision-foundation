"use client";
import { useState, useMemo, useRef } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";

// Types
type FilterType = "All" | "Publication year" | "sectors";

export type yearApiResponse = string[];

interface cardApiResponse {
  id: string;
  title: string;
  subtitle: string;
  version: string;
  publishedDate: string;
  coverImage: string;
  fileUrl: string;
}


interface cardApiResponse {
  data: cardApiResponse[];
}

// Main Tab 
const FILTER_TYPES: FilterType[] = ["All", "Publication year"];



export default function Newsletters() {

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>();


  //Content API Call
  const { data: content } = useApiHook<ApiResponse>({
    url: "/content/archive-newsletter-content",
    cacheKey: "archive-newsletter",
  });

  //Publication year tab API Call
  const { data: year } = useApiHook<yearApiResponse>({
    url: "/archives/newsletter/years",
    cacheKey: "archive-year-tab",
  });

  //Cards API Call
  const { data: cards } = useApiHook<cardApiResponse>({
    url: "/archives/newsletter?page=1&limit=3",
    cacheKey: "archive-newsletter-cards",
  });




  const response = cards?.data ?? [];
 

  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    if (tab === "Publication year" && year?.length) {
      setSelectedFilter(year[0])
    } else {
      setSelectedFilter("All");
    }

 
  };

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index)
  };

  const filteredCards = useMemo(() => {
    if (selectedTab === "Publication year") {
      return response.filter(
        (card) =>
           new Date(card.publishedDate).getFullYear() === Number(selectedFilter)
      );
    }
    return response;
  }, [response, selectedTab, selectedFilter]);



  const renderFilterButtons = (filters: readonly string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex gap-3">
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


  if (!content || !year || !cards) { return null }

  return (
    <section id="newsletters">
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">{content.tagName}</h5>
        </div>

        <div className="py-3 max-w-[890px] ">
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
          {selectedTab === "Publication year" && renderFilterButtons(year)}


          {/* Newsletter Cards */}
          <div
            className={`${selectedTab === "Publication year" ? "pt-8" : "pt-8"
              }`}
          >
            {
              filteredCards.length === 0 && <div className="flex justify-center "> No results </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {filteredCards.slice(0, ).map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={card.publishedDate}
                    title={card.title}
                    image={card.coverImage}
                    link={card.fileUrl}
                    category={card.version}
                    description={card.subtitle}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>

            {/* {visibleCount < filteredCards.length && (
              <div className="flex justify-center mb-4  blade-top-padding-sm">
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
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
