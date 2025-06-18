import React from "react";
import bg from "@/../public/assets/infrakatha/about/bgcircle.png";
import image_01 from "@/../public/assets/infrakatha/about/dilip-cherian.jpg";
import image_02 from "@/../public/assets/infrakatha/about/vinayak-chatterjee.jpg";
import image_03 from "@/../public/assets/infrakatha/about/jagan-shah.jpg";
import image_04 from "@/../public/assets/infrakatha/about/bonny-mukerjea.jpg";
import { MemberCard } from "@/_components/molecules/memberCard";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default function About() {
  const members = [
    {
      image: image_01,
      title: "Dilip Cherian",
      desig: "Member, Council of Advisors",
      link: "https://www.linkedin.com/in/dilipcherian/",
      socialMedia: "linkedin"
    },
    {
      image: image_02,
      title: "Vinayak Chatterjee",
      desig: "Founder & Managing Trustee",
      link: "https://x.com/infra_vinayakch?lang=en",
      socialMedia: "X",
    },
    {
      image: image_03,
      title: "Jagan Shah",
      desig: "Chief Executive Officer",
      link: "https://www.linkedin.com/in/jagan-shah/",
      socialMedia: "linkedin"
    },
    {
      image: image_04,
      title: "Bonny Mukerjea",
      desig: "Senior Media Executive",

    }
  ];

  return (
    <section className="relative blade-top-padding-lg blade-bottom-padding-lg bg-whitesmoke">
      <Image
        className="absolute top-0 right-0 sm:block hidden"
        src={bg}
        alt="background circle"
      ></Image>
      <div className="w-container flex flex-col xl:flex-row gap-y-6 sm:gap-y-10 overflow-hidden">
        {/* Left: Text Content */}
        <div className="flex flex-col 2xl:justify-center ">
          <div className="flex flex-row items-center gap-2 mb-2">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">About Infrakatha</h5>
          </div>
          <h1 className="text-black font-light max-w-xl">
            <span className="font-medium"> Conversations </span> that make infrastructure part of the national discourse
          </h1>
          <h5 className="text-black  mt-4 md:mt-6 md:max-w-xl xl:pr-8">
            Infrakatha is a key initiative fostering thought leadership in infrastructure-related public policies and programmes. It features distinguished experts sharing their perspectives on various aspects of infrastructure growth and innovation.

          </h5>
          <h6 className="text-darkgray  mt-2 md:max-w-xl xl:pr-8">
            The event digs deep into issues of national importance, from the centrality of pilgrim towns in ancient India to the lessons for climate change from the lost Saraswati river, from the advent of AI in reshaping the digital infra landscape to whether public private partnerships in infrastructure can be revitalised. It provides the perfect blend of storytelling, scholarship, and strategy.

          </h6>
          <div className="mt-2 sm:mt-6">
            <a
              href="#"
              className="inline-flex text-lg items-center gap-2 text-black font-medium group hover:underline hover:text-pink"
            >
              Watch the videos
              <span className=" w-6 h-6 bg-pink rounded-full flex items-center justify-center transition-colors group-hover:bg-pink">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </a>
          </div>
        </div>
        {/* Right: Hosts Cards */}
        <div className="flex flex-col justify-end ">
          <div className="lg:border-l border-l-gray lg:pl-8">
            <h6 className="text-pink font-medium mb-4">The hosts</h6>
            <div className="relative w-full xl:max-w-2xl 2xl:max-w-4xl ">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1.2}

                // navigation={{
                //   nextEl: '.swiper-button-next',
                //   prevEl: '.swiper-button-prev',
                // }}
                pagination={{
                  clickable: true,
                  el: '.custom-swiper-pagination',
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 2.3,
                    spaceBetween: 10,
                  },
                  840: {
                    slidesPerView: 2.7,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3.1,
                    spaceBetween: 10,
                  },
                  1280: {
                    slidesPerView: 2.2,
                    spaceBetween: 24,
                  },
                  1536: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                className="!overflow-visible sm:!overflow-hidden"
              >
                {members.map((member, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center">
                      <MemberCard
                        image={member.image}
                        title={member.title}
                        desig={member.desig}
                        link={member.link}
                        socialMedia={member.socialMedia}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>


              {/* <div className="swiper-button-prev !text-pink !w-10 !h-10 !bg-white !rounded-full !shadow-md hover:!bg-pink hover:!text-white transition-colors duration-300"></div>
              <div className="swiper-button-next !text-pink !w-10 !h-10 !bg-white !rounded-full !shadow-md hover:!bg-pink hover:!text-white transition-colors duration-300"></div> */}


              <div className="custom-swiper-pagination space-x-2 w-fit mx-auto sm:ml-auto sm:mr-4 mt-4 "></div>
            </div>
          </div>
        </div>
      </div>
      {/* <style jsx global>{`
        .swiper-pagination-bullet {
          background: #C82249 !important;
          opacity: 0.3; 
          
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style> */}
    </section>
  );
}
