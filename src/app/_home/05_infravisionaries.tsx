"use client";

import { useState, useEffect } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image, { StaticImageData } from "next/image";
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
import VishalKampani from "@/../public/assets/home/advisory/VishalKampani.png";

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
import Link from "next/link";

type CardData = {
  image: StaticImageData;
  title: string;
  desig: string;
  link?: string;
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
    link: "https://www.linkedin.com/in/rumjhum-chatterjee-396041268/",
  },

  {
    image: Kiran,
    title: "Kiran Karnik",
    desig: "Trustee",
  },
];

const advisory = [
  {
    image: NasserMunjee,
    title: "Nasser Munjee",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/nasser-munjee-8aaa5316/",
  },
  {
    image: HemendraMKothari,
    title: "Hemendra M. Kothari",
    desig: "Member, Council of Advisors",
  },
  {
    image: JanmejayaKSinha,
    title: "Janmejaya K. Sinha",
    desig: "Member, Council of Advisors",
  },
  {
    image: NarotamSekhsaria,
    title: "Narotam Sekhsaria",
    desig: "Member, Council of Advisors",
  },
  {
    image: RajnishKumar,
    title: "Rajnish Kumar",
    desig: "Member, Council of Advisors",
  },
  {
    image: ProfessorGRaghuram,
    title: "Professor G. Raghuram",
    desig: "Member, Council of Advisors",
  },
  {
    image: ManojKSingh,
    title: "Manoj K. Singh",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/manoj-k-singh-72817a9/",
  },

  {
    image: SunilMathur,
    title: "Sunil Mathur",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/sunil-mathur/",
  },
  {
    image: AshishDhawan,
    title: "Ashish Dhawan",
    desig: "Member, Council of Advisors",
  },
  {
    image: SNSubrahmanyan,
    title: "S. N. Subrahmanyan",
    desig: "Member, Council of Advisors",
  },

  {
    image: SameerGupta,
    title: "Sameer Gupta",
    desig: "Member, Council of Advisors",
  },
  {
    image: DKSen,
    title: "D. K. Sen",
    desig: "Member, Council of Advisors",
  },

  {
    image: ArunNanda,
    title: "Arun Nanda",
    desig: "Member, Council of Advisors",
  },

  {
    image: Arun,
    title: "Arun Maira",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/arun-maira-5499711b4/",
  },
  {
    image: DilipCherian,
    title: "Dilip Cherian",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/dilipcherian/",
  },
  {
    image: GeetanjaliKirloskar,
    title: "Geetanjali Kirloskar",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/geetanjali-kirloskar-b04203154/",
  },
  {
    image: VishalKampani,
    title: "Vishal Kampani",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/vishal-kampani-0a94942a6/",
  },
  {
    image: CyrilShroff,
    title: "Cyril Shroff",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/cyrilshroff/",
  },

  {
    image: khurshed,
    title: "Khurshed",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/khurshed-daruvala/",
  },
];

const fellow = [
  {
    image: rasikaAthawale,
    title: "Rasika Athawale",
    desig: "Distinguished Fellow (Power)",
    link: "https://www.linkedin.com/in/rasika-athawale-5072ab1/",
  },

  {
    image: supratimSarkar,
    title: "Supratim Sarkar",
    desig: "Distinguished Fellow (Financial Services)",
  },
  {
    image: rajivRanjanMishra,
    title: "Rajiv Ranjan Mishra",
    desig: "Distinguished Fellow (Water Conservation)",
  },
  {
    image: rajajiMeshram,
    title: "Rajaji Meshram",
    desig: "Distinguished Fellow(Transport & Logistics)",
    link: "https://www.linkedin.com/in/rajaji-meshram-9aa3437/",
  },

  {
    image: SoumyaKantiGhosh,
    title: "Soumya Kanti Ghosh",
    desig: "Distinguished Fellow (Economic Policy)",
    link: "https://www.linkedin.com/in/soumya-kanti-ghosh-2043921a/",
  },
  {
    image: AkhileshTilotia,
    title: "Akhilesh Tilotia",
    desig: "Distinguished Fellow (Public Policy)",
    link: "https://www.linkedin.com/in/atilotia/",
  },
];

