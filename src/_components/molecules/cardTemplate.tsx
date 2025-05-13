type CardProps = {
  date: string;
  title: string;
  image: string;
  link: string;
  category:string;
  classes?:string
};
import Image from "next/image";
import { BorderGrayHeroBtn} from "../atoms/buttons";

export default function Card({ date, title, image,link,category,classes }: CardProps) {
  return (
    <>
      <section>
      
        <div >
          <div className="  xl:max-w-[29rem] h-[16rem] ">
            <Image
              src={image}
               width={1000}
                height={1000}
              alt="Image"
              className="w-full h-full object-cover rounded"
            />
          </div>

           
           <div className="  flex justify-between flex-col">
            <div>
              <div className="flex flex-row justify-between pt-2 pb-1 md:py-3">
                <div className="flex  flex-row  items-center gap-3 ">
                  <span className="w-[12px]  h-[12px] rounded-full bg-darkgray/30 "></span>
                  <p className="text-sm md:text-base font-medium text-black">{category}</p>
                </div>
                <div>
                  <h6 className="text-sm md:text-base  text-darkgray ">{date}</h6>
                </div>
              </div>

              <div className="pt-1 ">
                <h4 className={`text-black font-medium ${classes} line-clamp-1`}>{title}</h4>
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
