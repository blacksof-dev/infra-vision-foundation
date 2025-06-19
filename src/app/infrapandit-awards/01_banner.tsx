import bannerBg from "@/../public/assets/infrapandit/bannerBg.png";
import bannerBgMobile from "@/../public/assets/infrapandit/BannerBgMobile.png";
import Banner from "@/_components/molecules/banner";

export default function InfraPanditBanner() {
  return (
    <>
      <Banner
        image={bannerBg}
        mobileimage={bannerBgMobile}
        buttonText="Register now"
        heading="InfraPandit Awards"
        title="InfraPandit Awards"
        subdesc="Celebrating the next generation of infrastructure changemakers"
      />
    </>
  )
}
