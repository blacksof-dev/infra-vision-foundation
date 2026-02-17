"use client";

import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import VideoPopupGlobal from "@/_components/molecules/videopopup";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

type VideoCard = {
  thumbnailUrl: string;
  title: string;
  name: string;
  description: string;
  youtubeVideoUrl: string;
};

export default function Ceremony() {
  const { data } = useQuery({
    queryKey: ["infrashakti-ceremony"],
    queryFn: () =>
      getFetch<VideoCard[]>("/infrashakti/ceremony-scenes?active=true"),
  });

  if (!data) return null;

  return (
    <>
      <div className="blade-top-padding-lg blade-bottom-padding-lg w-container">
        <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
          <h5 className="font-medium text-pink">Scenes from the Ceremony</h5>
        </div>
        <div className="py-2 ">
          <h1 className="text-black  font-light">
            Echoes of{" "}
            <span className="text-black/90 font-medium ">
              wisdom,
              <br /> discourse, and success
            </span>
          </h1>
        </div>
        <VideoCard data={data} />
      </div>
    </>
  );
}

function VideoCard({ data }: { data: VideoCard[] }) {
  const [openPopUp, setpopup] = useState<boolean>(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);
  return (
    <>
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:items-start gap-5 blade-top-padding-sm">
        {(Array.isArray(data) ? data : (data as any)?.data || [])?.map(
          (ele: VideoCard, index: number) => {
            return (
              <div key={index} className=" max-w-sm relative h-[28rem]  w-full">
                <Image
                  src={getUrl(ele.thumbnailUrl)}
                  alt={ele.title || "video thumbnail"}
                  fill
                  className="object-cover rounded "
                  unoptimized
                  quality={100}
                />
                <div className="absolute -traslate-x-1/2 group -translate-y-1/2 left-1/2 top-1/2">
                  <button
                    onClick={() => {
                      setActiveVideoSrc(ele.youtubeVideoUrl);
                      setpopup(true);
                    }}
                    className="w-12 h-12 rounded-full  ring-1 ring-pink bg-white flex justify-center items-center group-hover:bg-pink transition-all duration-100"
                  >
                    <FaPlay className="text-pink text-lg group-hover:text-white" />
                  </button>
                </div>

                <div className="w-full h-auto  absolute bottom-0">
                  <div className="">
                    <ul className="text-white font-semibold list-disc pl-3 md:pl-5 list-inside text-lg">
                      <li className="">{ele.title}</li>
                    </ul>
                  </div>
                  <div className="text-white  pl-3 md:pl-5 py-2  md:h-[7rem]">
                    <p className="text-base sm:text-md">{ele.name}</p>
                    <p className="text-base sm:text-md">{ele.description}</p>
                  </div>
                </div>
              </div>
            );
          },
        )}
        {openPopUp && activeVideoSrc !== null && (
          <VideoPopupGlobal
            src={activeVideoSrc}
            onClose={() => {
              setpopup(false);
              setActiveVideoSrc(null);
            }}
          />
        )}
      </div>
    </>
  );
}
