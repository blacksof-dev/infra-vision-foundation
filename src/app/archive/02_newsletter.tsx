"use client";
import { useState, useMemo, useRef } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";

// Types
type FilterType = "All" | "Publication year" | "sectors";

export type yearApiResponse = string[];

interface cardApiResponse {
  id: string;
  title: string;
  subtitle: string;
  version: string;
  publishedDate: string;
  coverImage: string;
  fileUrl: string;
}


interface cardApiResponse {
  data: cardApiResponse[];
}

// Main Tab 
const FILTER_TYPES: FilterType[] = ["All", "Publication year"];
<<<<<<< HEAD
=======
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
      id: 28,
    img: "/assets/archive/newsletter/crunching.png",
    category: "Volume 28",
    title: "",
    sectors: "",
     date: "September 2025",
    description:"Crunching Data,Analysing Information",
    link: "/assets/pdf/crunchingData.pdf",
  },
  {
    id: 27,
    img: "/assets/archive/newsletter/agustNewsletter.png",
    category: "Volume 27",
    title: "",
    sectors: "",
    date: "August 2025",
    description:
      "TIF reaches out to stakeholders",
    link: "/assets/pdf/augustNewsletter.pdf",
  },
  {
    id: 25,
    img: "/assets/archive/newsletter/latest1.png",
    category: "Volume 26",
    title: " ",
    sectors: "",
    date: "July 2025",
    description:
      "Do you want to be an Infrapandit?",
    link: "/assets/pdf/july.pdf",
  },
   {
    id: 26,
    img: "/assets/archive/newsletter/latest2.png",
    category: "Volume 25",
    title: " ",
    sectors: "",
    date: "June 2025",
    description:
      "Transforming Cities into Frontiers for Economic Growth ",
    link: "/assets/pdf/june2025.pdf",
  },

  {
    id: 1,
    img: "/assets/archive/newsletter/newsletter1.png",
    category: "Volume 24",
    title: "",
    sectors: "",
    date: "May 2025",
    description:
      "Making change happen",
    link: "/assets/pdf/letter1.pdf",
  },
   {
    id: 2,
    img: "/assets/archive/newsletter/newsletter2.png",
    category: "Volume 23",
    title: " ",
    sectors: "",
    date: "April 2025",
    description:
      "Decarbonising urban transport",
    link: "/assets/pdf/letter2.pdf",
  },
   {
    id: 3,
    img: "/assets/archive/newsletter/newsletter3.png",
    category: "Volume 22",
    title: " ",
    sectors: "",
    date: "March 2025",
    description:
      "Fast-tracking High-Speed Rail",
    link: "/assets/pdf/letter3.pdf",
  },
  {
    id: 4,
    img: "/assets/archive/newsletter/newsletter4.png",
    category: "Volume 21",
    title: " ",
    sectors: "",
    date: "February 2025",
    description:
      "CAIRA Roundtable on agri exports is a success",
    link: "/assets/pdf/letter4.pdf",
  },
  {
    id: 5,
    img: "/assets/archive/newsletter/newsletter5.png",
    category: "Volume 20",
    title: " ",
    sectors: "",
    date: "January 2025",
    description:
      "Workshop on Trees Outside Forests",
    link: "/assets/pdf/letter5.pdf",
  },
   {
    id: 6,
    img: "/assets/archive/newsletter/newsletter6.png",
    category: "Volume 19",
    title: " ",
    sectors: "",
    date: "December 2024",
    description:
      "Telling the story of India",
    link: "/assets/pdf/letter6.pdf",
  },
   {
    id: 7,
    img: "/assets/archive/newsletter/newsletter7.png",
    category: "Volume 18",
    title: " ",
    sectors: "",
    date: "November 2024",
    description:
      "CAIRA takes shape",
    link: "/assets/pdf/letter7.pdf",
  },
   {
    id: 8,
    img: "/assets/archive/newsletter/newsletter8.png",
    category: "Volume 17",
    title: " ",
    sectors: "",
    date: "October 2024",
    description:
      "The Infravision Fellowship",
    link: "/assets/pdf/letter8.pdf",
  },
   {
    id: 9,
    img: "/assets/archive/newsletter/newsletter9.png",
    category: "Volume 16",
    title: " ",
    sectors: "",
    date: "September 2024",
    description:
      "Understanding Land Value Capture in urban India",
    link: "/assets/pdf/letter9.pdf",
  },
    {
    id: 10,
    img: "/assets/archive/newsletter/newsletter10.png",
    category: "Volume 15",
    title: " ",
    sectors: "",
    date: "August 2024",
    description:
      "The need for high-speed rail corridors",
    link: "/assets/pdf/letter10.pdf",
  },
  {
    id: 11,
    img: "/assets/archive/newsletter/newsletter11.png",
    category: "Volume 14",
    title: " ",
    sectors: "",
    date: "July 2024",
    description:
      "Champions Lab takes off",
    link: "/assets/pdf/letter11.pdf",
  },
  {
    id: 12,
    img: "/assets/archive/newsletter/newsletter12.png",
    category: "Volume 13",
    title: " ",
    sectors: "",
    date: "June 2024",
    description:
      "The building blocks of mythology",
    link: "/assets/pdf/letter12.pdf",
  },
  {
    id: 13,
    img: "/assets/archive/newsletter/newsletter13.png",
    category: "Volume 12",
    title: " ",
    sectors: "",
    date: "May 2024",
    description:
      "Diving into the water bodies census",
    link: "/assets/pdf/letter13.pdf",
  },
  {
    id: 14,
    img: "/assets/archive/newsletter/mumbai.png",
    category: "Volume 11",
    title: " ",
    sectors: "",
    date: "April 2024",
    description:
      "Sustainability Ratings is the buzz in Mumbai",
    link: "/assets/pdf/letter14.pdf",
  },
  {
    id: 15,
    img: "/assets/archive/newsletter/newsletter15.png",
    category: "Volume 10",
    title: " ",
    sectors: "",
    date: "March 2024",
    description:
      "No grain drain",
    link: "/assets/pdf/letter15.pdf",
  },
  {
    id: 16,
    img: "/assets/archive/newsletter/newsletter16.png",
    category: "Volume 9",
    title: " ",
    sectors: "",
    date: "February 2024",
    description:
      "Sooraj Se Rozgari gets PM nod",
    link: "/assets/pdf/letter16.pdf",
  },

    {
    id: 17,
    img: "/assets/archive/newsletter/newsletter17.png",
    category: "Volume 8",
    title: " ",
    sectors: "",
    date: "January 2024",
    description:
      "Taking Surety Bonds and Sustainability Ratings to industry audience in Bangalore",
    link: "/assets/pdf/letter17.pdf",
  },
     {
    id: 18,
    img: "/assets/archive/newsletter/newsletter18.png",
    category: "Volume 7",
    title: " ",
    sectors: "",
    date: "December 2023",
    description:
      "Making commodities count for more",
    link: "/assets/pdf/letter18.pdf",
  },
    {
    id: 19,
    img: "/assets/archive/newsletter/newsletter19.png",
    category: "Volume 6",
    title: " ",
    sectors: "",
    date: "November 2023",
    description:
      "Ideas aplenty at quarterly meeting",
    link: "/assets/pdf/letter19.pdf",
  },
   {
    id: 20,
    img: "/assets/archive/newsletter/newsletter20.png",
    category: "Volume 5",
    title: " ",
    sectors: "",
    date: "October 2023",
    description:
      "Green signal for green ratings",
    link: "/assets/pdf/letter20.pdf",
  },
   {
    id: 21,
    img: "/assets/archive/newsletter/newsletter21.png",
    category: "Volume 4",
    title: " ",
    sectors: "",
    date: "September 2023",
    description:
      "Smart city, smart PT",
    link: "/assets/pdf/letter21.pdf",
  },
    {
    id: 22,
    img: "/assets/archive/newsletter/newsletter22.png",
    category: "Volume 3",
    title: " ",
    sectors: "",
    date: "August 2023",
    description:
      "The quarterly meeting",
    link: "/assets/pdf/letter22.pdf",
  },
   {
    id: 23,
    img: "/assets/archive/newsletter/newsletter23.png",
    category: "Volume 2",
    title: " ",
    sectors: "",
    date: "July 2023",
    description:
      "City mobility",
    link: "/assets/pdf/letter23.pdf",
  },
     {
    id: 24,
    img: "/assets/archive/newsletter/newsletter24.png",
    category: "Volume 1",
    title: " ",
    sectors: "",
    date: "June 2023",
    description:
      "Here comes the sun",
    link: "/assets/pdf/letter24.pdf",
  },
