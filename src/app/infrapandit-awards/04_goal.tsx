import Image from 'next/image'
import React from 'react'
import BannerBg from "@/../public/assets/infrapandit/background.png"



const Goal = () => {

    const data = [
        {
            icon: "/assets/infrapandit/logo/logo-1.png",
            title: "Synergising impact",
            desc: "Invite and promote industry-academia collaboration by highlighting research with direct and immediate relevance to India’s concurrent needs."
        },
        {
            icon: "/assets/infrapandit/logo/logo-2.png",
            title: "Acknowledging excellence",
            desc: "Identification of the next generation of infra changemakers by eminent experts, academicians, practitioners, and industry leaders."
        },
        {
            icon: "/assets/infrapandit/logo/logo-3.png",
            title: "Inspiring innovation",
            desc: "Encourage doctoral candidates and their supervisors to pursue innovative ideas and approaches to advance India’s infrastructure sector."
        },
        {
            icon: "/assets/infrapandit/logo/logo-4.png",
            title: "Channelling collaboration",
            desc: "Leverage the vision and influence of InfraPandits to supplement the Foundation’s mission and its research and advocacy initiatives."
        },
    ]

    return (
        <section className="relative">
            <Image className='w-full h-full object-cover absolute' src={BannerBg} alt='background'></Image>
            <div className=' blade-top-padding blade-bottom-padding-lg w-container relative'>
                <div className="sm:w-container flex flex-col md:flex-row gap-y-5 md:gap-y-0 justify-between md:items-center blade-bottom-margin">
                    <div>
                        <div className="flex  flex-row  items-center gap-2 md:gap-3">
                            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                            <h5 className="font-medium text-pink text-sm xl:text-lg">The goal</h5>
                        </div>
                        <div className="pt-1 md:pt-4 pb-2 md:py-5 flex justify-between">
                            <h1 className="text-black font-light max-w-2xl">Forging a foundation for <span className='font-medium'>infrastructure excellence</span></h1>
                        </div>
                    </div>
                    <div className="w-full sm:w-[90%] xl:w-[45%]">
                        <h6 className="text-black  tracking-[1%] mb-4 text-sm xl:text-lg">
                            India’s infrastructural landscape is evolving into an <span className='font-medium'>economy catalyst.</span> The youth, a crucial aspect of this transition, brings the much-needed innovative thinking and academic rigour to the table.
                        </h6>
                        <h6 className="text-sm xl:text-lg">The InfraPandit Awards are committed to identifying and motivating such outstanding brains with the potential to supplement India’s infrastructure growth.</h6>
                    </div>
                </div>

                <div className='blade-top-margin-lg blade-bottom-margin-lg'>
                    <div className='pt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3'>
                        {
                            data.map((elem, idx) => {
                                return (
                                    <div key={idx} className='bg-[#FFFFFFB2] backdrop-blur-[10px] shadow-blur px-5 wcontainer py-10 rounded-md'>
                                        <img className='max-xl:h-10' src={elem.icon} alt="icons" />
                                        <div className='blade-top-margin sm:blade-top-margin-sm space-y-2'>
                                            <h5 className='font-medium'>{elem.title}</h5>
                                            <h5 className='text-sm xl:text-base'>{elem.desc}</h5>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Goal