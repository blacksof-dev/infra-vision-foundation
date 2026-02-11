"use server"
import { HeroBtn, UnderlineCta } from "@/_components/atoms/buttons";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface GetInvolved {
  label: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
}

export default async function GetInvolvedSection() {
  const data = await getFetch<GetInvolved>("/content/get-involved");
  console.log(data);

  return (
    <>
      <div className="">
        <div className="relative h-auto  ">
          {data.backgroundImageDesktop && data.backgroundImageMobile && (
            <>
              <div
                style={{ backgroundImage: `url(${getUrl(data.backgroundImageDesktop)})` }}
                className="bg-cover  object-right-bottom  absolute inset-0 hidden sm:block"
              ></div>

              <div
                style={{ backgroundImage: `url(${getUrl(data.backgroundImageMobile)})` }}
                className="bg-cover bg-center d absolute inset-0 sm:hidden block"
              ></div>
            </>
          )}

       

          <div className="w-container flex flex-col md:flex-row  gap-14 md:gap-16 h-[25rem] xl:h-[38rem] xlg:h-[45rem] ">
            <div className="relative z-10 w-full  sm:w-[65%] lg:w-[60%] xl:w-[80%] blade-top-padding-lg   md:pb-28 ">
              {data.label && (
                <div className="flex flex-row items-center gap-2 md:gap-3">
                  <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white"></span>
                  <h5 className="text-white font-medium">{data.label}</h5>
                </div>
              )}

              <div className="py-4  ">
                <div className="w-full max-w-4xl">
                  <h1
                    className="text-white font-light "
                    dangerouslySetInnerHTML={{ __html: data.heading.replace(/\*\*(.*?)\*\*/g, "<b class='font-medium'>$1</b>") }}
                  />
                </div>

                <div className="max-w-xl w-full">
                  <h4 className="text-white font-light py-1 md:py-3 ">
                    {data.description}
                  </h4>
                </div>
              </div>
              <div className="w-fit">
                <HeroBtn
                  text={data.ctaText}
                  role="link"
                  borderColor="white"
                  link={data.ctaLink}
                  color="white"
                  bgColor="pink"
                  size="extralarge"
                  aarowColor="text-pink"
                  classes="font-medium cursor-pointer bg-white"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
