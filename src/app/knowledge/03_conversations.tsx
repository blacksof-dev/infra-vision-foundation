"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

import img1 from "@/../public/assets/knowledeg/conversations/01.jpg";
import img2 from "@/../public/assets/knowledeg/conversations/02.png";
import img3 from "@/../public/assets/knowledeg/conversations/03.jpg";
import img4 from "@/../public/assets/knowledeg/conversations/04.jpg";
import img5 from "@/../public/assets/knowledeg/conversations/05.jpg";
import img6 from "@/../public/assets/knowledeg/conversations/06.jpg";
import img7 from "@/../public/assets/knowledeg/conversations/07.png";
import img8 from "@/../public/assets/knowledeg/conversations/08.png";
import img9 from "@/../public/assets/knowledeg/conversations/09.png";

const people = [
  {
    image: img8.src,
    videoLink:
      "https://www.youtube.com/watch?v=w6oJTRqeB4A&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=9&ab_channel=TheInfravisionFoundation",
    name: "Pratap Padode",
    title:
      "Founder and President, First Construction Council, and author, Tarmac to Towers: India’s Infrastructure Story",
    desc: "Infra projects in India are invariably only 90 percent complete",
  },
  {
    image: img2.src,
    videoLink:
      "https://www.youtube.com/watch?v=g5aA3Q3af1g&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=8&ab_channel=TheInfravisionFoundation",
    name: "Jagan Shah",
    title:
      "The Infravision Foundation CEO and senior expert in urban development policy, Jagan Shah",
    desc: "Why India needs a national plan to build new cities",
  },
  {
    image: img1.src,
    videoLink:
      "https://www.youtube.com/playlist?list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em",
    name: "Professor Geetam Tiwari",
    title:
      "TRIPP Chair Professor at the Department of Civil Engineering, Indian Institute of Technology in New Delhi, India.",
    desc: "Selecting the appropriate urban transport system for India's cities",
  },
  {
    image: img7.src,
    videoLink:
      "https://www.youtube.com/watch?v=Jis2Q7oOfr0&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=6&ab_channel=TheInfravisionFoundation",
    name: "Rajaji Meshram",
    title: "Transport and Logistic Experts",
    desc: "Sustainability Ratings : an idea whose time has come",
  },
  {
    image: img5.src,
    videoLink:
      "https://www.youtube.com/watch?v=H34LNACsKZw&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=5&ab_channel=TheInfravisionFoundation",
    name: "Prof Sandip Chakrabarti",
    title: "Faculty Member, Public Systems Group, IIMA",
    desc: "Making metro systems financially viable, what needs to be done?",
  },
  {
    image: img4.src,
    videoLink:
      "https://www.youtube.com/watch?v=ZdLcdjJShW8&t=14s&ab_channel=TheInfravisionFoundation",
    name: "Rajiv Ranjan Mishra",
    title:
      "Distinguished Fellow, The Infravision Foundation, and former Director General, National Mission for Clean Ganga     ",
    desc: "Selecting the appropriate urban transport system for India's cities",
  },
  {
    image: img6.src,
    videoLink:
      "https://www.youtube.com/watch?v=5A-JtJ-jDzw&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=3&ab_channel=TheInfravisionFoundation",
    name: "Prof Gopal Naik",
    title: "Economics and Social Science, IIM Bangalore",
    desc: "How to improve warehousing in India and enhance credit availability",
  },
  {
    image: img9.src,
    videoLink:
      "https://www.youtube.com/watch?v=OjrOlknqzu4&ab_channel=TheInfravisionFoundation",
    name: "Jagan Shah",
    title:
      "The Infravision Foundation CEO and senior expert in urban development policy, Jagan Shah",
    desc: "Air Pollution: The solution has to be multi-sectoral",
  },
  {
    image: img3.src,
    videoLink:
      "https://www.youtube.com/watch?v=uzP6Vc_7IrQ&ab_channel=TheInfravisionFoundation",
    name: "Prof. G Raghuram",
    title:
      "Member, Council of Advisors, TIF, and Former Director, IIM Bangalore",
    desc: "Indian Railways : Why innovation matters",
  },





];

export default function Conversations() {
  const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);

  const handleSwiperInit = (swiper: SwiperClass) => {
    setSwiper(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section
      id="infravision-conversations"
      className="bg-whitesmoke overflow-hidden"
    >
      <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
        {/* Header Section */}
        <div className="lg:flex justify-between mb-4 lg:mb-8">
          <div className="">
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
              <h5 className="font-medium text-pink">
                Infravision conversations
              </h5>
            </div>
            <div className="py-3 max-w-4xl">
              <h1 className="text-black font-light">
                Decoding infrastructure, <br />
                <span className="text-black font-medium">
                  {" "}
                  one topic at a time.
                </span>
              </h1>
            </div>
          </div>
          <div className="max-w-xl xlg:max-w-2xl">
            <h6 className="font-light">
              Watch our Head of Advocacy, Kaveree Bamzai, zoom into key topics
              influencing{" "}
              <span className="font-medium">
                {" "}
                India's infrastructural evolution with senior experts{" "}
              </span>{" "}
              from various disciplines. From{" "}
              <span className="font-medium">
                {" "}
                health to transport, from rural planning to warehousing,
              </span>{" "}
              it's a knowledge hub for all things infrastructure.
            </h6>
            <div className="group flex mt-4">
              <Link
                href="https://www.youtube.com/playlist?list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em"
                target="_blank"
              >
                <button className="text-black text-base lg:text-xl  justify-center items-center cursor-pointer relative font-medium flex flex-row gap-2">
                  <FaYoutube className="text-[#C82249] text-3xl" />
                  View full playlist
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
            // pagination={{
            //   dynamicBullets: true,
            //   el: ".convs-custom-pagination-bullets",
            //   clickable: true,
            // }}
            // onSwiper={handleSwiperInit}
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
            {people.map((person, idx) => (
              <SwiperSlide key={idx}>
                <div className="    overflow-hidden flex flex-col h-full">
                  <div className="relative w-full h-[20rem] sm:h-[24rem] rounded-xl overflow-hidden">
                    <Image
                      src={person.image}
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
                  <div className=" text-black/90">
                    <h5 className="font-medium max-w-sm  mt-4">
                      {person.desc}
                    </h5>
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
