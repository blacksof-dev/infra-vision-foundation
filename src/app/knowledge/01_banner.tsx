"use client"

import Banner from "@/_components/molecules/banner";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/01_banner";


export default function BannerSection() {
  const { data } = useApiHook<ApiResponse>({
    url: "/content/knowledge-banner-section",
    cacheKey: "knowledgeBanner",
  });

  if (!data) {
    return null;
  }



  return (
    <Banner
      id="knowledge-section1"
      backgroundImageDesktop={data.backgroundImageDesktop}
      backgroundImageMobile={data.backgroundImageMobile}
      tagName="Knowledge"
      heading={data.heading}
      description={data.description}

    />
  )
}
