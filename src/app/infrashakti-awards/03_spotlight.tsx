"use client";
import React, { useState } from "react";
import sudhanshuBanner from "@/../public/assets/infraShakti/awardees/sudhanshuBanner.png";
import sudhanshuMobileView from "@/../public/assets/infraShakti/awardees/sudhanshuMobileView.png";
import Image from "next/image";
import award from "@/../public/assets/infraShakti/awardees/award.png";
import { HeroBtn } from "@/_components/atoms/buttons";
import infraShaktiAward from "@/../public/assets/infraShakti/awardees/infraShaktiAward.png";
import arun from "@/../public/assets/infraShakti/awardees/arun.png";
import sandeep from "@/../public/assets/infraShakti/awardees/sandeep.png";
import shashank from "@/../public/assets/infraShakti/awardees/shashank.png";
import afcons from "@/../public/assets/infraShakti/awardees/afcons.png";
import pankaj from "@/../public/assets/infraShakti/awardees/pankaj.png";
import swarnalatha from "@/../public/assets/infraShakti/awardees/swarnalatha.png";
import VideoCard from "@/_components/molecules/videoCard";

import peopleChoiceAward from "@/../public/assets/infraShakti/overview/peopleChoiceAward.png";
import waterSaviourAward from "@/../public/assets/infraShakti/overview/waterSaviourAward.png";
import renewableAward from "@/../public/assets/infraShakti/overview/renewableAward.png";
import transportAward from "@/../public/assets/infraShakti/overview/transportAward.png";
import urbanAwards from "@/../public/assets/infraShakti/overview/urbanAwards.png";
import ruralInfraAward from "@/../public/assets/infraShakti/overview/ruralInfraAward.png";

