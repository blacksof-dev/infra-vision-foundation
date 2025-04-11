import Image from "next/image";
import Ciara from "@/../public/assets/home/awards/Caira.png";
import Infrakhata from "@/../public/assets/home/awards/Infrakhata.png";
import Infrashakti from "@/../public/assets/home/awards/Infrashakti.png";
export default function Driving() {
  return (
    <>
      <section className="blade-top-padding-lg blade-bottom-padding-lg">
        <div className="w-container">
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
            <div className="w-[40%]">
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
            <div className="flex flex-row gap-15">
              <div className="w-[50%]">
                {" "}
                <div className="w-[40rem] h-[29rem] d">
                  <Image
                    src={Ciara}
                    alt="Ciara Award"
                    className="w-full h-full d"
                  />
                </div>
              </div>

              <div className="w-[40%]">
                <div className="grid grid-cols-3 gap-2">
                  {" "}
                  <div className="py-4 ">
                    <button className="text-black w-fit text-md text-nowrap lg:text-xl relative font-medium">
                      CAIRA
                      <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-darkgray absolute bottom-0 left-0 top-7"></span>
                    </button>
                  </div>
                  <div className="py-4">
                    <button className="text-black  w-fit text-md text-nowrap lg:text-xl relative font-medium">
                      InfraKatha
                      <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-darkgray absolute bottom-0 left-0 top-7"></span>
                    </button>
                  </div>
                  <div className="py-4">
                    <button className="text-black w-fit text-md text-nowrap lg:text-xl relative font-medium">
                      InfraShakti Awards
                      <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-darkgray absolute bottom-0 left-0 top-7"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
