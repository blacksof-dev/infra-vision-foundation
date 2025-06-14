import React from 'react'

const Jury = () => {

  const data = [
    {
      image: "/assets/infrapandit/jury/image-1.png",
      name: "Mr Siraj Hussain",
      position: "Chairman; Former Secretary, Ministry of Agriculture"
    },
    {
      image: "/assets/infrapandit/jury/image-2.png",
      name: "Mr Vinayak Chatterjee",
      position: "Member; Founder and Managing Trustee of The Infravision Foundation"
    },
    {
      image: "/assets/infrapandit/jury/image-3.png",
      name: "Dr Seema Bathla",
      position: "Member; Professor, Jawaharlal Nehru University (JNU)"
    },
    {
      image: "/assets/infrapandit/jury/image-4.png",
      name: "Mr Akhilesh Tilotia",
      position: "Member; Public Policy Expert"
    },
    {
      image: "/assets/infrapandit/jury/image-5.png",
      name: "Mr Jagan Shah",
      position: "Member Secretary; CEO of The Infravision Foundation"
    },
  ]

  return (
    <section className='blade-top-padding blade-bottom-padding-lg'>
      <div className='w-container'>
        <div className="flex items-center gap-2 md:gap-3 text-pink">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-sm xl:text-lg">The jury</h5>
        </div>
        <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
          <h1 className="leading-snug font-light text-2xl md:text-3xl xl:text-5xl">
            Meet the panel
          </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 blade-top-margin gap-y-10'>
          {data.map((elem,idx)=>{
            return(
              <div className='flex flex-col items-center' key={idx}>
                <img src={elem.image} alt={elem.name} />
                <h6 className='font-semibold mt-4 mb-1'>{elem.name}</h6>
                <p className='text-sm text-center w-[85%] text-[#0A0A0A]'>{elem.position}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Jury