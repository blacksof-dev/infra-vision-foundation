import Image from "next/image";

import Updates from "./updates";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
export const revalidate = 60;

interface BannerContent {
  heading: string;
  description: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}

export default async function Banner() {
  const content = await getFetch<BannerContent>("/content/home-banner-section");

  return (
    <>
      <section id="homepage-section-01">
        <div className="relative overflow-hidden">
          <div className="relative w-full h-[40rem]   lg:h-auto xl:h-full ">
            <Image
              src={getUrl(content?.backgroundImageDesktop)}
              alt="InfraVision Foundation"
              className="w-full h-full object-cover"
              width={1920}
              height={1024}
            ></Image>
          </div>
          <div className="w-container">
            <div className="  absolute top-[24%]  md:top-[30%] xl:top-[25%]">
              <div data-aos="fade-up" className="w-full   max-w-3xl">
                <h1
                  className="tracking-[-4%] font-light txt-black/90 "
                  dangerouslySetInnerHTML={{ __html: content.heading }}
                />
              </div>
              <div className="w-[90%] md:w-[60%] py-4">
                <h5
                  className="text-black "
                  dangerouslySetInnerHTML={{ __html: content.description }}
                />
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
