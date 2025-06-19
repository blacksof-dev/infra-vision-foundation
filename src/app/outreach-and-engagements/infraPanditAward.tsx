"use client";

import Image from "next/image";
import montek from "@/../public/assets/globals/infrapanditAward.jpg";
import { BorderGrayHeroBtn } from "@/_components/atoms/buttons";

export default function InfrapanditAward({ ctaText = "See details", link = "/infrapandit-awards" }: { ctaText?: string, link?: string }) {
  return (
    <>
      <div className="relative    rounded-lg   flex flex-col sm:flex-row items-cente sm:gap-4 md:gap-7 xl:gap-10 min-h-[22rem] lg:min-h-[25rem] overflow-hidden">
        <div className="w-full h-auto sm:w-[45%] lg:w-[38%]  ">
          <Image
            src={montek}
            alt="Mr Montek Singh Ahluwalia"
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <div className=" px-3 py-6 xl:py-0 w-full sm:w-1/2 flex flex-col justify-center ">
          <h2 className="text-pink font-semibold lg:text-[42px]">
            InfraPandit Awards
          </h2>

          <div className="max-w-sm sm:pt-2 xlg:pt-6">
            <h2 className="font-medium pt-2 lg:pt-4 xl:pt-6">
              Nurturing the Next Generation of Infra Talent and Ideas
            </h2>

            <div className=" mt-2 sm:mt-4">
              <h4 className=" text-pink">Mumbai, June 20, 2025</h4>
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

      </div>
    </>
  );
}
