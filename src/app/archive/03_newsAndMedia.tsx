"use client";
import { useState, useMemo, useRef } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import Link from "next/link";

// Types
type FilterType = "All" | "Publication Year" | "sectors";
type SectorType =
  | "All"
  | "Transportation"
  | "Water and Sanitation"
  | "Energy"
  | "Urban Planning"
  | "Rural and Agri Infra"
  | "Education"
  | "Health Infra";

interface NewsletterCard {
  id: number;
  img: any; // Consider using a more specific type for images
  category: string;
  title: string;
  sectors: SectorType;
  date: string;
  description: string;
  link: string;
}

// Constants
const FILTER_TYPES: FilterType[] = ["All", "Publication Year"];
const YEARS = ["2022", "2023"] as const;
const SECTORS: SectorType[] = [
  "All",
  "Transportation",
  "Water and Sanitation",
  "Energy",
  "Urban Planning",
  "Rural and Agri Infra",
  "Education",
  "Health Infra",
];
const INITIAL_VISIBLE_COUNT = 3;

const allcards = [
  {
    id: 1,
    img: "/assets/archive/newsAndMedia/newsMedia1.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Nov 11, 2022",
    description:
      "Infravisioning: Nine Reasons India Needs A New Highway Services Authority",
    link: "https://www.ndtvprofit.com/opinion/infravisioning-nine-reasons-india-needs-a-new-highway-services-authority",
  },
  {
    id: 2,
    img: "/assets/archive/newsAndMedia/newsMedia2.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Oct 28, 2022",
    description:
      "Infravisioning: Why Green Is The Best Among Many Colours Of Hydrogen",
    link: "https://www.ndtvprofit.com/opinion/infravisioning-why-green-is-the-best-among-many-colours-of-hydrogen",
  },
  {
    id: 3,
    img: "/assets/archive/newsAndMedia/newsMedia3.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Dec 9, 2022",
    description:
      "Infravisioning: It's Time To Embrace The Idea Of Coastal Economic Zones",
    link: "https://www.ndtvprofit.com/business/its-time-to-embrace-the-idea-of-coastal-economic-zones-infravisioning-with-vinayak-chatterjee",
  },
  {
    id: 4,
    img: "/assets/archive/newsAndMedia/newsMedia4.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Nov 25, 2022",
    description:
      "Infravisioning: Funding Done, Focus Now Must Shift To Project Execution",
    link: "https://www.ndtvprofit.com/opinion/funding-done-focus-now-must-shift-to-project-execution-infravisioning",
  },
  {
    id: 5,
    img: "/assets/archive/newsAndMedia/newsMedia5.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Oct 20, 2022",
    description: "Infravisioning: How Safe Are India's Dams?",
    link: "https://www.ndtvprofit.com/business/infravisioning-how-safe-are-indias-dams",
  },
  {
    id: 6,
    img: "/assets/archive/newsAndMedia/newsMedia6.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Aug 25, 2022",
    description: "Infravisioning: A Historic Reform In Public Procurement",
    link: "https://www.ndtvprofit.com/opinion/infravisioning-a-historic-reform-in-public-procurement",
  },
  {
    id: 7,
    img: "/assets/archive/newsAndMedia/newsMedia7.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Sept 16, 2022",
    description:
      "Infravisioning: How The Screws Are Getting Tightened On Power Discoms",
    link: "https://www.ndtvprofit.com/opinion/infravisioning-how-the-screws-are-getting-tightened-on-power-discoms",
  },
  {
    id: 8,
    img: "/assets/archive/newsAndMedia/newsMedia8.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Sept 29, 2022",
    description:
      "Infravisioning: India’s Big Attempt To Fix Its Logistics Snarl",
    link: "",
  },
  {
    id: 9,
    img: "/assets/archive/newsAndMedia/newsMedia9.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Jan 4, 2023",
    description: "Infra brushstrokes for the Budget ",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/InfraBrushstrokes-Business-Standard_04012023.pdf",
  },
  {
    id: 10,
    img: "/assets/archive/newsAndMedia/newsMedia10.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Jun 07, 2022",
    description: "Urban mining",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/UrbanMining.pdf",
  },
  {
    id: 11,
    img: "/assets/archive/newsAndMedia/newsMedia11.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Aug 31, 2022",
    description: "A quarter century of PPP",
    link: "https://www.business-standard.com/article/opinion/a-quarter-century-of-public-private-partnership-122083101156_1.html",
  },
  {
    id: 12,
    img: "/assets/archive/newsAndMedia/newsMedia12.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "May 04, 2022",
    description: "How safe are India’s dams?",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/HowSafe.pdf",
  },
  {
    id: 13,
    img: "/assets/archive/newsAndMedia/newsMedia13.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Aug 03, 2022",
    description: "IFS: Getting set to make an impact ",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/IFS.pdf",
  },
  {
    id: 14,
    img: "/assets/archive/newsAndMedia/newsMedia14.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Jan 10, 2022",
    description: "Infra expectations from Budget",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Infra.pdf",
  },
  {
    id: 15,
    img: "/assets/archive/newsAndMedia/newsMedia18.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Mar 02, 2022",
    description: "Procurement policy needs to cover more ground",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Procurement.pdf",
  },
  {
    id: 16,
    img: "/assets/archive/newsAndMedia/newsMedia17.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Feb 04, 2022",
    description: "Time to focus on project execution ",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Time-To.pdf",
  },
  {
    id: 17,
    img: "/assets/archive/newsAndMedia/newsMedia16.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "July 06, 2022",
    description: "Unleashing the ropeways",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Unleashing-The.pdf",
  },
  {
    id: 18,
    img: "/assets/archive/newsAndMedia/newsMedia15.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Apr 6, 2022",
    description: "Measures to Rejunevate Public-Private Partnerships",
    link: "https://www.business-standard.com/article/opinion/measures-to-rejuvenate-public-private-partnerships-122040501433_1.html",
  },
];

