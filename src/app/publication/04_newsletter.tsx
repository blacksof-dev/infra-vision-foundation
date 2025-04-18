"use client";
import { useState } from "react";
import Image from "next/image";
import volume15 from "@/../public/assets/publication/newsletter/volume15.png";
import volume16 from "@/../public/assets/publication/newsletter/volume16.png";
import volume17 from "@/../public/assets/publication/newsletter/volume17.png";
import volume18 from "@/../public/assets/publication/newsletter/volume18.png";
import volume19 from "@/../public/assets/publication/newsletter/volume19.png";
import volume20 from "@/../public/assets/publication/newsletter/volume20.png";
import { BorderGrayHeroBtn } from "@/_components/atoms/buttons";

const secondFilter = ["2025", "2024", "2023"];

const allcards = [
  {
    id: 1,
    image: volume20,
    tag: "Volume 20",
    date: "January, 2025",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "",
  },
  {
    id: 1,
    image: volume19,
    tag: "Volume 19",
    date: "December, 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "",
  },
  {
    id: 1,
    image: volume18,
    tag: "Volume 18",
    date: "November, 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "",
  },
  {
    id: 1,
    image: volume17,
    tag: "Volume 17",
    date: "October, 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "",
  },
  {
    id: 1,
    image: volume16,
    tag: "Volume 16",
    date: "September 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "",
  },
  {
    id: 1,
    image: volume15,
    tag: "Volume 15",
    date: "August, 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "",
  },
];

export default function Insights() {
  const [selectTab, setselectedTab] = useState("All");
  const [selectedFilter, setselectedFilter] = useState("All");

  const handletabClick = (tab: string) => {
    setselectedTab(tab);
  };

  const handleFilterClick = (filtername: string) => {
    setselectedFilter(filtername);
  };

  const FilteredCard = ()=>{
    if(selectTab==="Publication Year"){
        
        return selectedFilter==="All"? allcards : allcards.filter((card)=>card.date.split(" ").pop() === selectedFilter)
    }
    return allcards;
  }

  return (
    <>
      <section>
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">
              Newsletters | The Infravision Talk
            </h5>
          </div>
          <div className="py-3 ">
            <h1 className="text-black  font-light">
              Insights, updates, and <br />
              <span className="text-black/90 font-medium ">
                a dash of brain-teasers
              </span>
            </h1>
          </div>
          <div className="py-5">
            <div className="flex flex-row gap-6  border-b border-darkgray/20  ">
              <div className="border-r border-darkgray/20">
                <h5 className="text-darkgray/80 py-5 pr-5">
                  Filter by Category
                </h5>
              </div>

              {/* Tab Show */}
              <div className="flex flex-row gap-5">
                <button
                  className={`mt-auto  text-base cursor-pointer rounded-[50px] px-6 py-3 mb-4  ${
                    selectTab === "All"
                      ? "border border-pink text-pink"
                      : "border border-lightgray"
                  }`}
                  onClick={() => handletabClick("All")}
                >
                  All
                </button>

                <button
                  onClick={() => handletabClick("Publication Year")}
                  className={`mt-auto text-base cursor-pointer  rounded-[50px] px-6 py-3 mb-4  ${
                    selectTab === "Publication Year"
                      ? "border  border-pink text-pink"
                      : "border border-lightgray"
                  }`}
                >
                  Publication Year
                </button>
              </div>
            </div>

            {/* Inner Filteration Tab */}
            <div>
              {selectTab === "Publication Year" && (
                <div className="py-5">
                  <div className="flex flex-row gap-5">
                    <button
                      className={`mt-auto  text-base cursor-pointer rounded-[50px] px-6 py-3 mb-4  ${
                        selectedFilter === "All"
                          ? "border border-pink text-white bg-pink"
                          : "border border-lightgray"
                      }`}
                      onClick={() => handleFilterClick("All")}
                    >
                      All
                    </button>

                    {secondFilter.map((filter) => (
                      <button
                        className={`mt-auto  text-base cursor-pointer rounded-[50px] px-6 py-3 mb-4  ${
                          selectedFilter === filter
                            ? "border border-pink text-white bg-pink"
                            : "border border-lightgray"
                        }`}
                        onClick={() => handleFilterClick(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Data show and Filteration */}

            <div className="blade-top-padding">
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-24 ">
                  {FilteredCard().map((ele, index) => (
                    <div key={index} className=" ">
                      <div>
                        <div>
                          <Image src={ele.image} alt={ele.tag} className="" />
                        </div>
                        <div className="flex flex-row justify-between py-4">
                          <div className="flex flex-row gap-2 justify-center items-center">
                            <span className="w-[7px]  h-[7px] md:w-[12px] md:h-[12px] rounded-full  bg-darkgray/30"></span>
                            <p>{ele.tag}</p>
                          </div>

                          <p className="text-darkgray">{ele.date}</p>
                        </div>
                        <div>
                          <h5 className="text-blacksecond font-medium">
                            {ele.title}
                          </h5>
                        </div>
                        <div className="pt-3  pb-6 xl:py-5 h">
                          <BorderGrayHeroBtn
                            text="Read more"
                            role="link"
                            borderColor="darkgray/40"
                            color="black"
                            bgColor="white"
                            size="base"
                            target="_blank"
                            classes="font-medium"
                            link={ele.link}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
