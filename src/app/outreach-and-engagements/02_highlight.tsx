import React from 'react';
import Image from 'next/image';
import MontekImage from "@/../public/assets/outreach-and-engagements/highlight/montek.png";
import { BorderGrayHeroBtn, UnderlineCta } from '@/_components/atoms/buttons';

const Highlight = () => {
  return (
    <section className="bg-pink blade-top-padding blade-bottom-padding-lg">
      <div className="w-container md:py-5">
        <h1 className="text-white text-3xl lg:text-white font-medium">
          The highlight
        </h1>
      </div>

      <div className="relative bg-gray-100 lg:bg-[#F6F6F6] w-container p-4 sm:p-6 lg:p-10 rounded-lg mt-6 flex flex-col lg:flex-row items-center gap-10 overflow-hidden">
        <div className="w-full lg:w-1/2">
          <Image
            src={MontekImage}
            alt="Mr Montek Singh Ahluwalia"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src="/assets/outreach-and-engagements/highlight/InfraKathaLogo.png"
            alt="Infra Katha"
            width={160}
            height={50}
            className="mb-4"
          />

          <div className="max-w-md">
            <h2 className="font-medium text-xl sm:text-2xl mb-3">
              Can Public Private Partnerships be revitalised?
            </h2>

            <h5 className="text-[#C82249] font-medium mt-2">
              Mr Montek Singh Ahluwalia
            </h5>
            <h6 className="text-[#5D6468] font-normal text-sm sm:text-base">
              Former Deputy Chairman, Planning Commission
            </h6>
            <div className="pt-6 flex flex-wrap gap-4 items-center">
              <BorderGrayHeroBtn
                text="Get notified"
                role="button"
                borderColor="pink"
                color="black"
                bgColor="white"
                size="large"
                classes="font-medium"
              />
              <UnderlineCta
                title="Know more"
                color="black"
                underlineColor="pink"
                role="link"
                size="extralarge"
              />
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 right-0 hidden lg:block"
          src="/assets/outreach-and-engagements/highlight/circle.png"
          alt="Decorative Circle"
        />
      </div>
    </section>
  );
};

export default Highlight;
