"use client";
import Image from "next/image";
import youtubeSvg from "@/../public/assets/globals/youtubeSvg.svg";
import LinkedinCard from "@/_components/molecules/CommonCardTemplate";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import { useState } from "react";

export default function Decoding() {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const handleSlideChange = (swiper: any) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };
  return (
    <>
      <section className="bg-whitesmoke">
        <div className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">Infravision Conversations</h5>
          </div>
          <div className="py-3 ">
            <h1 className="text-black tracking-[3%] font-light">
              <span className="text-black/90 font-medium tracking-[3%]">
                Decoding infrastructure,
              </span>
              <br />
              one topic at a time
            </h1>
          </div>
          <div className="flex flex-col-reverse  lg:flex-row gap-6  pt-4">
            <div className="w-full lg:w-[50%]">
              <LinkedinCard />
            </div>
            <div className="w-full  lg:w-[50%] ">
              <div className="pt-1  lg:border-l-1 lg:border-darkgray/40 lg:px-5 xl:px-16">
                <div>
                  <h3 className="text-black tracking-[-2%]">
                    Infrastructure is all around us, yet its impact often goes
                    unnoticed. But is it as distant as it seems?{" "}
                  </h3>
                </div>
                <div className="py-4">
                  <h6 className="text-black/80">
                    Watch our Head of Advocacy, Kaveree Bamzai, zoom into key
                    topics influencing India’s infrastructural evolution with
                    senior experts from various disciplines. From health to
                    transport, from rural planning to warehousing, it’s a
                    knowledge hub for all things infrastructure.
                  </h6>
                </div>

                <div className="group">
                  <Link href="https://www.youtube.com/@theinfravisionfoundation" target="_blank">
                    <button className="text-black text-md lg:text-xl  cursor-pointer relative font-medium flex flex-row gap-2">
                      <Image src={youtubeSvg} alt="Youtube Icon" />
                      Explore the playlist
                      <div className="w-10 sm:w-20 h-[1px] sm:h-[2px] group-hover:w-full absolute bottom-0 left-0 top-9 bg-pink transition-all duration-1000"></div>
                    </button>
                  </Link>
                </div>
                <div className="lg:flex  hidden  flex-wrap gap-5 justify-center  lg:justify-start md:gap-5 pt-9">
                  <button
                    className={`swiper-solution-prev-decoding flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white`}
                    aria-label="Previous slide"
                  >
                    <GoArrowLeft />
                  </button>
                  <button
                    className={`swiper-solution-next-decoding flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white`}
                    aria-label="Next slide"
                  >
                    <GoArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
