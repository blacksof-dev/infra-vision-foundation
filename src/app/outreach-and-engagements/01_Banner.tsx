import Banner from "@/_components/molecules/banner";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
import { Metadata } from "next";
 

export interface BannerData {
  heading: string;
  description: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}

export default async function OutreachBanner() {


  const data = await getFetch<BannerData>(
    "/content/outreach-and-engagements-banner",
  );

  return (
    <>
      <Banner
        id="outreactAndEngagement"
        image={getUrl(data.backgroundImageDesktop)}
        mobileimage={getUrl(data.backgroundImageMobile)}
        // buttonText="Get notified"
        heading={"Outreach and Engagements"}
        title={data.heading}
        subdesc={data.description}
      />
    </>
  );
}
