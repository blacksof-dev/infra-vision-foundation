import React from "react";
import bg from "@/../public/assets/infrakatha/about/bgcircle.png";
import image_01 from "@/../public/assets/infrakatha/about/dilip-cherian.jpg";
import image_02 from "@/../public/assets/infrakatha/about/vinayak-chatterjee.jpg";
import image_03 from "@/../public/assets/infrakatha/about/jagan-shah.jpg";
import { MemberCard } from "@/_components/molecules/memberCard";
import Image from "next/image";

export default function About() {
  return (
    <section className="relative blade-top-padding-lg blade-bottom-padding-lg bg-whitesmoke">
      <Image
        className="absolute top-0 right-0 sm:block hidden"
        src={bg}
        alt="background circle"
      ></Image>
      <div className="w-container flex flex-col xl:flex-row gap-y-6 sm:gap-y-10 ">
        {/* Left: Text Content */}
        <div className="flex flex-col 2xl:justify-center ">
          <div className="flex flex-row items-center gap-2 mb-2">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">About InfraKatha</h5>
          </div>
          <h1 className="text-black font-light">
            Driving conversations
            <br />
            that spark <span className="font-medium">change</span>
            <br />
            <span className="font-medium">and awareness</span>
          </h1>
          <h5 className="text-black  mt-4 md:mt-6 md:max-w-xl xl:pr-8">
            InfraKatha is a key initiative of The Infravision Foundation
            dedicated to familiarising and uplifting infrastructural discourse
            for meaningful outcomes.
          </h5>
          <h6 className="text-darkgray  mt-2 md:max-w-xl xl:pr-8">
            The event features renowned cross-disciplinary experts and our
            Infravisionaries diving deep into the pressing challenges and
            pivotal developments in infrastructure. Each session nudges
            perceptions and public policymaking with deep thought and holistic
            understanding.
          </h6>
          <div className="mt-2 sm:mt-6">
            <a
              href="#"
              className="inline-flex text-lg items-center gap-2 text-black font-medium group hover:underline hover:text-pink"
            >
              Watch the videos
              <span className=" w-6 h-6 bg-pink rounded-full flex items-center justify-center transition-colors group-hover:bg-pink">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-white"
                >
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </a>
          </div>
        </div>
        {/* Right: Hosts Cards */}
        <div className="flex flex-col justify-end ">
          <div className="lg:border-l border-l-gray lg:pl-8">
            <h6 className="text-pink font-medium mb-4">The hosts</h6>
            <div className="flex flex-wrap justify-center lg:min-w-[40rem]  md:justify-start xl:grid grid-cols-2 2xl:grid-cols-3 2xl:space-x-6 gap-4 relative ">
              <MemberCard
                image={image_01}
                title="Dilip Cherian"
                desig="Member, Council of Advisors"
                link="#"
              />
              <MemberCard
                image={image_02}
                title="Vinayak Chatterjee"
                desig="Founder & Managing Trustee"
                link="#"
              />
              <MemberCard
                image={image_03}
                title="Jagan Shah"
                desig="Chief Executive Officer"
                link="#"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
