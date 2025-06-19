import bannerBg from "@/../public/assets/infrapandit/bannerBg.png";
import bannerBgMobile from "@/../public/assets/infrapandit/BannerBgMobile.png";
import Banner from "@/_components/molecules/banner";

export default function InfraPanditBanner() {
  return (
    <>
      <Banner
        image={bannerBg}
        link="https://docs.google.com/forms/d/e/1FAIpQLSdjpffzJCT6qmQXNUmoUau7giN4qVTsm5j3ysGZ0r8QxiG05g/viewform?usp=sharing&ouid=118204303619309850521"
        mobileimage={bannerBgMobile}
        buttonText="Register now"
        heading="InfraPandit Awards"
        title="InfraPandit Awards"
        subdesc="Celebrating the next generation of infrastructure changemakers"
      />
    </>
  );
}
