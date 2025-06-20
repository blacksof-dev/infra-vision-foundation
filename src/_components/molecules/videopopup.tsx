"use client";
import React, { useState } from "react";
import Portal from "../atoms/popupPortal";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

export default function VideoPopupGlobal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Portal>
      <section className="fixed inset-0 flex items-center justify-center bg-darkgray/40 backdrop-blur-md  z-[9999]">
        <div className="bg-white rounded-lg w-full mx-auto max-w-2xl xl:max-w-3xl 2xl:max-w-5xl relative md:m-4 m-2">
          <button
            onClick={onClose}
            className="scale-90 sm:scale-100 absolute -top-12 right-0 h-10 w-10 text-darkBrown  bg-pink   transition-all duration-300 rounded-full flex justify-center items-center text-xl   cursor-pointer"
          >
            <RxCross2 className="text-white" />
          </button>
          <div className="relative w-full aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`${src}&autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </Portal>
  );
}
