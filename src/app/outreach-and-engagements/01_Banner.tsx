"use client";
import Banner from "@/_components/molecules/banner";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";

export default function OutreachBanner() {
    const { data } = useApiHook<ApiResponse>({
      url: "/content/outReach-engagement-banner-content",
      cacheKey: "outReach-engagement-banner-content",
    });
  
    if (!data) return null;
  
    const response = data;

 
  return (
    <>
      <Banner
        id="outreactAndEngagement"
         desktopImg={response.desktopImg}
        mobileImg={response.mobileImg}
        tagName={response. tagName}
        title={response.title}
        description={response.description}
      />
    </>
  )
}
