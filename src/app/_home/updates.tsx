"use client";
import {  useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HeroBtn } from "@/_components/atoms/buttons";
import { Navigation } from "swiper/modules";


import taxation from "@/../public/assets/home/updates/taxation.png";
import infraKathaEvent from "@/../public/assets/home/updates/infraKathaEvent.png";
import afforestation from "@/../public/assets/home/updates/afforestation.png";
import infraKatha from "@/../public/assets/home/updates/infraKatha.png";
import agriWarehousing from "@/../public/assets/home/updates/agriWarehousing.png";


export default function Updates() {

  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSlideChange = (swiper: any) => {
    setIsFirstSlide(swiper.isBeginning);
    setIsLastSlide(swiper.isEnd);
  };



  return (
    <section>
      <div className="flex flex-row gap-8">
        {/* Left Column */}
        <div className="border-r border-white">
          <div className="ms-30">
            <h4 className="text-white font-medium text-nowrap px-5">
              Latest Updates
            </h4>
            <div className="flex gap-5 pt-5 justify-center mt-4 lg:justify-start md:gap-4 2xl:mt-1 w-container">
              <button
              
                className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                    isFirstSlide ? "opacity-40" : ""
                  }`}
                aria-label="Previous slide"
              >
                <GoArrowLeft />
              </button>
              <button
            
                className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                    isLastSlide ? "opacity-40" : ""
                  }`}
                aria-label="Next slide"
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
            loop
            onSlideChange={handleSlideChange}
            grabCursor={false}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={true}
            breakpoints={{
              480: {
                slidesPerView: "auto",
                spaceBetween: 15,
                centeredSlides: true,
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 30,
                centeredSlides: false,
              },
              960: {
                slidesPerView: "auto",
                spaceBetween: 20,
                centeredSlides: false,
              },
              1536: {
                slidesPerView: "auto",
                spaceBetween: 40,
                centeredSlides: false,
              },
            }}
          >
            {EventsDetails.map((ele, index) => (
              <SwiperSlide key={index} className="!w-fit group">
                <div className="flex flex-row gap-4 bg-blurGradient backdrop-blur-[13px] shadow-blur rounded-lg p-4 w-[45rem] h-[14rem] ">
                  <div className="w-[22rem] h-[12rem] relative ">
                    <Image
                      src={ele.image}
                      alt={ele.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="my-auto w-[60%]">
                    <div className="flex items-center gap-3">
                      <span className="w-[10px] h-[10px] rounded-full bg-white" />
                      <p className="font-light text-white">{ele.category}</p>
                    </div>
                    <div className="py-2">
                      <h5 className="text-white font-medium">{ele.title}</h5>
                    </div>
                    <HeroBtn
                      text={ele.btnTitle}
                      role="link"
                      borderColor="white"
                      aarowColor="pink"
                      color="white"
                      size="small"
                      bgColor="white"
                    />
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
