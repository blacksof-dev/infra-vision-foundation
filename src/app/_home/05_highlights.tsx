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
    link: "https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html",
  },
  {
    id: 2,
    img: outlays.src,
    category: "News",
    date: "July 24, 2024",
    title: "Infra outlays: A strategic downplay",
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
  },
  {
    id: 3,
    img: budget.src,
    date: " July 24, 2024",
    category: "News",
    title: "Budget signals shift in infra strategy",
    link: "https://www.moneycontrol.com/news/business/economy/budget-signals-shift-in-infra-strategy-as-govt-pushes-states-private-sector-to-pitch-in-12777120.html",
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
              A Quick Look at <span className="font-medium">What We Do</span>
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
      <div ref={containerRef} className={`blade-top-padding-sm overflow-x-scroll bg-whitesmoke no-scrollbar sticky ${isHeaderVisible ? "top-20   lg:top-24" : "top-0"} `}>
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
      {/* <div className="mt-7">
        {activeTab === "Outreach and Engagements" ? (
          <UnderlineWithHover
            size="extralarge"
            color="pink"
            bgColor="pink"
            text="View all events"
            role="button"
            borderColor="white"
          />
        ) : (
          <UnderlineWithHover
            size="extralarge"
            color="pink"
            bgColor="pink"
            text="View all"
            role="button"
            borderColor="white"
          />
        )}
      </div> */}
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
