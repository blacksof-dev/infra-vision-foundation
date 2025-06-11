import BannerSection from "./01_banner";
import About from "./02_about";
import PastEvents from "./04_past";
import GetInvolvedSection from "./05_getInvolved";

export default function page() {
    return (
        <>
            <BannerSection />
            <About />
            <PastEvents />
            <GetInvolvedSection />
        </>
    )
}
