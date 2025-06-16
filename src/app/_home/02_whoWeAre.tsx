"use client";
import rail from "@/../public/assets/home/whoWeAre/knowledge/rail.png";
import highway from "@/../public/assets/home/whoWeAre/knowledge/highway.png";
import rajivRanjan from "@/../public/assets/home/whoWeAre/knowledge/rajivRanjan.png";
import infraKatha from "@/../public/assets/home/whoWeAre/advocacy/infraKatha.png";
import infraShakti from "@/../public/assets/home/whoWeAre/advocacy/infraPandit.png";
import infraPandit from "@/../public/assets/home/whoWeAre/advocacy/infraShakti.png";
import { useState } from "react";
import Card from "@/_components/molecules/cardTemplate";
import { useHeader } from "@/context/useHeader";

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
    img: rajivRanjan.src,
    category: "Infravision Conversations",
    date: "January, 2025",
    title:
      "How to save our hill cities? What does carrying capacity mean for planners",
    subtitle: "Rajiv Ranjan Mishra",
    link: "https://www.youtube.com/watch?v=ZdLcdjJShW8&ab_channel=TheInfravisionFoundation",
    ctaText: "Watch now"
  },
  {
    id: 2,
    img: highway.src,
    category: "Blogs",
    date: "October, 2024",
    title: "How to make India’s highways safe",
    subtitle: "Jagan Shah",
    link: "https://theinfravisionfoundation.org/2024/10/16/a-national-road-safety-authority-crucial-for-improving-indias-deteriorating-road-safety/",
  },
];

const advocacy = [
  {
    id: 1,
    img: infraKatha.src,
    category: "InfraKatha",
    title:
      "A forum of cross-sectoral experts sparking insightful conversations around the vivid dimensions of infrastructure.",
    link: "/infrakatha",
  },
  {
    id: 2,
    img: infraShakti.src,
    category: "InfraShakti Awards",
    title:
      "A flagship initiative in association with NDTV, celebrating changemakers unlocking impact at scale through infrastructure-led innovation.",
    link: "/infrashakti-awards",
  },
  {
    id: 3,
    img: infraPandit.src,
    category: "InfraPandit",
    title:
      "Another flagship initiative recognising outstanding doctoral research on infrastructure, fostering youth participation in India's infra evolution",
    link: "",
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
            <div className="w-full md:w-1/2 lg:md:w-[45%] pt-2">
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
                Founded by professionals and embellished with an ecosystem of
                thought leaders and experts from various infra sectors, The
                Infravision Foundation stands for upholding the impartial,
                enlightened, and respected voice of reason. It addresses deeply
                rooted challenges to enable steadfast infrastructure
                policy-making through rigorous{" "}
                <span className="font-semibold"> knowledge sharing </span> and{" "}
                <span className="font-semibold"> advocacy.</span>
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

        <div className=" flex flex-row justify-center items-center gap-12 md:gap-18 border-b mx-auto  border-darkgray/16 w-fit">
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
          <TabContent data={knowledge} />
        ) : (
          <TabContent data={advocacy} />
        )}
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
          ctaText={item.ctaText ? item.ctaText : "Read more"}
          classes=" text-lg md:text-xl text-black"
        />
      ))}
    </div>
  );
};
