"use client"

import Banner from "@/_components/molecules/banner";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";


export default function BannerSection(){

 const { data } = useApiHook<ApiResponse>({
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
