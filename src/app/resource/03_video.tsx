"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";

import VideoPopup from "../resource/videopopup";

import image1 from "@/../public/assets/resource/videos/conversation/image1.png";
import image2 from "@/../public/assets/resource/videos/conversation/image2.png";
import image3 from "@/../public/assets/resource/videos/conversation/image3.png";
import image4 from "@/../public/assets/resource/videos/conversation/image4.png";

import imageInfra1 from "@/../public/assets/resource/videos/infraKatha/imageInfra1.png";
import imageInfra2 from "@/../public/assets/resource/videos/infraKatha/imageInfra2.png";
import imageInfra3 from "@/../public/assets/resource/videos/infraKatha/imageInfra3.png";
import imageInfra4 from "@/../public/assets/resource/videos/infraKatha/imageInfra4.png";
import imageInfra5 from "@/../public/assets/resource/videos/infraKatha/imageInfra5.png";
import imageInfra6 from "@/../public/assets/resource/videos/infraKatha/imageInfra6.png";

import quaterly1 from "@/../public/assets/resource/videos/quaterly/quaterly1.png";
import quaterly2 from "@/../public/assets/resource/videos/quaterly/quaterly2.png";
import quaterly3 from "@/../public/assets/resource/videos/quaterly/quaterly3.png";
import quaterly4 from "@/../public/assets/resource/videos/quaterly/quaterly4.png";
import quaterly5 from "@/../public/assets/resource/videos/quaterly/quaterly5.png";
import quaterly6 from "@/../public/assets/resource/videos/quaterly/quaterly6.png";

import project1 from "@/../public/assets/resource/videos/projects/project1.png";
import project2 from "@/../public/assets/resource/videos/projects/project2.png";
import project3 from "@/../public/assets/resource/videos/projects/project3.png";
import project4 from "@/../public/assets/resource/videos/projects/project4.png";
import project5 from "@/../public/assets/resource/videos/projects/project5.png";
import project6 from "@/../public/assets/resource/videos/projects/project6.png";

import {
  BorderGrayHeroBtn,
  UnderlineWithHover,
} from "@/_components/atoms/buttons";

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

