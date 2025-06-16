"use client";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { RxCross1 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { TextMobileNavAnchor } from "../atoms/links";
import { useState } from "react";
interface CourseItem {
  name: string;
  href: string;
  target?: '_blank' | '_self';
}
export default function Mobilenav({ onClose }: { onClose: () => void }) {
  const [mobilepopup, setmobilepopup] = useState(false);

   const AboutuUsDropdown: CourseItem[] = [
    { name: 'Who we are', href: '/astrology-webinar' },
    { name: 'The Infravisionaries', href: '/lal-kitab-webinar' },
    { name: 'Vision and Mission', href: '/numerology-mega-webinar' },
    { name: 'Our pulse', href: '/vastu-shastra-webinar' },
     { name: 'The project pathway', href: '/vastu-shastra-webinar' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center blade-top-margin-sm ">
        <div className="w-[9rem] sm:w-[13rem]">
          <Image src={logo} alt="Infravision Foundation Logo" className="" />
        </div>
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full  bg-pink flex items-center justify-center">
            <FaSearch className="text-white" />
          </div>
          <button onClick={onClose}>
            <RxCross1 className="text-2xl cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Your mobile nav links go here */}
      <div className="pt-12  flex flex-col justify-center ">
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="About us"
              href="/about-us"
              showArrow={true}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="Advocacy"
              showArrow={true}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="Knowledge"
              href="/knowledge"
             showArrow={true}
            />
          </li>
        </ul>

        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="Get Involved"
              href="/get-involved"
              showArrow={false}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
