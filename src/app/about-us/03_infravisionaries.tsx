import InfravisionariesGlobal from "@/_components/molecules/infravisionariesGlobal";

export default function Infravisionaries() {
  return (
    <>
      <section id="infravisionaries" className="bg-white relative">
        <div className=" absolute top-0 xl:right-8 2xl:right-28 xl:block hidden">
          <svg
            width="594"
            height="427"
            viewBox="0 0 594 427"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <circle
                cx="130.108"
                cy="130.108"
                r="129.737"
                transform="matrix(-0.914239 -0.405175 -0.405175 0.914239 593.496 -18.2383)"
                stroke="#D9D9D9"
                strokeWidth="0.742301"
              />
              <circle
                opacity="0.3"
                cx="153.523"
                cy="153.523"
                r="153.523"
                transform="matrix(-0.914239 -0.405175 -0.405175 0.914239 405.117 93.9883)"
                fill="#D9D9D9"
              />
            </g>
          </svg>
        </div>
        <div className=" blade-top-padding-lg blade-bottom-padding-lg">
          <div className="w-container ">
            <div className=" flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex  flex-row  items-center gap-2 md:gap-3">
                  <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                  <h5 className="font-medium text-pink">Our Core</h5>
                </div>
                <div className="">
                  <h1 className="text-black font-medium pt-3">
                    The Infravisionaries
                  </h1>
                </div>
              </div>
              <div className="w-full  lg:w-[50%] pt-4 md:pt-0 xl:w-[45%]">
                <div>
                  <h6 className="text-black  tracking-[1%]">
                    <span className="font-semibold">
                      {" "}
                      The Infravision Foundation{" "}
                    </span>{" "}
                    is a confluence of seasoned thought leaders and experts from
                    across the infrastructure domain.
                  </h6>
                  <h6 className="text-black  tracking-[1%] pt-3">
                    It draws strength from the collective wisdom and a shared
                    purpose. As a flagbearer of thought leadership in India’s
                    infrastructural landscape, The Infravision Foundation is
                    actively propelling the nation’s infrastructural and
                    economic growth.
                  </h6>
                </div>        
              </div>
            </div>
              
          </div>
          <InfravisionariesGlobal role="about"/>
        </div>
      </section>
    </>
  );
}
