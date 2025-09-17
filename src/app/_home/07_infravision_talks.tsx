"use client";
import Newsletter from "@/_components/molecules/newsletter";
import Loading from "../loading";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "./01_banner";

export default function InfravisionTalks() {
  const { data, isLoading, error } = useApiHook<ApiResponse>({
    url: "/content/home-getInvolved-content",
    cacheKey: "homeContent-getInvolved",
  });

  if (isLoading) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <p>Something went wrong</p>
      </section>
    );
  }

  console.log(data)



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
