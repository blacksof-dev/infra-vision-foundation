"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useApiHook } from "@/lib/useApi";
import { getUrl } from "@/lib/getUrl";

export interface TabApiRaw {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface ResearchPaperApiResponse {
  researchPapers: ResearchPaper[];
  pagination: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ResearchPaper {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
  date: string;
  active: boolean;
  sectorIds: string[];
}

interface FilterState {
  page: number;
  cards: ResearchPaper[];
  totalCount: number;
}

export default function ResearchPapers() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<{
    name: string;
    id?: string;
  }>({ name: "All" });

  const [records, setRecords] = useState<{ [key: string]: FilterState }>({});

  const { data: tabsData } = useApiHook<TabApiRaw[]>({
    url: "/knowledge/sectors",
    cacheKey: "knowledgeSectorTab",
  });

  const currentKey = selectedFilter.name;
  const currentData = records[currentKey] ?? {
    page: 1,
    cards: [],
    totalCount: 0,
  };

  const getApiUrl = () => {
    const base = `/knowledge/research-papers?limit=3&activeOnly=true&page=${currentData.page}`;
    if (selectedFilter.name !== "All" && selectedFilter.id) {
      return `${base}&sectorId=${selectedFilter.id}`;
    }
    return base;
  };

  const { data: cardData } = useApiHook<ResearchPaperApiResponse>({
    url: getApiUrl(),
    cacheKey: `researchPapers-${currentKey}-${currentData.page}`,
  });

  useEffect(() => {
    if (cardData?.researchPapers) {
      setRecords((prev) => {
        const prevState = prev[currentKey] ?? {
          page: 1,
          cards: [],
          totalCount: 0,
        };

        const newCards = cardData.researchPapers;
        let updatedCards = newCards;

        if (currentData.page > 1) {
          const existingIds = new Set(prevState.cards.map((c) => c.id));
          const uniqueNewCards = newCards.filter((c) => !existingIds.has(c.id));
          if (uniqueNewCards.length === 0) return prev; // No new cards
          updatedCards = [...prevState.cards, ...uniqueNewCards];
        }

        // Prevent update if data is identical (shallow check for page 1)
        if (currentData.page === 1 && prevState.cards === newCards) return prev;

        return {
          ...prev,
          [currentKey]: {
            page: currentData.page,
            cards: updatedCards,
            totalCount: cardData.pagination?.totalCount ?? 0,
          },
        };
      });
    }
  }, [cardData, currentKey, currentData.page]);

  const activeTabs = useMemo(() => {
    if (!tabsData) return ["All"];
    return ["All", ...tabsData.map((t) => t.name)];
  }, [tabsData]);

  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;
    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  const handleFilterClick = (filterName: string, index: number) => {
    const sector = tabsData?.find((t) => t.name === filterName);
    setSelectedFilter({ name: filterName, id: sector?.id });
    scrollToCenter(index);
  };

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

  const getSectorName = (ids: string[]) => {
    if (!ids?.length) return "";
    const sector = tabsData?.find((t) => t.id === ids[0]);
    return sector?.name || "";
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!tabsData) return null;

  return (
    <section id="research-papers">
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
        {/* Heading */}
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
              <h5 className="text-darkgray/80 sm:py-5 pr-5 mb-8 text-nowrap">
                Filter by
              </h5>
            </div>

            <div
              ref={containerRef}
              className="pt-5 overflow-scroll no-scrollbar"
            >
              <div className="flex gap-3">
                {activeTabs.map((filter, index) => (
                  <button
                    key={filter}
                    ref={(el: HTMLButtonElement | null): void => {
                      tabRefs.current[index] = el;
                    }}
                    className={`text-base text-nowrap cursor-pointer rounded-[50px] px-3 py-1 sm:px-6 sm:py-3
                      ${
                        selectedFilter.name === filter
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
          </div>

          {/* Research Paper Cards */}
          <div className="pt-8">
            {currentData.cards.length === 0 && (
              <div className="flex justify-center">No results</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {currentData.cards.map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={formatDate(card.date)}
                    title={card.title}
                    image={getUrl(card.image)}
                    link={card.link}
                    category={getSectorName(card.sectorIds)}
                    description=""
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
