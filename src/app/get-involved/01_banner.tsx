import banner from "@/../public/assets/contact/banner.png";
import bannerMob from "@/../public/assets/contact/bannerMobile.png";
import Banner from "@/_components/molecules/banner";



export default function ContactBanner() {
    return (
        <>
            <Banner
                image={banner}
                mobileimage={bannerMob}
                heading="Get Involved"
                title="Get Involved"
                subdesc="Join our community, ask questions, or participate in building a resilient India."
            />
        </>
    )
}