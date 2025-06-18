"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "@/_components/molecules/infiniteCarousel.css";
import cii from "@/../public/assets/home/association/cii.png";
import iim from "@/../public/assets/home/association/iim.png";
import iima from "@/../public/assets/home/association/iima.png";
import iimb from "@/../public/assets/home/association/iimb.png";
import iitDelhi from "@/../public/assets/home/association/iitDelhi.png";
import spjimr from "@/../public/assets/home/association/spjimr.png";
import teri from "@/../public/assets/home/association/teri.png";
import usaid from "@/../public/assets/home/association/usaid.png";
import worldBank from "@/../public/assets/home/association/worldBank.png";

export default function Association() {
  return (
    <>
      <div className="blade-bottom-padding-lg blade-top-padding-lg ">
        <div className=" w-container">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">Our associations</h5>
          </div>
          <div>
            <h1 className="text-black pt-2">

              <span className="font-medium text-black">
                The synergy of collaboration
              </span>
            </h1>
          </div>
        </div>
        <div className="blade-top-padding-sm">
          <Swiper
            className=""
            modules={[Autoplay]}
            speed={4000}
            autoplay={{
              delay: 5,
              disableOnInteraction: false,
            }}
            noSwiping={true}
            loop
            grabCursor
            slidesPerView="auto"
            spaceBetween={20}
            centerInsufficientSlides={true}
            breakpoints={{
              456: {
                slidesPerView: "auto",
                spaceBetween: 60,
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 30,
              },
              960: {
                slidesPerView: "auto",
                spaceBetween: 50,
              },
              1020: {
                slidesPerView: "auto",
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: "auto",
                spaceBetween: 40,
              },
              1400: {
                slidesPerView: "auto",
                spaceBetween: 50,
              },
            }}
          >
            {data.map((obj, index) => (
              <SwiperSlide key={index} className="!w-auto ">
                <div className="flex items-center w-[10rem] h-[4rem] md:w-[8rem] md:h-[3rem] xl:w-[15rem] xl:h-[6rem] ">
                  <Image
                    src={obj.logo}
                    alt={obj.id}
                    fill
                    className="object-contain"
                    unoptimized={true}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

const data = [
  {
    id: "1",
    logo: cii.src,
  },
  {
    id: "2",
    logo: iim.src,
  },
  {
    id: "3",
    logo: iima.src,
  },
  {
    id: "4",
    logo: iitDelhi.src,
  },
  {
    id: "5",
    logo: spjimr.src,
  },
  {
    id: "6",
    logo: teri.src,
  },
  {
    id: "7",
    logo: usaid.src,
  },
  {
    id: "8",
    logo: worldBank.src,
  },
  {
    id: "9",
    logo: iimb.src,
  },
];
