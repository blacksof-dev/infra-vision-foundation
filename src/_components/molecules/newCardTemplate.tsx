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
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

export default function NewCard({ date, title, image,link,category,classes }: CardProps) {
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
                {/* <div>
                  <h6 className="text-sm md:text-base  text-darkgray ">{date}</h6>
                </div> */}
              </div>

              <div className="pt-1 ">
                <h4 className={`text-black font-medium ${classes} line-clamp-1`}>{title}</h4>
              </div>
            </div>

            <div className="pt-3  pb-6 xl:py-5 h">
              <div className="group flex ">
                  <Link
                    href="#"
                    target="_blank"
                  >
                    <button className="text-black text-lg lg:text-xl  justify-center item-center cursor-pointer relative font-medium flex flex-row gap-2">
                      <FaYoutube className="text-[#C82249] text-3xl" />
                      Watch Video
                      <div className="w-10 sm:w-20 h-[1px] sm:h-[2px] group-hover:w-full absolute bottom-0 left-0 top-9 bg-pink transition-all duration-1000"></div>
                    </button>
                  </Link>
                </div>
            </div>
           </div>
            
        </div>
      </section>
    </>
  );
}


