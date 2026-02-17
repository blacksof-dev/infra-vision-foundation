"use client";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

interface Awards {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export default function Overview() {
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };

  const { data } = useQuery({
    queryKey: ["infrashakti-overview"],
    queryFn: () => getFetch<Awards[]>("/infrashakti/types-of-awards/active"),
  });

  if (!data) return null;

  return (
    <>
      <div className="blade-top-padding-sm blade-bottom-padding-lg overflow-hidden">
        <div className="w-container ">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">Overview</h5>
          </div>
          <div className="py-2 ">
            <h1 className="text-black  font-light">
              Recognising
              <span className="text-black/90 font-medium ">
                {" "}
                outstanding infrastructure
              </span>
              <br /> practices across the nation
            </h1>
          </div>
          <div className="w-full md:w-[60%]  xl:w-[50%] pt-5">
            <h6>
              The <span className="font-medium">InfraShakti Awards,</span> a
              flagship initiative of{" "}
              <span className="font-medium">The Infravision Foundation </span>
              and <span className="font-medium">NDTV</span>, celebrates
              individuals and organisations turning the tide in India’s
              infrastructure landscape. These pioneers harness the true power of
              infrastructure to ease citizens' lives and catalyse holistic
              development.
            </h6>

            <h6 className="pt-4">
              Featuring seven outstanding winners for best infrastructure
              practices fulfilling a strict matrix of collaboration, innovation,
              replicability, sustainability, and scalability.
            </h6>
          </div>
        </div>

        <div className="overflow-visible  w-container">
          <div className="flex flex-row justify-end mt-4 ">
            <div className="flex w-fit gap-3">
              <button
                disabled={isFirstSlide}
                className={`swiper-solution-prev-btn-overview disabled:opacity-50 cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white`}
                aria-label="Previous slide"
              >
                <GoArrowLeft />
              </button>
              <button
                disabled={isLastSlide}
                className={`swiper-solution-next-btn-overview disabled:opacity-50 cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white`}
                aria-label="Next slide"
              >
                <GoArrowRight />
              </button>
            </div>
          </div>

          <div className="w-container overflow-visible pt-6 sm:pt-10 ">
            <Swiper
              modules={[Navigation, Pagination]}
              className="!overflow-visible  w-full"
              navigation={{
                prevEl: ".swiper-solution-prev-btn-overview",
                nextEl: ".swiper-solution-next-btn-overview",
              }}
              onSlideChange={handleSlideChange}
              grabCursor={true}
              speed={500}
              spaceBetween={20}
              slidesPerView={1.5}
              breakpoints={{
                200: {
                  slidesPerView: 1.1,
                },
                435: {
                  slidesPerView: 1.2,
                },
                500: { slidesPerView: 2 },
                768: { slidesPerView: 1.5 },
                1024: { slidesPerView: 1.8 },
                1280: { slidesPerView: 2.2 },
                1536: { slidesPerView: 2.5 },
              }}
            >
              {data.map((elem, index) => (
                <SwiperSlide key={index} className="">
                  <div className="relative h-[18rem] sm:h-[23rem] w-full  rounded overflow-hidden shadow-md ">
                    <Image
                      src={getUrl(elem.image)}
                      alt={elem.title}
                      fill
                      className="w-full h-full object-cover"
                      unoptimized={true}
                    />

                    <div className="absolute bottom-2 left-2 z-40  bg-white rounded-xl p-2  2xl:p-4  2xl:pr-20 w-[85%] max-w-[32rem]   md:h-[10rem]   2xl:h-[9rem]">
                      <h6 className="text-black text-lg font-semibold mb-1">
                        {elem.title}
                      </h6>
                      <p className="text-sm text-black/80 ">
                        {elem.description}
                      </p>

                      <div className="absolute -top-6 -right-1 md:-right-3 p-1 translate-x-1/2 -translate-y-1/2 w-14 h-14 2xl:w-24 2xl:h-24 bg-white rounded-md flex items-center justify-center">
                        <Image
                          src={getUrl(elem.icon)}
                          alt={`${elem.title} logo`}
                          width={80}
                          height={80}
                          className="w-18 h-18 object-contain"
                          unoptimized={true}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
