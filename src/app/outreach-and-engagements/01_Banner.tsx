"use client";
import Banner from "@/_components/molecules/banner";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";

export default function OutreachBanner() {
    const { data } = useApiHook<ApiResponse>({
      url: "/content/outreach-and-engagements-banner",
      cacheKey: "outReach-engagement-banner-content",
    });
  
    if (!data) return null;
  
    const response = data;

 
  return (
    <>
      <Banner
        id="outreactAndEngagement"
        backgroundImageDesktop={response.backgroundImageDesktop}
        backgroundImageMobile={response.backgroundImageMobile}
        tagName="Outreach and Engagements"
        heading={response.heading}
        description={response.description}
      />
    </>
  )
}
