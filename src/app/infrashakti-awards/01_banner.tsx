 
import Banner from "@/_components/molecules/banner";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
 


export interface InfraShaktiBannerData {
  title: string;
  description: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
  ctaText: string;
  ctaLink: string;
}

export default async function BannerSection() {
  const data = await getFetch<InfraShaktiBannerData>(
    "/content/infrashakti-banner",
  );
  if (!data) return null;
  return (
    <Banner
      id="infrashaktiBanner"
      image={getUrl(data.backgroundImageDesktop)}
      mobileimage={getUrl(data.backgroundImageMobile)}
      heading={data.title}
      title={data.title}
      subdesc={data.description}
      buttonText={data.ctaText}
      link={data.ctaLink}
    />
  );
}
