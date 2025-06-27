"use client";
import Portal from "@/_components/atoms/popupPortal";
import { MoveLeft, MoveRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const galleryImages = [
    {
        image: "assets/infrapandit/gallery/01.png",
        description: "The Infravision Foundation team members Vrinda Singh, Research Associate, Rumjhum Chatterjee, TIF Co-Founder and Managing Trustee, Vinayak Chatterjee, Founder and Managing Trustee, Jagan Shah, CEO, and Kaveree Bamzai, Head, Advocacy."
    },
    {
        image: "assets/infrapandit/gallery/02.png",
        description: "Council of Advisors and Distinguished Fellows in conversations at the InfraPandit Awards launch event."
    },
    {
        image: "assets/infrapandit/gallery/03.png",
        description: "Founder and Managing Trustee of The Infravision Foundation, Vinayak Chatterjee, announces the launch of the InfraPandit Awards. Also pictured are Co-Founder and  Managing Trustee Rumjhum Chatterjee, Trustee Kiran Karnik, and Council of Advisors members Saumya Kanti Ghosh and Prof G Raghuram."
    },
    {
        image: "assets/infrapandit/gallery/04.png",
        description: "Members and key stakeholders of The Infravision Foundation at the launch of the InfraPandit Awards 2025."
    },
    {
        image: "assets/infrapandit/gallery/05.png",
        description: "Council of Advisors Member Nasser Munjee in action."
    },
    {
        image: "assets/infrapandit/gallery/06.png",
        description: "Strategic discussions underway at the launch event of the InfraPandit Awards launch event."
    },
    {
        image: "assets/infrapandit/gallery/07.png",
        description: "Saumya Kanti Ghosh, Member, Council of Advisors and Jury Member, engages with the attendees. Also in the frame are Rumjhum Chatterjee, Co-Founder and  Managing Trustee, with Kiran Karnik, Trustee."
    },
    {
        image: "assets/infrapandit/gallery/08.png",
        description: "The Infravision Foundation Co-Founder and Managing Trustee Rumjhum Chatterjee takes the dias."
    },
    {
        image: "assets/infrapandit/gallery/09.png",
        description: "Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, delivers her welcome address."
    },
    {
        image: "assets/infrapandit/gallery/10.png",
        description: "Rumjhum Chatterjee, Co-Founder and Managing Trustee and Vinayak Chatterjee, Founder and Managing Trustee, engage in conversation with the attendees."
    },
    {
        image: "assets/infrapandit/gallery/11.png",
        description: "Jagan Shah, CEO, The Infravision Foundation; Saumya Kanti Ghosh, Member, Council of Advisors and Jury Member; Akhilesh Tilotia, Distinguished Fellow; and Praveen Khangta, Head, Strategy, Investment and Portfolio Development, The Convergence Foundation, during a discussion."
    },
    {
        image: "assets/infrapandit/gallery/12.png",
        description: "Key stakeholders and attendees share a light moment."
    },
    {
        image: "assets/infrapandit/gallery/13.png",
        description: "Dr. Janmejaya Sinha, Council of Advisors Member, shares his views and insights."
    },
    {
        image: "assets/infrapandit/gallery/14.png",
        description: "Dilip Cherian, Top Image Consultant and Council of Advisors Member, addressing his peers."
    },
    {
        image: "assets/infrapandit/gallery/15.png",
        description: "Trustee Kiran Karnik (at podium) addresses the audience at the launch of the InfraPandit Awards. Pictured alongside are Council of Advisors member Saumya Kanti Ghosh, Co-Founder and Managing Trustee Rumjhum Chatterjee, Council of Advisors member  Prof G Raghuram, and Founder and Managing Trustee Vinayak Chatterjee."
    },

];

export default function Gallery() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleClickOnImage = (index: number) => {
        setCurrentIndex(index)
        setIsOpen(true)
    }
    return (
        <>
            <div className="bg-whitesmoke">
                <div className="blade-top-padding-lg blade-bottom-padding-lg w-container">
                    <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
                        <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                        <h5 className="font-medium text-pink">Gallery</h5>
                    </div>
                    <div className="py-2 ">
                        <h1 className="text-black  font-light">
                            From the
                            <span className="text-black/90 font-medium ">
                                ceremony
                            </span>
                        </h1>
                    </div>
                    <div className="columns-3  overflow-visible md:columns-3 lg:columns-5 gap-3 pt-8 space-y-2">
                        {galleryImages.map((ele, index) => (
                            <div key={index} onClick={() => handleClickOnImage(index)} className="overflow-hidden">
                                <Image
                                    src={ele.image}
                                    alt={`InfraShakti Photo ${index + 1}`}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover rounded hover:scale-105 transition-all duration-300 ease-linear"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                    {isOpen && (
                        <Portal>
                            <div className="w-screen h-screen p-3  fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex">
                                <div className="relative w-[30rem] h-[38rem] bg-black m-auto">
                                    <Image
                                        className="object-cover z-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                                        fill
                                        src={galleryImages[currentIndex].image}
                                        unoptimized
                                        quality={100}
                                        alt={galleryImages[currentIndex].description}
                                    ></Image>
                                    <div className="absolute bottom-4 z-10 w-full">
                                        <p className="px-3 text-base xl:text-lg text-white text-center font-light">{galleryImages[currentIndex].description}</p>
                                    </div>
                                    <div className="z-10  absolute top-1/2 -translate-y-1/2 flex w-full px-3 sm:px-4 justify-between">
                                        <button
                                            disabled={currentIndex === 0}
                                            onClick={() => setCurrentIndex((prev) => prev - 1)}
                                            className="bg-white p-2 rounded-full text-pink hover:bg-pink hover:text-white transition-all duration-300 ease-linear disabled:opacity-[50%] cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-pink"
                                        >
                                            <MoveLeft />
                                        </button>
                                        <button
                                            disabled={currentIndex >= galleryImages.length - 1}
                                            onClick={() => setCurrentIndex((prev) => prev + 1)}
                                            className="bg-white p-2 rounded-full text-pink hover:bg-pink hover:text-white transition-all duration-300 ease-linear disabled:opacity-[50%] cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-pink"
                                        >
                                            <MoveRight />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-2 right-2 z-10 bg-pink p-1  rounded-full text-white hover:bg-white hover:text-pink transition-all duration-300 ease-linear   cursor-pointer hover:scale-[1.05] "
                                    >
                                        <X />
                                    </button>
                                </div>
                            </div>
                        </Portal>
                    )}
                </div>
            </div>
        </>
    );
}
