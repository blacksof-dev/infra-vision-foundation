"use client";
import Newsletter from "@/_components/molecules/newsletter";
import Loading from "../loading";
import { useApiHook } from "@/lib/useApi";
import { ApiResponse } from "./01_banner";

export default function InfravisionTalks() {
  const { data, isLoading, error } = useApiHook<ApiResponse[]>({
    url: "/content/home",
    cacheKey: "homeContent",
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
 

  const talk = data.find((section) => section.sectionKey === "getInvolved");
  const response = talk?.data;

  if (!response) return null;


  return (
    <Newsletter
      id="homepage-section-7"
      bgImage={`/assets/home/${response.desktopImg }`}
      mobilebg={`/assets/home/${response.mobileImg }`}
      tag={response.tagName}
      title={response.title}
      desc={response.description}
      ctatext={response.cta?.text??""}
      ctaLink={response.cta?.target}
    />
  );
}
