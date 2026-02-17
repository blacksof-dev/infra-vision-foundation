"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
import Link from "next/link";

interface EntryPopupResponse {
  id: string;
  title: string;
  description: string;
  date: string;
  cta: string;
  ctaLink: string;
  active: boolean;
  imageUrl: string;
}

export default function Popup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef(null);

  const { data: popupData } = useQuery({
    queryKey: ["entry-popup"],
    queryFn: () => getFetch<EntryPopupResponse>("/entry-popup"),
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (popupData?.active) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popupData]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        popupRef.current,
        { y: "-50%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  if (!popupData || !popupData.active) return null;

  return (
    <>
      {isOpen && (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-900/80  fixed z-[99999] p-4 ">
          <div
            ref={popupRef}
            className="w-[800px] xl:w-[1000px]  sm:h-[400px]  xl:h-[470px] 2xl:h-[540px] relative flex flex-col-reverse sm:flex-row"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="  sm:scale-100 absolute top-2 right-2 md:top-5 z-[999] md:right-5 p-1 md:p-2 text-darkBrown     bg-pink   transition-all duration-300 rounded-full flex justify-center items-center text-xl   cursor-pointer"
            >
              <RxCross2 className=" text-white" />
            </button>
            <div className="relative  bg-white  rounded-lg   flex flex-col sm:flex-row items-cente sm:gap-4 md:gap-4 xl:gap-8 min-h-[22rem] lg:min-h-[25rem] overflow-hidden">
              <div className="w-full mt-4 md:mt-0 h-[18rem] md:h-auto sm:w-[45%] lg:w-[50%]  sm:p-5 ">
                <Image
                  src={getUrl(popupData.imageUrl)}
                  alt={popupData.title}
                  width={500}
                  height={500}
                  className="rounded-lg w-full h-full object-contain "
                />
              </div>
              <div className=" px-3 py-6 xl:py-0 w-full sm:w-1/2 flex flex-col justify-center ">
                {popupData.date && (
                  <h4 className="text-darkgray font-medium lg:text-xl pb-2">
                     {new Date(popupData.date).toLocaleDateString("en-IN",{day:"2-digit",month:"long", year:"numeric"})}
                  </h4>
                )}
                <h2 className="text-pink font-semibold lg:text-[35px]">
                  {popupData.title}
                </h2>

                <div className="max-w-sm sm:pt-2 xlg:pt-6">
                  <h4 className="font-medium pt-2 lg:pt-4 ">
                    {popupData.description}
                  </h4>
                </div>
                {popupData.cta && popupData.ctaLink && (
                  <div className="mt-6">
                    <Link
                      href={popupData.ctaLink}
                      className="bg-pink text-white px-6 py-3 rounded hover:bg-pink/90 transition-all font-medium inline-block"
                    > 
                      {popupData.cta}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
