"use client";
import { useEffect, useState } from "react";
import bg from "@/../public/assets/infrakatha/past-events/bgcircle.png"
import image1 from "@/../public/assets/infrakatha/past-events/01.jpg"
import image2 from "@/../public/assets/infrakatha/past-events/02.jpg"
import image3 from "@/../public/assets/infrakatha/past-events/03.jpg"
import image4 from "@/../public/assets/outreach-and-engagements/past/image-4.png"
import image5 from "@/../public/assets/outreach-and-engagements/past/image-5.png"
import image6 from "@/../public/assets/outreach-and-engagements/past/image-6.png"

import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Image from "next/image";
import { NewsCard } from "@/_components/molecules/newsCard";


const yearFilters = ["2025", "2024"];

const allcards = [
    {
        img: image1.src,
        category: "InfraKatha #8",
        date: "29 May, 2024",
        title: "Mythology & Infrastructure",
        link: "#",
        description: "Featuring Mr. Devdutt Pattanaik, Author"
    },
    {
        img: image2.src,
        category: "InfraKatha #2",
        date: "19 June, 2024",
        title: "Inclusive Infrastructure",
        link: "#",
        description: "Featuring Padma Shri Dr. Deepa Malik, Para-athlete and Former President of..."
    },
    {
        img: image3.src,
        category: "InfraKatha #3",
        date: "19 July, 2024",
        title: "Indian Infrastructure — The difficulty of being good",
        link: "#",
        description: "Featuring Mr. Gurucharan Das, Author"
    },
    {
        img: image4.src,
        category: "InfraKatha #4",
        date: "January, 2025",
        title: "Sample Title 4",
        link: "#",
        description: "Sample description 4"
    },
    {
        img: image5.src,
        category: "InfraKatha #5",
        date: "January, 2025",
        title: "Sample Title 5",
        link: "#",
        description: "Sample description 5"
    },
    {
        img: image6.src,
        category: "InfraKatha #6",
        date: "January, 2025",
        title: "Sample Title 6",
        link: "#",
        description: "Sample description 6"
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
        return allcards.filter(card => card.date.includes(selectedYear));
    };

    const handleSeeMoreCta = () => {
        setvisiblecountmobile((prev) => prev + 3);
    };

    return (
        <section className="relative bg-white">
            <Image className="absolute top-0 left-0 lg:block hidden " src={bg} alt="background image" ></Image>
            <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
                <div className="flex flex-row items-center gap-2 md:gap-3 ">
                    <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                    <h5 className="font-medium text-pink">Past InfraKatha sessions</h5>
                </div>
                <div className="py-3 ">
                    <h1 className="text-black  font-light">
                        The
                        <span className="text-black/90 font-medium ">
                            {" "} saga so far
                        </span>
                    </h1>
                </div>
                <div className="md:pt-5">
                    <div className="flex flex-row items-center gap-4  pb-4 mb-8">
                        <div className="sm:border-r sm:border-darkgray/20">
                            <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
                                Filter by year
                            </h5>
                        </div>
                        <div className="flex flex-row gap-2">
                            {yearFilters.map((year) => (
                                <button
                                    key={year}
                                    className={`mt-auto text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4 ${selectedYear === year ? "border border-pink text-pink font-medium" : "border border-lightgray/30"}`}
                                    onClick={() => handleYearClick(year)}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-24 ">
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
        </section>
    );
}

