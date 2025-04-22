"use client";
import { useState } from "react";

import energy from "@/../public/assets/publication/whitePaper/energy.png";
import transportation from "@/../public/assets/publication/whitePaper/transportation.png";
import urban from "@/../public/assets/publication/whitePaper/urban.png";

import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Card from "@/_components/molecules/cardTemplate";

const thirdPublicationFilter = ["2025", "2024"];

// const secondSectorFilter = [
//   "Transportation",
//   "Water and Sanitation",
//   "Energy",
//   "Urban Planning",
//   "Rural and Agri Infra",
//   "Education",
//   "Health",
// ];

const secondSectorFilter = ["Transportation", "Energy", "Urban Planning"];

const allcards = [
  {
    id: 1,
    img: transportation,
    category: "Transportation",
    date: "January, 2025",
    title:
      "Strategies to improve the financial performance of the metro rail system",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Metro-Rail-Systems-Whitepaper.pdf",
  },
  {
    id: 2,
    img: urban,
    category: "Urban Planning",
    date: "January, 2025",
    title: "Sustainability ratings for Infrastructure projects in India",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Sustainability-Rating-Infra-Whitepaper-2.pdf",
  },
  {
    id: 3,
    img: energy,
    category: "Energy",
    date: "January, 2024",
    title: "Mass scale rooftop solar programme for poverty alleviation",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/solar.pdf",
  },
  {
    id: 1,
    img: transportation,
    category: "Transportation",
    date: "January, 2025",
    title:
      "Strategies to improve the financial performance of the metro rail system",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Metro-Rail-Systems-Whitepaper.pdf",
  },
  {
    id: 2,
    img: urban,
    category: "Urban Planning",
    date: "January, 2025",
    title: "Sustainability ratings for Infrastructure projects in India",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Sustainability-Rating-Infra-Whitepaper-2.pdf",
  },
  {
    id: 3,
    img: energy,
    category: "Energy",
    date: "January, 2024",
    title: "Mass scale rooftop solar programme for poverty alleviation",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/solar.pdf",
  },
  {
    id: 3,
    img: energy,
    category: "Energy",
    date: "January, 2024",
    title: "Mass scale rooftop solar programme for poverty alleviation",
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/solar.pdf",
  },
];

