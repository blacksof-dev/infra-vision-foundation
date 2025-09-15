import React from "react";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { Button } from "./button";
import Link from "next/link";

interface NavItemType {
  label: string;
  href: string;
}
const navItems: NavItemType[] = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Infrakatha",
    href: "/infrakatha",
  },
  {
    label: "Get Involved",
    href: "/get-involved",
  },
  {
    label: "Knowledge",
    href: "/knowledge",
  },
  {
    label: "Archive",
    href: "/archive",
  },
  {
    label: "Infrapandit Awards",
    href: "/infrapandit-awards",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Outreach and Engagements",
    href: "/outreach-and-engagements",
  },
  {
    label: "Infrashakti Awards",
    href: "/infrashakti-awards",
  },
];
export default function Sidebar() {
  return (
    <nav>
      <div className="flex flex-col gap-4  p-4 2xl:pt-8  h-screen">
        <div className="w-[7rem] md:w-[7rem] xl:w-[9rem] pl-3">
          <Image src={logo} alt="Infravision Foundation Logo" />
        </div>
        <div className="h-auto  flex flex-col gap-y-3 2xl:gap-y-6 mt-4 2x:mt-8 overflow-scroll">
          {navItems.map((tab: NavItemType, index: number) => {
            return (
              <Link
                key={index}
                className="w-full block  rounded-md px-4 py-2  hover:bg-gray/50 transition-all duration-300"
                href={tab.href}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
        <div className="w-full mt-auto  space-y-6">
          <Button
            text="Admin Panel"
            theme="pink"
            role="link"
            size="base"
            link="#"
            className="w-full py-2.5"
          />
          <Button
            text="Logout"
            theme="transparentGray"
            size="base"
            role="link"
            link="#"
            className="w-full py-2.5"
          />
        </div>
      </div>
    </nav>
  );
}
