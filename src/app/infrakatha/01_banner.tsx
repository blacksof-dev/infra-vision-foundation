import image from "@/../public/assets/infrakatha/banner/banner.jpg"
import Banner from "@/_components/molecules/banner";

export default function BannerSection() {
    return (
        <Banner
            image={image}
            heading="Infrakatha"
            title="Infrakatha"
            subdesc="A series of conversations on infrastructure with brilliant minds, exclusive insights, and compelling stories."
        />
    )
}
