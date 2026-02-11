"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "@/_components/molecules/infiniteCarousel.css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

interface BannerData {
  title: string;
  description: string;
  images: string[];
}

export default function Association() {
  const { data } = useQuery({
    queryKey: ["about-banner"],
    queryFn: () => getFetch<BannerData>("/content/about-us-banner"),
  });

  return (
    <>
      <div id="aboutUs" className=" relative">
        <div className="blade-top-padding-sm ">
          <Swiper className="" slidesPerView={1} autoplay modules={[Autoplay]}>
            {data?.images.map((obj, index) => (
              <SwiperSlide key={index} className="">
                <div className="relative w-screen h-screen  max-h-[450px] md:max-h-[768px] xl:max-h-[1024px]">
                  <Image
                    src={getUrl(obj)}
                    alt={obj}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="  absolute   bottom-4 sm:bottom-20 z-[22] pointer-events-none h-[45rem] w-full">
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
                About Us
              </h5>
            </div>
            <div className="  w-full ">
              <h1 className="text-white font-medium ">{data?.title}</h1>
              <div className={` py-2 sm:py-4 w-full  max-w-lg`}>
                <h5 className="text-white font-light ">{data?.description}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
