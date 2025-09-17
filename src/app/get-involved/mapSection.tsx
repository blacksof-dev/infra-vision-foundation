"use client"
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SocialMedia from "@/_components/atoms/socialMedia";
import { ReactNode } from "react";

import { useApiHook } from "@/lib/useApi";

interface organisationApiResponse {
  id: string;
  address: string;
  emails: string[];
  phones: string[];
  locationMapUrl: string;

}

export default function MapComponent() {

  const { data } = useApiHook<organisationApiResponse>({
    url: "/organisation/details",
    cacheKey: "organisation",
  });

  if (!data) return null;





  return (
    <>
      <div>
        <div className="mb-5 lg:mb-10">
          <MapAndAddress
            icon={<MdOutlineEmail className="text-2xl text-pink my-auto" />}
            title="Email"
            desc={data.emails[0]}
          />
          <MapAndAddress
            icon={<MdOutlinePhone className="text-2xl text-pink my-auto" />}
            title="Phone"
            desc={data.phones[0]}
          />
          <MapAndAddress
            icon={
              <MdOutlineLocationOn className="text-2xl text-pink my-auto" />
            }
            title="Address"
            desc={data.address}
          />
        </div>

        <div className="w-full border-2 border-lightgray/40 rounded-md ">
          <iframe
            src={data.locationMapUrl}
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
