"use client";
import Card from "@/_components/molecules/cardTemplate";
import React, { useEffect, useRef, useState } from "react";
import { TabItem } from "./02_whoWeAre";

import telling from "@/../public/assets/home/newsletter/telling.png";
import forests from "@/../public/assets/home/newsletter/forests.png";
import caira from "@/../public/assets/home/newsletter/caira.png";
import newsletter_1 from "@/../public/assets/archive/newsletter/01.png";
import newsletter_2 from "@/../public/assets/archive/newsletter/02.png";
import newsletter_3 from "@/../public/assets/archive/newsletter/03.png";
import budget from "@/../public/assets/home/news/budget.png";
import outlays from "@/../public/assets/home/news/outlays.png";
import taxation from "@/../public/assets/home/news/taxation.png";
import EventTemplate from "@/_components/molecules/eventTemplate";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import InfrapanditAward from "./infraPanditAward";
import { useHeader } from "@/context/useHeader";
import Link from "next/link"

const newsletters = [
  {
    id: 1,
    img: newsletter_1.src,
    category: "Volume 24",

    date: "May 2025",
    title:
      "The Infravision Foundation’s quadruple impact, Rumjhum Chatterjee at The Edge and more.",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-May-2025.pdf",
  },
  {
    id: 2,
    img: newsletter_2.src,
    category: "Volume 23",

    date: "April 2025",
    title:
      "From urban decarbonisation and Noida to CAIRA’s first-ever engagement in Arunachal Pradesh and beyond.",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-April-2025.pdf",
  },
  {
    id: 3,
    img: newsletter_3.src,
    category: "Volume 22",

    date: "March 2025",
    title: "New Report urges fast tracking of High-Speed Rail.",
    link: "/assets/archive/newsletter/INFRAVISION-TALK-March-2025.pdf",
  },
  // {
  //   id: 2,
  //   img: caira.src,
  //   category: "Volume 18",
  //   date: "November, 2024",
  //   title:
  //     "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
  //   link: "",
  // },
];

const news = [
  {
    id: 1,
    img: taxation.src,
    category: "News",
    date: "Aug 15, 2024",
    title: "Group taxation regime for infrastructure",
    subtitle: "Vinayak Chatterjee",
    link: "https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html",
  },
  {
    id: 2,
    img: outlays.src,
    category: "News",
    date: "July 24, 2024",
    title: "Infra outlays: A strategic downplay",
    subtitle: "Vinayak Chatterjee",
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
  },
  {
    id: 3,
    img: budget.src,
    date: "Jan 4, 2023",
    category: "News",
    title: "Infra brushstrokes for the Budget",
    subtitle: "Vinayak Chatterjee",
    link: "/assets/pdf/InfraBrushstrokes-Business-Standard_04012023.pdf",
  },
];

export default function Highlights() {
  const [activeTab, setActiveTab] = useState("Outreach and Engagements");
  const mobileview = 3;
  const [visiblecountmobile, setvisiblecountmobile] = useState(mobileview);

  const handleSeeMoreCta = () => {
    setvisiblecountmobile((prev) => prev + 3);
  };

  useEffect(() => {
    setvisiblecountmobile(mobileview);
  }, [activeTab]);
  return (
    <>
      <div className="bg-whitesmoke">
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
  const { isHeaderVisible } = useHeader()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const handleFilterClick = (tabname: string, index: number) => {
    setActiveTab(tabname);
    scrollToCenter(index);
  };

  return (
    <div>
      <div ref={containerRef} className={`blade-top-padding-sm overflow-x-scroll bg-whitesmoke no-scrollbar transition-all duration-300 ease-linear z-[999] sticky ${isHeaderVisible ? "top-20   lg:top-24" : "top-0"} `}>
        <div className="flex flex-row gap-6 sm:gap-12  lg:gap-12 md:gap-18 border-b   border-darkgray/16 w-fit ">
          <button
            ref={(el: HTMLButtonElement | null) => { tabRefs.current[0] = el }}
            onClick={() => handleFilterClick("Outreach and Engagements", 0)}
            className={` cursor-pointer text-sm sm:text-xl text-nowrap  ${activeTab === "Outreach and Engagements"
              ? "font-medium  border-b-2 border-pink pb-3 text-pink"
              : "text-darkgray  pb-3"
              }`}
          >
            Outreach and Engagements
          </button>

          <button
            ref={(el: HTMLButtonElement | null) => { tabRefs.current[1] = el }}

            onClick={() => handleFilterClick("Newsletters", 1)}
            className={` text-sm cursor-pointer  sm:text-xl text-nowrap ${activeTab === "Newsletters"
              ? "font-medium  border-b-2 pb-3 border-pink text-pink"
              : "text-darkgray  pb-3"
              }`}
          >
            Newsletters
          </button>
          <button
            ref={(el: HTMLButtonElement | null) => { tabRefs.current[2] = el }}
            onClick={() => handleFilterClick("In the News", 2)}
            className={` text-sm cursor-pointer  sm:text-xl text-nowrap ${activeTab === "In the News"
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
          <Link className={`group  text-xl lg:text-2xl text-pink hover:text-white cursor-pointer  text-nowrap px-2  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
            href={activeTab === "Outreach and Engagements" ? "/outreach-and-engagements" : activeTab === "Newsletters" ? "/archive#newsletters" : activeTab === "In the News" ? "/archive#news-and-media" : ""}>
            <span className="z-50 relative">{`${activeTab === "Outreach and Engagements" ? "View all events" : activeTab === "Newsletters" ? "Browse newsletters" : activeTab === "In the News" ? "Browse news" : "Read more"}`}</span>
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

export const TabContent = ({ data }: { data: TabItem[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-2 sm:gap-8 lg:gap-9  md:blade-top-padding-sm">
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
