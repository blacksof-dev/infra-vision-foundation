"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from 'swiper/types';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import budgetSignals from "@/../public/assets/home/budgetSignals.jpg";
import infraOutlays from "@/../public/assets/home/infraOutlays.jpg";
import groupTaxation from "@/../public/assets/home/groupTaxation.jpg";
import Card from "./cardTemplate";
// import workshop from "@/../public/assets/home/workshop.png";
// import rail from "@/../public/assets/home/rail.png";
// import agriExports from "@/../public/assets/home/agriExports.png";


export default function CardSlider() {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const handleSlideChange = (swiper:SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };
  return (
    <>
      <div className="pt-5 md:pt-5 ">
        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            className=""
            navigation={{
              prevEl: ".swiper-solution-prev-btn",
              nextEl: ".swiper-solution-next-btn",
            }}
            spaceBetween={20}
            onSlideChange={handleSlideChange}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              500: { slidesPerView: 1.9, centeredSlides: false },
              768: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 2.9, centeredSlides: false },
              1280: { slidesPerView: 3.4, centeredSlides: false },
              1536: { slidesPerView: 4.3, centeredSlides: false },
            }}
          >
            
            {CardData.map((item, index) => {
              return (
                <SwiperSlide key={index} className="!h-full ">
                  <div className="">
                    <Card
                      date={item.date}
                      title={item.title}
                      image={item.img}
                      link={item.link}
                      category={item.category}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="flex lg:hidden flex-wrap gap-5 justify-center mt-4 lg:justify-end md:gap-8 2xl:mt-1 w-container">
        <button
          className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white ${
            isFirstSlide ? "opacity-40" : ""
          }`}
          aria-label="Previous slide"
        >
          <GoArrowLeft/>
        </button>
        <button
          className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white ${
            isLastSlide ? "!opacity-40" : ""
          }`}
          aria-label="Next slide"
        >
          <GoArrowRight />
        </button>
      </div>
    </>
  );
}

const CardData = [
  {
    date: "Aug 15 2024",
    title: "Group taxation regime for infrastructure",
    img: groupTaxation,
    link: "https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html",
    category:"News"
  },
  {
    date: "July 24, 2024",
    title: "Infra outlays: A strategic downplay",
    img: infraOutlays,
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
    category:"News"
  },
  {
    date: "July 24, 2024",
    title: "Budget signals shift in infra strategy",
    img: budgetSignals,
    link: "https://www.moneycontrol.com/news/business/economy/budget-signals-shift-in-infra-strategy-as-govt-pushes-states-private-sector-to-pitch-in-12777120.html",
    category:"News"
  },
];

