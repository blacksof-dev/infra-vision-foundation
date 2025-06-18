"use client";
import { useState, useRef, useEffect } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import type { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { MemberCard } from "@/_components/molecules/memberCard";
import { CardData, Guests, Preeminent, jury } from "./static";

type ButtonTabProps = {
  label: string;
  value: string;
  data: string;
  setdata: (val: string) => void;
};

interface MobileMembersSliderProps {
  title: string;
  data: CardData[];
  navClass: string;
  onSelectTab: () => void;
  setShowPopup: (show: boolean) => void;
  popupData?: CardData;
  setPopUpData: (data: CardData) => void;
  showPopup: boolean;
}

const ButtonTab = ({ label, value, data, setdata }: ButtonTabProps) => {
  return (
    <div className="py-4 group">
      <button
        className={`text-white cursor-pointer text-md text-nowrap lg:text-xl relative ${
          data === value ? "font-medium" : ""
        }`}
        onClick={() => setdata(value)}
      >
        {label}
        <span
          className={`h-[1px] ${
            data === value
              ? "w-full transition-all duration-1000"
              : "w-10 sm:w-5"
          } sm:h-[2px] bg-white absolute bottom-0 left-0 top-7`}
        ></span>
      </button>
    </div>
  );
};

export default function Luminaries() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [data, setdata] = useState("jury");
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [carddata, setcarddata] = useState<CardData[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupData, setPopUpData] = useState<CardData | undefined>();
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
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showPopup]);

  useEffect(() => {
    let cardDetails: CardData[] = [];

    switch (data) {
      case "Guests":
        cardDetails = Guests;
        break;
      case "Preeminent":
        cardDetails = Preeminent;
        break;
      case "jury":
        cardDetails = jury;
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
            <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white "></span>
              <h5 className="font-medium text-white">The jurors and guests of honour</h5>
            </div>
            <div className="pt-4 pb-2 md:py-5 ">
              <h1 className="text-white font-medium">
               Luminaries{" "}
                <span className="font-light">
                  at the <br />
                  InfraShakti Awards
                </span>
              </h1>
            </div>
          </div>

          <div className="md:flex flex-row blade-top-padding-sm w-container hidden ">
            <div className=" border-r-1 pe-20 border-white/40">
             <ButtonTab
                label="The esteemed jury"
                value="jury"
                data={data}
                setdata={setdata}
              />
              <ButtonTab
                label="Guests of honour"
                value="Guests"
                data={data}
                setdata={setdata}
              />
              <ButtonTab
                label="Preeminent leaders"
                value="Preeminent"
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
                        <div className="h-fit w-fit hover:cursor-pointer">
                          <MemberCard
                            image={ele.image}
                            title={ele.title}
                            desig={ele.desig}
                            link={ele.link}
                          />
                        </div>
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
            title="Guests of honour"
            data={Guests}
            navClass="Guests"
            setShowPopup={setShowPopup}
            setPopUpData={setPopUpData}
            popupData={popupData}
            showPopup={showPopup}
            onSelectTab={() => setdata("Guests")}
          />

          <MobileMembersSlider
            title="Preeminent leaders"
            data={Preeminent}
            navClass="Preeminent"
            setShowPopup={setShowPopup}
            setPopUpData={setPopUpData}
            popupData={popupData}
            showPopup={showPopup}
            onSelectTab={() => setdata("Preeminent")}
          />

          <MobileMembersSlider
            title="The esteemed jury"
            data={jury}
            navClass="jury"
            setShowPopup={setShowPopup}
            setPopUpData={setPopUpData}
            popupData={popupData}
            showPopup={showPopup}
            onSelectTab={() => setdata("jury")}
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
  onSelectTab,
  setShowPopup,
  setPopUpData,
  showPopup,
}: MobileMembersSliderProps) => {
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showPopup]);

  return (
    <div className="md:hidden block pb-7 px-2">
      <div className="py-5">
        <button
          onClick={onSelectTab}
          className="text-white text-md text-nowrap lg:text-xl relative font-medium"
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
              <div
                onClick={() => {
                  setPopUpData(ele);
                  setShowPopup(true);
                }}
                className="h-fit w-fit hover:cursor-pointer"
              >
                <MemberCard
                  image={ele.image}
                  title={ele.title}
                  desig={ele.desig}
                  link={ele.link}
                />
              </div>
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
      </div>
    </div>
  );
};
