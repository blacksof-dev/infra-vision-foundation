"use client";
import { useState } from "react";
import bg from "@/../public/assets/infrakatha/past-events/bgcircle.png";

import Image from "next/image";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
import { UnderlineWithHover } from "@/_components/atoms/buttons";

interface Datetype {
  id: string;
  infraKathaLabel: string;
  title: string;
  description: string;
  date: string;
  youtubeVideoUrl: string;
  thumbnailUrl: string;
}

interface DataResponse {
  data: Datetype[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function PastEvents() {
  const {
    data: data,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["infrakath-video"],
    queryFn: ({ pageParam = 1 }) =>
      getFetch<DataResponse>(
        `/infrakatha?page=${pageParam}&limit=3&sort=desc&active=true`,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.totalPages < lastPage.meta.page) return undefined;
      return lastPage.meta.page + 1;
    },
  });

  console.log(data);
  return (
    <section className="relative bg-white">
      <Image
        className="absolute top-0 left-0 lg:block hidden "
        src={bg}
        alt="background image"
      ></Image>
      <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
        <div className="flex flex-row items-center gap-2 md:gap-3 ">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
          <h5 className="font-medium text-pink">Past Sessions</h5>
        </div>
        <div className="py-3 ">
          <h1 className="text-black  font-light">
            The
            <span className="text-black/90 font-medium "> saga </span>
            so far
          </h1>
        </div>
        <div className="md:pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-24">
            {data?.pages
              .flatMap((page) => page.data)
              .map((ele, index) => (
                <div key={index}>
                  <NewsCard
                    date={ele.date}
                    title={ele.title}
                    image={getUrl(ele.thumbnailUrl)}
                    link={ele.youtubeVideoUrl}
                    category={ele.infraKathaLabel}
                    description={ele.description}
                    classes="line-clamp-3 "
                  />
                </div>
              ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center mb-4  blade-top-padding-sm  relative z-1">
              <UnderlineWithHover
                size="xxlsize"
                color="pink"
                bgColor="pink"
                text="See more"
                role="button"
                borderColor="white"
                classes=""
                handlefun={fetchNextPage}
              />
            </div>
          )}
          {/* {visiblecountmobile < FilteredCard().length && (
            <div className="flex justify-center xl:mt-4">
              <div>
                <button
                  onClick={handleSeeMoreCta}
                  className={`group  text-xl lg:text-2xl   text-pink hover:text-white cursor-pointer  text-nowrap w-40  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
                >
                  <span className="z-50 relative"> See more</span>
                  <span
                    className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
                  ></span>
                  <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[5] transition-all duration-700 ease-in-out z-0"></span>
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}
