"use client";
import { useState, useMemo, useRef } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import Script from "next/script";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

// Types
type FilterType = "All" | "Publication year" | "sectors";

interface MediaCoverage {
  id: string;
  image: string;
  title: string;
  date: string;
  author: string;
  link: string;
  pdfFile: string | null;
  imageFile: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MediaResponse {
  data: MediaCoverage[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Constants
const FILTER_TYPES: FilterType[] = ["All", "Publication year"];

const generateNewsSchema = (card: MediaCoverage) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: `The Infravision Foundation - News`,
  description: card.title,
  image: getUrl(card.image),
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": card.link || getUrl(card.pdfFile || card.imageFile || ""),
  },
  author: {
    "@type": "Person",
    name: card.author,
  },
  publisher: {
    "@type": "Organization",
    name: "The Infravision Foundation",
    logo: {
      "@type": "ImageObject",
      url: "https://theinfravisionfoundation.org/logo.png",
    },
  },
  datePublished: card.date,
});

export default function NewsAndMedia() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // Fetch Years
  const { data: years = [] } = useQuery({
    queryKey: ["media-coverage-years"],
    queryFn: () => getFetch<number[]>("/archives/media-coverage/years"),
  });

  const availableYears = useMemo(() => years.map(String), [years]);

  // Fetch Media Coverage
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["media-coverage", selectedTab, selectedFilter],
    queryFn: async ({ pageParam = 1 }) => {
      let url = `/archives/media-coverage?page=${pageParam}&limit=3&activeOnly=true&sortBy=date`;
      if (selectedTab === "Publication year" && selectedFilter !== "All") {
        url += `&year=${selectedFilter}`;
      }
      return getFetch<MediaResponse>(url);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.hasNextPage) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

  const mediaItems = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data],
  );

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
    if (tab === "Publication year") {
      setSelectedFilter(availableYears[0] || "All");
    } else {
      setSelectedFilter("All");
    }
  };

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
  };

  const handleSeeMore = () => {
    fetchNextPage();
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

  const allNewsSchemas = mediaItems.map(generateNewsSchema);

  return (
    <section>
      <Script
        id="news-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allNewsSchemas),
        }}
      />
      <div className="w-container blade-top-padding-sm blade-bottom-padding">
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
          <h5 className="font-medium text-pink">In the News</h5>
        </div>

        <div className="py-3 max-w-[890px] ">
          <h1 className="text-black font-light">
            Infravision in the <br />
            <span className="text-black font-medium"> headlines</span>
          </h1>
        </div>

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

          {selectedTab === "Publication year" &&
            renderFilterButtons(availableYears)}

          <div
            className={`${
              selectedTab === "Publication year" ? "pt-8" : "pt-8"
            }`}
          >
            {mediaItems.length === 0 && (
              <div className="flex justify-center "> No results </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {mediaItems.map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={
                      card.date
                        ? new Date(card.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""
                    }
                    title={card.title}
                    image={getUrl(card.image)}
                    link={
                      card.link ||
                      getUrl(card.pdfFile || "") ||
                      getUrl(card.imageFile || "")
                    }
                    category={"News"}
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>
            {hasNextPage && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
