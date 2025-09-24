"use client"
import React from "react";
import Banner from "@/_components/molecules/banner";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";

export default function BannerSection() {
   const { data } = useApiHook<ApiResponse>({
      url: "/content/archive-banner-section",
      cacheKey: "archiveBanner",
    }); 
    
    if (!data) {
      return null;
    }


  return (
    <Banner
      id="archiveBanner"
      backgroundImageDesktop={data.backgroundImageDesktop}
      tagName="Archive"
      heading={data.heading}
      description={data.description}
    />
  );
}
