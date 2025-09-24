"use client";
import Image from "next/image";
import { useApiHook } from "@/lib/useApi";
import dynamic from "next/dynamic";
import Updates from "./updates";
import { getImageUrl } from "@/lib/functionCalling";


export interface ApiResponse {
  id: string;
  heading: string;
  description?: string;
  backgroundImageDesktop?: string;
  backgroundImageMobile?: string;
 tagName?:string;
 label?:string;
 ctaText?:string;
 ctaLink?:string
}
export default function Banner() {
  const { data } = useApiHook<ApiResponse>({
    url: "/content/home-banner-section",
    cacheKey: "homeContent-banner",
  });

  if (!data) return null;

  const response = data;

  return (
    <>
      <section id="homepage-section-01">
        <div className="relative overflow-hidden">
          <div className="relative w-full h-[40rem] xl:h-[47rem] 2xl:h-[55rem] 3xl:h-screen">
            <Image
              src={getImageUrl(data.backgroundImageDesktop)}
              fill
              alt="InfraVision Foundation"
              className="h-full w-full object-cover"
              quality={70}
              priority
            />
          </div>
          <div className="w-container">
            <div className="absolute top-[24%] md:top-[30%] xl:top-[25%]">
              <div
                data-aos="fade-up"
                className="sm:w-[70%] md:w-[50%] lg:w-[50%]"
              >
                <h1
                  className="tracking-[-4%] font-light txt-black/90"
                  dangerouslySetInnerHTML={{ __html: response.heading }}
                />
              </div>
              <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] py-4">
                <h5 className="text-black">{response.description}</h5>
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
