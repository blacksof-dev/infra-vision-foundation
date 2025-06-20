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

import image_01 from "@/../public/assets/outreach-and-engagements/eventImages/17_april_01.png";
import image_02 from "@/../public/assets/outreach-and-engagements/eventImages/17_april_02.png";
import image_03 from "@/../public/assets/outreach-and-engagements/eventImages/17_april_03.png";
import image_04 from "@/../public/assets/outreach-and-engagements/eventImages/17_april_04.png";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { ArrowRight } from "lucide-react";



// const data = {
//     title: "Annual get-together",
//     meetingType: "Internal Meetings",
//     desig: "April 17, 2025",
//     popupdesc: `The Infravision Community huddled to celebrate achievements and strengthen collaborative networks to advance India's infrastructure agenda. This annual gathering showcased the Foundation's growing influence while fostering deeper connections among policy practitioners and thought leaders.<br/><br/>
// The celebration featured a compelling short film documenting the Foundation's comprehensive impact, highlighting published research papers and advocacy events that shaped national infrastructure discourse. The presentation revealed the foundation's expanding influence across policy circles and public discourse.<br/><br/>
// Distinguished sitarist Mehtab Ali Niazi provided cultural enrichment, masterfully blending classical Indian music with English classics and contemporary pop, including Ed Sheeran adaptations.<br/><br/>
// The evening demonstrated the Foundation's belief that creativity, ideas, and inspiration extend beyond boardrooms and conference halls into cultural expression and community building.`
// };

export default function EventDetailsPopup({ onClose, data }: { onClose: () => void, data: any }) {
    const [images, setImages] = useState([image_01.src, image_02.src, image_03.src, image_04.src]);

    useEffect(() => {
        if (data?.details?.images) {
            setImages(data.details.images);
        } else {
            setImages([image_01.src, image_02.src, image_03.src, image_04.src]);
        }
    }, [data?.details?.images]);
    return (
        <Portal>
            <div className="fixed inset-0 p-2 sm:p-3 flex overflow-aut bg-darkgray/40 backdrop-blur-sm z-[9999]">
                <div className="bg-white rounded-lg w-full max-w-lg my-auto mx-auto lg:w-full h-full lg:max-h-[44rem] lg:max-w-screen-xl relative ">
                    <button onClick={onClose} className="absolute right-2 top-2 z-[10] bg-pink cursor-pointer rounded-full p-1 text-white text-2xl ml-auto focus:outline-none"><MdClose /></button>

                    <div className="flex flex-col lg:flex-row gap-4 md:gap-8 p-3 md:p-6 h-full overflow-hidden">
                        {/* IMAGE SWIPER SECTION */}
                        <div className="relative w-full min-h-[19rem] sm:min-h-[21rem] md:h-[25rem] lg:w-[50%] lg:h-full ">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                loop={true}
                                className="h-full w-full rounded-md"
                            >
                                {images.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="relative w-full h-[19rem] sm:h-[21rem] md:h-[25rem] lg:h-full">
                                            <Image
                                                src={img}
                                                alt={`Event image ${idx + 1}`}
                                                fill
                                                unoptimized
                                                className="object-cover object-top rounded-md w-full"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        {/* TEXT SECTION */}
                        <div className="flex flex-col w-full lg:w-[60%] pt-2 overflow-hidden xl:pr-10">
                            <div className='flex items-center gap-2 mb-2'>
                                <span className='w-3 h-3 bg-pink rounded-full block'></span>
                                <p className=' text-[#333]'>{data?.meetingType}</p>
                            </div>
                            <h2 className="font-semibold">{data?.desc}</h2>
                            <h6 className="text-pink font-medium sm:pt-1">{data?.details?.date}</h6>
                            {data?.details && (
                                <div className="overflow-y-auto h-full pr-2 mt-2 sm:mt-3">
                                    {data?.details?.content.split('\n').map((paragraph: any, index: number) => (
                                        paragraph.trim() && (
                                            <p
                                                key={index}
                                                className="text-black text-sm md:text-base pt-2 first:pt-0"
                                                dangerouslySetInnerHTML={{ __html: paragraph }}
                                            />
                                        )
                                    ))}
                                </div>
                            )}
                            {
                                data?.details?.cta &&
                                <div>
                                    <Link target="_blank" href={data?.details?.cta?.link}
                                        className='pt-3 text-pink flex items-center gap-2 cursor-pointer  group'>
                                        {data?.details?.cta?.ctaText} <span className='flex justify-center items-center border border-lightgray rounded-sm p-1 group-hover:bg-pink group-hover:text-white group-hover:border-pink transition duration-300 ease-linear'><ArrowRight width={14} height={14} className='text-sm' /></span>
                                    </Link>
                                </div>

                            }
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
