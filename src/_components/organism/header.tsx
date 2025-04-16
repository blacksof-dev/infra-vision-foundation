"use client"
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.svg";
import { TextNavAnchor } from "../atoms/links";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Mobilenav from "./mobileNav";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev); 
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
  
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isMenuOpen]);
  return (
    <>
  <nav className="absolute w-[98dvw] overflow-hidden  z-[9999] top-3 left-2  xl:top-8 ">
  <div className="p-0 sm:px-3 xl:px-4 2xl:px-6  w-container  relative overflow-hidden ">
    <div className="flex flex-row justify-between  xl:gap-10 items-center  w-full">

      {/* Logo */}
      <div className="w-[11rem] 2xl:w-[14rem]  ">
        <Link href="/"><Image src={logo} className="" alt="Infra Vision Foundation" /></Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden xl:flex   flex-row  xl:gap-5 2xl:gap-6 3xl:gap-8 items-center ">
        <ul>
          
          <li className="">
            <TextNavAnchor
              color="dark"
              size="large"
              className="block whitespace-nowrap ps-5 py-1 md:py-2 "
              // href="/what-drives-us"
              text="What Drives Us"
              iconVisiblity={true}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextNavAnchor
              color="dark"
              size="large"
              className="block whitespace-nowrap ps-5 py-1 md:py-2 no-underline"
              // href="/our-initiatives"
              text="Our Initiatives"
              iconVisiblity={true}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextNavAnchor
              color="dark"
              size="large"
              className="block whitespace-nowrap ps-5 py-1 md:py-2 no-underline"
              // href="/publications"
              text="Publications"
              iconVisiblity={true}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextNavAnchor
              color="dark"
              size="large"
              className="block whitespace-nowrap ps-5 py-1 md:py-2 no-underline"
              // href="/resources"
              text="Resources"
              iconVisiblity={true}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextNavAnchor
              color="dark"
              size="large"
              className="block whitespace-nowrap ps-5 py-1 md:py-2 no-underline"
              // href="/events"
              text="Events"
              iconVisiblity={true}
            />
          </li>
        </ul>
        <ul>
          <li>
            <TextNavAnchor
              color="dark"
              size="large"
              className="block whitespace-nowrap ps-5 py-1 md:py-2 no-underline"
              // href="/contact-us"
              text="Contact Us"
              iconVisiblity={false}
            />
          </li>
        </ul>

       
       

      </div>

      <div className="hidden xl:block border  border-darkgray w-full xl:w-[8rem]  2xl:w-[10rem]  rounded">
          <form className="p-2">
            <div className="flex items-center  gap-3">
              <FaSearch className="text-darkgray text-xl " />
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none bg-transparent  text-sm placeholder:text-gray-500"
              />
            </div>
          </form>
        </div>








      {/* Mobile Hamburger Menu */}
      <div className="xl:hidden ">
        <div>
           <button  onClick={toggleMenu} ><RxHamburgerMenu className="text-3xl  me-4 "/></button>
        </div>
      
       {/* {isMenuOpen && (
        <div className="absolute  top-0 left-0 z-50">
          <Mobilenav />
        </div>
      )} */}
      </div>

    </div>
  </div>
</nav>

    </>
  );
}
