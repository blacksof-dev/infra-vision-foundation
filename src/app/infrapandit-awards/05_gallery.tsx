"use client";
import Portal from "@/_components/atoms/popupPortal";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
import { useQuery } from "@tanstack/react-query";
import { CloudCog, MoveLeft, MoveRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface GalleryData {
  imageUrl: string;
  description: string;
}
export interface parentGallery {
  data: GalleryData[];
}
export default function Gallery() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ["infrapandit-gallery"],
    queryFn: () =>
      getFetch<parentGallery>(
        "/gallery?page=1&limit=1000&event=InfraPandit%20%20Awards&activeOnMain=true",
      ),
  });

  const gallery = data?.data;

  if (!gallery) {
    return null;
  }

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
            {gallery.map((ele, index) => (
              <div
                key={index}
                onClick={() => handleClickOnImage(index)}
                className="overflow-hidden relative"
              >
                <Image
                  src={getUrl(ele.imageUrl)}
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
                    src={getUrl(gallery[currentIndex].imageUrl)}
                    unoptimized={true}
                    quality={100}
                    alt={gallery[currentIndex].description}
                  ></Image>
                  <div className="absolute bottom-4 z-10 w-full">
                    <p className="px-3 text-base xl:text-lg text-white text-center font-light">
                      {gallery[currentIndex].description}
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
                      disabled={currentIndex >= gallery.length - 1}
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
