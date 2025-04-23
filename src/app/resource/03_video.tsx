"use client";
import { useState } from "react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";

import VideoPopup from "../resource/videopopup"
import discussion from "@/../public/assets/resource/videos/discussion.png";
import geetamTiwari from "@/../public/assets/resource/videos/geetamTiwari.png";
import rojgar from "@/../public/assets/resource/videos/rojgar.png";

import mobileViewdiscussion from "@/../public/assets/resource/videos/mobileViewdiscussion.png";
import mobileviewgeetam from "@/../public/assets/resource/videos/mobileviewgeetam.png";
import mobileViewraojgar from "@/../public/assets/resource/videos/mobileViewraojgar.png";



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
              <h1 className="font-light tracking-[-3%]">
                Enkindling public policymaking with <br />
                <span className="text-black font-medium tracking-[-3%]">
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
        <div className="pt-4">
          <TabsSection tab={tab} setTab={setTab} />
          <CardSection tab={tab} />
        </div>
      </div>
     
    </div>
  );
}

const filter = ["All", "Projects", "Quaterly Meet", "Infravision Conversations"];

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

const allcards = [
  {
    image: geetamTiwari,
    mobileImg:mobileviewgeetam ,
    title: "Professor Geetam Tiwari",
    desc: "TRIPP Chair Professor in Department of Civil Engineering, Indian Institute of Technology in New Delhi, India.",
    subtitle: "Infravision Conversations",
    subdesc:
      "Selecting the appropriate urban transport system for India's cities",
      link:"https://www.youtube.com/embed/-INuUJJwYdk?si=cbqlJ3CxMy-U39d2",
  },
  {
    image: rojgar,
    mobileImg:mobileViewraojgar,
    title: "Vinayak Chatterjee",
    desc: "Founder and Managing Trustee,The Infravision Foundation",
    subtitle: "Projects",
    subdesc:
      "Solar rooftop for poverty alleviation - The Infravision Foundation",
      link:"https://www.youtube.com/embed/-INuUJJwYdk?si=cbqlJ3CxMy-U39d2",
  },
  {
    image: discussion,
    mobileImg:mobileViewdiscussion,
    title: "Jagan Shah",
    desc: "Former Director, National Institute of Urban Affairs",
    subtitle: "Quaterly Meet",
    subdesc:
      "Selecting the appropriate urban transport system for India's cities",
      link:"https://www.youtube.com/embed/-INuUJJwYdk?si=cbqlJ3CxMy-U39d2",
  },
];



function CardSection({ tab }: { tab: string }) {
  const FilterCards = () => {
    if (tab === "All") return allcards;
    return allcards.filter((card) => card.subtitle === tab);
  };


  const [videoLink, setVideoLink] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handleVideoClick = (link: string) => {
    setVideoLink(link);
    setPopupOpen(true);
  };

  return (
    <>
     <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 md:gap-10 xl:gap-10 ">
      {FilterCards().map((ele, index) => (
        <div key={index} className="pt-4  md:pt-10 xl:pt-14">
          <div
            className="md:h-[20rem] xl:h-[14rem] 2xl:h-[19rem]  bg-no-repeat bg-cover bg-center rounded hidden md:block"
            onClick={() => handleVideoClick(ele.link)}
            style={{ backgroundImage: `url(${ele.image.src})` }}
          >
            <div className="w-[90%] flex flex-col h-full justify-end p-4">
              <div className="w-[3rem] h-[3rem] bg-white ms-auto flex items-center justify-center">
                <svg
                  width="19"
                  height="21"
                  viewBox="0 0 19 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.8476 8.5927C19.2159 9.38269 19.2159 11.3577 17.8476 12.1477L3.58866 20.3801C2.22036 21.1701 0.509974 20.1826 0.509974 18.6026L0.509975 2.13775C0.509975 0.557772 2.22036 -0.429719 3.58866 0.360273L17.8476 8.5927Z"
                    fill="#C82249"
                  />
                </svg>
              </div>
              <div className="w-full">
                <div className="h-[6rem] bg-white me-10 p-3">
                  <p className="font-medium">{ele.title}</p>
                  <h6 className="smallText text-black line-clamp-2">
                    {ele.desc}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className=" md:hidden block">
            <Image src={ele.mobileImg} alt={ele.title} className="w-full h-full"   onClick={() => handleVideoClick(ele.link)}></Image>
          </div>
          <div>

            <div className="flex flex-row items-center gap-2 md:gap-3 py-3">
              <span className="w-[7px] h-[7px] md:w-[12px] md:h-[12px] rounded-full bg-darkgray/30"></span>
              <p className=" text-black">{ele.subtitle}</p>
            </div>
            <div className="w-full">
              <h5 className="text-blacksecond font-medium">{ele.subdesc}</h5>
            </div>
          </div>
        </div> 
        

      ))}
      </div>
      {popupOpen && (
        <VideoPopup src={videoLink}  onClose={() => setPopupOpen(false)} />
      )}
    </>
  );
}
