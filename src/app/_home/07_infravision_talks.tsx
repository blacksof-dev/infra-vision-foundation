// import infravisionfoundationBg from "@/../public/assets/home/infravisionfoundationBg.png";
// import infravisionTalkMobile from "@/../public/assets/home/infravisionTalkMobile.jpg";
"use client";
import Newsletter from "@/_components/molecules/newsletter";
import Loading from "../loading";
import { useApiHook } from "@/lib/useApi";

export interface ApiResponse {
  sectionKey: string;
  tagName: string;
  title: string;
  description: string;
  desktopImg: string;
  mobileImg: string;
  cta: {
    text: string;
    target: string;
  };
}

export default async function InfravisionTalks() {
  const { data, isLoading, error } = useApiHook<ApiResponse>({
    url: "/content/home/getInvolved",
    cacheKey: "getInvovled",
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

  return (
    <>
      <Newsletter
        id="homepage-section-7"
        bgImage={`/assets/home/${data.desktopImg}`}
        mobilebg={`/assets/home/${data.mobileImg}`}
        tag={`${data.tagName}`}
        title={`${data.title}`}
        desc={`${data.description}`}
        ctatext={`${data.cta.text}`}
        ctaLink={`${data.cta.target}`}
      />
    </>
  );
}
