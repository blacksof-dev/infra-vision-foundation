import bannerBg from "@/../public/assets/outreach-and-engagements/bannerBg.png";
import mobileBanner from "@/../public/assets/outreach-and-engagements/mobileBanner.png";
import Banner from "@/_components/molecules/banner";

export default function OutreachBanner() {
  return (
    <>
      <Banner
        image={bannerBg}
        mobileimage={mobileBanner}
        buttonText="Get notified"
        heading="Outreach and Engagements"
        title="Outreach and Engagements"
        subdesc="Join the infrastructure discourse, champion ideas, and refine insights into India's transforming economy."
      />
    </>
  )
}
