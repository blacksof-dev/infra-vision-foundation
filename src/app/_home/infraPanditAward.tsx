'use client'

import Image from "next/image";
import montek from "@/../public/assets/globals/infrapanditAward.jpg"



export default function InfrapanditAward() {

    return (
        <>
            <div className="relative  bg-white  rounded-lg  mt-8  flex flex-col sm:flex-row items-cente sm:gap-4 md:gap-7 xl:gap-10 min-h-[22rem] lg:min-h-[25rem] overflow-hidden">
                <div className="w-full h-auto sm:w-[45%] lg:w-[38%]  sm:p-5 ">
                    <Image
                        src={montek}
                        alt="Mr Montek Singh Ahluwalia"
                        className="rounded-lg w-full h-full object-cover"
                    />
                </div>
                <div className=" px-3 py-6 xl:py-0 w-full sm:w-1/2 flex flex-col justify-center ">

                    <h2 className="text-pink font-semibold lg:text-[42px]">InfraPandit Awards</h2>

                    <div className="max-w-sm pt-2 sm:pt-6">
                        <h2 className="font-medium pt-2 lg:pt-4 xl:pt-6">
                            Nurturing the Next Generation of Infra Talent and Ideas
                        </h2>

                        <div className="py-3 sm:pt-6">
                            <h2 className=" text-pink">June 20, 2025</h2>
                        </div>


                    </div>
                </div>
                <img
                    className="absolute opacity-60 top-0 right-0 hidden lg:block"
                    src="/assets/outreach-and-engagements/highlight/circle.png"
                    alt="Decorative Circle"
                />
            </div>
        </>
    );
}
