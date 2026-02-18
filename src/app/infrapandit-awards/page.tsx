

import GetInvolved   from "@/_components/molecules/newsletter";
import InfraPanditBanner from "./01_banner";

import Sections from "./allsection";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Recognising top infrastructure researchers | InfraPandit Awards",
  description:
    "An initiative by The Infravision Foundation uniting industry, academia, & government by rewarding top doctoral research on India’s core infrastructure issues.",
  keywords: [
    "think tank india",
    "think tanks",
    "the infravision foundation",
    "infravision foundation",
    "policy research",
    "public policy",
    "Infrapandit-award",
  ],
  icons: {
    icon: [
      {
        url: "https://theinfravisionfoundation.org/favicon16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "https://theinfravisionfoundation.org/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "https://theinfravisionfoundation.org/favicon.png" },
    ],
    apple: "https://theinfravisionfoundation.org/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://theinfravisionfoundation.org/infrapandit-awards",
    languages: {
      "x-default": "https://theinfravisionfoundation.org/",
    },
  },
  authors: [{ name: "The Infravision Foundation" }],
  publisher: "The Infravision Foundation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theinfravisionfoundation.org/infrapandit-awards",
    siteName: "The Infravision Foundation",
    title: "Recognising top infrastructure researchers | InfraPandit Awards",
    description:
      "An initiative by The Infravision Foundation uniting industry, academia, & government by rewarding top doctoral research on India’s core infrastructure issues.",
    images: [
      {
        url: "https://theinfravisionfoundation.org/assets/og/ogImage.png",
        width: 1200,
        height: 630,
        alt: "The Infravision Foundation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recognising top infrastructure researchers | InfraPandit Awards",
    description:
      "An initiative by The Infravision Foundation uniting industry, academia, & government by rewarding top doctoral research on India’s core infrastructure issues.",
    images: ["https://theinfravisionfoundation.org/assets/og/ogImage.png"],
  },
};


const InfraPandit = () => {
 

  return (
    <>
      <InfraPanditBanner />
       <Sections/>
      <GetInvolved />
    </>
  );
};

export default InfraPandit;
