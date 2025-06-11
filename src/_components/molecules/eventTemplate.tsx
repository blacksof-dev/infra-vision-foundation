'use client'
import { HeroBtnPink, UnderlineCta } from "../atoms/buttons";
import Image from "next/image";
import montek from "@/../public/assets/home/outreach/montek.png";
import infraKatha from "@/../public/assets/home/outreach/infraKatha.png";
import Portal from "../atoms/popupPortal";

import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

export default function EventTemplate() {
  const [popup, setPopup] = useState<"none" | "notified" | "details">("none");
  useEffect(() => {
    if (popup !== "none") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [popup]);
  return (
    <>
      <div className="relative  bg-white  rounded-lg  mt-8  flex flex-col sm:flex-row items-cente sm:gap-4 md:gap-7 xl:gap-10 min-h-[22rem] lg:min-h-[25rem] overflow-hidden">
        <div className="w-full h-auto sm:w-[40%] lg:w-[38%]  sm:p-5 ">
          <Image
            src={montek}
            alt="Mr Montek Singh Ahluwalia"
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <div className=" px-3 py-6 xl:py-0 w-full sm:w-1/2 flex flex-col justify-center ">
          <Image
            src={infraKatha}
            alt="Infra Katha"
            width={160}
            height={50}
            className=""
          />

          <div className="max-w-md ">
            <h2 className="font-medium pt-2 lg:pt-4 xl:pt-6">
              Can Public Private Partnerships be revitalised?
            </h2>

            <div className="py-3 xl:py-3">
              <h5 className="text-[#C82249] font-medium ">
                Mr Montek Singh Ahluwalia
              </h5>
              <h6 className="text-[#5D6468] font-normal text-sm sm:text-base">
                Former Deputy Chairman, Planning Commission
              </h6>
            </div>

            <div
              className="pt-6 cursor-pointer xl:pt-9 flex flex-wrap gap-9 items-center"
            >
              <div onClick={() => setPopup("notified")}>
                <HeroBtnPink
                  text="Get notified"
                  role="button"
                  aarowColor="pink"
                  borderColor="pink"
                  color="black"
                  bgColor="transparent"
                  size="large"
                  classes="font-medium"
                />
              </div>

              <div onClick={() => setPopup("details")}>
                <UnderlineCta
                  title="Know more"
                  color="black"
                  underlineColor="#C82249"
                  role="link"
                  size="extralarge"
                />
              </div>
            </div>
            {popup === "notified" && <NotifiedPopup onclose={() => setPopup("none")} />}
            {popup === "details" && <DetailsPopup onclose={() => setPopup("none")} />}
          </div>
        </div>
        <img
          className="absolute opacity-60 top-0 right-0 hidden lg:block"
          src="/assets/outreach-and-engagements/highlight/circle.png"
          alt="Decorative Circle"
        />
      </div>
    </>
  );
}

function NotifiedPopup({ onclose }: { onclose: () => void }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    notifyEvents: false,
    subscribeNewsletter: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleCheckbox(name: string, checked: boolean) {
    setForm((prev) => ({ ...prev, [name]: checked }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // handle form submit
  }

  return (
    <>
      <Portal>
        <div className="flex justify-center items-center fixed inset-0 bg-black/70 z-[999]">
          <div className="bg-white rounded-lg w-full max-w-3xl h-auto relative md:m-4 m-2 p-4 sm:p-10">
            <button
              onClick={onclose}
              className="scale-75 sm:scale-90 z-1  hover:scale-100  absolute top-1 right-1 sm:top-4 sm:right-4 h-10 w-10 text-[#C82249]  bg-white border border-[#C82249]  transition-all duration-300 ease-linear rounded-full flex justify-center items-center text-xl cursor-pointer"
            >
              <RxCross2 className=" text-2xl" />
            </button>
            <h2 className="font-medium mb-6 mt-6 sm:mt-2 text-black">Get notified about <br />upcoming events!</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  name="firstName"
                  placeholder="First name *"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="bg-white border border-[#E5E5E5] h-14 text-base"
                />
                <Input
                  name="lastName"
                  placeholder="Last name *"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="bg-white border border-[#E5E5E5] h-14 text-base"
                />
              </div>
              <Input
                name="email"
                type="email"
                placeholder="Email address *"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white border border-[#E5E5E5] h-14 text-base"
              />
              <Input
                name="contact"
                placeholder="Contact number *"
                value={form.contact}
                onChange={handleChange}
                required
                className="bg-white border border-[#E5E5E5] h-14 text-base"
              />
              <button
                type="submit"
                className="w-full sm:w-fit px-14 mt-2 h-14 rounded-md bg-[#C82249] text-white text-xl font-medium transition hover:bg-[#a81b3a]"
              >
                Submit
              </button>
              <div className="flex flex-col gap-3 mt-4">
                <label className="flex items-center gap-3 text-gray-600 text-base font-normal">
                  <Checkbox
                    checked={form.notifyEvents}
                    onCheckedChange={(checked) => handleCheckbox("notifyEvents", !!checked)}
                    className="size-6 border-gray-300"
                  />
                  Get notified about upcoming events
                </label>
                <label className="flex items-center gap-3 text-gray-600 text-base font-normal">
                  <Checkbox
                    checked={form.subscribeNewsletter}
                    onCheckedChange={(checked) => handleCheckbox("subscribeNewsletter", !!checked)}
                    className="size-6 border-gray-300"
                  />
                  Subscribe to our newsletter
                </label>
              </div>
            </form>
          </div>
        </div>
      </Portal>
    </>
  );
}

function DetailsPopup({ onclose }: { onclose: () => void }) {
  return (
    <Portal>
      <div className="flex justify-center md:items-center fixed inset-0 bg-black/70 z-[999] py-4">
        <div className="bg-white my-auto rounded-lg w-full max-w-lg md:max-w-4xl h-full sm:h-auto relative md:m-4 m-2 p-3 sm:p-4  flex flex-col md:flex-row md:gap-8 overflow-auto">
          <button
            onClick={onclose}
            className="scale-75 sm:scale-90 z-1 hover:scale-100 absolute top-1 right-1 sm:top-4 sm:right-4 h-10 w-10 text-pink bg-white border border-pink transition-all duration-300 ease-linear rounded-full flex justify-center items-center text-xl cursor-pointer"
          >
            <RxCross2 className=" text-2xl" />
          </button>
          <div className="w-full h-auto md:w-1/2 rounded-lg flex flex-col items-center justify-center relative  ">
            <Image
              src={montek}
              alt="Mr Montek Singh Ahluwalia"
              className="rounded-lg w-full h-full  object-cover "
            />

            <div className=" w-full p-1">
              {/* <h2 className="font-medium text-2xl mb-2">Can Public Private Partnerships be Revitalised?</h2> */}
              <h5 className="text-pink font-medium text-base">Mr. Montek Singh Ahluwalia</h5>
              <h6 className="text-[#5D6468] font-normal text-sm">Former Deputy Chairman, the Planning Commission</h6>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <Image
              src={infraKatha}
              alt="Infra Katha"
              width={160}
              height={50}
              className="mb-4"
            />

            <p className="text-gray-700 text-base mb-4">
              The Infravision Foundation hosted the eighth edition of InfraKatha with Montek Singh Ahluwalia, former Deputy Chairman of the Planning Commission of India, exploring the lessons and future pathways of Public-Private Partnerships in India’s infrastructure landscape.<br /><br />
              A thoughtful audience contributed to the dialogue during the insightful session, guided by TIF Founder and Managing Trustee, Vinayak Chatterjee.
            </p>
            <p className="text-pink text-base font-medium mb-2">Date and venue to be announced soon</p>
            <HeroBtnPink
              text="Get notified"
              role="button"
              aarowColor="pink"
              borderColor="pink"
              color="black"
              bgColor="transparent"
              size="large"
              classes="font-sm"
            />
          </div>
        </div>
      </div>
    </Portal >
  );
}
