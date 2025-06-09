import bannerBg from "@/../public/assets/outreach-and-engagements/bannerBg.png";
import mobilebannerbg from "@/../public/assets/resource/mobilebannerbg.png";
import Banner from "@/_components/molecules/Banner";

export default function OutreachBanner() {
  return(
  <>
    <Banner
      image={bannerBg}
      mobileimage={mobilebannerbg}
      heading="Outreach and engagements"
      title="Outreach and engagements"
      subdesc="Join the discourse of a prosperous India driven by industry experts and thought leaders."
    />
  </>
  )
}
