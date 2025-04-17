import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import jaganShahMobileImg from "@/../public/assets/home/decoding/jaganShahMobileImg.svg";
import geetamTiwariMobileImg from "@/../public/assets/home/decoding/geetamTiwariMobileImg.svg";
import profRaghuramMobileImg from "@/../public/assets/home/decoding/profRaghuramMobileImg.svg";
import rajivRanjanMishraMobileImg from "@/../public/assets/home/decoding/rajivRanjanMishraMobileImg.svg";

import Jaganshah from "@/../public/assets/home/decoding/Jaganshah.png";
import GeetamTiwari from "@/../public/assets/home/decoding/GeetamTiwari.png";
import ProfGRaghuram from "@/../public/assets/home/decoding/ProfGRaghuram.png";
import RajivRanjanMishra from "@/../public/assets/home/decoding/RajivRanjanMishra.png";

export default function LinkedinCard() {
  return (
    <>
      <div className="relative">
        <div className="absolute top-0 right-0 h-full w-[20%] " />

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".swiper-solution-prev-decoding",
            nextEl: ".swiper-solution-next-decoding",
          }}
          loop
          grabCursor
          slideToClickedSlide
          speed={1000}
          pagination={{
            el: ".custom-pagination-bullets-decoding",
            type: 'fraction',
          }}
          
          spaceBetween={10}
          breakpoints={{
            500: { slidesPerView: 1.1, spaceBetween: 50 },
            640: { slidesPerView: 1.3, spaceBetween: 50 },
            768: { slidesPerView: 1.5, spaceBetween: 40 },
            1024: { slidesPerView: 1, spaceBetween: 35 },
            1280: { slidesPerView: 1, spaceBetween: 35 },
            1536: { slidesPerView: 1.2, spaceBetween: 30 },
          }}
        >
          {cardData.map((ele, index) => (
            <SwiperSlide key={index}>
              <section className="mt-3">
                <div className="relative  lg:block hidden">
                  <Image
                    src={ele.image}
                    alt={ele.title}
                    className="w-full h-full"
                  />
                </div>
                <div className="lg:hidden block">
                  <Image
                    src={ele.mobileImg}
                    alt={ele.title}
                    className="w-full h-full"
                  />
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex   justify-between">
        <div className="flex lg:hidden   gap-3  justify-start mt-7  md:gap-8 2xl:mt-1 ">
          <button
            className={`swiper-solution-prev-decoding flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white `}
            aria-label="Previous slide"
          >
            <GoArrowLeft />
          </button>
          <button
            className={`swiper-solution-next-decoding flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white `}
            aria-label="Next slide"
          >
            <GoArrowRight />
          </button>
        </div>
        <div className="lg:hidden  w-fit h-4 mt-auto flex gap-2 justify-end custom-pagination-bullets-decoding"></div>
      </div>
    </>
  );
}

const cardData = [
  {
    image: jaganShahMobileImg,
    mobileImg: Jaganshah,
    title: "Air Pollution: The solution has to be multi-sectoral",
    subtitle: "Jagan shah",
    desc: "Premier Urbanist, Senior expert in urban development policy and Distinguished Fellow,The Infravision Foundation",
    subdesc: "",
  },
  {
    image: geetamTiwariMobileImg,
    mobileImg: GeetamTiwari,
    title:
      "Selecting the Appropriate Urban Transport System for India's Cities",
    subtitle: "Professor Geetam Tiwari",
    desc: "  TRIPP Chair Professor in Department of Civil Engineering, Indian Institute of Technology in New Delhi, India.",
    subdesc: "",
  },
  {
    image: profRaghuramMobileImg,
    mobileImg: ProfGRaghuram,
    title: "Indian Railways : Why Innovation Matters",
    subtitle: "Prof.G Raghuram",
    desc: "Member, Council of Advisors, TIF, and Former Director, IIM Bangalore",
    subdesc: "",
  },

  {
    image: rajivRanjanMishraMobileImg,
    mobileImg: RajivRanjanMishra,
    title: "How to save our hill cities",
    subtitle: "Rajiv Ranjan Mishra",
    desc: "Distinguished Fellow, The Infravision Foundation, and former Director General, National Mission for Clean Ganga",
    subdesc: "",
  },
];
