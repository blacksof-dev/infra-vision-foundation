import bannerBg from "@/../public/assets/resource/bannerBg.png";
import mobilebannerbg from "@/../public/assets/resource/mobilebannerbg.png";
import Banner from "@/_components/molecules/Banner";

export default function ResourceBanner() {
  return(
  <>
    <Banner
      image={bannerBg}
      mobileimage={mobilebannerbg}
      heading="Resources"
      title="Resources"
      subdesc="A nexus of expert insights, media updates, and more."
    />
  </>
  )
}
