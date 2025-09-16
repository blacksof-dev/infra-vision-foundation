"use client";

import highway from "@/../public/assets/home/whoWeAre/knowledge/highway.png";
import jagan from "@/../public/assets/home/whoWeAre/knowledge/jagan.png";
import img_12 from "@/../public/assets/knowledeg/researchPapers/12.jpg";
import { Suspense, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("@/_components/molecules/cardTemplate"), {
  ssr: false,
});
import { useHeader } from "@/context/useHeader";
import Link from "next/link";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "./01_banner";
import Loading from "../loading";

export type TabApiResponse = {
  id: number;
  img: string;
  category: string;
  title: string;
  link: string;
  date?: string;
  subtitle?: string;
  ctaText?: string;
};

type KnowledgeApiResponse = {
  researchPaper?: {
    id: string;
    image: string;
    title: string;
    description?: string;
    link: string;
    date: string;
  };
  conversation?: {
    id: string;
    image: string;
    title: string;
    desc?: string;
    date?: string;
    videoLink?: string;
  };
  blog?: {
    id: string;
    title: string;
    subtitle?: string;
    coverImage: string;
    docFile: string;
    publishedDate: string;
  };
  lastUpdated: string;
};


export default function WhoWeAre() {
  const [activeTab, setActiveTab] = useState("Knowledge");

  // const { data, isLoading } = useApiHook<ApiResponse[]>({
  //   url: "/content/home",
  //   cacheKey: "homeContent",
  // });

  // if (isLoading) {
  //   return (
  //     <section className="w-full h-[40rem] flex items-center justify-center">
  //       <Loading />
  //     </section>
  //   );
  // }

  // if (!data) return null;

  // const whoWeAre = data.find((section) => section.sectionKey === "whoWeAre");

  // if (!whoWeAre) return null;

  // const response = whoWeAre.data;

  return (
    <>
      <section id="homepage-section-2" className="bg-whitesmoke">
        <main className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          {/* <div className="flex md:flex-row flex-col justify-between">
            <div>
              <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
                <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                <h5 className="font-medium text-pink">{response.tagName}</h5>
              </div>
              <div className="py-2 w-full sm:w-[50%] lg:w-[70%]">
                <h1
                  className="text-black  font-light"
                  dangerouslySetInnerHTML={{ __html: response.title }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:md:w-[70%] pt-2">
              <h6
                className="text-black font-light"
                dangerouslySetInnerHTML={{ __html: response.description }}
              />
            </div>
          </div> */}
          <div className=" relative">
            <TabSwitch setActiveTab={setActiveTab} activeTab={activeTab} />
          </div>
        </main>
      </section>
    </>
  );
}

export const TabSwitch = ({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: (value: string) => void;
  activeTab: string;
}) => {
  const { isHeaderVisible } = useHeader();

  const { data: knowledgeInfo } = useApiHook<KnowledgeApiResponse>({
    url: "/knowledge/recent",
    cacheKey: "knowledge",
  });

  const knowledgeApiData: TabApiResponse[] = useMemo(() => {
    if (!knowledgeInfo) return [];

    const arr: TabApiResponse[] = [];

    if (knowledgeInfo.researchPaper) {
      arr.push({
        id: knowledgeInfo.researchPaper.id as any,
        img: knowledgeInfo.researchPaper.image || "",
        category: "Research Paper",
        title: knowledgeInfo.researchPaper.title,
        link: knowledgeInfo.researchPaper.link,
        date: knowledgeInfo.researchPaper.date,
        subtitle: knowledgeInfo.researchPaper.description,
      });
    }

    if (knowledgeInfo.conversation) {
      arr.push({
        id: knowledgeInfo.conversation.id as any,
        img: knowledgeInfo.conversation.image || "",
        category: "The Infravision Conversation",
        title: knowledgeInfo.conversation.title,
        link: knowledgeInfo.conversation.videoLink || "#",
        date: knowledgeInfo.conversation.date,
        subtitle: knowledgeInfo.conversation.desc,
        ctaText: "Watch now",
      });
    }

    if (knowledgeInfo.blog) {
      arr.push({
        id: knowledgeInfo.blog.id as any,
        img: knowledgeInfo.blog.coverImage || "",
        category: "Blog",
        title: knowledgeInfo.blog.title,
        link: knowledgeInfo.blog.docFile,
        date: knowledgeInfo.blog.publishedDate,
        subtitle: knowledgeInfo.blog.subtitle,
      });
    }

    return arr;
  }, [knowledgeInfo]);

  const { data } = useApiHook<{ data: TabApiResponse[] }>({
    url: "/homepage/advocacy",
    cacheKey: "advocacy",
  });

  if (!data || !knowledgeInfo) {
    return null;
  }



  const advocacyData = data?.data ?? [];

  return (
    <div>
      <div
        className={`${isHeaderVisible ? "top-20 xl:top-24" : "top-0"
          } sticky bg-whitesmoke py-6 xl:py-8 z-[99] transition-all duration-200 ease-linear`}
      >
        <div className=" flex flex-row sm:justify-center  items-center gap-12 md:gap-18 border-b sm:mx-auto  border-darkgray/16 w-fit">
          <button
            onClick={() => setActiveTab("Knowledge")}
            className={`text-base cursor-pointer  md:text-xl   ${activeTab === "Knowledge"
              ? "font-medium  border-b-2 border-pink pb-3 text-pink"
              : "text-darkgray  pb-3"
              }`}
          >
            Knowledge
          </button>

          <button
            onClick={() => setActiveTab("Advocacy")}
            className={` text-base cursor-pointer  md:text-xl ${activeTab === "Advocacy"
              ? "font-medium  border-b-2 pb-3 border-pink text-pink"
              : "text-darkgray  pb-3"
              }`}
          >
            Advocacy
          </button>

        </div>
      </div>

      <div className="">
        {activeTab === "Knowledge" ? (
          <Suspense
            fallback={
              <section className="w-full h-[40rem] flex items-center justify-center">
                <Loading />
              </section>
            }
          >
            <TabContent data={knowledgeApiData} link="/knowledge" />
          </Suspense>
        ) : (
          <Suspense
            fallback={
              <section className="w-full h-[40rem] flex items-center justify-center">
                <Loading />
              </section>
            }
          >
            <TabContent data={advocacyData} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export const TabContent = ({
  data,
  link,
}: {
  data: TabApiResponse[];
  link?: string;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-2 sm:gap-8 lg:gap-12  md:blade-top-padding-sm">
        {data.map((item) => (
          <Card
            key={item.id}
            date={item.date}
            title={item.title}
            image={item.img}
            link={item.link}
            category={item.category}
            subtitle={item.subtitle}
            ctaText={item.ctaText ? item.ctaText : "Read more"}
            classes=" text-lg md:text-xl text-black"
          />
        ))}
      </div>{" "}
      {link && (
        <div className="flex justify-center xl:mt-6">
          <div className="">
            <Link
              className={`group  text-xl lg:text-2xl   text-pink hover:text-white cursor-pointer  text-nowrap w-40  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
              href={link}
            >
              <span className="z-50 relative">Explore</span>
              <span
                className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
              ></span>
              <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[5] transition-all duration-700 ease-in-out z-0"></span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
