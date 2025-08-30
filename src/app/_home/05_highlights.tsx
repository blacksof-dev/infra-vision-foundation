"use client";

const Card = dynamic(() => import("@/_components/molecules/cardTemplate"), {
  ssr: false,
});
import React, { Suspense, useRef, useState } from "react";

import InfrapanditAward from "./infraPanditAward";
import { useHeader } from "@/context/useHeader";
import Link from "next/link";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "./01_banner";
import Loading from "../loading";
import dynamic from "next/dynamic";

interface NewsLetterAndNews {
  id: number;
  img: string;
  category: string;
  title: string;
  sector: string;
  date: string;
  description: string;
  link: string;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function Highlights() {
  const [activeTab, setActiveTab] = useState("Outreach and Engagements");

  const { data, isLoading, error } = useApiHook<ApiResponse[]>({
    url: "/content/home",
    cacheKey: "homeContent",
  });

  if (isLoading) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <p>Something went wrong</p>
      </section>
    );
  }

  if (!data) return null;

  const highlightContent = data.find(
    (section) => section.sectionKey === "highlight"
  );
  if (!highlightContent) return null;

  const response = highlightContent.data;

  return (
    <>
      <div id="homepage-section-5" className="bg-whitesmoke">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">{response.tagName}</h5>
          </div>
          <div>
            <h1
              className="text-black font-light pt-2"
              dangerouslySetInnerHTML={{ __html: response.title }}
            />
          </div>
          <div className="">
            <TabSwitch setActiveTab={setActiveTab} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </>
  );
}

export const TabSwitch = ({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: (value: string) => void;
  activeTab: string;
}) => {
  const { isHeaderVisible } = useHeader();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  const handleFilterClick = (tabname: string, index: number) => {
    setActiveTab(tabname);
    scrollToCenter(index);
  };

  const { data: newsletters } = useApiHook<
    PaginatedResponse<NewsLetterAndNews>
  >({
    url: "/archives/newsletter?page=1&limit=3",
    cacheKey: "newsletter",
  });

  const { data: news, isLoading } = useApiHook<
    PaginatedResponse<NewsLetterAndNews>
  >({
    url: "/archives/media-coverage?page=1&limit=3&search=infrastructure&category=News",
    cacheKey: "news",
  });

  if (isLoading) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  return (
    <div>
      <div
        ref={containerRef}
        className={`blade-top-padding-sm overflow-x-scroll bg-whitesmoke no-scrollbar transition-all duration-300 ease-linear z-[999] sticky ${
          isHeaderVisible ? "top-20   lg:top-24" : "top-0"
        } `}
      >
        <div className="flex flex-row gap-6 sm:gap-12  lg:gap-12 md:gap-18 border-b   border-darkgray/16 w-fit ">
          <button
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[0] = el;
            }}
            onClick={() => handleFilterClick("Outreach and Engagements", 0)}
            className={` cursor-pointer text-sm sm:text-xl text-nowrap  ${
              activeTab === "Outreach and Engagements"
                ? "font-medium  border-b-2 border-pink pb-3 text-pink"
                : "text-darkgray  pb-3"
            }`}
          >
            Outreach and Engagements
          </button>

          <button
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[1] = el;
            }}
            onClick={() => handleFilterClick("Newsletters", 1)}
            className={` text-sm cursor-pointer  sm:text-xl text-nowrap ${
              activeTab === "Newsletters"
                ? "font-medium  border-b-2 pb-3 border-pink text-pink"
                : "text-darkgray  pb-3"
            }`}
          >
            Newsletters
          </button>
          <button
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[2] = el;
            }}
            onClick={() => handleFilterClick("In the News", 2)}
            className={` text-sm cursor-pointer  sm:text-xl text-nowrap ${
              activeTab === "In the News"
                ? "font-medium  border-b-2 pb-3 border-pink text-pink"
                : "text-darkgray  pb-3"
            }`}
          >
            In the News
          </button>
        </div>
      </div>
      <div className="pt-6 xl:pt-14">
        {activeTab === "Outreach and Engagements" && <InfrapanditAward />}

        {activeTab === "Newsletters" && newsletters && (
          <Suspense
            fallback={
              <section className="w-full h-[40rem] flex items-center justify-center">
                <Loading />
              </section>
            }
          >
            <TabContent data={newsletters.data} />
          </Suspense>
        )}
        {activeTab === "In the News" && news && (
          <Suspense
            fallback={
              <section className="w-full h-[40rem] flex items-center justify-center">
                <Loading />
              </section>
            }
          >
            <TabContent data={news.data} />
          </Suspense>
        )}
      </div>
      <div className="mt-4 md:mt-8">
        <div className="flex  justify-center">
          <Link
            className={`group  text-xl lg:text-2xl text-pink hover:text-white cursor-pointer  text-nowrap px-2  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
            href={
              activeTab === "Outreach and Engagements"
                ? "/outreach-and-engagements"
                : activeTab === "Newsletters"
                ? "/archive#newsletters"
                : activeTab === "In the News"
                ? "/archive#news-and-media"
                : ""
            }
          >
            <span className="z-50 relative">{`${
              activeTab === "Outreach and Engagements"
                ? "View all events"
                : activeTab === "Newsletters"
                ? "Browse newsletters"
                : activeTab === "In the News"
                ? "Browse news"
                : "Read more"
            }`}</span>
            <span
              className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
            ></span>
            <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[6.5] transition-all duration-700 ease-in-out z-0"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const TabContent = ({ data }: { data: NewsLetterAndNews[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-2 sm:gap-8 lg:gap-12  md:blade-top-padding-sm">
      {data.map((item) => (
        <Card
          date={item.date}
          title={item.title}
          image={item.img}
          link={item.link}
          category={item.category}
          subtitle={item.description}
          ctaText="Read more"
          classes="line-clamp-2 xl:line-clamp-3 text-lg md:text-xl text-black"
        />
      ))}
    </div>
  );
};
