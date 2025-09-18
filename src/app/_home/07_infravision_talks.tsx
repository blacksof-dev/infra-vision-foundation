"use client";
import Newsletter from "@/_components/molecules/newsletter";

import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "./01_banner";

export default function InfravisionTalks() {
  const { data} = useApiHook<ApiResponse>({
    url: "/content/home-getInvolved-content",
    cacheKey: "homeContent-getInvolved",
  });

 if(!data){return null}

  return (
    <Newsletter
      id="homepage-section-7"
      bgImage={data.desktopImg}
      mobilebg={data.mobileImg}
      tag={data.tagName}
      title={data.title}
      desc={data.description}
      ctatext={data.cta?.text??""}
      ctaLink={data.cta?.target?? ""}
    />
  );
}
