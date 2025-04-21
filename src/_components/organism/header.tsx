
"use client";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { TextNavAnchor } from "../atoms/links";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Mobilenav from "./mobileNav";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { NavgHeroBtn } from "../atoms/buttons";

export default function Header() {
  const [open, setopen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const WhatDrivesUs = [
    "Who we are",
    "Vision and Mission",
    "The Infravisionaries",
    "Collaborate with us",
  ];

  const handlehamberg=()=>{
    setIsMenuOpen(prev => !prev); 
  }
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
  
  }, [isMenuOpen]);

  return (
    <section className="pt-5 absolute z-[999]">
      <div className=" w-container ">
        <div className="flex flex-row justify-center items-center gap-[8 rem] sm:gap-[20rem] md:gap-[25rem] lg:gap-[35rem] xl:gap-9 w-full">
          {/* Logo */}
          <div className="w-[12rem]  xl:w-[17rem]">
            <Link href="/">
              <Image
                src={logo}
                quality={100}
                alt="Infra Vision Foundation"
                className="w-full h-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden  xl:flex flex-row  gap-4 items-center">
            <ul className="relative">
              {" "}
              {/* Make sure ul is relative for absolute dropdown */}
              <li onClick={() => setopen((prev) => !prev)}>
                <TextNavAnchor
                  color="dark"
                  size="large"
                  className="block whitespace-nowrap px-3 py-1 md:py-2"
                  text="What Drives Us"
                  status={open}
                />
              </li>
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="dropdown" // Important for AnimatePresence
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute z-50 w-[19rem] bg-white rounded-md shadow-xl mt-2"
                  >
                    <ul>
                      {WhatDrivesUs.map((data, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center group cursor-pointer hover:opacity-80 p-6 border-b border-darkgray/60 transition"
                        >
                          <span className="text-sm text-darkgray">{data}</span>
                          <NavgHeroBtn
                            text=""
                            role="link"
                            borderColor="pink"
                            color="pink"
                            bgColor="white"
                            size="extralarge"
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </ul>

            <ul>
              <li>
                <TextNavAnchor
                  color="dark"
                  size="large"
                  className="block whitespace-nowrap px-3 py-1 md:py-2"
                  text="Our Initiatives"
                  //  status={true}
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
                  //  status={true}
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
                  //  status={true}
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
                  //  status={true}
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
                  //  status={false}
                />
              </li>
            </ul>
          </div>

        <div className="flex flex-row gap-4  justify-center items-center">
            <div className=" hidden w-[10%] xl:w-[14%] min-w-[160px] border border-darkgray rounded-[2px] p-2 sm:flex flex-row gap-2 items-center">
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
               <button onClick={handlehamberg}><RxHamburgerMenu className="text-lg"/></button>
            </div>
        </div>

         
        </div>
        {/* <div>
           <Mobilenav/>
        </div> */}
      </div>
    </section>
  );
}
