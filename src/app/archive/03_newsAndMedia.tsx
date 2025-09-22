"use client";
import { useState, useMemo, useRef } from "react";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";
import { yearApiResponse } from "./02_newsletter";


// Types
type FilterType = "All" | "Publication year" | "sectors";
const FILTER_TYPES: FilterType[] = ["All", "Publication year"];



interface cardApiResponse {
  id: string;
  title: string;
  subtitle: string;
  authoreName: string;
  date: string;
  coverImage: string;
  publicationYear: number;
  active: boolean;
}

interface CardApiResponse {
  data: cardApiResponse[];
}

const allcards = [
  {
    id:54,
    img: "/assets/archive/newsAndMedia/vrinda.png",
    category: "News",
    title: "Vrinda Singh and Priyanka Bains, Research Associates, The Infravision Foundation",
    sectors: "",
    date: "August 9, 2025",
    description: "Cold Rooms in Local Markets: Securing Farmers, Delivering Nutrition",
    link: "/assets/pdf/vrinda-singh-priyanka-bains.pdf",
  },
  {
    id:53,
    img: "/assets/archive/newsAndMedia/hyderbad.webp",
    category: "News",
    title: "Dr. Mutum Chaobisana",
    sectors: "",
    date: "August 9, 2025",
    description: "Hyderabad's FSI deregulation:  A missed opportunity",
    link: "/assets/pdf/hyderabad-fSI-deregulation.pdf",
  },
   {
    id:52,
    img: "/assets/archive/newsAndMedia/womanEmpowerment.jpg",
    category: "News",
    title: "Rumjhum Chatterjee",
    sectors: "",
    date: "August 9, 2025",
    description: "Empowering Women for Viksit Bharat 2047",
    link: "/assets/pdf/empowering-women-for-viksit-bharat.pdf",
  },
    {
    id:51,
    img: "/assets/archive/newsAndMedia/urbanFund.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "August 20, 2025",
    description: "Shaping the Urban Challenge Fund",
    link: "/assets/pdf/shaping-the-urban-challenge-fund.pdf",
  },
   {
    id:50,
    img: "/assets/archive/newsAndMedia/coal.jpg",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "July 18,2025",
    description: "Coal, Clean, Air and  a Welcome Resolution",
    link: "/assets/pdf/coalClean.pdf",
  },
  {
    id:49,
    img: "/assets/archive/newsAndMedia/ropeway.jpg",
    category: "News",
    title: "Kaveree Bamzai",
    sectors: "",
    date: "July 18,2025",
    description: "Long haul:A national ropeway policy would aid urban mobility",
    link: "/assets/archive/newsAndMedia/kaveeryMamRopways.jpeg",
  },

]
export default function NewsAndMedia() {

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const { data: content } = useApiHook<ApiResponse>({
    url: "/content/archive-newsMedia-content",
    cacheKey: "archive-newsAndMedia",
  });

  //Publication year tab API Call
  const { data: year } = useApiHook<yearApiResponse>({
    url: "/archives/media-coverage/years",
    cacheKey: "archive-year-tab",
  });

  //Cards API Call
  const { data: cards } = useApiHook<CardApiResponse>({
    url: "/archives/media-coverage?page=1&limit=3",
    cacheKey: "archive-newsMedia-cards",
  });


 const response = cards?.data ?? [];



  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
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
    scrollToCenter(index);
  };

  const filteredCards = useMemo(() => {
    if (selectedTab === "Publication year" && selectedFilter!="All") {
      return response.filter(
        (card: any) =>
          new Date(card.date).getFullYear() === Number(selectedFilter)
      );
    }
     return response.slice(0, 3);
  }, [selectedTab, selectedFilter,response]);



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

  if (!year || !content || !cards) { return null }

  return (
    <section id="news-and-media" className="bg-whitesmoke">
      <div className="w-container blade-top-padding-sm blade-bottom-padding ">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">{content?.tagName}</h5>
        </div>

        <div className="py-3 max-w-3xl">
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
         {filteredCards.length === 0 && (
              <div className="flex justify-center"> No results </div>
            )} 
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
             {filteredCards.slice(0,).map((card: any) => (
                <div key={card.id}>
                  <NewsCard
                    date={card.date}
                    title={card.title}
                    image={card.coverImage}
                    link={card.link}
                    category={card.subtitle}
                    description={card.authoreName}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>
            {/* {visibleCount < filteredCards.length && (
              <div className="flex w-full blade-top-padding-sm">
                <button
                  onClick={handleSeeMore}
                  className={`group mx-auto text-xl lg:text-2xl   text-pink hover:text-white   text-nowrap w-40  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
                >
                  <span className="z-20 relative">See more</span>
                  <span
                    className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
                  ></span>
                  <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[5] transition-all duration-700 ease-in-out z-0"></span>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}





