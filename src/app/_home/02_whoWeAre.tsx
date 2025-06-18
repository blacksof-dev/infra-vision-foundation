"use client";
import rail from "@/../public/assets/home/whoWeAre/knowledge/rail.png";
import highway from "@/../public/assets/home/whoWeAre/knowledge/highway.png";
import jagan from "@/../public/assets/home/whoWeAre/knowledge/jagan.png";
// import infraKatha from "@/../public/assets/home/whoWeAre/advocacy/infraKatha.png";
import infraKatha from "@/../public/assets/infrakatha/banner/banner.jpg";
import infraShakti from "@/../public/assets/home/whoWeAre/advocacy/infraPandit.png";
import infraPandit from "@/../public/assets/home/whoWeAre/advocacy/infraPanditAward.png";

import { useState } from "react";
import Card from "@/_components/molecules/cardTemplate";
import { useHeader } from "@/context/useHeader";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Link from "next/link";

export type TabItem = {
  id: number;
  img: string;
  category: string;
  title: string;
  link: string;
  date?: string;
  subtitle?: string;
  ctaText?: string
};

const knowledge = [
  {
    id: 1,
    img: rail.src,
    category: "Research Papers",
    date: "January, 2025",
    title: "The case for developing high-speed rail corridors in India",
    subtitle: "Dr. Ramakrishnan T.S",
    link: "/assets/home/whoWeAre/knowledge/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
  },
  {
    id: 3,
    img: jagan.src,
    category: "Infravision Conversations",
    date: "June, 2025",
    title:
      "Why India needs a national plan to build new cities",
    subtitle: "Jagan Shah",
    link: "https://www.youtube.com/watch?v=g5aA3Q3af1g&ab_channel=TheInfravisionFoundation",
    ctaText: "Watch now"
  },
  {
    id: 2,
    img: highway.src,
    category: "Blogs",
    date: "September 25, 2023",
    title: "India Needs Sustainability Ratings for Infrastructure Projects",
    subtitle: "",
    link: "https://theinfravisionfoundation.org/2023/09/25/india-needs-sustainability-ratings-for-infrastructure-projects/",
  },
];

const advocacy = [
  {
    id: 1,
    img: infraKatha.src,
    category: "InfraKatha",
    title:
      "A forum of conversations with cross-sectoral experts aimed at mainstreaming the discourse around infrastructure.",
    link: "/infrakatha",
    ctaText: "Know more"
  },
  {
    id: 2,
    img: infraShakti.src,
    category: "InfraShakti Awards",
    title:
      "A flagship initiative in association with NDTV, celebrating changemakers unlocking impact at scale through innovative projects.",
    link: "/infrashakti-awards",
    ctaText: "Know more"
  },
  {
    id: 3,
    img: infraPandit.src,
    category: "InfraPandit Awards",
    title:
      "Another flagship initiative recognising outstanding doctoral research on infrastructure, fostering youth participation in India's infra evolution.",
    link: "/infrapandit-awards",
    ctaText: "Know more"
  },
];

export default function WhoWeAre() {
  const [activeTab, setActiveTab] = useState("Knowledge");

  return (
    <>
      <section id="who-we-are" className="bg-whitesmoke">
        <main className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          <div className="flex md:flex-row flex-col justify-between">
            <div>
              <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
                <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                <h5 className="font-medium text-pink">Who we are</h5>
              </div>
              <div className="py-2 ">
                <h1 className="text-black  font-light">
                  A{" "}
                  <span className="text-black font-medium ">
                    think-and-do tank
                  </span>
                  <br /> powering change in India’s infrastructure
                </h1>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:md:w-[46%] pt-2">
              <h6 className="text-black font-light">
                Established in 2022 by Vinayak Chatterjee and Rumjhum
                Chatterjee,{" "}
                <span className="font-semibold">
                  The Infravision Foundation
                </span>{" "}
                is a non-partisan, not-for-profit think tank driving{" "}
                <span className="font-semibold">
                  {" "}
                  infrastructure-led economic development.
                </span>
              </h6>
              <h6 className="text-black font-light py-2 md:py-3">
                Founded by professionals and embellished with an ecosystem of thought leaders and experts from academia, civil services, and business,  <span className="font-semibold">The Infravision Foundation</span> is a hub for the exchange of knowledge and policy options. It stands for upholding the impartial, enlightened, and respected voice of reason. The Foundation addresses deeply rooted challenges to enable steadfast infrastructure policy-making through rigorous  <span className="font-semibold"> knowledge sharing and advocacy.</span>
              </h6>
            </div>
          </div>
          <div className=" relative">
            <TabSwitch setActiveTab={setActiveTab} activeTab={activeTab} />
          </div>
        </main>
      </section>
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
  return (
    <div>
      <div className={`${isHeaderVisible ? "top-20 xl:top-24" : "top-0"} sticky bg-whitesmoke py-6 xl:py-8 z-[99] transition-all duration-200 ease-linear`}>

        <div className=" flex flex-row sm:justify-center  items-center gap-12 md:gap-18 border-b sm:mx-auto  border-darkgray/16 w-fit">
          <button
            onClick={() => setActiveTab("Knowledge")}
            className={`text-base cursor-pointer  md:text-xl   ${activeTab === "Knowledge"
              ? "font-medium  border-b-2 border-pink pb-3 text-pink"
              : "text-darkgray  pb-3"
              }`}
          >
            Knowledge
          </button>
          <button
            onClick={() => setActiveTab("Advocacy")}
            className={` text-base cursor-pointer  md:text-xl ${activeTab === "Advocacy"
              ? "font-medium  border-b-2 pb-3 border-pink text-pink"
              : "text-darkgray  pb-3"
              }`}
          >
            Advocacy
          </button>
        </div>
      </div>

      <div className="">
        {activeTab === "Knowledge" ? (
          <TabContent data={knowledge} link="/knowledge" />
        ) : (
          <TabContent data={advocacy} />
        )}
      </div>

    </div>
  );
};

export const TabContent = ({ data, link }: { data: TabItem[], link?: string }) => {
  return (<>
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
          ctaText={item.ctaText ? item.ctaText : "Read more"}
          classes=" text-lg md:text-xl text-black"
        />
      ))}
    </div> {
      link &&

      <div className="flex justify-center xl:mt-4">
        <div className="">
          <Link className={`group  text-xl lg:text-2xl   text-pink hover:text-white cursor-pointer  text-nowrap w-40  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
            href={link}>
            <span className="z-50 relative">Explore</span>
            <span
              className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
            ></span>
            <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[5] transition-all duration-700 ease-in-out z-0"></span>

          </Link>
        </div>
      </div>
    }
  </>
  );
};
