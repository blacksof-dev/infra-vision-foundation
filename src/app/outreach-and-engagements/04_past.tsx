"use client";
import { useEffect, useState } from "react";

import image1 from "@/../public/assets/outreach-and-engagements/past/image-1.png";
import image2 from "@/../public/assets/outreach-and-engagements/past/image-2.png";
import image3 from "@/../public/assets/outreach-and-engagements/past/image-3.png";
import image4 from "@/../public/assets/outreach-and-engagements/past/image-4.png"
import image5 from "@/../public/assets/outreach-and-engagements/past/image-5.png"
import image6 from "@/../public/assets/outreach-and-engagements/past/image-6.png"

import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Card from "@/_components/molecules/cardTemplate";
import NewCard from "@/_components/molecules/newCardTemplate";

const thirdPublicationFilter = ["2025", "2024"];

const secondSectorFilter = ["All", "Transportation", "Energy", "Urban Planning", "Rural and Agri Infra"];

const allcards = [
    {

        img: image1.src,
        category: "InfraKatha #8",
        date: "November, 2024",
        title:
            "Featuring Mr Montek Singh Ahluwalia, Former Deputy Chairman, Planning Commission",
        link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
    },
    {

        img: image2.src,
        category: "InfraShakti Awards 2025",
        date: "January, 2025",
        title: "Lorem ipsum dolor sit amet consectetur. Nunc urna ultrices platea praesent.",
        link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/02/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
    },
    {

        img: image3.src,
        category: "CAIRA Roundtable I",
        date: "January, 2025",
        title: "Featuring Mr Vinayak Chatterjee, Founder and Managing Director",
        link: "https://theinfravisionfoundation.org/wp-content/uploads/2024/08/Safe-Highways-in-India-Challenges-and-Solutions_August-2024.pdf",
    },
    {

        img: image4.src,
        category: "InfraShakti Awards 2025",
        date: "January, 2025",
        title:
            "Lorem ipsum dolor sit amet consectetur. Nunc urna ultrices platea praesent.",
        link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Metro-Rail-Systems-Whitepaper.pdf",
    },
    {

        img: image5.src,
        category: "CAIRA Roundtable I",
        date: "January, 2025",
        title: "Lorem ipsum dolor sit amet consectetur. Nunc urna ultrices platea praesent.",
        link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/Sustainability-Rating-Infra-Whitepaper-2.pdf",
    },
    {

        img: image6.src,
        category: "InfraKatha #7",
        date: "January, 2025",
        title: "Featuring Mr William Dalrymple, Historian and Author",
        link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/solar.pdf",
    },
    {
        img: image6.src,
        category: "InfraKatha #7",
        date: "January, 2025",
        title: "Featuring Mr William Dalrymple, Historian and Author",
        link: "https://theinfravisionfoundation.org/wp-content/uploads/2023/11/solar.pdf",
    },

];


