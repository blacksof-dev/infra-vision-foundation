import React from "react";
import Banner from "./01_banner";
import SectorsManager from "./sectorManager";
import GallerySection from "./05_gallery";
import Newsletters from "./02_newsletters";
import InTheNews from "./03_InTheNews";
 
export default function Page() {
  return (
    <>
      <Banner />
      <Newsletters/>
      <InTheNews/>
      <SectorsManager/>
      <GallerySection/>
    </>
  );
}
