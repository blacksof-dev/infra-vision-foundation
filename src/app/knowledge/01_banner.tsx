import image from "@/../public/assets/knowledeg/banner/banner.jpg"
import Banner from "@/_components/molecules/banner";

export default function BannerSection() {
    return (
        <Banner
            image={image}
            heading="Knowledge"
            title="Knowledge"
            subdesc="Knowledge resources shaping India's infrastructure growth story."
        />
    )
}
