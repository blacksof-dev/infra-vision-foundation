import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SocialMedia from "@/_components/atoms/socialMedia";
import { ReactNode } from "react";

export default function MapComponent() {
  return (
    <>
      <div>
        <div className="mb-5 lg:mb-10">
          <MapAndAddress
            icon={<MdOutlineEmail className="text-2xl text-pink my-auto" />}
            title="Email"
            desc="info@theinfravisionfoundation.org"
          />
          <MapAndAddress
            icon={<MdOutlinePhone className="text-2xl text-pink my-auto" />}
            title="Phone"
            desc="+91 98107 50745"
          />
          <MapAndAddress
            icon={
              <MdOutlineLocationOn className="text-2xl text-pink my-auto" />
            }
            title="Address"
            desc="E 2261, Palam Vihar, Gurugram - 122017, Haryana, Delhi NCR, India."
          />
        </div>

        <div className="w-full border-2 border-lightgray/40 rounded-md ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d448765.28875112947!2d77.034613!3d28.510285!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1a2072c947d1%3A0x61b745b0b0b8d323!2sINFRAVISION%20FOUNDATION!5e0!3m2!1sen!2sin!4v1746767518625!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className=" "
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="pt-4 sm:pt-10">
          <p className="text-dark text-lg">Follow us on</p>
          <SocialMedia />
        </div>
      </div>
    </>
  );
}

const MapAndAddress = ({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <>
      <div className="my-2  sm:my-4 ">
        <div className="flex  space-x-2">
          {icon}
          <h5 className="text-pink font-medium">{title}</h5>
        </div>
        <div className="ps-8 py-1 sm:py-2 w-full md:w-[80%] xl:w-[60%]  ">
          <p className="text-lg text-black">{desc}</p>
        </div>
      </div>
    </>
  );
};
