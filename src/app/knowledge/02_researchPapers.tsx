"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useApiHook } from "@/lib/useApi";

// Types
type FilterType = "All" | "Sectors";

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

const FILTER_TYPES: FilterType[] = ["All", "Sectors"];

export default function ResearchPapers() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");


  const [records, setRecords] = useState<{
    [key: string]: { page: number; cards: ResearchPaper[]; totalCount: number };
  }>({});

  const { data: content } = useApiHook<contentApiResponse>({
    url: "/content/knowledge-reserach-content",
    cacheKey: "knowledgeContentTab",
  });


  const { data: tabsData } = useApiHook<TabApiRaw[]>({
    url: "/knowledge/sectors",
    cacheKey: "knowledgeSectorTab",
  });


  const currentKey = `${selectedTab}-${selectedFilter}`;


  const currentData = records[currentKey] ?? {
    page: 1,
    cards: [],
    totalCount: 0,
  };


  const getApiUrl = () => {
    if (selectedTab === "Sectors" && selectedFilter !== "All") {
      const sector = tabsData?.find((t) => t.name === selectedFilter);
      if (sector) {
        return `/knowledge/research-papers/by-sector/${sector.id}?page=${currentData.page}&limit=3`;
      }
    }
    return `/knowledge/research-papers?page=${currentData.page}&limit=3`;
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


  console.log(cardData)
  useEffect(() => {
    if (cardData?.researchPapers) {
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
                ? cardData.researchPapers
                : [...prevState.cards, ...cardData.researchPapers],
            totalCount: cardData.pagination?.totalCount ?? 0,
          },
        };
      });
    }
  }, [cardData, currentKey, currentData.page]);


  const activeTabs = useMemo(
    () => tabsData?.map((tab) => tab.name) ?? [],
    [tabsData]
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


  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
    // Reset when switching
    setRecords((prev) => ({
      ...prev,
      [`${selectedTab}-${filterName}`]: { page: 1, cards: [], totalCount: 0 },
    }));
  };


  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    if (tab === "Sectors" && activeTabs.length > 0) {
      setSelectedFilter(activeTabs[0]);
      setRecords((prev) => ({
        ...prev,
        [`${tab}-${activeTabs[0]}`]: { page: 1, cards: [], totalCount: 0 },
      }));
    } else {
      setSelectedFilter("All");
      setRecords((prev) => ({
        ...prev,
        [`${tab}-All`]: { page: 1, cards: [], totalCount: 0 },
      }));
    }
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

  if (!tabsData || !cardData || !content) return null;


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
          <h5 className="font-medium text-pink">{content?.tagName ?? ""}</h5>
        </div>

        <div className="py-3 max-w-4xl">
          <h1
            className="text-black font-light"
            dangerouslySetInnerHTML={{ __html: content?.description ?? "" }}
          />
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

          {selectedTab === "Sectors" && renderFilterButtons(activeTabs)}

          {/* Research Paper Cards */}
          <div className="pt-8">
            {currentData.cards.length === 0 && (
              <div className="flex justify-center">No results</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {currentData.cards.map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date=""
                    title={card.title}
                    image={card.image}
                    link={card.link}
                    category={card.sectors[0]?.name ?? ""}
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