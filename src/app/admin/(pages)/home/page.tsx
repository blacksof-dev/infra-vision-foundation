import React from "react";
import Banner from "./01_banner";
import Association from "./04_association";
import WhoWeAre from "./02_who_we_are";
import OurCore from "./03_our-core";

import GetInvolved from "./07_get-involved";

import SocialMedia from "./06_social_media";
import TeamsTrustees from "./trustees";

export default function Home() {
  return (
    <>
      <Banner />
      <WhoWeAre />
      <OurCore />
      <TeamsTrustees/>
      <Association />
      <SocialMedia />
      <GetInvolved />
    </>
  );
}
