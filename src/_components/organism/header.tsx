"use client";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Mobilenav from "./mobileNav";
import { usePathname } from "next/navigation";
import { useHeader } from "@/context/useHeader";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

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

  const Archives: NavItem[] = [
    { label: "Newsletters", href: "/archive#newsletters" },
    { label: "In the News", href: "/archive#news-and-media" },
    { label: "Gallery", href: "/archive#gallery" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full transition-all ease-linear duration-200 px-0 sm:px-3 py-3 z-[9999] ${
          isMobile
            ? "translate-y-0"
            : showNavbar
            ? "translate-y-0"
            : "-translate-y-full"
        } ${showNavBg ? "bg-white " : "bg-transparent"} ${
          scrolled ? "bg-white" : ""
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
            <div className=" flex flex-row  gap-5">
              <div className="hidden  xl:flex flex-row gap-9 2xl:gap-15  items-center">
                <div
                  className="relative flex items-center gap-2"
                  onMouseEnter={() => setOpenDropdown("About us")}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="text-darkgray flex justify-center items-center gap-2 text-lg cursor-pointer hover:text-pink">
                    About us
                    {openDropdown === "About us" ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </button>

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
                              className="text-darkgray group py-5 text-xl last:border-0 border-b border-darkgray/20 hover:text-pink"
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
                  <span className="text-darkgray flex justify-center items-center gap-2 text-lg cursor-pointer hover:text-pink">
                    Advocacy
                    {openDropdown === "Advocacy" ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </span>

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
                              className="text-darkgray group py-5 text-xl last:border-0 border-b border-darkgray/20 hover:text-pink"
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
                  <span className="text-darkgray text-lg flex justify-center items-center gap-2 cursor-pointer hover:text-pink">
                    Knowledge
                    {openDropdown === "Knowledge" ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </span>

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
                              className="text-darkgray group py-5 text-xl last:border-0 border-b border-darkgray/20 hover:text-pink"
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
                  <span className="text-darkgray flex justify-center items-center gap-2 text-lg cursor-pointer hover:text-pink">
                    Archives
                    {openDropdown === "Archives" ? (
                      <GoChevronUp />
                    ) : (
                      <GoChevronDown />
                    )}
                  </span>

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
                              className="text-darkgray group py-5 text-xl last:border-0 border-b border-darkgray/20 hover:text-pink"
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
            </div>

            <div className="flex justify-center items-center  gap-4">
              {/* <div className="border border-darkgray p-2 sm:block hidden  w-[10rem] rounded my-auto ">
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
              </div> */}
              {/* <div className="w-9 h-9 rounded-full  sm:hidden bg-pink flex items-center justify-center">
                <FaSearch className="text-white" />
              </div> */}
              <div className="block xl:hidden">
                <button onClick={handlehamberg}>
                  <RxHamburgerMenu className="text-3xl cursor-pointer" />
                </button>
              </div>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.4, ease: "linear" }}
                    className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-white px-3 py-3"
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
