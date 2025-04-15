"use client";

import { useState, useEffect } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Pagination } from "swiper/modules";
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
import { GoArrowRight, GoArrowLeft } from "react-icons/go";



type CardData = {
  image: StaticImageData;
  title: string;
  desig: string;
};
const trustee = [
  {
    image: Vinayak,
    title: "Vinayak Chatterjee",
    desig: "Founder & Managing Trustee",
  },
  {
    image: Rumjhum,
    title: "Rumjhum Chatterjee",
    desig: "Co-Founder & Managing Trustee",
  },
 
  {
    image: Kiran,
    title: "Kiran Karnik",
    desig: "Trustee",
  },
];

const advisory = [
  {
    image: Arun,
    title: "Arun Maira",
    desig: "Member, Council of Advisors",
  },
  {
    image: ArunNanda,
    title: "Arun Nanda",
    desig: "Member, Council of Advisors",
  },
  {
    image: AshishDhawan,
    title: "Ashish Dhawan",
    desig: "Member, Council of Advisors",
  },
  {
    image: CyrilShroff,
    title: "Cyril Shroff",
    desig: "Member, Council of Advisors",
  },
  {
    image: DKSen,
    title: "D. K. Sen",
    desig: "Member, Council of Advisors",
  },
  {
    image: JanmejayaKSinha,
    title: "Janmejaya K. Sinha",
    desig: "Member, Council of Advisors",
  },
  {
    image: GeetanjaliKirloskar,
    title: "Geetanjali Kirloskar",
    desig: "Member, Council of Advisors",
  },
  {
    image: HemendraMKothari,
    title: "Hemendra M. Kothari",
    desig: "Member, Council of Advisors",
  },
  {
    image: jagan,
    title: "Jagan Shah",
    desig: "Member, Council of Advisors",
  },
  {
    image: khurshed,
    title: "Khurshed",
    desig: "Member, Council of Advisors",
  },
  {
    image: NarotamSekhsaria,
    title: "Narotam Sekhsaria",
    desig: "Member, Council of Advisors",
  },
  {
    image: ProfessorGRaghuram,
    title: "Professor G. Raghuram",
    desig: "Member, Council of Advisors",
  },
  {
    image: NasserMunjee,
    title: "Nasser Munjee",
    desig: "Member, Council of Advisors",
  },
  {
    image: RajnishKumar,
    title: "Rajnish Kumar",
    desig: "Member, Council of Advisors",
  },
  {
    image: SameerGupta,
    title: "Sameer Gupta",
    desig: "Member, Council of Advisors",
  },
  {
    image: SNSubrahmanyan,
    title: "S. N. Subrahmanyan",
    desig: "Member, Council of Advisors",
  },
  {
    image: SunilMathur,
    title: "Sunil Mathur",
    desig: "Member, Council of Advisors",
  },
  {
    image: DilipCherian,
    title: "Dilip Cherian",
    desig: "Member, Council of Advisors",
  },
  {
    image: ManojKSingh,
    title: "Manoj K. Singh",
    desig: "Member, Council of Advisors",
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
    desig: "DHead Programmes",
  },
  {
    image: KavereeBamzai,
    title: "Kaveree Bamzai",
    desig: "Head Advocacy",
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


export default function Infravisionaries() {
  const [data, setdata] = useState("trustee");
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [carddata, setcarddata] = useState<CardData[]>([]);
  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };

 
  useEffect(() => {
    let cardDetails: CardData[] = [];

    switch (data) {
      case "trustee":
        cardDetails = trustee;
        break;
      case "advisory":
        cardDetails = advisory;
        break;
      case "fellow":
        cardDetails = fellow;
        break;
      case "team":
        cardDetails = team;
        break;
      default:
        cardDetails = [];
    }

    setcarddata(cardDetails);
  }, [data]);

  return (
    <>
      <section className="bg-pink">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white "></span>
            <h5 className="font-medium text-white">Our core</h5>
          </div>
          <div className="pt-4 pb-2 md:py-5">
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
              <div className="py-4 group">
                <button
                  className="text-white text-md text-nowrap lg:text-xl relative font-medium"
                  onClick={() => setdata("trustee")}
                >
                  Trustee
                  <span className={` h-[1px] ${data==="trustee"?"w-full transition-all duration-1000":"w-10 sm:w-5"}  sm:h-[2px]  bg-white absolute bottom-0 left-0 top-7`}></span>
                </button>
              </div>
              <div className="py-4 group">
                <button
                  className="text-white text-md  text-nowrap lg:text-xl relative font-medium"
                  onClick={() => setdata("advisory")}
                >
                  Advisory Council
                  <span className={` h-[1px] ${data==="advisory"?"w-full transition-all duration-1000":"w-10 sm:w-5"}  sm:h-[2px]  bg-white absolute bottom-0 left-0 top-7`}></span>
                </button>
              </div>
              <div className="py-4 group">
                <button
                  className="text-white text-md text-nowrap lg:text-xl relative font-medium"
                  onClick={() => setdata("fellow")}
                >
                  Distinguished Fellows
                  <span className={` h-[1px] ${data==="fellow"?"w-full transition-all duration-1000":"w-10 sm:w-5"}  sm:h-[2px]  bg-white absolute bottom-0 left-0 top-7`}></span>
                </button>
              </div>
              <div className="py-4 group">
                <button
                  className="text-white text-md lg:text-xl relative font-medium text-nowrap"
                  onClick={() => setdata("team")}
                >
                  Team
                  <span className={` h-[1px] ${data==="team"?"w-full transition-all duration-1000":"w-10 sm:w-5"}  sm:h-[2px]  bg-white absolute bottom-0 left-0 top-7`}></span>
                </button>
              </div>
            </div>

            <div>
              <div className="w-full  overflow-hidden">
                <Swiper
                  modules={[Navigation]}
                  className=" w-full"
                  watchOverflow={true}
                  navigation={{
                    prevEl: ".swiper-prev-btn",
                    nextEl: ".swiper-next-btn",
                  }}
                  spaceBetween={20}
                  onSlideChange={handleSlideChange}
                  slidesPerView={1.1}
                  centeredSlides={true}
                  breakpoints={{
                    500: { slidesPerView: 1.5, centeredSlides: false },
                    768: { slidesPerView: 2.2, centeredSlides: false },
                    1024: { slidesPerView: 2.9, centeredSlides: false },
                    1280: { slidesPerView: 3, centeredSlides: false },
                    1536: {
                      slidesPerView: 2.5,
                      centeredSlides: false,
                      spaceBetween: 50,
                    },
                  }}
                >
                  {carddata.map((ele, index) => {
                    return (
                      <SwiperSlide key={index} className="!w-auto">
                        <div className="flex realtive flex-col  h-[19rem]">
                          <Image
                            src={ele.image}
                            alt={ele.title}
                            className="w-full h-full object-cover rounded"
                          />
                          {/* <div className="absolute xl:right-5 2xl:right-3  bottom-20   bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                            <div className="w-[2rem] h-[2rem] ">
                              <Image
                                src={linkedinSvg}
                                alt={ele.title}
                                className="object-cover w-full rounded h-full my-auto"
                              />
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0">
                            <div className="bg-white w-[14rem]  lg:h-[5.5rem]  rounded">
                              <h6 className="pt-1 2xl:pt-2 px-2  font-medium">
                                {ele.title}
                              </h6>
                              <p className="px-2  smallText font-light text-black">
                                {ele.desig}
                              </p>
                            </div>
                          </div> */}

                          <div className="absolute bottom-0 left-0 w-[17rem]  ">
                          <div className=" ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                            <div className=" ">
                              <Image
                                src={linkedinSvg}
                                alt={ele.title}
                                className="object-cover w-full rounded h-full my-auto"
                              />
                            </div>
                          </div>
                            <div className="bg-white w-[14rem]  lg:h-[5.5rem]  rounded">
                              <h6 className="pt-1 2xl:pt-2 px-2  font-medium">
                                {ele.title}
                              </h6>
                              <p className="px-2  smallText font-light text-black">
                                {ele.desig}
                              </p>
                            </div>

                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="flex pt-5 flex-wrap gap-5 mt-4 justify-start md:gap-4 2xl:mt-1">
                <button
                  className={`swiper-prev-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink`}
                  aria-label="Previous slide"
                >
                  <GoArrowLeft/>
                </button>
                <button
                  className={`swiper-next-btn flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink`}
                  aria-label="Next slide"
                >
                  <GoArrowRight />
                </button>
              </div>
            </div>
          </div>



          {/* MObile View */}
         <div className="md:hidden block pb-7">
            <div className="py-5">
              <button
                className="text-white text-md text-nowrap lg:text-xl relative font-medium"
                onClick={() => setdata("trustee")}
              >
                Trustee
               
              </button>
            </div>
            <div className="w-full  overflow-hidden">
            <Swiper
            modules={[ Navigation]}
            
            className=""
            spaceBetween={20}
            grabCursor
            onSlideChange={handleSlideChange}
            slideToClickedSlide
            slidesPerView={1.1}
           
            navigation={{
              prevEl: ".prevbtntrustee",
              nextEl: ".nextbtntrustee",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 50,
              },
              1280: {
                spaceBetween: 20,
                slidesPerView: 3.1,
              },
              1536: {
                spaceBetween: 30,
                slidesPerView: 3.4,
              },
            }}
          >
                {trustee.map((ele, index) => (
                  <SwiperSlide key={index} className=" !w-auto">
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
                          <p className="smallText px-1  font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          <div className=" flex pt-5 flex-wrap gap-3 mt-4 justify-start  2xl:mt-1">
              <button
                className={`prevbtntrustee flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isFirstSlide ? "opacity-40" : ""
                }`}
                aria-label="Previous slide"
              >
                <GoArrowLeft />
              </button>
              <button
                className={`nextbtntrustee flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isLastSlide ? "opacity-40" : ""
                }`}
                aria-label="Next slide"
              >
                <GoArrowRight />
              </button>
            </div>
          </div> 

          <div className="md:hidden block pb-7">
            <div className="py-5  ">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Distinguished Fellows
              </button>
            </div>
            <div className="w-full  overflow-hidden">
                <Swiper
                modules={[ Navigation]}
                className=""
                spaceBetween={20}
                grabCursor
                onSlideChange={handleSlideChange}
                slideToClickedSlide
                slidesPerView={1.1}
              
                navigation={{
                  prevEl: ".prevbtnfellows",
                  nextEl: ".nextbtnfellows",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 50,
                  },
                  1280: {
                    spaceBetween: 20,
                    slidesPerView: 3.1,
                  },
                  1536: {
                    spaceBetween: 30,
                    slidesPerView: 3.4,
                  },
                }}
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
                          <p className="px-1 smallText font-light text-black">
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
                className={`prevbtnfellows flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isFirstSlide ? "opacity-40" : ""
                }`}
                aria-label="Previous slide"
              >
                <GoArrowLeft />
              </button>
              <button
                className={`nextbtnfellows flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isLastSlide ? "opacity-40" : ""
                }`}
                aria-label="Next slide"
              >
                <GoArrowRight />
              </button>
            </div>
          </div>

          <div className="md:hidden block pb-7">
            <div className="py-5">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Advisory Council
              </button>
            </div>
            <div className="w-full  overflow-hidden">
            <Swiper
                modules={[ Navigation]}
                className=""
                watchOverflow={true}
                spaceBetween={20}
                grabCursor
                onSlideChange={handleSlideChange}
                slideToClickedSlide
                slidesPerView={1.1}
              
                navigation={{
                  prevEl: ".prevbtnadvisory",
                  nextEl: ".nextbtnadvisory",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 50,
                  },
                  1280: {
                    spaceBetween: 20,
                    slidesPerView: 3.1,
                  },
                  1536: {
                    spaceBetween: 30,
                    slidesPerView: 3.4,
                  },
                }}
              >
                    {advisory.map((ele, index) => (
                  <SwiperSlide key={index} className="!w-[19rem]">
                    {" "}
                    <div className="flex realtive flex-col  h-[19rem] ">
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
                          <p className="px-1 smallText font-light text-black">
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
                className={`prevbtnadvisory flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isFirstSlide ? "opacity-40" : ""
                }`}
               
              >
                <GoArrowLeft />
              </button>
              <button
                className={`nextbtnadvisory flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isLastSlide ? "opacity-40" : ""
                }`}
               
              >
                <GoArrowRight />
              </button>
            </div>
          </div>

          <div className="md:hidden block ">
            <div className="py-5">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Team
              </button>
            </div>
            <div className="w-full  overflow-hidden">
            <Swiper
                modules={[ Navigation]}
                className=""
                spaceBetween={20}
                grabCursor
                onSlideChange={handleSlideChange}
                slideToClickedSlide
                slidesPerView={1.1}
              
                navigation={{
                  prevEl: ".prevbtnteam",
                  nextEl: ".nextbtnteam",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 50,
                  },
                  1280: {
                    spaceBetween: 20,
                    slidesPerView: 3.1,
                  },
                  1536: {
                    spaceBetween: 30,
                    slidesPerView: 3.4,
                  },
                }}
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
                          <p className="px-1 smallText font-light text-black">
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
                className={`prevbtnteam flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isFirstSlide ? "opacity-40" : ""
                }`}
                aria-label="Previous slide"
              >
                <GoArrowLeft />
              </button>
              <button
                className={`nextbtnteam flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink ${
                  isLastSlide ? "opacity-40" : ""
                }`}
                aria-label="Next slide"
              >
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
