import React from "react";
import BannerSection from "./01_banner";
export const revalidate = 60;
import Knowledge from "./allPages";

export default function Page() {
  return (
    <main>
      <BannerSection />
      <Knowledge />
    </main>
  );
}
