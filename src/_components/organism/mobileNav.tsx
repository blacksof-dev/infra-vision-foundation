"use client";
import { RxCross1 } from "react-icons/rx";
import { TextMobileNavAnchor} from "../atoms/links";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
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
          <div className=" w-screen h-screen bg-white ">
            <div className="flex flex-row justify-between  items-center">
              <div className="w-[12rem] sm:w-[10rem] h-[5rem] sm:h-[9rem]  px-3">
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
                  />
                </li>
              </ul>
            </div>
          
          </div>
        )}
      </section>
    </>
  );
}





// useEffect(() => {
//   const activeUrl = ["/publication"];
//   const currentPath = window.location.pathname;

//   if (activeUrl.includes(currentPath)) {
//     setshowNavBg(true);
//   }
//   else {
//     setshowNavBg(false)
//   }
// },  []);
// const [showNavBg,setshowNavBg] =useState<boolean>(false)
// ${showNavBg?"bg-white":"bg-transparent"}