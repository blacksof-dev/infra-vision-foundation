"use client";
import { useEffect, useState } from "react";
import image1 from "@/../public/assets/resource/blogs/image1.png";
import image2 from "@/../public/assets/resource/blogs/image2.png";
import image3 from "@/../public/assets/resource/blogs/image3.png";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Card from "@/_components/molecules/cardTemplate";

const thirdPublicationFilter = ["2024", "2023"];

const secondSectorFilter = ["All", "Transportation", "Rural and Agri Infra"];

const allcards = [
  {
    img: image1.src,
    category: "Transportation",
    date: "October, 2024",
    title: "How to make India’s highways safe",
    link: "https://theinfravisionfoundation.org/2024/10/16/a-national-road-safety-authority-crucial-for-improving-indias-deteriorating-road-safety/",
  },
  {
    img: image2.src,
    category: "Transportation",
    date: "October, 2024",
    title: "Multi-utility Infra, the way to go!",
    link: "https://theinfravisionfoundation.org/2023/10/09/newsletter-images-do-not-remove/",
  },
  {
    img: image3.src,
    category: "Rural and Agri Infra",
    date: "November, 2023",
    title: "Agri-Warehousing: A problem of capacity",
    link: "https://theinfravisionfoundation.org/2023/11/25/poor-regulatory-capacity-of-the-warehousing-and-development-regulatory-authority-impacts-warehouse-based-sales-of-agri-commodities-and-issue-of-e-negotiable-warehouse-receipts/",
  },
];

export default function Blog() {
  const [selectTab, setselectedTab] = useState("All");
  const [selectedFilter, setselectedFilter] = useState("All");
  const mobileview = 3;
  const [visiblecountmobile, setvisiblecountmobile] = useState(mobileview);

  const handletabClick = (tab: string) => {
    setselectedTab(tab);

    if (tab === "Sectors") {
      setselectedFilter(secondSectorFilter[0]);
    } else if (tab === "Publication Year") {
      setselectedFilter(thirdPublicationFilter[0]);
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

    if (selectTab === "Sectors") {
      return selectedFilter === "All"
        ? allcards
        : allcards.filter((card) => card.category === selectedFilter);
    }

    return allcards;
  };

  const handleSeeMoreCta = () => {
    setvisiblecountmobile((prev) => prev + 3);
  };

  useEffect(() => {
    setvisiblecountmobile(mobileview);
  }, [selectTab]);

  return (
    <>
      <div>
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">Blogs</h5>
          </div>
          <div className="py-4 ">
            <h1 className="text-black  font-light">
              Infrastructure{" "}
              <span className="text-black/90 font-medium ">
                — Demystified <br /> and simplified
              </span>
            </h1>
          </div>

          <Tabs
            selectTab={selectTab}
            selectedFilter={selectedFilter}
            handleFilterClick={handleFilterClick}
            handletabClick={handletabClick}
          />

           {/* Card Section */}
          <div
            className={` ${
              selectTab === "Sectors" || selectTab === "Publication Year"
                ? "lg:pt-8"
                : "pt-12"
            }`}
          >
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-24 ">
                {FilteredCard()
                  .slice(0, visiblecountmobile)
                  .map((ele, index) => (
                    <div key={index}>
                      <Card
                        date={ele.date}
                        title={ele.title}
                        image={ele.img}
                        link={ele.link}
                        category={ele.category}
                        classes="line-clamp-3 "
                      />
                    </div>
                  ))}
              </div>

              {visiblecountmobile < FilteredCard().length && (
                <div className="flex justify-center mt-8  ">
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
    </>
  );
}

const Tabs = ({
  selectTab,
  selectedFilter,
  handleFilterClick,
  handletabClick,
}: {
  selectTab: string;
  selectedFilter: string;
  handleFilterClick: (filtername: string) => void;
  handletabClick: (tab: string) => void;
}) => {
  return (
    <>
      <div className="md:pt-5">
        <div className="flex flex-col md:flex-row gap-6  border-b border-darkgray/20  ">
          <div className="sm:border-r sm:border-darkgray/20">
            <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
              Filter by
            </h5>
          </div>

          {/* Tab Show */}

          <div className="flex flex-row gap-3 md:gap-5 ">
            <button
              className={`mt-auto  text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${
                selectTab === "All"
                  ? "border border-pink text-pink font-medium"
                  : "border border-lightgray/30"
              }`}
              onClick={() => handletabClick("All")}
            >
              All
            </button>

            <button
              onClick={() => handletabClick("Sectors")}
              className={`mt-auto text-sm md:text-base cursor-pointer  rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${
                selectTab === "Sectors"
                  ? "border  border-pink text-pink font-medium"
                  : "border border-lightgray/30"
              }`}
            >
              Sectors
            </button>

            <button
              onClick={() => handletabClick("Publication Year")}
              className={`mt-auto text-sm md:text-base cursor-pointer  rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${
                selectTab === "Publication Year"
                  ? "border  border-pink text-pink font-medium"
                  : "border border-lightgray/30"
              }`}
            >
              Publication Year
            </button>
          </div>
        </div>

        {/* Sub filter */}
        <div>
          {selectTab === "Sectors" && (
            <div className="py-5  flex gap-3 md:hidden flex-wrap">
              {secondSectorFilter.map((filter) => (
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

          {selectTab === "Publication Year" && (
            <div className="py-5  flex gap-3  md:hidden">
              {thirdPublicationFilter.map((filter) => (
                <button
                  className={`mt-auto  text-base cursor-pointer rounded-[50px]  px-3 py-1 mb-4  ${
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
        </div>

       
        <div className="">
          <div>
            {selectTab === "Sectors" && (
              <>
                <div className="pt-5 hidden md:block">
                  <div className="flex flex-row gap-5">
                    <div className="space-x-4 ">
                      {secondSectorFilter.map((filter) => (
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
            {selectTab === "Publication Year" && (
              <>
                <div className="pt-5 hidden md:block ">
                  <div className="flex flex-row gap-5">
                    <div className="space-x-4 ">
                      {thirdPublicationFilter.map((filter) => (
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
        </div>
        
      </div>
    </>
  );
};
