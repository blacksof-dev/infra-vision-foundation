import Image from "next/image";
import BannerBg from "@/../public/assets/home/BannerBg.png";
import Updates from "./updates";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
export default function Banner() {
  return (
    <>
      <section id="homepage-section-01">
        <div className="relative overflow-hidden">
          <div className=" w-full h-[40rem]  lg:h-auto xl:h-full">
            <Image
              src={BannerBg}
              alt="InfraVision Foundation"
              className="h-full  w-full object-cover"
            ></Image>
          </div>
          <div className="w-container">
            <div className="  absolute top-[24%]  md:top-[30%] xl:top-[25%]">
              <div data-aos="fade-up" className="w-full   ">
                <h1 className="tracking-[-4%] font-light txt-black/90 ">
                  {" "}
                  An{" "}
                  <span className="tracking-[-4%] font-medium text-pink">
                    independent think tank
                  </span>
                  <br className="" /> seeking to impact India’s{" "}
                  <br className="xl:block hidden" />
                  infrastructure landscape{" "}
                </h1>
              </div>
              <div className="w-[90%] md:w-[60%] py-4">
                <h5 className="text-black ">
                  Helping shape public discourse and policy interventions
                  through action research and advocacy.
                </h5>
              </div>
            
            </div>
            <div className="absolute bottom-8 xl:bottom-8 w-screen p-1">
              <Updates />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