>>>>>>> 220ebb1993f67443f659b5661a6320e7d44aeab1



export default function Newsletters() {

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>();


  //Content API Call
  const { data: content } = useApiHook<ApiResponse>({
    url: "/content/archive-newsletter-content",
    cacheKey: "archive-newsletter",
  });

  //Publication year tab API Call
  const { data: year } = useApiHook<yearApiResponse>({
    url: "/archives/newsletter/years",
    cacheKey: "archive-year-tab",
  });

  //Cards API Call
  const { data: cards } = useApiHook<cardApiResponse>({
    url: "/archives/newsletter?page=1&limit=3",
    cacheKey: "archive-newsletter-cards",
  });




  const response = cards?.data ?? [];
 

  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    if (tab === "Publication year" && year?.length) {
      setSelectedFilter(year[0])
    } else {
      setSelectedFilter("All");
    }

 
  };

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index)
  };

  const filteredCards = useMemo(() => {
    if (selectedTab === "Publication year") {
      return response.filter(
        (card) =>
           new Date(card.publishedDate).getFullYear() === Number(selectedFilter)
      );
    }
    return response;
  }, [response, selectedTab, selectedFilter]);



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


  if (!content || !year || !cards) { return null }

  return (
    <section id="newsletters">
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">{content.tagName}</h5>
        </div>

        <div className="py-3 max-w-[890px] ">
          <h1 className="text-black font-light" dangerouslySetInnerHTML={{ __html: content.title }} />


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
          {selectedTab === "Publication year" && renderFilterButtons(year)}


          {/* Newsletter Cards */}
          <div
            className={`${selectedTab === "Publication year" ? "pt-8" : "pt-8"
              }`}
          >
            {
              filteredCards.length === 0 && <div className="flex justify-center "> No results </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {filteredCards.slice(0, ).map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={card.publishedDate}
                    title={card.title}
                    image={card.coverImage}
                    link={card.fileUrl}
                    category={card.version}
                    description={card.subtitle}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>

            {/* {visibleCount < filteredCards.length && (
              <div className="flex justify-center mb-4  blade-top-padding-sm">
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
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
