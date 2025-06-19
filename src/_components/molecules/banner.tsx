import Image, { StaticImageData } from "next/image";
import Balancer from "react-wrap-balancer";

interface bannerProps {
  image: StaticImageData;
  heading: string;
  title: string;
  subdesc: string;
  mobileimage?: StaticImageData;
  classes?: string;
  buttonText?: string;
  link?:string
}

import { RiArrowRightSLine } from "react-icons/ri";
import { HeroBtnPink } from "../atoms/buttons";
import Link from "next/link";
export default function Banner({
  image,
  heading,
  title,
  subdesc,
  mobileimage,
  classes,
  buttonText,
  link,
}: bannerProps) {
  return (
    <>
      <div className="pt-[5rem] sm:pt-[6rem]">
        <div className="relative ">
          {/* <div className={`w-full h-[40rem] md:h-[36rem] xl:h-[40rem] bg-black ${mobileimage ? "md:block hidden" : ""}`}> */}
          <div className={`w-full h-[25rem] md:h-[36rem] xl:h-[40rem] bg-black ${mobileimage ? "md:block hidden" : ""}`}>
            <Image
              src={image}
              alt="Publication Banner"
              className="w-full h-full object-cover  2xl:object-bottom"
              unoptimized={true}
            ></Image>
          </div>
          {mobileimage && (
            <div className="md:hidden block h-[30rem]">
              <Image
                src={mobileimage}
                alt="Publication Banner"
                className="w-full h-full object-cover object-right"
              ></Image>
            </div>
          )}
          <div className="w-container overflow-hidden">
            <div className="absolute w-auto sm:w-auto top-9  sm:top-12 md:top-18 flex flex-col  justify-between h-[88%] sm:h-[80%]">
              <div className="flex flex-row gap-1 ">
                <Link href="/">
                <svg
                  className="fill-black  sm:fill-white "
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
                <h5 className="text-black sm:text-white font-light flex flex-row">
                  <RiArrowRightSLine className="text-[24px]" />
                  {heading}
                </h5>
              </div>
              <div className="  w-full ">
                <h1 className="text-white font-medium ">{title}</h1>
                <div className={` py-2 sm:py-4 w-full  max-w-lg`}>
                  <h5 className="text-white font-light "   dangerouslySetInnerHTML={{ __html: subdesc }}  />
               
              
                </div>
                {buttonText && (
                  <HeroBtnPink
                    text={buttonText}
                    role="link"
                    borderColor="pink"
                    color="white"
                    bgColor="transparent"
                    size="large"
                    aarowColor="white"
                    classes="font-medium"
                    link={link}
                    target={"_blank"}
                  />
                )}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
