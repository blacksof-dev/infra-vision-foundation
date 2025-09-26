import React from "react";
import Banner from "./01_banner";
import Association from "./04_association";
import WhoWeAre from "./02_who_we_are";
import OurCore from "./03_our-core";

import GetInvolved from "./07_get-involved";

import SocialMedia from "./06_social_media";
import TeamsTrustees from "./trustees";
import TeamsPatrons from "./patrons";
import TeamsAdvisors from "./advisor";
import TeamsFellows from "./fellows";

export default function Home() {
  return (
    <>
      <Banner />
      <WhoWeAre />
      <OurCore />
      <TeamsTrustees/>
      <TeamsPatrons/>
      {/* <TeamsAdvisors/> */}
      <TeamsFellows/>
      <Association />
      <SocialMedia />
      <GetInvolved />
    </>
  );
}
