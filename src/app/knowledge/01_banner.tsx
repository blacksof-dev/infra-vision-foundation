import image from "@/../public/assets/knowledeg/banner/banner.jpg"
import bannerMobile from "@/../public/assets/knowledeg/banner/bannerMobile.jpg"
import Banner from "@/_components/molecules/banner";

export default function BannerSection() {
    return (
        <Banner
            image={image}
            mobileimage={bannerMobile}
            heading="Knowledge"
            title="Knowledge"
            subdesc="In-depth and independent analyses of India's infrastructure-related issues"
        />
    )
}
