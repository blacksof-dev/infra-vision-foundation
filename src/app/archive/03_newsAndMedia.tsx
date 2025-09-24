"use client";
import { useState, useRef, useEffect } from "react";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useApiHook } from "@/lib/useApi";
import { yearApiResponse } from "./02_newsletter";
import { UnderlineWithHover } from "@/_components/atoms/buttons";

// Types
type FilterType = "All" | "Publication year";
const FILTER_TYPES: FilterType[] = ["All", "Publication year"];

interface Card {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  active: boolean;
  link: string;
}

interface CardApiResponse {
  data: Card[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function NewsAndMedia() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // Local store for pagination records
  const [records, setRecords] = useState<{
    [key: string]: { page: number; cards: Card[]; totalCount: number };
  }>({});

  // Publication year API
  const { data: year } = useApiHook<yearApiResponse>({
    url: "/archives/media-coverage/years",
    cacheKey: "archive-year-tab",
  });

  // Current filter key
  const currentKey = `${selectedTab}-${selectedFilter}`;
  const currentData = records[currentKey] ?? {
    page: 1,
    cards: [],
    totalCount: 0,
  };

  // API URL builder
  const getApiUrl = () => {
    if (selectedTab === "Publication year" && selectedFilter !== "All") {
      return `/archives/media-coverage?page=${currentData.page}&limit=3&year=${selectedFilter}`;
    }
    return `/archives/media-coverage?page=${currentData.page}&limit=3`;
  };

  // Fetch cards
  const { data: cards } = useApiHook<CardApiResponse>({
    url: getApiUrl(),
    cacheKey: `archive-newsMedia-cards-${currentKey}-page-${currentData.page}`,
  });

  // Update local record store when new data arrives
  useEffect(() => {
    if (cards?.data) {
      setRecords((prev) => {
        const prevState = prev[currentKey] ?? {
          page: 1,
          cards: [],
          totalCount: 0,
        };
        return {
          ...prev,
          [currentKey]: {
            page: currentData.page,
            cards:
              currentData.page === 1
                ? cards.data
                : [...prevState.cards, ...cards.data],
            totalCount: cards.meta?.total ?? 0,
          },
        };
      });
    }
  }, [cards, currentKey, currentData.page]);

  // Scroll tab into center
  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;
    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  // Handle tab click
  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    if (tab === "Publication year" && year?.length) {
      setSelectedFilter(year[0]);
      setRecords((prev) => ({
        ...prev,
        [`${tab}-${year[0]}`]: { page: 1, cards: [], totalCount: 0 },
      }));
    } else {
      setSelectedFilter("All");
      setRecords((prev) => ({
        ...prev,
        [`${tab}-All`]: { page: 1, cards: [], totalCount: 0 },
      }));
    }
  };

  // Handle filter click
  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
    setRecords((prev) => ({
      ...prev,
      [`${selectedTab}-${filterName}`]: { page: 1, cards: [], totalCount: 0 },
    }));
  };

  // Handle "See More"
  const handleSeeMore = () => {
    setRecords((prev) => ({
      ...prev,
      [currentKey]: {
        ...currentData,
        page: currentData.page + 1,
      },
    }));
  };

  const canSeeMore =
    currentData.totalCount > 0 &&
    currentData.cards.length < currentData.totalCount;

  if (!year || !cards) return null;

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

  return (
    <section id="news-and-media" className="bg-whitesmoke">
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
        {/* Header */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">In the News</h5>
        </div>

        <div className="py-3 max-w-3xl">
          <h1 className="text-black font-light">
            <span className="text-black font-medium">
              The Infravision Foundation
            </span>{" "}
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

          {selectedTab === "Publication year" && renderFilterButtons(year)}

          {/* Cards */}
          <div className="pt-8">
            {currentData.cards.length === 0 && (
              <div className="flex justify-center">No results</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {currentData.cards.map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={card.date}
                    title={card.title}
                    image={card.image}
                    link={card.link}
                    category={card.category}
                    description={card.description}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>

            {/* See More */}
            {canSeeMore && (
              <div className="flex justify-center mb-4 sm:mt-4">
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
