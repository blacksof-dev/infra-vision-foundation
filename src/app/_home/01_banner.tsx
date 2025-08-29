"use client";
import Image from "next/image";
import Updates from "./updates";
import { useApiHook } from "@/lib/useApi";
import Loading from "../loading";

export interface ApiResponse {
  id: string;
  sectionKey: string;
  data: {
    tagName?: string;
    title: string;
    description: string;
    image?: string;
    desktopImg?: string;
    mobileImg?: string;
    cta?: {
      text: string;
      target: string;
    };
  };
}
export default function Banner() {
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
  if (!data) return null;

  const banner = data.find((section) => section.sectionKey === "bannerContent");
  if (!banner) return null;

  const response = banner.data;

  return (
    <>
      <section id="homepage-section-01">
        <div className="relative overflow-hidden">
          <div className="relative  w-full h-[40rem] xl:h-[47rem] 2xl:h-[56rem] 3xl:h-screen">
            <Image
              src={`/assets/home/${response.image}`}
              fill
              alt="InfraVision Foundation"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-container">
            <div className="  absolute top-[24%]  md:top-[30%] xl:top-[25%]">
              <div
                data-aos="fade-up"
                className="sm:w-[70%] md:w-[50%] lg:w-[50%]"
              >
                <h1
                  className="tracking-[-4%] font-light txt-black/90 "
                  dangerouslySetInnerHTML={{ __html: response.title }}
                />
              </div>
              <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%]   py-4">
                <h5 className="text-black ">{response.description}</h5>
              </div>
            </div>
            <div className="absolute bottom-8 xl:bottom-8 w-screen p-1">
              <Updates />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
