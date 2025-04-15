import Image from "next/image";
import BannerBg from "@/../public/assets/home/BannerBg.png";
import Updates from "./updates";
import mobileBannerBg from "@/../public/assets/home/mobileBannerBg.png";
import { GoArrowRight } from "react-icons/go";

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

          <div className="absolute  top-[21%]  lg:top-[19%]  xl:top-[23%] 2xl:top-[20%] left-1/2 -translate-x-1/2  mx-auto max-w-screen-2xl px-2 sm:px-4 w-full lg:w-11/12">
            <div className="w-[80%] lg:w-full ">
              <h1 className="tracking-[-4%] font-light txt-black/90 ">
                {" "}
                An{" "}
                <span className="tracking-[-4%] font-medium text-pink">
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
            {/* <div className="">
              <HeroBtn
                text="Know more"
                role="link"
                borderColor="pink"
                aarowColor="pink"
                color="black"
                size="extralarge"
                classes="w-full sm:w-auto p-3 sm:p-2 text-sm"
                bgColor ="transparent"
              />
            </div> */}
            <div className="flex gap-2 lg:gap-4 items-center justify-center group  w-fit">
                <h5 className="font-medium">Know more</h5>
                <button
                  className={`rounded-sm p-1 md:p-2 border-2 border-pink   w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 group-hover:bg-pink `}
                >
                  <GoArrowRight className={`   text-pink  group-hover:text-white text-2xl`}/>
                </button>
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
