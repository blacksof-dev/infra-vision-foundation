"use client";

import { useState, useEffect, useMemo } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import linkedinSvg from "@/../public/assets/globals/linkedinSvg.svg";
import Kiran from "@/../public/assets/home/trustees/Kiran.jpg";
import Rumjhum from "@/../public/assets/home/trustees/Rumjhum.jpg";

import Arun from "@/../public/assets/home/advisory/Arun.jpg";
import ArunNanda from "@/../public/assets/home/advisory/ArunNanda.jpg";
import AshishDhawan from "@/../public/assets/home/advisory/AshishDhawan.jpg";
import CyrilShroff from "@/../public/assets/home/advisory/CyrilShroff.png";
import DKSen from "@/../public/assets/home/advisory/DKSen.jpg";
import JanmejayaKSinha from "@/../public/assets/home/advisory/JanmejayaKSinha.jpg";
import GeetanjaliKirloskar from "@/../public/assets/home/advisory/GeetanjaliKirloskar.jpg";
import HemendraMKothari from "@/../public/assets/home/advisory/HemendraMKothari.jpg";
import jagan from "@/../public/assets/home/advisory/jagan.jpg";
import khurshed from "@/../public/assets/home/advisory/khurshed.jpg";
import NarotamSekhsaria from "@/../public/assets/home/advisory/NarotamSekhsaria.jpg";
import ProfessorGRaghuram from "@/../public/assets/home/advisory/ProfessorGRaghuram.jpg";
import NasserMunjee from "@/../public/assets/home/advisory/NasserMunjee.jpg";
import RajnishKumar from "@/../public/assets/home/advisory/RajnishKumar.jpg";
import SameerGupta from "@/../public/assets/home/advisory/SameerGupta.jpg";
import SNSubrahmanyan from "@/../public/assets/home/advisory/SNSubrahmanyan.jpg";
import SunilMathur from "@/../public/assets/home/advisory/SunilMathur.jpg";
import DilipCherian from "@/../public/assets/home/advisory/DilipCherian.jpg";
import ManojKSingh from "@/../public/assets/home/advisory/ManojKSingh.jpg";

import AkhileshTilotia from "@/../public/assets/home/fellows/AkhileshTilotia.jpg";
import rajajiMeshram from "@/../public/assets/home/fellows/rajajiMeshram.png";
import rajivRanjanMishra from "@/../public/assets/home/fellows/rajivRanjanMishra.jpg";
import rasikaAthawale from "@/../public/assets/home/fellows/rasikaAthawale.jpg";
import SoumyaKantiGhosh from "@/../public/assets/home/fellows/SoumyaKantiGhosh.jpg";
import supratimSarkar from "@/../public/assets/home/fellows/supratimSarkar.jpg";

