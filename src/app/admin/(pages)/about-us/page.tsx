"use client";
import React from "react";
import Banner from "./banner";
import Sectors from "./sectore";

export default function AboutUsAdminPage() {
  return (
    <div className="flex flex-col gap-y-10 pb-20">
      <Banner />
      <Sectors />
    </div>
  );
}