export default function Past() {
    const [selectTab, setselectedTab] = useState("All");
    const [selectedFilter, setselectedFilter] = useState("All");


    const mobileview = 6;


    const [visiblecountmobile, setvisiblecountmobile] = useState(mobileview);

    const handletabClick = (tab: string) => {
        setselectedTab(tab);

        if (tab === "InfraKatha") {
            setselectedFilter(secondSectorFilter[0]);
        } else if (tab === "InfraShakti Awards") {
            setselectedFilter(thirdPublicationFilter[0]);
        } else {
            setselectedFilter("");
        }
    };

    const handleFilterClick = (filtername: string) => {
        setselectedFilter(filtername);
    };

    const FilteredCard = () => {
        if (selectTab === "InfraKatha") {
            return allcards.filter((card) => card.category.includes("InfraKatha"));
        }

        if (selectTab === "InfraShakti Awards") {
            return allcards.filter((card) => card.category.includes("InfraShakti Awards"));
        }

        if (selectTab === "CAIRA Roundtable") {
            return allcards.filter((card) => card.category.includes("CAIRA Roundtable"));
        }

        if (selectTab === "Corporate") {
            return allcards.filter((card) => card.category.includes("Corporate"));
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
                <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
                    <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
                        <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                        <h5 className="font-medium text-pink">Past Programmes</h5>
                    </div>

                    <div className="py-3 ">
                        <h1 className="text-black  font-light">
                            A rewind of key <br />
                            <span className="text-black/90 font-medium ">
                                {" "} discussions and insights
                            </span>
                        </h1>
                    </div>

                    <div className="md:pt-5">
                        <div className="flex flex-col md:flex-row gap-6  border-b border-darkgray/20  ">
                            <div className="sm:border-r sm:border-darkgray/20">
                                <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
                                    Filter by Category
                                </h5>
                            </div>

                            {/* Tab Show */}

                            <div className="flex flex-row gap-3 md:gap-5 ">
                                <button
                                    className={`mt-auto  text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${selectTab === "All"
                                            ? "border border-pink text-pink font-medium"
                                            : "border border-lightgray/30"
                                        }`}
                                    onClick={() => handletabClick("All")}
                                >
                                    All
                                </button>

                                <button
                                    onClick={() => handletabClick("InfraKatha")}
                                    className={`mt-auto text-sm md:text-base cursor-pointer  rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${selectTab === "InfraKatha"
                                            ? "border  border-pink text-pink font-medium"
                                            : "border border-lightgray/30"
                                        }`}
                                >
                                    InfraKatha
                                </button>

                                <button
                                    onClick={() => handletabClick("InfraShakti Awards")}
                                    className={`mt-auto text-sm md:text-base cursor-pointer  rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${selectTab === "InfraShakti Awards"
                                            ? "border  border-pink text-pink font-medium"
                                            : "border border-lightgray/30"
                                        }`}
                                >
                                    InfraShakti Awards
                                </button>
                                <button
                                    onClick={() => handletabClick("CAIRA Roundtable")}
                                    className={`mt-auto text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${selectTab === "CAIRA Roundtable"
                                            ? "border border-pink text-pink font-medium"
                                            : "border border-lightgray/30"
                                        }`}
                                >
                                    CAIRA Roundtable
                                </button>

                                <button
                                    onClick={() => handletabClick("Corporate")}
                                    className={`mt-auto text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4  ${selectTab === "Corporate"
                                            ? "border border-pink text-pink font-medium"
                                            : "border border-lightgray/30"
                                        }`}
                                >
                                    Corporate
                                </button>

                            </div>
                        </div>

                        {/* Sub filter */}
                        {/* <div>
                            {selectTab === "InfraKatha" && (
                                <div className="py-5  flex gap-3 md:hidden flex-wrap">
                                    {secondSectorFilter.map((filter) => (
                                        <button
                                            className={`mt-auto  text-base cursor-pointer rounded-[50px] px-3 py-1 mb-4  ${selectedFilter === filter
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
                            {selectTab === "InfraShakti Awards" && (
                                <div className="py-5  flex gap-3  md:hidden">
                                    {thirdPublicationFilter.map((filter) => (
                                        <button
                                            className={`mt-auto  text-base cursor-pointer rounded-[50px]  px-3 py-1 mb-4  ${selectedFilter === filter
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
                        </div> */}

                        {/* Inner Filteration Tab */}
                        <div className="">
                            {/* <div>
                                {selectTab === "InfraKatha" && (
                                    <>
                                        <div className="pt-5 hidden md:block">
                                            <div className="flex flex-row gap-5">

                                                <div className="space-x-4 ">
                                                    {secondSectorFilter.map((filter) => (
                                                        <button
                                                            className={`mt-auto  text-base cursor-pointer rounded-[50px] px-6 py-3 mb-4  ${selectedFilter === filter
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
                                {selectTab === "InfraShakti Awards" && (
                                    <>
                                        <div className="pt-5 hidden md:block ">
                                            <div className="flex flex-row gap-5">
                                                <div className="space-x-4 ">
                                                    {thirdPublicationFilter.map((filter) => (
                                                        <button
                                                            className={`mt-auto  text-base cursor-pointer rounded-[50px] px-6 py-3 mb-4  ${selectedFilter === filter
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
                            </div> */}

                            {/* Data show and Filteration */}

                            <div className={` ${selectTab === "InfraKatha" || selectTab === "InfraShakti Awards" ? "lg:pt-8" : "pt-12"}`}>
                                <div>
                                    <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-24 ">
                                        {FilteredCard()
                                            .slice(0, visiblecountmobile)
                                            .map((ele, index) => (
                                                <div
                                                    key={index}

                                                >
                                                    <NewCard
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
                </div>
            </div>
        </>
    );
}
