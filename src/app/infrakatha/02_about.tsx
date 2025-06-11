import React from 'react'

import image_01 from "@/../public/assets/infrakatha/about/dilip-cherian.jpg"
import image_02 from "@/../public/assets/infrakatha/about/vinayak-chatterjee.jpg"
import image_03 from "@/../public/assets/infrakatha/about/jagan-shah.jpg"
import { MemberCard } from "@/_components/molecules/MemberCard";

export default function About() {
    return (
        <section className="blade-top-padding-lg blade-bottom-padding-lg bg-white">
            <div className="w-container flex">
                {/* Left: Text Content */}
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row items-center gap-2 mb-2">
                        <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
                        <h5 className="font-medium text-pink">About InfraKatha</h5>
                    </div>
                    <h1 className="text-black font-light text-[2rem] md:text-[2.5rem] leading-tight mb-4">
                        Driving conversations<br />
                        that spark <span className="font-semibold">change</span><br />
                        <span className="font-semibold">and awareness</span>
                    </h1>
                    <p className="text-darkgray text-base md:text-lg mb-6 max-w-xl">
                        InfraKatha is a key initiative of The Infravision Foundation dedicated to familiarising and uplifting infrastructural discourse for meaningful outcomes.<br className="hidden md:block" />
                        The event features renowned cross-disciplinary experts and our Infravisionaries diving deep into the pressing challenges and pivotal developments in infrastructure. Each session nudges perceptions and public policymaking with deep thought and holistic understanding.
                    </p>
                    <div>
                        <a href="#" className="inline-flex items-center gap-2 text-pink font-medium group hover:underline">
                            Watch the videos
                            <span className=" w-6 h-6 bg-pink rounded-full flex items-center justify-center transition-colors group-hover:bg-black">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                            </span>
                        </a>
                    </div>
                </div>
                {/* Right: Hosts Cards */}
                <div className="flex flex-col">
                    <h6 className="text-pink font-medium mb-4">The hosts</h6>
                    <div className="flex gap-6 relative">
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
        </section>
    )
}
