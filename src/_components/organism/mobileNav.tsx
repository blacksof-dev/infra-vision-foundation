"use client";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { RxCross1 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion";

export default function Mobilenav({ onClose }: { onClose: () => void }) {
  return (
    <div className="">
      {/* Top Bar */}
      <div className="flex justify-between border-b pb-3 border-b-gray">
        <div className="w-[9rem] sm:w-[13rem] ">
          <Image src={logo} alt="Infravision Foundation Logo" />
        </div>
        <div className="h-fit mt-3">
          <button onClick={onClose}>
            <RxCross1 className="text-2xl cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="pt-4 sm:pt-12 flex flex-col justify-center">
        <Accordion type="single" collapsible className="w-full">
          {/* About Us Dropdown */}
          <AccordionItem value="about">
            <AccordionTrigger className="py-4 text-lg text-left text-darkgray">

              About us

            </AccordionTrigger>
            <AccordionContent>
              <ul onClick={onClose} className="space-y-3 text-base">
                <li>
                  <Link
                    href="/about-us#who-we-are"
                    className="text-darkgray font-poppins"
                  >
                    Who we are
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us#infravisionaries"
                    className="text-darkgray font-poppins"
                  >
                    The Infravisionaries
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us#mission-and-vision"
                    className="text-darkgray font-poppins"
                  >
                    Vision and Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us#our-pulse"
                    className="text-darkgray font-poppins"
                  >
                    Our pulse
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us#project-pathway"
                    className="text-darkgray font-poppins"
                  >
                    The Project Pathway
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Advocacy */}
          <AccordionItem value="advocacy">
            <AccordionTrigger className="py-4 text-lg text-left text-darkgray">
              Advocacy
            </AccordionTrigger>
            <AccordionContent className="">
              <ul onClick={onClose} className="space-y-3 text-base ">
                <li>
                  <Link
                    href="/infrashakti-awards"
                    className="text-darkgray font-poppins "
                  >
                    InfraShakti Awards
                  </Link>
                </li>
                <li>
                  <Link
                    href="/infrakatha"
                    className="text-darkgray font-poppins "
                  >
                    InfraKatha
                  </Link>
                </li>
                <li>
                  <Link
                    href="/infrapandit-awards"
                    className="text-darkgray font-poppins "
                  >
                    InfraPandit Awards
                  </Link>
                </li>
                <li>
                  <Link
                    href="/outreach-and-engagements"
                    className="text-darkgray font-poppins "
                  >
                    Outreach and engagement
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Knowledge */}
          <AccordionItem value="knowledge">
            <AccordionTrigger className="py-4 text-lg text-left text-darkgray">
              Knowledge
            </AccordionTrigger>
            <AccordionContent className="">
              <ul onClick={onClose} className="space-y-3 text-base ">
                <li>
                  <Link
                    href="/knowledge#research-papers"
                    className="text-darkgray font-poppins "
                  >
                    Research papers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge#infravision-conversations"
                    className="text-darkgray font-poppins "
                  >
                    Infravision Conversations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge#blogs"
                    className="text-darkgray font-poppins py-2"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="Archives">
            <AccordionTrigger className="py-4 text-lg text-left text-darkgray">
              Archives
            </AccordionTrigger>
            <AccordionContent className="">
              <ul onClick={onClose} className="space-y-3 text-base ">
                <li>
                  <Link
                    href="/archive#newsletters"
                    className="text-darkgray font-poppins "
                  >
                    Newsletters
                  </Link>
                </li>
                <li>
                  <Link
                    href="/archive#news-and-media"
                    className="text-darkgray font-poppins "
                  >
                    News and Media
                  </Link>
                </li>
                <li>
                  <Link
                    href="/archive#gallery"
                    className="text-darkgray font-poppins py-2"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Static Link */}
        <Link
          href="/get-involved"
          onClick={onClose}
          className="block text-lg  text-darkgray font-medium py-6 no-underline hover:text-opacity-100"
        >
          Get Involved
        </Link>
      </div>
    </div>
  );
}
