import Banner from "@/_components/molecules/banner";
import banner from "@/../public/assets/contact/banner.png";


export default function ContactBanner() {
    return (
        <>
            <Banner
                image={banner}
                heading="Get Involved"
                title="Get Involved"
                subdesc="We are here to assist you with inquiries regarding our initiatives, publications, collaborations, or anything else."
            />
        </>
    )
}