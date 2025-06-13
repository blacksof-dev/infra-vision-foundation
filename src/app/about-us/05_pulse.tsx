import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import img1 from "@/../public/assets/about-us/pulse/sectors/image-1.png";
import img2 from "@/../public/assets/about-us/pulse/sectors/image-2.png";
import img3 from "@/../public/assets/about-us/pulse/sectors/image-3.png";
import img4 from "@/../public/assets/about-us/pulse/sectors/image-4.png";
import img5 from "@/../public/assets/about-us/pulse/sectors/image-5.png";
import img6 from "@/../public/assets/about-us/pulse/sectors/image-6.png";
import img7 from "@/../public/assets/about-us/pulse/sectors/image-7.png";
import Link from "next/link";

const Pulse = () => {

    const data = [
        {
            icon: "/assets/about-us/pulse/icon-1.png",
            title: "Research",
            desc: "To decongest key infrastructure issues with in-depth evaluation, analysis, and recommendations across the historical, current, and future perspectives."
        },
        {
            icon: "/assets/about-us/pulse/icon-2.png",
            title: "Knowledge",
            desc: "Emanating from national and international domain experts, the knowledge and counsel inform and shape public policymaking in infrastructure."
        },
        {
            icon: "/assets/about-us/pulse/icon-1.png",
            title: "Capacity building",
            desc: "Targeted to enable impactful implementation of the recommendations, capacity-building programmes revitalise on-ground operations spanning management, execution, and governance."
        },
    ]

    return (
        <section className='blade-top-padding blade-bottom-padding-lg bg-[#F6F6F6]'>
            <div className="w-container flex justify-between items-center blade-bottom-margin">
                <div>
                    <div className="flex  flex-row  items-center gap-2 md:gap-3">
                        <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                        <h5 className="font-medium text-pink text-sm xl:text-lg">Our core</h5>
                    </div>
                    <div className="pt-4 pb-2 md:py-5 flex justify-between">
                        <h1 className="text-black font-light">Transformation <br /> grounded in <span className='font-medium'>insights, <br /> knowledge, and action</span></h1>
                    </div>
                </div>
                <div className="w-full md:w-[45%]">
                    <h6 className="text-black  tracking-[1%] mb-4 text-sm xl:text-lg">
                        To become ‘Viksit Bharat’ by 2047, India needs to address its infrastructure gaps swiftly and efficiently through proportionate, need-specific developments. Developments that are innovative, inclusive, steadfast, and sustainable. This demands active link between policymakers, private institutions, and citizens through increased awareness and collaboration.
                    </h6>
                    <h6><span className='font-medium text-sm xl:text-lg'>The Infravision Foundation</span> thrusts this journey forward with pragmatic reasoning, remedial approach, and strategic advocacy. The fluent voice of wisdom here stands on three essential pillars.</h6>
                </div>
            </div>
            <div className='w-container'>
                <div className=' border-[#5D6468] border-t border-b py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'>
                    {
                        data.map((elem, idx) => {
                            return (
                                <div key={idx} className={` w-container py-10
                                    ${idx === 1 ? ' xl:border-r xl:border-[#5D6468]' : ''} 
                                    ${idx !== data.length - 1 ? 'xl:border-r xl:border-[#5D6468]' : ''}
                                `}>
                                    <img src={elem.icon} alt="" />
                                    <h4 className='font-medium my-5'>{elem.title}</h4>
                                    <p className=''>{elem.desc}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='overflow-hidden blade-top-margin'>
                <div className='flex items-center justify-between w-container'>
                    <div className="flex  flex-row  items-center gap-2 md:gap-3">
                        <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                        <h5 className="font-medium text-pink">Sectors of operation</h5>
                    </div>
                    <div className="hidden lg:block">
                            <div className="flex gap-5 py-4 justify-center  lg:justify-start md:gap-4 ">
                                <button
                                    className={`swiper-solution-prev-btn-hero cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white
                                }`}

                                >
                                    <GoArrowLeft />
                                </button>
                                <button
                                    className={`swiper-solution-next-btn-hero cursor-pointer flex sm:h-10 sm:w-10 h-8 w-8 items-center justify-center rounded-full bg-pink text-xl text-white
                                }`}

                                >
                                    <GoArrowRight />
                                </button>
                            </div>
                        </div>
                </div>
                <div className="">
                    <div
                        className="max-sm:px-2 sm:w-[98%] lg:w-[95%] xl:w-[90%] origin-left ml-auto"
                    >
                        <Swiper
                            modules={[Navigation, Autoplay, Pagination]}
                            navigation={{
                                prevEl: ".swiper-solution-prev-btn-hero",
                                nextEl: ".swiper-solution-next-btn-hero",
                            }}
                            pagination={{
                                el: ".custom-pagination-bullets-banner",
                                type: 'fraction',
                            }}
                            loop
                            grabCursor={true}
                            speed={500}
                            spaceBetween={20}
                            slidesPerView={1.5}
                            breakpoints={{
                                200: {
                                    slidesPerView: 1.2,
                                },
                                435: {
                                    slidesPerView: 1.2,
                                },
                                500: { slidesPerView: 2 },
                                768: { slidesPerView: 2.2 },
                                1024: { slidesPerView: 2.9 },
                                1280: { slidesPerView: 3.5 },
                                1536: { slidesPerView: 4.23 },
                            }}
                        // onSlideChange={handleSlideChange}
                        >
                            {EventsDetails.map((elem, index) => (
                                <SwiperSlide key={index} className="!w-fit group ">
                                    <Link href={elem.link} target="_blank">
                                        <div className="relative flex flex-row gap-4 rounded-lg p-2 md:p-4 w-[19rem]  xl:w-[35rem]  h-[17rem]   xl:h-[22rem] group-hover:bg-white">
                                            <Image
                                                    src={elem.image}
                                                    alt={elem.title}
                                                    fill
                                                    className="object-cover object-left rounded"
                                            />
                                            <h4 className='text-white absolute bottom-5'>{elem.title}</h4>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}

const EventsDetails = [
    {
        image: img1,
        category: "News & media",
        title: "Transportation",
        btnTitle: "Read more",
        link: "https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html",
    },
    {
        image: img2,
        category: "Upcoming event",
        title:
            "Energy",
        btnTitle: "Register now",
        link: "https://www.youtube.com/watch?v=o6nb3IejARc&t=13s&ab_channel=TheInfravisionFoundation",
    },
    {
        image: img3,
        category: "Research paper",
        title: "Water and Sanitation",
        btnTitle: "Read more",
        link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
    },
    {
        image: img4,
        category: "InfraKatha",
        title:
            "Urban Planning",
        btnTitle: "Watch now",
        link: "https://www.youtube.com/watch?v=o6nb3IejARc&t=13s&ab_channel=TheInfravisionFoundation",
    },
    {
        image: img5,
        category: "Blog",
        title: "Rural and Agri Infra",
        btnTitle: "Read more",
        link: "https://theinfravisionfoundation.org/2023/11/25/poor-regulatory-capacity-of-the-warehousing-and-development-regulatory-authority-impacts-warehouse-based-sales-of-agri-commodities-and-issue-of-e-negotiable-warehouse-receipts/",
    },
    {
        image: img6,
        category: "Blog",
        title: "Health Infra",
        btnTitle: "Read more",
        link: "https://theinfravisionfoundation.org/2023/11/25/poor-regulatory-capacity-of-the-warehousing-and-development-regulatory-authority-impacts-warehouse-based-sales-of-agri-commodities-and-issue-of-e-negotiable-warehouse-receipts/",
    },
    {
        image: img7,
        category: "Blog",
        title: "Education",
        btnTitle: "Read more",
        link: "https://theinfravisionfoundation.org/2023/11/25/poor-regulatory-capacity-of-the-warehousing-and-development-regulatory-authority-impacts-warehouse-based-sales-of-agri-commodities-and-issue-of-e-negotiable-warehouse-receipts/",
    },
];

export default Pulse