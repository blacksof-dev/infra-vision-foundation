"use client";
import React from "react";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { Button } from "./button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface NavItemType {
  label: string;
  href: string;
}

const navItems: NavItemType[] = [
  { label: "Home", href: "/admin/home" },
  { label: "Knowledge", href: "/admin/knowledge" },
  { label: "Archive", href: "/admin/archive" },
  { label: "About Us", href: "/admin/about-us" },
  { label: "Infrakatha", href: "/admin/infrakatha" },
  { label: "Infrashakti Awards", href: "/admin/infrashakti-awards" },
  { label: "Infrapandit Awards", href: "/admin/infrapandit-awards" },
  { label: "Gallery", href: "/admin/gallery" },
  {
    label: "Outreach & Engagements",
    href: "/admin/outreach-and-engagements",
  },
  {label:"Entry Popup",href:"/admin/entry-popup"},
  { label: "Get Involved", href: "/admin/get-involved" },
  { label: "Newsletters", href: "/admin/newsletter" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav>
      <div className="flex flex-col gap-4 p-4 2xl:pt-8 h-screen border-r border-gray/30">
        {/* Logo */}
        <Link href="/">
          <div className="w-[7rem] md:w-[7rem] xl:w-[9rem] pl-3">
            <Image src={logo} alt="Infravision Foundation Logo" />
          </div>
        </Link>

        {/* Nav Links */}
        <div className="h-auto flex flex-col gap-y-3 2xl:gap-y-6 mt-4 2x:mt-8 overflow-y-auto pr-2">
          {navItems.map((tab, index) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={index}
                href={tab.href}
                className={`w-full block rounded-md px-4 py-2 transition-all duration-300 
                  ${isActive ? "bg-gray  font-medium" : "hover:bg-gray/50"}`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Bottom Buttons */}
        <div className="w-full mt-auto space-y-6">
          <Button
            text="Admin Panel"
            theme="pink"
            role="link"
            size="base"
            link="/admin/admin-list"
            className="w-full py-2.5"
          />
          <Button
            text="Logout"
            theme="transparentGray"
            size="base"
            role="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full py-2.5"
          />
        </div>
      </div>
    </nav>
  );
}
