"use client";
import React from "react";
import VideoCard from "@/_components/molecules/videoCard";

import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";

export interface Spotlight {
  awardType: string;
  awardee: string;
  title: string;
  description: string;
  videoUrlYoutube: string;
  thumbnailUrl: string;
  iconUrl: string;
  partnersLogo: string;
}

export interface SpotlightResponse {
  data: Spotlight[];
}

export default function Spotlight() {
  const { data } = useQuery({
    queryKey: ["infrashakti-spotlight"],
    queryFn: () =>
      getFetch<SpotlightResponse>(
        "/infrashakti/awardees?page=1&limit=50&active=true",
      ),
  });

  if (!data) return null;
  return (
    <>
      <div className="bg-whitesmoke">
        <div className="blade-top-padding-lg blade-bottom-padding-lg w-container ">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">In the Spotlight</h5>
          </div>
          <div className="py-2 ">
            <h1 className="text-black  font-light">
              <span className="text-black/90 font-medium ">
                The InfraShakti Awardees
              </span>
            </h1>
          </div>

          <div className="blade-top-padding-sm  ">
            <div className=" blade-top-padding-sm">
              <VideoCard data={data.data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
