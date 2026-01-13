"use client";
import React from "react";
import Banner from "./banner";
import InfrakathaHost from "./infrakatha-host";
import PastSessions from "./pastSessions";

export default function Page() {
  return (
    <div>
      <Banner />
      <InfrakathaHost />
      <PastSessions />
    </div>
  );
}
