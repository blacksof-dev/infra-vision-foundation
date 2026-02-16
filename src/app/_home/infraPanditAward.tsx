"use client";

import Image from "next/image";
import { BorderGrayHeroBtn } from "@/_components/atoms/buttons";
import { getUrl } from "@/lib/getUrl";

interface EventImage {
  image: string;
  description: string;
}

interface EventDetails {
  images: EventImage[];
  date: string;
  content: string;
}

interface Event {
  id: string;
  date: string;
  dayTime: string;
  meetingType: string;
  desc: string;
  details: EventDetails;
}

export default function InfrapanditAward({
  event,
  ctaText = "See details",
  link = "/outreach-and-engagements",
}: {
  event?: Event;
  ctaText?: string;
  link?: string;
}) {
  if (!event) return null;

  const eventImage = event.details.images?.[0]?.image || "";
  const displayDate = event.details.date
    ? new Date(event.details.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <>
      <div className="relative  bg-white  rounded-lg   flex flex-col sm:flex-row items-cente sm:gap-4 md:gap-7 xl:gap-10 min-h-[22rem] lg:min-h-[25rem] overflow-hidden">
        <div className="w-full h-[12rem] md:h-[25rem] sm:w-[45%] lg:w-[38%]  sm:p-5 ">
          <div className="relative w-full h-full">
            <Image
              src={getUrl(eventImage)}
              alt={event.desc || "Event Image"}
              fill
              className="rounded-lg object-contain"
              unoptimized={true}
            />
          </div>
        </div>
        <div className=" px-3 py-6 xl:py-0 w-full sm:w-1/2 flex flex-col justify-center ">
          <h2 className="text-pink font-semibold lg:text-[42px]">
            External engagement
          </h2>

          <div className="max-w-lg sm:pt-2 xlg:pt-6">
            <h2 className="font-medium pt-2 lg:pt-4 xl:pt-6">{event.desc}</h2>

            <div className=" mt-2 sm:mt-4">
              <h4 className=" text-pink">{displayDate}</h4>
              <div className="cursor-pointer mt-6">
                <BorderGrayHeroBtn
                  text={ctaText}
                  role="link"
                  link={`${link}/${event.id}`}
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
