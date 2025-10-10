"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import niti from "@/../public/assets/home/popUpImage.jpg";
import gsap from "gsap";

import { RxCross2 } from "react-icons/rx";
export default function Popup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef(null);
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
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      popupRef.current,
      { y: "-50%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, [isOpen]);
  return (
    <>
      {" "}
      {isOpen && (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-900/80  fixed z-[99999] p-4">
          <div
            ref={popupRef}
            className="w-[800px] xl:w-[1000px]  sm:h-[400px]  xl:h-[470px] 2xl:h-[540px] relative flex flex-col-reverse sm:flex-row"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="scale-90 sm:scale-100 absolute top-5 z-[999] right-5 h-10 w-10 text-darkBrown   bg-white sm:bg-pink   transition-all duration-300 rounded-full flex justify-center items-center text-xl   cursor-pointer"
            >
              <RxCross2 className="text-pink sm:text-white" />
            </button>
            <div className="relative  bg-white  rounded-lg   flex flex-col sm:flex-row items-cente sm:gap-4 md:gap-4 xl:gap-8 min-h-[22rem] lg:min-h-[25rem] overflow-hidden">
              <div className="w-full mt-4 md:mt-0 h-[18rem] md:h-auto sm:w-[45%] lg:w-[50%]  sm:p-5 ">
                <Image
                  src={niti}
                  alt="Mr Montek Singh Ahluwalia"
                  className="rounded-lg w-full h-full object-contain"
                />
              </div>
              <div className=" px-3 py-6 xl:py-0 w-full sm:w-1/2 flex flex-col justify-center ">
                <h2 className="text-pink font-semibold lg:text-[35px]">
                  Towards shaping the future of India’s mobility
                </h2>

                <div className="max-w-sm sm:pt-2 xlg:pt-6">
                  <h4 className="font-medium pt-2 lg:pt-4 ">
                    TIF partners with NITI Aayog to strengthen urban and
                    regional transport governance with a focus on planning,
                    finance, and operations.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
