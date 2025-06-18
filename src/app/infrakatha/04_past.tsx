"use client";
import { useEffect, useState } from "react";
import bg from "@/../public/assets/infrakatha/past-events/bgcircle.png";
import montek from "@/../public/assets/infrakatha/past-events/montek.png";
import william from "@/../public/assets/infrakatha/past-events/william.png";
import shailesh from "@/../public/assets/infrakatha/past-events/shailesh.png";
import gurucharan from "@/../public/assets/infrakatha/past-events/gurucharan.png";
import devdutt from "@/../public/assets/infrakatha/past-events/devdutt.png";
import deepaMalik from "@/../public/assets/infrakatha/past-events/deepaMalik.png";
import sanjeev from "@/../public/assets/infrakatha/past-events/sanjeev.png";
import aman from "@/../public/assets/infrakatha/past-events/aman.png";

import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Image from "next/image";
import { NewsCard } from "@/_components/molecules/newsCard";

const yearFilters = ["2024"];

const allcards = [
  {
    img: montek.src,
    category: "InfraKatha #8",
    date: "14 Dec, 2024",
    title: "Can Public Private Partnerships be Revitalised?",
    link: "https://www.youtube.com/watch?v=o6nb3IejARc&list=PLj3lfy92K7LN4hC0FiPx_ABoTRE3PUYNa&index=1&ab_channel=TheInfravisionFoundation",
    description:
      "Featuring Mr. Montek Singh Ahluwalia, Former Deputy Chairman, the Planning Commission",
  },
  {
    img: william.src,
    category: "InfraKatha #7",
    date: "24 Nov, 2024",
    title: "Indosphere: How Indian trade grew",
    link: "https://www.youtube.com/watch?v=ae8InU9IGgk&list=PLj3lfy92K7LN4hC0FiPx_ABoTRE3PUYNa&index=2&ab_channel=TheInfravisionFoundation",
    description: "Featuring Mr. William Dalrymple, Historian and Author",
  },
  {
    img: shailesh.src,
    category: "InfraKatha #6",
    date: "5 Oct, 2024",
    title: "Artificial Intelligence: Reshaping the Digital Infra Landscape",
    link: "https://www.youtube.com/watch?v=hIzp4YhZcMo&list=PLj3lfy92K7LN4hC0FiPx_ABoTRE3PUYNa&index=3&ab_channel=TheInfravisionFoundation",
    description: "Featuring Mr. Gurucharan Das, Author",
  },
  {
    img: aman.src,
    category: "InfraKatha #5",
    date: "7 Sep, 2024",
    title: "Heritage Tourism Infrastructure",
    link: "https://www.youtube.com/watch?v=u-SEobnWU6U&list=PLj3lfy92K7LN4hC0FiPx_ABoTRE3PUYNa&index=4&ab_channel=TheInfravisionFoundation",
    description:
      "Featuring Mr. Aman Nath, Co-founder and Chairman, Neemrana Hotels and noted heritage restorer",
  },
  {
    img: sanjeev.src,
    category: "InfraKatha #4",
    date: "17 Aug, 2024",
    title: "Saraswati, The Lost River",
    link: "https://www.youtube.com/watch?v=sygLq4cccIY&list=PLj3lfy92K7LN4hC0FiPx_ABoTRE3PUYNa&index=5&ab_channel=TheInfravisionFoundation",
    description:
      "Featuring Mr. Sanjeev Sanyal, Author, Economist, Member of the PM’s Advisory Economic Council",
  },
  {
    img: gurucharan.src,
    category: "InfraKatha #3",
    date: "19 July, 2024",
    title: "Indian Infrastructure — The difficulty of being good",
    link: "https://www.youtube.com/watch?v=FCDeGlsb7q0&list=PLj3lfy92K7LN4hC0FiPx_ABoTRE3PUYNa&index=6&ab_channel=TheInfravisionFoundation",
    description: "Featuring Mr. Gurucharan Das, Author",
  },
  {
    img: deepaMalik.src,
    category: "InfraKatha #2",
    date: "19 June, 2024",
    title: "Inclusive Infrastructure",
    link: "https://www.youtube.com/watch?v=5uzHmHzU7q0&list=PLj3lfy92K7LN4hC0FiPx_ABoTRE3PUYNa&index=7&ab_channel=TheInfravisionFoundation",
    description:
      "Featuring Padma Shri Dr. Deepa Malik, Para-athlete and Former President of the Paralympic Committee of Indi",
  },
  {
    img: devdutt.src,
    category: "InfraKatha #1",
    date: "29 may, 2024",
    title: "Mythology & Infrastructure ",
    link: "https://www.youtube.com/watch?v=9v61vpPmXEk&list=PLj3lfy92K7LN4hC0FiPx_ABoTRE3PUYNa&index=8&ab_channel=TheInfravisionFoundation",
    description: "Featuring Mr. Devdutt Pattanaik, Author",
  },
];

export default function PastEvents() {
  const [selectedYear, setSelectedYear] = useState(yearFilters[0]);
  const mobileview = 3;
  const [visiblecountmobile, setvisiblecountmobile] = useState(mobileview);

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    setvisiblecountmobile(mobileview);
  };

  const FilteredCard = () => {
    return allcards.filter((card) => card.date.includes(selectedYear));
  };

  const handleSeeMoreCta = () => {
    setvisiblecountmobile((prev) => prev + 3);
  };

  return (
    <section className="relative bg-white">
      <Image
        className="absolute top-0 left-0 lg:block hidden "
        src={bg}
        alt="background image"
      ></Image>
      <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
        <div className="flex flex-row items-center gap-2 md:gap-3 ">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
          <h5 className="font-medium text-pink">Past Infrakatha sessions</h5>
        </div>
        <div className="py-3 ">
          <h1 className="text-black  font-light">
            The
            <span className="text-black/90 font-medium "> saga </span>
            so far
          </h1>
        </div>
        <div className="md:pt-5">
          <div className="flex flex-row items-center gap-4  pb-4 mb-4 sm:mb-8">
            <div className="border-r border-darkgray/20">
              <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
                Filter by year
              </h5>
            </div>
            <div className="flex flex-row gap-2 ">
              {yearFilters.map((year) => (
                <button
                  key={year}
                  className={`mt-auto text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2  sm:px-6 sm:py-3  ${
                    selectedYear === year
                      ? "border border-pink text-pink font-medium"
                      : "border border-lightgray/30"
                  }`}
                  onClick={() => handleYearClick(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-24">
            {FilteredCard()
              .slice(0, visiblecountmobile)
              .map((ele, index) => (
                <div key={index}>
                  <NewsCard
                    date={ele.date}
                    title={ele.title}
                    image={ele.img}
                    link={ele.link}
                    category={ele.category}
                    description={ele.description}
                    classes="line-clamp-3 "
                  />
                </div>
              ))}
          </div>
          {visiblecountmobile < FilteredCard().length && (
            <div className="flex justify-center xl:mt-4">
              <div>
                <button
                onClick={handleSeeMoreCta}
                  className={`group  text-xl lg:text-2xl   text-pink hover:text-white cursor-pointer  text-nowrap w-40  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
                  
                >
                  <span className="z-50 relative"> See more</span>
                  <span
                    className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
                  ></span>
                  <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[5] transition-all duration-700 ease-in-out z-0"></span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
