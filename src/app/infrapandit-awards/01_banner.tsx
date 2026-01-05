import bannerBg from "@/../public/assets/infrapandit/bannerBg.png";
import bannerBgMobile from "@/../public/assets/infrapandit/BannerBgMobile.png";
import { HeroBtnPink } from "@/_components/atoms/buttons";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";

export const metadata: Metadata = {
  title: 'Recognising top infrastructure researchers | InfraPandit Awards',
  description:'An initiative by The Infravision Foundation uniting industry, academia, & government by rewarding top doctoral research on India’s core infrastructure issues.', 
  keywords: ['think tank india','think tanks','the infravision foundation','infravision foundation','policy research','public policy','Infrapandit-award'],
  icons: {
    icon: [
      { url: 'https://theinfravisionfoundation.org/favicon16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'https://theinfravisionfoundation.org/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
       { url: 'https://theinfravisionfoundation.org/favicon.png' },
    ],
    apple: 'https://theinfravisionfoundation.org/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://theinfravisionfoundation.org/infrapandit-awards',
     languages: {
      'x-default': 'https://theinfravisionfoundation.org/',
    },
  },
  authors: [{ name: 'The Infravision Foundation' }],
  publisher: 'The Infravision Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theinfravisionfoundation.org/infrapandit-awards',
    siteName: 'The Infravision Foundation',
    title: 'Recognising top infrastructure researchers | InfraPandit Awards',
    description:
      'An initiative by The Infravision Foundation uniting industry, academia, & government by rewarding top doctoral research on India’s core infrastructure issues.',
    images: [
      {
        url: 'https://theinfravisionfoundation.org/assets/og/ogImage.png',
        width: 1200,
        height: 630,
        alt: 'The Infravision Foundation',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recognising top infrastructure researchers | InfraPandit Awards',
    description:
      'An initiative by The Infravision Foundation uniting industry, academia, & government by rewarding top doctoral research on India’s core infrastructure issues.',
    images: ['https://theinfravisionfoundation.org/assets/og/ogImage.png'],
  },
};

export default function InfraPanditBanner() {
  return (
    <>
      <div id="infrapanditBanner" className="pt-[5rem] sm:pt-[6rem]">
        <div className="relative ">
          <div
            className={`md:block  hidden w-full h-[25rem] md:h-[36rem] xl:h-[46rem] bg-black `}
          >
            <Image
              src={bannerBg}
              alt="Publication Banner"
              className="w-full h-full object-cover object-left  "
              unoptimized={true}
              quality={100}
            ></Image>
          </div>

          <div className="md:hidden block h-[30rem]">
            <Image
              src={bannerBgMobile}
              alt="Publication Banner"
              className="w-full h-full object-cover object-right"
              unoptimized={true}
              quality={100}
            ></Image>
          </div>

          <div className="w-container overflow-hidden">
            <div className="absolute w-auto sm:w-auto top-9  sm:top-12 md:top-18 flex flex-col  justify-between h-[88%] sm:h-[80%]">
              <div className="flex flex-row gap-1 ">
                <Link href="/">
                  <svg
                    className="fill-white "
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.8"
                      d="M14.2891 0.351685L0.730469 12.5549H4.42827V23.6483H13.0565V16.2527H15.5217V23.6483H24.1499V12.5549H27.8477L14.2891 0.351685ZM14.2891 3.66911L21.6847 10.3256V11.3223V21.1831H17.9869V13.7875H10.5913V21.1831H6.89347V10.3256L14.2891 3.66911Z"
                    />
                  </svg>
                </Link>
                <h5 className="text-white font-light flex flex-row">
                  <RiArrowRightSLine className="text-[24px]" />
                  InfraPandit Awards
                </h5>
              </div>
              <div className="  w-full ">
                <h1 className="text-white font-medium ">InfraPandit Awards</h1>
                <div className={` py-2 sm:py-4 w-full  max-w-lg`}>
                  <h5 className="text-white font-light ">
                    Celebrating the next generation of infrastructure
                    changemakers
                  </h5>
                </div>

                {/* <HeroBtnPink
                  // text="Apply now"
                  text="Applications closed"
                  role="link"
                  borderColor="pink"
                  color="white"
                  bgColor="transparent"
                  size="large"
                  aarowColor="white"
                  classes="font-medium"
                  link="https://docs.google.com/forms/d/e/1FAIpQLSdjpffzJCT6qmQXNUmoUau7giN4qVTsm5j3ysGZ0r8QxiG05g/viewform?usp=sharing&ouid=118204303619309850521"
                  target={"_blank"}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
