"use client";
import { Input } from "@/_components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/_components/ui/textarea";
import { type ReactNode, useState } from "react";
import { HiOutlineLink } from "react-icons/hi";
import { TbUpload } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import Portal from "@/_components/atoms/popupPortal";
import { Loader, X } from "lucide-react";
import MapComponent from "./mapSection";

const dropdownOptions = [
  "Institutional collaboration",
  "Working with us ",
  "Participation in events",
  "Media inquiry",
  "Intellectual contribution",
  // FIXME: Permission to use our intellectual property, remove "our" because of overflow on mobile
  "Permission to use intellectual property",
  "Others",
];

const designationDropdownOptions = [
  "Student",
  "Research Professional",
  "Policymaker",
  "Private Sector Employee",
  "Donor",
  "Other"
]

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
    .min(10, "Please enter a 10-digit number").max(10, { message: "Enter a number up to 10 digits long" }),

  message: z.string(),

  interest: z.string().min(2, { message: "Select any option" }),
  designation: z.string().min(2, { message: "Select any option" }),

  links: z.string(),

  file: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [filename, setfilename] = useState("Select a file to upload ");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [setsuccess, setIsSuccess] = useState<boolean>(false);
  const [Isopen, setIsopen] = useState<boolean>(false);
  const [interest, setInterest] = useState("");
  const [designation, setDesignation] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      interest: "",
      designation: "",
      contactNumber: "",
      links: "",
      file: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = form;

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Create a FormData object if you need to send files
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("contactNumber", data.contactNumber);
      formData.append("interest", data.interest);
      formData.append("designation", data.designation);
      formData.append("message", data.message);
      formData.append("links", data.links);

      // Append the file if it exists
      if (data.file.length > 0) {
        formData.append("file", data.file[0]);
      }

      // Here you would normally send the formData to your API
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", data);

      setIsSuccess(true);
      setIsopen(true);
      setInterest("");
      setDesignation("")
      setfilename("Select a file to upload  *");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="bg-whitesmoke">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg ">
          <div className="flex flex-col md:flex-row gap-6 md:gap-6  xl:gap-14">
            {/* Map and Address Code */}
            <div className="w-full md:w-[50%] order-2 md:order-1 ">
              <MapComponent />
            </div>

            {/* Form Code */}
            <div className="w-full md:w-[50%]  md:border-l-2 md:border-darkgray/20 order-1 md:order-2">
              <div className="md:ps-8 xl:ps-14">
                <h1 className="font-medium text-black opacity-[0.8] ">
                  Write to us{" "}
                </h1>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="pt-4 md:pt-7  space-y-2  md:space-y-4"
                >
                  {/* First name and last name */}
                  <div className="flex sm:flex-row flex-col gap-2 sm:gap-3 md:gap-4  w-full mb-2 md:mb-4">
                    <div className="w-full">
                      <Input
                        id="firstName"
                        placeholder="First name*"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <Input
                        id="lastName"
                        placeholder="Last name*"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address* "
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Contact number*/}
                  <div>
                    <Input
                      id="contactNumber"
                      type="number"
                      placeholder="Contact number* "
                      {...register("contactNumber")}
                    />
                    {errors.contactNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contactNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Dropdown */}
                  <div className="relative">
                    <Select
                      value={designation}
                      onValueChange={(value) => {
                        setDesignation(value);
                        setValue("designation", value);
                      }}
                    >
                      <SelectTrigger id="designation">
                        <SelectValue placeholder="I am a*" />
                      </SelectTrigger>
                      <SelectContent className=" bg-white border-lightgray rounded-sm">
                        {designationDropdownOptions.map((role) => (
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

                    {errors.designation && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.designation.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <Select
                      value={interest}
                      onValueChange={(value) => {
                        setInterest(value);
                        setValue("interest", value);
                      }}
                    >
                      <SelectTrigger id="interest">
                        <SelectValue placeholder="I am interested in*" />
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

                    {errors.interest && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.interest.message}
                      </p>
                    )}
                  </div>

                  {/* textarea */}
                  <div>
                    <Textarea
                      id="message"
                      placeholder="Message "
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Upload button */}
                  <div className=" ">
                    <label htmlFor="file">
                      <div className="bg-white border relative border-darkgray/20 rounded-sm h-15 flex focus:outline-darkgray">
                        <span className="text-darkgray font-poppins my-auto ps-3 inline-block">
                          {filename}
                        </span>
                        <div className="absolute right-3 bottom-4 w-8 h-8 flex bg-pink rounded-sm">
                          <TbUpload className="text-white text-xl m-auto" />
                        </div>
                      </div>
                      <input
                        type="file"
                        id="file"
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            setfilename(files[0].name);
                            setValue("file", files);
                          }
                        }}
                      />
                    </label>
                    {errors.file && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.file.message as string}
                      </p>
                    )}
                  </div>

                  {/* Link */}
                  <div className="relative ">
                    <Input
                      id="links"
                      placeholder="Paste any links here"
                      {...register("links")}
                    />
                    {errors.links && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.links.message}
                      </p>
                    )}
                    <div className="absolute right-3 bottom-5 ">
                      <HiOutlineLink className="text-lightgray text-2xl" />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-4 sm:pt-7 flex">
                    <button
                      type="submit"
                      className="bg-pink hover:bg-[#9c082a] cursor-pointer sm:w-fit w-full text-white font-poppins mx-auto md:mx-0 px-14 font-medium text-xl py-4 rounded-md transition-all duration-300 ease-linear"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loadering /> : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PopUp Code */}
      {setsuccess && Isopen && (
        <Portal>
          <div className="fixed inset-0 flex justify-center items-center w-screen h-screen overflow-y-scroll bg-lightgray/40 p-2 md:p-4  z-[9999]">
            <div className="bg-white relative h-[20rem] w-full max-w-[30rem] rounded-xl flex flex-col items-center justify-center text-center p-6 ">
              <div className="absolute top-3 right-3 z-[10] ">
                <button
                  onClick={() => setIsopen(false)}
                  className="rounded-full  w-8 h-8 ring-1 cursor-poniter hover:ring-white hover:bg-pink hover:text-white text-pink flex justify-center items-center bg-darkPurple  hover:bg-lightPurple transition-all duration-300 ease-linear "
                >
                  <X className="" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-darkGray mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600 text-base sm:text-lg pt-2">
                Thank you for contacting us. We receive a high volume of inquiries. Rest assured, our team is committed to responding to each one. Please allow up to 3 business days to respond.

              </p>

              {/* <button
                onClick={() => setIsopen(false)}
                className="bg-pink text-white cursor-pointer font-poppins mx-auto md:mx-0 px-14 font-medium text-xl py-4 rounded-md"
              >
                Okay
              </button> */}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

function Loadering() {
  return (
    <div role="status" className="w-full text-white flex justify-center ">
      <Loader className="animate-spin" />
    </div>
  );
}
