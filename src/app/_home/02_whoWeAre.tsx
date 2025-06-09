export default function WhoWeAre() {
  return (
    <>
      <div className="bg-whitesmoke">
        <div className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          <div className="flex md:flex-row flex-col justify-between">
            <div>
              <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
                <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
                <h5 className="font-medium text-pink">Who we are</h5>
              </div>
              <div className="py-2 ">
                <h1 className="text-black  font-light">
                  <span className="text-black/90 font-medium ">
                    Change emanating
                  </span>
                  <br /> from a shared purpose
                </h1>
              </div>
            </div>
            <div className="w-full md:w-[50%]">
              <h6 className="text-black font-light">
                Established in 2022 by Mr Vinayak Chatterjee and Mrs Rumjhum
                Chatterjee,{" "}
                <span className="font-semibold">
                  The Infravision Foundation
                </span>{" "}
                is a non-partisan, not-for-profit think tank driving{" "}
                <span className="font-semibold">
                  infrastructure-led economic development of India.
                </span>
              </h6>
              <h6 className="text-black font-light py-3">
                Led by veteran domain experts and thought leaders, the
                Foundation addresses deeply rooted infrastructure challenges to
                enable steadfast infrastructure policy-making. It churns impact
                through rigorous{" "}
                <span className="font-semibold">
                  knowledge sharing and advocacy.
                </span>
              </h6>
            </div>
          </div>
           <div className="blade-top-padding-sm">
            <TabSwitch />
          </div>
        </div>
      </div>
    </>
  );
}

const TabSwitch = () => {
  return (
    <>
      <div>
        <div className="flex flex-row  justify-center items-center gap-8 border-b mx-auto pb-3 border-darkgray w-fit">
          <h5 className="text-darkgray">Knowledge</h5>
          <h5 className="text-darkgray">Advocacy</h5>
        </div>
      </div>
    </>
  );
};
 