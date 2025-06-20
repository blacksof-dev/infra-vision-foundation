"use client";

import Image from "next/image";
import { BorderGrayHeroBtn, HeroBtn } from "../atoms/buttons";
import { FaPlay } from "react-icons/fa";
import Portal from "../atoms/popupPortal";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import Link from "next/link";
import VideoPopupGlobal from "@/_components/molecules/videopopup";

type VideoProps = {
  name: string;
  link: string;
  awardName: string;
  thumbnailImage: string;
  title: string;
  desc: string;
  awardslogo: string;
  logo: string;
  companyName?: string;
};

type VideoCardProps = {
  data: VideoProps[];
};

export default function VideoCard({ data }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [videoPopUp, setvideoPopup] = useState<boolean>(false);
  const handleNextClick = () => {
    if (currentIndex < data.length - 1) {
      setcurrentIndex((prev) => prev + 1);
    } else {
      setIsOpen(false);
    }
  };
  const handlePrevClick = () => {
    if (currentIndex != 0) {
      setcurrentIndex((prev) => prev - 1);
    } else {
      setIsOpen(false);
    }
  };

  const handleClick = (index: number) => {
    setcurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8 xl:gap-14">
        {data.map((elem, index) => (
          <div key={index}>
            <div className="relative w-full h-[18rem]">
              <Image
                src={elem.thumbnailImage}
                width={500}
                height={500}
                alt="Image"
                quality={100}
                className="w-full h-full object-cover object-top rounded-md"
              />
              <div className="group absolute right-4 bottom-4">
                <button
                  onClick={() => {
                    setcurrentIndex(index);
                    setvideoPopup(true);
                  }}
                  className="w-12 h-12 rounded-full cursor-pointer mx-auto bg-white flex items-center justify-center group-hover:bg-pink transition-all duration-100"
                >
                  <FaPlay className="text-pink  text-base group-hover:text-white" />
                </button>
              </div>
            </div>

            <div className="flex justify-between flex-col">
              <div>
                <div className="pt-3">
                  <p className="text-pink font-medium">{elem.awardName}</p>
                </div>
                <h6 className="text-black font-medium xl:text-xl">
                  {elem.name}
                </h6>
              </div>
              <div className="pt-3 pb-6 xl:py-4 ">
                <div onClick={() => handleClick(index)} className=" w-fit">
                  <BorderGrayHeroBtn
                    text="Read more"
                    role="button"
                    borderColor="darkgray/40"
                    color="black"
                    bgColor="white"
                    size="base"
                    classes="font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <VideoCardPopup
          onclose={() => setIsOpen(false)}
          videoPopupDetails={data[currentIndex]}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      )}
      {videoPopUp && (
        <VideoPopupGlobal
          src={data[currentIndex].link}
          onClose={() => setvideoPopup(false)}
        />
      )}
    </>
  );
}

const VideoCardPopup = ({
  onclose,
  videoPopupDetails,
  handleNextClick,
  handlePrevClick,
}: {
  onclose: () => void;
  videoPopupDetails: VideoProps;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}) => {
  const [videoPopUp, setvideoPopup] = useState<boolean>(false);

  return (
    <Portal>
      <div className="flex justify-center md:items-center fixed inset-0 bg-black/90 z-[9999] py-4 overflow-y-auto">
        <div className="bg-white my-auto  rounded-lg w-full max-w-lg md:max-w-4xl h-auto relative m-2 md:m-4 p-3 sm:p-4 flex flex-col md:flex-row md:gap-8 overflow-auto">
          <button
            onClick={onclose}
            className="scale-75 sm:scale-90 z-1 hover:scale-100 absolute top-1 right-1 sm:top-4 sm:right-4 h-10 w-10 text-pink bg-white border border-pink transition-all duration-300 ease-linear rounded-full flex justify-center items-center text-xl cursor-pointer"
          >
            <RxCross2 className="text-2xl" />
          </button>

          <div className="w-full  md:w-1/2 rounded-lg flex flex-col items-center justify-center relative">
            <Image
              src={videoPopupDetails.thumbnailImage}
              alt="Thumbnail"
              width={160}
              height={50}
              unoptimized={true}
              quality={100}
              className="rounded-lg  w-full h-full object-cover"
            />
            <div className="group ">
              <button
                onClick={() => setvideoPopup(true)}
                className="w-12 h-12 rounded-full  absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2  cursor-pointer  bg-white flex items-center justify-center group-hover:bg-pink transition-all duration-100"
              >
                <FaPlay className="text-pink text-lg  group-hover:text-white" />
              </button>
            </div>
          </div>

          <div className="w-full  md:w-1/2 flex flex-col justify-center">
            <Image
              src={videoPopupDetails.logo}
              alt="Logo"
              width={120}
              height={100}
              className="py-6 "
            />

            <div className="w-full h-full  pe-9   lg:py-14">
              <div className="flex flex-row gap-3 ">
                <Image
                  src={videoPopupDetails.awardslogo}
                  alt="Award Logo"
                  width={160}
                  height={50}
                  className="w-14 h-14"
                />
                <div className="my-auto">
                  <p className="text-pink text-sm font-semibold">
                    {videoPopupDetails.awardName}
                  </p>
                  <p className="text-pink/90 text-sm">
                    {videoPopupDetails.name}
                  </p>
                  <p className="text-pink text-sm">
                    {videoPopupDetails.companyName}
                  </p>
                </div>
              </div>

              <div className="pt-5">
                <h6 className="text-black font-medium">
                  {videoPopupDetails.title}
                </h6>
                <p className="text-black text-sm w-full  pt-2 opacity-[0.9]">
                  {videoPopupDetails.desc}
                </p>
              </div>
            </div>

            <div className="pt-3 pb-6 xl:py-4  flex justify-between">
              <div
                onClick={handlePrevClick}
                className="w-fit flex justify-center items-center gap-4"
              >
                <span className="text-black font-medium cursor-pointer">
                  Prev
                </span>
                <span className="rotate-180">
                  <BorderGrayHeroBtn
                    text=""
                    role="button"
                    borderColor="darkgray/40"
                    color="black"
                    bgColor="white"
                    size="base"
                    classes="font-medium"
                  />
                </span>
              </div>
              <div onClick={handleNextClick} className="w-fit ">
                <BorderGrayHeroBtn
                  text="Next"
                  role="button"
                  borderColor="darkgray/40"
                  color="black"
                  bgColor="white"
                  size="base"
                  classes="font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {videoPopUp && (
        <VideoPopupGlobal
          src={videoPopupDetails.link}
          onClose={() => setvideoPopup(false)}
        />
      )}
    </Portal>
  );
};
