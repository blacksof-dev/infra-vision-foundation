import Image from "next/image";
import logo from "@/../public/assets/globals/logo.svg";
import { TextNavAnchor } from "../atoms/links";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";


export default function Header() {
  return (
    <>
     <section className="absolute w-full z-[99999] top-3 left-0 xl:top-8">
  <div className="px-4 xl:px-16">
    <div className="flex flex-row  justify-between xl:justify-center xl:gap-10 items-center w-full">

      {/* Logo */}
      <div className="w-[10rem] 2xl:w-[14rem] h-[6rem]">
        <Image src={logo} alt="Infra Vision Foundation" />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden xl:flex flex-row 2xl:gap-6 3xl:gap-8 items-center">
        <ul>
          <li>
            <TextNavAnchor
              color="dark"
              size="large"
              className="block whitespace-nowrap ps-5 py-1 md:py-2"
              href="/what-drives-us"
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
              className="block whitespace-nowrap ps-5 py-1 md:py-2"
              href="/our-initiatives"
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
              className="block whitespace-nowrap ps-5 py-1 md:py-2"
              href="/publications"
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
              className="block whitespace-nowrap ps-5 py-1 md:py-2"
              href="/resources"
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
              className="block whitespace-nowrap ps-5 py-1 md:py-2"
              href="/events"
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
              className="block whitespace-nowrap ps-5 py-1 md:py-2"
              href="/contact-us"
              text="Contact Us"
              iconVisiblity={false}
            />
          </li>
        </ul>

        {/* Search Box */}
        <div className="hidden 2xl:block border border-darkgray w-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-[15%] rounded-md">
          <form className="p-2">
            <div className="flex items-center gap-3">
              <FaSearch className="text-darkgray" />
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none bg-transparent text-sm placeholder:text-gray-500"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="xl:hidden">
       <GiHamburgerMenu className="text-3xl mb-10"/>
      </div>

    </div>
  </div>
</section>

    </>
  );
}
