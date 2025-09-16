"use client";
import { useState, useMemo, useRef, useEffect } from "react";

import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useApiHook } from "@/lib/useApi";

// Types
type FilterType = "All" | "Sectors";

interface TabApiRaw {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  paperIds: string[];
  blogIds: string[];
  papers: any[];
}

interface TabApiResponse {
  name: string;
  active: boolean;
}

interface contentApiResponse {
  tagName: string;
  title: string;
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
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState<ResearchPaper[]>([]);

  const { data: content } = useApiHook<contentApiResponse>({
    url: "/content/knowledge-reserach-content",
    cacheKey: "knowledgeContentTab",
  });



  // Tabs API
  const { data: tabsData } = useApiHook<TabApiRaw[]>({
    url: "/knowledge/sectors?activeOnly=true",
    cacheKey: "knowledgeSectorTab",
  });

  // Cards API
  const { data: cardData } = useApiHook<{ researchPapers: ResearchPaper[] }>({
    url: `/knowledge/research-papers?page=${page}&limit=3`,
    cacheKey: `knowledgeCardData-page-${page}`,
  });

  // Map active tabs
  const activeTabs = useMemo(
    () => tabsData?.filter(tab => tab.active).map(tab => tab.name) ?? [],
    [tabsData]
  );

  console.log(content)
  // Append newly fetched cards
  useEffect(() => {
    if (cardData?.researchPapers) {
      setCards(prev => [...prev, ...cardData.researchPapers]);
    }
  }, [cardData]);

  // Filter cards by tab/filter
  const filteredCards = useMemo(() => {
    if (selectedTab === "Sectors" && selectedFilter !== "All") {
      return cards.filter(card =>
        card.sectors.some(sector => sector.name === selectedFilter)
      );
    }
    return cards;
  }, [cards, selectedTab, selectedFilter]);

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

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
  };

  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    if (tab === "Sectors" && activeTabs.length > 0) {
      setSelectedFilter(activeTabs[0]);
    } else {
      setSelectedFilter("All");
    }
  };

  const handleSeeMore = () => {
    setPage(prev => prev + 1);
  };

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
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">{content?.tagName ?? ""}</h5>
        </div>

        <div className="py-3 max-w-4xl">
          <h1 className="text-black font-light" dangerouslySetInnerHTML={{ __html: content?.title ?? "" }} />
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

          {selectedTab === "Sectors" && renderFilterButtons(activeTabs)}

          {/* Research Paper Cards */}
          <div className="pt-8">
            {filteredCards.length === 0 && (
              <div className="flex justify-center">No results</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {filteredCards.map(card => (
                <div key={card.id}>
                  <NewsCard
                    date={card.date}
                    title={card.title}
                    image={card.image}
                    link={card.link}
                    category={card.sectors[0]?.name ?? ""}
                    description={card.description}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>

            {(cardData?.researchPapers?.length ?? 3) >= 3 && (
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
