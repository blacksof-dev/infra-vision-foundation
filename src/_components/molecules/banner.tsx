
import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";

import { ApiResponse } from "@/app/_home/01_banner";


export default function Banner({
  id,
  tagName,
  title,
  desktopImg,
  mobileImg,
  description,


}: ApiResponse) {
  return (
    <>
      <div id={id} className="pt-[5rem] sm:pt-[6rem]">
        <div className="relative ">
          <div className={`w-full relative h-[25rem] md:h-[36rem]  xl:h-[40rem] bg-black ${mobileImg ? "md:block hidden" : ""}`}>
            <Image
              fill
              src={desktopImg ?? "/assets/globals/fallback.jpg"}
              alt="Publication Banner"
              className="w-full h-full object-cover   2xl:object-bottom"
              unoptimized={false}
              priority
              sizes="100vw"
            ></Image>
          </div>
          {mobileImg && (
            <div className="md:hidden block h-[30rem] relative w-full">
              <Image
                src={mobileImg}
                fill
                alt="Publication Banner"
                className="w-full h-full object-cover object-right"
                unoptimized={false}
                quality={100}
              ></Image>
            </div>
          )}
          <div className="w-container overflow-hidden">
            <div className="absolute w-auto sm:w-auto top-9  sm:top-12 md:top-18 flex flex-col  justify-between h-[88%] sm:h-[80%]">
              <div className="flex flex-row gap-1 ">
              
                  <svg
                    className="fill-white "
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.8"
                      d="M14.2891 0.351685L0.730469 12.5549H4.42827V23.6483H13.0565V16.2527H15.5217V23.6483H24.1499V12.5549H27.8477L14.2891 0.351685ZM14.2891 3.66911L21.6847 10.3256V11.3223V21.1831H17.9869V13.7875H10.5913V21.1831H6.89347V10.3256L14.2891 3.66911Z"

                    />
                  </svg>
            
                <h5 className="text-white font-light flex flex-row">
                  <RiArrowRightSLine className="text-[24px]" />
                  {tagName}
                </h5>
              </div>
              <div className="  w-full ">
                <h1 className="text-white font-medium ">{title}</h1>
                <div className={` py-2 sm:py-4 w-full  max-w-lg`}>
                  <h5 className="text-white font-light " dangerouslySetInnerHTML={{ __html: description ?? "" }} />
                </div>
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
