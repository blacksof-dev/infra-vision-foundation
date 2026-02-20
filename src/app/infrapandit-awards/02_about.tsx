import { UnderlineCta } from "@/_components/atoms/buttons";
import Link from "next/link";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useApiHook } from "@/lib/useApi";
import EditorRenderer from "@/_components/molecules/editor";
import { getUrl } from "@/lib/getUrl";
import Image from "next/image";

const AboutInfraPandit = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { data: apiData, isLoading } = useApiHook<any>({
    url: "/infrapandit-awards",
    cacheKey: "infrapandit-awards",
  });

  if (isLoading || !apiData) {
    return (
      <section className="bg-[#F6F6F6] animate-pulse">
        <div className="w-container blade-top-padding blade-bottom-padding-lg flex flex-col justify-between md:flex-row gap-8 md:gap-20 md:items-center">
          <div className="max-w-full md:max-w-sm lg:max-w-md xl:max-w-2xl">
            <div className="flex items-center gap-2 md:gap-3 text-pink">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-gray-300"></span>
              <div className="h-5 bg-gray-300 rounded w-48"></div>
            </div>
            <div className="pt-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
            <div className="pt-6 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 sm:items-center">
              <div className="h-10 bg-gray-300 rounded w-32"></div>
              <div className="h-10 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full h-64 bg-gray-300 rounded md:w-96 md:h-80"></div>
          </div>
        </div>
      </section>
    );
  }

  const { main, eligibility, application } = apiData;

  return (
    <>
      <section className="bg-[#F6F6F6]">
        <div className="w-container blade-top-padding blade-bottom-padding-lg flex flex-col justify-between md:flex-row gap-8 md:gap-20 md:items-center">
          <div className="max-w-full md:max-w-sm lg:max-w-md xl:max-w-2xl">
            <div className="flex items-center gap-2 md:gap-3 text-pink">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
              <h5 className="font-medium text-sm xl:text-lg">{main?.title}</h5>
            </div>

            <div className="pt-4">
              <EditorRenderer data={main?.content} />
            </div>

            <div className="pt-6 flex  flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 items-center">
              {application.active && (
                <div className=" ">
                  <Link href={application.url} target="_blank">
                    <UnderlineCta
                      title={application.ctaText}
                      color="black"
                      underlineColor="#D52C5A"
                      role="link"
                      size="extralarge"
                    />
                  </Link>
                </div>
              )}
              <div
                role="button"
                onClick={() => setShowPopup(true)}
                className="cursor-pointer"
              >
                <UnderlineCta
                  title={eligibility?.ctaText}
                  color="black"
                  underlineColor="#D52C5A"
                  role="link"
                  size="extralarge"
                />
              </div>
            </div>
          </div>
          <div className="flex  justify-center">
            <Image
              className="max-w-full h-auto"
              src={getUrl(main?.posterImageUrl)}
              alt="Infrapandit Awards"
              width={550}
              height={550}
            />
          </div>
        </div>
      </section>
      {showPopup && (
        <EligibilityProcessPopup
          data={eligibility?.content}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

// Popup Component
const EligibilityProcessPopup = ({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0  flex items-cente  justify-center bg-black/70 backdrop-blur-sm px-2 py-10 z-[9999]">
      <div className="relative bg-white rounded-md  max-w-[800px]  h-full my-auto flex flex-col w-full">
        {/* Header with close button */}
        <div className="flex items-center  justify-between px-2 py-2 sm:px-6 sm:py-4 ">
          <button
            onClick={onClose}
            className="bg-pink cursor-pointer rounded-full p-1 text-white text-2xl ml-auto focus:outline-none"
          >
            <MdClose />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-2 px-2 sm:px-6 py-4 mr-5 sm:mr-9 ">
          <EditorRenderer data={data} />
        </div>
      </div>
    </div>
  );
};

export default AboutInfraPandit;
