import banner from "@/../public/assets/contact/banner.png";
import Banner from "@/_components/molecules/banner";



export default function ContactBanner() {
    return (
        <>
            <Banner
                image={banner}
                heading="Get Involved"
                title="Get Involved"
                subdesc="Join our community, ask questions, or participate in building a resilient India."
            />
        </>
    )
}