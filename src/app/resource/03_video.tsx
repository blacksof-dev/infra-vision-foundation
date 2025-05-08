"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import VideoPopup from "../../_components/molecules/videopopup";
import {
  BorderGrayHeroBtn,
  UnderlineWithHover,
} from "@/_components/atoms/buttons";
import {allCards} from "./static"



export default function Video() {
  const [tab, setTab] = useState("All");

  return (
    <div className="bg-whitesmoke blade-top-padding-lg blade-bottom-padding-lg">
      <div className="w-container">
        <div>
          <div className="flex flex-row items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">Videos</h5>
          </div>
          <div className="flex flex-col md:flex-row justify-between py-4">
            <div>
              <h1 className="font-light xl:tracking-[-3%]">
                Enkindling public policymaking with <br />
                <span className="text-black font-medium xl:tracking-[-3%]">
                  thought leadership and action
                </span>
              </h1>
            </div>
            <div className="flex flex-row gap-3 mt-auto py-4 md:py-0">
              <FaYoutube className="text-red-700 text-2xl md:text-3xl my-auto" />
              <button className="text-black text-lg lg:text-xl justify-center items-center cursor-pointer relative font-medium tracking-[-1%] border-b border-pink pb-1">
                Subscribe to our YouTube channel
              </button>
            </div>
          </div>
        </div>
        <div className="lg:pt-4">
          <TabsSection tab={tab} setTab={setTab} />
          <CardSection tab={tab} />
        </div>
      </div>
    </div>
  );
}

const filter = [
  "All",
  "Projects",
  "Quaterly Meet",
  "InfraKatha",
  "Infravision Conversations",
];

function TabsSection({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (tabname: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 border-b border-darkgray/20">
      <div className="sm:border-r sm:border-darkgray/20">
        <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">Filter by</h5>
      </div>
      <div className="flex flex-row gap-4 md:gap-5 flex-wrap">
        {filter.map((ele) => (
          <button
            key={ele}
            className={`mt-auto text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4 ${
              tab === ele
                ? "text-pink font-medium border border-pink"
                : "border border-lightgray/30"
            }`}
            onClick={() => setTab(ele)}
          >
            {ele}
          </button>
        ))}
      </div>
    </div>
  );
}



function CardSection({ tab }: { tab: string }) {
  const FilterCards = () => {
    if (tab === "All") return allCards;
    return allCards.filter((card) => card.subtitle === tab);
  };

  const mobileview = 3;

  const [visiblecountmobile, setvisiblecountmobile] = useState(mobileview);

  const [videoLink, setVideoLink] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handleVideoClick = (link: string) => {
    setVideoLink(link);
    setPopupOpen(true);
  };

  const handleSeeMoreCta = () => {
    setvisiblecountmobile((prev) => prev + 3);
  };
  useEffect(() => {
    setvisiblecountmobile(mobileview);
  }, [tab]);

  return (
    <>
      <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 md:gap-10 xl:gap-10 ">
        {FilterCards()
          .slice(0, visiblecountmobile)
          .map((ele, index) => (
            <>
              <div key={index} className="pt-4  md:pt-10 xl:pt-12">
                <div
                  className="h-[18rem] md:h-[20rem] xl:h-[14rem] 2xl:h-[19rem]  bg-no-repeat bg-cover bg-center rounded "
                  style={{ backgroundImage: `url(${ele.image.src})` }}
                >
                  <Image
                    src={ele.image}
                    alt={ele.subtitle}
                    className="w-full h-full cursor-pointer"
                    onClick={() => handleVideoClick(ele.link)}
                  ></Image>
                </div>

                <div>
                  <div className="flex flex-row items-center gap-2 md:gap-3 py-3">
                    <span className="w-[7px] h-[7px] md:w-[12px] md:h-[12px] rounded-full bg-darkgray/30"></span>
                    <p className=" text-black">{ele.subtitle}</p>
                  </div>
                  <div className="w-full md:w-[70%]">
                    <h5 className="text-blacksecond font-medium">
                      {ele.subdesc}
                    </h5>
                  </div>
                </div>
                <div className="py-2 md:py-4">
                  <BorderGrayHeroBtn
                    text="Watch videos"
                    role="button"
                    borderColor="darkgray/40"
                    color="black"
                    bgColor="white"
                    size="base"
                    handlepopup={() => handleVideoClick(ele.link)}
                  />
                </div>
              </div>
            </>
          ))}

        {visiblecountmobile < FilterCards().length && (
          <div className="col-span-full flex justify-center mt-8">
            <UnderlineWithHover
              size="xxlsize"
              color="pink"
              bgColor="pink"
              text="See more"
              role="button"
              borderColor="white"
              handlefun={handleSeeMoreCta}
            />
          </div>
        )}
      </div>
      {popupOpen && (
        <VideoPopup src={videoLink} onClose={() => setPopupOpen(false)} />
      )}
    </>
  );
}
