"use client";
import { useEffect, useState, useMemo, useRef } from "react";

import Image from "next/image";
import { NewsCard } from "@/_components/molecules/newsCard";
import { Portal } from "@radix-ui/react-select";
import { MoveLeft, MoveRight, X } from "lucide-react";
import { BlobOptions } from "buffer";

// Gallery image data with random year and event type
const galleryImages = [
  {
    image: "assets/archive/gallery/image1.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "Vinayak Chatterjee sharing his views in a panel discussion on 'Futureproofing Bharat with resilient infrastructure",
  },
  {
    image: "assets/archive/gallery/image6.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "Mr Jagan Shah, CEO, The Infravision Foundation, at the Annual Get-together.",
  },
  {
    image: "assets/archive/gallery/image11.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "The Infravision Foundation co-founder, Ms Rumjhum Chatterjee, at an interactive discussion with employees from Suzuki Motor Corporation, Japan, at IIM Ahmedabad’s Next Bharat Thinking programme.",
  },
  {
    image: "assets/archive/gallery/image2.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "Union Minister Mr Nitin Gadkari presenting the Transport Trailblazer Award to Mr Giridhar Rajagopalan, Deputy Managing Director at AFCONS Infrastructure Limited.",
  },
  {
    image: "assets/archive/gallery/image7.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "The Infravision community at the Foundation’s Annual Get-together.",
  },
  {
    image: "assets/archive/gallery/new1.png",
    year: 2025,
    event: "Infrashakti",
    description: "",
  },
  {
    image: "assets/archive/gallery/image3.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "Mr Vinayak Chatterjee in discussion with NDTV Editor-in-Chief Mr Sanjay Pugalia.",
  },

  {
    image: "assets/archive/gallery/image8.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "The Infravision community at the Foundation’s annual get-together.",
  },
  {
    image: "assets/archive/gallery/image13.png",
    year: 2025,
    event: "Infrashakti",
    description: "",
  },
  {
    image: "assets/archive/gallery/new2.png",
    year: 2025,
    event: "Infrashakti",
    description: "",
  },
  {
    image: "assets/archive/gallery/image9.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "The Infravision community at the Foundation’s Annual Get-together.",
  },
  {
    image: "assets/archive/gallery/new3.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "The Infravision community at the Foundation’s Annual Get-together.",
  },
  {
    image: "assets/archive/gallery/image5.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "NDTV Editor-in-Chief Mr Sanjay Pugalia with three-time Grammy Award winner and  Padma Shri awardee Mr Ricky Kej.",
  },

  {
    image: "assets/archive/gallery/image10.png",
    year: 2025,
    event: "Infrashakti",
    description:
      "Ms Rumjhum Chatterjee, co-founder, The Infravision Foundation; at CII’s Corporate Women Leadership Awards, along with Ms Radhika Gupta, MD and CEO, Edelweiss Asset Management; Ms Ameera Shah, Promoter and MD, Metropolis Healthcare; Ms Rituparna Chakraborty, co-founder, Teamlease Services; and others.",
  },
  {
    image: "assets/archive/gallery/image15.png",
    year: 2025,
    event: "Infrashakti",
    description: "",
  },
];

// Types
type FilterType = "All" | "Year" | "Event";
type EventType =
  | "All"
  | "Infrashakti"
  | "Infrapandit"
  | "Awards"
  | "Annual GetTogether 2025"
  | "TIF Meetings";

interface NewsletterCard {
  id: number;
  img: any; // Consider using a more specific type for images
  category: string;
  title: string;
  event: EventType;
  date: string;
  description: string;
  link: string;
}

// Constants
const FILTER_TYPES: FilterType[] = ["All", "Year", "Event"];
const YEARS = [2024, 2025] as const;
const SECTORS: EventType[] = [
  "All",
  "Infrashakti",
  "Infrapandit",
  "Awards",
  "Annual GetTogether 2025",
  "TIF Meetings",
];
// const INITIAL_VISIBLE_COUNT = 19;

