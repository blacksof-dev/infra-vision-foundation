import bannerBg from "@/../public/assets/outreach-and-engagements/bannerBg.png";
import Banner from "@/_components/molecules/banner";

export default function OutreachBanner() {
  return(
  <>
    <Banner
      image={bannerBg}
      mobileimage={bannerBg}
      buttonText="Get notified"
      heading="Outreach and engagements"
      title="Outreach and engagements"
      subdesc="Join the discourse of a prosperous India driven by industry experts and thought leaders."
    />
  </>
  )
}
