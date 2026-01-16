import React from "react";
import Banner from "./01_banner";
import Association from "./04_association";
import WhoWeAre from "./02_who_we_are";
import OurCore from "./03_our-core";
import Teams from "./teams";
import GetInvolved from "./07_get-involved";
import Advisors from "./advisors";

import SocialMedia from "./06_social_media";
import TeamsTrustees from "./trustees";
import Fellows from "./fellow";
import Patrons from "./patrons";

export default function Home() {
  return (
    <>
      <Banner />
      <WhoWeAre />
      <OurCore />
      <TeamsTrustees />
      <Patrons />
      <Advisors />
      <Fellows />
      <Teams />
      <Association />
      <SocialMedia />
      <GetInvolved />
    </>
  );
}
