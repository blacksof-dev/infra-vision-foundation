"use client";

import Image from "next/image";
import { BorderGrayHeroBtn } from "@/_components/atoms/buttons";
import { useApiHook } from "@/lib/useApi";
import Loading from "../loading";



interface outReachApiResponse {
  event: {
    title: string;
    description: string;
    date: string;
    location: string;
    tag: string;
    subtitle: string;
    reportUrl: string;
    covers: {
      url: string;
      desc: string;
    }[]
    active: string;
  }
}

export default function InfrapanditAward() {


  const { data, isLoading } = useApiHook<outReachApiResponse>({
    url: "/outreach-and-engagements/primary",
    cacheKey: "outreachPrimary",
  });

  console.log(data);


  if (!data) return null;

  if (isLoading) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  const primaryEvent = data.event;


  return (
    <>
      <div className="relative  bg-white  rounded-lg   flex flex-col sm:flex-row items-cente sm:gap-4 md:gap-7 xl:gap-10 min-h-[22rem] lg:min-h-[25rem] overflow-hidden">
        <div className="w-full h-[15rem] sm:h-[20rem] lg:h-[22rem] sm:w-[45%] lg:w-[38%]  sm:p-5 relative">
          <Image
            src={
              primaryEvent.covers?.[0]?.url &&
                (primaryEvent.covers[0].url.startsWith("http"))
                ? primaryEvent.covers[0].url
                : "/assets/home/infrapanditAward.webp" 
            }
            alt={primaryEvent.tag || "Event image"}
            fill
            quality={100}
            className="rounded-lg w-full h-full object-cover m-3"
          />

        </div>
        <div className=" px-3 py-6 xl:py-0 w-full sm:w-1/2 flex flex-col justify-center ">
          <h2 className="text-pink font-semibold lg:text-[42px]">
            {primaryEvent.tag}
          </h2>

          <div className="max-w-sm sm:pt-2 xlg:pt-6">
            <h2 className="font-medium pt-2 lg:pt-4 xl:pt-6">
              {primaryEvent.description}
            </h2>

            <div className=" mt-2 sm:mt-4">
              <h4 className=" text-pink">{primaryEvent.date}</h4>
              <div className="cursor-pointer mt-6">
                <BorderGrayHeroBtn
                  text={"See details"}
                  role="link"
                  link="/outreach-and-engagements"
                  borderColor="pink"
                  color="black"
                  bgColor="white"
                  size="large"
                  classes="font-medium"
                />
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute opacity-60 top-0 right-0 hidden lg:block"
          src="/assets/outreach-and-engagements/highlight/circle.png"
          alt="Decorative Circle"
        />
      </div>
    </>
  );
}
