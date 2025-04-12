import Image from "next/image";
import BannerBg from "@/../public/assets/home/BannerBg.png";
import { HeroBtn } from "@/_components/atoms/buttons";
import Updates from "./updates";
import mobileBannerBg from "@/../public/assets/home/mobileBannerBg.png";

export default function Banner() {
  return (
    <>
      <section className="">
        <div className="relative  overflow-hidden ">
          <div className="sm:block hidden w-screen">
            <div className="w-full h-[36rem] xl:h-full">
              <Image
                src={BannerBg}
                alt="InfraVision Foundation"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="sm:hidden block h-[38rem]">
            <Image
              src={mobileBannerBg}
              alt="InfraVison Fondation"
              className="h-full"
            />
          </div>

          <div className="absolute  top-[21%]  lg:top-[19%]  xl:top-[23%] 2xl:top-[20%] left-4  sm:left-9  md:left-[10%]  2xl:left-[7%] ">
            <div className="w-[80%] lg:w-full">
              <h1 className="tracking-[-4%] font-light txt-black/90">
                {" "}
                An{" "}
                <span className="tracking-[-4%] font-bold text-pink">
                  independent think tank
                </span>
                <br className="" /> for infrastructure and{" "}
                <br className="xl:block hidden" />
                nation-building{" "}
              </h1>
            </div>
            <div className="   w-[80%] lg:w-[45%] py-2 xl:py-4 ">
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
          <div className="absolute bottom-8 lg:bottom-3 2xl:bottom-10 ">
            <Updates />
          </div>
        </div>
      </section>
    </>
  );
}
