import Image from "next/image";
import BannerBg from "@/../public/assets/home/BannerBg.png";
import { HeroBtn } from "@/_components/atoms/buttons";
import Updates from "./updates";

export default function Banner() {
  return (
    <>
      <section className="">
        <div className="relative overflow-x-hidden">
          <div className="">
            <Image src={BannerBg} alt="InfraVison Fondation" className="" />
          </div>
      
          <div className="absolute top-[23%] 2xl:top-[20%] left-[10%]  2xl:left-[7%] ">
            <div className="">
              <h1 className="tracking-[-4%] font-light txt-black/90">
                {" "}
                An{" "}
                <span className="tracking-[-4%] font-bold text-pink">
                  independent think tank
                </span>
                <br /> for infrastructure and <br />
                nation-building{" "}
              </h1>
            </div>
            <div className="md:w-[45%] py-4 ">
              <h5 className="text-black">
                We help shape India’s infrastructure policies with neutral
                fact-based insights, analysis, and discourse.
              </h5>
            </div>
            <div>
              <HeroBtn
                text="Know more"
                role="link"
                borderColor="pink"
                aarowColor="pink"
                color="black"
                size="extralarge"
                classes="w-full sm:w-auto p-3 sm:p-2 text-sm"
              />
            </div>
          </div>
          <div className="absolute bottom-3 2xl:bottom-10 ">
             <Updates/>
          </div>
        </div>
      </section>
    </>
  );
}
