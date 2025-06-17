import banner from "@/../public/assets/infraShakti/banner.png"
import Banner from "@/_components/molecules/banner";

export default function BannerSection() {
    return (
        <Banner
            image={banner}
            heading="InfraShakti Awards"
            title="InfraShakti Awards"
            subdesc="From innovation, impact, and beyond— Celebrating the champions of infrastructure."
            buttonText="Watch the ceremony "
            link="https://www.youtube.com/embed/9DIAhTDim9Y"
        />
    )
}