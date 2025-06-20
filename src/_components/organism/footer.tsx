"use client";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { Anchor, TextAnchor } from "../atoms/links";
import { HeroBtn, UnderlineCta } from "../atoms/buttons";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import locationSvg from "@/../public/assets/globals/locationSvg.svg";
import Link from "next/link";
import SocialMedia from "../atoms/socialMedia";
import { GoArrowUp } from "react-icons/go";
import ArrowScope from "../atoms/visiblityScope";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Loader,
  LocateIcon,
  MapPin,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  agree: z
    .boolean()
    .refine((val) => val, { message: "You must agree to receive updates." }),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", agree: false },
  });
  const agreeValue = watch("agree");

  const onSubmit = async (data: NewsletterForm) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    console.log("Newsletter form data:", data);
    reset();
  };

  return (
    <>
      <footer className="blade-top-padding ">
        <div className=" w-container">
          <div className=" flex lg:flex-row flex-col lg:justify-between lg:items-end border-b-1 border-gray/60 pb-6 md:pb-9">
            <div className="w-[45%] sm:w-[35%]  h-[30%] md:h-full  lg:w-[20%] mb-4 md:mb-0">
              <Anchor href="/">
                <Image
                  src={logo}
                  className="w-full h-full "
                  alt="TIF logo"
                  title=" logo"
                  quality={100}
                />
              </Anchor>
            </div>

            <div>
              <h6 className="text-black py-2 font-medium">
                Subscribe to our newsletter
              </h6>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full sm:w-[70%] lg:w-full "
              >
                <div className="flex flex-row lg:w-[32rem]   xl:w-[35rem]  bg-white rounded md:rounded-md overflow-hidden border border-darkgray/30 ">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 w-[12.5rem]  h-[3rem] my-auto md:h-full px-1 sm:px-4   text-base tracking-[-0.3px] outline-none text-darkgray"
                    {...register("email")}
                  />
                  <div className="border-l-1  px-2 py-2 sm:px-6 border-darkgray/30 flex justify-center items-center">
                    {/* <HeroBtn
                      text={loading ? <Loader /> : ("Subscribe" as any)}
                      role="submit"
                      borderColor="pink"
                      color="pink"
                      bgColor="white"
                      size="extralarge"
                      classes="w-full w-auto text-sm font-medium"
                      isDisabled={loading}
                    /> */}
                    {loading && (
                      <div className="text-lg p-1 text-pink flex w-24 items-center justify-center">
                        <Loader className="animate-spin " />
                      </div>
                    )}
                    {!loading && (
                      <button className="text-pink cursor-pointer gap-2 text-lg flex items-center group">
                        Subscribe
                        <span className="inline-block p-0.5 sm:p-1 rounded border border-darkgray/30 group-hover:bg-pink group-hover:text-white group-hover:border-pink transition-all duration-300 ease-linear">
                          <ArrowRightIcon />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs pt-1">
                    {errors.email.message}
                  </p>
                )}
                <div className="flex gap-2  pt-5">
                  <Checkbox
                    className="w-5 h-5 rounded border border-pink cursor-pointer"
                    id="newsletter-agree"
                    checked={!!agreeValue}
                    onCheckedChange={(v) => setValue("agree", !!v)}
                  />
                  <label
                    htmlFor="newsletter-agree"
                    className="text-darkgray text-sm cursor-pointer select-none"
                  >
                    I agree to receive updates on newsletters from The
                    Infravision Foundation.
                  </label>
                </div>
                {errors.agree && (
                  <p className="text-red-500 text-xs pt-1">
                    {errors.agree.message}
                  </p>
                )}
              </form>
            </div>
          </div>
          <div className="flex  lg:flex-row flex-col pt-5 lg:pt-0 lg:gap-8  border-b-1 border-gray/60 ">
            <div className="grid grid-cols-1  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 xl:gap-14  lg:pt-9 lg:pb-14 xl:pb-8 2xl:pb-32">
              <ul>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-darkgray/30 "></div>
                  <span className="text-black hover:text-pink text-xl ">
                    <Link href="/about-us">About Us</Link>
                  </span>
                </li>

                <li className="md:pt-2 xl:pt-4">
                  <ul>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/about-us#who-we-are"
                        text="Who we are"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/about-us#infravisionaries"
                        text="The Infravisionaries"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/about-us#mission-and-vision"
                        text="Vision and Mission"
                      />
                    </li>

                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/about-us#our-pulse"
                        text="Our Foundational Pillars"

                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/about-us#project-pathway"
                        text="The project pathway"
                      />
                    </li>
                  </ul>
                </li>
              </ul>

              <ul>
                <li className="flex items-center gap-3 ">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black text-xl">Advocacy</span>
                </li>

                <li className="md:pt-2 xl:pt-4">
                  <ul>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/infrashakti-awards"
                        text="InfraShakti Awards"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/infrakatha"
                        text="Infrakatha"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/infrapandit-awards"
                        text="InfraPandit Awards"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/outreach-and-engagements"
                        text="Outreach and Engagement"
                      />
                    </li>
                  </ul>
                </li>
              </ul>

              <ul>
                <li className="flex items-center gap-3 ">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black hover:text-pink text-xl">
                    <Link href="/knowledge">Knowledge</Link>
                  </span>
                </li>

                <li className="md:pt-2 xl:pt-4">
                  <ul>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/knowledge#research-papers"
                        text="Research Papers"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/knowledge#infravision-conversations"
                        text="Infravision Conversations"
                      />
                    </li>
                    <li>
                      <TextAnchor
                        color="dark"
                        size="base"
                        className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                        href="/knowledge#blogs"
                        text="Blogs"
                      />
                    </li>
                  </ul>
                </li>
              </ul>

              <ul>
                <ul>
                  <li className="flex items-center gap-3 ">
                    <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                    <span className="text-black hover:text-pink text-xl">
                      <Link href="/archive">Archives</Link>
                    </span>
                  </li>

                  <li className="md:pt-2 xl:pt-4">
                    <ul>
                      <li>
                        <TextAnchor
                          color="dark"
                          size="base"
                          className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                          href="/archive#newsletters"
                          text="Newsletters"
                        />
                      </li>
                      <li>
                        <TextAnchor
                          color="dark"
                          size="base"
                          className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                          href="/archive#news-and-media"
                          text="In the News"
                        />
                      </li>
                      <li>
                        <TextAnchor
                          color="dark"
                          size="base"
                          className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                          href="/archive#gallery"
                          text="Gallery"
                        />
                      </li>
                    </ul>
                  </li>
                </ul>
                <li className="flex items-center gap-3 mt-4 xl:mt-6 2xl:mt-8">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black hover:text-pink text-xl">
                    <Link href="/get-involved">Get Involved</Link>
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 xl:mt-0">
              <div className=" h-full   pt-4 lg:py-9  lg:border-l-1 lg:border-lightgray/20 lg:ps-4 xl:ps-10">
                <div className="">
                  <div className="flex flex-row gap-1  items-center">
                    <MapPin className="text-xl" />

                    <h5 className="text-black 2xl:text-lg">Address</h5>
                  </div>

                  <h6 className="text-base text-darkgray ps-1 py-2 lg:py-1  pl-7">
                    E 2261, Palam Vihar, Gurugram -{" "}
                    <br className="lg:block hidde" /> 122017, Haryana, Delhi
                    NCR, India.
                  </h6>
                </div>

                <div className="py-3 lg:py-4">
                  <div className="flex flex-row gap-1  items-center">
                    <MdOutlineEmail className="text-black text-xl" />
                    <h5 className="text-black 2xl:text-lg py-1">Email</h5>
                  </div>
                  <Link href="mailto:info@theinfravisionfoundation.org">
                    <h6 className="text-darkgray ps-1 py-2 lg:py-1 text-base  pl-6">
                      info@theinfravisionfoundation.org
                    </h6>
                  </Link>
                </div>

                <div className=" pb-2">
                  <div className="flex flex-row gap-1  ditems-center ">
                    <MdOutlinePhone className="text-black text-xl  my-auto" />
                    <h5 className="text-black 2xl:text-lg ">Phone</h5>
                  </div>

                  <h6 className="text-darkgray ps-1 py-1 text-base pl-6">
                    +91 98107 50745
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-row  flex-col justify-between py-5  lg:pt-9 ">
            <div className=" my-auto">
              <p className="text-darkgray/80   smallText">
                Copyright 2025. All rights reserved.
              </p>
            </div>
            <div className="flex flex-row gap-5   justify-start sm:justify-center sm:items-center pt-4 sm:pt-0">
              <h5 className="text-darkgray/60 mr-5 sm:block hidden  ">
                Follow us
              </h5>
              <div>
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* <ArrowScope /> */}
    </>
  );
};

export default Footer;
