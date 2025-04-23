import bannerBg from "@/../public/assets/resource/bannerBg.png";
import Banner from "@/_components/molecules/banner";

export default function ResourceBanner() {
  return(
  <>
    <Banner
      image={bannerBg}
      heading="Resources"
      title="Resources"
      subdesc="A nexus of expert insights, media updates, and more."
    />
  </>
  )
}
