"use client";
import React from "react";
import Banner from "./banner";
import Members from "./infrakatha-host";
import PastSessions from "./pastSessions";

export default function Page() {
  return (
    <div>
      <Banner />
      <Members
        apiKey="Infrakath-hosts"
        title="About Infrakatha "
        ctaText="Add New Host"
      />
      <PastSessions />
    </div>
  );
}
