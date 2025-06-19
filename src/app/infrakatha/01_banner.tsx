import image from "@/../public/assets/infrakatha/banner/banner.png"
import mobileBanner from "@/../public/assets/infrakatha/banner/mobileBanner.png"
import Banner from "@/_components/molecules/banner";

export default function BannerSection() {
    return (
        <Banner
            image={image}
             mobileimage={mobileBanner}
            heading="Infrakatha"
            title="Infrakatha"
            subdesc="A series of conversations <br/> on infrastructure with  brilliant minds, <br/> exclusive insights, and compelling stories."
        />
    )
}
