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
import { X } from "lucide-react";
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
    .regex(/^\d{10}/, "Contact Number must not exceed 10 digits."),

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
      await new Promise((resolve) => setTimeout(resolve, 8000));
      console.log("Form submitted:", data);

      setIsSuccess(true);
      setIsopen(true);
      setInterest("");
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
                      {isSubmitting ? <Loader /> : "Submit"}
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
                  className="rounded-full  w-8 h-8  flex justify-center items-center bg-darkPurple text-darkgray hover:bg-lightPurple transition-colors duration-300 ease-linear cursor-pointer "
                >
                  <X className="cursor-poniter" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-darkGray mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. <br /> We'll get back to you
                shortly.
              </p>

              <button
                onClick={() => setIsopen(false)}
                className="bg-pink text-white font-poppins mx-auto md:mx-0 px-14 font-medium text-xl py-4 rounded-md"
              >
                ok
              </button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

function Loader() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-darkgray fill-lightgray"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