export default function Spotlight() {
  const YEARS = ["2024"] as const;
  const [selectedTab, setSelectedTab] = useState("2024");
  return (
    <>
      <div className="bg-whitesmoke">
        <div className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">In the spotlight</h5>
          </div>
          <div className="py-2 ">
            <h1 className="text-black  font-light">
              <span className="text-black/90 font-medium ">
                The InfraShakti Awardees
              </span>
            </h1>
          </div>
          <div className="flex flex-col    sm:flex-row gap-6 border-b border-darkgray/20">
            <div className="sm:border-r sm:border-darkgray/20">
              <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
                Filter by year
              </h5>
            </div>

            <div className="flex flex-row gap-5 ">
              {YEARS.map((tab) => (
                <button
                  key={tab}
                  className={`my-auto text-base  cursor-pointer rounded-[50px] px-4 py-2  sm:px-6 sm:py-3 
                    ${
                      selectedTab === tab
                        ? "border border-pink text-pink font-medium"
                        : "border border-lightgray/30"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="blade-top-padding-sm  ">
            <div className="sm:relative overflow-hidden sm:h-[22rem] lg:h-[27rem]">
              <Image
                src={sudhanshuBanner}
                alt="Sudhanshu Mani"
                className="w-full h-[27rem] object-cover   hidden sm:block   rounded-md" 
                style={{ objectPosition: "20% center" }}
              />
               <Image
                src={sudhanshuMobileView}
                alt="Sudhanshu Mani"
                className="w-full h-[27rem] object-cover block sm:hidden   rounded-md"
              />
              <div className="w-full sm:w-[45%] h-auto lg:h-[23rem]  sm:absolute right-3 top-1/2 -translate-y-1/2 ">
                <div className="w-full h-full  p-2 md:p-8 bg-pink">
                  <div className="flex flex-row gap-3  ">
                    <div>
                      <Image
                        src={award}
                        alt="Infravisionary Award"
                        className="w-14 h-14"
                      />
                    </div>
                    <div className="border-l-1   border-white">
                      <div className="ms-4">
                        <p className="text-white">Infravisionary Award</p>
                        <h6 className="text-white">Sudhanshu Mani</h6>
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <h4 className="text-white font-medium">
                      Catching Lightning on the Tracks
                    </h4>
                    <p className="text-[#E7E7E8] w-full xl:w-[70%] pt-2 opacity-[0.9]">
                      For transforming urban mobility, by leading and completing
                      the creation of the country's fastest train, Vande Bharat,
                      in a mere 18 months, despite all odds.
                    </p>
                    <div className="py-4">
                      <HeroBtn
                        text="Watch video"
                        target="_blank"
                        role="link"
                      borderColor="white"
                        color="white"
                        bgColor="pink"
                        size="base"
                         link="https://www.youtube.com/embed/9DIAhTDim9Y?start=13850&end=13887"
                        aarowColor="white"
                        classes="font-medium cursor-pointer "
                      />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" blade-top-padding-sm">
              <VideoCard data={videoCard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const videoCard = [
  {
    thumbnailImage: arun.src,
    awardName: "Water Saviour Award",
    name: "Arun Krishnamurthy ",
    link: "https://www.youtube.com/embed/9DIAhTDim9Y?start=14821&end=14880",
    title: "From Decomposing to Regenerating",
    logo: infraShaktiAward.src,
    awardslogo: waterSaviourAward.src,
    desc: " For engaging and empowering local communities to replenish 460+ lakes and water bodies in their neighbourhood across 18 states.",
  },
  {
    thumbnailImage: sandeep.src,
    awardName: "Urban Infra Hero Award",
    name: "Sandeep Patel ",
    link: "https://www.youtube.com/embed/9DIAhTDim9Y?start=14132&end=14161",
    title: "Making Waste Useful",
    logo: infraShaktiAward.src,
    awardslogo: urbanAwards.src,
    desc: "For recycling 2,00,000+ MT of dry waste annually across the country, from Ahmedabad to Indore, Pune to Jamnagar, through a circular end-to-end PPP model.",
  },

  {
    thumbnailImage: shashank.src,
    awardName: "Rural Infra Pioneer Award",
    name: "Shashank Kumar ",
    link: "https://www.youtube.com/embed/9DIAhTDim9Y?start=14387&end=14467",
    title: "Scripting Agricultural Prosperity",
    logo: infraShaktiAward.src,
    awardslogo: ruralInfraAward.src,
    desc: "For using digitisation to transform the lives of 2.7 million farmers and 12,000 rural entrepreneurs with easily accessible online services",
  },
  {
    thumbnailImage: afcons.src,
    awardName: "Transport Trailblazer Award",
    name: "Afcons Infrastructure ",
    link: "https://www.youtube.com/embed/9DIAhTDim9Y?start=13536&end=13547",
    title: "Redefining Possibility",
    logo: infraShaktiAward.src,
    awardslogo: transportAward.src,
    desc: "For building the world's highest arch railway bridge, the Chenab bridge, and improving the last-mile connectivity in the terrorist-prone areas of Jammu and Kashmir.",
  },
  {
    thumbnailImage: pankaj.src,
    awardName: "Renewable Energy Star Award",
    name: "Pankaj Kumar and Siddhant Agarwal",
    link: "https://www.youtube.com/embed/9DIAhTDim9Y?start=10129&end=10206",
    title: "Powering Impact with the Sun",
    logo: infraShaktiAward.src,
    awardslogo: renewableAward.src,
    desc: "For using dams and reservoirs for floating solar power solutions that generate energy while saving on real estate and reducing evaporation by 70%.",
  },
  {
    thumbnailImage: swarnalatha.src,
    awardName: "People’s Choice Award for Inclusive Infrastructure",
    name: "Swarnalatha J",
    link: "https://www.youtube.com/embed/9DIAhTDim9Y?start=15332&end=15430",
    title: " Ensuring Accessibility",
    logo: infraShaktiAward.src,
    awardslogo: peopleChoiceAward.src,
    desc: "For making an impact on 10 crore differently-abled Indians with her initiatives and advocacy of inclusive infrastructure.",
  },
];
