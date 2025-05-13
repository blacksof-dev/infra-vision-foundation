"use client";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { TextNavAnchor } from "../atoms/links";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { BorderGrayHeroBtn } from "../atoms/buttons";
import Mobilenav from "./mobileNav";
import { usePathname } from "next/navigation";

export default function () {
  const pathname = usePathname();

  const [open, setopen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showNavBg, setshowNavBg] = useState<boolean>(false);
  const [lastScrollY, setlastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [scrolled, setScrolled] = useState<boolean>(false);
 
  /*************** For Up and down nav hide code ***********************/

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
     
    }

    setlastScrollY(currentScrollY);
  };

  const handlehamberg = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  /****************************************************************** */

  //scroll should be avoid if mobile view navbar is open

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);



  useEffect(() => {
    const homeNavScroll = () => {
      const offset = window.scrollY;
      if (offset > 120) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", homeNavScroll);
    return () => window.removeEventListener("scroll",homeNavScroll);
  }, []);



  //Navbar color change for specifice routes

  useEffect(() => {
    const activeUrl = ["/home"];

    if (!activeUrl.includes(pathname)) {
      setshowNavBg(false);
    } else {
      setshowNavBg(true);
    }
  }, [pathname]);

  const What_drives = [
    "Who we are",
    "Vision and Mission",
    "The Infravisionaries",
    "Collaborate with us",
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full transition-transform duration-300 p-3 z-[999] ${
          showNavbar ? "translate-y-0 " : "-translate-y-full "
           
        } ${showNavBg ? "bg-white border-b-1 border-lightgray/20 shadow-sm" : "bg-transparent"} 

          ${scrolled ? "bg-white shadow-md" : "bg-transparent"}

        `}
          
      >
        <div className="w-container">
          <div className="flex flex-row justify-between ">
            <div className="w-[10rem] md:w-[10rem] xl:w-[14rem] h-full">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Infravision Foundation Logo"
                  className="w-full h-full"
                ></Image>
              </Link>
            </div>
            <div className=" flex flex-row  gap-5">
              <div className="hidden  xl:flex flex-row gap-1 2xl:gap-5  items-center">
                <ul className="relative ">
                  <li
                    onClick={() => setopen((prev) => !prev)}
                    className="relative"
                  >
                    <TextNavAnchor
                      color="dark"
                      size="large"
                      className="block whitespace-nowrap px-3 py-1 md:py-2"
                      text="What Drives Us"
                      status={open}
                    />

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute  left-0 top-full mt-2 w-[300px] bg-white shadow-lg rounded-md z-50"
                        >
                          {What_drives.map((item, index) => (
                            <div
                              key={index}
                              className="border-b last:border-none border-gray-200 px-6 py-4 hover:bg-gray-50 flex justify-between items-center"
                            >
                              <h5 className="text-lg text-darkgray">{item}</h5>
                              <span>
                                <BorderGrayHeroBtn
                                  text=""
                                  role="link"
                                  borderColor="darkgray/40"
                                  color="black"
                                  bgColor="white"
                                  size="base"
                                />
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                      href="/publication"
                      target="_self"
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
                      href="/resource"
                      target="_self"
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
                      href="/contactUs"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center items-center  gap-4">
              <div className="border border-darkgray p-2 sm:block hidden  w-[10rem] rounded my-auto ">
                <div className="flex flex-row ">
                  <div className=" flex items-center">
                    <FaSearch className="text-darkgray block " />
                  </div>

                  <input
                    type="text"
                    placeholder="Search"
                    className="outline-none  pl-2 w-full "
                  />
                </div>
              </div>
              <div className="w-9 h-9 rounded-full  sm:hidden bg-pink flex items-center justify-center">
                <FaSearch className="text-white" />
              </div>
              <div className="block xl:hidden">
                <button onClick={handlehamberg}>
                  <RxHamburgerMenu className="text-lg cursor-pointer" />
                </button>
              </div>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.9 }}
                    className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-white p-4"
                  >
                    <Mobilenav onClose={() => setIsMenuOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
