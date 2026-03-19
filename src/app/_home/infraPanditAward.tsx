"use client";

import Image from "next/image";
import nitiAayog from "@/../public/assets/outreach-and-engagements/eventImages/nitiAayog.jpg"
import { BorderGrayHeroBtn } from "@/_components/atoms/buttons";

export default function InfrapanditAward({ ctaText = "See details", link = "/outreach-and-engagements" }: { ctaText?: string, link?: string }) {
  return (
    <>
      <div className="relative  bg-white  rounded-lg   flex flex-col sm:flex-row items-cente sm:gap-4 md:gap-7 xl:gap-10 min-h-[22rem] lg:min-h-[25rem] overflow-hidden">
        <div className="w-full h-full  md:h-[25rem] sm:w-[45%] lg:w-[38%]  lg:p-5 ">
          <Image
            src={nitiAayog}
            alt="Mr Montek Singh Ahluwalia"
            className="rounded-lg w-full h-full object-contain "
            unoptimized={false}
          />
        </div>
        <div className="  py-4 lg:py-0 w-full sm:w-1/2 flex flex-col justify-start lg:justify-center ">
          <h2 className="text-pink font-semibold lg:text-[42px]">
           External engagement
          </h2>

          <div className="max-w-lg sm:pt-2 xlg:pt-6">
            <h2 className="font-medium pt-2 lg:pt-4 xl:pt-6">
             NITI Aayog and The Infravision Foundation partner to strengthen regional transport governance
            </h2>

            <div className=" mt-2 sm:mt-4">
              <h4 className=" text-pink">September 26, 2025</h4>
              <div className="cursor-pointer mt-6">
                <BorderGrayHeroBtn
                  text={ctaText}
                  role="link"
                  link={link}
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
