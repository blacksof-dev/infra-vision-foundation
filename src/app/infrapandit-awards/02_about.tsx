import { BorderGrayHeroBtn, UnderlineCta } from '@/_components/atoms/buttons'
import React from 'react'

const AboutInfraPandit = () => {
  return (
    <section className='bg-[#F6F6F6]'>
        <div className='w-container blade-top-padding blade-bottom-padding-lg flex flex-col justify-between sm:flex-row'>
            <div className='max-w-full sm:max-w-sm lg:max-w-md xl:max-w-2xl'>
                <div className="flex items-center gap-2 md:gap-3 text-pink">
                    <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
                    <h5 className="font-medium text-sm xl:text-lg">About InfraPandit Awards</h5>
                </div>
                <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
                    <h1 className="leading-snug font-light text-2xl md:text-3xl xl:text-5xl">
                        Connecting <span className='font-medium'>academic excellence</span> to national progress
                    </h1>
                </div>
                <div className=''>
                    <h4 className='font-light text-base xl:text-xl'> The InfraPandit Awards honour and reward first-rate research that can accelerate India towards becoming a <span className='font-semibold'>Viksit Bharat</span>. It identifies and recognises young minds for their fresh outlook on core infrastructure issues and groundbreaking insights.</h4>
                    <h4 className='font-normal mt-5 text-base xl:text-xl'>Instituted by The Infravision Foundation, the awards aim to foster tangible outcomes in infrastructure research and development through effective collaboration among industry, academia, and government.</h4>
                </div>
                <div className='mt-4'>
                    <h4 className='font-medium mb-4'>For the awardees</h4>
                    <div className="flex items-center gap-2 md:gap-3 ">
                        <span className="w-[6px] h-[6px] md:w-[13px] md:h-[13px] rounded-full bg-pink"></span>
                        <h5 className="font-light text-sm xl:text-xl">The <span className='font-medium'>Uttam Award (INR 5 lakh)</span> and the <span className='font-medium'>Mahaan Award (INR 3 lakh).</span></h5>
                    </div>
                    <div className="flex items-start gap-2 md:gap-3 ">
                        <span className="w-[6px] h-[6px] md:w-[13px] md:h-[13px] rounded-full mt-2 bg-pink shrink-0"></span>
                        <h5 className="font-light text-sm xl:text-xl">A citation by <span className='font-medium'>The Infravision Foundation</span> highlighting the dissertation’s significance.</h5>
                    </div>
                    {/* <ul>
                        <li className='list-disc'>The Uttam Award (INR 5 lakh) and the Mahaan Award (INR 3 lakh).</li>
                        <li className='list-disc'>A citation by The Infravision Foundation highlighting the dissertation’s significance.</li>
                    </ul> */}
                </div>
                <div className="pt-6 flex flex-wrap gap-8 items-center">
                              <BorderGrayHeroBtn
                                text="Register now"
                                role="button"
                                borderColor="pink"
                                color="black"
                                bgColor="white"
                                size="large"
                                classes="font-medium"
                              />
                              <UnderlineCta
                                title="Eligibility and process"
                                color="black"
                                underlineColor="pink"
                                role="link"
                                size="extralarge"
                              />
                            </div>
            </div>
            <div>
                <img src="/assets/infrapandit/award.png" alt="Infrapandit Awards" />
            </div>
        </div>
    </section>
  )
}

export default AboutInfraPandit