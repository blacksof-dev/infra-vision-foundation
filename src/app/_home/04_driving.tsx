"use client";
import Image, { StaticImageData } from "next/image";
import Ciara from "@/../public/assets/home/awards/Caira.png";
import Infrakhata from "@/../public/assets/home/awards/Infrakhata.png";
import Infrashakti from "@/../public/assets/home/awards/Infrashakti.png";
import ciaraLogo from "@/../public/assets/home/awards/ciaraLogo.jpg";
import InfraKathaLogo from "@/../public/assets/home/awards/InfraKathaLogo.png";
import InfrashaktiLogo from "@/../public/assets/home/awards/InfrashaktiLogo.png";
import { BorderGrayHeroBtn, HeroBtn } from "@/_components/atoms/buttons";
import { useState } from "react";

type AwardKey = "CAIRA" | "InfraKatha" | "InfraShakti";
type Awardsdata = {
  logo: StaticImageData;
  title: string;
  desc: string;
  image: StaticImageData;
};
export default function Driving() {
  const [data, setdata] = useState<AwardKey>("CAIRA");

  const AwardsDetails: Record<AwardKey, Awardsdata> = {
    CAIRA: {
      logo: ciaraLogo,
      image: Ciara,
      title: "Centre for Agri Infrastructure Research and Action (CAIRA)",
      desc: "Resilience fuels reform. CAIRA is an arm of The Infravision Foundation aimed at advancing India’s agricultural infrastructure. It is committed to improving the state of the farming community and enhancing its agri-export prospects.",
    },
    InfraKatha: {
      logo: InfraKathaLogo,
      image: Infrakhata,
      title: "InfraKatha",
      desc: "Dialogue drives action. InfraKatha is a monthly congregation where our Founder and Managing Trustee, Mr. Vinayak Chatterjee, deliberates on infrastructure development with esteemed leaders and experts. A goldmine of exclusive insights, it sparks deeper thought and awareness about infrastructure.",
    },
    InfraShakti: {
      logo: InfrashaktiLogo,
      image: Infrashakti,
      title: "InfraShakti Awards",
      desc: "Milestones narrate a history of progress. The InfraShakti Awards is our flagship initiative in partnership with NDTV. The event celebrates individuals driving India’s infrastructure development and transforming life on the ground.",
    },
  };

  return (
    <>
      <section className="blade-top-padding-lg blade-bottom-padding-lg">
        <div className="hidden lg:block  w-container">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-black">Key initiatives</h5>
          </div>
          <div className="pt-4 pb-2 md:py-5 flex flex-row justify-between">
            {" "}
            <div className="">
              <h1 className="tracking-[-3%] font-light text-black">
                Driving our cause <br />
                to
                <span className="font-medium  text-black">&nbsp;impact</span>
              </h1>
            </div>
            <div className="w-[50%]  xl:w-[43%] 2xl:w-[40%] ">
              <h6 className="text-black tracking-[1%]">
                Elevating and expanding the nation’s infrastructure footprint
                through intellect and advocacy demands collaboration and
                strategic action. At The Infravision Foundation, we leverage the
                wide spectrum of cross-disciplinary expertise of our advisors,
                researchers, and colleagues in multiple ways.
              </h6>
            </div>
          </div>
          <div className=" mt-5">
            <div className="flex flex-row gap-5 xl:gap-15">
              <div className="w-[44%] xl:w-[50%]">
                <div className="w-[25rem] h-[20rem] xl:w-[35rem] 2xl:w-[45rem] xl:h-[29rem] ">
                  <Image
                    src={AwardsDetails[data].image}
                    alt="Ciara Award"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="w-[50%]  xl:border-l-1 xl:border-darkgray/40 ">
                <div className="flex flex-row gap-16  w-[75%] ms-11 xl:ms-16 2xl:ms-28 ">
                  <div className=" group">
                    <button
                      className={`text-nowrap relative text-xl tracking-[-1%] ${
                        data === "CAIRA"
                          ? "text-pink font-medium w-full"
                          : "text-black"
                      }`}
                      onClick={() => setdata("CAIRA")}
                    >
                      CAIRA
                      <span className={` h-[1px] ${data==="CAIRA"?"w-full bg-pink transition-all duration-1000":"w-10 sm:w-5"}  sm:h-[2px]  bg-black absolute bottom-0 left-0 top-7`}></span>
                    </button>
                  </div>
 

                   <div className=" group">
                   <button
                    onClick={() => setdata("InfraKatha")}
                    className={`text-nowrap relative text-xl tracking-[-1%]  ${
                      data === "InfraKatha"
                        ? "text-pink font-medium"
                        : "text-black"
                    }`}
                  >
                    InfraKatha
                    <span className={` h-[1px] ${data==="InfraKatha"?"w-full bg-pink transition-all duration-1000":"w-10 sm:w-5"}  sm:h-[2px]  bg-black absolute bottom-0 left-0 top-7`}></span>
                  </button>
                   </div>
                
                <div className=" group">
                <button
                    onClick={() => setdata("InfraShakti")}
                    className={`text-nowrap text-xl relative tracking-[-1%]  ${
                      data === "InfraShakti"
                        ? "text-pink font-medium"
                        : "text-black"
                    }`}
                  >
                    InfraShakti Awards
                    <span className={` h-[1px] ${data==="InfraShakti"?"w-full bg-pink transition-all duration-1000":"w-10 sm:w-5"}  sm:h-[2px]  bg-black absolute bottom-0 left-0 top-7`}></span>
                  </button>
                </div>
                 
                </div>
                <div  className="ms-11 xl:ms-16 2xl:ms-28  my-auto h-full flex flex-col justify-center">
                  <div className="">
                    <Image
                      src={AwardsDetails[data].logo}
                      alt="CIARA logo"
                      className=""
                    />
                  </div>
                  <div>
                    <h3 className="text-pink py-4 font-medium tracking-[1%]">
                      {AwardsDetails[data].title}
                    </h3>
                    <p className="tracking-[-0.2px] text-[#212222]">
                      {AwardsDetails[data].desc}
                    </p>

                    <div className="pt-6">
                      <BorderGrayHeroBtn
                        text="Know more"
                        role="link"
                        borderColor="pink"
                        color="black"
                        bgColor="white"
                        size="large"
                        aarowColor="pink"
                        classes="font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile view of this section */}
        <div className="lg:hidden block w-container">
          <div>
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-pink">Key initiatives</h5>
            </div>
            <div className="">
              <h1 className="tracking-[-3%] font-light text-black py-4">
                Driving our cause
                 to <span className="font-medium tracking-[-3%] text-black">impact</span>
                
              </h1>

              <p>
                Elevating and expanding the nation’s infrastructure footprint
                through intellect and advocacy demands collaboration and
                strategic action. At The Infravision Foundation, we leverage the
                wide spectrum of cross-disciplinary expertise of our advisors,
                researchers, and colleagues in multiple ways.
              </p>
            </div>

            <div>
              <MobileView
                logo={ciaraLogo}
                title="Centre for Agri Infrastructure Research and Action (CAIRA)"
                desc="Resilience fuels reform. CAIRA is an arm of The Infravision
                  Foundation aimed at advancing India’s agricultural
                  infrastructure. It is committed to improving the state of the
                  farming community and enhancing its agri-export prospects."
                image={Ciara}
              />
              <MobileView
                logo={InfrashaktiLogo}
                title=" InfraShakti Awards"
                desc=" Milestones narrate a history of progress. The InfraShakti
                  Awards is our flagship initiative in partnership with NDTV.
                  The event celebrates individuals driving India’s
                  infrastructure development and transforming life on the
                  ground."
                image={Infrashakti}
              />
              <MobileView
                logo={InfraKathaLogo}
                title="InfraKatha"
                desc=" Dialogue drives action. InfraKatha is a monthly congregation
                  where our Founder and Managing Trustee, Mr. Vinayak
                  Chatterjee, deliberates on infrastructure development with
                  esteemed leaders and experts. A goldmine of exclusive
                  insights, it sparks deeper thought and awareness about
                  infrastructure."
                image={Infrakhata}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MobileView({ logo, title, desc, image }: Awardsdata) {
  return (
    <>
      <section className="pt-5">
        <div className="pt-5 ">
          <Image src={logo} alt="CIARA logo" className="py-4" />
        </div>
        <div>
          <h6 className="text-pink py-2 font-medium tracking-[1%]">{title}</h6>
          <p className="smallText tracking-[-0.2px]  text-[#212222]">{desc}</p>
          <div className="py-4">
            <Image src={image} alt={title} className="" />
          </div>
          <div className="">
            <HeroBtn
              text="Know more"
              role="link"
              borderColor="pink"
              color="black"
              bgColor="white"
              size="extralarge"
              aarowColor="pink"
              classes="font-medium"
            />
          </div>
        </div>
      </section>
    </>
  );
}