export default function NewsAndMedia() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      // const containerRect = container.getBoundingClientRect();
      // const tabRect = tab.getBoundingClientRect();
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    setSelectedFilter(
      tab === "Publication Year"
        ? YEARS[0]
        : tab === "sectors"
        ? SECTORS[0]
        : "All"
    );
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
  };

  const filteredCards = useMemo(() => {
    if (selectedTab === "Publication Year") {
      return allcards.filter(
        (card) => card.date.split(" ").pop() === selectedFilter
      );
    }
    if (selectedTab === "sectors" && selectedFilter !== "All") {
      return allcards.filter((card) => card.sectors === selectedFilter);
    }
    return allcards;
  }, [selectedTab, selectedFilter]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT);
  };

  const renderFilterButtons = (filters: readonly string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex  gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            className={`text-base cursor-pointer text-nowrap rounded-[50px] px-3 py-1 sm:px-6 sm:py-3
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
    <section id="news-and-media " className="bg-whitesmoke">
      <div className="w-container blade-top-padding-sm blade-bottom-padding ">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">In the News and Media</h5>
        </div>

        <div className="py-3 max-w-3xl">
          <h1 className="text-black font-light">
            <span className="text-black font-medium">
              {" "}
              The Infravision Foundation{" "}
            </span>
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

          {/* Filter Buttons */}
          {selectedTab === "Publication Year" && renderFilterButtons(YEARS)}
          {selectedTab === "sectors" && renderFilterButtons(SECTORS)}

          {/* Newsletter Cards */}
          <div
            className={`${
              selectedTab === "Publication Year" ? "pt-8" : "pt-8"
            }`}
          >
            {filteredCards.length === 0 && (
              <div className="flex justify-center"> No results </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {filteredCards.slice(0, visibleCount).map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={card.date}
                    title={card.title}
                    image={card.img}
                    link={card.link}
                    category={card.category}
                    description={card.description}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>
            {visibleCount < filteredCards.length && (
              <div className="flex w-full blade-top-padding-sm">
                <button
                onClick={handleSeeMore}
                  className={`group mx-auto text-xl lg:text-2xl   text-pink hover:text-white   text-nowrap w-40  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
                >
                  <span className="z-50 relative">See more</span>
                  <span
                    className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
                  ></span>
                  <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[5] transition-all duration-700 ease-in-out z-0"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
