import banner from "@/../public/assets/contact/banner.png";
import bannerMob from "@/../public/assets/contact/bannerMobile.png";
import { HeroBtnPink } from "@/_components/atoms/buttons";
import { getData } from "@/lib/getServerData";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";


type contactApiResponse = {
  tagName: string;
  title: string;
  description: string;
  desktopImg: string;
  mobileImg: string;
  cta: {
    text: string;
    target: string;
  }[]
}

export const GetInvolvedBanner = async () => {
  const response = await getData<contactApiResponse>("/content/home/contactUsBanner");
  console.log(response);

  return (
    <>
      <div id="getInvolvedBanner" className="pt-[5rem] sm:pt-[6rem]">
        <div className="relative ">
          <div
            className={`sm:block  hidden w-full h-auto max-h-[45rem]  overflow-hidden bg-black `}
          >
            <Image
              src={response?.desktopImg}
              width={1000}
              height={1000}
              alt="Publication Banner"
              className="w-full h-full object-cover "
              unoptimized={true}
              quality={100}
            ></Image>
          </div>


          <div className="sm:hidden  w-full block h-auto">
            <Image
              width={500}
              height={500}
              src={response?.mobileImg}
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
                  {response?.tagName}
                </h5>
              </div>
              <div className="  w-full ">
                <h1 className="text-white font-medium ">{response.title}</h1>
                <div className={` py-2 sm:py-4 w-full  max-w-lg`}>
                  <h5 className="text-white font-light ">
                    {response?.description ?? ""}
                  </h5>
                </div>

                <HeroBtnPink
                  text={response.cta[0].text}
                  role="link"
                  borderColor="pink"
                  color="white"
                  bgColor="transparent"
                  size="large"
                  aarowColor="white"
                  classes="font-medium"
                  link={response.cta[0].target}
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

