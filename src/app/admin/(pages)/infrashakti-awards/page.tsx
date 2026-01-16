"use client";
import React from "react";
import Banner from "./banner";
import AwardTypes from "./awards-type";
import Awardees from "./awardees";
import CeremonyScenes from "./ceremony-scenes";
import Members from "../infrakatha/infrakatha-host";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-10 pb-20">
      <Banner />
      <AwardTypes />
      <Awardees />
      <CeremonyScenes />
      <Members title="The Esteemed Jury" apiKey="infrashakti-the-esteemed-jury" ctaText="Add a New Jury" />
      <Members title="Guests of honour" apiKey="infrashakti-guests-of-honour" ctaText="Add a New Guest" />
      <Members title="Pre-eminent leaders" apiKey="infrashakti-pre-eminent leaders" ctaText="Add a New leader" />
    </div>
  );
}