export default function Gallery() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  // Default filter: if Year tab, default to 2025, else All
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  // const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  // Filtering logic
  const filteredImages = useMemo(() => {
    if (selectedTab === "Year" && selectedFilter !== "All") {
      return galleryImages.filter(
        (img) => img.year.toString() === selectedFilter
      );
    }
    if (selectedTab === "Event" && selectedFilter !== "All") {
      return galleryImages.filter((img) => img.event === selectedFilter);
    }
    return galleryImages;
  }, [selectedTab, selectedFilter]);

  // Tab click handler
  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    if (tab === "Year") {
      setSelectedFilter("2025");
    } else {
      setSelectedFilter("All");
    }
    // setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  // Filter button click handler
  const handleFilterClick = (filter: string, index: number) => {
    setSelectedFilter(filter);
    // setVisibleCount(INITIAL_VISIBLE_COUNT);
    scrollToCenter(index);
  };

  const handleClickOnImage = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // Render filter buttons for Year or Event
  const renderFilterButtons = (filters: readonly string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex  gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            className={`text-base cursor-pointer text-nowrap rounded-[50px] px-3 py-1 sm:px-6 sm:py-3 ${
              selectedFilter === filter.toString()
                ? "border border-pink text-white bg-pink font-medium"
                : "border border-lightgray/30"
            }`}
            onClick={() => handleFilterClick(filter.toString(), index)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="gallery" className="bg-white">
      <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">Gallery</h5>
        </div>

        <div className="py-3 mb-4">
          <h1 className="text-black font-light">
            In frames
            <span className="text-black font-medium">
              — The spirit of change
            </span>
          </h1>
        </div>
        {/* Filter Bar */}
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
        {/* Conditional filter buttons for Year or Event */}
        {selectedTab === "Year" && renderFilterButtons(YEARS.map(String))}
        {selectedTab === "Event" && renderFilterButtons(SECTORS)}
        {/* Gallery Grid */}
        <div className="pt-8">
          {filteredImages.length === 0 && (
            <div className="flex justify-center"> No results </div>
          )}
          <div className="columns-2  sm:columns-3 lg:columns-4 xl:columns-5 gap-1 sm:gap-3 space-y-1 sm:space-y-3">
            {filteredImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleClickOnImage(idx)}
                className="overflow-hidden group cursor-pointer  mb-1 sm:mb-3 break-inside-avoid shadow-sm bg-white"
              >
                <Image
                  src={img.image}
                  alt={`Gallery Photo ${idx + 1}`}
                  width={300}
                  height={256}
                  className="w-full h-auto object-cover transition-all duration-300 ease-linear group-hover:scale-[1.05]"
                  unoptimized
                />
              </div>
            ))}
          </div>
          {isOpen && (
            <Portal>
              <div className="w-screen h-screen p-3   fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex">
                <div className="relative w-[30rem] h-[38rem] bg-black m-auto">
                  <Image
                    className=" object-cover z-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                    fill
                    src={filteredImages[currentIndex].image}
                    unoptimized
                    quality={100}
                    alt={filteredImages[currentIndex].event}
                  ></Image>
                  <div className="absolute bottom-4 z-10 w-full">
                    <p className="px-3 text-base xl:text-lg text-white text-center font-light">
                      {filteredImages[currentIndex].description}
                    </p>
                  </div>
                  <div className="z-10  absolute top-1/2 -translate-y-1/2 flex w-full px-3 sm:px-4 justify-between">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((prev) => prev - 1)}
                      className="bg-white p-2 rounded-full text-pink hover:bg-pink hover:text-white transition-all duration-300 ease-linear disabled:opacity-[50%] cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-pink"
                    >
                      <MoveLeft />
                    </button>
                    <button
                      disabled={currentIndex >= filteredImages.length - 1}
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="bg-white p-2 rounded-full text-pink hover:bg-pink hover:text-white transition-all duration-300 ease-linear disabled:opacity-[50%] cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-pink"
                    >
                      <MoveRight />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className=" absolute top-2 right-2 z-10 bg-pink p-1  rounded-full text-white hover:bg-white hover:text-pink transition-all duration-300 ease-linear   cursor-pointer hover:scale-[1.05] "
                  >
                    <X />
                  </button>
                </div>
              </div>
            </Portal>
          )}
        </div>
      </div>
    </section>
  );
}