const team = [
  {
    image: Vinayak,
    title: "Vinayak Chatterjee",
    desig: "Founder & Managing Trustee",
  },
  {
    image: RumjhumChatterjee,
    title: "Rumjhum Chatterjee",
    desig: "Co-Founder & Managing Trustee",
  },
  {
    image: jagan,
    title: "Jagan Shah",
    desig: "CEO",
    link: "https://www.linkedin.com/in/jagan-shah/",
  },
  {
    image: KavereeBamzai,
    title: "Kaveree Bamzai",
    desig: "Head Advocacy",
    link: "https://www.linkedin.com/in/kavereebamzai/",
  },
  {
    image: MutumChaobisana,
    title: "Dr. Mutum Chaobisana",
    desig: "Head Programmes",
    link: "https://www.linkedin.com/in/dr-mutum-chaobisana-83647017/",
  },

  {
    image: VrindaSingh,
    title: "Vrinda Singh",
    desig: "Research Associate",
    link: "https://www.linkedin.com/in/vrinda-singh-3951951b4/",
  },
  {
    image: LawrenceCardoza,
    title: "Lawrence Cardoza",
    desig: "Research Associate",
    link: "https://www.linkedin.com/in/lawrence-cardoza/",
  },
  {
    image: PriyankaBains,
    title: "Priyanka Bains",
    desig: "Research Associate",
    link: "https://www.linkedin.com/in/priyanka-bains-b070607b/",
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
      <section className="bg-pink relative">
        <div className=" absolute top-0 xl:right-8 2xl:right-28 xl:block hidden">
          <svg
            width="594"
            height="427"
            viewBox="0 0 594 427"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <circle
                cx="130.108"
                cy="130.108"
                r="129.737"
                transform="matrix(-0.914239 -0.405175 -0.405175 0.914239 593.496 -18.2383)"
                stroke="#D9D9D9"
                strokeWidth="0.742301"
              />
              <circle
                opacity="0.3"
                cx="153.523"
                cy="153.523"
                r="153.523"
                transform="matrix(-0.914239 -0.405175 -0.405175 0.914239 405.117 93.9883)"
                fill="#D9D9D9"
              />
            </g>
          </svg>
        </div>
        <div className=" blade-top-padding-lg blade-bottom-padding-lg">

        <div className="w-container">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white "></span>
              <h5 className="font-medium text-white">Our core</h5>
            </div>
            <div className="pt-4 pb-2 md:py-5 ">
              <h1 className="text-white font-medium">The Infravisionaries</h1>
              <div className="w-full md:w-[45%]">
                <h6 className="text-white  tracking-[1%] py-4">
                  The Infravision Foundation is a confluence of seasoned leaders
                  from across the infrastructure domain. With exceptional
                  intellect, global experience, and shared purpose, this
                  consortium propels India’s infrastructure and economic growth.
                </h6>
              </div>
            </div>
        </div>
         

          <div className="md:flex flex-row  w-container hidden ">

             <div className=" border-r-1 pe-20 border-white/40   ">

              <div className="py-4 group">
                <button
                  className={`text-white text-md text-nowrap cursor-pointer lg:text-xl relative ${
                    data === "trustee" ? "font-medium" : ""
                  }`}
                  onClick={() => setdata("trustee")}
                >
                  Trustees
                  <span
                    className={` h-[1px] ${
                      data === "trustee"
                        ? "w-full transition-all  duration-1000 "
                        : "w-10 sm:w-5"
                    }  sm:h-[2px]  bg-white absolute bottom-0 left-0 top-7`}
                  ></span>
                </button>
              </div>

              <div className="py-4 group">
                <button
                  className={`text-white text-md cursor-pointer text-nowrap lg:text-xl relative ${
                    data === "advisory" ? "font-medium" : ""
                  }`}
                  onClick={() => setdata("advisory")}
                >
                  Advisory Council
                  <span
                    className={` h-[1px] ${
                      data === "advisory"
                        ? "w-full transition-all  duration-1000"
                        : "w-10 sm:w-5"
                    }  sm:h-[2px]  bg-white absolute bottom-0 left-0 top-7`}
                  ></span>
                </button>
              </div>

              <div className="py-4 group">
                <button
                  className={`text-white cursor-pointer text-md text-nowrap lg:text-xl relative ${
                    data === "fellow" ? "font-medium" : ""
                  }`}
                  onClick={() => setdata("fellow")}
                >
                  Distinguished Fellows
                  <span
                    className={` h-[1px] ${
                      data === "fellow"
                        ? "w-full  transition-all duration-1000"
                        : "w-10 sm:w-5"
                    }  sm:h-[2px]  bg-white absolute bottom-0 left-0 top-7`}
                  ></span>
                </button>
              </div>

              <div className="py-4 group">
                <button
                  className={`text-white cursor-pointer text-md text-nowrap lg:text-xl relative ${
                    data === "team" ? "font-medium" : ""
                  }`}
                  onClick={() => setdata("team")}
                >
                  Team
                  <span
                    className={` h-[1px] ${
                      data === "team"
                        ? "w-full  transition-all duration-1000"
                        : "w-10 sm:w-5"
                    }  sm:h-[2px]  bg-white absolute bottom-0 left-0 top-7`}
                  ></span>
                </button>
              </div>
             </div>

              <div className="w-full overflow-x-hidden  ml-[4%]">
                <div className="">
                  <Swiper
                    modules={[Navigation]}
                    className="!pl-10%"
                    watchOverflow={true}
                    navigation={{
                      prevEl: ".swiper-prev-btn-members",
                      nextEl: ".swiper-next-btn-members",
                    }}
                    grabCursor={true}
                    spaceBetween={10}
                    onSlideChange={handleSlideChange}
                    slidesPerView={1.1}
                    centeredSlides={false}
                    breakpoints={{
                      500: { slidesPerView: 1.5, centeredSlides: false },
                      768: { slidesPerView: 2.2, centeredSlides: false },
                      1024: { slidesPerView: 2, centeredSlides: false },
                      1280: { slidesPerView: 2.9, centeredSlides: false },
                      1536: {
                        slidesPerView: 3.5,
                        centeredSlides: false,
                      },
                    }}
                  >
                    {carddata.map((ele, index) => {
                      return (
                        <SwiperSlide
                          key={index}
                          className="w-screen  overflow-hidden "
                        >
                          <div className="flex realtive flex-col w-[19rem]  h-[19rem]">
                            <Image
                              src={ele.image}
                              alt={ele.title}
                              className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute  bottom-0 left-0 w-[17rem]  ">
                              {ele.link ? (
                                <Link
                                  href={ele.link ? ele.link : ""}
                                  target="_blank"
                                  className="group"
                                >
                                  <div className="ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                                    <svg
                                      width="26"
                                      height="26"
                                      viewBox="0 0 26 26"
                                      fill="none"
                                      className="fill-[#5D6468] group-hover:fill-[#C82249] transition-colors duration-300" // Add transition for smooth effect
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                                    </svg>
                                  </div>
                                </Link>
                              ) : (
                                <div className="group-hover:bg-pink  ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                                  <div className=" ">
                                    <svg
                                      width="26"
                                      height="26"
                                      viewBox="0 0 26 26"
                                      fill="none"
                                      className="fill-[#5D6468] group-hover:fill-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                              <div className="bg-white w-[14rem]  lg:h-[5.5rem]  rounded">
                                <h6 className="pt-1 2xl:pt-2 px-2  font-medium">
                                  {ele.title}
                                </h6>
                                <p className="px-2  text-sm font-light text-black">
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
                <div className="flex pt-3  h-[80px] flex-wrap gap-5 mt-4 justify-start md:gap-4 2xl:mt-1">
                  <button
                    className={`swiper-prev-btn-members  cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink`}
                    aria-label="Previous slide"
                  >
                    <GoArrowLeft />
                  </button>
                  <button
                    className={`swiper-next-btn-members  cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink `}
                    aria-label="Next slide"
                  >
                    <GoArrowRight />
                  </button>
                </div>
              </div>
          </div>

          {/* MObile View */}
           <div className="md:hidden block pb-7 px-2">
            <div className="py-5">
              <button
                className="text-white text-md text-nowrap lg:text-xl relative font-medium"
                onClick={() => setdata("trustee")}
              >
                Trustees
              </button>
            </div>
            <div className="w-full  overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                className=""
                spaceBetween={10}
                grabCursor
                onSlideChange={handleSlideChange}
                slideToClickedSlide
                slidesPerView={1.1}
                centeredSlides={false}
                navigation={{
                  prevEl: ".prevbtntrustee",
                  nextEl: ".nextbtntrustee",
                }}
                pagination={{
                  el: ".custom-pagination-bullets-members",
                  type: 'fraction',
                }}
               
                breakpoints={{
                  425:{
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
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
                  <SwiperSlide key={index} className="">
                    <div className="flex realtive flex-col w-[19rem]  h-[19rem]">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute  bottom-0 left-0 w-[17rem]  ">
                        {ele.link ? (
                          <Link href={ele.link ? ele.link : ""} target="_blank">
                            <div className="   ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                              <div className=" ">
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  className="fill-[#5D6468] group-hover:fill-[#C82249]"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div className="group-hover:bg-pink  ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                            <div className=" ">
                              <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                className="fill-[#5D6468] group-hover:fill-white"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="bg-white w-[14rem]  lg:h-[5.5rem]  rounded">
                          <h6 className="pt-1 2xl:pt-2 px-2  font-medium">
                            {ele.title}
                          </h6>
                          <p className="px-2  text-sm font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex flex-row justify-between mt-4 px-2">
              <div className="flex  w-fit gap-3">
                <button
                  className="prevbtntrustee cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink"
                  aria-label="Previous slide"
                >
                  <GoArrowLeft />
                </button>
                <button
                  className="nextbtntrustee cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink"
                  aria-label="Next slide"
                >
                  <GoArrowRight />
                </button>
              </div>

              <div className="lg:hidden  my-auto h-4 flex gap-1  flex-1 justify-end custom-pagination-bullets-members" />
            </div>
          </div> 

          <div className="md:hidden block pb-7 px-2">
            <div className="py-5  ">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Distinguished Fellows
              </button>
            </div>
            <div className="w-full  overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                className=""
                spaceBetween={10}
                grabCursor
                onSlideChange={handleSlideChange}
                pagination={{
                  el: ".custom-pagination-bullets-fellows",
                  type: 'fraction',
                }}
                slideToClickedSlide
                slidesPerView={1.1}
                centeredSlides={false}
                navigation={{
                  prevEl: ".prevbtnfellows",
                  nextEl: ".nextbtnfellows",
                }}
                breakpoints={{
                  425:{
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
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
                  <SwiperSlide key={index} className="">
                    <div className="flex realtive flex-col w-[19rem]  h-[19rem]">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute  bottom-0 left-0 w-[17rem]  ">
                        {ele.link ? (
                          <Link href={ele.link ? ele.link : ""} target="_blank">
                            <div className="   ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                              <div className=" ">
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  className="fill-[#5D6468] group-hover:fill-[#C82249]"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div className="group-hover:bg-pink  ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                            <div className=" ">
                              <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                className="fill-[#5D6468] group-hover:fill-white"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="bg-white w-[14rem]  lg:h-[5.5rem]  rounded">
                          <h6 className="pt-1 2xl:pt-2 px-2  font-medium">
                            {ele.title}
                          </h6>
                          <p className="px-2  text-sm font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex flex-row justify-between mt-4 px-2">
              <div className="flex  w-fit gap-3">
                <button
                  className="prevbtnfellows flex sm:h-10 cursor-pointer sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink"
                  aria-label="Previous slide"
                >
                  <GoArrowLeft />
                </button>
                <button
                  className="nextbtnfellows flex sm:h-10 cursor-pointer sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink"
                  aria-label="Next slide"
                >
                  <GoArrowRight />
                </button>
              </div>

              <div className="lg:hidden mt-auto h-4 flex gap-1 flex-1 justify-end custom-pagination-bullets-fellows" />
            </div>
          </div> 

          <div className="md:hidden block pb-7 px-2">
            <div className="py-5">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Advisory Council
              </button>
            </div>
            <div className="w-full  overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                className=""
                watchOverflow={true}
                spaceBetween={10}
                grabCursor
                onSlideChange={handleSlideChange}
                slideToClickedSlide
                slidesPerView={1.1}
                centeredSlides={false}
                navigation={{
                  prevEl: ".prevbtnadvisory",
                  nextEl: ".nextbtnadvisory",
                }}
                pagination={{
                  el: ".custom-pagination-bullets-advisory",
                  type: 'fraction',
                }}
                breakpoints={{
                  425:{
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
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
                  <SwiperSlide key={index} className="">
                    <div className="flex realtive flex-col w-[19rem]  h-[19rem]">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute  bottom-0 left-0 w-[17rem]  ">
                        {ele.link ? (
                          <Link href={ele.link ? ele.link : ""} target="_blank">
                            <div className="   ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                              <div className=" ">
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  className="fill-[#5D6468] group-hover:fill-[#C82249]"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div className="group-hover:bg-pink  ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                            <div className=" ">
                              <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                className="fill-[#5D6468] group-hover:fill-white"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="bg-white w-[14rem]  lg:h-[5.5rem]  rounded">
                          <h6 className="pt-1 2xl:pt-2 px-2  font-medium">
                            {ele.title}
                          </h6>
                          <p className="px-2  text-sm font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex flex-row justify-between mt-4 px-2">
              <div className="flex  w-fit gap-3">
                <button
                  className="prevbtnadvisory flex sm:h-10 sm:w-10 h-8 w-8 cursor-pointer  items-center justify-center rounded-full bg-white text-xl text-pink"
                  aria-label="Previous slide"
                >
                  <GoArrowLeft />
                </button>
                <button
                  className="nextbtnadvisory flex sm:h-10 sm:w-10 h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xl text-pink"
                  aria-label="Next slide"
                >
                  <GoArrowRight />
                </button>
              </div>

              <div className="lg:hidden mt-auto h-4 flex  gap-[1px]  justify-end custom-pagination-bullets-advisory" />
            </div>
          </div>

          <div className="md:hidden block px-2">
            <div className="py-5">
              <button className="text-white text-md text-nowrap lg:text-xl relative font-medium">
                Team
              </button>
            </div>
            <div className="w-full  overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                className=""
                spaceBetween={10}
                grabCursor
                onSlideChange={handleSlideChange}
                slideToClickedSlide
                slidesPerView={1.1}
                centeredSlides={false}
                navigation={{
                  prevEl: ".prevbtnteam",
                  nextEl: ".nextbtnteam",
                }}
                pagination={{
                  el: ".custom-pagination-bullets-team",
                  type: 'fraction',
                }}
                breakpoints={{
                  425:{
                    slidesPerView: 1.3,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
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
                  <SwiperSlide key={index} className="">
                    <div className="flex realtive flex-col w-[19rem]  h-[19rem]">
                      <Image
                        src={ele.image}
                        alt={ele.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute  bottom-0 left-0  w-[17rem]  ">
                        {ele.link ? (
                          <Link href={ele.link ? ele.link : ""} target="_blank">
                            <div className="   ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                              <div className=" ">
                                <svg
                                  width="26"
                                  height="26"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  className="fill-[#5D6468] group-hover:fill-[#C82249]"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div className="group-hover:bg-pink  ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                            <div className=" ">
                              <svg
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                className="fill-[#5D6468] group-hover:fill-white"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="bg-white w-[14rem]  lg:h-[5.5rem]  rounded">
                          <h6 className="pt-1 2xl:pt-2 px-2  font-medium">
                            {ele.title}
                          </h6>
                          <p className="px-2  text-sm font-light text-black">
                            {ele.desig}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex flex-row justify-between mt-4  px-2">
              <div className="flex  w-fit gap-3">
                <button
                  className="prevbtnteam flex sm:h-10 sm:w-10 h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xl text-pink"
                  aria-label="Previous slide"
                >
                  <GoArrowLeft />
                </button>
                <button
                  className="nextbtnteam flex sm:h-10 sm:w-10 h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xl text-pink"
                  aria-label="Next slide"
                >
                  <GoArrowRight />
                </button>
              </div>

              <div className="lg:hidden mt-auto h-4 flex gap-1 flex-1  justify-end custom-pagination-bullets-team" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
