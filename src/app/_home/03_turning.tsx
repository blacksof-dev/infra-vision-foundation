"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HeroBtn } from "@/_components/atoms/buttons";
import villagers from "@/../public/assets/home/villagers.png";
import portraitMan from "@/../public/assets/home/portraitMan.png";
import chineseCity from "@/../public/assets/home/chineseCity.png";
import Image from "next/image";
import halfcirclesvg from '@/../public/assets/home/halfcirclesvg.svg'
import circlesvg1 from '@/../public/assets/home/circlesvg1.svg'



export default function Turning() {
  return (
    <>
      <section className="bg-pink relative d">
      <div className="absolute top-0 left-0 opacity-30 hidden xl:block"><Image src={halfcirclesvg} alt="Circle Image" /></div>
        <div className="absolute 2xl:top-7 top-3 left-0 2xl:left-15 opacity-30 hidden xl:block">
          <Image src={circlesvg1} alt="Circle Image" />
        </div>
        <div className="blade-top-padding-lg blade-bottom-padding-lg w-container  ">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white "></span>
            <h5 className="font-medium text-white">What we do</h5>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-28">
            <div className=" w-full  lg:w-[40%] ">
              <h1 className="font-light text-white py-4 md:py-8">
                Turning policy ideas into{" "}
                <span className="text-white font-medium">
                  instruments of transformation
                </span>
              </h1>
              <div>
                <h4 className="text-white font-light">
                  <span className="text-white font-medium">
                    The Infravision Foundation
                  </span>{" "}
                  is an independent, non-partisan, and not-for-profit think tank
                  committed to driving India’s economic progress with
                  infrastructure at the locus.
                </h4>
              </div>
              <div>
                <h6 className="text-white tracking-[1%] font-light pt-3 md:pt-4">
                  Rooted in the expertise of infrastructure stalwarts and
                  thought leaders, the foundation advances nation-building by
                  exerting influence on infrastructural policymaking. It
                  combines credible research expertise, insightful
                  recommendations, and strategic advocacy to transform policy
                  ideas into lasting impact across diverse segments.
                </h6>
                <h6 className="text-white/80 font-light pt-3 md:pt-4 tracking-[1%]">
                  Founded in 2022 by Mr. Vinayak Chatterjee and Mrs. Rumjhum
                  Chatterjee, two reputable names in infrastructure, The
                  Infravision Foundation stands as a catalyst for meaningful
                  change.
                </h6>
              </div>
              <div className=" pt-5 md:py-5 lg:py-6 mt-auto">
                <HeroBtn
                  text="Know more"
                  role="link"
                  borderColor="white"
                  color="white"
                  bgColor="pink"
                  size="extralarge"
                  aarowColor="white"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-[50%] ">
              <div className=" md:pt-5 ">
                <div className="w-full">
                  <Swiper
                    className="!px-5"
                    modules={[Autoplay]}
                    speed={6000}
                    autoplay={{
                      delay: 20,
                      disableOnInteraction: false,
                    }}
                    noSwiping={true}
                    loop
                    grabCursor
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                      },

                      480: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                      },
                      768: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      960: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      1280: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                      },
                      1536: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                      },
                    }}
                  >
                    {data.map((item, index) => {
                      return (
                        <SwiperSlide key={index} className="!h-full ">
                          <div className=" ">
                            <Image
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>

              <div className="border-l border-r lg:mt-16   border-white/30 hidden lg:block">
                <div className="mx-5">
                  <h3 className="text-white font-medium">
                    Sectors of operation
                  </h3>

                  <ul className="grid grid-cols-2 2xl:grid-cols-3 gap-16  2xl:gap-x-4 gap-y-2 py-3 list-disc list-inside text-white text-lg w-fit">
                    <li>Education</li>
                    <li>Transportation</li>
                    <li>Water and Sanitation</li>
                    <li>Energy</li>
                    <li>Urban Planning</li>
                    <li>Rural and Agri Infra</li>
                    <li>Health Infra</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:hidden block">
              <div className="mx-5">
                <h3 className="text-white font-medium">Sectors of operation</h3>

                <ul className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-18 md:gap-x-4 gap-y-2 py-3 list-disc list-inside text-white text-lg w-fit">
                  <li>Education</li>
                  <li>Transportation</li>
                  <li>Water and Sanitation</li>
                  <li>Energy</li>
                  <li>Urban Planning</li>
                  <li>Rural and Agri Infra</li>
                  <li>Health Infra</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const data = [
  {
    image: villagers,
    title: "villagers",
  },
  {
    image: portraitMan,
    title: "portraitMan",
  },
  {
    image: chineseCity,
    title: "chineseCity",
  },
];
