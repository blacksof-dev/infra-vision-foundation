"use client";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { IoSearch } from "react-icons/io5";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Mobilenav from "./mobileNav";
import { usePathname } from "next/navigation";
import { useHeader } from "@/context/useHeader";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

import gsap from "gsap";
import SearchContent from "@/app/search/searchContent";
import path from "path";

interface NavItem {
  label: string;
  href: string;
  target?: "_blank" | "_self";
}
function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showNavBg, setshowNavBg] = useState<boolean>(false);
  const [lastScrollY, setlastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [toggle, settoggle] = useState<boolean>(false);
  const [searchSidebar, setSearchSIdebar] = useState<boolean>(false);
  const { setIsHeaderVisible: setShowNavbar, isHeaderVisible: showNavbar } =
    useHeader();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    gsap.from("#searchFunctioanlity", {
      opacity: 0,
      y: -20,
    });

    return () => {
      gsap.from("#navbar", {
        opacity: 0,
        y: 20,
      });
    };
  }, [toggle]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowNavbar(true);
      setlastScrollY(window.scrollY);
    }
  }, [pathname, setShowNavbar]);

  useEffect(() => {
 
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleResize = () => {
      if (!mounted) return;
      checkMobile();
      if (window.innerWidth <= 768) {
        setShowNavbar(true);
      }
    };

    const handleScroll = () => {
      if (!mounted) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMobile) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setlastScrollY(currentScrollY);

      // Handle scrolled state
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", handleResize);

    window.addEventListener("scroll", handleScroll);
  
    return () => {
      if (!mounted) return;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
  
  }
  
  }, [lastScrollY, isMobile, mounted, setShowNavbar]);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (!mounted) return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen, mounted]);

  useEffect(() => {
  if (!mounted) return;

  const handleScroll = () => {
    setOpenDropdown(null);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [mounted]);


  //Navbar color change for specific routes
  useEffect(() => {
    if (!mounted) return;

    const activeUrl = [
      "/home",
      "/infrakatha",
      "/get-involved",
      "/knowledge",
      "/archive",
      "/infrapandit-awards",
      "/about-us",
      "/outreach-and-engagements",
      "/infrashakti-awards",
    ];

    setshowNavBg(activeUrl.includes(pathname));
  }, [pathname, mounted]);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const handlehamberg = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const AboutUsDropDown: NavItem[] = [
    { label: "Who We Are", href: "/about-us#who-we-are" },
    { label: "The Infravisionaries", href: "/about-us#infravisionaries" },
    { label: "Vision and Mission", href: "/about-us#mission-and-vision" },
    { label: "Our Foundational Pillars", href: "/about-us#our-pulse" },
    { label: "The Project Pathway", href: "/about-us#project-pathway" },
  ];

  const AdvocacyDropDown: NavItem[] = [
    { label: "InfraShakti Awards", href: "/infrashakti-awards" },
    { label: "Infrakatha", href: "/infrakatha" },
    { label: "InfraPandit Awards", href: "/infrapandit-awards" },
    { label: "Outreach and Engagements", href: "/outreach-and-engagements" },
  ];

  const KnowledgeDropDown: NavItem[] = [
    { label: "Research Papers", href: "/knowledge#research-papers" },
    {
      label: "The Infravision Conversation",
      href: "/knowledge#infravision-conversations",
    },
    { label: "Blogs", href: "/knowledge#blogs" },
  ];

  const Archives: NavItem[] = [
    { label: "Newsletters", href: "/archive#newsletters" },
    { label: "In the News", href: "/archive#newsandMedia" },
    { label: "Gallery", href: "/archive#gallery" },
    { label: "Videos", href: "/archive#videos" },
  ];

  return (
    <>
      <nav
        className={`fixed  top-0 left-0 w-full transition-all ease-linear duration-200 px-0 sm:px-3 py-3 z-[9999] ${isMobile
            ? "translate-y-0"
            : showNavbar
              ? "translate-y-0"
              : "-translate-y-full"
          } ${showNavBg ? "bg-white " : "bg-transparent"} ${scrolled ? "bg-white" : ""
          }`}
      >
        <div className="w-container">
          <div className="flex flex-row justify-between">
            <div className="w-[10rem] md:w-[10rem] xl:w-[14rem] h-full">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Infravision Foundation Logo"
                  className="w-full h-full"
                ></Image>
              </Link>
            </div>
            <div className=" flex w-full flex-row items-center justify-center  gap-5">
              {toggle ? (
                <div
                  id="searchFunctioanlity"
                  className="w-full h-full  relative"
                >
                  <div className="absolute top-1 xl:top-3 left-0 right-0 z-[999]">
                    <SearchContent />
                  </div>
                </div>
              ) : (
                <div
                  id="navbar"
                  className={`hidden  xl:flex flex-row gap-9 2xl:gap-15  items-center`}
                >
                  <div
                    className="relative flex items-center gap-2"
                    onMouseEnter={() => setOpenDropdown("About us")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link href="/about-us">
                      <button className="text-darkgray flex justify-center items-center gap-2 text-lg cursor-pointer hover:text-pink">
                        About Us
                        {openDropdown === "About us" ? (
                          <GoChevronUp />
                        ) : (
                          <GoChevronDown />
                        )}
                      </button>
                    </Link>

                    <AnimatePresence>
                      {openDropdown === "About us" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-2 w-96 h-auto bg-white shadow-lg rounded-lg z-50 px-4 py-2"
                        >
                          <ul>
                            {AboutUsDropDown.map((item, index) => (
                              <li
                                key={index}
                                className="text-darkgray group py-5 text-lg last:border-0 border-b border-darkgray/20 hover:text-pink"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <Link href={item.href} target={item.target}>
                                  <div className="flex justify-between items-center gap-2">
                                    {item.label}
                                    <button className="w-8 h-8 cursor-pointer border-1 group-hover:bg-pink group-hover:border-pink border-darkgray/40 rounded-full">
                                      <GoArrowRight className="mx-auto group-hover:text-white" />
                                    </button>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Advocacy */}
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown("Advocacy")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="text-darkgray flex justify-center items-center gap-2 text-lg cursor-pointer hover:text-pink">
                      Advocacy
                      {openDropdown === "Advocacy" ? (
                        <GoChevronUp />
                      ) : (
                        <GoChevronDown />
                      )}
                    </button>

                    <AnimatePresence>
                      {openDropdown === "Advocacy" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-2 w-96 h-auto bg-white shadow-lg rounded-lg z-50 px-4 py-2"
                        >
                          <ul>
                            {AdvocacyDropDown.map((item, index) => (
                              <li
                                key={index}
                                onClick={() => setOpenDropdown(null)}
                                className="text-darkgray group py-5 text-lg last:border-0 border-b border-darkgray/20 hover:text-pink"
                              >
                                <Link href={item.href} target={item.target}>
                                  <div className="flex justify-between items-center gap-2">
                                    {item.label}
                                    <button className="w-8 h-8 border-1 cursor-pointer group-hover:bg-pink group-hover:border-pink border-darkgray/40 rounded-full">
                                      <GoArrowRight className="mx-auto group-hover:text-white" />
                                    </button>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Knowledge */}
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown("Knowledge")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link href="/knowledge">
                      <button className="text-darkgray text-lg flex justify-center items-center gap-2 cursor-pointer hover:text-pink">
                        Knowledge
                        {openDropdown === "Knowledge" ? (
                          <GoChevronUp />
                        ) : (
                          <GoChevronDown />
                        )}
                      </button>
                    </Link>

                    <AnimatePresence>
                      {openDropdown === "Knowledge" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-2 w-96 h-auto bg-white shadow-lg rounded-lg z-50 px-4 py-2"
                        >
                          <ul>
                            {KnowledgeDropDown.map((item, index) => (
                              <li
                                key={index}
                                onClick={() => setOpenDropdown(null)}
                                className="text-darkgray group py-5 text-lg last:border-0 border-b border-darkgray/20 hover:text-pink"
                              >
                                <Link href={item.href} target={item.target}>
                                  <div className="flex justify-between items-center gap-2">
                                    {item.label}
                                    <button className="w-8 h-8 border-1 cursor-pointer group-hover:bg-pink group-hover:border-pink border-darkgray/40 rounded-full">
                                      <GoArrowRight className="mx-auto group-hover:text-white" />
                                    </button>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Archives */}
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown("Archives")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link href="/archive">
                      <button className="text-darkgray flex justify-center items-center gap-2 text-lg cursor-pointer hover:text-pink">
                        Archives
                        {openDropdown === "Archives" ? (
                          <GoChevronUp />
                        ) : (
                          <GoChevronDown />
                        )}
                      </button>
                    </Link>

                    <AnimatePresence>
                      {openDropdown === "Archives" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-2 w-96 h-auto bg-white shadow-lg rounded-lg z-50 px-4 py-2"
                        >
                          <ul>
                            {Archives.map((item, index) => (
                              <li
                                key={index}
                                onClick={() => setOpenDropdown(null)}
                                className="text-darkgray group py-5 text-lg last:border-0 border-b border-darkgray/20 hover:text-pink"
                              >
                                <Link href={item.href} target={item.target}>
                                  <div className="flex justify-between items-center gap-2">
                                    {item.label}
                                    <button className="w-8 h-8 border-1 cursor-pointer group-hover:bg-pink group-hover:border-pink border-darkgray/40 rounded-full">
                                      <GoArrowRight className="mx-auto group-hover:text-white" />
                                    </button>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <ul>
                    <li className="text-darkgray text-lg hover:text-pink ">
                      <Link href="/get-involved">Get Involved</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex   justify-center items-center gap-4">
              <div className="md:block hidden">
                <div className="flex  justify-center  items-center gap-4">
                  <button
                    onClick={() => settoggle((prev) => !prev)}
                    className={`rounded-sm p-1 cursor-pointer relative md:p-2 border-2 border-pink overflow-hidden   w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300  `}
                  >
                    <span className="absolute w-4 h-4 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-transparent group-hover:bg-pink  z-[1] transition-all duration-500"></span>

                    {toggle ? (
                      <RxCross2 className={` text-pink text-2xl`} />
                    ) : (
                      <IoSearch className={` text-pink text-2xl`} />
                    )}
                  </button>
                  <h5
                    onClick={() => settoggle((prev) => !prev)}
                    className="cursor-pointer w-[4.5rem] text-darkgray text-lg"
                  >{`${toggle ? "Close" : "Search"}`}</h5>
                </div>
              </div>

              <div className="flex flex-row gap-4  ">
                <div className="md:hidden block">
                  <button
                    onClick={() => setSearchSIdebar(true)}
                    className="w-8 h-8  bg-pink ring-0 ring-pink rounded-full flex items-center justify-center"
                  >
                    <IoSearch className="text-white " />
                  </button>
                </div>
                <div className="xl:hidden block">
                  <button onClick={handlehamberg}>
                    <RxHamburgerMenu className="text-3xl  cursor-pointer" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.4, ease: "linear" }}
                    className="fixed top-0  left-0 w-screen h-screen z-[9999] bg-white px-3 py-3"
                  >
                    <Mobilenav onClose={() => setIsMenuOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {searchSidebar && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.4, ease: "linear" }}
                    className="fixed top-0  left-0 w-screen h-screen z-[9999] bg-white px-3 py-3"
                  >
                    <div className="">
                      <div className="absolute top-4 right-3 md:hidden block z-10">
                        <button onClick={() => setSearchSIdebar(false)}>
                          <RxCross2 className="text-2xl text-black cursor-pointer" />
                        </button>
                      </div>
                      <div className="blade-top-padding-xl">
                        <SearchContent />
                      </div>
                    </div>
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

Header.displayName = "Header";

export default Header;
