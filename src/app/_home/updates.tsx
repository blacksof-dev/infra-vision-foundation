import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { useApiHook } from "@/lib/useApi";
import { getImageUrl } from "@/lib/functionCalling";

interface updateApiResponse {
  image: string;
  category: string;
  title: string;
  btnTitle: string;
  link: string;
}

export default function Updates() {
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [updates, setUpdates] = useState<updateApiResponse[]>([]); 

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };

  const { data,  } = useApiHook<any>({
    url: "/homepage/latest-updates",
    cacheKey: "latestUpdate",
  });

  useEffect(() => {

    if (data) {
      const arr: updateApiResponse[] = [];

      if (data.blog) {
        arr.push({
          image: data.blog.coverImage,
          category: data.blog.sectors?.[0]?.name ?? "Blog",
          title: data.blog.title,
          btnTitle: "Read Blog",
          link: data.blog.docFile || "#",
        });
      }

      if (data.researchPaper) {
        arr.push({
          image: data.researchPaper.image,
          category: "Research Paper",
          title: data.researchPaper.title,
          btnTitle: "Read Paper",
          link: data.researchPaper.link,
        });
      }

      if (data.video) {
        arr.push({
          image: data.video.image,
          category: data.video.categories?.[0]?.name ?? "Video",
          title: data.video.title,
          btnTitle: "Watch Video",
          link: data.video.link,
        });
      }

      if (data.newsletter) {
        arr.push({
          image: data.newsletter.coverImage,
          category: data.newsletter.version,
          title: data.newsletter.title,
          btnTitle: "Watch Video",
          link: data.newsletter.fileUrl,
        });
      }

      setUpdates(arr); 
    }
  }, [data]); 

 
  if (!updates.length) return null;

  return (
    <section>
      <div className="xl:flex flex-row gap-8">
        {/* Left Column */}
        <div className="border-r border-white/50 xl:block hidden">
          <div>
            <h4 className="text-white me-4 text-nowrap">Latest updates</h4>
            <div className="flex gap-5 py-4 justify-center lg:justify-start md:gap-4">
              <button
                disabled={isFirstSlide}
                className="swiper-solution-prev-btn-hero disabled:opacity-50 cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink"
              >
                <GoArrowLeft />
              </button>
              <button
                disabled={isLastSlide}
                className="swiper-solution-next-btn-hero disabled:opacity-50 cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink"
              >
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:max-w-[80rem] xlg:max-w-[100rem]">
          <Swiper
            className="!overflow-visible xl:!overflow-hidden"
            modules={[Navigation, Autoplay, Pagination]}
            navigation={{
              prevEl: ".swiper-solution-prev-btn-hero",
              nextEl: ".swiper-solution-next-btn-hero",
            }}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={500}
            spaceBetween={10}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 1.8, spaceBetween: 20 },
              1024: { slidesPerView: 2 },
              1440: { slidesPerView: 2.3 },
            }}
            onSlideChange={handleSlideChange}
          >
            {updates.map((ele, index) => (
              <SwiperSlide key={index} className="group">
                <Link href={ele.link} target="_blank">
                  <div className="flex flex-row gap-4 bg-[#0000005e] backdrop-blur-[10px] shadow-blur rounded-lg p-2 md:p-4 h-[7rem] sm:h-[9rem] lg:h-[10rem] xl:h-[13rem] xlg:h-[16rem] 2xl:h-[18rem] group-hover:bg-white transition-all duration-500 ease-linear">
                    <div className="w-[5rem] h-full md:w-[14rem] lg:w-[13rem] xl:w-[20rem] xlg:w-[30rem] relative">
                      <Image
                        src={getImageUrl(ele.image)}
                        alt={ele.title}
                        fill
                        className="object-cover object-center md:object-left rounded aspect-auto"
                      />
                    </div>
                    <div className="my-auto w-[60%] flex flex-col h-full">
                      <div className="flex items-center gap-3">
                        <span className="w-[10px] h-[10px] rounded-full bg-white group-hover:bg-pink" />
                        <p className="font-light text-sm md:text-lg text-white group-hover:text-black">
                          {ele.category}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <h5 className="text-white font-medium text-base xl:text-xl lg:font-normal group-hover:text-black line-clamp-2 xl:line-clamp-3 xlg:line-clamp-4">
                          {ele.title}
                        </h5>
                        <div className="flex gap-2 lg:gap-4 items-center justify-center group cursor-pointer w-fit mt-2">
                          <h5 className="text-sm sm:text-lg text-white group-hover:text-black">
                            {ele.btnTitle}
                          </h5>
                          <button
                            aria-label="latest card redirection"
                            className="rounded-sm p-1 md:p-2 border-2 bg-white border-white group-hover:border-transparent w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 group-hover:bg-pink"
                          >
                            <GoArrowRight className="text-pink group-hover:text-white text-2xl z-[2]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
