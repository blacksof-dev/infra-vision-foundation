"use client";
import Portal from "@/_components/atoms/popupPortal";
import { MoveLeft, MoveRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  {
    image: "/assets/infrapandit/gallery/01.jpg",
    description:
      "The Infravision Foundation team members Vrinda Singh, Research Associate; Rumjhum Chatterjee, Co-Founder and Managing Trustee; Vinayak Chatterjee, Founder and Managing Trustee; Jagan Shah, CEO; and Kaveree Bamzai, Head, Advocacy.",
  },
  {
    image: "/assets/infrapandit/gallery/infrapandit_award9.png",
    description:
      "Sthaladipti Saha, Senior VP & Head – Buildings & Factories, L&T Ltd, delivers his address at the awards ceremony.",
  },
  {
    image: "/assets/infrapandit/gallery/03.JPG",
    description:
      "Founder and Managing Trustee of The Infravision Foundation, Vinayak Chatterjee, announces the launch of the InfraPandit Awards. Also pictured are Co-Founder and  Managing Trustee Rumjhum Chatterjee, Trustee Kiran Karnik, and Council of Advisors members Soumya Kanti Ghosh and Prof G Raghuram.",
  },
  {
    image: "/assets/infrapandit/gallery/04.jpeg",
    description:
      "Members and key stakeholders of The Infravision Foundation at the launch of the InfraPandit Awards 2025.",
  },

  {
    image: "/assets/infrapandit/gallery/infrapandit_award2.png",
    description:
      "Sthaladipti Saha, Senior VP & Head – Buildings & Factories, L&T Ltd; Rumjhum Chatterjee, Co-Founder and Managing Trustee, TIF; and Vinayak Chatterjee, Founder and Managing Trustee, TIF, present the Uttam Award to Dr Shubham Jain.",
  },
  {
    image: "/assets/infrapandit/gallery/infrapandit_award8.png",
    description:
      "Vinayak Chatterjee, Founder and Managing Trustee, TIF, shares his thoughts with attendees at the awards ceremony.",
  },
  {
    image: "/assets/infrapandit/gallery/infrapandit_award4.png",
    description:
      "The first InfraPandits, Dr Shubham Jain and Dr Paresh Jawarilal Chhajed, with members of the Jury and TIF leadership.",
  },
  {
    image: "/assets/infrapandit/gallery/10.png",
    description:
      "Rumjhum Chatterjee, Co-Founder and Managing Trustee and Vinayak Chatterjee, Founder and Managing Trustee, engage in conversation with the attendees.",
  },
  {
    image: "/assets/infrapandit/gallery/08.png",
    description:
      "The Infravision Foundation Co-Founder and Managing Trustee Rumjhum Chatterjee takes the podium.",
  },

  {
    image: "/assets/infrapandit/gallery/infrapandit_award6.png",
    description:
      "(From right to left) Chief Guest Sthaladipti Saha, Jury member Savita Mahajan, and TIF dignitaries lighting the ceremonial lamp at the InfraPandit Awards.",
  },

  {
    image: "/assets/infrapandit/gallery/11.png",
    description:
      "Jagan Shah, CEO, The Infravision Foundation; Soumya Kanti Ghosh, Member, Council of Advisors and Jury Member; Akhilesh Tilotia, Distinguished Fellow; and Praveen Khangta, Head, Strategy, Investment, and Portfolio Development, The Convergence Foundation, during a discussion.",
  },
  {
    image: "/assets/infrapandit/gallery/infrapandit_award3.png",
    description:
      "Sthaladipti Saha, Senior VP & Head – Buildings & Factories, L&T Ltd; Rumjhum Chatterjee, Co-Founder and Managing Trustee, TIF; and Vinayak Chatterjee, Founder and Managing Trustee, TIF, present the Mahaan Award to Dr Paresh Jawarilal Chhajed.",
  },
  {
    image: "/assets/infrapandit/gallery/infrapandit_award7.png",
    description:
      "(From right to left) Chief Guest Sthaladipti Saha, Jury member Savita Mahajan, and TIF dignitaries during the lamp-lighting ceremony.",
  },
  {
    image: "/assets/infrapandit/gallery/infrapandit_award5.png",
    description:
      "Jury members Savita Mahajan, Advisor and Independent Director; Dr K.P. Krishnan, Former IAS Officer; and Prof. G. Raghuram, Member, Council of Advisors, The Infravision Foundation, during the research presentation.",
  },
  {
    image: "/assets/infrapandit/gallery/infrapandit_award1.png",
    description:
      "TIF CEO Jagan Shah addresses attendees at the InfraPandit Awards. Also in the frame are Prof G. Raghuram, Council of Advisors member and Jury Chair; Sthaladipti Saha, Chief Guest, Senior VP & Head – Buildings & Factories, L&T Ltd; Vinayak Chatterjee, Founder and Managing Trustee, TIF; Savita Mahajan, Advisor and Independent Director and Jury member; and Rumjhum Chatterjee, Co-Founder and Managing Trustee, TIF.",
  },
  {
    image: "/assets/infrapandit/gallery/15.JPG",
    description:
      "Trustee Kiran Karnik (at podium) addresses the audience at the launch of the InfraPandit Awards. Pictured alongside are Council of Advisors member Soumya Kanti Ghosh, Co-Founder and Managing Trustee Rumjhum Chatterjee, Council of Advisors member Prof G. Raghuram, and Founder and Managing Trustee Vinayak Chatterjee.",
  },
];

export default function Gallery() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClickOnImage = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };
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
              From the{" "}
              <span className="text-black/90 font-medium ">ceremony</span>
            </h1>
          </div>
          <div className="columns-3  overflow-visible md:columns-3 lg:columns-5 gap-3 pt-8 space-y-2">
            {galleryImages.map((ele, index) => (
              <div
                key={index}
                onClick={() => handleClickOnImage(index)}
                className="overflow-hidden relative"
              >
                <Image
                  src={ele.image}
                  alt={`InfraShakti Photo ${index + 1}`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded hover:scale-105 transition-all duration-300 ease-linear"
                  unoptimized={true}
                  quality={100}
                />
              </div>
            ))}
          </div>
          {isOpen && (
            <Portal>
              <div className="w-screen h-screen p-3  fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex">
                <div className="relative w-[38rem] h-[38rem] bg-black m-auto">
                  <Image
                    className="object-contain z-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
                    fill
                    src={galleryImages[currentIndex].image}
                    unoptimized={true}
                    quality={100}
                    alt={galleryImages[currentIndex].description}
                  ></Image>
                  <div className="absolute bottom-4 z-10 w-full">
                    <p className="px-3 text-base xl:text-lg text-white text-center font-light">
                      {galleryImages[currentIndex].description}
                    </p>
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
