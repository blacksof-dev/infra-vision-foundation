export default function Permission() {
  return (
    <>
      <div className="bg-whitesmoke ">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg relative">
          <div className="hidden md:block absolute right-0 top-0">
            <svg
              width="459"
              height="447"
              viewBox="0 0 459 447"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5">
                <circle
                  cx="130.108"
                  cy="130.108"
                  r="129.737"
                  transform="matrix(-0.998666 -0.0516365 -0.0516365 0.998666 458.558 -38.6465)"
                  stroke="#D9D9D9"
                  strokeWidth="0.742301"
                />
                <circle
                  opacity="0.3"
                  cx="153.523"
                  cy="153.523"
                  r="153.523"
                  transform="matrix(-0.998666 -0.0516365 -0.0516365 0.998666 322.742 133.498)"
                  fill="#D9D9D9"
                />
              </g>
            </svg>
          </div>
          <div className="w-full md:w-[50%] ">
            <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-pink">Using our publications</h5>
            </div>
            <div className="py-3 ">
              <h1 className="text-black  font-light">
                Permission for <br />
                <span className="text-black/90 font-medium ">
                  reproduction and use
                </span>
              </h1>
            </div>
            <div className=" w-full md:w-[90%]">
              <h5 className="font-light tracking-[1%] py-2">
                The Infravision Foundation welcomes collaboration and
                knowledge-sharing to create meaningful change.
              </h5>

              <h5 className="font-light tracking-[1%] py-2">
                Interested parties can request permission to utilise our
                publications for their endeavours. This includes reproduction,
                duplication, translation, or any other use.
              </h5>

              <h5 className="font-light tracking-[1%] py-2">
                Please send requests, and any additional inquiries related to
                our publications, to{" "}
                <span className="text-pink font-medium tracking-[1%] underline">
                  publications@theinfravisionfoundation.org
                </span>
                .
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
