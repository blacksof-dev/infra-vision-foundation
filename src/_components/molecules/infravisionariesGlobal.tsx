"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import type { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import dynamic from "next/dynamic";
const PopupDescription = dynamic(() => import("@/app/_home/popupDescription"), {
  ssr: false,
});
const MemberCard = dynamic(() => import("@/_components/molecules/memberCard"), {
  ssr: false,
});
import { useApiHook } from "@/lib/useApi";
import React from "react";
import Loading from "@/app/loading";

type ButtonTabProps = {
  label: string;
  value: string;
  data: string;
  setdata: (val: string) => void;
  role?:string;
};

export type CardData = {
  image: string;
  title: string;
  desig: string;
  link?: string;
  subtitle?: string;
  socialMedia?: string;
  popupImg: string;
  popupdesc: string;
};

interface TrusteesApiResponse {
  trustees: CardData[];
  advisors: CardData[];
  fellow: CardData[];
  patrons: CardData[];
  team: CardData[];
  totalCount: number;
  lastUpdated: string;
}

interface MobileMembersSliderProps {
  title: string;
  data: CardData[];
  navClass: string;
  socialMedia?: string;
  onSelectTab: () => void;
  setShowPopup: (show: boolean) => void;
  popupData?: CardData;
  setPopUpData: (data: CardData) => void;
  showPopup: boolean;
  role?:string;
}

const ButtonTab = ({ label, value, data,role, setdata }: ButtonTabProps) => {
  return (
    <div className="py-4 group">
      <button
        className={` ${role==="home"?"text-white":"text-darkgray"}  cursor-pointer text-md text-nowrap lg:text-xl relative ${data === value ? "font-medium opacity-100" : "opacity-70"
          }`}
        onClick={() => setdata(value)}
      >
        {label}
        <span
          className={`h-[1px] ${data === value
            ? "w-full transition-all duration-1000"
            : "w-10 sm:w-5"
            } sm:h-[2px] ${role==="home"?"bg-white":"bg-darkgray"}  absolute bottom-0 left-0 top-7`}
        ></span>
      </button>
    </div>
  );
};

