import Banner from "../../_components/molecules/banner";
import bannerPublication from "@/../public/assets/publication/bannerPublication.png";


export default function PublicationBanner(){
    return(
        <>
         <Banner
          image={bannerPublication}
          heading="Publications"
          title="Publications"
          subdesc=" Rigorous knowledge assets shaping India's infrastructure growth story"
         />
        </>
    )
}