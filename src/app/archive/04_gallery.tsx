"use client"
import { useState, useMemo, useRef, useEffect } from "react"
import Image from "next/image"
import { Portal } from "@radix-ui/react-select"
import { MoveLeft, MoveRight, X } from "lucide-react"
import { useApiHook } from "@/lib/useApi"
import type { ApiResponse } from "../_home/01_banner"
import type { yearApiResponse } from "./02_newsletter"



interface eventTabApiResponse {
  id: string
  name: string
  slug: string
  active: boolean
}

interface cardDataAPiResponse {
  data: {
    image: string;
    id: string;
    year: string;
    description: string;
    tab: {
      id: string;
      name: string;
      slug: string;

    }
  }[]
}

type FilterType = "All" | "Year" | "Event"
const FILTER_TYPES: FilterType[] = ["All", "Year", "Event"]


export default function Gallery() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTab, setSelectedTab] = useState<FilterType>("All")
  const [selectedFilter, setSelectedFilter] = useState<string>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [galleryData, setGalleryData] = useState<cardDataAPiResponse["data"]>([])

  // Content API Call
  const { data: content } = useApiHook<ApiResponse>({
    url: "/content/archive-gallery-content",
    cacheKey: "archive-gallery-content",
  })

  // Event tab API Call
  const { data: eventTab } = useApiHook<eventTabApiResponse[]>({
    url: "/archives/tabs",
    cacheKey: "archive-gallery-eventTabs",
  })

  // Year tab API Call
  const { data: yearTab } = useApiHook<yearApiResponse>({
    url: "/archives/gallery/years",
    cacheKey: "archive-gallery-yearTab",
  })


  const allEventTab = useMemo(() => eventTab?.map((tab) => tab.name) ?? [], [eventTab])

  const yearsAsStrings = useMemo(() => (yearTab ?? []).map((y: any) => y.toString()), [yearTab])

  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index]
    const container = containerRef.current

    if (tab && container) {
      const offset = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2
      container.scrollTo({ left: offset, behavior: "smooth" })
    }
  }


  const fetchGalleryData = async (filterType: FilterType, filterValue?: string) => {
    setGalleryData([]);
    let url = "/archives/gallery";

    if (filterType === "Year" && filterValue !== "All") {
      url = `/archives/gallery/years/${filterValue}`;
    } 
    else if (filterType === "Event" && filterValue !== "All") {
      url = `/archives/gallery/tabs/${filterValue}`;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
      const json = await res.json();
      setGalleryData(json.data ?? []);
    } catch (error) {
      console.error("Failed to fetch gallery data:", error);
      setGalleryData([]);
    }
  };


  useEffect(() => {
    const fetchAllGallery = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives/gallery?page=1&limit=50`);
        const json = await res.json();
        setGalleryData(json.data ?? []);
      } catch (error) {
        console.error("Failed to fetch gallery data:", error);
        setGalleryData([]);
      }
    };

    fetchAllGallery();
  }, []);


  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    if (tab === "Year") {
      if (yearsAsStrings.length > 0) {
        const year = yearsAsStrings[0];
        setSelectedFilter(year);
        fetchGalleryData("Year", year);
      } 
    } else if (tab === "Event") {
      if (eventTab && eventTab.length > 0) {
        const firstEvent = eventTab[0];
        setSelectedFilter(firstEvent.name);
        fetchGalleryData("Event", firstEvent.id); 
      } 
    } else {
      setSelectedFilter("All");
      fetchGalleryData("All");
    }
  };

  const handleFilterClick = (filter: string, index: number) => {
    setSelectedFilter(filter);
    scrollToCenter(index);

    if (selectedTab === "Year") {
      fetchGalleryData("Year", filter);
    } else if (selectedTab === "Event") {
    
      const tabObj = eventTab?.find((t) => t.name === filter);
      if (tabObj) fetchGalleryData("Event", tabObj.id);
    }
  };



  const handleClickOnImage = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const renderFilterButtons = (filters: string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el
            }}
            className={`text-base cursor-pointer text-nowrap rounded-[50px] px-3 py-1 sm:px-6 sm:py-3 ${selectedFilter === filter.toString()
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
  )

  if (!content || !eventTab || !yearTab) {
    return null
  }

  return (
    <section id="gallery" className="bg-whitesmoke">
      <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">{content.tagName}</h5>
        </div>
        <div className="py-3 mb-4">
          <h1 className="text-black font-light" dangerouslySetInnerHTML={{ __html: content.title }} />
        </div>
        <div className="flex flex-col sm:flex-row gap-6 border-b border-darkgray/20">
          <div className="sm:border-r sm:border-darkgray/20">
            <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">Filter by</h5>
          </div>
          <div className="flex flex-row gap-5">
            {FILTER_TYPES.map((tab) => (
              <button
                key={tab}
                className={`mt-auto text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4 ${selectedTab === tab ? "border border-pink text-pink font-medium" : "border border-lightgray/30"
                  }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {selectedTab === "Year" && renderFilterButtons(yearsAsStrings)}
        {selectedTab === "Event" && renderFilterButtons(allEventTab)}
        <div className="pt-8">
          {galleryData.length === 0 && <div className="flex justify-center"> No results </div>}

          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-1 sm:gap-3 space-y-1 sm:space-y-3">
            {galleryData.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => handleClickOnImage(idx)}
                className="overflow-hidden group cursor-pointer mb-1 sm:mb-3 break-inside-avoid shadow-sm bg-white"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/${img.image.replace(/^\/+/, "")}`}
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
              <div className="w-screen h-screen p-3 fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex">
                <div className="relative w-[38rem] h-[38rem] bg-black m-auto">
                  <Image
                    className="object-contain z-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                    fill
                    src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/${galleryData[currentIndex].image.replace(/^\/+/, "")}`}

                    unoptimized
                    quality={100}
                    alt={galleryData[currentIndex].year}
                  ></Image>
                  <div className="absolute bottom-4 z-10 w-full">
                    <p className="px-3 text-base xl:text-lg text-white text-center font-light">
                      {galleryData[currentIndex].description}
                    </p>
                  </div>
                  <div className="z-10 absolute top-1/2 -translate-y-1/2 flex w-full px-3 sm:px-4 justify-between">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((prev) => prev - 1)}
                      className="bg-white p-2 rounded-full text-pink hover:bg-pink hover:text-white transition-all duration-300 ease-linear disabled:opacity-[50%] cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-pink"
                    >
                      <MoveLeft />
                    </button>
                    <button
                      disabled={currentIndex >= galleryData.length - 1}
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="bg-white p-2 rounded-full text-pink hover:bg-pink hover:text-white transition-all duration-300 ease-linear disabled:opacity-[50%] cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-pink"
                    >
                      <MoveRight />
                    </button>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 z-10 bg-pink p-1 rounded-full text-white hover:bg-white hover:text-pink transition-all duration-300 ease-linear cursor-pointer hover:scale-[1.05]"
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
  )
}
