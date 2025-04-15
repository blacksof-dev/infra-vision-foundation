import Banner from "./01_banner"
import Decoding from "./02_decoding"
import Turning from "./03_turning"
import Driving from "./04_driving"
import Infravisionaries from "./05_infravisionaries"
import Publication from "./06_publication"
import Blogs from "./07_blogs"
import Champion from "./08_champion"
import StayConnected from "./09_connected"
import InfravisionTalks from "./10_infravision_talks"


export default function Home(){
  return (
    <>
      <Banner/>
      <Decoding />
      <Turning />
      <Driving />
      <Infravisionaries />
      <Publication />
      <Blogs />
      <StayConnected />
      <Champion />
     
      <InfravisionTalks />
    </>
  );
}


