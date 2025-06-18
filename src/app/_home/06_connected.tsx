
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import TwitterPost from "./twittersection";

export default function StayConnected() {
  return (
    <section className=" ">
      <div className="blade-top-padding-lg blade-bottom-padding-lg">
        <div className="w-container flex flex-col lg:flex-row gap-7 sm:gap-6 lg:gap-20">
          <div className="w-full lg:w-[50%] xl:w-[40%] ">
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-black">Social media</h5>
            </div>
            <div className=" pt-4 pb-2 sm:py-4">
              <h1 className="font-light text-black">
                Stay connected to {" "}
                <span className="font-medium text-black">
                  The Infravision Foundation
                </span>
              </h1>
            </div>

            <h6 className="text-black ">
              Be part of India's infrastructure transformation. Join our community of infrastructure experts, featuring exclusive conversations, in-depth analysis and research, and more.
            </h6>
            <div className=" py-2 sm:py-4 hidden lg:block ">
              <h6 className="text-pink font-medium py-2">Follow us on</h6>
              <div className="flex flex-row gap-5 py-2 ">
                <Link
                  href="https://www.youtube.com/@theinfravisionfoundation"
                  target="_blank"
                  className="group"
                >
                  <FaYoutube className="text-4xl border-1  group-hover:bg-pink rounded-sm border-darkgray p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
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
          <div className="w-full lg:w-[50%] xl:w-[60%]  ">
            <TwitterPost />
          </div>
          <div className=" py-2 sm:py-4 block lg:hidden">
            <h6 className="text-pink font-medium">Follow us on</h6>
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
    </section>
  );
};


