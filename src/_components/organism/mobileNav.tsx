"use client";
import { RxCross1 } from "react-icons/rx";
import { TextMobileNavAnchor} from "../atoms/links";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.svg";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function Mobilenav() {
  const [crossicon, setcrossicon] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const handleClick = () => {
    setcrossicon(false);
  };

  const handleClickli = (sectionName: string) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (crossicon) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    }
  }, [crossicon]);

  return (
    <>
      <section>
        {crossicon && (
          <div className=" w-screen h-screen bg-[#E9F8FF]  ">
            <div className="flex flex-row justify-between  items-center">
              <div className="w-[12rem] sm:w-[15rem] h-[5rem] sm:h-[7rem]  px-3">
                <Image
                  src={logo}
                  alt="Infravision Foundation Logo"
                  className=""
                />
              </div>
              <div className=" ">
                <button onClick={handleClick}>
                  <RxCross1 className="text-3xl" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <ul>
                <li onClick={() => handleClickli("What Drives Us")}>
                  <TextMobileNavAnchor
                    color="dark"
                    size="xxl"
                    className="block whitespace-nowrap py-4"
                    text="What Drives Us"
                    iconVisiblity={true}
                  />
                </li>
                {openSection === "What Drives Us" && (
                  <div className="w-[45rem] h-[13rem] ">
                    <ul>
                      <li>
                        <p className="text-darkgray py-3">Who we are</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">Vision and Mission</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">
                          The Infravisionaries
                        </p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">
                          Collaborate with us
                        </p>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
              <ul>
                <li onClick={() => handleClickli("Our Initiatives")}>
                  <TextMobileNavAnchor
                    color="dark"
                    size="xxl"
                    className="block whitespace-nowrap  py-4"
                    text="Our Initiatives"
                    iconVisiblity={true}
                  />
                </li>
                {openSection === "Our Initiatives" && (
                  <div className="w-[45rem] h-[11rem]  ">
                    <ul>
                      <li>
                        <p className="text-darkgray py-3">InfraShakti Awards</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">InfraKatha</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">CAIRA</p>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
              <ul>
                <li onClick={() => handleClickli("Publications")}>
                  <TextMobileNavAnchor
                    color="dark"
                    size="xxl"
                    className="block whitespace-nowrap  py-4"
                    text="Publications"
                    iconVisiblity={true}
                  />
                </li>

                {openSection === "Publications" && (
                  <div className="w-[45rem] h-[10rem] ">
                    <ul>
                      <li>
                        <p className="text-darkgray py-3">Blogs</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">News & media</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">Videos</p>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
              <ul>
                <li onClick={() => handleClickli("Resources")}>
                  <TextMobileNavAnchor
                    color="dark"
                    size="xxl"
                    className="block whitespace-nowrap  py-4"
                    text="Resources"
                    iconVisiblity={true}
                  />
                </li>
                {openSection === "Resources" && (
                  <div className="w-[45rem] h-[10rem]  ">
                    <ul>
                      <li>
                        <p className="text-darkgray py-3">Research papers</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">Background papers</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">Newsletters</p>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
              <ul>
                <li onClick={() => handleClickli("Events")}>
                  <TextMobileNavAnchor
                    color="dark"
                    size="xxl"
                    className="block whitespace-nowrap  py-4"
                    text="Events"
                    iconVisiblity={true}
                  />
                </li>
                {openSection === "Events" && (
                  <div className="w-[45rem] h-[7rem]  ">
                    <ul>
                      <li>
                        <p className="text-darkgray py-3">Upcoming events</p>
                      </li>
                      <li>
                        <p className="text-darkgray py-3">Past events</p>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
              <ul>
                <li>
                  <TextMobileNavAnchor
                    color="dark"
                    size="xxl"
                    className="block whitespace-nowrap  py-4"
                    text="Contact Us"
                    iconVisiblity={false}
                  />
                </li>
              </ul>
            </div>
            <div className="mx-3 mt-8 border border-darkgray  rounded-md">
              <form className="p-2">
                <div className="flex items-center gap-3">
                  <button>
                    <FaSearch className="text-darkgray" />
                  </button>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full outline-none bg-transparent text-sm placeholder:text-gray-500"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
