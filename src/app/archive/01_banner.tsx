import React from "react";
import Banner from "@/_components/molecules/banner";
import image from "@/../public/assets/archive/banner/banner.jpg";
export default function BannerSection() {
  return (
    <Banner
      image={image}
      heading="Archives"
      title="Archives"
      subdesc="Knowledge resources shaping India's <br/> infrastructure growth story."
    />
  );
}
