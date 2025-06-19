import React from "react";
import Image from "next/image";
import circle from '@/../public/assets/about-us/who-we-are/circle.png'
const WhoWeAre = () => {
  return (
    <section className="bg-pink overflow-hidden">
      <div className="w-container blade-top-padding blade-bottom-padding-lg ">
        <div className="flex xl:flex-row flex-col gap-4 md:gap-15">
          <div className="w-full xl:w-[50%]  ">
            <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white "></span>
              <h5 className="font-medium text-white">Who we are</h5>
            </div>
            <div className="py-3">
              <h1 className="text-white   font-light">
                A vehicle of change, ushering 
                <span className="text-white font-medium ">
                  {" "}
                  India's Infrastructural growth
                </span>
              </h1>
            </div>
            <div className="">
              <h4 className="text-white font-light pt-3">
                <span className="font-semibold">
                  The Infravision Foundation
                </span>{" "}
                is an independent think tank addressing core infrastructure
                issues. Committed to national interest, it helps shape policy
                and harness the full development potential of infrastructural
                investments.
              </h4>

              <h4 className="text-white py-3">
                The Foundation was set in 2022 and is driven by renowned thought
                leaders and experts from different dimensions of infrastructure.
                Together, they advocate transformative solutions through
                rigorous
                <span className="font-semibold">
                  knowledge sharing
                </span> and <span className="font-semibold">advocacy.</span>
              </h4>
            </div>
          </div>
          <div className="w-full  xl:w-[50%] h-full">
            <Image
              src={circle}
              alt="Who we Are"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
