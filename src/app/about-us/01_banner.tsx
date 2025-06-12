import bannerBg from "@/../public/assets/about-us/bannerBg.png";
import Banner from "@/_components/molecules/Banner";

export default function AboutUsBanner() {
  return(
  <>
    <Banner
      image={bannerBg}
      mobileimage={bannerBg}
      heading="About Us"
      title="About Us"
      subdesc="Nation at heart. Infrastructure in mind. Economic prosperity in action."
    />
  </>
  )
}
