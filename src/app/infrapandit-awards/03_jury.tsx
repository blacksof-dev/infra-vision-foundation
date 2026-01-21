import React from 'react'

const Jury = () => {

  const data = [
    {
      image: "/assets/infrapandit/jury/raghuram.png",
      name: "Jury Chair Professor G. Raghuram",
      position: "Member, Council of Advisors at The Infravision Foundation"
    },
    {
      image: "/assets/infrapandit/jury/krishnan.png",
      name: "Dr K.P. Krishnan",
      position: "Former IAS Officer"
    },
    {
      image: "/assets/infrapandit/jury/savita.png",
      name: "Ms Savita Mahajan",
      position: "Advisor and Independent Director"
    },


    {
      image: "/assets/infrapandit/jury/soumya.png",
      name: "Dr Soumya Kanti Ghosh",
      position: "Group Chief Economic Advisor, SBI; Member, PM’s Economic Advisory Council, and Distinguished Fellow, The Infravision Foundation"
    },

    {
      image: "/assets/infrapandit/jury/janmejaya.png",
      name: "Dr Janmejaya Sinha",
      position: "Chairman, BCG India Practice and Member, Council of Advisors at The Infravision Foundation"
    },
  ]

  return (
    <section className='blade-top-padding blade-bottom-padding-lg'>
      <div className='w-container'>
        <div className="flex items-center gap-2 md:gap-3 text-pink">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-sm xl:text-lg">The Jury</h5>
        </div>
        <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
          <h1 className="leading-snug font-light text-2xl md:text-3xl xl:text-5xl">
            Meet the panel
          </h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 blade-top-margin gap-10 justify-center'>
          {data.map((elem, idx) => (
            <div className='flex flex-col items-center' key={idx}>
              <img src={elem.image} alt={elem.name} />
              <h6 className='font-semibold mt-4 mb-1 text-center'>{elem.name}</h6>
              <p className='text-sm text-center max-w-[17rem] sm:w-[85%] text-[#0A0A0A]'>
                {elem.position}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Jury