"use client";
import rail from "@/../public/assets/home/whoWeAre/knowledge/rail.png";
import highway from "@/../public/assets/home/whoWeAre/knowledge/highway.png";
import rajivRanjan from "@/../public/assets/home/whoWeAre/knowledge/rajivRanjan.png";
import infraKatha from "@/../public/assets/home/whoWeAre/advocacy/infraKatha.png";
import infraPandit from "@/../public/assets/home/whoWeAre/advocacy/infraPandit.png";
import infraShakti from "@/../public/assets/home/whoWeAre/advocacy/infraShakti.png";
import { useState } from "react";
import Card from "@/_components/molecules/cardTemplate";


type TabItem = {
  id: number;
  img: string;
  category: string;
  title: string;
  link: string;
  date?: string;
  subtitle?: string;
};

const tab = ["Knowledge", "Advocacy"];

const knowledge = [
  {
    id: 1,
    img: rail.src,
    category: "Research papers",
    date: "January, 2025",
    title: "The case for developing high-speed rail corridors in India",
    subtitle: "Dr. Ramakrishnan T.S",
    link: "",
  },
   {
    id: 3,
    img: rajivRanjan.src,
    category: "Infravision Conversations",
    date: "January, 2025",
    title:
      "How to save our hill cities? What does carrying capacity mean for planners",
    subtitle: "Rajiv Ranjan Mishra",
    link: "",
  },
  {
    id: 2,
    img: highway.src,
    category: "Blogs",
    date: "October, 2024",
    title: "How to make India’s highways safe",
    subtitle: "Jagan Shah",
    link: "",
  },
 
];

const advocacy = [
  {
    id: 1,
    img: infraKatha.src,
    category: "InfraKatha",
    title:
      "A forum of cross-sectoral experts sparking insightful conversations around the vivid dimensions of infrastructure.",
    link: "",
  },
  {
    id: 2,
    img: infraShakti.src,
    category: "InfraShakti Awards",
    title:
      "A flagship initiative in association with NDTV, celebrating changemakers unlocking impact at scale through infrastructure-led innovation.",
    link: "",
  },
  {
    id: 3,
    img: infraPandit.src,
    category: "InfraPandit Awards",
    title:
      "A dedicated arm advocating for farmer prosperity and advanced agri-export prospects through stronger agricultural infrastructure.",
    link: "",
  },
];

export default function WhoWeAre() {
  const [activeTab, setActiveTab] = useState("Knowledge");
 
  return (
    <>
      <div className="bg-whitesmoke">
        <div className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          <div className="flex md:flex-row flex-col justify-between">
            <div>
              <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
                <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                <h5 className="font-medium text-pink">Who we are</h5>
              </div>
              <div className="py-2 ">
                <h1 className="text-black  font-light">
                  <span className="text-black/90 font-medium ">
                    Change emanating
                  </span>
                  <br /> from a shared purpose
                </h1>
              </div>
            </div>
            <div className="w-full md:w-[50%]">
              <h6 className="text-black font-light">
                Established in 2022 by Mr Vinayak Chatterjee and Mrs Rumjhum
                Chatterjee,{" "}
                <span className="font-semibold">
                  The Infravision Foundation
                </span>{" "}
                is a non-partisan, not-for-profit think tank driving{" "}
                <span className="font-semibold">
                  infrastructure-led economic development of India.
                </span>
              </h6>
              <h6 className="text-black font-light py-3">
                Led by veteran domain experts and thought leaders, the
                Foundation addresses deeply rooted infrastructure challenges to
                enable steadfast infrastructure policy-making. It churns impact
                through rigorous{" "}
                <span className="font-semibold">
                  knowledge sharing and advocacy.
                </span>
              </h6>
            </div>
          </div>
          <div className="blade-top-padding-sm">
            <TabSwitch setActiveTab={setActiveTab} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </>
  );
}

const TabSwitch = ({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: (value: string) => void;
  activeTab: string;
}) => {
  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-12 md:gap-18 border-b mx-auto  border-darkgray/16 w-fit">
        <button
          onClick={() => setActiveTab("Knowledge")}
          className={`text-base cursor-pointer  md:text-xl   ${
            activeTab === "Knowledge"
              ? "font-medium  border-b-2 border-pink pb-3 text-pink"
              : "text-darkgray  pb-3"
          }`}
        >
          Knowledge
        </button>
        <button
          onClick={() => setActiveTab("Advocacy")}
          className={` text-base cursor-pointer  md:text-xl ${
            activeTab === "Advocacy"
              ? "font-medium  border-b-2 pb-3 border-pink text-pink"
              : "text-darkgray  pb-3"
          }`}
        >
          Advocacy
        </button>
      </div>
      <div>
        {activeTab === "Knowledge" ? (
          <TabContent data={knowledge} />
        ) : (
          <TabContent data={advocacy} />
        )}
      </div>
    </div>
  );
};



const TabContent = ({ data }: { data: TabItem[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-8 lg:gap-9 pt-9 md:blade-top-padding-sm">
      {data.map((item) => (
        <Card
          key={item.id}
          date={item.date}
          title={item.title}
          image={item.img}
          link={item.link}
          category={item.category}
          subtitle={item.subtitle}
          classes="line-clamp-2 xl:line-clamp-3 text-lg md:text-xl text-black"
        />
      ))}
    </div>
  );
};
