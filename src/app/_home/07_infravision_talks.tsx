"use client";
import Newsletter from "@/_components/molecules/newsletter";

import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "./01_banner";

export default function InfravisionTalks() {
  const { data} = useApiHook<ApiResponse>({
    url: "/content/get-involved",
    cacheKey: "homeContent-getInvolved",
  });

  console.log(data)
 if(!data){return null}

  return (
    <Newsletter
      id="homepage-section-7"
      bgImage={data.backgroundImageDesktop}
      mobilebg={data.backgroundImageMobile}
      tag={data.label}
      title={data.heading}
      desc={data.description}
      ctaText={data.ctaText ?? ""}
      ctaLink={data.ctaLink}
    />
  );
}
