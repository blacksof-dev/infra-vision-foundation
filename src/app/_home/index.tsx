import Banner from "./01_banner";
import WhoWeAre from "./02_whoWeAre";

import Association from "./04_association";

import Infravisionaries from "./05_infravisionaries";

import StayConnected from "./09_connected";
import InfravisionTalks from "./10_infravision_talks";

export default function Home() {
  return (
    <>
      <Banner />
      <WhoWeAre />
      <Infravisionaries />
      <Association />

      <StayConnected />

      <InfravisionTalks />
    </>
  );
}
