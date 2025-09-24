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
<<<<<<< HEAD
=======
// const YEARS = ["2025", "2024"] as const;
const SECTORS: SectorType[] = [
  "All",
  "Transportation",
  "Water and Sanitation",
  "Energy",
  "Urban Planning",
  "Rural and Agri Infra",
  "Education",
  "Health Infra",
  "Infrastructure"
];
const INITIAL_VISIBLE_COUNT = 3;


const allcards = [
   
  {
    id: 14,
    img: img_14,
    category: "Urban Planning",
    title: "",
    sectors: "Urban Planning",
    date: " ",
    description:"Impact of FSI Deregulation in Hyderabad",
    link: "/assets/pdf/report-fsi-deregulation-in-hyderabad.pdf",
  },
   {
    id: 13,
    img: img_13,
    category: "Infrastructure",
    title: "",
    sectors: "Infrastructure",
    date: " ",
    description:"Removing Barriers to Faster Penetration of Trees Outside Forests Productsin Construction Sector",
    link: "/assets/pdf/removing-barriers-to-faster-penetration-of-trees-final-report.pdf",
  },
   {
    id: 10,
    img: img_12,
    category: "Urban Planning",
    title: "",
    sectors: "Urban Planning",
    date: " ",
    description:"Relieving urban congestion and promoting tourism through ropeways",
    link: "/assets/pdf/urbanCongestion.pdf",
  },
  {
    id: 1,
    img: img_01,
    category: "Rural and Agri Infra",
    title: "",
    sectors: "Rural and Agri Infra",
    date: "",
    description:
      "Study on the implementation of compensatory afforestation in India",
    link: "/assets/pdf/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
  },
  {
    id: 2,
    img: img_02,
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: " ",
    description: "The case for developing high-speed rail corridors in India",
    link: "/assets/pdf/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
  },
  {
    id: 3,
    img: img_03,
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: " ",
    description: "Safe highways in India: Challenges and solutions",
    link: "/assets/pdf/Safe-Highways-in-India-Challenges-and-Solutions_August-2024.pdf",
  },
  {
    id: 4,
    img: img_04,
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: " ",
    description:
      "Strategies to improve the financial performance of the metro rail system",
    link: "/assets/pdf/Metro-Rail-Systems-Whitepaper.pdf",
  },
  {
    id: 5,
    img: img_05,
    category: "Urban Planning",
    title: "",
    sectors: "Urban Planning",
    date: " ",
    description: "Sustainability ratings for Infrastructure projects in India",
    link: "/assets/pdf/Sustainability-Rating-Infra-Whitepaper-2.pdf",
  },
  {
    id: 6,
    img: img_06,
    category: "Energy",
    title: "",
    sectors: "Energy",
    date: " ",
    description: "Mass scale rooftop solar programme for poverty alleviation",
    link: "/assets/pdf/solar.pdf",
  },
  {
    id: 7,
    img: img_07,
    category: "Transportation",
    title: "",
    sectors: "Transportation",
    date: " ",
    description: "A framework for selecting an appropriate urban transport system",
    link: "/assets/pdf/Urban-Transport-Project-White-Paper.pdf",
  },
  {
    id: 8,
    img: img_08,
    category: "Infrastructure",
    title: "",
    sectors: "Infrastructure",
    date: " ",
    description: "Surety bonds: Evaluation for diversifying risk in infrastructure financing",
    link: "/assets/pdf/Surety-Bond-White-Paper.pdf",
  },
  {
    id: 9,
    img: img_09,
    category: "Rural and Agri Infra",
    title: "",
    sectors: "Rural and Agri Infra",
    date: " ",
    description: "Ways to enhance warehouse-based sales and lending for agriculture commodities",
    link: "/assets/pdf/Warehousing-Whitepaper.pdf",
  },
 
  {
    id: 11,
    img: img_10,
    category: "Urban Planning",
    title: "",
    sectors: "Urban Planning",
    date: " ",
    description: "Decarbonizing urban transport using traffic and transport data from ICCC: A Pilot Study in NOIDA",
    link: "/assets/pdf/decarbonizing.pdf",
  },
  {
    id: 12,
    img: img_11,
    category: "Rural and Agri Infra",
    title: "",
    sectors: "Rural and Agri Infra",
    date: " ",
    description: "Expanding agricultural exports of Arunachal Pradesh through infrastructure development",
    link: "/assets/pdf/expanding.pdf",
  },
];
>>>>>>> 220ebb1993f67443f659b5661a6320e7d44aeab1

export default function ResearchPapers() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // ✅ State: store per-tab data
  const [records, setRecords] = useState<{
    [key: string]: { page: number; cards: ResearchPaper[]; totalCount: number };
  }>({});

  const { data: content } = useApiHook<contentApiResponse>({
    url: "/content/knowledge-reserach-content",
    cacheKey: "knowledgeContentTab",
  });

  // Tabs API
  const { data: tabsData } = useApiHook<TabApiRaw[]>({
    url: "/knowledge/sectors",
    cacheKey: "knowledgeSectorTab",
  });

  // ✅ Key for current tab+filter
  const currentKey = `${selectedTab}-${selectedFilter}`;

  // ✅ Current state
  const currentData = records[currentKey] ?? {
    page: 1,
    cards: [],
    totalCount: 0,
  };

  // ✅ Build API URL dynamically
  const getApiUrl = () => {
    if (selectedTab === "Sectors" && selectedFilter !== "All") {
      const sector = tabsData?.find((t) => t.name === selectedFilter);
      if (sector) {
        return `/knowledge/research-papers/by-sector/${sector.id}?page=${currentData.page}&limit=3`;
      }
    }
    return `/knowledge/research-papers?page=${currentData.page}&limit=3`;
  };

  // Cards API
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

  // ✅ Update state when API loads
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
            totalCount: cardData.pagination?.totalCount ?? 0, // ✅ fixed
          },
        };
      });
    }
  }, [cardData, currentKey, currentData.page]);

  // Active tabs
  const activeTabs = useMemo(
    () => tabsData?.map((tab) => tab.name) ?? [],
    [tabsData]
  );

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

  // ✅ Handle filter click
  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
    // Reset when switching
    setRecords((prev) => ({
      ...prev,
      [`${selectedTab}-${filterName}`]: { page: 1, cards: [], totalCount: 0 },
    }));
  };

  // ✅ Handle tab click
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

  // ✅ Handle see more
  const handleSeeMore = () => {
    setRecords((prev) => ({
      ...prev,
      [currentKey]: {
        ...currentData,
        page: currentData.page + 1,
      },
    }));
  };

  // ✅ Button condition
  const canSeeMore =
    currentData.totalCount > 0 &&
    currentData.cards.length < currentData.totalCount;

  if (!tabsData) return null;

  // Filter buttons
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