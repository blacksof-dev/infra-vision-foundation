import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { BorderGrayHeroBtn } from "../atoms/buttons";
type CardProps = {
    date: string;
    title: string;
    image: string;
    link: string;
    category: string;
    description: string;
    classes?: string;
    ctaType?: 'read more' | 'yt';
};




export function NewsCard({ date, title, image, link, category, description, ctaType = 'yt', classes }: CardProps) {
    return (

        <div className="flex flex-col  h-full">
            <div className="xl:max-w-[29rem] h-[16rem] ">
                <Image
                    src={image}
                    width={1000}
                    height={1000}
                    alt="Image"
                    className="w-full h-full object-cover rounded"
                />
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <div className="flex flex-row justify-between pt-2 pb-1 md:py-3 items-center">
                        <div className="flex flex-row items-center gap-2 ">
                            <span className="w-[10px] h-[10px] rounded-full bg-pink "></span>
                            <p className="text-sm md:text-base font-medium text-black">{category}</p>
                        </div>
                        <div>
                            <h6 className="text-xs md:text-base text-darkgray ">{date}</h6>
                        </div>
                    </div>
                    <div className="pt-1 ">
                        <h5 className={`text-black font-medium ${classes}`}>{title}</h5>
                    </div>
                    <div className="pt-1">
                        <p className={`${title === '' ? "text-black font-medium" : "text-darkgray"} text-base md:text-lg line-clamp-2`}>{description}</p>
                    </div>
                </div>
            </div>
            <div className="pt-3 pb-6 xl:py-5 mt-auto">
                {
                    ctaType === 'yt' &&

                    <div className="group flex ">
                        <Link href={link} target="_blank">
                            <button className="text-black text-base  justify-center items-center cursor-pointer relative font-medium flex flex-row gap-2">
                                <FaYoutube className="text-[#C82249] text-3xl" />
                                Watch video
                                <div className="w-10 sm:w-20 h-[1px] sm:h-[2px] group-hover:w-full absolute bottom-0 left-0 top-9 bg-pink transition-all duration-1000"></div>
                            </button>
                        </Link>
                    </div>
                }
                {
                    ctaType === 'read more' &&
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

                }
            </div>
        </div>

    );
}


