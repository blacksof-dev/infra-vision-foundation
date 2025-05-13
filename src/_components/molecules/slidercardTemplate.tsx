"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from 'swiper/types';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import Card from "./cardTemplate";



type CardDataType = {
title:string,
img:string;
link:string;
category:string;
date:string;
}

export default function CardSlider({details}:{details:CardDataType[]}) {
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
              prevEl: ".swiper-solution-prev-news",
              nextEl: ".swiper-solution-next-news",
            }}
            pagination={{
              el: ".custom-pagination-bullets-news",
              type: 'fraction',
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
            
            {details.map((item, index) => {
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
      <div className="flex   justify-between mt-4">
        <div className="flex lg:hidden   gap-3  justify-start   md:gap-8 2xl:mt-1 ">
          <button
            className={`swiper-solution-prev-news flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white `}
            aria-label="Previous slide"
          >
            <GoArrowLeft />
          </button>
          <button
            className={`swiper-solution-next-news flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white `}
            aria-label="Next slide"
          >
            <GoArrowRight />
          </button>
        </div>
        <div className="lg:hidden   w-fit h-4 my-auto flex gap-2 justify-end custom-pagination-bullets-news"></div>
      </div>
    </>
  );
}



