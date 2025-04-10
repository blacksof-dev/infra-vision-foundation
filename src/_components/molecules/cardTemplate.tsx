type CardProps = {
  date: string;
  title: string;
  image: StaticImageData;
  link: string;
  category:string;
};
import Image, { StaticImageData } from "next/image";
import { HeroBtn } from "../atoms/buttons";

export default function Card({ date, title, image,link,category }: CardProps) {
  return (
    <>
      <section>
        <div className=" lg:w-[25rem] xl:w-[20rem] 2xl:w-[25rem] 3xl:w-[29rem]">
          <div className=" xl:max-w-[29rem] h-[16rem] ">
            <Image
              src={image}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-row justify-between pt-2 pb-1 md:py-3">
            <div className="flex  flex-row  items-center gap-3 ">
              <span className="w-[12px]  h-[12px] rounded-full bg-darkgray "></span>
              <p className="font-medium text-black">{category}</p>
            </div>
            <div>
              <h6 className="buttonText text-darkgray">{date}</h6>
            </div>
          </div>
          <div className="">
            <h5 className="text-black font-medium ">{title}</h5>
          </div>
          <div className="pt-1 pb-6 xl:py-5">
            <HeroBtn
              text="Read more"
              role="link"
              borderColor="darkgray/40"
              color="black"
              bgColor="white"
              size="small"
              target="_blank"
              link={link}
            />
          </div>
        </div>
      </section>
    </>
  );
}
