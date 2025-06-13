import React from 'react'

export default function Publications() {
    return (
        <section className='bg-whitesmoke'>

            <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
                {/* Header Section */}
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
                    <h5 className="font-medium text-pink"> Using our publications</h5>
                </div>

                <div className="py-3 max-w-[40rem]">
                    <h1 className="text-black font-light">
                        Permission for
                        <span className="text-black font-medium">
                            {" "} reproduction and use
                        </span>
                    </h1>
                    <div className='space-y-3 mt-4 font-light'>
                        <h5 className='text-black'>
                            The Infravision Foundation welcomes collaboration and knowledge-sharing to create meaningful change.
                        </h5>
                        <h5 className='text-black'>
                            Interested parties can request permission to utilise our publications for their endeavours. This includes reproduction, duplication, translation, or any other use.
                        </h5>
                        <h5 className='text-black'>
                            Please send requests, and any additional inquiries related to our publications, to <a href='mailto:publications@theinfravisionfoundation.org' className='text-pink font-medium underline'> publications@theinfravisionfoundation.org</a>.
                        </h5>
                    </div>
                </div>
            </div>
        </section>
    )
}
