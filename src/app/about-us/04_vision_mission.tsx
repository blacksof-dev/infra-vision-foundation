
import React from 'react'



const VisionMission = () => {

    const data = [
        {
            icon: "/assets/about-us/vision-mission/icon-1.svg",
            desc: "To contribute thought leadership in helping shape and evaluate infrastructure-related public policies and programmes."
        },
        {
            icon: "/assets/about-us/vision-mission/icon-2.svg",
            desc: "To be the hub of choice for obtaining impartial and independent advice from acknowledged experts."
        },
        {
            icon: "/assets/about-us/vision-mission/icon-3.svg",
            desc: "To be India’s pre-eminent independent think-tank on infrastructure issues."
        },
    ]

    return (
        <section id="mission-and-vision" className='background-image'>
            <div className=' blade-top-padding blade-bottom-padding-lg w-container'>
                <div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
                        <h5 className="font-medium text-pink">Vision</h5>
                    </div>
                    <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
                        <h1 className="leading-snug font-light text-2xl md:text-3xl xl:text-5xl">
                            To champion appropriate infrastructural <br /> development initiatives for economic prosperity.
                        </h1>
                    </div>
                </div>

                <div className='h-[1px] blade-top-margin opacity-20 w-full bg-[#5D6468]' />

                <div className='blade-top-margin-lg'>
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
                        <h5 className="font-medium text-pink">Mission</h5>
                    </div>
                    <div className='pt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'>
                        {
                            data.map((elem, idx) => {
                                return (
                                    <div key={idx} className='bg-[#FFFFFFB2] backdrop-blur-[10px] shadow-blur w-container py-10 rounded-md'>
                                        <img className='max-xl:h-10' src={elem.icon} alt="icons" />
                                        <h5 className='blade-top-margin text-sm xl:text-lg'>{elem.desc}</h5>
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

export default VisionMission