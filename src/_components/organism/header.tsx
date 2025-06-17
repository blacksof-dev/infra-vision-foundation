"use client";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { TextNavAnchor } from "../atoms/links";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Mobilenav from "./mobileNav";
import { usePathname } from "next/navigation";
import { useHeader } from "@/context/useHeader";

interface NavItem {
  label: string;
  href: string;
  target?: "_blank" | "_self";
}
function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [open, setopen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showNavBg, setshowNavBg] = useState<boolean>(false);
  const [lastScrollY, setlastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const { setIsHeaderVisible: setShowNavbar, isHeaderVisible: showNavbar } =
    useHeader();

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset header visibility when pathname changes
  useEffect(() => {
    if (!mounted) return;
    setShowNavbar(true);
    setlastScrollY(window.scrollY);
  }, [pathname, setShowNavbar, mounted]);

  // Handle mobile detection and scroll events
  useEffect(() => {
    if (!mounted) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleResize = () => {
      checkMobile();
      if (window.innerWidth <= 768) {
        setShowNavbar(true); // Always show navbar on mobile
      }
    };

    const handleScroll = () => {
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
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

  //Navbar color change for specific routes
  useEffect(() => {
    if (!mounted) return;

    const activeUrl = [
      "/home",
      "/infrakatha",
      "/get-involved",
      "/knowledge",
      "/archive",
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
    { label: "Who we are", href: "/about-us#who-we-are" },
    { label: "The Infravisionaries", href: "/about-us#infravisionaries" },
    { label: "Vision and Mission", href: "/about-us#mission-and-vision" },
    { label: "Our pulse", href: "/about-us#our-pulse" },
    { label: "The project pathway", href: "/about-us#project-pathway" },
  ];

  const AdvocacyDropDown: NavItem[] = [
    { label: "InfraShakti Awards", href: "/infrashakti-awards" },
    { label: "Infrakatha", href: "/infrakatha" },
    { label: "InfraPandit Awards", href: "/infrapandit-awards" },
    { label: "Outreach and Engagement", href: "/outreach-and-engagements" },
  ];

  const KnowledgeDropDown: NavItem[] = [
    { label: "Research Papers", href: "/knowledge#research-papers" },
    {
      label: "Infravision Conversations",
      href: "/knowledge#infravision-conversations",
    },
    { label: "Blogs", href: "/knowledge#blogs" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full transition-all ease-linear duration-200 p-3 z-[9999] ${
          isMobile
            ? "translate-y-0"
            : showNavbar
            ? "translate-y-0"
            : "-translate-y-full"
        } ${
          showNavBg
            ? "bg-white border-b-1 border-lightgray/20 shadow-sm"
            : "bg-transparent"
        } ${scrolled ? "bg-white shadow-md" : ""}`}
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
              <div className="hidden  xl:flex flex-row gap-9 2xl:gap-15  items-center">
                
                  <div
                    className="relative  flex items-center gap-2"
                    onMouseEnter={() => setOpenDropdown("About us")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    
                    <span className="text-darkgray  text-lg cursor-pointer hover:text-pink hover:font-medium ">
                      About us
                    </span>
                    <AnimatePresence>
                      
                        {openDropdown === "About us" && (
                       
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute  left-0 top-full mt-2 w-72 bg-white shadow-lg rounded-lg z-50 px-2 py-2"
                          >
                            <div className="">
                              <ul className="">
                              {AboutUsDropDown.map((item, index) => (
                                <li
                                  key={index}
                                  className="text-darkgray group py-2 text-md hover:text-pink hover:font-medium"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-transparent rounded-full transition-all duration-200 group-hover:bg-pink"></span>
                                    <Link href={item.href} target={item.target}>
                                      {item.label}
                                    </Link>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            </div>
                            
                          </motion.div>
                          
                        )}
                     
                    </AnimatePresence>
                  </div>
              

                <div
                  className="relative "
                  onMouseEnter={() => setOpenDropdown("Advocacy")}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <span className="text-darkgray text-lg cursor-pointer hover:text-pink hover:font-medium">
                    Advocacy
                  </span>
                  <AnimatePresence>
                    {openDropdown === "Advocacy" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2  w-72 bg-white shadow-lg rounded-lg z-50 px-2 py-2"
                      >
                        <ul className="">
                          {AdvocacyDropDown.map((item, index) => (
                             <li
                              key={index}
                              className="text-darkgray group py-2 text-md hover:text-pink hover:font-medium"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-transparent rounded-full transition-all duration-200 group-hover:bg-pink"></span>
                                <Link href={item.href} target={item.target}>
                                  {item.label}
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className="relative flex flex-row gap-2"
                  onMouseEnter={() => setOpenDropdown("Knowledge")}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <span className="text-darkgray text-lg  cursor-pointer hover:text-pink hover:font-medium">
                    Knowledge
                  </span>

                  <AnimatePresence>
                    {openDropdown === "Knowledge" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-72 bg-white shadow-lg rounded-lg z-50 px-2 py-1"
                      >
                        <ul className="space-y-2 ">
                          {KnowledgeDropDown.map((item, index) => (
                            <li
                              key={index}
                              className="text-darkgray group py-2 text-md hover:text-pink hover:font-medium"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-transparent rounded-full transition-all duration-200 group-hover:bg-pink"></span>
                                <Link href={item.href} target={item.target}>
                                  {item.label}
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <ul>
                  <li>
                    <TextNavAnchor
                      color="dark"
                      size="large"
                      className="block whitespace-nowrap px-3 py-1 md:py-2"
                      text="Get Involved"
                      href="/get-involved"
                      showArrow={false}
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
                    transition={{ duration: 0.9, ease: "linear" }}
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

Header.displayName = "Header";

export default Header;
