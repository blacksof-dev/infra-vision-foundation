"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useApiHook } from "@/lib/useApi";

// Types
type FilterType = "All" | "Publication year" | "Sectors";

export interface TabApiRaw {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface contentApiResponse {
  tagName: string;
  title: string;
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
  sectors: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface CardApiResponse {
  blogs: BlogsApiResponse[];
  pagination: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const FILTER_TYPES: FilterType[] = ["All", "Publication year", "Sectors"];
const PAGE_LIMIT = 3;

export default function Blogs() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const [records, setRecords] = useState<{
    [key: string]: {
      page: number;
      cards: BlogsApiResponse[];
      totalCount: number;
    };
  }>({});

  // Content API
  const { data: content } = useApiHook<contentApiResponse>({
    url: "/content/knowledge-blogs-content",
    cacheKey: "knowledge-blogs-content",
  });

  // Year API
  const { data: yearTab } = useApiHook<number[]>({
    url: "/knowledge/blogs/years?activeOnly=true",
    cacheKey: "knowledge-blogs-year",
  });

  // Sector API
  const { data: sectorTab } = useApiHook<TabApiRaw[]>({
    url: "/knowledge/sectors?activeOnly=true",
    cacheKey: "knowledge-blogs-sectors",
  });

  const activeTabs = useMemo(
    () => sectorTab?.map((tab) => tab.name) ?? [],
    [sectorTab]
  );
  const years = yearTab ?? [];
  const currentKey = `${selectedTab}-${selectedFilter}`;
  const currentData = records[currentKey] ?? {
    page: 1,
    cards: [],
    totalCount: 0,
  };

  // Build API URL dynamically
  const getApiUrl = () => {
    if (selectedTab === "Sectors" && selectedFilter !== "All") {
      const sector = sectorTab?.find((t) => t.name === selectedFilter);
      if (sector) {
        return `/knowledge/blogs/by-sector/${sector.id}?page=${currentData.page}&limit=${PAGE_LIMIT}`;
      }
    }
    return `/knowledge/blogs?page=${currentData.page}&limit=${PAGE_LIMIT}`;
  };

  // Cards API
  const { data: cardData } = useApiHook<CardApiResponse>({
    url: getApiUrl(),
    cacheKey: `knowledge-blogs-cardData-${currentKey}-page-${currentData.page}`,
  });

  // Update state when API loads

  useEffect(() => {
    if (cardData?.blogs) {
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
                ? cardData.blogs
                : [...prevState.cards, ...cardData.blogs],
            totalCount: cardData.pagination?.totalCount ?? 0, 
          },
        };
      });
    }
  }, [cardData, currentKey, currentData.page]);

  // Scroll filter button to center
  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;
    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
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

  // Handle tab click
  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    if (tab === "Sectors" && activeTabs.length > 0) {
      setSelectedFilter(activeTabs[0]);
      setRecords((prev) => ({
        ...prev,
        [`${tab}-${activeTabs[0]}`]: { page: 1, cards: [], totalCount: 0 },
      }));
    } else if (tab === "Publication year" && years.length > 0) {
      setSelectedFilter(years[0].toString());
      setRecords((prev) => ({
        ...prev,
        [`${tab}-${years[0]}`]: { page: 1, cards: [], totalCount: 0 },
      }));
    } else {
      setSelectedFilter("All");
      setRecords((prev) => ({
        ...prev,
        [`${tab}-All`]: { page: 1, cards: [], totalCount: 0 },
      }));
    }
  };

  // Handle page click
  const handlePageClick = (page: number) => {
    setRecords((prev) => ({
      ...prev,
      [currentKey]: { ...currentData, page, cards: [] },
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

  // Pagination
  const canSeeMore =
    currentData.totalCount > 0 &&
    currentData.cards.length < currentData.totalCount;

  if (!sectorTab || !yearTab) return null;

  // Render filter buttons
  const renderFilterButtons = (filters: string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`text-base text-nowrap cursor-pointer rounded-[50px] px-3 py-1 sm:px-6 sm:py-3 ${
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
        {/* Header */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">{content?.tagName}</h5>
        </div>

        <div className="py-3 max-w-4xl">
          <h1
            className="text-black font-light"
            dangerouslySetInnerHTML={{ __html: content?.title ?? "" }}
          />
        </div>

        {/* Tabs */}
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
                  className={`mt-auto text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4 ${
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

          {/* Sub-filters */}
          {selectedTab === "Publication year" &&
            renderFilterButtons(yearTab.map((y) => y.toString()))}
          {selectedTab === "Sectors" && renderFilterButtons(activeTabs)}

          {/* Blog Cards */}
          <div className="pt-8">
            {currentData.cards.length === 0 && (
              <div className="flex justify-center">No results</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {currentData.cards.map((card) => (
                <NewsCard
                  key={card.id}
                  date={card.publishedDate}
                  title={card.title}
                  image={card.coverImage}
                  link={card.docFile}
                  category={card.sectors[0]?.name ?? ""}
                  description=""
                  classes="line-clamp-3"
                  ctaType="read more"
                />
              ))}
            </div>

            {/* Pagination */}
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
