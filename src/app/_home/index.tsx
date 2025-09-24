import Highlights from "./05_highlights";
import Banner from "./01_banner";
import WhoWeAre from "./02_whoWeAre";
import Infravisionaries from "./03_infravisionaries";
import Association from "./04_association";
import StayConnected from "./06_connected";
import InfravisionTalks from "./07_infravision_talks";
import { Suspense } from "react";
import Loading from "../loading";


export default function Home() {
  return (
    <>
      {/* <Popup/> */}
      <Suspense
        fallback={
          <section className="w-full h-[40rem] flex items-center justify-center">
            <Loading />
          </section>
        }
      >
        <Banner />
      </Suspense>

      <WhoWeAre />
      {/* <Infravisionaries /> */}
      {/* <Association /> */}
      {/* <Highlights /> */}
      <StayConnected />
      <InfravisionTalks />
    </>
  );
}
