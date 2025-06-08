import React from 'react'
import MontekImage from "@/../public/assets/outreach-and-engagements/highlight/montek.png"
import { BorderGrayHeroBtn, UnderlineCta } from '@/_components/atoms/buttons'

const Highlight = () => {
  return (
    <section className='bg-pink blade-top-padding blade-bottom-padding-lg'>
      <div className="md:py-5 w-container">
        <h1 className="text-white font-medium">The highlight</h1>
      </div>
      <div className='bg-[#F6F6F6] overflow-hidden relative blade-top-margin w-container p-2 rounded-lg flex gap-20 items-center'>
        <img className='rounded-lg' src="/assets/outreach-and-engagements/highlight/montek.png" alt="Mr Montek Singh Ahluwalia" />
        <div>
          <img src="/assets/outreach-and-engagements/highlight/InfraKathaLogo.png" alt="" />
          <div className='max-w-md mt-5'>
            <h2 className='font-medium'>Can Public Private Partnerships be revitalised?</h2>
            <h5 className='text-[#C82249] font-medium mt-3'>Mr Montek Singh Ahluwalia</h5>
            <h6 className='text-[#5D6468] font-normal'>Former Deputy Chairman, Planning Commission</h6>
            <div className="pt-6 flex gap-10 items-center">
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
                title={'Know more'}
                color="black"
                underlineColor="pink"
                role="link"
                size="extralarge"
              />
            </div>
          </div>
        </div>
        <img className='absolute top-0 right-0' src="/assets/outreach-and-engagements/highlight/circle.png" alt="Circle" />
      </div>
    </section>
  )
}

export default Highlight