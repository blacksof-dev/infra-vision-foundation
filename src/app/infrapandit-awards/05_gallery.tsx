import React from 'react'

const Gallery = () => {
  return (
    <section className='blade-top-padding blade-bottom-padding-lg'>
        <div className='w-container'>
            <div className="flex items-center gap-2 md:gap-3 text-pink">
                <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
                <h5 className="font-medium text-sm xl:text-lg">Gallery</h5>
            </div>
            <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
                <h1 className="leading-snug font-light text-2xl md:text-3xl xl:text-5xl">
                    From the <span className='font-medium'>ceremony</span>
                </h1>
            </div>
            <div className='blade-top-margin-sm overflow-x-auto'>
                <img className='min-w-[600px] sm:min-w-[700px] md:min-w-0 w-full h-auto' src="/assets/infrapandit/gallery.png" alt="Gallery" />
            </div>
        </div>
    </section>
  )
}

export default Gallery