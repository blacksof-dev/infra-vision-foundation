import React from "react";
import Banner from "./01_banner";
import SectorsManagerGallery from "./sectorManagerGallery";
import GallerySection from "./05_gallery";
import Newsletters from "./02_newsletters";
import InTheNews from "./03_InTheNews";
import SectorsManagerVideo from "./sectorManagerVideo";
import VideoSection from "./04_video";
 
export default function Page() {
  return (
    <>
      <Banner />
      <Newsletters/>
      <InTheNews/>
      <SectorsManagerVideo/>
      <VideoSection/>
      <SectorsManagerGallery/>
      <GallerySection/>
    </>
  );
}
