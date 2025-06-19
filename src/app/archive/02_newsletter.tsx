"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";

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
const FILTER_TYPES: FilterType[] = ["All", "Publication Year", "sectors"];
const YEARS = ["2025", "2024"] as const;
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

const secondFilter = ["2025", "2024"];
const thridFilter = [
  "All",
  "Transportation",
  "Water and Sanitation",
  "Energy",
  "Urban Planning",
  "Rural and Agri Infra",
  "Education",
  "Health Infra",
];
const allcards = [
  {
    id: 1,
    img: "/assets/archive/newsletter/newsletter1.png",
    category: "Volume 24",
    title: "",
    sectors: "",
    date: "May 2025",
    description:
      "The Infravision Foundation’s quadruple impact, Rumjhum Chatterjee at The Edge and more.",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/05/INFRAVISION-TALK-May-2025.pdf",
  },
   {
    id: 2,
    img: "/assets/archive/newsletter/newsletter2.png",
    category: "Volume 23",
    title: " ",
    sectors: "",
    date: "April 2025",
    description:
      "From urban decarbonisation and Noida to CAIRA’s first-ever engagement in Arunachal Pradesh and beyond.",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/04/INFRAVISION-TALK-April-2025.pdf",
  },
   {
    id: 3,
    img: "/assets/archive/newsletter/newsletter3.png",
    category: "Volume 22",
    title: " ",
    sectors: "",
    date: "March 2025",
    description:
      "New Report urges fast tracking of High-Speed Rail",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/04/INFRAVISION-TALK-March-2025.pdf",
  },
  {
    id: 4,
    img: "/assets/archive/newsletter/newsletter4.png",
    category: "Volume 21",
    title: " ",
    sectors: "",
    date: "February 2025",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/INFRAVISION-TALK-February-2025-Newsletter.pdf",
  },
  {
    id: 5,
    img: "/assets/archive/newsletter/newsletter5.png",
    category: "Volume 20",
    title: " ",
    sectors: "",
    date: "january 2025",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-January-2025.pdf",
  },
   {
    id: 6,
    img: "/assets/archive/newsletter/newsletter6.png",
    category: "Volume 19",
    title: " ",
    sectors: "",
    date: "December 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-December-2024.pdf",
  },
   {
    id: 7,
    img: "/assets/archive/newsletter/newsletter7.png",
    category: "Volume 18",
    title: " ",
    sectors: "",
    date: "November 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/11/INFRAVISION-TALK-November-2024.pdf",
  },
   {
    id: 7,
    img: "/assets/archive/newsletter/newsletter8.png",
    category: "Volume 17",
    title: " ",
    sectors: "",
    date: "October 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/11/INFRAVISION-TALK-November-2024.pdf",
  },
   {
    id: 8,
    img: "/assets/archive/newsletter/newsletter9.png",
    category: "Volume 17",
    title: " ",
    sectors: "",
    date: "September 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/10/INFRAVISION-TALK-September-2024.pdf",
  },
    {
    id: 9,
    img: "/assets/archive/newsletter/newsletter10.png",
    category: "Volume 15",
    title: " ",
    sectors: "",
    date: "August 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/08/INFRAVISION-TALK-August-2024.pdf",
  },
  {
    id: 10,
    img: "/assets/archive/newsletter/newsletter11.png",
    category: "Volume 14",
    title: " ",
    sectors: "",
    date: "July 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/08/INFRAVISION-TALK-July-2024.pdf",
  },
  {
    id: 11,
    img: "/assets/archive/newsletter/newsletter12.png",
    category: "Volume 13",
    title: " ",
    sectors: "",
    date: "June 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/06/June-2024.pdf",
  },
  {
    id: 12,
    img: "/assets/archive/newsletter/newsletter13.png",
    category: "Volume 12",
    title: " ",
    sectors: "",
    date: "May 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/06/May-2024.pdf",
  },
  {
    id: 13,
    img: "/assets/archive/newsletter/newsletter15.png",
    category: "Volume 10",
    title: " ",
    sectors: "",
    date: "March 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/06/10.-INFRAVISION-TALK-March-2024.pdf",
  },
  {
    id: 14,
    img: "/assets/archive/newsletter/newsletter16.png",
    category: "Volume 9",
    title: " ",
    sectors: "",
    date: "February 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/06/9.-INFRAVISION-TALK-February-2024.pdf",
  },

    {
    id: 15,
    img: "/assets/archive/newsletter/newsletter17.png",
    category: "Volume 8",
    title: " ",
    sectors: "",
    date: "january 2024",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/06/8.-INFRAVISION-TALK-January-2024.pdf",
  },
     {
    id: 16,
    img: "/assets/archive/newsletter/newsletter18.png",
    category: "Volume 7",
    title: " ",
    sectors: "",
    date: "December 2023",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/06/7.-INFRAVISION-TALK-December-2023.pdf",
  },
    {
    id: 16,
    img: "/assets/archive/newsletter/newsletter19.png",
    category: "Volume 6",
    title: " ",
    sectors: "",
    date: "November 2023",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/06/6.-INFRAVISION-TALK-November-2023.pdf",
  },
   {
    id: 17,
    img: "/assets/archive/newsletter/newsletter20.png",
    category: "Volume 5",
    title: " ",
    sectors: "",
    date: "October 2023",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/09/5.-INFRAVISION-TALK-October-2023.pdf",
  },
   {
    id: 18,
    img: "/assets/archive/newsletter/newsletter21.png",
    category: "Volume 4",
    title: " ",
    sectors: "",
    date: "September 2023",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/06/4.-INFRAVISION-TALK-September-2023.pdf",
  },
    {
    id: 19,
    img: "/assets/archive/newsletter/newsletter22.png",
    category: "Volume 3",
    title: " ",
    sectors: "",
    date: "August 2023",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/09/3.-INFRAVISION-TALK-August-2023.pdf",
  },
   {
    id: 20,
    img: "/assets/archive/newsletter/newsletter23.png",
    category: "Volume 2",
    title: " ",
    sectors: "",
    date: "July 2023",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/09/2.-INFRAVISION-TALK-July-2023.pdf",
  },
     {
    id: 21,
    img: "/assets/archive/newsletter/newsletter24.png",
    category: "Volume 1",
    title: " ",
    sectors: "",
    date: "June 2023",
    description:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/09/1.-INFRAVISION-TALK-June-2023.pdf",
  },




 

];

export default function Newsletters() {
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
      container.scrollTo({ left: offset, behavior: 'smooth' });
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
    scrollToCenter(index)
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
    <section id="newsletters">
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">Newsletters</h5>
        </div>

        <div className="py-3 max-w-[890px] ">
          <h1 className="text-black font-light">
            Data and findings from the ground,{" "}
            <span className="text-black font-medium">
              fuelled by expert foresight
            </span>
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

          {/* Filter Buttons */}
          {selectedTab === "Publication Year" && renderFilterButtons(YEARS)}
          {selectedTab === "sectors" && renderFilterButtons(SECTORS)}

          {/* Newsletter Cards */}
          <div
            className={`${selectedTab === "Publication Year" ? "pt-8" : "pt-8"
              }`}
          >
            {
              filteredCards.length === 0 && <div className="flex justify-center "> No results </div>
            }
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
              <div className="flex justify-center mb-4">
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
