"use client"
import Image, { StaticImageData } from "next/image";
import Ciara from "@/../public/assets/home/awards/Caira.png";
import Infrakhata from "@/../public/assets/home/awards/Infrakhata.png";
import Infrashakti from "@/../public/assets/home/awards/Infrashakti.png";
import ciaraLogo from "@/../public/assets/home/awards/ciaraLogo.jpg";
import { HeroBtn } from "@/_components/atoms/buttons";
import {useState} from "react"

type AwardKey = 'CAIRA' | 'InfraKatha' | 'InfraShakti';
type Awardsdata = {
  logo:StaticImageData,
  title:string,
  desc:string,
  image:StaticImageData
}
export default function Driving() {

  const [data,setdata] = useState<AwardKey>("CAIRA");

  
const AwardsDetails: Record<AwardKey, Awardsdata> = {
    CAIRA: {
      logo: ciaraLogo,
      image: Ciara,
      title: "Centre for Agri Infrastructure Research and Action (CAIRA)",
      desc: "Resilience fuels reform. CAIRA is an arm of The Infravision Foundation aimed at advancing India’s agricultural infrastructure. It is committed to improving the state of the farming community and enhancing its agri-export prospects."
    },
    InfraKatha: {
      logo: ciaraLogo,
      image: Infrakhata,
      title: "InfraKatha",
      desc: "Dialogue drives action. InfraKatha is a monthly congregation where our Founder and Managing Trustee, Mr. Vinayak Chatterjee, deliberates on infrastructure development with esteemed leaders and experts. A goldmine of exclusive insights, it sparks deeper thought and awareness about infrastructure."
    },
    InfraShakti: {
      logo: ciaraLogo,
      image: Infrashakti,
      title: "InfraShakti Awards",
      desc: "Milestones narrate a history of progress. The InfraShakti Awards is our flagship initiative in partnership with NDTV. The event celebrates individuals driving India’s infrastructure development and transforming life on the ground."
    }
  };

  
  

  return (
    <>
      <section className="blade-top-padding-lg blade-bottom-padding-lg">
        <div className="hidden md:block  w-container">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-black">Key initiatives</h5>
          </div>
          <div className="pt-4 pb-2 md:py-5 flex flex-row justify-between">
            {" "}
            <div className="">
              <h1 className="tracking-[-3%] font-light text-black">
                Driving our cause
                <br /> to &nbsp;
                <span className="font-medium tracking-[-3%] text-black">
                  impact
                </span>
              </h1>
            </div>
            <div className="w-[49%]  xl:w-[40%]">
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
                {" "}
                <div className="w-[25rem] h-[20rem]  xl:w-[40rem] xl:h-[29rem] ">
                  <Image
                    src={AwardsDetails[data].image}
                    alt="Ciara Award"
                    className="w-full h-full "
                  />
                </div>
              </div>

              <div className="w-[50%]  xl:border-l-1 xl:border-darkgray/40 ">
                <div className="flex flex-row gap-16  w-[75%] ms-11 xl:ms-25 ">
                  <button onClick={()=>setdata("CAIRA")}  className={`text-nowrap text-lg tracking-[-1%]  ${data==="CAIRA"?"text-pink":"text-black"}`}>CAIRA</button>
                  <button onClick={()=>setdata("InfraKatha")} className={`text-nowrap text-lg tracking-[-1%]  ${data==="InfraKatha"?"text-pink":"text-black"}`}>InfraKatha</button>
                  <button onClick={()=>setdata("InfraShakti")} className={`text-nowrap text-lg tracking-[-1%]  ${data==="InfraShakti"?"text-pink":"text-black"}`}>InfraShakti Awards</button>
                </div>
                <div className="ms-11 xl:ms-25">
                  <div className="pt-10">
                    <Image src={AwardsDetails[data].logo} alt="CIARA logo" className="" />
                  </div>
                  <div>
                    <h3 className="text-pink py-4 font-medium tracking-[1%]">
                    {AwardsDetails[data].title}
                    </h3>
                    <p className="tracking-[-0.2px] text-[#212222]">
                    {AwardsDetails[data].desc}
                    </p>

                    <div className="pt-6">
                      <HeroBtn
                        text="Know more"
                        role="link"
                        borderColor="pink"
                        color="black"
                        bgColor=""
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
        <div className="md:hidden block w-container">
          <div>
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-pink">Key initiatives</h5>
            </div>
            <div className="">
              <h1 className="tracking-[-3%] font-light text-black py-4">
                Driving our cause
                <br /> to &nbsp;
                <span className="font-medium tracking-[-3%] text-black">
                  impact
                </span>
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
                <MobileView logo={ciaraLogo} title="Centre for Agri Infrastructure Research and Action (CAIRA)"
                 desc="Resilience fuels reform. CAIRA is an arm of The Infravision
                  Foundation aimed at advancing India’s agricultural
                  infrastructure. It is committed to improving the state of the
                  farming community and enhancing its agri-export prospects."
                 image={Ciara}
                
                
                />
                <MobileView logo={ciaraLogo} title=" InfraShakti Awards"
                 desc=" Milestones narrate a history of progress. The InfraShakti
                  Awards is our flagship initiative in partnership with NDTV.
                  The event celebrates individuals driving India’s
                  infrastructure development and transforming life on the
                  ground."
                 image={Infrashakti}
                
                
                />
                <MobileView logo={ciaraLogo} title="InfraKatha"
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



function MobileView({logo,title,desc,image}:Awardsdata){
  return(
    <>
     <section>
     <div className="pt-10">
                <Image src={logo} alt="CIARA logo" className="" />
              </div>
              <div>
                <h6 className="text-pink py-4 font-medium tracking-[1%]">
                  {title}
                </h6>
                <p className="tracking-[-0.2px] text-[#212222]">
                  {desc}
                </p>
                <div className="py-3">
                  <Image src={image} alt={title} className="" />
                </div>
                <div className="">
                  <HeroBtn
                    text="Know more"
                    role="link"
                    borderColor="pink"
                    color="black"
                    bgColor=""
                    size="extralarge"
                    aarowColor="pink"
                    classes="font-medium"
                  />
                </div>
              </div>
      </section>
    </>
  )
}
