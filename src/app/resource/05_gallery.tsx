"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination,Autoplay } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import image1 from "@/../public/assets/resource/gallery/image1.jpg"
import image2 from "@/../public/assets/resource/gallery/image2.jpg"
import image3 from "@/../public/assets/resource/gallery/image3.jpg"
import image4 from "@/../public/assets/resource/gallery/image4.jpg"
import image5 from "@/../public/assets/resource/gallery/image5.jpg"

import mobileimage1 from "@/../public/assets/resource/gallery/mobileimage1.png"
import mobileimage2 from "@/../public/assets/resource/gallery/mobileimage2.png"
import mobileimage3 from "@/../public/assets/resource/gallery/mobileimage3.png"
import mobileimage4 from "@/../public/assets/resource/gallery/mobileimage4.png"
import mobileimage5 from "@/../public/assets/resource/gallery/mobileimage5.png"


export  const awardsData = [
  {
    img: image1,
    mobileView: mobileimage5,
    category: "InfraShakti Awards",
    date: "November, 2024",
    desc: "Sudhanshu Mani (INFRAVISIONARY AWARD), former general manager, ICF, for battling naysayers and beating all odds to create Vande Bharat Express, a high speed train made entirely in India within 18 months, a symbol of domestic engineering prowess.",
  },
  {
    img: image5,
    mobileView: mobileimage1,
    category: "InfraKatha 4",
    date: "November, 2024",
    desc: "In a captivating exchange, Sanjeev Sanyal and Vinayak Chatterjee explore the lost Saraswati River’s rich history, its symbolic importance in Indian culture, and its potential influence on modern water management and regional planning.",
  },
  {
    img: image3,
    mobileView: mobileimage4,
    category: "CAIRA",
    date: "November, 2024",
    desc: "Director, Choice Group, Thomas Jose; Secretary General, AIMLEA. RK Boyal; Director, Millets for Health, Rajeev Pandey; and Professor, JNU, and Member, Governing Council, CAIRA, Dr Seema Bathla",
  },
  {
    img: image2,
    mobileView: mobileimage2,
    category: "InfraKatha 5",
    date: "November, 2024",
    desc: "In the Latest edition of InfraKatha, Heritage restorer and Hotelier Aman Nath presents the resilience of a person having the vision to bring life to dead buildings, in an enlightening exchange of ideas with Senior Media Executive DN Mukerjea.",
  },
  {
    img: image4,
    mobileView: mobileimage3,
    category: "Awards",
    date: "November, 2024",
    desc: "Sudhanshu Mani (INFRAVISIONARY AWARD), former general manager, ICF, for battling naysayers and beating all odds to create Vande Bharat Express, a high speed train made entirely in India within 18 months, a symbol of domestic engineering prowess.",
  },
];
export default function Gallery() {
  return (
    <>
      <div className="bg-whitesmoke">
        <div className="blade-top-padding-lg  w-container">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">Gallery</h5>
          </div>
          <div className="py-2 ">
            <h1 className="text-black  font-medium">Scenes from our journey</h1>
          </div>
        </div>
        <div className="md:pt-5">
          <GallerSwiper />
        </div>
      </div>
    </>
  );
}



function GallerSwiper() {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };

  return (
    <>
      <div className="blade-bottom-padding-lg  ">
        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination,Autoplay]}
            className="!pl-[1rem] md:!pl-[4rem] 2xl:!pl-[12rem] 3xl:!pl-[14rem]"
            navigation={{
              prevEl: ".swiper-solution-prev-gallery",
              nextEl: ".swiper-solution-next-gallery",
            }}
            pagination={{
              el: ".custom-pagination-bullets-gallery",
              type: "fraction",
            }}
            grabCursor={true}
            speed={8000}
            autoplay={{
              delay:20,
              disableOnInteraction: false,
            }}
            loop
            spaceBetween={50}
            onSlideChange={handleSlideChange}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              500: { slidesPerView: 1.3, centeredSlides: false},
              768: { slidesPerView: 1.1, centeredSlides: false },
              1024: { slidesPerView: 1.3, centeredSlides: false },
              1280: { slidesPerView: 1.3, centeredSlides: false },
              1536: { slidesPerView: 1.7, centeredSlides: false },
            }}
          >
            {awardsData.map((item, index) => {
              return (
                <SwiperSlide key={index} className="!h-full ">
                  <div className="relative md:block hidden ">
                    <div className="">
                      <Image
                        src={item.img}
                        alt="Awards"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="absolute  bottom-0  rounded-[10px] p-2 xl:p-3 m-3 xl:m-6 h-[10rem] bg-white ">
                      <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
                        <span className="w-[7px] h-[7px] md:w-[12px]  md:h-[12px] rounded-full bg-darkgray/30 "></span>
                        <h5 className="border-r border-darkgray/20 pe-4">
                          {item.category}
                        </h5>
                        <p className="text-darkgray/80"> {item.date}</p>
                      </div>
                      <div className="w-full">
                        <p className="py-2 2xl:py-4">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden block">
                    <Image
                      src={item.mobileView}
                      alt={item.category}
                      className=""
                    ></Image>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex w-container  justify-between mt-5">
          <div className="flex   gap-3  justify-start   md:gap-5 2xl:mt-1 ">
            <button
              className={`swiper-solution-prev-gallery cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white ${isFirstSlide ? "opacity-40" : ""
                    }`}
              aria-label="Previous slide" 
            >
              <GoArrowLeft />
            </button>
            <button
              className={`swiper-solution-next-gallery cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white ${isLastSlide? "opacity-40" : ""
                    }`}
              aria-label="Next slide"
            >
              <GoArrowRight />
            </button>
          </div>
          <div className="lg:hidden  w-fit h-4 my-auto flex gap-2 justify-end custom-pagination-bullets-gallery"></div>
        </div>
      </div>
    </>
  );
}
