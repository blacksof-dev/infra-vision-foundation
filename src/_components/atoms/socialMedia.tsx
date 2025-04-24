import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function SocialMedia(){
    return(
        <>
         <div className="flex flex-row gap-5 py-2 ">
                <Link
                  href="https://www.youtube.com/@theinfravisionfoundation"
                  target="_blank"
                  className="group"
                >
                  <FaYoutube className="text-4xl border-1 active:bg-pink active:border-transparent active:text-white  group-hover:bg-pink rounded-sm border-darkgray/50  p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/the-infravision-foundation/?originalSubdomain=in"
                  target="_blank"
                  className="group"
                >
                  <FaLinkedin className="text-4xl border-1 active:bg-pink active:border-transparent active:text-white group-hover:bg-pink rounded-sm border-darkgray/50 p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
                </Link>
                <Link
                  href="https://x.com/TheInfravision?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                  target="_blank"
                  className="group"
                >
                  <FaXTwitter className="text-4xl border-1 active:bg-pink active:border-transparent active:text-white group-hover:bg-pink rounded-sm border-darkgray/50 p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
                </Link>
                <Link
                  href="https://www.instagram.com/theinfravisionfoundation/"
                  target="_blank"
                  className="group"
                >
                  <FaInstagram className="text-4xl border-1 group-hover:bg-pink active:bg-pink active:border-transparent active:text-white rounded-sm border-darkgray/50 p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
                </Link>
              </div>
        </>
    )
}