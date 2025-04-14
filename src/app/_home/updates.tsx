"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HeroBtn } from "@/_components/atoms/buttons";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import taxation from "@/../public/assets/home/updates/taxation.png";
import infraKathaEvent from "@/../public/assets/home/updates/infraKathaEvent.png";
import afforestation from "@/../public/assets/home/updates/afforestation.png";
import infraKatha from "@/../public/assets/home/updates/infraKatha.png";
import agriWarehousing from "@/../public/assets/home/updates/agriWarehousing.png";

export default function Updates() {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSlideChange = (swiper: SwiperClass) => {
    // setIsFirstSlide(swiper.isBeginning);
    // setIsLastSlide(swiper.isEnd);
  };

  return (
    <section>
      <div className="flex flex-row gap-8">
        {/* Left Column */}
        <div className="border-r border-white">
          <div className="lg:ms-24  xl:ms-30 hidden xl:block">
            <h4 className="text-white font-medium text-nowrap px-5">
              Latest Updates
            </h4>
            <div className="flex gap-5 pt-5 justify-center mt-4 lg:justify-start md:gap-4 2xl:mt-1 w-container">
              <button
                className={`swiper-solution-prev-btn-hero cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink
                }`}
                // aria-label="Previous slide"
              >
                <GoArrowLeft />
              </button>
              <button
                className={`swiper-solution-next-btn-hero cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink
                }`}
                // aria-label="Next slide"
              >
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="overflow-x-hidden">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".swiper-solution-prev-btn-hero",
              nextEl: ".swiper-solution-next-btn-hero",
            }}
            // pagination={{ clickable: true }}
            loop
            // grabCursor
            // slideToClickedSlide
            speed={500} 
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={true}

            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            //   reverseDirection: true,
            // }}
            breakpoints={{
              500: { slidesPerView: 1.5,  },
              768: { slidesPerView: 2.2,  },
              1024: { slidesPerView: 2.9,  },
              1280: { slidesPerView: 3.5,  },
              1536: { slidesPerView: 4.23,  },
            }}
            onSlideChange={handleSlideChange}
          >
            {EventsDetails.map((ele, index) => (
              <SwiperSlide key={index} className="!w-fit group">
                <div className="flex flex-row gap-4 bg-[#0000005e]  backdrop-blur-[10px] shadow-blur rounded-lg p-2 md:p-4 w-[25rem]  md:w-[28rem]    xl:w-[39rem] xl:h-[14rem] group-hover:bg-white">
                  <div className="w-[9rem]  h-[8rem] md:w-[14rem] md:h-[9rem]   xl:w-[22rem] xl:h-[12rem] relative ">
                    <Image
                      src={ele.image}
                      alt={ele.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="my-auto w-[60%]">
                    <div className="flex items-center gap-3">
                      <span className="w-[10px] h-[10px] rounded-full bg-white group-hover:bg-pink" />
                      <p className="font-light text-white group-hover:text-black">{ele.category}</p>
                    </div>
                    <div className="py-2">
                      <h5 className="text-white group-hover:text-black font-medium truncate xl:overflow-visible xl:whitespace-normal">
                        {ele.title}
                      </h5>
                    </div>
                    {/* <HeroBtn
                      text={ele.btnTitle}
                      role="link"
                      borderColor="white"
                      aarowColor="pink"
                      color="white"
                      size="small"
                      bgColor="white"
                      
                    /> */}
                     <div className="flex gap-2 lg:gap-4 items-center justify-center group  w-fit">
                <h5 className="smallText text-white group-hover:text-black">{ele.btnTitle}</h5>
                <button
                  className={`rounded-sm p-1 md:p-2 border-2 bg-white border-white group-hover:border-transparent   w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 group-hover:bg-pink `}
                >
                  <GoArrowRight className={`   text-pink  group-hover:text-white group-hover:border-none text-2xl`}/>
                </button>
            </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

const EventsDetails = [
  {
    image: taxation,
    category: "News & media",
    title: "Group taxation regime for infrastructure",
    btnTitle: "Read more",
  },
  {
    image: infraKathaEvent,
    category: "Upcoming event",
    title: "InfraKatha #8, with Economist, Montek Singh Ahluwalia, IHC, 7 PM",
    btnTitle: "Register now",
  },
  {
    image: afforestation,
    category: "Research paper",
    title: "Study on Implementation of Compensatory Afforestation in India",
    btnTitle: "Read more",
  },
  {
    image: infraKatha,
    category: "InfraKatha",
    title:
      "InfraKatha: Can Public Private Partnerships be Revitalised by Montek Singh Ahluwalia",
    btnTitle: "Watch now",
  },
  {
    image: agriWarehousing,
    category: "Blog",
    title: "Agri-Warehousing: A problem of capacity",
    btnTitle: "Read more",
  },
];
