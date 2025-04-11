"use client";
import { HeroBtn } from "@/_components/atoms/buttons";
import Image from "next/image";
import publications from "@/../public/assets/home/publications.png";
import Card from "@/_components/molecules/cardTemplate";
import workshop from "@/../public/assets/home/workshop.png";
import rail from "@/../public/assets/home/rail.png";
import agriExports from "@/../public/assets/home/agriExports.png";

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
                src={publications}
                alt="Featured publications"
                className="w-full h-full object-cover"
              />

              <div className=" px-6 py-2 xl:py-14 absolute rounded bg-white lg:w-[23rem]  lg:h-[12rem] xl:w-[25rem]  xl:h-[18rem]  2xl:w-[27rem]  2xl:h-[22rem] top-10 right-7 ">
                <div className="flex flex-row justify-between ">
                  <div className="flex  flex-row  items-center gap-2 md:gap-3">
                    <span className="w-[7px] h-[7px] md:w-[13px] md:h-[13px] rounded-full bg-lightgray "></span>
                    <p className="font-medium text-black">Research paper</p>
                  </div>
                  <div className="py-2 xl:py-5">
                    <p className="text-darkgray">November, 2024</p>
                  </div>
                </div>
                <h4 className="text-black font-medium">
                  Study on implementation of compensatory afforestation in India
                </h4>
                <div className="pt-1 pb-6 xl:py-5">
                  <HeroBtn
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
    date: "Aug 15 2024",
    title: "Workshop on trees outside forests",
    img: workshop,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-January-2025.pdf",
  },
  {
    category: "Research paper",
    date: "July, 2024",
    title: "The case for developing high-speed rail corridors in India",
    img: rail,
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
  },
  {
    category: "Newsletter",
    date: "February, 2025",
    title: "CAIRA Roundtable on Agri Exports is a success",
    img: agriExports,
    link: "https://www.moneycontrol.com/news/business/economy/budget-signals-shift-in-infra-strategy-as-govt-pushes-states-private-sector-to-pitch-in-12777120.html",
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

  const handleSlideChange = (swiper: any) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };
  return (
    <>
      <div className="pt-5 md:pt-5 ">
        <div className="">
          <Swiper
            modules={[Navigation, Pagination]}
            className=""
            navigation={{
              prevEl: ".swiper-solution-prev-btn",
              nextEl: ".swiper-solution-next-btn",
            }}
            spaceBetween={20}
            onSlideChange={handleSlideChange}
            slidesPerView={1.1}
            centeredSlides={true}
            breakpoints={{
              500: { slidesPerView: 1.9, centeredSlides: false },
              768: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 2.9, centeredSlides: false },
              1280: { slidesPerView: 3.4, centeredSlides: false },
              1536: { slidesPerView: 4.3, centeredSlides: false },
            }}
          >
            {Publicationdata.map((item: any, index: number) => {
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
      <div className="flex lg:hidden flex-wrap gap-5 justify-center mt-4 lg:justify-end md:gap-8 2xl:mt-1 w-container">
        <button
          className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white ${
            isFirstSlide ? "opacity-40" : ""
          }`}
          aria-label="Previous slide"
        >
          <FaAngleLeft />
        </button>
        <button
          className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white ${
            isLastSlide ? "!opacity-40" : ""
          }`}
          aria-label="Next slide"
        >
          <FaAngleRight />
        </button>
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
    date: "Aug 15 2024",
    title: "Workshop on trees outside forests",
    img: workshop,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-January-2025.pdf",
  },
  {
    category: "Research paper",
    date: "July, 2024",
    title: "The case for developing high-speed rail corridors in India",
    img: rail,
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
  },
  {
    category: "Newsletter",
    date: "February, 2025",
    title: "CAIRA Roundtable on Agri Exports is a success",
    img: agriExports,
    link: "https://www.moneycontrol.com/news/business/economy/budget-signals-shift-in-infra-strategy-as-govt-pushes-states-private-sector-to-pitch-in-12777120.html",
  },
];
