import React from 'react'

const WhoWeAre = () => {
    return (
        <section id="who-we-are" className='bg-pink overflow-hidden'>
            <div className='w-container blade-top-padding blade-bottom-padding-lg flex flex-col sm:flex-row'>
                <div className='max-w-full sm:max-w-sm lg:max-w-md xl:max-w-2xl text-white '>
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white"></span>
                        <h5 className="font-medium text-sm xl:text-lg">Who we are</h5>
                    </div>
                    <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
                        <h1 className="leading-snug font-light text-2xl md:text-3xl xl:text-5xl">
                            A vehicle of change, ushering  <span className='font-medium'>India's Infrastructural growth</span>
                        </h1>
                    </div>
                    <div className=''>
                        <h4 className='font-light text-base xl:text-xl'><span className='font-semibold'>The Infravision Foundation</span> is an independent think tank addressing core infrastructure issues. Committed to national interest, it helps shape policy and harness the full development potential of infrastructural investments.</h4>
                        <h4 className='font-normal mt-5 text-base xl:text-xl'>The Foundation was set in 2022 and is driven by renowned thought leaders and experts from different dimensions of infrastructure. Together, they advocate transformative
                            solutions through rigorous <span className='font-semibold'>knowledge sharing</span> and <span className='font-semibold'>advocacy</span>.
                        </h4>
                    </div>
                </div>
                <div>
                    <img className='sm:scale-125' src="/assets/about-us/who-we-are/circle-image.png" alt="" />
                </div>
            </div>
        </section>
    )
}

export default WhoWeAre