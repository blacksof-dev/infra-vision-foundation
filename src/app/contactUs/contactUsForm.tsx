"use client";

import { Input } from "@/_components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/_components/ui/textarea";
import { useState } from "react";
import { HiOutlineLink } from "react-icons/hi";
import { TbUpload } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

const dropdownOptions = [
  "Institutional collaboration",
  "Working with us ",
  "Participation in events",
  "Media inquiry",
  "Intellectual contribution",
  "Permission to use our intellectual property",
  "Others",
];

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long" }),

  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" }),

  email: z.string().email({ message: "Please enter a valid email address" }),

  contactNumber: z
    .string()
    .regex(/^\d{10}/, "Contact Number must not exceed 10 digits."),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),

  interest: z
    .string()
    .min(2, { message: "Interest must be at least 2 characters long" }),

  links: z.string().url({ message: "Please enter a valid URL" }),

  file: z
    .string()
    .min(2, { message: "File must be at least 2 characters long" }),
});
export default function ContactForm() {
  const [filename, setfilename] = useState("Select a file to upload  *");
  return (
    <>
      <div className="bg-whitesmoke">
        <div className="w-container blade-top-padding-sm blade-bottom-padding-sm ">
          <div className="flex flex-row gap-11">
            <div className="w-1/2 h-90 "></div>
            <div className="w-1/2 ">
              <div className="ps-14">
                <h1 className="font-medium text-black opacity-[0.8]">
                  Write to us{" "}
                </h1>
                <form className="pt-7 space-y-4">
                  {/* First name and last name */}
                  <div className="flex gap-4  w-full ">
                    <Input id="fullName" placeholder="First name*" />
                    <Input id="lastName" placeholder="Last name*" />
                  </div>

                  {/* Email */}
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address* "
                    />
                  </div>

                  {/* Contact number*/}
                  <div>
                    <Input id="contactNumber" placeholder="Contact number* " />
                  </div>

                  {/* Dropdown */}
                  <div className="relative">
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Customer Support Associate" />
                      </SelectTrigger>
                      <SelectContent className=" bg-white border-lightgray rounded-sm">
                        {dropdownOptions.map((role) => (
                          <SelectItem
                            key={role}
                            value={role}
                            className="cursor-pointer"
                          >
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* <div className="absolute right-6 bottom-4 w-8 h-8 flex  bg-pink rounded-sm">
                      <IoIosArrowDown className="text-white text-xl m-auto pointer-events-none" />
                    </div> */}
                  </div>

                  {/* textarea */}
                  <div>
                    <Textarea id="message" placeholder="Message " />
                  </div>

                  {/* Upload button */}
                  <div className=" ">
                    <label id="upload">
                      <div className="bg-white border relative border-darkgray/20 rounded-sm h-15 flex  focus:outline-darkgray">
                        <span className="text-darkgray font-poppins my-auto ps-3  inline-block ">
                          Select a file to upload{" "}
                        </span>
                        <div className="absolute right-6 bottom-4 w-8 h-8 flex  bg-pink rounded-sm">
                          <TbUpload className="text-white text-xl m-auto " />
                        </div>
                      </div>
                      <Input
                        type="file"
                        id="upload"
                        placeholder={filename}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Submit button */}
                  <div className="relative ">
                    <Input id="links" placeholder="Paste any links here" />
                    <div className="absolute right-8 bottom-5 ">
                      <HiOutlineLink className="text-lightgray text-2xl" />
                    </div>
                  </div>

                  <div className="pt-7">
                    <button className="bg-pink text-white font-poppins px-14 font-medium text-xl py-4 rounded-md">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
