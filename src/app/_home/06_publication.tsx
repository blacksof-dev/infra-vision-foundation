"use client";
import { BorderGrayHeroBtn, HeroBtn } from "@/_components/atoms/buttons";
import Image from "next/image";
import type { Swiper as SwiperClass } from 'swiper/types';
import publications from "@/../public/assets/home/publications.png";
import publicationDesktop from "@/../public/assets/home/publicationDesktop.png";
import Card from "@/_components/molecules/cardTemplate";
import workshop from "@/../public/assets/home/workshop.png";
import rail from "@/../public/assets/home/rail.png";
import agriExports from "@/../public/assets/home/agriExports.png";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

export default function Publication() {
  return (
    <>
      <section className="blade-top-padding-lg blade-bottom-padding-lg ">
        <div className="w-container">
          <div>
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-pink">Featured publications</h5>
            </div>
            <div className="pt-4 pb-2 md:py-5  flex flex-col md:flex-row justify-between ">
              <div>
                <h1 className="text-black font-light">
                  Insights that illuminate, <br />{" "}
                  <span className="text-black font-medium">
                    update, and foster impact
                  </span>{" "}
                </h1>
              </div>
              <div className=" pt-5 md:py-5 lg:py-0 mt-auto">
                <HeroBtn
                  text="Explore our publications"
                  role="link"
                  borderColor="pink"
                  color="pink"
                  bgColor="white"
                  size="extralarge"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="lg:block pt-5  hidden relative">
              <Image
                src={publicationDesktop}
                alt="Featured publications"
                className="w-full h-full object-cover rounded"
              />

              <div className=" px-6 py-2 xl:py-14 absolute rounded bg-white lg:w-[23rem]  lg:h-[12rem] xl:w-[25rem]  xl:h-[18rem]  2xl:w-[27rem]  2xl:h-[22rem] top-10 right-7 ">
                <div className="flex flex-row justify-between ">
                  <div className="flex  flex-row  items-center gap-2 md:gap-3">
                    <span className="w-[7px] h-[7px] md:w-[13px] md:h-[13px] rounded-full bg-lightgray/30 "></span>
                    <p className="font-medium text-black">Research paper</p>
                  </div>
                  <div className="py-2 xl:py-5">
                    <p className="text-darkgray">November, 2024</p>
                  </div>
                </div>
                <h4 className="text-black font-medium ">
                  Study on implementation of compensatory afforestation in India
                </h4>
                <div className="pt-1 pb-6 xl:py-5 ">
                  <BorderGrayHeroBtn
                    text="Read more"
                    role="link"
                    borderColor="darkgray/40"
                    color="black"
                    bgColor="white"
                    size="small"
                    target="_blank"
                    link="https://theinfravisionfoundation.org/wp-content/uploads/2025/03/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf"
                    classes=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="hidden  lg:flex flex-row md:gap-16 pt-4 md:pt-0 lg:justify-between justify-center flex-wrap xl:flex-nowrap    lg:pt-9">
              {CardData.map((item, key) => (
                <div key={key}>
                  <Card
                    date={item.date}
                    title={item.title}
                    image={item.img}
                    link={item.link}
                    category={item.category}
                  />
                </div>
              ))}
            </div>
            <div className="lg:hidden block">
              <PublicationSlider />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const CardData = [
  {
    category: "Newsletter",
    date: "Aug  2024",
    title: "Workshop on trees outside forests",
    img: workshop,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-January-2025.pdf",
  },
  {
    category: "Research paper",
    date: "July, 2024",
    title: "The case for developing high-speed rail corridors in India",
    img: rail,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/02/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
  },
  {
    category: "Newsletter",
    date: "February, 2025",
    title: "CAIRA Roundtable on Agri Exports is a success",
    img: agriExports,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/INFRAVISION-TALK-February-2025-Newsletter.pdf",
  },
];

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function PublicationSlider() {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const handleSlideChange = (swiper:SwiperClass) => {
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
            {Publicationdata.map((item, index) => {
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
            className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white `}
            aria-label="Previous slide"
          >
            <GoArrowLeft />
          </button>
          <button
            className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white `}
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

const Publicationdata = [
  {
    category: "Research paper",
    date: "November, 2024",
    title: "Study on implementation of compensatory afforestation in India",
    img: publications,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
  },
  {
    category: "Newsletter",
    date: "Aug 2024",
    title: "Workshop on trees outside forests",
    img: workshop,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-January-2025.pdf",
  },
  {
    category: "Research paper",
    date: "July, 2024",
    title: "The case for developing high-speed rail corridors in India",
    img: rail,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/02/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
  },
  {
    category: "Newsletter",
    date: "February, 2025",
    title: "CAIRA Roundtable on Agri Exports is a success",
    img: agriExports,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/INFRAVISION-TALK-February-2025-Newsletter.pdf",
  },
];
