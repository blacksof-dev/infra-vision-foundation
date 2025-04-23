"use client";
import { useEffect, useState } from "react";
import volume15 from "@/../public/assets/publication/newsletter/volume15.png";
import volume16 from "@/../public/assets/publication/newsletter/volume16.png";
import volume17 from "@/../public/assets/publication/newsletter/volume17.png";
import volume18 from "@/../public/assets/publication/newsletter/volume18.png";
import volume19 from "@/../public/assets/publication/newsletter/volume19.png";
import volume20 from "@/../public/assets/publication/newsletter/volume20.png";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Card from "@/_components/molecules/cardTemplate";
import Image from "next/image";

const secondFilter = ["2025", "2024"];

const allcards = [
  {
    id: 1,
    img: volume20,
    category: "Volume 20",
    date: "January, 2025",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-January-2025.pdf",
  },
  {
    id: 2,
    img: volume19,
    category: "Volume 19",
    date: "December, 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-December-2024.pdf",
  },
  {
    id: 3,
    img: volume18,
    category: "Volume 18",
    date: "November, 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/11/INFRAVISION-TALK-November-2024.pdf",
  },
  {
    id: 4,
    img: volume17,
    category: "Volume 17",
    date: "October, 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/10/INFRAVISION-TALK-October-2024.pdf",
  },
  {
    id: 5,
    img: volume16,
    category: "Volume 16",
    date: "September 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/10/INFRAVISION-TALK-September-2024.pdf",
  },
  {
    id: 6,
    img: volume15,
    category: "Volume 15",
    date: "August, 2024",
    title:
      "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/08/INFRAVISION-TALK-August-2024.pdf",
  },
  {
    id: 7,
    img: volume15,
    category: "dummy",
    date: "dummy,2023",
    title: "dummy content to set see more section....",
    link: "",
  },
];

export default function Insights() {
  const [selectTab, setselectedTab] = useState("All");
  const [selectedFilter, setselectedFilter] = useState("All");

  const totalcount = 6;
  const mobileview = 3;

  const [visiblecount, setvisiblecount] = useState(totalcount);
  const [visiblecountmobile, setvisiblecountmobile] = useState(mobileview);

  const handletabClick = (tab: string) => {
    setselectedTab(tab);
  
    if (tab === "Publication Year") {
      setselectedFilter(secondFilter[0]);
    } else {
      setselectedFilter(""); 
    }
  };

  const handleFilterClick = (filtername: string) => {
    setselectedFilter(filtername);
  };

  const FilteredCard = () => {
    if (selectTab === "Publication Year") {
      return allcards.filter(
        (card) => card.date.split(" ").pop() === selectedFilter
      );
    }
    return allcards;
  };

  const handleSeeMoreCta = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setvisiblecountmobile((prev) => prev + 3);
      } else {
        setvisiblecount((prev) => prev + 3);
      }
    }
  };

  return (
    <>
      <div>
        <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
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

          <div className="pt-5">
            <div className="flex flex-col sm:flex-row gap-6  border-b border-darkgray/20  ">
              <div className="sm:border-r sm:border-darkgray/20">
                <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
                  Filter by
                </h5>
              </div>

              {/* Tab Show */}

              <div className="flex flex-row gap-5 ">
                <button
                  className={`mt-auto  text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3  sm:mb-4  ${
                    selectTab === "All"
                      ? "border border-pink text-pink font-medium"
                      : "border border-lightgray/30"
                  }`}
                  onClick={() => handletabClick("All")}
                >
                  All
                </button>

                <button
                  onClick={() => handletabClick("Publication Year")}
                  className={`mt-auto text-base cursor-pointer  rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${
                    selectTab === "Publication Year"
                      ? "border  border-pink text-pink font-medium"
                      : "border border-lightgray/30"
                  }`}
                >
                  Publication Year
                </button>
              </div>
            </div>

            {selectTab === "Publication Year" && (
            <div className="py-5  flex gap-3 md:hidden">
              {secondFilter.map((filter) => (
                <button
                  className={`mt-auto  text-base cursor-pointer rounded-[50px] px-3 py-1 mb-4  ${
                    selectedFilter === filter
                      ? "border border-pink text-white bg-pink font-medium"
                      : "border border-lightgray/30"
                  }`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            )}

            {/* Inner Filteration Tab */}
            <div className="">
              <div>
                {selectTab === "Publication Year" && (
                  <>
                    <div className="py-5 hidden md:block">
                      <div className="flex flex-row gap-5">
                        

                        <div className="space-x-4 ">
                          {secondFilter.map((filter) => (
                            <button
                              className={`mt-auto  text-base cursor-pointer rounded-[50px] px-6 py-3 mb-4  ${
                                selectedFilter === filter
                                  ? "border border-pink text-white bg-pink font-medium"
                                  : "border border-lightgray/30"
                              }`}
                              onClick={() => handleFilterClick(filter)}
                            >
                              {filter}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Data show and Filteration */}

              <div className=" pt-12  md:block hidden">
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-24 ">
                    {FilteredCard()
                      .slice(0, visiblecount)
                      .map((ele, index) => (
                        <div
                          key={index}
                          
                        >
                          <Card
                            date={ele.date}
                            title={ele.title}
                            image={ele.img}
                            link={ele.link}
                            category={ele.category}
                            classes="line-clamp-2 "
                          />
                        </div>
                      ))}
                  </div>

                  {visiblecount < FilteredCard().length &&
                    visiblecount === totalcount && (
                      <div className="flex justify-center mt-8 ">
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
              </div>

              <div className="pt-6 sm:pt-12 block md:hidden">
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-24 ">
                    {FilteredCard()
                      .slice(0, visiblecountmobile)
                      .map((ele, index) => (
                        <div
                          key={index}
                          
                        >
                          <Card
                            date={ele.date}
                            title={ele.title}
                            image={ele.img}
                            link={ele.link}
                            category={ele.category}
                            classes="line-clamp-2"
                          />
                        </div>
                      ))}
                  </div>

                  {visiblecountmobile <= FilteredCard().length && (
                    <div className="flex justify-center mt-2 ">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
