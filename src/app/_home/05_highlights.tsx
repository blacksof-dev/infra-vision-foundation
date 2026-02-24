"use client";
import Card from "@/_components/molecules/cardTemplate";
import React, { useEffect, useRef, useState } from "react";
import { TabItem } from "./02_whoWeAre";

import InfrapanditAward from "./infraPanditAward";
import { useHeader } from "@/context/useHeader";
import Link from "next/link";

const newsletters = [
  {
    id: 31,
    img: "/assets/archive/newsletter/landValue.png",
    category: "Volume 33",
    title:
      "Why Land Value Capture can fix India's infrastructure financing crisis",
    sectors: "",
    date: "February 2026",
    link: "/assets/pdf/landValue_Feb_updated.pdf",
  },
  {
    id: 30,
    img: "/assets/archive/newsletter/analysisAction.png",
    category: "Volume 32",
    title: "Analysis and action",
    sectors: "",
    date: "January 2026",
    link: "/assets/pdf/analysisAction.pdf",
  },
  {
    id: 29,
    img: "/assets/archive/newsletter/infraPanditAward.png",
    category: "Volume 31",
    title: "InfraPandit Awards 2025",
    sectors: "",
    date: "December 2025",
    link: "/assets/pdf/decmber.pdf",
  },
];

const news = [
  {
    id: 62,
    img: "/assets/archive/newsAndMedia/revitalising.jpg",
    category: "",
    date: "February 2026",
    title: "Revitalising PPPs",
    subtitle: "Vinayak Chatterjee",
    link: "/assets/pdf/revitalising.pdf",
  },
  {
    id: 61,
    img: "/assets/archive/newsAndMedia/landValue.png",
    category: "",
    date: "January 2026",
    title: "Land Value Capture",
    subtitle: "Vinayak Chatterjee",
    link: "/assets/pdf/landValue.pdf",
  },
  {
    id: 60,
    img: "/assets/archive/newsAndMedia/invest-in-small-towns.png",
    category: "",
    date: "January 2026",
    title: "Invest in small towns",
    subtitle: " Kiran Karnik",
    link: "/assets/pdf/invest-in-small-towns.pdf",
  },
];

export default function Highlights() {
  const [activeTab, setActiveTab] = useState("Outreach and Engagements");

  return (
    <>
      <div id="homepage-section-5" className="bg-whitesmoke">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">Highlights</h5>
          </div>
          <div>
            <h1 className="text-black font-light pt-2">
              A quick look at <span className="font-medium">what we do</span>
            </h1>
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

  return (
    <div>
      <div
        ref={containerRef}
        className={` overflow-x-scroll bg-whitesmoke no-scrollbar transition-all duration-300 ease-linear z-[999] sticky lg:relative ${
          isHeaderVisible ? "top-16 lg:top-0" : "top-0"
        } `}
      >
        <div className="flex flex-row gap-6 sm:gap-12  mt-4 lg:gap-12 md:gap-18 border-b   border-darkgray/16 w-fit ">
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

        {activeTab === "Newsletters" && <TabContent data={newsletters} />}
        {activeTab === "In the News" && <TabContent data={news} />}
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
              className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0  transition-all duration-300`}
            ></span>
            <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[6.5] transition-all duration-700 ease-in-out z-0"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const TabContent = ({ data }: { data: TabItem[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-2 sm:gap-8 lg:gap-12  md:blade-top-padding-sm">
      {data.map((item) => (
        <Card
          key={item.id}
          date={item.date}
          title={item.title}
          image={item.img}
          link={item.link}
          category={item.category}
          subtitle={item.subtitle}
          ctaText="Read more"
          classes="line-clamp-2 xl:line-clamp-3 text-lg md:text-xl text-black"
        />
      ))}
    </div>
  );
};
