"use client";

import { useState, useRef, useEffect } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import type { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { advisory, CardData, fellow, team, trustee } from "./static";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { MemberCard } from "@/_components/molecules/MemberCard";

type ButtonTabProps = {
  label: string;
  value: string;
  data: string;
  setdata: (val: string) => void;
};

interface Member {
  image: StaticImageData;
  title: string;
  desig: string;
  link?: string;
}

interface MobileMembersSliderProps {
  title: string;
  data: Member[];
  navClass: string;
  paginationClass: string;
  onSelectTab?: () => void;
}



const ButtonTab = ({ label, value, data, setdata }: ButtonTabProps) => {
  return (
    <div className="py-4 group">
      <button
        className={`text-white cursor-pointer text-md text-nowrap lg:text-xl relative ${data === value ? "font-medium" : ""
          }`}
        onClick={() => setdata(value)}
      >
        {label}
        <span
          className={`h-[1px] ${data === value
            ? "w-full transition-all duration-1000"
            : "w-10 sm:w-5"
            } sm:h-[2px] bg-white absolute bottom-0 left-0 top-7`}
        ></span>
      </button>
    </div>
  );
};



export default function Infravisionaries() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [data, setdata] = useState("trustee");
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [carddata, setcarddata] = useState<CardData[]>([]);
  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      swiperInstance.slideTo(0, 0);
    }
  }, [data]);

  useEffect(() => {
    let cardDetails: CardData[] = [];

    switch (data) {
      case "trustee":
        cardDetails = trustee;
        break;
      case "advisory":
        cardDetails = advisory;
        break;
      case "fellow":
        cardDetails = fellow;
        break;
      case "team":
        cardDetails = team;
        break;
      default:
        cardDetails = [];
    }

    setcarddata(cardDetails);
  }, [data]);

  return (
    <>
      <section className="bg-pink relative">
        <div className=" absolute top-0 xl:right-8 2xl:right-28 xl:block hidden">
          <svg
            width="594"
            height="427"
            viewBox="0 0 594 427"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <circle
                cx="130.108"
                cy="130.108"
                r="129.737"
                transform="matrix(-0.914239 -0.405175 -0.405175 0.914239 593.496 -18.2383)"
                stroke="#D9D9D9"
                strokeWidth="0.742301"
              />
              <circle
                opacity="0.3"
                cx="153.523"
                cy="153.523"
                r="153.523"
                transform="matrix(-0.914239 -0.405175 -0.405175 0.914239 405.117 93.9883)"
                fill="#D9D9D9"
              />
            </g>
          </svg>
        </div>
        <div className=" blade-top-padding-lg blade-bottom-padding-lg">
          <div className="w-container">
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white "></span>
              <h5 className="font-medium text-white">Our core</h5>
            </div>
            <div className="pt-4 pb-2 md:py-5 ">
              <h1 className="text-white font-medium">The Infravisionaries</h1>
              <div className="w-full md:w-[45%]">
                <h6 className="text-white  tracking-[1%] py-4">
                  The Infravision Foundation is a confluence of seasoned leaders
                  from across the infrastructure domain. With exceptional
                  intellect, global experience, and shared purpose, this
                  consortium propels India's infrastructure and economic growth.
                </h6>
              </div>
            </div>
          </div>

          <div className="md:flex flex-row  w-container hidden ">
            <div className=" border-r-1 pe-20 border-white/40">
              <ButtonTab
                label="Team"
                value="team"
                data={data}
                setdata={setdata}
              />
              <ButtonTab
                label="Trustees"
                value="trustee"
                data={data}
                setdata={setdata}
              />
              <ButtonTab
                label="Advisory Council"
                value="advisory"
                data={data}
                setdata={setdata}
              />
              <ButtonTab
                label="Distinguished Fellows"
                value="fellow"
                data={data}
                setdata={setdata}
              />
            </div>

            <div className="w-full overflow-x-hidden  ml-[4%]">
              <div className="">
                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  modules={[Navigation]}
                  className="!pl-10%"
                  watchOverflow={true}
                  navigation={{
                    prevEl: ".swiper-prev-btn-members",
                    nextEl: ".swiper-next-btn-members",
                  }}
                  grabCursor={true}
                  spaceBetween={10}
                  onSlideChange={handleSlideChange}
                  slidesPerView={1.1}
                  centeredSlides={false}
                  breakpoints={{
                    500: { slidesPerView: 1.5, centeredSlides: false },
                    768: { slidesPerView: 2.2, centeredSlides: false },
                    1024: { slidesPerView: 2, centeredSlides: false },
                    1280: { slidesPerView: 2.9, centeredSlides: false },
                    1536: {
                      slidesPerView: 3.5,
                      centeredSlides: false,
                    },
                  }}
                >
                  {carddata.map((ele, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        className="w-screen overflow-hidden"
                      >
                        <MemberCard
                          image={ele.image}
                          title={ele.title}
                          desig={ele.desig}
                          link={ele.link}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="flex pt-3  h-[80px] flex-wrap gap-5 mt-4 justify-start md:gap-4 2xl:mt-1">
                <button
                  className={`swiper-prev-btn-members  cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink`}
                  aria-label="Previous slide"
                >
                  <GoArrowLeft />
                </button>
                <button
                  className={`swiper-next-btn-members  cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink `}
                  aria-label="Next slide"
                >
                  <GoArrowRight />
                </button>
              </div>
            </div>
          </div>

          <MobileMembersSlider
            title="Trustees"
            data={trustee}
            navClass="trustee"
            paginationClass="custom-pagination-bullets-members"
            onSelectTab={() => setdata("trustee")}
          />

          <MobileMembersSlider
            title="Advisory"
            data={advisory}
            navClass="advisory"
            paginationClass="custom-pagination-bullets-advisory"
            onSelectTab={() => setdata("advisory")}
          />

          <MobileMembersSlider
            title="Fellows"
            data={fellow}
            navClass="fellow"
            paginationClass="custom-pagination-bullets-fellow"
            onSelectTab={() => setdata("fellow")}
          />

          <MobileMembersSlider
            title="Team"
            data={team}
            navClass="team"
            paginationClass="custom-pagination-bullets-team"
            onSelectTab={() => setdata("team")}
          />
        </div>
      </section>
    </>
  );
}

export const MobileMembersSlider = ({
  title,
  data,
  navClass,
  paginationClass,
  onSelectTab,
}: MobileMembersSliderProps) => {
  return (
    <div className="md:hidden block pb-7 px-2">
      <div className="py-5">
        <button
          className="text-white text-md text-nowrap lg:text-xl relative font-medium"
          onClick={onSelectTab}
        >
          {title}
        </button>
      </div>

      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          grabCursor
          slideToClickedSlide
          slidesPerView={1.1}
          centeredSlides={false}
          navigation={{
            prevEl: `.prevbtn${navClass}`,
            nextEl: `.nextbtn${navClass}`,
          }}
          pagination={{
            el: `.${paginationClass}`,
            type: "fraction",
          }}
          breakpoints={{
            425: { slidesPerView: 1.3, spaceBetween: 20 },
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 10 },
            1024: { slidesPerView: 2.5, spaceBetween: 50 },
            1280: { slidesPerView: 3.1, spaceBetween: 20 },
            1536: { slidesPerView: 3.4, spaceBetween: 30 },
          }}
        >
          {data.map((ele, index) => (
            <SwiperSlide key={index}>
              <MemberCard
                image={ele.image}
                title={ele.title}
                desig={ele.desig}
                link={ele.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-row justify-between mt-4 px-2">
        <div className="flex w-fit gap-3">
          <button
            className={`prevbtn${navClass} cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink`}
            aria-label="Previous slide"
          >
            <GoArrowLeft />
          </button>
          <button
            className={`nextbtn${navClass} cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-white text-xl text-pink`}
            aria-label="Next slide"
          >
            <GoArrowRight />
          </button>
        </div>
        <div
          className={`lg:hidden my-auto h-4 flex gap-1 flex-1 justify-end ${paginationClass}`}
        />
      </div>
    </div>
  );
};