import MutumChaobisana from "@/../public/assets/home/team/MutumChaobisana.png";
import KavereeBamzai from "@/../public/assets/home/team/KavereeBamzai.png";
import LawrenceCardoza from "@/../public/assets/home/team/LawrenceCardoza.jpg";
import PriyankaBains from "@/../public/assets/home/team/PriyankaBains.jpg";
import RumjhumChatterjee from "@/../public/assets/home/team/RumjhumChatterjee.jpg";
import Vinayak from "@/../public/assets/home/team/Vinayak.jpg";
import VrindaSingh from "@/../public/assets/home/team/VrindaSingh.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Infravisionaries() {
  const [data, setdata] = useState("trustee");
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };

  const trustee = [
    {
      image: Kiran,
      title: "Kiran Karnik",
      desig: "Trustee",
    },
    {
      image: Rumjhum,
      title: "Rumjhum Chatterjee",
      desig: "Co-Founder & Managing Trustee",
    },
    {
      image: Vinayak,
      title: "Vinayak Chatterjee",
      desig: "Founder & Managing Trustee",
    },
  ];

  const advisory = [
    {
      image: Arun,
      title: "Arun Maira",
      desig: "Member,Council of Advisors",
    },
    {
      image: ArunNanda,
      title: "Arun Nanda",
      desig: "Member,Council of Advisors",
    },
    {
      image: AshishDhawan,
      title: "Ashish Dhawan",
      desig: "Member,Council of Advisors",
    },
    {
      image: CyrilShroff,
      title: "Cyril Shroff",
      desig: "Member,Council of Advisors",
    },
    {
      image: DKSen,
      title: "D. K. Sen",
      desig: "Member,Council of Advisors",
    },
    {
      image: JanmejayaKSinha,
      title: "Janmejaya K. Sinha",
      desig: "Member,Council of Advisors",
    },
    {
      image: GeetanjaliKirloskar,
      title: "Geetanjali Kirloskar",
      desig: "Member,Council of Advisors",
    },
    {
      image: HemendraMKothari,
      title: "Hemendra M. Kothari",
      desig: "Member,Council of Advisors",
    },
    {
      image: jagan,
      title: "Jagan Shah",
      desig: "Member,Council of Advisors",
    },
    {
      image: khurshed,
      title: "Khurshed",
      desig: "Member,Council of Advisors",
    },
    {
      image: NarotamSekhsaria,
      title: "Narotam Sekhsaria",
      desig: "Member,Council of Advisors",
    },
    {
      image: ProfessorGRaghuram,
      title: "Professor G. Raghuram",
      desig: "Member,Council of Advisors",
    },
    {
      image: NasserMunjee,
      title: "Nasser Munjee",
      desig: "Member,Council of Advisors",
    },
    {
      image: RajnishKumar,
      title: "Rajnish Kumar",
      desig: "Member,Council of Advisors",
    },
    {
      image: SameerGupta,
      title: "Sameer Gupta",
      desig: "Member,Council of Advisors",
    },
    {
      image: SNSubrahmanyan,
      title: "S. N. Subrahmanyan",
      desig: "Member,Council of Advisors",
    },
    {
      image: SunilMathur,
      title: "Sunil Mathur",
      desig: "Member,Council of Advisors",
    },
    {
      image: DilipCherian,
      title: "Dilip Cherian",
      desig: "Member,Council of Advisors",
    },
    {
      image: ManojKSingh,
      title: "Manoj K. Singh",
      desig: "Member,Council of Advisors",
    },
  ];

  const fellow = [
    {
      image: AkhileshTilotia,
      title: "Akhilesh Tilotia",
      desig: "Distinguished Fellow (Public Policy)",
    },
    {
      image: rajajiMeshram,
      title: "Rajaji Meshram",
      desig: "Distinguished Fellow(Transport & Logistics)",
    },
    {
      image: rajivRanjanMishra,
      title: "Rajiv Ranjan Mishra",
      desig: "Distinguished Fellow (Water Conservation)",
    },
    {
      image: rasikaAthawale,
      title: "Rasika Athawale",
      desig: "Distinguished Fellow (Power)",
    },
    {
      image: SoumyaKantiGhosh,
      title: "Soumya Kanti Ghosh",
      desig: "Distinguished Fellow (Economic Policy)",
    },
    {
      image: supratimSarkar,
      title: "Supratim Sarkar",
      desig: "Distinguished Fellow (Financial Services)",
    },
  ];

  const team = [
    {
      image: MutumChaobisana,
      title: "Mutum Chaobisana",
      desig: "DHead-Programmes",
    },
    {
      image: KavereeBamzai,
      title: "Kaveree Bamzai",
      desig: "Head-Advocacy",
    },
    {
      image: LawrenceCardoza,
      title: "Lawrence Cardoza",
      desig: "Research Associate",
    },
    {
      image: PriyankaBains,
      title: "Priyanka Bains",
      desig: "Research Associate",
    },
    {
      image: RumjhumChatterjee,
      title: "Rumjhum Chatterjee",
      desig: "Co-Founder & Managing Trustee",
    },
    {
      image: Vinayak,
      title: "Vinayak Chatterjee",
      desig: "Founder & Managing Trustee",
    },
    {
      image: VrindaSingh,
      title: "Vrinda Singh",
      desig: "Research Associate",
    },
    {
      image: jagan,
      title: "Jagan Shah",
      desig: "CEO",
    },
  ];

  useEffect(() => {});
  const cardData = useMemo(() => {
    switch (data) {
      case "trustee":
        return trustee;
      case "advisory":
        return advisory;
      case "fellow":
        return fellow;
      case "team":
        return team;
      default:
        return [];
    }
  }, [data, trustee, advisory, fellow, team]);

  return (
    <>
      <section className="bg-pink">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div>
            <h1 className="text-white font-medium">The Infravisionaries</h1>
            <div className="w-full md:w-[45%]">
              <h6 className="text-white font-extralight tracking-[1%] py-4">
                The Infravision Foundation is a confluence of seasoned leaders
                from across the infrastructure domain. With exceptional
                intellect, global experience, and shared purpose, this
                consortium propels India’s infrastructure and economic growth.
              </h6>
            </div>
          </div>

          <div className="hidden md:flex flex-row gap-20 blade-top-padding-sm overflow-x-hidden">
            <div className=" border-r-1 pe-20 border-lightgray/40  w-fit">
              <div className="py-4">
                <button
                  className="text-white text-md text-nowrap lg:text-xl relative font-medium"
                  onClick={() => setdata("trustee")}
                >
                  Trustee
                  <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
                </button>
              </div>
              <div className="py-4">
                <button
                  className="text-white text-md  text-nowrap lg:text-xl relative font-medium"
                  onClick={() => setdata("advisory")}
                >
                  Advisory Council
                  <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
                </button>
              </div>
              <div className="py-4">
                <button
                  className="text-white text-md text-nowrap lg:text-xl relative font-medium"
                  onClick={() => setdata("fellow")}
                >
                  Distinguished Fellows
                  <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
                </button>
              </div>
              <div className="py-4">
                <button
                  className="text-white text-md lg:text-xl relative font-medium text-nowrap"
                  onClick={() => setdata("team")}
                >
                  Team
                  <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
                </button>
              </div>
            </div>

            <div>
              <div className="w-full  overflow-hidden">
                <Swiper
                  modules={[Navigation, Pagination]}
                  speed={6000}
                  autoplay={{
                    delay: 20,
                    disableOnInteraction: false,
                  }}
                  noSwiping={true}
                  loop
                  grabCursor
                  spaceBetween={20}
                  onSwiper={(swiper) => {
                    setTimeout(() => {
                      swiper.params.navigation = {
                        prevEl: ".swiper-solution-prev-btn",
                        nextEl: ".swiper-solution-next-btn",
                      };
                      swiper.navigation.destroy(); // clean before re-init
                      swiper.navigation.init();
                      swiper.navigation.update();
                    });
                  }}
                  onSlideChange={handleSlideChange}
                  slidesPerView={cardData.length}
                >
                  {cardData.map((ele, index) => (
                    <SwiperSlide key={index} className="!w-auto">
                      {" "}
                      <div className="flex realtive flex-col w-[19rem] h-[19rem] ">
                        <Image
                          src={ele.image}
                          alt={ele.title}
                          className="w-full h-full object-cover "
                        />
                        <div className="absolute right-5 bottom-17  bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                          <div className="w-[2rem] h-[2rem] ">
                            <Image
                              src={linkedinSvg}
                              alt={ele.title}
                              className="object-cover w-full h-full my-auto"
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0">
                          <div className="bg-white w-[15rem] lg:h-[5.5rem] rounded">
                            <h6 className="pt-1 2xl:pt-2 px-2  font-medium">
                              {ele.title}
                            </h6>
                            <p className="px-2  font-light text-black">
                              {ele.desig}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="flex pt-5 flex-wrap gap-5 mt-4 justify-start md:gap-8 2xl:mt-1">
                <button
                  className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                    isFirstSlide ? "opacity-40" : ""
                  }`}
                  aria-label="Previous slide"
                >
                  <FaAngleLeft />
                </button>
                <button
                  className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                    isLastSlide ? "opacity-40" : ""
                  }`}
                  aria-label="Next slide"
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>

          {/* MObile View */}
          <div className="md:hidden block">
            <div className="py-4">
              <button
                className="text-white text-md text-nowrap lg:text-xl relative font-medium"
                onClick={() => setdata("trustee")}
              >
                Trustee
                <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
              </button>
            </div>
            <div className="w-full  overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    swiper.params.navigation = {
                      prevEl: ".swiper-solution-prev-btn",
                      nextEl: ".swiper-solution-next-btn",
                    };
                    swiper.navigation.destroy(); // clean before re-init
                    swiper.navigation.init();
                    swiper.navigation.update();
                  });
                }}
                onSlideChange={handleSlideChange}
                slidesPerView={cardData.length}
              >
                {trustee.map((ele, index) => (
                  <SwiperSlide key={index} className="!w-auto">
                    {" "}
                    <div className="flex realtive flex-col w-[19rem] h-[19rem] ">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        className="w-full h-full object-cover "
                      />
                      <div className="absolute right-5 bottom-17  bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                        <div className="w-[2rem] h-[2rem] ">
                          <Image
                            src={linkedinSvg}
                            alt={ele.title}
                            className="object-cover w-full h-full my-auto"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0">
                        <div className="bg-white w-[15rem] h-[5.5rem] rounded">
                          <h6 className="pt-2 px-1 font-medium">{ele.title}</h6>
                          <p className="px-1  font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex pt-5 flex-wrap gap-5 mt-4 justify-start md:gap-8 2xl:mt-1">
              <button
                className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isFirstSlide ? "opacity-40" : ""
                }`}
                aria-label="Previous slide"
              >
                <FaAngleLeft />
              </button>
              <button
                className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isLastSlide ? "opacity-40" : ""
                }`}
                aria-label="Next slide"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          <div className="md:hidden block">
            <div className="py-4">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Distinguished Fellows
                <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
              </button>
            </div>
            <div className="w-full  overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    swiper.params.navigation = {
                      prevEl: ".swiper-solution-prev-btn",
                      nextEl: ".swiper-solution-next-btn",
                    };
                    swiper.navigation.destroy(); // clean before re-init
                    swiper.navigation.init();
                    swiper.navigation.update();
                  });
                }}
                onSlideChange={handleSlideChange}
                slidesPerView={cardData.length}
              >
                {fellow.map((ele, index) => (
                  <SwiperSlide key={index} className="!w-auto">
                    {" "}
                    <div className="flex realtive flex-col w-[19rem] h-[19rem] ">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        className="w-full h-full object-cover "
                      />
                      <div className="absolute right-5 bottom-17  bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                        <div className="w-[2rem] h-[2rem] ">
                          <Image
                            src={linkedinSvg}
                            alt={ele.title}
                            className="object-cover w-full h-full my-auto"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0">
                        <div className="bg-white w-[15rem] h-[5.5rem] rounded">
                          <h6 className="pt-2 px-1 font-medium">{ele.title}</h6>
                          <p className="px-1  font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex pt-5 flex-wrap gap-5 mt-4 justify-start md:gap-8 2xl:mt-1">
              <button
                className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isFirstSlide ? "opacity-40" : ""
                }`}
                aria-label="Previous slide"
              >
                <FaAngleLeft />
              </button>
              <button
                className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isLastSlide ? "opacity-40" : ""
                }`}
                aria-label="Next slide"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          <div className="md:hidden block">
            <div className="py-4">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Advisory Council
                <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
              </button>
            </div>
            <div className="w-full  overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    swiper.params.navigation = {
                      prevEl: ".swiper-solution-prev-btn",
                      nextEl: ".swiper-solution-next-btn",
                    };
                    swiper.navigation.destroy(); 
                    swiper.navigation.init();
                    swiper.navigation.update();
                  });
                }}
                onSlideChange={handleSlideChange}
                slidesPerView={cardData.length}
              >
                {advisory.map((ele, index) => (
                  <SwiperSlide key={index} className="!w-auto">
                    {" "}
                    <div className="flex realtive flex-col w-[19rem] h-[19rem] ">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        className="w-full h-full object-cover "
                      />
                      <div className="absolute right-5 bottom-17  bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                        <div className="w-[2rem] h-[2rem] ">
                          <Image
                            src={linkedinSvg}
                            alt={ele.title}
                            className="object-cover w-full h-full my-auto"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0">
                        <div className="bg-white w-[15rem] h-[5.5rem] rounded">
                          <h6 className="pt-2 px-1 font-medium">{ele.title}</h6>
                          <p className="px-1  font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex pt-5 flex-wrap gap-5 mt-4 justify-start md:gap-8 2xl:mt-1">
              <button
                className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isFirstSlide ? "opacity-40" : ""
                }`}
                aria-label="Previous slide"
              >
                <FaAngleLeft />
              </button>
              <button
                className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isLastSlide ? "opacity-40" : ""
                }`}
                aria-label="Next slide"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          <div className="md:hidden block">
            <div className="py-4">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Team
                <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
              </button>
            </div>
            <div className="w-full  overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                onSwiper={(swiper) => {
                  setTimeout(() => {
                    swiper.params.navigation = {
                      prevEl: ".swiper-solution-prev-btn",
                      nextEl: ".swiper-solution-next-btn",
                    };
                    swiper.navigation.destroy(); // clean before re-init
                    swiper.navigation.init();
                    swiper.navigation.update();
                  });
                }}
                onSlideChange={handleSlideChange}
                slidesPerView={cardData.length}
              >
                {team.map((ele, index) => (
                  <SwiperSlide key={index} className="!w-auto">
                    {" "}
                    <div className="flex realtive flex-col w-[19rem] h-[19rem] ">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        className="w-full h-full object-cover "
                      />
                      <div className="absolute right-5 bottom-17  bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                        <div className="w-[2rem] h-[2rem] ">
                          <Image
                            src={linkedinSvg}
                            alt={ele.title}
                            className="object-cover w-full h-full my-auto"
                          />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0">
                        <div className="bg-white w-[15rem] h-[5.5rem] rounded">
                          <h6 className="pt-2 px-1 font-medium">{ele.title}</h6>
                          <p className="px-1  font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex pt-5 flex-wrap gap-5 mt-4 justify-start md:gap-8 2xl:mt-1">
              <button
                className={`swiper-solution-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isFirstSlide ? "opacity-40" : ""
                }`}
                aria-label="Previous slide"
              >
                <FaAngleLeft />
              </button>
              <button
                className={`swiper-solution-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isLastSlide ? "opacity-40" : ""
                }`}
                aria-label="Next slide"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
