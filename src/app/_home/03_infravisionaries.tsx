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
import PopupDescription from "./popupDescription";

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
  popupImg: string;
  popupdesc?: string;
}

interface MobileMembersSliderProps {
  title: string;
  data: CardData[];
  navClass: string;
  paginationClass: string;
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
              <ButtonTab
                label="Team"
                value="team"
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
                        <div className=" flex realtive flex-col w-[19rem]  h-[19rem]">
                          <Image
                            src={ele.image}
                            alt={ele.title}
                            className="w-full h-full object-cover rounded"
                          />
                          <div className="absolute  bottom-0 left-0 w-[17rem]  ">
                            {ele.link ? (
                              <Link
                                href={ele.link ? ele.link : ""}
                                target="_blank"
                                className="group"
                              >
                                <div className="ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                                  <svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                    className="fill-[#5D6468] group-hover:fill-[#C82249] transition-colors duration-300" // Add transition for smooth effect
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                                  </svg>
                                </div>
                              </Link>
                            ) : (
                              <div className="group-hover:bg-pink  ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                                <div className=" ">
                                  <svg
                                    width="26"
                                    height="26"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                    className="fill-[#5D6468] group-hover:fill-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                                  </svg>
                                </div>
                              </div>
                            )}
                            <div className="bg-white w-[14rem]   lg:h-[5.5rem]  rounded">
                              <h6
                                onClick={() => {
                                  setPopUpData(ele);
                                  setShowPopup(true);
                                }}
                                className="pt-1 2xl:pt-2 px-2 cursor-pointer
                                 font-medium hover:text-pink hover:font-semibold"
                              >
                                {ele.title}
                              </h6>
                              <p className="px-2  text-sm font-light text-black">
                                {ele.desig}
                              </p>
                            </div>
                          </div>
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
            {showPopup && popupData && (
              <PopupDescription
                onclose={() => setShowPopup(false)}
                data={popupData}
              />
            )}
          </div>

          <MobileMembersSlider
            title="Trustees"
            data={trustee}
            navClass="trustee"
            paginationClass="custom-pagination-bullets-members"
            setShowPopup={setShowPopup}
            setPopUpData={setPopUpData}
            popupData={popupData}
            showPopup={showPopup}
            onSelectTab={() => setdata("trustee")}
          />

          <MobileMembersSlider
            title="Advisory"
            data={advisory}
            navClass="advisory"
            setShowPopup={setShowPopup}
            setPopUpData={setPopUpData}
            popupData={popupData}
            showPopup={showPopup}
            paginationClass="custom-pagination-bullets-advisory"
            onSelectTab={() => setdata("advisory")}
          />

          <MobileMembersSlider
            title="Fellows"
            data={fellow}
            navClass="fellow"
            setShowPopup={setShowPopup}
            setPopUpData={setPopUpData}
            popupData={popupData}
            showPopup={showPopup}
            paginationClass="custom-pagination-bullets-fellow"
            onSelectTab={() => setdata("fellow")}
          />

          <MobileMembersSlider
            title="Team"
            data={team}
            navClass="team"
            setShowPopup={setShowPopup}
            setPopUpData={setPopUpData}
            popupData={popupData}
            showPopup={showPopup}
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
  setShowPopup,
  setPopUpData,
  popupData,
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
              <div className="flex realtive flex-col w-[19rem] h-[19rem]">
                <Image
                  src={ele.image}
                  alt={ele.title}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 w-[17rem]">
                  {ele.link ? (
                    <Link
                      href={ele.link ? ele.link : ""}
                      target="_blank"
                      className="group"
                    >
                      <div className="ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          className="fill-[#5D6468] group-hover:fill-[#C82249] transition-colors duration-300" // Add transition for smooth effect
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                        </svg>
                      </div>
                    </Link>
                  ) : (
                    <div className="group-hover:bg-pink  ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
                      <div className=" ">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          className="fill-[#5D6468] group-hover:fill-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="bg-white w-[14rem] lg:h-[5.5rem] rounded">
                    <h6
                      onClick={() => {
                        setPopUpData(ele);
                        setShowPopup(true);
                      }}
                      className="pt-1 2xl:pt-2 px-2 font-medium"
                    >
                      {ele.title}
                    </h6>
                    <p className="px-2 text-sm font-light text-black">
                      {ele.desig}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {showPopup && popupData && (
          <PopupDescription
            onclose={() => setShowPopup(false)}
            data={popupData}
          />
        )}
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
