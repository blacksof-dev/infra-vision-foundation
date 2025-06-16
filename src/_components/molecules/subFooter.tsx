import { BorderGrayHeroBtn, HeroBtnPink } from "@/_components/atoms/buttons";
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
    <div className={`${bgColor ? `bg-${bgColor}` : ""} relative`}>
      {/* Background Images */}
      {bgImage && mobilebg && (
        <>
          <div
            style={{ backgroundImage: `url(${bgImage.src})` }}
            className="bg-cover bg-center absolute inset-0 hidden md:block"
          ></div>

          <div
            style={{ backgroundImage: `url(${mobilebg.src})` }}
            className="bg-cover bg-center absolute inset-0 block md:hidden"
          ></div>
        </>
      )}

      {/* Optional SVG Circles */}
      {bgColor && (
        <div className="absolute top-0 left-0 hidden lg:block z-0">
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

      {/* Content Container */}
      <div className="relative z-10 w-container flex flex-col md:flex-row gap-10 md:gap-16 pt-12 md:pt-20 pb-12 md:pb-28 md:min-h-[36rem]">
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2">
          {tag && (
            <div className="flex items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white"></span>
              <h5 className="text-white font-medium text-sm md:text-base">{tag}</h5>
            </div>
          )}

          <div className="py-4 w-full sm:w-[95%]">
            <h1
              className="text-white font-light text-xl sm:text-2xl md:text-3xl leading-snug"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <h4
              className="text-white font-light py-2 md:py-3 text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>

          <div className="pt-4">
            <HeroBtnPink
              text={herobtntitle}
              role="link"
              borderColor="white"
              color="white"
              bgColor="white"
              size="extralarge"
              aarowColor="pink"
              classes="w-full sm:w-auto text-sm font-medium"
            />
          </div>
        </div>

        {/* Right Side: Image */}
        {image && (
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-end">
            <div className="w-[80%] sm:w-[60%] md:w-[28rem]">
              <Image
                src={image}
                alt="Infravision Talk Book"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
