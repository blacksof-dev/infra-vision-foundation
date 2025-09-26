"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import VideoPopup from "../../_components/molecules/videopopup";
import { BorderGrayHeroBtn, UnderlineWithHover, } from "@/_components/atoms/buttons";
import Link from "next/link";
import { useApiHook } from "@/lib/useApi";
import { TabApiRaw } from "../knowledge/02_researchPapers";
import { apiDateConversion, getImageUrl } from "@/lib/functionCalling";


interface Category {
  id: string;
  name: string;
  slug: string;
}

interface cardApiResponse {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  date: string;
  active: boolean;
  categories: Category[];
}



type ApiResponse = {
  tagName: string;
  title: string;
  description: string;
  desktopImg: string;
  mobileImg: string;
  cta: {
    text: string;
    target: string;
  }
}


export default function Video() {
  const [tab, setTab] = useState("All");

  const { data: content } = useApiHook<ApiResponse>({
    url: "/content/archive-video-content",
    cacheKey: "archive-video",
  });

  return (
    <section id="videos" className=" blade-top-padding-lg blade-bottom-padding-lg">
      <div className="w-container">
        <div>
          <div className="flex flex-row items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">{content?.tagName}</h5>
          </div>
          <div className="flex flex-col md:flex-row justify-between py-4">
            <div>
              <h1 className="font-light xl:tracking-[-3%]" dangerouslySetInnerHTML={{ __html: content?.title ?? "" }} />

            </div>
            <div className="flex flex-row gap-3 mt-auto py-4 md:py-0">
              <FaYoutube className="text-red-700 text-2xl md:text-3xl my-auto" />
              <Link href={content?.cta?.target ?? ""}>
                <button className="text-black text-lg lg:text-xl justify-center items-center cursor-pointer relative font-medium tracking-[-1%] border-b border-pink pb-1">
                  {content?.cta?.text}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:pt-4">
          <TabsSection tab={tab} setTab={setTab} />
          <CardSection tab={tab} />
        </div>
      </div>
    </section>
  );
}



function TabsSection({ tab, setTab, }: { tab: string; setTab: (tabname: string) => void; }) {

  const { data: tabDetails } = useApiHook<TabApiRaw[]>({
    url: "/archives/videos/categories",
    cacheKey: "archive-video-tab",
  });

  const activeTabs = useMemo(() =>
    tabDetails?.map(tab => tab.name) ?? [],
    [tabDetails]);


  return (
    <div className="flex flex-col md:flex-row gap-6 border-b border-darkgray/20">
      <div className="sm:border-r sm:border-darkgray/20">
        <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">Filter by</h5>
      </div>
      <div className="flex flex-row gap-4 md:gap-5 flex-wrap">
        <button
          className={`mt-auto text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4 ${tab === "All"
            ? "text-pink font-medium border border-pink"
            : "border border-lightgray/30"
            }`}
          onClick={() => setTab("All")}
        >
          All
        </button>
        {activeTabs.map((ele) => (

          <button
            key={ele}
            className={`mt-auto text-sm md:text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4 ${tab === ele
              ? "text-pink font-medium border border-pink"
              : "border border-lightgray/30"
              }`}
            onClick={() => setTab(ele)}
          >
            {ele}
          </button>
        ))}
      </div>
    </div>
  );
}

function CardSection({ tab }: { tab: string }) {
  const [videoLink, setVideoLink] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  // keep track of records for each tab
  const [records, setRecords] = useState<{
    [key: string]: { page: number; cards: cardApiResponse[]; totalCount: number };
  }>({});

  const { data: tabDetails } = useApiHook<TabApiRaw[]>({
    url: "/archives/videos/categories",
    cacheKey: "archive-video-tab",
  });

  const selectedCategoryId =
    tab !== "All" ? tabDetails?.find((c) => c.name === tab)?.id : undefined;

  // create a unique key per tab
  const currentKey = tab;
  const currentData = records[currentKey] ?? {
    page: 1,
    cards: [],
    totalCount: 0,
  };

  // Build API URL
  const apiUrl = selectedCategoryId
    ? `/archives/videos/categories/${selectedCategoryId}?page=${currentData.page}&limit=3`
    : `/archives/videos?page=${currentData.page}&limit=3`;

  // API call
  const { data: cardDetails } = useApiHook<{
    data: cardApiResponse[];
    meta: { total: number; page: number; totalPages: number };
  }>({
    url: apiUrl,
    cacheKey: `archive-video-card-${tab}-page-${currentData.page}`,
  });

  console.log(cardDetails)

  // merge results into local state
  useEffect(() => {
    if (cardDetails?.data) {
      setRecords((prev) => {
        const prevState = prev[currentKey] ?? {
          page: 1,
          cards: [],
          totalCount: 0,
        };
        return {
          ...prev,
          [currentKey]: {
            page: currentData.page,
            cards:
              currentData.page === 1
                ? cardDetails.data
                : [...prevState.cards, ...cardDetails.data],
            totalCount: cardDetails.meta?.total ?? 0,
          },
        };
      });
    }
  }, [cardDetails, currentKey, currentData.page]);

  // handle see more
  const handleSeeMore = () => {
    setRecords((prev) => ({
      ...prev,
      [currentKey]: {
        ...currentData,
        page: currentData.page + 1,
      },
    }));
  };

  const canSeeMore =
    currentData.totalCount > 0 &&
    currentData.cards.length < currentData.totalCount;

  const handleVideoClick = (link: string) => {
    setVideoLink(link);
    setPopupOpen(true);
  };

  return (
    <>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 md:gap-10 xl:gap-10">
        {currentData.cards.map((ele) => (
          <div key={ele.id} className="pt-4 md:pt-10 xl:pt-12">
            <div
              className="h-[18rem] md:h-[20rem] xl:h-[14rem] relative 2xl:h-[19rem] w-full bg-no-repeat bg-cover bg-center rounded"
              style={{ backgroundImage: `url(${getImageUrl(ele.image)})` }}
            >
              <Image
                src={getImageUrl(ele.image)}
                alt={ele.subtitle}
                fill
                className="w-full h-full cursor-pointer"
                onClick={() => handleVideoClick(ele.link)}
              />
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between py-3">
                <div className="flex flex-row items-center gap-2 md:gap-3">
                  <span className="w-[7px] h-[7px] md:w-[12px] md:h-[12px] rounded-full bg-darkgray/30"></span>
                  <p className="text-black">{ele.subtitle}</p>
                </div>
                <div>
                  <p className="text-darkgray">{apiDateConversion(ele.date)}</p>
                </div>
              </div>

              <div className="w-full md:w-[90%]">
                <h5 className="text-blacksecond font-medium">
                  {ele.title}
                </h5>
              </div>
            </div>

            <div className="py-2 md:py-4">
              <BorderGrayHeroBtn
                text="Watch video"
                role="button"
                borderColor="darkgray/40"
                color="black"
                bgColor="white"
                size="base"
                handlepopup={() => handleVideoClick(ele.link)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {canSeeMore && (
        <div className="flex justify-center mb-4 sm:mt-4">
          <UnderlineWithHover
            size="xxlsize"
            color="pink"
            bgColor="pink"
            text="See more"
            role="button"
            borderColor="white"
            handlefun={handleSeeMore}
          />
        </div>
      )}
      {/* Popup */}
      {popupOpen && (
        <VideoPopup src={videoLink} onClose={() => setPopupOpen(false)} />
      )}
    </>
  );
}


