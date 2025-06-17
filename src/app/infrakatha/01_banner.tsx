import image from "@/../public/assets/infrakatha/banner/banner.jpg"
import Banner from "@/_components/molecules/banner";

export default function BannerSection() {
    return (
        <Banner
            image={image}
            heading="InfraKatha"
            title="InfraKatha"
            subdesc="A forum advancing infrastructure through dialogue, insights, and thought leadership"
        />
    )
}
