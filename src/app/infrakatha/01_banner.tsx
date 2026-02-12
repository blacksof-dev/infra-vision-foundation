 
import Banner from "@/_components/molecules/banner";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
// import { unstable_noStore as noStore } from "next/cache";
interface BannerData {
  heading: string;
  description: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}


export default async function BannerSection() { 
    //  noStore();

  const data = await getFetch<BannerData>(
    "/content/infrakatha-banner",
  );

    return (
        <Banner
            id="infrakathaBanner"
            image={getUrl(data.backgroundImageDesktop)}
             mobileimage={getUrl(data.backgroundImageMobile)}
            heading="Infrakatha"
            title={data.heading}
            subdesc={data.description}
        />
    )
}