export default function WhitePaper() {
  const [selectTab, setselectedTab] = useState("All");
  const [selectedFilter, setselectedFilter] = useState("All");

  const totalcount = 6;
  const mobileview = 3;

  const [visiblecount, setvisiblecount] = useState(totalcount);
  const [visiblecountmobile, setvisiblecountmobile] = useState(mobileview);

  const handletabClick = (tab: string) => {
    setselectedTab(tab);
  };

  const handleFilterClick = (filtername: string) => {
    setselectedFilter(filtername);
  };

  const FilteredCard = () => {
    if (selectTab === "Publication Year") {
      return selectedFilter === "All"
        ? allcards
        : allcards.filter(
            (card) => card.date.split(" ").pop() === selectedFilter
          );
    } else if (selectTab === "Sectors") {
      return selectedFilter === "All"
        ? allcards
        : allcards.filter((card) => card.category === selectedFilter);
    }
    console.log(selectedFilter);
    return allcards;
  };

  const handleSeeMoreCta = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1024) {
        setvisiblecountmobile((prev) => prev + 3);
      } else {
        setvisiblecount((prev) => prev + 3);
      }
    }
  };
  return (
    <>
      <div className="bg-whitesmoke">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">White papers</h5>
          </div>

          <div className="py-3 ">
            <h1 className="text-black  font-light">
              Putting key infrastructure <br />
              <span className="text-black/90 font-medium ">
                challenges and solutions in perspective
              </span>
            </h1>
          </div>

          <div className="md:py-5">
            <div className="flex flex-col md:flex-row gap-6  border-b border-darkgray/20  ">
              <div className="md:border-r md:border-darkgray/20">
                <h5 className="text-darkgray/80 py-3 md:py-5 pr-5 text-nowrap">
                  Filter by Category
                </h5>
              </div>

              {/* Tab Show */}
              <div className="flex flex-row justify-between   w-full">
                <div className="flex flex-row gap-3 md:gap-5 ">
                  <button
                    className={`mt-auto  text-sm md:text-base cursor-pointer rounded-[50px] px-3 py-1 mb-3 sm:px-6 sm:py-3  sm:mb-4  ${
                      selectTab === "All"
                        ? "border border-pink text-pink"
                        : "border border-lightgray"
                    }`}
                    onClick={() => handletabClick("All")}
                  >
                    All
                  </button>

                  <button
                    onClick={() => handletabClick("Sectors")}
                    className={`mt-auto text-sm md:text-base cursor-pointer  rounded-[50px] px-3 py-1 mb-3 sm:px-6 sm:py-3  sm:mb-4  ${
                      selectTab === "Sectors"
                        ? "border  border-pink text-pink"
                        : "border border-lightgray"
                    }`}
                  >
                    Sectors
                  </button>

                  <button
                    onClick={() => handletabClick("Publication Year")}
                    className={`mt-auto text-sm md:text-base cursor-pointer  rounded-[50px] px-3 py-1 mb-3 sm:px-6 sm:py-3  sm:mb-4  ${
                      selectTab === "Publication Year"
                        ? "border  border-pink text-pink"
                        : "border border-lightgray"
                    }`}
                  >
                    Publication Year
                  </button>
                </div>

                <div>
                  {selectTab === "Sectors" && (
                    <div className="md:hidden block  ">
                      <select
                        name="years"
                        value={selectedFilter}
                        onChange={(e) => handleFilterClick(e.target.value)}
                        className={`text-sm md:text-base  h-[3rem] w-[5rem] outline-none text-darkgray `}
                      >
                        <option value="All">All</option>
                        {secondSectorFilter.map((filter) => (
                          <option key={filter} value={filter}>
                            {filter}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectTab === "Publication Year" && (
                    <div className="md:hidden block  ">
                      <select
                        name="years"
                        value={selectedFilter}
                        onChange={(e) => handleFilterClick(e.target.value)}
                        className={`text-sm md:text-base   h-[3rem] w-[5rem]   text-darkgray outline-none`}
                      >
                        <option value="All">All</option>
                        {thirdPublicationFilter.map((filter) => (
                          <option key={filter} value={filter}>
                            {filter}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Inner Filteration Tab */}
            <div className="">
              <div>
                {selectTab === "Sectors" && (
                  <>
                    <div className="py-5 hidden md:block">
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

                        <div className="space-x-4 ">
                          {secondSectorFilter.map((filter) => (
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
                    </div>
                  </>
                )}
                {selectTab === "Publication Year" && (
                  <>
                    <div className="py-5 hidden md:block">
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

                        <div className="space-x-4 ">
                          {thirdPublicationFilter.map((filter) => (
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
                    </div>
                  </>
                )}
              </div>

              {/* Data show and Filteration */}

              <div className="py-5 xl:py-7 md:block hidden">
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-24 ">
                    {FilteredCard()
                      .slice(0, visiblecount)
                      .map((ele, index) => (
                        <div
                          key={index}
                          className={`  ${
                            index === 0 || index % 3 === 0
                              ? "xl:border-l-0"
                              : "xl:border-l-1 xl:border-darkgray/20 xl:ps-8"
                          }`}
                        >
                          <Card
                            date={ele.date}
                            title={ele.title}
                            image={ele.img}
                            link={ele.link}
                            category={ele.category}
                             classes="line-clamp-3"
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
              <div className="py-5 xl:py-7 block md:hidden">
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-24 ">
                    {FilteredCard()
                      .slice(0, visiblecountmobile)
                      .map((ele, index) => (
                        <div
                          key={index}
                          className={`  ${
                            index === 0
                              ? "xl:border-l-0"
                              : "xl:border-l-1 xl:border-darkgray/20 xl:ps-8"
                          }`}
                        >
                          <Card
                            date={ele.date}
                            title={ele.title}
                            image={ele.img}
                            link={ele.link}
                            category={ele.category}
                            classes="line-clamp-3"
                          />
                        </div>
                      ))}
                  </div>

                  {visiblecountmobile <= FilteredCard().length && (
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
