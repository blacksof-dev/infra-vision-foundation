"use client";
import Portal from "@/_components/atoms/popupPortal";
import { RxCross2 } from "react-icons/rx";
import { CardData } from "./static";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PopupDescription({
  onclose,
  data,
}: {
  onclose: () => void;
  data: CardData;
}) {
  const [showlineclamp, setlineclamp] = useState(false);
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <Portal>
        <div className="fixed inset-0 p-3 flex overflow-auto  xl:items-center justify-center bg-darkgray/30 z-[999]">
          <div className="bg-white rounded-lg max-w-xl my-auto lg:w-full  h-auto lg:h-[44rem]  lg:max-w-screen-2xl relative md:m-4 m-2">
            <button
              onClick={onclose}
              className="scale-90 z-1 sm:scale-100 absolute top-2 right-3 md:top-7 md:right-7 xl:top-5 xl:right-5 h-10 w-10 text-darkBrown d bg-pink   border-[1px] border-darkBrown transition-all duration-300 rounded-full flex justify-center items-center text-xl   cursor-pointer"
            >
              <RxCross2 className="text-white" />
            </button>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8 p-3 md:p-6 h-full overflow-hidden">
              {/* IMAGE SECTION */}
              <div className="relative w-full h-[25rem] md:w-[25rem] md:h-[25rem]  lg:w-[40%] lg:h-full">
                <Image
                  src={data.popupImg}
                  alt={data.title}
                  fill
                  className="object-cover object-top rounded-md"
                />
              </div>

              {/* TEXT SECTION */}
              <div className="flex flex-col w-full md:w-[60%]  pt-2 overflow-hidden">
                <h2 className="text-xl font-semibold">{data.title}</h2>
                <h6 className="text-pink font-medium py-2">{data.desig}</h6>
                {data?.popupdesc && (
                  <p
                    className={`${
                      showlineclamp
                        ? "line-clamp-none overflow-y-auto "
                        : "line-clamp-6"
                    } text-black text-sm md:text-base lg:overflow-y-auto h-full  pr-2`}
                    dangerouslySetInnerHTML={{ __html: data.popupdesc }}
                  />
                )}

                {!showlineclamp && (
                  <button
                    onClick={() => setlineclamp(true)}
                    className="text-pink font-medium lg:hidden block py-4 me-auto"
                  >
                    Read More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
}
