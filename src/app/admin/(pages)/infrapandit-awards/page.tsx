"use client";
import React from "react";
import AboutInfraPanditAward from "./about-infrapandit-awarad";
import Members from "../infrakatha/infrakatha-host";
import Banner from "./banner";

export default function InfraPanditAwardsPage() {
  return (
    <div className="flex flex-col gap-y-10 pb-20">
      <Banner />
      <AboutInfraPanditAward />
      <Members
        title="InfraPandit Award Jury"
        apiKey="Infrapandit-award-jury"
        ctaText="Add a New Jury member"
      />
    </div>
  );
}
