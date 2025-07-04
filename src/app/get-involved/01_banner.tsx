import banner from "@/../public/assets/contact/banner.png";
import bannerMob from "@/../public/assets/contact/bannerMobile.png";
import { HeroBtnPink } from "@/_components/atoms/buttons";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";

export default function GetInvolvedBanner() {
  return (
    <>
      <div className="pt-[5rem] sm:pt-[6rem]">
        <div className="relative ">
          <div
            className={`sm:block  hidden w-full h-[45rem] bg-black `}
          >
            <Image
            // style={{objectPosition:"left 20%"}}
              src={banner}
              alt="Publication Banner"
              className="w-full h-full object-cover "
              unoptimized={true}
              quality={100}
            ></Image>
          </div>
          

          <div className="sm:hidden block h-auto">
            <Image
              src={bannerMob}
              alt="Publication Banner"
              className="w-full h-full object-cover object-right"
              unoptimized={true}
              quality={100}
            ></Image>
          </div>

          <div className="w-container overflow-hidden">
            <div className="absolute w-auto sm:w-auto top-9  sm:top-12 md:top-18 flex flex-col  justify-between h-[88%] sm:h-[80%]">
              <div className="flex flex-row gap-1 ">
                <Link href="/">
                  <svg
                    className="fill-white "
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.8"
                      d="M14.2891 0.351685L0.730469 12.5549H4.42827V23.6483H13.0565V16.2527H15.5217V23.6483H24.1499V12.5549H27.8477L14.2891 0.351685ZM14.2891 3.66911L21.6847 10.3256V11.3223V21.1831H17.9869V13.7875H10.5913V21.1831H6.89347V10.3256L14.2891 3.66911Z"
                    />
                  </svg>
                </Link>
                <h5 className="text-white font-light flex flex-row">
                  <RiArrowRightSLine className="text-[24px]" />
                  Get Involved
                </h5>
              </div>
              <div className="  w-full ">
                <h1 className="text-white font-medium ">Get Involved</h1>
                <div className={` py-2 sm:py-4 w-full  max-w-lg`}>
                  <h5 className="text-white font-light ">
                    Join our community, ask questions, or participate in
                    building a resilient India.
                  </h5>
                </div>

                <HeroBtnPink
                  text="Apply now"
                  role="link"
                  borderColor="pink"
                  color="white"
                  bgColor="transparent"
                  size="large"
                  aarowColor="white"
                  classes="font-medium"
                  link="https://docs.google.com/forms/d/e/1FAIpQLSdjpffzJCT6qmQXNUmoUau7giN4qVTsm5j3ysGZ0r8QxiG05g/viewform?usp=sharing&ouid=118204303619309850521"
                  target={"_blank"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
