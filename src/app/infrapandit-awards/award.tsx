import Image from "next/image";

export default function InfraPanditAward() {
  return (
    <section className="bg-pink blade-top-padding-lg blade-bottom-padding-lg">
      <div className="w-container ">
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-2 md:gap-3 text-white">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white"></span>
            <h5 className="font-medium text-sm xl:text-lg">
              The InfraPandit Awards 2025
            </h5>
          </div>
          <div>
            <h1 className="font-light text-white max-w-4xl text-2xl md:text-3xl xl:text-5xl my-2">
              Translating infrastructure <br /> research into{" "}
              <span className="font-medium">real-world impact</span>
            </h1>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl overflow-hidden flex flex-col-reverse lg:flex-row p-4 sm:p-6 md:p-10 mt-8 gap-6 md:gap-8">
          {/* Text Section */}
          <div className="w-full lg:w-[50%]   flex flex-col justify-start">
            <div className="max-w-2xl 2xl:max-w-xl">
              <h4 className="text-black font-medium text-base md:text-lg xl:text-2xl ">
                The inaugural edition, supported by Larsen & Toubro, reaffirmed
                the initiative&apos;s potential to move rigorous infrastructure
                research from the shelf to practice. The ceremony convened
                pioneers from industry, academia and government.
              </h4>
              <p className="text-black my-4 lg:my-6 text-sm md:text-lg">
                Submissions from 16 institutions across engineering, energy,
                urban transport, governance, economics and social science
                reflected strong multidisciplinary interest in infrastructure
                research.
              </p>
              <p className="text-black  text-sm md:text-lg">
                <b>One-third </b>of entries were led by women researchers,
                underscoring the bright future of India&apos;s infrastructure
                research and innovation ecosystem.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-[50%] xl:w-[50%] relative min-h-[220px] sm:min-h-[380px] xl:min-h-[480px] rounded-lg ">
            <Image
              src="/assets/infrapandit/infraPanditAward.png"
              alt="InfraPandit Awards Ceremony"
              fill
              className="object-cover "
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
