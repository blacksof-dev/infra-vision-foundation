"use client";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { TextNavAnchor } from "../atoms/links";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";



export default function Header() {

  const [open, setopen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavBg,setshowNavBg] = useState(false);


  const handlehamberg = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  useEffect(()=>{
    const activeUrl = ["/publication"]
    const currentPath = window.location.pathname;
    if(activeUrl.includes(currentPath)){
      setshowNavBg(true);
    }
    else{
      setshowNavBg(false);
    }
  })


 
  return (
    <>
      <nav className={`absolute py-2 z-[999] w-full translate-x-1/2 lg:h-[6rem] right-1/2 md:right-[46%] 2xl:right-[50%] ${showNavBg?"bg-white":"bg-transparent"}`}>
        <div className=" flex flex-row  w-container w-full gap-[8rem] sm:gap-[20rem] md:gap-[19rem] lg:gap-[35rem] xl:gap-11 ">
          <div className= "w-[10rem] md:w-[10rem] xl:w-[14rem] h-full">
            <Image
              src={logo}
              alt="Infravision Foundation Logo"
              className="w-full h-full"
            ></Image>
          </div>

          <div className=" flex flex-row  gap-5">
            <div className="hidden  xl:flex flex-row gap-1 2xl:gap-5  items-center">
              <ul className="relative">
                <li onClick={() => setopen((prev) => !prev)}>
                  <TextNavAnchor
                    color="dark"
                    size="large"
                    className="block whitespace-nowrap px-3 py-1 md:py-2"
                    text="What Drives Us"
                    status={open}
                  />
                </li>
              </ul>

              <ul>
                <li>
                  <TextNavAnchor
                    color="dark"
                    size="large"
                    className="block whitespace-nowrap px-3 py-1 md:py-2"
                    text="Our Initiatives"
                  />
                </li>
              </ul>

              <ul>
                <li>
                  <TextNavAnchor
                    color="dark"
                    size="large"
                    className="block whitespace-nowrap px-3 py-1 md:py-2"
                    text="Publications"
                  />
                </li>
              </ul>

              <ul>
                <li>
                  <TextNavAnchor
                    color="dark"
                    size="large"
                    className="block whitespace-nowrap px-3 py-1 md:py-2"
                    text="Resources"
                  />
                </li>
              </ul>

              <ul>
                <li>
                  <TextNavAnchor
                    color="dark"
                    size="large"
                    className="block whitespace-nowrap px-3 py-1 md:py-2"
                    text="Events"
                  />
                </li>
              </ul>

              <ul>
                <li>
                  <TextNavAnchor
                    color="dark"
                    size="large"
                    className="block whitespace-nowrap px-3 py-1 md:py-2"
                    text="Contact Us"
                  />
                </li>
              </ul>
            </div>
            <div className="flex flex-row gap-4  justify-center items-center">
              <div className=" hidden w-[10%] xl:w-[14%] min-w-[160px] border border-darkgray rounded p-2 sm:flex flex-row gap-2 items-center">
                <FaSearch className="text-darkgray text-xl" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full outline-none bg-transparent text-sm placeholder:text-gray-500"
                />
              </div>
              <div className="  sm:hidden w-8 h-8 rounded-full p-1 bg-pink flex justify-center items-center">
                <FaSearch className="text-white text-lg" />
              </div>
              <div className=" block xl:hidden ">
                <button onClick={handlehamberg}>
                  <RxHamburgerMenu className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
