"use client";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { Anchor, TextAnchor } from "../atoms/links";
import Link from "next/link";
import SocialMedia from "../atoms/socialMedia";
import { ArrowRightIcon, Loader, MapPin } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  agree: z
    .boolean()
    .refine((val) => val, { message: "You must agree to receive updates." }),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const Footer = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
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

    setLoading(false);
    console.log("Newsletter form data:", data);
    if (!formRef.current) return;

    await emailjs.sendForm(
      "service_zo4m0a8",
      "template_8dasxyf",
      formRef.current,
      {
        publicKey: "svBJIois6z0vhJqFf",
      },
    );
    setMessage("Thanks for joining our newsletter.");
    setTimeout(() => {
      setMessage(" ");
    }, 4000);
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
                ref={formRef}
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
                {message && <p className="text-pink py-4">{message}</p>}
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
                        text="Who We Are"
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
                        text="The Project Pathway"
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
                        text="Outreach and Engagements"
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
                        text="The Infravision Conversation"
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
                          href="/archive#newsandMedia"
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
                      <li>
                        <TextAnchor
                          color="dark"
                          size="base"
                          className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                          href="/archive#videos"
                          text="Videos"
                        />
                      </li>
                    </ul>
                  </li>
                </ul>
                <li className="flex items-center gap-3 my-3 xl:mt-6 2xl:mt-8">
                  <div className="w-3 h-3 rounded-full bg-darkgray opacity-30"></div>
                  <span className="text-black hover:text-pink text-xl">
                    <Link href="/get-involved">Get Involved</Link>
                  </span>
                </li>
              </ul>
            </div>
            <div className="">
              <div className=" h-full lg:border-l-1 lg:border-lightgray/20 py-4 lg:ps-4 lg:pt-6">
                <div className="flex items-start gap-3 ">
                  <div className="shrink-0">
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="23"
                      viewBox="0 0 16 23"
                      fill="none"
                    >
                      <path
                        d="M7.73926 0.150391C11.9351 0.150391 15.3281 3.5434 15.3281 7.73926C15.3281 9.15988 14.8544 10.7613 14.1328 12.3721C13.412 13.9811 12.449 15.5889 11.4844 17.0186C10.5202 18.4476 9.55562 19.6963 8.83203 20.5879C8.47029 21.0336 8.16879 21.3901 7.95801 21.6348C7.86774 21.7395 7.7939 21.8237 7.73926 21.8857C7.68462 21.8237 7.61078 21.7395 7.52051 21.6348C7.30973 21.3901 7.00823 21.0336 6.64648 20.5879C5.9229 19.6963 4.95835 18.4476 3.99414 17.0186C3.02957 15.5889 2.06653 13.9811 1.3457 12.3721C0.624119 10.7613 0.150391 9.15988 0.150391 7.73926C0.150391 3.5434 3.5434 0.150391 7.73926 0.150391ZM7.73926 2.06152C4.60494 2.06152 2.06152 4.60494 2.06152 7.73926C2.06152 9.35581 2.88531 11.3778 3.98145 13.3486C5.08105 15.3257 6.4685 17.2754 7.62109 18.7549L7.73828 18.9062L7.85742 18.7559C9.03237 17.265 10.4195 15.323 11.5137 13.3525C12.6046 11.388 13.417 9.37194 13.417 7.73926C13.417 4.60494 10.8736 2.06152 7.73926 2.06152Z"
                        fill="#191919"
                        stroke="white"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M7.73961 10.5051C9.26613 10.5051 10.5036 9.2676 10.5036 7.74107C10.5036 6.21454 9.26613 4.97705 7.73961 4.97705C6.21308 4.97705 4.97559 6.21454 4.97559 7.74107C4.97559 9.2676 6.21308 10.5051 7.73961 10.5051Z"
                        fill="#191919"
                      />
                    </svg>
                  </div>

                  <div>
                    <h5 className="text-black 2xl:text-lg text-start leading-none">
                      Address
                    </h5>
                    <h6 className="text-base text-darkgray mt-1">
                      E 2261, Palam Vihar, Gurugram -{" "}
                      <br className="lg:block hidde" /> 122017, Haryana, Delhi
                      NCR, India.
                    </h6>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M1.96615 2.55556H17.6921C18.7648 2.55556 19.6365 3.42734 19.6365 4.5V16.1831C19.6364 17.2556 18.7647 18.1278 17.6921 18.1278H1.96615C0.893665 18.1278 0.0221806 17.2556 0.0220139 16.1831V4.5C0.0220139 3.42734 0.893665 2.55556 1.96615 2.55556ZM17.6633 6.88906L9.82855 12.0278L2.0021 6.88906L1.90972 6.83089V16.2273H17.755V6.83089L17.6633 6.88906ZM1.93684 4.68501L9.79926 10.3715L9.82855 10.3901L9.85784 10.3715L17.7212 4.68501L17.8971 4.57639H1.76095L1.93684 4.68501Z"
                      fill="#191919"
                      stroke="white"
                      strokeWidth="0.1"
                    />
                  </svg>
                  <div>
                    <h5 className="text-black 2xl:text-lg text-start leading-none">
                      Email
                    </h5>
                    <Link href="mailto:info@theinfravisionfoundation.org">
                      <h6 className="text-darkgray  text-base  ">
                        info@theinfravisionfoundation.org
                      </h6>
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M1.09267 0.110677H4.9153C5.45476 0.110677 5.89627 0.553306 5.89631 1.09267C5.89634 2.29756 6.06489 3.46064 6.38021 4.55947L6.52452 5.02712C6.63194 5.37121 6.55301 5.7528 6.27821 6.02756L3.87587 8.43094L3.81835 8.48741L3.85526 8.55902C5.43887 11.6712 7.98972 14.212 11.1013 15.8062L11.1729 15.8431L11.2294 15.7856L13.6338 13.3832L13.6327 13.3821C13.8309 13.1948 14.0769 13.0991 14.3305 13.099C14.4335 13.099 14.5378 13.1086 14.6278 13.1445V13.1457L14.6343 13.1478C15.8688 13.5556 17.2026 13.7759 18.5687 13.7759C19.1082 13.7759 19.5507 14.2175 19.5507 14.7569V18.5687C19.5507 19.1082 19.1082 19.5507 18.5687 19.5507C8.37372 19.5505 0.11087 11.2877 0.110677 1.09267C0.110677 0.553306 0.553306 0.110677 1.09267 0.110677ZM2.10612 2.19185C2.20509 3.64338 2.49175 5.04079 2.94271 6.36068L2.99911 6.52887L4.48351 5.04558L4.46506 4.98264C4.20525 4.0841 4.04289 3.14123 3.97787 2.17664L3.97027 2.07356H2.09852L2.10612 2.19185ZM17.5879 15.702L17.485 15.6944C16.5315 15.6295 15.5879 15.4674 14.6667 15.2072L14.6049 15.1899L14.5583 15.2354L13.2477 16.5353L13.1198 16.6623L13.2909 16.7199C14.621 17.1598 16.0179 17.4455 17.4697 17.5444L17.5879 17.5521V15.702Z"
                      fill="#191919"
                      stroke="white"
                      strokeWidth="0.2"
                    />
                  </svg>

                  <div>
                    <h5 className="text-black 2xl:text-lg text-start leading-none">
                      Phone
                    </h5>
                    <h6 className="text-darkgray  text-base ">
                      +91 98107 50745
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-row  flex-col-reverse justify-between  py-4  lg:pt-9 ">
            <div className=" my-auto ">
              <p className="text-darkgray/80   smallText">
                Copyright 2026. All rights reserved.
              </p>
              <Link href="https://www.blacksof.com/">
                <p className="text-darkgray/80 smallText py-1 sm:py-2 underline underline-offset-1">
                  Made by <span className="font-semibold">Blacksof</span>
                </p>
              </Link>
            </div>
            <div className="flex flex-row gap-5   justify-start sm:justify-center sm:items-center pt-4 sm:pt-0">
              <h5 className="text-darkgray/60 mr-5 sm:block hidden  ">
                Follow us
              </h5>
              <div className="py-4 md:py-0">
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
