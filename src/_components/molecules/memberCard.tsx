'use client'
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface MemberCardProps {
  image: StaticImageData;
  title: string;
  desig: string;
  link?: string;
}

export const MemberCard = ({ image, title, desig, link }: MemberCardProps) => {
  return (
    <div className="flex relative flex-col w-[19rem] h-[19rem]">
      <Image
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded"
        unoptimized={true}
      />
      <div className="absolute bottom-0 left-0 w-[17rem]">
        {link ? (
          <div className="ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
            <Link
              onClick={(e) => e.stopPropagation()}
              href={link}
              target="_blank"
              className="group"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                className="fill-[#5D6468] group-hover:fill-[#C82249] transition-colors duration-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="group-hover:bg-pink ml-auto relative top-1 right-1 bg-white w-[3rem] h-[3rem] rounded flex justify-center items-center">
            <div>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                className="fill-[#5D6468] group-hover:fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.9911 0H1.9127C0.85508 0 -0.00012207 0.834961 -0.00012207 1.86728V24.0368C-0.00012207 25.0691 0.85508 25.9091 1.9127 25.9091H23.9911C25.0487 25.9091 25.909 25.0691 25.909 24.0418V1.86728C25.909 0.834961 25.0487 0 23.9911 0ZM7.68658 22.0784H3.8407V9.71085H7.68658V22.0784ZM5.76364 8.02575C4.52891 8.02575 3.53202 7.02885 3.53202 5.79918C3.53202 4.56951 4.52891 3.57262 5.76364 3.57262C6.99331 3.57262 7.9902 4.56951 7.9902 5.79918C7.9902 7.02379 6.99331 8.02575 5.76364 8.02575ZM22.0783 22.0784H18.2374V16.0667C18.2374 14.6346 18.2121 12.7876 16.2386 12.7876C14.2398 12.7876 13.9361 14.3512 13.9361 15.9655V22.0784H10.1004V9.71085H13.7843V11.401H13.8349C14.346 10.4294 15.601 9.40217 17.4683 9.40217C21.3597 9.40217 22.0783 11.9627 22.0783 15.2924V22.0784Z" />
              </svg>
            </div>
          </div>
        )}
        <div className="bg-white w-[14rem]  lg:h-auto rounded">
          <h6 className="pt-1 2xl:pt-2 px-2 font-medium">{title}</h6>
          <p className="px-2 text-sm font-light text-black">{desig}</p>
        </div>
      </div>
    </div>
  );
};
