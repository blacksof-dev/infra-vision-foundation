"use client"
import React from "react";
import InfravisionariesGlobal from "@/_components/molecules/infravisionariesGlobal";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "./01_banner";
import Loading from "../loading";




export default function Infravisionaries() {
  const { data, isLoading } = useApiHook<ApiResponse[]>({
    url: "/content/home",
    cacheKey: "homeContent",
  });

  if (isLoading) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  const infravisionaries = data.find((section) => section.sectionKey === "infravisionaries");

  if (!infravisionaries) return null;

  const response = infravisionaries.data;
  return (
    <>
      <section id="homepage-section-03" className="bg-pink relative">
        <div className=" absolute top-0 xl:right-8 2xl:right-28 xl:block hidden">
          <svg
            width="594"
            height="427"
            viewBox="0 0 594 427"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <circle
                cx="130.108"
                cy="130.108"
                r="129.737"
                transform="matrix(-0.914239 -0.405175 -0.405175 0.914239 593.496 -18.2383)"
                stroke="#D9D9D9"
                strokeWidth="0.742301"
              />
              <circle
                opacity="0.3"
                cx="153.523"
                cy="153.523"
                r="153.523"
                transform="matrix(-0.914239 -0.405175 -0.405175 0.914239 405.117 93.9883)"
                fill="#D9D9D9"
              />
            </g>
          </svg>
        </div>
        <div className=" blade-top-padding-lg blade-bottom-padding-lg">
          <div className="w-container">
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white "></span>
              <h5 className="font-medium text-white">{response.tagName}</h5>
            </div>
            <div className="pt-4 md:pt-5 ">
              <h1 className="text-white font-medium">{response.title}</h1>
              <div className="w-full sm:w-[85%] xl:w-[45%]">
                <h6 className="text-white  tracking-[1%] py-4">
                  {response.description}
                </h6>
              </div>
            </div>
          </div>
          <InfravisionariesGlobal role="home" />
        </div>
      </section>
    </>
  );
}

