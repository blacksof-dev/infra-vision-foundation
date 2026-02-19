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

interface contentApiResponse {
  tagName: string;
  description: string;
}

export interface ResearchPaper {
  id: string;
  image: string;
  title: string;
  description: string;
  link: string;
  date: string;
  active: string;
  sectors: {
    name: string;
    slug: string;
    active: boolean;
  }[];
}

export default function ResearchPapers() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const [records, setRecords] = useState<{
    [key: string]: { page: number; cards: ResearchPaper[]; totalCount: number };
  }>({});

  const { data: content } = useApiHook<contentApiResponse>({
    url: "/knowledge/research-papers?activeOnly=true",
    cacheKey: "knowledgeContentTab",
  });

  const { data: tabsData } = useApiHook<TabApiRaw[]>({
    url: "/knowledge/sectors",
    cacheKey: "knowledgeSectorTab",
  });

  const currentKey = `${selectedFilter}`;

  const currentData = records[currentKey] ?? {
    page: 1,
    cards: [],
    totalCount: 0,
  };

  const getApiUrl = () => {
    const params = `activeOnly=true&limit=3&page=${currentData.page}`;

    if (selectedFilter === "All") {
      return `/knowledge/research-papers?${params}`;
    }

    const sector = tabsData?.find((t) => t.name === selectedFilter);
    if (sector) {
      return `/knowledge/research-papers/by-sector/${sector.id}?${params}`;
    }

    return `/knowledge/research-papers?${params}`;
  };

  const { data: cardData } = useApiHook<{
    researchPapers: ResearchPaper[];
    pagination: {
      totalCount: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }>({
    url: getApiUrl(),
    cacheKey: `knowledgeCardData-${currentKey}-page-${currentData.page}`,
  });

  useEffect(() => {
    if (cardData?.researchPapers) {
      setRecords((prev) => {
        const prevState = prev[currentKey] ?? {
          page: 1,
          cards: [],
          totalCount: 0,
        };

        const apiPage = cardData.pagination?.page ?? 1;

        return {
          ...prev,
          [currentKey]: {
            page: apiPage,
            cards:
              apiPage === 1
                ? cardData.researchPapers
                : [...prevState.cards, ...cardData.researchPapers],
            totalCount: cardData.pagination?.totalCount ?? 0,
          },
        };
      });
    }
  }, [cardData, currentKey]);

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
    if (filterName === selectedFilter) return;
    setSelectedFilter(filterName);
    scrollToCenter(index);
    // Reset when switching to a new tab
    setRecords((prev) => ({
      ...prev,
      [filterName]: { page: 1, cards: [], totalCount: 0 },
    }));
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

  if (!tabsData) return null;

  const renderFilterButtons = (filters: string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el: HTMLButtonElement | null): void => {
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

            {renderFilterButtons(activeTabs)}
          </div>

          {/* Research Paper Cards */}
          <div className="pt-8">
            {currentData.cards.length === 0 && (
              <div className="flex justify-center">
                {!cardData ? "Loading..." : "No results"}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {currentData.cards.map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date=""
                    title={card.title}
                    image={getUrl(card.image)}
                    link={card.link}
                    category={card.sectors?.[0]?.name ?? ""}
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
