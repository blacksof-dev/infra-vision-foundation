"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "@/_components/molecules/infiniteCarousel.css";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

// Types
interface Association {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
  active: boolean;
}

interface AssociationResponse {
  data: Association[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export default function Association() {
  const { data: associationData } = useQuery({
    queryKey: ["homepage-associations"],
    queryFn: () =>
      getFetch<AssociationResponse>(
        "/homepage/associations?active=true&limit=100",
      ),
  });

  const associations = associationData?.data || [];

  return (
    <>
      <div
        id="homepage-section-4"
        className="blade-bottom-padding-lg blade-top-padding-lg "
      >
        <div className=" w-container">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">Our Associations</h5>
          </div>
          <div>
            <h1 className="text-black pt-2">
              <span className="font-medium text-black">
                The synergy of collaboration
              </span>
            </h1>
          </div>
        </div>
        <div className="blade-top-padding-sm">
          {associations.length > 0 && (
            <Swiper
              className=""
              modules={[Autoplay]}
              speed={4000}
              autoplay={{
                delay: 5,
                disableOnInteraction: false,
              }}
              noSwiping={true}
              loop
              grabCursor
              slidesPerView="auto"
              spaceBetween={20}
              centerInsufficientSlides={true}
              breakpoints={{
                456: {
                  slidesPerView: "auto",
                  spaceBetween: 60,
                },
                768: {
                  slidesPerView: "auto",
                  spaceBetween: 30,
                },
                960: {
                  slidesPerView: "auto",
                  spaceBetween: 50,
                },
                1020: {
                  slidesPerView: "auto",
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: "auto",
                  spaceBetween: 40,
                },
                1400: {
                  slidesPerView: "auto",
                  spaceBetween: 50,
                },
              }}
            >
              {associations.map((obj) => (
                <SwiperSlide key={obj.id} className="!w-auto ">
                  <div className="relative flex items-center w-[10rem] h-[4rem] md:w-[8rem] md:h-[3rem] xl:w-[15rem] xl:h-[6rem] ">
                    <Image
                      src={getUrl(obj.imageUrl)}
                      alt={obj.title}
                      fill
                      className="object-contain"
                      unoptimized={true}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}
