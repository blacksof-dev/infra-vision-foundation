"use client";

import bg from "@/../public/assets/infrakatha/past-events/bgcircle.png";

import Image from "next/image";
import { NewsCard } from "@/_components/molecules/newsCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Script from "next/script";

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

const generateVideoSchema = (video: Datetype) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: video.title,
  description: video.description || video.title,
  thumbnailUrl: getUrl(video.thumbnailUrl),
  uploadDate: video.date,
  contentUrl: video.youtubeVideoUrl,
  embedUrl: video.youtubeVideoUrl,
  publisher: {
    "@type": "Organization",
    name: "The Infravision Foundation",
    logo: {
      "@type": "ImageObject",
      url: "https://theinfravisionfoundation.org/logo.png",
    },
  },
});

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
      if (lastPage.meta.page >= lastPage.meta.totalPages) return undefined;
      return lastPage.meta.page + 1;
    },
  });

  console.log(data);

  const videos = data?.pages.flatMap((page) => page.data) || [];
  const allVideoSchemas = videos.map(generateVideoSchema);

  return (
    <section className="relative bg-white">
      <Script
        id="infrakatha-video-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allVideoSchemas),
        }}
      />
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
                    date={new Date(ele.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
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
        </div>
      </div>
    </section>
  );
}
