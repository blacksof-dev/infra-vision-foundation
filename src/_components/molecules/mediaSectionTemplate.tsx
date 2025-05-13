"use client";
import {
  BorderGrayHeroBtn,
  HeroBtn,
  UnderlineWithHover,
} from "@/_components/atoms/buttons";
import Image, { StaticImageData } from "next/image";
import type { Swiper as SwiperClass } from "swiper/types";
import Card from "@/_components/molecules/cardTemplate";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

interface CardItem {
  category: string;
  date: string;
  title: string;
  img: string;
  link: string;
}

interface MediaSectionProps {
  title: string;
  desc: string;
  ctatitle?: string;
  img1: StaticImageData;
  blog1title: string;
  blog1date: string;
  blog1desc: string;
  blog1link: string;
  cards?: CardItem[];
  data?: CardItem[];
}

export default function MediaSection({
  title,
  desc,
  ctatitle,
  img1,
  blog1title,
  blog1date,
  blog1desc,
  blog1link,
  cards,
  data,
}: MediaSectionProps) {
  return (
    <>
      <section className="blade-top-padding-lg blade-bottom-padding-lg ">
        <div className="w-container">
          <div>
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-pink">{title}</h5>
            </div>
            <div className="pt-4 pb-2 md:py-5  flex flex-col md:flex-row justify-between ">
              <div>
                <h1
                  className="text-black font-light"
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              </div>

              {ctatitle && (
                <div className=" pt-5 md:py-5 lg:py-0 mt-auto">
                  <HeroBtn
                    text={ctatitle}
                    role="link"
                    borderColor="pink"
                    color="pink"
                    bgColor="white"
                    size="extralarge"
                    link="/publication"
                    target="_self"
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="lg:block pt-5  hidden relative">
              <Image
                src={img1}
                alt="Featured publications"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 translate-x-[-10%] bg-white rounded px-6 py-2 xl:py-10 lg:w-[23rem] xl:w-[25rem] 2xl:w-[27rem]">
                <div className="flex flex-row justify-between ">
                  <div className="flex  flex-row  items-center gap-2 md:gap-3">
                    <span className="w-[7px] h-[7px] md:w-[13px] md:h-[13px]  rounded-full bg-lightgray/30 "></span>
                    <p className="font-medium text-black">{blog1title}</p>
                  </div>
                  <div className="py-2 xl:py-5">
                    <p className="text-darkgray">{blog1date}</p>
                  </div>
                </div>
                <h4 className="text-black font-medium ">{blog1desc}</h4>
                <div className="pt-1 pb-6 xl:py-5 ">
                  <BorderGrayHeroBtn
                    text="Read more"
                    role="link"
                    borderColor="darkgray/40"
                    color="black"
                    bgColor="white"
                    size="base"
                    target="_blank"
                    link={blog1link}
                    classes=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 pt-14">
              {cards?.map((item, key) => (
                <>
                  <div key={key} className="">
                    <Card
                      date={item.date}
                      title={item.title}
                      image={item.img}
                      link={item.link}
                      category={item.category}
                    />
                  </div>
                </>
              ))}
            </div>

            <div className="lg:hidden block">
              <PublicationSlider data={data} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";

interface PublicationSliderProps {
  data?: CardItem[];
}

function PublicationSlider({ data }: PublicationSliderProps) {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };

  return (
    <>
      <div className="pt-2 md:pt-5 ">
        <div className="">
          <Swiper
            modules={[Navigation, Pagination]}
            className=""
            navigation={{
              prevEl: ".swiper-solution-prev-btn",
              nextEl: ".swiper-solution-next-btn",
            }}
            pagination={{
              el: ".custom-pagination-bullets-publication",
              type: "fraction",
            }}
            spaceBetween={30}
            onSlideChange={handleSlideChange}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              768: { slidesPerView: 1.5, centeredSlides: false },
              1024: { slidesPerView: 2.9, centeredSlides: false },
              1280: { slidesPerView: 3.4, centeredSlides: false },
              1536: { slidesPerView: 4.3, centeredSlides: false },
            }}
          >
            {data?.map((item: CardItem, index: number) => {
              return (
                <SwiperSlide key={index} className=" !h-full ">
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
            className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white ${
              isFirstSlide ? "opacity-40" : ""
            }`}
            aria-label="Previous slide"
          >
            <GoArrowLeft />
          </button>
          <button
            className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white ${
              isLastSlide ? "opacity-40" : ""
            }`}
            aria-label="Next slide"
          >
            <GoArrowRight />
          </button>
        </div>
        <div className="lg:hidden  w-fit h-4 my-auto flex gap-2 justify-end custom-pagination-bullets-publication"></div>
      </div>
    </>
  );
}
