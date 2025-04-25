"use client"
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { RxCross1 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { TextMobileNavAnchor } from "../atoms/links";
import { useState } from "react";

export default function Mobilenav({ onClose }: { onClose: () => void; }) {
  let [mobilepopup,setmobilepopup] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center blade-top-margin-sm ">
        <div className="w-[12rem] sm:w-[13rem]">
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
      <div className="h-[70%] flex flex-col justify-center ">
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="What drives us"
              status={mobilepopup}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="Our initiatives"
              status={mobilepopup}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="Resources"
              status={mobilepopup}
              href="/resource"
              target="_self"
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="Publications"
              status={mobilepopup}
              href="/publication"
              target="_self"
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="Events"
              status={mobilepopup}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextMobileNavAnchor
              color="dark"
              className="block whitespace-nowrap py-6"
              text="Contact Us"
              status={mobilepopup}
            />
          </li>
        </ul>
    
      </div>
    </div>
  );
}
