import MediaSection from "@/_components/molecules/mediaSectionTemplate";
import {resourceData,cardData} from './static'
import news1 from "@/../public/assets/resource/newsMedia/news1.png"

export default function Publication(){
  return(
    <>
     <MediaSection
      title="News and media"
      desc="<span class ='text-black font-medium'> The Infravision Foundation <br /> </span> in the public sphere"
      img1={news1}
      blog1title="Article"
      blog1date="August, 2024"
      blog1desc="Group taxation regime for infrastructure"
      blog1link="https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html"
      cards={cardData}
      data={resourceData}
     />
    
    </>
  )
}


