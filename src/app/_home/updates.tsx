"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import taxation from "@/../public/assets/home/updates/afforestation.png";
import infraKathaEvent from "@/../public/assets/home/updates/infraKathaEvent.png";
import afforestation from "@/../public/assets/home/updates/afforestation.png";
import infraKatha from "@/../public/assets/home/updates/infraKatha.png";
import article from "@/../public/assets/home/updates/article.png";
import agriWarehousing from "@/../public/assets/home/updates/agriWarehousing.png";
import Link from "next/link";

export default function Updates() {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSlideChange = (swiper: SwiperClass) => {
    // setIsFirstSlide(swiper.isBeginning);
    // setIsLastSlide(swiper.isEnd);
  };

  return (
    <section>
      <div className="xl:flex flex-row gap-8 ">
        {/* Left Column */}
        <div className="border-r border-white/50 xl:block hidden">
          <div className="">
            <h4 className="text-white me-4 text-nowrap ">Latest updates</h4>
            <div className="flex gap-5 py-4 justify-center  lg:justify-start md:gap-4 ">
              <button
                className={`swiper-solution-prev-btn-hero cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink
                }`}
              >
                <GoArrowLeft />
              </button>
              <button
                className={`swiper-solution-next-btn-hero cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink
                }`}
              >
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:max-w-[80rem] xlg:max-w-[100rem]">
          <Swiper
            className="!overflow-visible xl:!overflow-hidden"
            modules={[Navigation, Autoplay, Pagination]}
            navigation={{
              prevEl: ".swiper-solution-prev-btn-hero",
              nextEl: ".swiper-solution-next-btn-hero",
            }}
            pagination={{
              el: ".custom-pagination-bullets-banner",
              // type: "fraction",
            }}
            loop
            grabCursor={true}
            speed={500}
            centeredSlides={false}
            spaceBetween={10}
            slidesPerView={1.1}
            breakpoints={{
              200: {
                slidesPerView: 1.15,
                spaceBetween: 10
              },
              435: {
                slidesPerView: 1.2,
                spaceBetween: 10
              },

              640: {
                slidesPerView: 1.8,
                spaceBetween: 20

              },
              768: {
                slidesPerView: 1.9,
                spaceBetween: 20

              },
              1024: { slidesPerView: 2 },
              1120: { slidesPerView: 2.3 },
              1280: { slidesPerView: 2.1 },
              1440: { slidesPerView: 2.3 },
              1536: { slidesPerView: 2.3 },
            }}
            onSlideChange={handleSlideChange}
          >
            {EventsDetails.map((ele, index) => (
              <SwiperSlide key={index} className="  group ">
                <Link href={ele.link} target="_blank">
                  <div className="flex flex-row gap-4 bg-[#0000005e] backdrop-blur-[10px] shadow-blur rounded-lg p-2 md:p-4  h-[8rem] sm:h-[9rem]  lg:h-[10rem] xl:h-[13rem] xlg:h-[16rem] 2xl:h-[18rem] group-hover:bg-white transition-all duration-500 ease-linear">
                    <div className="w-[6rem]   h-full md:w-[14rem] lg:w-[13rem]  xl:w-[20rem] xlg:w-[30rem]  relative ">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        fill
                        className="object-cover object-left rounded"
                      />
                    </div>
                    <div className="my-auto w-[60%] flex flex-col h-full  ">
                      <div className="flex items-center gap-3">
                        <span className="w-[10px] h-[10px] rounded-full bg-white group-hover:bg-pink" />
                        <p className="font-light text-sm md:text-lg text-white group-hover:text-black">
                          {ele.category}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <div className="py-2 ">
                          <h5 className="text-white font-medium text-base xl:text-xl lg:font-normal group-hover:text-black  line-clamp-2 xl:line-clamp-4   xl:whitespace-normal">
                            {ele.title}
                          </h5>
                        </div>

                        <div className="flex gap-2 lg:gap-4 items-center justify-center group cursor-pointer  w-fit">
                          <h5 className="text-sm sm:text-lg text-white group-hover:text-black">
                            {ele.btnTitle}
                          </h5>

                          <button
                            className={`rounded-sm p-1 cursor-pointer  relative overflow-hidden md:p-2 border-2 bg-white border-white group-hover:border-transparent   w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 group-hover:bg-pink `}
                          >
                            <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
                            <GoArrowRight
                              className={`   text-pink  group-hover:text-white text-2xl z-[2]`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
    category: "Research Report ",
    title: "Analysing the effectiveness of compensatory afforestation in India",
    btnTitle: "Read more",
    link: "/assets/pdf/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
  },
  // {
  //   image: infraKathaEvent,
  //   category: "Upcoming event",
  //   title:
  //     "InfraKatha #8 with Economist Montek Singh Ahluwalia, India Habitat Centre, New Delhi,7 PM onwards",
  //   btnTitle: "Register now",
  //   link: "https://www.youtube.com/watch?v=o6nb3IejARc&t=13s&ab_channel=TheInfravisionFoundation",
  // },
  // {
  //   image: afforestation,
  //   category: "Research paper",
  //   title: "Study on Implementation of Compensatory Afforestation in India",
  //   btnTitle: "Read more",
  //   link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
  // },
  {
    image: infraKatha,
    category: "InfraKatha #8",
    title:
      "Featuring Mr. Montek Singh Ahluwalia, Former Deputy Chairman, the Planning Commission",
    btnTitle: "Watch now",
    link: "https://www.youtube.com/watch?v=ukODX0llH7o&t=1139s",
  },
  {
    image: article,
    category: "Latest video",
    title: "Why India needs a national plan for building new cities",
    btnTitle: "Watch now",
    link: "https://www.youtube.com/watch?v=g5aA3Q3af1g&ab_channel=TheInfravisionFoundation",
  },
  {
    image: agriWarehousing,
    category: "Blog",
    title: "Agri-Warehousing: A problem of capacity",
    btnTitle: "Read more",
    link: "https://theinfravisionfoundation.org/2023/11/25/poor-regulatory-capacity-of-the-warehousing-and-development-regulatory-authority-impacts-warehouse-based-sales-of-agri-commodities-and-issue-of-e-negotiable-warehouse-receipts/",

  },
];
