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
  slug?: string;
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
const INITIAL_LIMIT = 3;

export default function ResearchPapers() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [cards, setCards] = useState<ResearchPaper[]>([]);
  const [activeTabs, setActiveTabs] = useState<{ name: string; id: string }[]>([]);

  // Content API
  const { data: content } = useApiHook<contentApiResponse>({
    url: "/content/knowledge-reserach-content",
    cacheKey: "knowledgeContentTab",
  });

  // Tabs API
  const { data: tabsData } = useApiHook<TabApiRaw[]>({
    url: "/knowledge/sectors",
    cacheKey: "knowledgeSectorTab",
  });

  // Cards API: fetch when selectedFilter or limit changes


  const cardsApiUrl = selectedFilter
  ? `/knowledge/research-papers/by-sector/${selectedFilter}?page=1&limit=${limit}`
  : `/knowledge/research-papers?page=1&limit=${limit}`;


const { data: cardData } = useApiHook<{
  researchPapers: ResearchPaper[];
  totalCount: number;
}>({
  url: cardsApiUrl,
  cacheKey: `knowledgeCardData-page-1-limit-${limit}-sectorId-${selectedFilter ?? "all"}`,
});

  // Update active tabs once tabsData loads
  useEffect(() => {
    if (tabsData) {
      setActiveTabs(tabsData.map(tab => ({ name: tab.name, id: tab.id })));
      // set default filter if "Sectors" tab is active
      if (selectedTab === "Sectors" && tabsData.length > 0 && !selectedFilter) {
        setSelectedFilter(tabsData[0].id);
      }
    }
  }, [tabsData, selectedTab, selectedFilter]);

  // Update cards when cardData changes
 useEffect(() => {
  if (cardData?.researchPapers) {
    setCards(cardData.researchPapers);
  } else {
    setCards([]); // clear if no data
  }
}, [cardData]);

  // Filter cards by tab/filter
  const filteredCards = useMemo(() => {
    let result = cards;
    if (selectedTab === "Sectors" && selectedFilter) {
      result = cards.filter(card =>
        card.sectors.some(sector => sector.slug === selectedFilter)
      );
    }
    return result.slice(0, limit);
  }, [cards, selectedTab, selectedFilter, limit]);

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

  const handleFilterClick = (filterId: string, index: number) => {
    setSelectedFilter(filterId);
    setLimit(INITIAL_LIMIT);
    scrollToCenter(index);
  };

  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    setLimit(INITIAL_LIMIT);
    if (tab === "Sectors" && activeTabs.length > 0) {
      setSelectedFilter(activeTabs[0].id);
    } else {
      setSelectedFilter(null);
    }
  };

  const handleSeeMore = () => {
    setLimit(prev => prev + 3);
  };

  if (!tabsData) return null;

  const renderFilterButtons = (filters: { name: string; id: string }[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter.id}
            ref={el => { tabRefs.current[index] = el; }}
            className={`text-base text-nowrap cursor-pointer rounded-[50px] px-3 py-1 sm:px-6 sm:py-3 ${
              selectedFilter === filter.id
                ? "border border-pink text-white bg-pink font-medium"
                : "border border-lightgray/30"
            }`}
            onClick={() => handleFilterClick(filter.id, index)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="research-papers">
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
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
              {FILTER_TYPES.map(tab => (
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

          {selectedTab === "Sectors" && renderFilterButtons(activeTabs)}

          {/* Research Paper Cards */}
          <div className="pt-8">
            {filteredCards.length === 0 && (
              <div className="flex justify-center">No results</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {filteredCards.map(card => (
                <NewsCard
                  key={card.id}
                  date={card.date}
                  title={card.title}
                  image={card.image}
                  link={card.link}
                  category={card.sectors[0]?.name ?? ""}
                  description={card.description}
                  classes="line-clamp-3"
                  ctaType="read more"
                />
              ))}
            </div>

            {/* See more button */}
            {cards.length > filteredCards.length && (
              <div className="flex justify-center mt-4">
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
