"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "@/_components/molecules/infiniteCarousel.css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
export default function Association() {
  return (
    <>
      <div className=" relative">
        <div className="blade-top-padding-sm ">
          <Swiper className="" slidesPerView={1} autoplay modules={[Autoplay]}>
            {data.map((obj, index) => (
              <SwiperSlide key={index} className="">
                <div className="relative w-screen h-screen sm:block hidden">
                  <Image
                    src={obj.logo}
                    alt={obj.id}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative w-screen h-screen block sm:hidden">
                  <Image
                    src={obj.mobilelogo}
                    alt={obj.id}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="  absolute   bottom-20 z-[22] pointer-events-none h-[45rem] w-full">
          <div className="w-container   top-9  sm:top-12 md:top-18 flex flex-col  justify-between h-full">
            <div className="flex flex-row   gap-1 ">
              <Link href="/">
                <svg
                  className="fill-white "
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.8"
                    d="M14.2891 0.351685L0.730469 12.5549H4.42827V23.6483H13.0565V16.2527H15.5217V23.6483H24.1499V12.5549H27.8477L14.2891 0.351685ZM14.2891 3.66911L21.6847 10.3256V11.3223V21.1831H17.9869V13.7875H10.5913V21.1831H6.89347V10.3256L14.2891 3.66911Z"
                  />
                </svg>
              </Link>
              <h5 className="text-white font-light flex flex-row z-[22]">
                <RiArrowRightSLine className="text-[24px]" />
                About us
              </h5>
            </div>
            <div className="  w-full ">
              <h1 className="text-white font-medium ">About us</h1>
              <div className={` py-2 sm:py-4 w-full  max-w-lg`}>
                <h5 className="text-white font-light ">
                  Nation at heart. Infrastructure in mind.<br/> Economic prosperity
                  in action.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const data = [
  {
    id: "1",
    logo: "/assets/about-us/bannerBg.png",
    mobilelogo:"/assets/about-us/mobile1.png"
  },
  {
    id: "2",
    logo: "/assets/about-us/bannerBg1.png",
     mobilelogo:"/assets/about-us/mobile2.png"
  },
  {
    id: "3",
    logo: "/assets/about-us/bannerBg2.png",
     mobilelogo:"/assets/about-us/mobile3.png"
  },
];