export default function InfravisionariesGlobal({role}:{role:string}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [data, setdata] = useState("trustee");
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [carddata, setcarddata] = useState<CardData[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupData, setPopUpData] = useState<CardData | undefined>();
  const [isMobile, setMobile] = useState<boolean>(false);

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

  const { data: trusteesData } = useApiHook<TrusteesApiResponse>({
    url: "/teams/trustees",
    cacheKey: "trustee",
  });

  const { data: patronData } = useApiHook<TrusteesApiResponse>({
    url: "/teams/patrons",
    cacheKey: "patron",
  });

  const { data: advisorsData } = useApiHook<TrusteesApiResponse>({
    url: "/teams/advisors",
    cacheKey: "advisors",
  });

  const { data: fellowData } = useApiHook<TrusteesApiResponse>({
    url: "/teams/fellow",
    cacheKey: "fellows",
  });

  const { data: teamData } = useApiHook<TrusteesApiResponse>({
    url: "/teams/team",
    cacheKey: "teams",
  });

  useEffect(() => {
    let cardDetails: CardData[] = [];

    switch (data) {
      case "trustee":
        cardDetails = trusteesData?.trustees ?? [];
        break;
      case "advisory":
        cardDetails = advisorsData?.advisors ?? [];
        break;
      case "fellow":
        cardDetails = fellowData?.fellow ?? [];
        break;
      case "team":
        cardDetails = teamData?.team ?? [];
        break;
      case "patrons":
        cardDetails = patronData?.patrons ?? [];
        break;
      default:
        cardDetails = [];
    }

    setcarddata(cardDetails);
  }, [data, trusteesData]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth <= 786) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    handleResize();
  }, []);

  return (
    <>
      <section id="homepage-section-03" className="relative">
        <div className=" blade-top-padding-lg blade-bottom-padding-lg">
          <div className="md:flex flex-row  w-container hidden blade-top-margin-sm ">
            <div className=" border-r-1 pe-20 border-white/40">
              <ButtonTab
                label="Trustees"
                value="trustee"
                data={data}
                setdata={setdata}
                role={role}
                
              />
              <ButtonTab
                label="Founding Patrons"
                value="patrons"
                data={data}
                setdata={setdata}
                role={role}
               
              />
              <ButtonTab
                label="Council of Advisors"
                value="advisory"
                data={data}
                setdata={setdata}
                role={role}
               
              />
              <ButtonTab
                label="Distinguished Fellows"
                value="fellow"
                data={data}
                setdata={setdata}
                role={role}
              
              />

              <ButtonTab
                label="Team"
                value="team"
                data={data}
                setdata={setdata}
               role={role}
               
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
                        <div
                          onClick={() => {
                            setPopUpData(ele);
                            setShowPopup(true);
                          }}
                          className="h-fit w-fit hover:cursor-pointer"
                        >
                          <Suspense
                            fallback={
                              <section className="w-full h-[40rem] flex items-center justify-center">
                                <Loading />
                              </section>
                            }
                          >
                            <MemberCard
                              image={ele.image}
                              title={ele.title}
                              desig={ele.desig}
                              link={ele.link}
                              socialMedia={ele.socialMedia}
                            />
                          </Suspense>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="flex pt-3 pr-1 h-[80px] flex-wrap gap-5 mt-4 justify-end md:gap-4 2xl:mt-1">
                <button
                  disabled={isFirstSlide}
                  className={`swiper-prev-btn-members disabled:opacity-50 cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full ${role==="home"?"bg-white  text-pink hover:ring-white":"bg-pink text-white "}  text-xl hover:ring-1  transition-all duration-300 ease-linear`}
                  aria-label="Previous slide"
                >
                  <GoArrowLeft />
                </button>
                <button
                  disabled={isLastSlide}
                  className={`swiper-next-btn-members disabled:opacity-50  cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full ${role==="home"?"bg-white  text-pink hover:ring-white":"bg-pink text-white"}  text-xl  hover:ring-1  transition-all duration-300 ease-linear`}
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
          {isMobile && (
            <div>
              <MobileMembersSlider
                title="Trustees"
                data={trusteesData?.trustees ?? []}
                navClass="trustee"
                setShowPopup={setShowPopup}
                setPopUpData={setPopUpData}
                popupData={popupData}
                showPopup={showPopup}
                  role={role}
                onSelectTab={() => setdata("trustee")}
              />
              <MobileMembersSlider
                title="Founding Patrons"
                data={patronData?.patrons ?? []}
                navClass="patrons"
                setShowPopup={setShowPopup}
                setPopUpData={setPopUpData}
                popupData={popupData}
                showPopup={showPopup}
                  role={role}
                onSelectTab={() => setdata("patrons")}
              />

              <MobileMembersSlider
                title="Council of Advisors"
                data={advisorsData?.advisors ?? []}
                navClass="advisory"
                setShowPopup={setShowPopup}
                setPopUpData={setPopUpData}
                popupData={popupData}
                showPopup={showPopup}
                  role={role}
                onSelectTab={() => setdata("advisory")}
              />

              <MobileMembersSlider
                title="Distinguished Fellows"
                data={fellowData?.fellow ?? []}
                navClass="fellow"
                setShowPopup={setShowPopup}
                setPopUpData={setPopUpData}
                popupData={popupData}
                showPopup={showPopup}
                  role={role}
                onSelectTab={() => setdata("fellow")}
              />

              <MobileMembersSlider
                title="Team"
                data={teamData?.team ?? []}
                navClass="team"
                setShowPopup={setShowPopup}
                setPopUpData={setPopUpData}
                popupData={popupData}
                showPopup={showPopup}
                  role={role}
                onSelectTab={() => setdata("team")}
              />
            </div>
          )}
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
  popupData,
  showPopup,
  role,
}: MobileMembersSliderProps) => {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showPopup]);

  return (
    <div className="md:hidden block pb-7 px-3 overflow-hidden">
      <div className="py-5">
        <button
          className="text-white text-lg text-nowrap lg:text-xl relative font-medium"
          onClick={onSelectTab}
        >
          {title}
        </button>
      </div>

      <div className="w-full overflow-x-visible sm:overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          className="!overflow-visible sm:!overflow-hidden"
          grabCursor
          slideToClickedSlide
          onSlideChange={handleSlideChange}
          slidesPerView={1.1}
          centeredSlides={false}
          navigation={{
            prevEl: `.prevbtn${navClass}`,
            nextEl: `.nextbtn${navClass}`,
          }}
          breakpoints={{
            425: { slidesPerView: 1.3, spaceBetween: 10 },
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
                  socialMedia={ele.socialMedia}
                />
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

      <div className="flex flex-row justify-end mt-4 ">
        <div className="flex w-fit gap-3">
          <button
            disabled={isFirstSlide}
            className={`prevbtn${navClass} disabled:opacity-50 cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full ${role==="home"?"bg-white  text-pink hover:ring-white":"bg-pink text-white "}  text-xl `}
            aria-label="Previous slide"
          >
            <GoArrowLeft />
          </button>
          <button
            disabled={isLastSlide}
            className={`nextbtn${navClass} disabled:opacity-50 cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full ${role==="home"?"bg-white  text-pink hover:ring-white":"bg-pink text-white "}  text-xl `}
            aria-label="Next slide"
          >
            <GoArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
