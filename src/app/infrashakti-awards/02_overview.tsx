"use client";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Navigation, Pagination } from "swiper/modules";

import waterSaviour from "@/../public/assets/infraShakti/overview/waterSaviour.png";
import urban from "@/../public/assets/infraShakti/overview/urban.png";
import transport from "@/../public/assets/infraShakti/overview/transport.png";
import ruralInfra from "@/../public/assets/infraShakti/overview/ruralInfra.png";
import renewable from "@/../public/assets/infraShakti/overview/renewable.png";
import peopleChoice from "@/../public/assets/infraShakti/overview/peopleChoice.png";
import infravisionaryAward from "@/../public/assets/infraShakti/overview/infravisionaryAward.png";
import waterSaviourAward from "@/../public/assets/infraShakti/overview/waterSaviourAward.png";
import urbanAwards from "@/../public/assets/infraShakti/overview/urbanAwards.png";
import transportAward from "@/../public/assets/infraShakti/overview/transportAward.png";
import infravisionary from "@/../public/assets/infraShakti/overview/infravisionary.png";
import peopleChoiceAward from "@/../public/assets/infraShakti/overview/peopleChoiceAward.png";
import renewableAward from "@/../public/assets/infraShakti/overview/renewableAward.png";
import ruralInfraAward from "@/../public/assets/infraShakti/overview/ruralInfraAward.png";
import { useState } from "react";

export default function Overview() {
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);

  const handleSlideChange = (swiper: SwiperClass) => {
    setIsLastSlide(swiper.isEnd);
    setIsFirstSlide(swiper.isBeginning);
  };

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
          <div className="w-full md:w-[60%] xl:w-[50%] pt-5">
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
              It features seven outstanding winners for their best
              infrastructure practices. They are selected based on a strict
              matrix of collaboration, impact, replicability, sustainability,
              and scalability.
            </h6>
          </div>
        </div>

        <div className="overflow-visible">
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

          <div className="w-container overflow-visible pt-6 sm:pt-10">
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
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.0 },
                1280: { slidesPerView: 3.0 },
                1536: { slidesPerView: 2.7 },
              }}
            >
              {OberviewDetails.map((elem, index) => (
                <SwiperSlide key={index} className="">
                  <div className="relative h-[23rem] w-full rounded overflow-hidden shadow-md">
                    <Image
                      src={elem.image}
                      alt={elem.title}
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
                          src={elem.logo}
                          alt={`${elem.title} logo`}
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

const OberviewDetails = [
  {
    image: waterSaviour,
    title: "Water Saviour Award",
    description:
      "For exceptional water conservation and management efforts that encourage community involvement while creating impactful, sustainable, and scalable innovations.",
    logo: waterSaviourAward,
  },
  {
    image: urban,
    title: "Urban Infra Hero Award",
    description:
      "For transformative urban infrastructure development led through innovative and sustainable practices.",
    logo: urbanAwards,
  },
  {
    image: ruralInfra,
    title: "Rural Infra Pioneer Award",
    description:
      "For inventive and high-impact initiativ es in rural infrastructure that significantly improve liveability across India’s hinterlands.",
    logo: ruralInfraAward,
  },
  {
    image: transport,
    title: "Transport Trailblazer Award",
    description:
      "For sustainable and innovative actions in transportation infrastructure, enhancing urban connectivity and mobility with progressive innovation.",
    logo: transportAward,
  },

  {
    image: renewable,
    title: "Renewable Energy Star Award",
    description:
      "For out-of-the-box, pro-planet initiatives in the renewable energy sector that are redefining the future of sustainability. ",
    logo: renewableAward,
  },
  {
    image: infravisionaryAward,
    title: "Infravisionary Award",
    description:
      "For key initiatives that have left a lasting impact on India's infrastructure and changed lives as well as livelihoods substantively.",
    logo: infravisionary,
  },
  {
    image: peopleChoice,
    title: "People’s Choice Award for Inclusive Infrastructure",
    description:
      "For the empowerment of disabled people through accessible and inclusive infrastructure initiatives, driving independence and equity.",
    logo: peopleChoiceAward,
  },
];
