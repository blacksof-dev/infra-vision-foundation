"use client"
import React from "react";
import Banner from "@/_components/molecules/banner";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";

export default function BannerSection() {
   const { data } = useApiHook<ApiResponse>({
      url: "/content/archive-banner-content",
      cacheKey: "archiveBanner",
    }); 
    
    if (!data) {
      return null;
    }


  return (
    <Banner
      id="archiveBanner"
      desktopImg={data.desktopImg}
      tagName={data.tagName}
      title={data.title}
      description={data.description}
    />
  );
}
