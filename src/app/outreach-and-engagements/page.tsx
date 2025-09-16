import React from "react";
import OutreachBanner from "./01_Banner";
import Upcoming from "./03_upcoming";
import InfravisionTalks from "../_home/07_infravision_talks";

const OutreachAndEngagements = () => {
  return (
    <>
      <OutreachBanner />

      <div id="upcoming">
        <Upcoming />
      </div>

      <InfravisionTalks />
    </>
  );
};

export default OutreachAndEngagements;
