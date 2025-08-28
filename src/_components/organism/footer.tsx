"use client";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import logo from "@/../public/assets/globals/logo.png";
import { Anchor, TextAnchor } from "../atoms/links";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import Link from "next/link";
import { ArrowRightIcon, Loader, MapPin } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { useApiHook } from "@/lib/useApi";

const SocialMedia = dynamic(() => import("../atoms/socialMedia"), {
  loading: () => <div className="w-6 h-6 animate-pulse bg-gray-200 rounded" />,
});

interface ContactDetailsApiResponse {
  address: string;
  emails: string[];
  phones: string[];
  locationMapUrl: string;
}

interface NewsletterApiResponse {
  email: string;
  source: string;
  isActive: boolean;
}

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  agree: z
    .boolean()
    .refine((val) => val, { message: "You must agree to receive updates." }),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const navigationSections = [
  {
    title: "About Us",
    href: "/about-us",
    items: [
      { href: "/about-us#who-we-are", text: "Who We Are" },
      { href: "/about-us#infravisionaries", text: "The Infravisionaries" },
      { href: "/about-us#mission-and-vision", text: "Vision and Mission" },
      { href: "/about-us#our-pulse", text: "Our Foundational Pillars" },
      { href: "/about-us#project-pathway", text: "The Project Pathway" },
    ],
  },
  {
    title: "Advocacy",
    items: [
      { href: "/infrashakti-awards", text: "InfraShakti Awards" },
      { href: "/infrakatha", text: "Infrakatha" },
      { href: "/infrapandit-awards", text: "InfraPandit Awards" },
      { href: "/outreach-and-engagements", text: "Outreach and Engagements" },
    ],
  },
  {
    title: "Knowledge",
    href: "/knowledge",
    items: [
      { href: "/knowledge#research-papers", text: "Research Papers" },
      {
        href: "/knowledge#infravision-conversations",
        text: "The Infravision Conversation",
      },
      { href: "/knowledge#blogs", text: "Blogs" },
    ],
  },
  {
    title: "Archives",
    href: "/archive",
    items: [
      { href: "/archive#newsletters", text: "Newsletters" },
      { href: "/archive#newsandMedia", text: "In the News" },
      { href: "/archive#gallery", text: "Gallery" },
      { href: "/archive#videos", text: "Videos" },
    ],
  },
];

