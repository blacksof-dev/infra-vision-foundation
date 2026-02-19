"use client";
import Portal from "@/_components/atoms/popupPortal";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { useEffect, useState } from "react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import image_01 from "@/../public/assets/outreach-and-engagements/highlight/dummy.png";

import { MdClose } from "react-icons/md";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaPlay } from "react-icons/fa";
import { getUrl } from "@/lib/getUrl";

export default function EventDetailsPopup({
  onClose,
  data,
}: {
  onClose: () => void;
  data: any;
}) {
  const [images, setImages] = useState([
    { image: image_01.src, description: "" },
  ]);

  useEffect(() => {
    if (data?.details?.images) {
      setImages(data.details.images);
    } else {
      setImages([{ image: image_01.src, description: "" }]);
    }
  }, [data?.details?.images]);
  return (
    <Portal>
      <div className="fixed inset-0 p-2  sm:p-3 flex overflow-aut bg-darkgray/40 backdrop-blur-sm z-[9999]">
        <div className="bg-white rounded-lg w-full max-w-lg my-auto mx-auto lg:w-full h-full lg:max-h-[44rem] lg:max-w-screen-xl relative ">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 z-[10] bg-pink cursor-pointer rounded-full p-1 text-white text-2xl ml-auto focus:outline-none"
          >
            <MdClose />
          </button>

          <div className="flex flex-col lg:flex-row gap-4 md:gap-8 p-3 md:p-6 h-full overflow-hidden">
            {/* IMAGE SWIPER SECTION */}
            <div className="relative  w-full min-h-[19rem] sm:min-h-[21rem] md:h-[25rem] lg:w-[50%] lg:h-full ">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="h-full w-full rounded-md"
              >
                {images.map((obj, idx) => (
                  <SwiperSlide key={idx}>
                    {data?.details?.cta?.link.includes("www.youtube.com") ? (
                      <Link
                        href={data?.details?.cta?.link}
                        target="_blank"
                        className="relative w-full h-[19rem] sm:h-[21rem] md:h-[25rem] lg:h-full block md:bg-black"
                      >
                        <Image
                          src={obj.image}
                          alt={`Event image ${idx + 1}`}
                          fill
                          unoptimized
                          quality={100}
                          className="object-cover object-top rounded-md w-full md:[mask-image:linear-gradient(to_bottom,black,transparent)] "
                        />
                        <div className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <button className="w-12 h-12 xl:w-14 xl:h-14 rounded-full cursor-pointer mx-auto bg-white flex items-center justify-center group-hover:bg-pink transition-all duration-100">
                            <FaPlay className="text-pink text-base xl:text-xl group-hover:text-white" />
                          </button>
                        </div>
                        <p className="absolute bottom-6 text-white px-4 text-center lg:block hidden">
                          {obj.description}
                        </p>
                      </Link>
                    ) : (
                      <div className="relative w-full h-[19rem] sm:h-[21rem] md:h-[25rem] lg:h-full md:bg-black">
                        <Image
                          src={obj.image}
                          alt={`Event image ${idx + 1}`}
                          fill
                          unoptimized
                          quality={100}
                          className="object-cover object-top rounded-md w-full md:[mask-image:linear-gradient(to_bottom,black,transparent)]"
                        />
                        <p className="absolute bottom-6 text-white px-4 text-center lg:block hidden">
                          {obj.description}
                        </p>
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* TEXT SECTION */}
            <div className="flex flex-col w-full lg:w-[60%] pt-2 overflow-hidden xl:pr-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-pink rounded-full block"></span>
                <p className=" text-[#333]">{data?.meetingType}</p>
              </div>
              <h2 className="font-semibold">{data?.desc}</h2>
              <h6 className="text-pink font-medium sm:pt-1 ">
                {/* {data?.details?.date}  */}
                {
                  new Date(data?.details?.date).toLocaleString("en-US",{
                    month:"long",
                    day:"2-digit",
                    year:"numeric" 
                  })
                }
              </h6>
              {data?.details && (
                <div className="overflow-y-auto h-full pr-2 mt-2  sm:mt-3">
                  {data?.details?.content
                    .split("\n")
                    .map(
                      (paragraph: any, index: number) =>
                        paragraph.trim() && (
                          <p
                            key={index}
                            className="text-black  text-sm md:text-base mt-6 first:mt-0"
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        )
                    )}
                </div>
              )}
              {data?.details?.cta && (
                <div>
                  <Link
                    target="_blank"
                    href={data?.details?.cta?.link.startsWith("/assets/pdf/") ? getUrl(data?.details?.cta?.link): data?.details?.cta?.link}
                    className=" text-pink flex items-center gap-2 cursor-pointer  group"
                  >
                    {data?.details?.cta?.ctaText}{" "}
                    <span className="flex justify-center items-center border border-lightgray rounded-sm p-1 group-hover:bg-pink group-hover:text-white group-hover:border-pink transition duration-300 ease-linear">
                      <ArrowRight width={14} height={14} className="text-sm" />
                    </span>
                  </Link>
                </div>
              )}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
