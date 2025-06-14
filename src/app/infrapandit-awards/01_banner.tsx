import bannerBg from "@/../public/assets/infrapandit/bannerBg.png";
import Banner from "@/_components/molecules/Banner";

export default function InfraPanditBanner() {
  return(
  <>
    <Banner
      image={bannerBg}
      mobileimage={bannerBg}
      buttonText="Register now"
      heading="InfraPandit Awards"
      title="InfraPandit Awards"
      subdesc="Celebrating the next generation of infrastructure changemakers"
    />
  </>
  )
}
