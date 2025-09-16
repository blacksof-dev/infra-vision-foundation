"use client"

import Banner from "@/_components/molecules/banner";
import { useApiHook } from "@/lib/useApi";

export interface bannerApiResponse{
id:string
tagName:string;
title:string;
description:string;
desktopImg:string;
mobileImg:string;
buttonText?:string;
link?:string;
}
export default function BannerSection(){

 const { data } = useApiHook<bannerApiResponse>({
    url: "/content/knowledge-banner-content",
    cacheKey: "knowledgeBanner",
  }); 
  
  if (!data) {
    return null;
  }

    return (
        <Banner
            id="knowledge-section1"
             desktopImg={data.desktopImg}
             mobileImg={data.mobileImg}
            tagName={data.tagName}
            title={data.title}
            description={data.description}
        />
    )
}
