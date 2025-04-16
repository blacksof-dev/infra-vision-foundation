import Image from "next/image";
import logo from "@/../public/assets/globals/logo.svg";
import { Anchor, TextAnchor } from "../atoms/links";
import { HeroBtn } from "../atoms/buttons";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import locationSvg from '@/../public/assets/globals/locationSvg.svg'


import Link from "next/link";
const footer = () => {
  return (
    <>
      <footer className=" blade-top-padding-lg  ">
        <div className=" w-container">
          <div className=" flex md:flex-row flex-col md:justify-between md:items-end border-b-1 border-gray/60  md:pb-6">
            <div className="">
              <Anchor href="/">
                <Image
                  src={logo}
                  className="w-[50%] h-[30%] md:h-full md:w-[70%] "
                  alt="TIF logo"
                  title=" logo"
                />
              </Anchor>
            </div>
            <div className="py-5 lg:py-0 ">
              <HeroBtn
                text="Contact us"
                role="link"
                borderColor="pink"
                color="black"
                bgColor="white"
                size="extralarge"
                aarowColor="pink"  
                classes="font-medium"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col pt-5 lg:pt-0 lg:gap-8  border-b-1 border-gray/60 ">
            <div className="grid grid-cols-1  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-14  lg:pt-9 lg:pb-14 xl:pb-8 2xl:pb-32">
              <ul>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black text-xl">What drives us</span>
                </li>

                <li className="md:pt-2 xl:pt-4">
                  <ul>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/who-we-are"
                        text="Who we are"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/vision-mission"
                        text="Vision and Mission"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/the-infravisionaries"
                        text="The Infravisionaries"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/collaborate-with-us"
                        text="Collaborate with us"
                      />
                    </li>
                  </ul>
                </li>
              </ul>

              <ul>
                <li className="flex items-center gap-3 ">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black text-xl">Our initiatives</span>
                </li>

                <li className="md:pt-2 xl:pt-4">
                  <ul>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/infraShakti-awards"
                        text="InfraShakti Awards"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/infraKatha"
                        text="InfraKatha"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/caira"
                        text="CAIRA"
                      />
                    </li>
                  </ul>
                </li>
              </ul>

              <ul>
                <li className="flex items-center gap-3 ">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black text-xl">Resources</span>
                </li>

                <li className="md:pt-2 xl:pt-4">
                  <ul>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/blogs"
                        text="Blogs"
                      />
                    </li>

                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/who-we-are"
                        text="Who we are"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/news-and-media"
                        text="News and media"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/videos"
                        text="Videos"
                      />
                    </li>
                  </ul>
                </li>
              </ul>

              <ul>
                <li className="flex items-center gap-3 ">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black text-xl">Publications</span>
                </li>

                <li className="md:pt-2 xl:pt-4">
                  <ul>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/research-papers"
                        text="Research papers"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/white-papers"
                        text="White papers"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/background-papers"
                        text="Background papers"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        // href="/newsletters"
                        text="Newsletters"
                      />
                    </li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li className="flex items-center gap-3 ">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black text-xl">Events</span>
                </li>
                <li className="md:pt-2 xl:pt-4">
                  <ul>
                  <li>
                  <TextAnchor
                    color="dark"
                    size="base"
                    className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                    // href="/upcoming-events"
                    text="Upcoming events"
                  />
                </li>
                <li>
                  <TextAnchor
                    color="dark"
                    size="base"
                    className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                    // href="/past-events"
                    text="Past events"
                  />
                </li>
                  </ul>
                </li>
                
              </ul>
            </div>
            <div className="">
              <div className=" h-full   pt-4 lg:py-9  lg:border-l-1 lg:border-lightgray/20 lg:ps-4 xl:ps-10">
                <div className="">
                  <div className="flex flex-row gap-1  items-center">
                    <Image src={locationSvg} alt="Location Icon" />
                    {/* <CiLocationOn className="text-[#9EA2A4] text-xl" /> */}
                    <h5 className="text-darkgray/60 2xl:text-lg">Address</h5>
                  </div>

                  <h6 className="text-base text-darkgray ps-1 py-2 lg:py-1">
                    E 2261, Palam Vihar, Gurugram -{" "}
                    <br className="lg:block hidde" /> 122017, Haryana, Delhi
                    NCR, India.
                  </h6>
                </div>

                <div className="py-3 lg:py-4">
                  <div className="flex flex-row gap-1  items-center">
                    <MdOutlineEmail className="text-[#9EA2A4] text-xl" />
                    <h5 className="text-darkgray/60 2xl:text-lg py-1">Email</h5>
                  </div>

                  <h6 className="text-darkgray ps-1 py-2 lg:py-1 text-base">
                    info@theinfravisionfoundation.org
                  </h6>
                </div>

                <div className=" pb-2">
                  <div className="flex flex-row gap-1  ditems-center">
                    <MdOutlinePhone className="text-[#9EA2A4] text-xl" />
                    <h5 className="text-darkgray/60 2xl:text-lg">Phone</h5>
                  </div>

                  <h6 className="text-darkgray ps-1 py-1 ">+91 98107 50745</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row  flex-col justify-between py-5 lg:pt-9">
            <div>
              <p className="text-darkgray/80 text-start  smallText">
                Copyright 2025. All rights reserved.
              </p>
            </div>
            <div className="flex flex-row gap-5   justify-start sm:justify-center sm:items-center pt-4 sm:pt-0">
              <h5 className="text-darkgray/60 mr-5 sm:block hidden  ">
                Follow us
              </h5>
              <div className="flex flex-row gap-5 py-2 ">
                <Link
                  href="https://www.youtube.com/@theinfravisionfoundation"
                  target="_blank"
                   className="group"
                >
                  <FaYoutube className="text-4xl border-1   group-hover:bg-pink rounded-sm border-darkgray p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/the-infravision-foundation/?originalSubdomain=in"
                  target="_blank"
                   className="group"
                >
                  <FaLinkedin className="text-4xl border-1 group-hover:bg-pink rounded-sm border-darkgray p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
                </Link>
                <Link
                  href="https://x.com/TheInfravision?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                  target="_blank"
                   className="group"
                >
                  <FaXTwitter className="text-4xl border-1 group-hover:bg-pink rounded-sm border-darkgray p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
                </Link>
                <Link
                  href="https://www.instagram.com/theinfravisionfoundation/"
                  target="_blank"
                   className="group"
                >
                  <FaInstagram className="text-4xl border-1 group-hover:bg-pink rounded-sm border-darkgray p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;
