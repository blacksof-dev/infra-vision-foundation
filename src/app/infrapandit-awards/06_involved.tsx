"use client";
import Newsletter from "@/_components/molecules/newsletter";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "../_home/07_infravision_talks";

export default function GetInvolved() {
  const { data } = useApiHook<ApiResponse>({
    url: "/content/home/getInvolved",
    cacheKey: "getInvolved",
  });

  if (!data) return null;
  return (
    <>
      <Newsletter
        bgImage={`/assets/home/${data.desktopImg}`}
        mobilebg={`/assets/home/${data.mobileImg}`}
        tag={data.tagName}
        title={data.title}
        desc={data.description}
        ctatext={data.cta.text}
        ctaLink={data.cta.target}
      />
    </>
  );
}
