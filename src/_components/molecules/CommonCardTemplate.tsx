import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import playSvg from "@/../public/assets/globals/playSvg.svg";
import jaganShah from "@/../public/assets/home/decoding/jaganShah.jpg";
import geetamTiwari from "@/../public/assets/home/decoding/geetamTiwari.jpg";
import profRaghuram from "@/../public/assets/home/decoding/profRaghuram.jpg";
import rajivRanjanMishra from "@/../public/assets/home/decoding/rajivRanjanMishra.jpg";


import jaganShahMobileImg from "@/../public/assets/home/decoding/jaganShahMobileImg.png";
import geetamTiwariMobileImg from "@/../public/assets/home/decoding/geetamTiwariMobileImg.png";
import profRaghuramMobileImg from "@/../public/assets/home/decoding/profRaghuramMobileImg.png";
import rajivRanjanMishraMobileImg from "@/../public/assets/home/decoding/rajivRanjanMishraMobileImg.png";



export default function LinkedinCard() {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 h-full w-[20%] " />

      <Swiper
        modules={[Navigation, Pagination]}
        loop
        grabCursor
        slideToClickedSlide
        speed={2000}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          reverseDirection: true,
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
                <Image src={ele.image} alt={ele.title} className="w-full" />

                <div className="absolute top-0 right-0   pr-5 pt-6">
                  <div className=" w-[55%]   ms-auto last:text-end ">
                    <h2 className="text-white tracking-tight font-medium">
                      {ele.title}
                    </h2>
                  </div>
                </div>

                <div className="w-[50%]">
                  <div className="absolute left-[15rem] top-[7rem]  lg:left-[15rem] lg:top-[7rem]   xl:left-[22rem] xl:top-[15rem] 2xl:left-[20rem]  2xl:top-[10rem]">
                    <div className="bg-white  w-[3rem] h-[3rem]  xl:w-[4rem] xl:h-[3rem] flex items-center justify-center ">
                      <Image
                        src={playSvg}
                        alt="Play Icon"
                        className="w-6 h-6"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0  left-0">
                    <div className="bg-white w-[17rem]  md:w-[15rem] lg:w-[17rem]  h-[7.5rem] lg:h-[7rem]   xl:w-[20rem] 2xl:w-[20rem] 2xl:h-[8rem] pt-3 px-2 ">
                      <h5 className="font-medium">{ele.subtitle}</h5>
                      <p className="py-1 text-black/80 text-sm">{ele.desc}</p>
                    </div>
                  </div>

                </div>
              </div>
              <div className="lg:hidden block">
                 <Image src={ele.mobileImg} alt={ele.title} className="w-full h-full" />
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const cardData = [
  {
    image: jaganShah,
    mobileImg:jaganShahMobileImg,
    title: "Air Pollution: The solution has to be multi-sectoral",
    subtitle: "Jagan shah",
    desc: "Premier Urbanist, Senior expert in urban development policy and Distinguished Fellow, TIF",
    subdesc: "",
  },
  {
    image: geetamTiwari,
    mobileImg:geetamTiwariMobileImg,
    title:
      "Selecting the Appropriate Urban Transport System for India's Cities",
    subtitle: "Professor Geetam Tiwari",
    desc: "  TRIPP Chair Professor in Department of Civil Engineering, Indian Institute of Technology in New Delhi, India.",
    subdesc: "",
  },
  {
    image: profRaghuram,
    mobileImg:profRaghuramMobileImg,
    title: "Indian Railways : Why Innovation Matters",
    subtitle: "Prof.G Raghuram",
    desc: "Member, Council of Advisors, TIF, and Former Director, IIM Bangalore",
    subdesc: "",
  },

  {
    image: rajivRanjanMishra,
    mobileImg:rajivRanjanMishraMobileImg,
    title: "How to save our hill cities",
    subtitle: "Rajiv Ranjan Mishra",
    desc: "Distinguished Fellow, The Infravision Foundation, and former Director General, National Mission for Clean Ganga",
    subdesc: "",
  },
];
