import React from "react";
import Involved from "@/_components/molecules/newsletter";
import AboutUsBanner from "./01_banner";

import { Metadata } from "next";
import Sections from "./sections";
export const revalidate = 60;
export const metadata: Metadata = {
  title: " Impacting public policy in infra | The Infravision Foundation",
  description:
    "We are a think tank led by thought leaders & experts from the infrastructure domain. Together, we are elevating India’s infrastructural & economic trajectory. ",
  keywords: [
    "think tank india",
    "think tanks",
    "the infravision foundation",
    "infravision foundation",
    "policy research",
    "public policy",
    "about-us",
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
    canonical: "https://theinfravisionfoundation.org/about-us",
    languages: {
      "x-default": "https://theinfravisionfoundation.org/",
    },
  },
  authors: [{ name: "The Infravision Foundation" }],
  publisher: "The Infravision Foundation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theinfravisionfoundation.org/about-us",
    siteName: "The Infravision Foundation",
    title: " Impacting public policy in infra | The Infravision Foundation",
    description:
      "We are a think tank led by thought leaders & experts from the infrastructure domain. Together, we are elevating India’s infrastructural & economic trajectory. ",
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
    title: " Impacting public policy in infra | The Infravision Foundation",
    description:
      "We are a think tank led by thought leaders & experts from the infrastructure domain. Together, we are elevating India’s infrastructural & economic trajectory. ",
    images: ["https://theinfravisionfoundation.org/assets/og/ogImage.png"],
  },
};

const AboutUs = () => {
  return (
    <>
      <AboutUsBanner />

      <Sections />
      <Involved />
    </>
  );
};

export default AboutUs;
