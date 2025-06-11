import Highlights from "./05_highlights"
import Banner from "./01_banner";
import WhoWeAre from "./02_whoWeAre";
import Infravisionaries from "./03_infravisionaries";
import Association from "./04_association";
import StayConnected from "./06_connected";
import InfravisionTalks from "./07_infravision_talks";

export default function Home() {
  return (
    <>
      <Banner />
      <WhoWeAre />
      <Infravisionaries />
       <Association />
       <Highlights/>
      <StayConnected />
      <InfravisionTalks />
    </>
  );
}
