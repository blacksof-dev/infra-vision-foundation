import { BorderGrayHeroBtn, HeroBtn, HeroBtnPink, UnderlineCta } from "@/_components/atoms/buttons";
import Image, { StaticImageData } from "next/image";

type Newsletter = {
  tag?: string;
  title: string;
  desc: string;
  herobtntitle: string;
  UnderlineCtatitle?: string;
  bgImage?: StaticImageData;
  mobilebg?: StaticImageData;
  image?: StaticImageData;
  bgColor?: string;
};

export default function SubFooter({
  tag,
  title,
  desc,
  herobtntitle,
  UnderlineCtatitle,
  bgImage,
  mobilebg,
  image,
  bgColor,
}: Newsletter) {
  return (
    <>
      <div className={`${bgColor !== "" ? "bg-" + bgColor : ""}`}>
        <div className="relative h-auto  ">
          {bgImage && mobilebg && (
            <>
              <div
                style={{ backgroundImage: `url(${bgImage.src})` }}
                className="bg-cover bg-center absolute inset-0 hidden md:block"
              ></div>

              <div
                style={{ backgroundImage: `url(${mobilebg.src})` }}
                className="bg-cover bg-center absolute inset-0 md:hidden block"
              ></div>
            </>
          )}

          {bgColor && (
            <div className="absolute top-0 left-0 hidden lg:block">
              <svg
                width="384"
                height="315"
                viewBox="0 0 384 315"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.43">
                  <circle
                    cx="79.3062"
                    cy="-19.4666"
                    r="144.124"
                    transform="rotate(3.28503 79.3062 -19.4666)"
                    stroke="#D9D9D9"
                    strokeWidth="0.742301"
                  />
                  <circle
                    opacity="0.3"
                    cx="220.694"
                    cy="162.328"
                    r="144.495"
                    transform="rotate(3.28503 220.694 162.328)"
                    fill="#D9D9D9"
                  />
                </g>
              </svg>
            </div>
          )}

          <div className="w-container flex flex-col md:flex-row  gap-14 md:gap-16 h-full ">
            <div className="relative z-10    w-full xl:w-[100%] blade-top-padding-lg pb-0  md:pb-28 ">
              {tag && (
                <div className="flex flex-row items-center gap-2 md:gap-3">
                  <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white"></span>
                  <h5 className="text-white font-medium">{tag}</h5>
                </div>
              )}

              <div className="py-4  w-[95%] sm:w-full">
                <h1
                  className="text-white font-light"
                  dangerouslySetInnerHTML={{ __html: title }}
                />

                <h4 className="text-white font-light py-1 md:py-3 " dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
              <div className="flex flex-col lg:flex-row gap-10 md:gap-10 items-start md:items-center">
                <div>
                    <div className="border-l-1 border-darkgray/20 ">
                        <HeroBtnPink
                          text={herobtntitle}
                          role="link"
                          borderColor="white"
                          color="white"
                          bgColor="white"
                          size="extralarge"
                          aarowColor="pink"
                          classes="w-full w-auto p-3 sm:p-2 text-sm font-medium"
                        />
                    </div>

                  
                </div>
              </div>
            </div>

            <div className="relative w-full lg:w-[40%] xl:w-[50%] h-auto  flex justify-center   lg:justify-end md:items-end">
              {image && (
                <div className="w-full sm:w-[60%] lg:w-[28rem] xl:w-[28rem] flex justify-center   lg:justify-end  ">
                  <Image
                    src={image}
                    alt="Infravision Talk Book"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
