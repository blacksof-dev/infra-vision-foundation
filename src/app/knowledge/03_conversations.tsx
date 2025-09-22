"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation,  Pagination } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { useApiHook } from "@/lib/useApi";




interface conversationApiResponse{
  data:{
  id:string;
  image:string;
  videoLink:string;
  name:string;
  title:string;
  desc:string;
  date:string;
  active:boolean;
}[]
}

interface contentApiResponse{
  tagName:string;
  title:string;
  description:string;
  cta:{
    text:string;
    target:string;
  }
}


export default function Conversations() {
  
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

   const { data: cardData } = useApiHook<conversationApiResponse>({
      url: "/knowledge/conversation",
      cacheKey: "knowledgeConversation",
    });

    const { data: content } = useApiHook<contentApiResponse>({
      url: "/content/knowledge-conversation-content",
      cacheKey: "knowledgeContent",
    });

    if(!cardData || !content){return null}

    


  const handleSlideChange = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section
      id="infravision-conversations"
      className="bg-whitesmoke overflow-hidden"
    >
      <div className="w-container blade-top-padding-lg blade-bottom-padding-lg ">
        {/* Header Section */}
        <div className="lg:flex justify-between mb-4 lg:mb-8">
          <div className="">
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
              <h5 className="font-medium text-pink">
             {content.tagName}
              </h5>
            </div>
            <div className="py-3 max-w-4xl">
              <h1 className="text-black font-light"  dangerouslySetInnerHTML={{__html: content.title}} />
              
           
            </div>
          </div>
          <div className="max-w-xl xlg:max-w-2xl">
            <h6 className="font-light" dangerouslySetInnerHTML={{__html:content.description}} />
          
          
            <div className="group flex mt-4">
              <Link
                href={content.cta.target}
                target="_blank"
              >
                <button className="text-black text-base lg:text-xl  justify-center items-center cursor-pointer relative font-medium flex flex-row gap-2">
                  <FaYoutube className="text-[#C82249] text-3xl" />
                 {content.cta.text}
                  <div className="w-10 sm:w-20 h-[1px] sm:h-[2px] group-hover:w-full absolute bottom-0 left-0 top-9 bg-pink transition-all duration-1000"></div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Swiper Section */}
        <div className="pt-6">
          <Swiper
            className="!overflow-visible"
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".swiper-conv-prev-btn",
              nextEl: ".swiper-conv-next-btn",
            }}
          
            onSlideChange={handleSlideChange}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              360: { slidesPerView: 1.07 },
              540: { slidesPerView: 1.2 },
              768: { slidesPerView: 2.1 },
              1024: { slidesPerView: 2.3 },
              1279: { slidesPerView: 2.4 },
              1366: { slidesPerView: 2.6 },
            }}
          >
            {cardData.data.map((person, idx) => (
              <SwiperSlide key={idx}>
                <div className="    overflow-hidden flex flex-col h-full">
                  <div className="relative w-full h-[20rem] sm:h-[24rem] rounded-xl overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${person.image}`}
                      alt={person.name}
                      fill
                      className="object-cover"
                      style={{ zIndex: 1 }}
                      unoptimized
                    />

                    {/* <div className="absolute inset-0 bg-black/30 z-10"></div> */}
                    <div className="absolute bottom-0 left-0 z-10 w-[85%] sm:w-[80%] pl-3 pb-3">
                      <Link
                        target="_blank"
                        href={person.videoLink}
                        className="absolute -top-10 -right-8 bg-white group rounded-lg p-3  z-20 w-fit"
                      >
                        <svg
                          className="group-hover:scale-125 transition-all duration-300 ease-linear"
                          width="28"
                          height="28"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7L8 5z" fill="#E11D48" />
                        </svg>
                      </Link>
                      {/* Text overlay */}
                      <div className="  bg-white rounded px-4 py-3 shadow z-20">
                        <p className="font-medium text-black">{person.name}</p>
                        <p className="text-sm text-drakgray leading-4 xl:leading-5">{person.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" text-black/90 flex flex-col xl:flex-row xl:justify-between py-3">
                    <h6 className="font-medium w-full xl:max-w-xs ">
                      {person.desc}
                    </h6>
                    <h6 className="text-darkgray py-1">
                       {person.date}
                    </h6>
                  </div>
                </div>
              </SwiperSlide>
            ))}

          </Swiper>
          {/* Navigation & Pagination */}
          <div className="flex items-center  justify-end mt-6">
            <div className="flex gap-3">
              <button
                className={`swiper-conv-prev-btn cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white transition-opacity duration-200 ${isBeginning ? "opacity-50 cursor-not-allowed" : "opacity-100"
                  }`}
                aria-label="Previous slide"
                disabled={isBeginning}
              >
                <GoArrowLeft />
              </button>
              <button
                className={`swiper-conv-next-btn cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-white transition-opacity duration-200 ${isEnd ? "opacity-50 cursor-not-allowed" : "opacity-100"
                  }`}
                aria-label="Next slide"
                disabled={isEnd}
              >
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}