const NavigationSection = memo(
  ({ section }: { section: (typeof navigationSections)[0] }) => (
    <ul>
      <li className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-darkgray/30" />
        <span className="text-black hover:text-pink text-xl">
          {section.href ? (
            <Link href={section.href}>{section.title}</Link>
          ) : (
            section.title
          )}
        </span>
      </li>
      {section.items && (
        <li className="md:pt-2 xl:pt-4">
          <ul>
            {section.items.map((item) => (
              <li key={item.href}>
                <TextAnchor
                  color="dark"
                  size="base"
                  className="block whitespace-nowrap ps-6 py-1 md:py-2 hover:text-black"
                  href={item.href}
                  text={item.text}
                />
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  )
);

NavigationSection.displayName = "NavigationSection";

const ContactInfo = memo(({ data }: { data: ContactDetailsApiResponse }) => (
  <div className="mt-4 xl:mt-0">
    <div className=" h-full   pt-4 lg:py-9  lg:border-l-1 lg:border-lightgray/20 lg:ps-4 xl:ps-10">
      <div>
        <div className="flex flex-row gap-1 items-center">
          <MapPin className="text-xl" />
          <h5 className="text-black 2xl:text-lg">Address</h5>
        </div>
        <h6 className="text-base text-darkgray ps-1 py-2 lg:py-1 pl-7">
          {data.address}
        </h6>
      </div>

      <div className="py-3 lg:py-4">
        <div className="flex flex-row gap-1 items-center">
          <MdOutlineEmail className="text-black text-xl" />
          <h5 className="text-black 2xl:text-lg py-1">Email</h5>
        </div>
        <Link
          href={`mailto:${
            Array.isArray(data.emails) ? data.emails[0] : data.emails
          }`}
        >
          <h6 className="text-darkgray ps-1 py-2 lg:py-1 text-base pl-6">
            {Array.isArray(data.emails) ? data.emails.join(", ") : data.emails}
          </h6>
        </Link>
      </div>

      <div className="pb-2">
        <div className="flex flex-row gap-1 items-center">
          <MdOutlinePhone className="text-black text-xl my-auto" />
          <h5 className="text-black 2xl:text-lg">Phone</h5>
        </div>
        <h6 className="text-darkgray ps-1 py-1 text-base pl-6">
          {Array.isArray(data.phones) ? data.phones.join(", ") : data.phones}
        </h6>
      </div>
    </div>
  </div>
));

ContactInfo.displayName = "ContactInfo";

const Footer = () => {
  const { data, isLoading, error } = useApiHook<ContactDetailsApiResponse>({
    url: "/organisation/details",
    cacheKey: "organisationDetails",
  });

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

  const onSubmit = useCallback(
    async (formData: NewsletterForm) => {
      setLoading(true);
      setMessage("");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/newsletter-subscription/subscribe`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              source: "footer",
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to subscribe");

        const result: NewsletterApiResponse = await res.json();
        // console.log("Newsletter subscribed:", result);

        if (formRef.current) {
          await emailjs.sendForm(
            "service_zo4m0a8",
            "template_8dasxyf",
            formRef.current,
            {
              publicKey: "svBJIois6z0vhJqFf",
            }
          );
        }

        setMessage("Thanks for joining our newsletter!");
        reset();
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [reset]
  );

  const handleCheckboxChange = useCallback(
    (checked: boolean) => {
      setValue("agree", checked);
    },
    [setValue]
  );

  if (isLoading) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <p>Something went wrong</p>
      </section>
    );
  }

  return (
    <footer className="blade-top-padding">
      <div className="w-container">
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end border-b-1 border-gray/60 pb-6 md:pb-9">
          <div className="w-[45%] sm:w-[35%] h-[30%] md:h-full lg:w-[20%] mb-4 md:mb-0">
            <Anchor href="/">
              <Image
                src={logo || "/placeholder.svg"}
                className="w-full h-full"
                alt="TIF logo"
                title="logo"
                quality={100}
                priority
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
              className="w-full sm:w-[70%] lg:w-full"
            >
              <div className="flex flex-row lg:w-[32rem] xl:w-[25rem] bg-white rounded md:rounded-md overflow-hidden border border-darkgray/30">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 w-[12.5rem] h-[3rem] my-auto md:h-full px-1 sm:px-4 text-base tracking-[-0.3px] outline-none text-darkgray"
                  {...register("email")}
                />
                <div className="border-l-1 px-2 py-2 sm:px-6 border-darkgray/30 flex justify-center items-center">
                  {loading ? (
                    <div className="text-lg p-1 text-pink flex w-24 items-center justify-center">
                      <Loader className="animate-spin" />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="text-pink cursor-pointer gap-2 text-lg flex items-center group"
                    >
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

              <div className="flex gap-2 pt-5">
                <Checkbox
                  className="w-5 h-5 rounded border border-pink cursor-pointer"
                  id="newsletter-agree"
                  checked={!!agreeValue}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="newsletter-agree"
                  className="text-darkgray text-sm cursor-pointer select-none"
                >
                  I agree to receive updates on newsletters from The Infravision
                  Foundation.
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
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 xl:gap-14  lg:pt-9 lg:pb-14 xl:pb-8 2xl:pb-32">
            {navigationSections.map((section, index) => (
              <NavigationSection key={section.title} section={section} />
            ))}
            <ul>
              <li className="flex items-center gap-3 mt-4 xl:mt-6 2xl:mt-8">
                <div className="w-3 h-3 rounded-full bg-darkgray opacity-30" />
                <span className="text-black hover:text-pink text-xl">
                  <Link href="/get-involved">Get Involved</Link>
                </span>
              </li>
            </ul>
          </div>
          <ContactInfo data={data} />
        </div>

        <div className="flex sm:flex-row flex-col justify-between py-5 lg:pt-9">
          <div className="my-auto">
            <p className="text-darkgray/80 smallText">
              Copyright 2025. All rights reserved.
            </p>
            <Link href="https://www.blacksof.com/">
              <p className="text-darkgray/80 smallText py-1 sm:py-2 underline underline-offset-1">
                Made by <span className="font-semibold">Blacksof</span>
              </p>
            </Link>
          </div>
          <div className="flex flex-row gap-5 justify-start sm:justify-center sm:items-center pt-4 sm:pt-0">
            <h5 className="text-darkgray/60 mr-5 sm:block hidden">Follow us</h5>
            <div>
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
