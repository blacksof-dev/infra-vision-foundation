import Image from "next/image";
import bannerPublication from "@/../public/assets/publication/bannerPublication.png";
import { RiArrowRightSLine } from "react-icons/ri";
export default function Banner() {
  return (
    <>
      <div className="pt-[5rem] lg:pt-[7rem]">
        <div className="relative ">
          <div className="h-[26rem] md:h-[28rem] xl:h-[40rem]">
            <Image
              src={bannerPublication}
              alt="Publication Banner"
              className="w-full h-full md:object-cover object-right"
            ></Image>
          </div>
          <div className="w-container">
            <div className="absolute top-9 sm:top-4 md:top-18 flex flex-col  justify-between h-[80%]">
              <div className="flex flex-row gap-1">
                <svg
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.8"
                    d="M14.2891 0.351685L0.730469 12.5549H4.42827V23.6483H13.0565V16.2527H15.5217V23.6483H24.1499V12.5549H27.8477L14.2891 0.351685ZM14.2891 3.66911L21.6847 10.3256V11.3223V21.1831H17.9869V13.7875H10.5913V21.1831H6.89347V10.3256L14.2891 3.66911Z"
                    fill="white"
                  />
                </svg>
                <h5 className="text-white font-medium flex flex-row">
                  <RiArrowRightSLine  className="text-[24px]"/>
                  Publications</h5>
              </div>
              <div className="w-[66%] ">
                <h1 className="text-white font-medium ">Publications</h1>
                <div className="py-2 sm:py-4">
                  <h5 className="text-white">
                    Rigorous knowledge assets shaping India's infrastructure
                    growth story
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
