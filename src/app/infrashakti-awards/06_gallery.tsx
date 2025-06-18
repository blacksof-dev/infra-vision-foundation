"use client";
import Portal from "@/_components/atoms/popupPortal";
import { MoveLeft, MoveRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  {
    image: "assets/infraShakti/gallery/image1.png",
    description: "Vinayak Chatterjee sharing his views in a panel discussion on 'Futureproofing Bharat with resilient infrastructure"
  },
  {
    image: "assets/infraShakti/gallery/image6.png",
    description: "Rural Infra Pioneer Shashank Kumar from DeHaat at the ceremony."
  },
  {
    image: "assets/infraShakti/gallery/image8.png",
    description: "Mr Vishnu Som, journalist and news anchor; Mr Anup Sahay, Head Corporate Strategy and Special Initiatives, L&T; Ms Rumjhum Chatterjee, Co-Founder & Managing Trustee, The Infravision Foundation; Mr Mallanna Sasalu, CEO, Provident Housing Ltd; with Mr Ashwani Gupta, CEO, Adani Ports and Special Economic Zone Limited."
  },
  {
    image: "assets/infraShakti/gallery/image2.png",
    description: "Union Minister Mr Nitin Gadkari presenting the Transport Trailblazer Award to Mr Giridhar Rajagopalan, Deputy Managing Director at AFCONS Infrastructure Limited."
  },
  {
    image: "assets/infraShakti/gallery/image7.png",
    description: "Mr Pranav Adani, Managing Director (Agro, Oil & Gas) and Director of Adani Enterprises, delivering his keynote speech."
  },
  {
    image: "assets/infraShakti/gallery/image10.png",
    description: "Mr Arman Ali, Executive Director, National Centre for Promotion of Employment for Disabled People (NCPEDP), and Mr Tarun Garg, COO, Hyundai Motor India, presenting the Inclusive Infrastructure Award to Ms Swarnalatha J, Managing Trustee, and Dr Guruprasad T S, Trustee, from Swarga Foundation."
  },
  {
    image: "assets/infraShakti/gallery/image3.png",
    description: "Mr Vinayak Chatterjee in discussion with NDTV Editor-in-Chief Mr Sanjay Pugalia."
  },
  {
    image: "assets/infraShakti/gallery/image5.png",
    description: "Water Saviour Mr Arun Krishnamurthy from EFI with his award at the ceremony."
  },
  {
    image: "assets/infraShakti/gallery/image12.png",
    description: "Jurors Mr Dilip Cherian, Image Guru, Litigation Landscaping and Policy Analyst with Prof G Raghuram, Former Director, IIMB and Dean, IIMA."
  },
  {
    image: "assets/infraShakti/gallery/image4.png",
    description: "Urban Infra Hero Mr Sandeep Patel from NEPRA Resource Management Pvt Ltd at the ceremony."
  },
  {
    image: "assets/infraShakti/gallery/image11.png",
    description: "Mr Mallanna Sasalu, CEO of Provident Housing Ltd, along with other attendees at the ceremony."
  },
  {
    image: "assets/infraShakti/gallery/image9.png",
    description: "Ms Rumjhum Chatterjee during a panel discussion on “Sustainable infra that will build Bharat”."
  },
  {
    image: "assets/infraShakti/gallery/image13.png",
    description: "NDTV Editor-in-Chief Mr Sanjay Pugalia with three-time Grammy Award winner and  Padma Shri awardee Mr Ricky Kej."
  },
  {
    image: "assets/infraShakti/gallery/image14.png",
    description: "NDTV Editor-in-Chief Mr Sanjay Pugalia in conversations with Union Minister Mr Nitin Gadkari."
  },
  {
    image: "assets/infraShakti/gallery/image15.png",
    description: "Union Minister Mr Hardeep Singh Puri presenting the Renewable Energy Star Award to Mr Pankaj Kumar and Mr Siddhant Agarwal from Quant Solar."
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
              In frames
              <span className="text-black/90 font-medium ">
                — The spirit of change
              </span>
            </h1>
          </div>
          <div className="columns-3  overflow-visible md:columns-3 lg:columns-5 gap-3 pt-8 space-y-2">
            {galleryImages.map((ele, index) => (
              <div key={index}  onClick={() => handleClickOnImage(index)} className="overflow-hidden rounded">
                <Image
                  src={ele.image}
                  alt={`InfraShakti Photo ${index + 1}`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded"
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
