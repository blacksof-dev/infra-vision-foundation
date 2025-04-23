type CardProps = {
  date: string;
  title: string;
  image: StaticImageData;
  link: string;
  category:string;
  classes?:string
};
import Image, { StaticImageData } from "next/image";
import { BorderGrayHeroBtn} from "../atoms/buttons";

export default function Card({ date, title, image,link,category,classes }: CardProps) {
  return (
    <>
      <section>
      
        <div className="  lg:w-[25rem]  xl:w-[21rem] 2xl:w-[26rem] 3xl:w-[29rem]">
          <div className="  xl:max-w-[29rem] h-[16rem] ">
            <Image
              src={image}
              alt="Image"
              className="w-full h-full object-cover rounded"
            />
          </div>

           
           <div className="  flex justify-between flex-col">
            <div>
              <div className="flex flex-row justify-between pt-2 pb-1 md:py-3">
                <div className="flex  flex-row  items-center gap-3 ">
                  <span className="w-[12px]  h-[12px] rounded-full bg-darkgray/30 "></span>
                  <p className="text-sm font-medium text-black">{category}</p>
                </div>
                <div>
                  <h6 className="text-sm  text-darkgray ">{date}</h6>
                </div>
              </div>

              <div className="pt-1">
                <h5 className={`text-black font-medium ${classes} line-clamp-1`}>{title}</h5>
              </div>
            </div>

            <div className="pt-3  pb-6 xl:py-5 h">
              <BorderGrayHeroBtn
                text="Read more"
                role="link"
                borderColor="darkgray/40"
                color="black"
                bgColor="white"
                size="base"
                target="_blank"
                link={link}
              />
            </div>
           </div>
            
        </div>
      </section>
    </>
  );
}
