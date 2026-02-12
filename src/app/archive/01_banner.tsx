import React from "react";
import Banner from "@/_components/molecules/banner";
 
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

interface BannerData {
  heading: string;
  description: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}

export default async function BannerSection() {
  const data = await getFetch<BannerData>("/content/archive-banner-section");
  return (
    <Banner
      id="archiveBanner"
      image={getUrl(data.backgroundImageDesktop)}
      mobileimage={getUrl(data.backgroundImageMobile)}
      heading="Archives"
      title={data.heading}
      subdesc={data.description}
    />
  );
}
