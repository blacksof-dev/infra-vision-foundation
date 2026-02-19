"use client";

import { useState, useMemo } from "react";
import Card from "@/_components/molecules/cardTemplate";
import { useHeader } from "@/context/useHeader";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

export type TabItem = {
  id: string | number;
  img: string;
  category: string;
  title: string;
  link: string;
  date?: string;
  subtitle?: string;
  ctaText?: string;
};

interface WhoWeAreContent {
  label: string;
  heading: string;
  description: string;
}

interface Item {
  id: string;
  title: string;
  date?: string;
  image?: string;
  link?: string;
  coverImage?: string;
  slug?: string;
  author?: string;
  publishedDate?: string;
  videoLink?: string;
  name?: string;
}

interface KnowledgeRecent {
  researchPaper?: Item;
  conversation?: Item;
  blog?: Item;
}

interface AdvocacyItem {
  id: string;
  image: string;
  label: string;
  title: string;
  ctaText: string;
  ctaLink: string;
}

const formatHeading = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={index} className="text-black font-medium ">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
};

const formatDescription = (text?: string) => {
  if (!text) return "";
  return text.replace(
    /\*\*(.*?)\*\*/g,
    '<span class="font-semibold">$1</span>',
  );
};

export default function WhoWeAre() {
  const [activeTab, setActiveTab] = useState("Knowledge");

  const { data: content } = useQuery({
    queryKey: ["who-we-are-content"],
    queryFn: () => getFetch<WhoWeAreContent>("/content/who-we-are"),
  });

  const { data: knowledgeData } = useQuery({
    queryKey: ["knowledge-recent"],
    queryFn: () => getFetch<KnowledgeRecent>("/knowledge/recent"),
  });

  const { data: advocacyData = [] } = useQuery({
    queryKey: ["homepage-advocacy"],
    queryFn: () => getFetch<AdvocacyItem[]>("/homepage/advocacy"),
  });

  const processedKnowledge: TabItem[] = useMemo(() => {
    const list: TabItem[] = [];
    if (knowledgeData?.researchPaper) {
      list.push({
        id: knowledgeData.researchPaper.id,
        img: getUrl(knowledgeData.researchPaper.image || ""),
        category: "Infrastructure",
        title: knowledgeData.researchPaper.title,
        link: getUrl(knowledgeData.researchPaper.link || ""),
        date: "",
      });
    }
    if (knowledgeData?.conversation) {
      list.push({
        id: knowledgeData.conversation.id,
        img: getUrl(knowledgeData.conversation.image || ""),
        category: "The Infravision Conversation",
        title: knowledgeData.conversation.title,
        subtitle: knowledgeData.conversation.name,
        link: getUrl(knowledgeData.conversation.videoLink || ""),
        ctaText: "Watch now",
      });
    }
    if (knowledgeData?.blog) {
      list.push({
        id: knowledgeData.blog.id,
        img: getUrl(knowledgeData.blog.coverImage || ""),
        category: "Blog",
        title: knowledgeData.blog.title,
        link: `/blogs/${knowledgeData.blog.slug}`,
        date: knowledgeData.blog.publishedDate
          ? new Date(knowledgeData.blog.publishedDate).toLocaleDateString(
              "en-US",
              {
                month: "long",
                year: "numeric",
              },
            )
          : "",
      });
    }
    return list;
  }, [knowledgeData]);

  const processedAdvocacy: TabItem[] = useMemo(() => {
    return advocacyData.map((item) => ({
      id: item.id,
      img: getUrl(item.image),
      category: item.label,
      title: item.title,
      link: item.ctaLink,
      ctaText: item.ctaText,
    }));
  }, [advocacyData]);

  return (
    <>
      <section id="homepage-section-2" className="bg-whitesmoke">
        <main className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          <div className="flex md:flex-row flex-col justify-between">
            <div>
              <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
                <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                <h5 className="font-medium text-pink">
                  {content?.label || "Who We Are"}
                </h5>
              </div>
              <div className="py-2 ">
                <h1 className="text-black  font-light max-w-xl 2xl:max-w-3xl">
                  {content ? (
                    formatHeading(content.heading)
                  ) : (
                    <>
                      A{" "}
                      <span className="text-black font-medium ">
                        think-and-do tank
                      </span>
                      <br /> powering change in India’s infrastructure
                    </>
                  )}
                </h1>
              </div>
            </div>
            <div className="w-full md:w-1/2 xlg:md:w-[40%] pt-2">
              <h6
                className="text-black font-light"
                dangerouslySetInnerHTML={{
                  __html: content
                    ? formatDescription(content.description)
                    : `Established in 2022 by Vinayak Chatterjee and Rumjhum Chatterjee, <span class="font-semibold">The Infravision Foundation</span> is a non-partisan, not-for-profit think tank driving <span class="font-semibold">infrastructure-led economic development.</span>`,
                }}
              />
            </div>
          </div>
          <div className=" relative">
            <TabSwitch
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              knowledge={processedKnowledge}
              advocacy={processedAdvocacy}
            />
          </div>
        </main>
      </section>
    </>
  );
}

export const TabSwitch = ({
  setActiveTab,
  activeTab,
  knowledge,
  advocacy,
}: {
  setActiveTab: (value: string) => void;
  activeTab: string;
  knowledge: TabItem[];
  advocacy: TabItem[];
}) => {
  const { isHeaderVisible } = useHeader();
  return (
    <div>
      <div
        className={`${
          isHeaderVisible ? "top-20 xl:top-22" : "top-0"
        } sticky bg-whitesmoke py-6 xl:py-8 z-[99] transition-all duration-200 ease-linear`}
      >
        <div className=" flex flex-row sm:justify-center  items-center gap-12 md:gap-18 border-b sm:mx-auto  border-darkgray/16 w-fit">
          <button
            onClick={() => setActiveTab("Knowledge")}
            className={`text-base cursor-pointer  md:text-xl   ${
              activeTab === "Knowledge"
                ? "font-medium  border-b-2 border-pink pb-3 text-pink"
                : "text-darkgray  pb-3"
            }`}
          >
            Knowledge
          </button>
          <button
            onClick={() => setActiveTab("Advocacy")}
            className={` text-base cursor-pointer  md:text-xl ${
              activeTab === "Advocacy"
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
          <TabContent data={knowledge} link="/knowledge" />
        ) : (
          <TabContent data={advocacy} />
        )}
      </div>
    </div>
  );
};

export const TabContent = ({
  data,
  link,
}: {
  data: TabItem[];
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