const allcards = [
  {
    image: image1,
    subtitle: "Infravision Conversations",
    subdesc:
      "Selecting the appropriate urban transport system for India's cities",
    link: "https://www.youtube.com/embed/Sr17ZN7FLA4?si=5XGeBvf49YZ3m71_",
  },
  {
    image: image2,
    subtitle: "Infravision Conversations",
    subdesc: "Air Pollution: The solution has to be multi-sectoral",
    link: "https://www.youtube.com/embed/OjrOlknqzu4?si=r0F8lXDBW5TrPtLw",
  },
  {
    image: image3,
    subtitle: "Infravision Conversations",
    subdesc: "Indian Railways : Why Innovation Matters",
    link: "https://www.youtube.com/embed/uzP6Vc_7IrQ?si=AS0TOQRabaJgsf4a",
  },
  {
    image: image4,
    subtitle: "Infravision Conversations",
    subdesc:
      "How to save our hill cities: What does carrying capacity mean for planners",
    link: "https://www.youtube.com/embed/ZdLcdjJShW8?si=podn129zPvVi1Dzs",
  },

  {
    image: imageInfra1,
    subtitle: "InfraKatha",
    subdesc: "Mythology & Infrastructure, Featuring Mr. Devdutt Pattanaik",
    link: "https://www.youtube.com/embed/9v61vpPmXEk?si=Mw6u5mbuUV8pQgBn",
  },
  {
    image: imageInfra2,
    subtitle: "InfraKatha",
    subdesc: "Inclusive Infrastructure, Featuring Padma Shri Dr. Deepa Mali",
    link: "https://www.youtube.com/embed/5uzHmHzU7q0?si=BJf-3qSZQlPNcQw-",
  },
  {
    image: imageInfra3,
    subtitle: "InfraKatha",
    subdesc: "Indian Infrastructure — The difficulty of being good",
    link: "https://www.youtube.com/embed/FCDeGlsb7q0?si=rtsex3tBGP7jEcVX",
  },
  {
    image: imageInfra4,
    subtitle: "InfraKatha",
    subdesc: "Saraswati, The Lost River featuring Mr. Sanjeev Sanyal",
    link: "https://www.youtube.com/embed/sygLq4cccIY?si=y6FzDM5gBl3WEad1",
  },
  {
    image: imageInfra5,
    subtitle: "InfraKatha",
    subdesc: "Heritage Tourism Infrastructure featuring Mr. Amar Nath",
    link: "https://www.youtube.com/embed/u-SEobnWU6U?si=C_hw50BXPMg0_7Sf",
  },
  {
    image: imageInfra6,
    subtitle: "InfraKatha",
    subdesc: "Artificial Intelligence: Reshaping the Digital Infra Landscape",
    link: "https://www.youtube.com/embed/hIzp4YhZcMo?si=PYzqkLc9BZdAOXoV",
  },

  {
    image: quaterly1,
    subtitle: "Quaterly Meet",
    subdesc: "Quarterly Meet July 2, 2023, The Infravision Foundation",
    link: "https://www.youtube.com/embed/-INuUJJwYdk?si=4TBiOgynLeyhvXTx",
  },

  {
    image: quaterly2,
    subtitle: "Quaterly Meet",
    subdesc: "Quarterly Meet July 2, 2023, The Infravision Foundation",
    link: "https://www.youtube.com/embed/JjJNPWFyEcI?si=rxOzFC0-WTiOF-00",
  },

  {
    image: quaterly3,
    subtitle: "Quaterly Meet",
    subdesc: "Quarterly Meet, PK Sinha Part 1, The Infravision Foundation",
    link: "https://www.youtube.com/embed/KAnR0Y1F648?si=6z5G57zsJMkdf0Jz",
  },

  {
    image: quaterly4,
    subtitle: "Quaterly Meet",
    subdesc: "Quarterly Meet, PK Sinha Part 2, The Infravision Foundation",
    link: "https://www.youtube.com/embed/3AHKaWYgl-E?si=2bivPk9W2zAoRfBT",
  },

  {
    image: quaterly5,
    subtitle: "Quaterly Meet",
    subdesc: "Quarterly Meet, Rajnish Kumar, The Infravision Foundation",
    link: "https://www.youtube.com/embed/gkzbBcok8Rc?si=ftIsoyyPAKIMfJh5",
  },
  {
    image: quaterly6,
    subtitle: "Quaterly Meet",
    subdesc: "Quarterly Meet, Ashish Dhawan Part 1, The Infravision Foundation",
    link: "https://www.youtube.com/embed/6FYnql27r6A?si=AArePOSiOpEQrJsN",
  },

  {
    image: project1,
    subtitle: "Projects",
    subdesc:
      "Solar rooftop for poverty alleviation - The Infravision Foundation",
    link: "https://www.youtube.com/embed/SGoq2OpxMuA?si=587oZgJHMWImeZkg",
  },

  {
    image: project2,
    subtitle: "Projects",
    subdesc: "Sooraj Se Rozgaari 2– The Infravision Foundation",
    link: "https://www.youtube.com/embed/L8DQjjO84KA?si=JkAXrOHTEFXhPxk_",
  },

  {
    image: project3,
    subtitle: "Projects",
    subdesc:
      "Solar rooftop for poverty alleviation - The Infravision Foundation",
    link: "https://www.youtube.com/embed/SGoq2OpxMuA?si=t82E9G6yQvhuiPoz",
  },
  {
    image: project4,
    subtitle: "Projects",
    subdesc: "Sooraj Se Rozgaari 1– The Infravision Foundation",
    link: "https://www.youtube.com/embed/XpTj0m03cQk?si=zRQ13DcgPI33Au96",
  },
  {
    image: project5,
    subtitle: "Projects",
    subdesc: "Solar Rooftop scale up Challenges - The Infravision Foundation",
    link: "https://www.youtube.com/embed/j-n-z551_ts?si=RWXdUc1-CGrPjped",
  },
];

function CardSection({ tab }: { tab: string }) {
  const FilterCards = () => {
    if (tab === "All") return allcards;
    return allcards.filter((card) => card.subtitle === tab);
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
                    className="w-full h-full"
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
                    role="link"
                    borderColor="darkgray/40"
                    color="black"
                    bgColor="white"
                    size="base"
                    target="_blank"
                    link={ele.link}
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
