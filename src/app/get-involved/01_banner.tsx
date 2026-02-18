"use client";

import { getFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { getUrl } from "@/lib/getUrl";
import { BannerData } from "../outreach-and-engagements/01_Banner";
import { Loader } from "lucide-react";

export default function GetInvolvedBanner() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-involved-banner"],
    queryFn: () => getFetch<BannerData>("/content/get-involved-banner-section"),
  });

  if (!data || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-14 w-14 animate-spin text-[#C82249]" />
      </div>
    );
  }


  return (
    <>
      <div id="getInvolvedBanner" className="pt-[5rem] sm:pt-[6rem]">
        <div className="relative ">
          <div
            className={`sm:block  relative  hidden w-full h-[25rem] md:h-[36rem] xl:h-[45rem] overflow-hidden bg-black `}
          >
            <Image
              src={getUrl(data.backgroundImageDesktop)}
              alt="Publication Banner"
              className="w-full h-full object-cover "
              fill
              unoptimized={true}
              quality={100}
            ></Image>
          </div>

          <div className="sm:hidden relative block w-full h-[30rem] overflow-hidden bg-black ">
            <Image
              src={getUrl(data.backgroundImageMobile)}
              alt="Publication Banner"
              fill
              className="w-full h-full object-cover object-right"
              unoptimized={true}
              quality={100}
            ></Image>
          </div>

          <div className="w-container overflow-hidden">
            <div className="absolute w-auto sm:w-auto top-9  sm:top-12 md:top-18 flex flex-col  justify-between h-[88%] sm:h-[80%]">
              <div className="flex flex-row gap-1 ">
                <Link href="/">
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
                </Link>
                <h5 className="text-white font-light flex flex-row">
                  <RiArrowRightSLine className="text-[24px]" />
                  {data.heading}
                </h5>
              </div>
              <div className="  w-full ">
                <h1 className="text-white font-medium ">{data.heading}</h1>
                <div className={` py-2 sm:py-4 w-full  max-w-lg`}>
                  <h5 className="text-white font-light ">{data.description}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
