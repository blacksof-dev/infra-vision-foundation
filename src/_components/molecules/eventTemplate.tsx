import { HeroBtnPink, UnderlineCta } from "../atoms/buttons";
import Image from "next/image";
import montek from "@/../public/assets/home/outreach/montek.png";
import infraKatha from "@/../public/assets/home/outreach/infraKatha.png";
import Portal from "../atoms/popupPortal";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function EventTemplate() {
  const [notified, setnotified] = useState<boolean>(false);

  return (
    <>
      <div className="relative  bg-white  rounded-lg py-8 lg:py-0  flex flex-col lg:flex-row items-center gap-7 xl:gap-10 overflow-hidden">
        <div className="w-full lg:w-[40%]   lg:p-5">
          <Image
            src={montek}
            alt="Mr Montek Singh Ahluwalia"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="  lg:py-6 xl:py-0 w-full lg:w-1/2">
          <Image
            src={infraKatha}
            alt="Infra Katha"
            width={160}
            height={50}
            className=" "
          />

          <div className="max-w-md">
            <h2 className="font-medium pt-2 lg:pt-4 xl:pt-6">
              Can Public Private Partnerships be revitalised?
            </h2>

            <div className="py-3 xl:py-3">
              <h5 className="text-[#C82249] font-medium ">
                Mr Montek Singh Ahluwalia
              </h5>
              <h6 className="text-[#5D6468] font-normal text-sm sm:text-base">
                Former Deputy Chairman, Planning Commission
              </h6>
            </div>

            <div
              onClick={() => setnotified(true)}
              className="pt-6 cursor-pointer xl:pt-9 flex flex-wrap gap-9 items-center"
            >
              <HeroBtnPink
                text="Get notified"
                role="button"
                aarowColor="pink"
                borderColor="pink"
                color="black"
                bgColor="transparent"
                size="large"
                classes="font-medium"
              />

              <UnderlineCta
                title="Know more"
                color="black"
                underlineColor="#C82249"
                role="link"
                size="extralarge"
              />
            </div>
            {notified && <NotifiedPopup onclose={() => setnotified(false)} />}
          </div>
        </div>
        <img
          className="absolute opacity-60 top-0 right-0 hidden lg:block"
          src="/assets/outreach-and-engagements/highlight/circle.png"
          alt="Decorative Circle"
        />
      </div>
    </>
  );
}

function NotifiedPopup({ onclose }: { onclose: () => void }) {
  return (
    <>
      <Portal>
        <div className="flex justify-center items-center  fixed inset-0 bg-darkgray/30 z-[999]">
          <div className="bg-white rounded-lg w-full h-[35rem]  max-w-4xl relative md:m-4 m-2">
            <button
              onClick={onclose}
              className="scale-90 z-1 sm:scale-100 absolute top-2 right-3 md:top-7 md:right-7 xl:top-5 xl:right-5 h-10 w-10 text-darkBrown d bg-pink   border-[1px] border-darkBrown transition-all duration-300 rounded-full flex justify-center items-center text-xl   cursor-pointer"
            >
              <RxCross2 className="text-white" />
            </button>
            <div>
               <h1> Get notified about the upcoming events!</h1>
               <div>
                 <div>
                  
                 </div>
               </div>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
}
