import React from 'react'

const Pathway = () => {
  return (
    <section className='blade-top-padding blade-bottom-padding-lg w-container'>
        <div className="w-container">
          <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-pink">Our core</h5>
            </div>
          <div className="pt-4 pb-2 md:py-5 md:w-[40%]">
              <h1 className=" font-light">The touchpoints of <span className='font-medium'>impactful change</span></h1>
              <div className="w-full ">
                <h6 className="font-normal  tracking-[1%] py-4">
                  To help India build robust and resilient infrastructure, The Infravision Foundation churns the expertise of its thought leaders through a rigorous process.
                </h6>
              </div>
          </div>
          <div>
            <img src="/assets/about-us/pulse/chart.png" alt="" />
          </div>
        </div>
    </section>
  )
}

export default Pathway