import React from 'react'

const WhoWeAre = () => {
  return (
    <section className='bg-pink overflow-hidden'>
        <div className='w-container blade-top-padding blade-bottom-padding-lg flex flex-col sm:flex-row gap-y-20 sm:gap-y-0'>
            <div className='max-w-full sm:max-w-sm lg:max-w-md xl:max-w-2xl text-white '>
                <div className="flex items-center gap-2 md:gap-3">
                    <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white"></span>
                    <h5 className="font-medium text-sm xl:text-lg">Who we are</h5>
                </div>
                <div>
                    <img className='sm:scale-125' src="/assets/about-us/who-we-are/circle-image.png" alt="" />
                </div>
            </div>
            <div>
                <img className='scale-125 sm:scale-125' src="/assets/about-us/who-we-are/circle-image.png" alt="" />
            </div>
        </div>
    </section>
  )
}

export default WhoWeAre