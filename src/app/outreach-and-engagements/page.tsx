import { Metadata } from "next";
import OutreachBanner from "./01_Banner";
import Upcoming from "./03_upcoming";
import Involved from "@/_components/molecules/newsletter";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Upcoming programmes of The Infravision Foundation",
  description:
    "Stay informed about the upcoming programmes, engagements, & initiatives of  The Infravision Foundation. Join the discourse to contribute to change.",
  keywords: [
    "think tank india",
    "think tanks",
    "the infravision foundation",
    "infravision foundation",
    "policy research",
    "public policy",
    "Outreach and Engagement",
    "Calender",
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
    canonical: "https://theinfravisionfoundation.org/outreach-and-engagements",
    languages: {
      "x-default": "https://theinfravisionfoundation.org/",
    },
  },
  authors: [{ name: "The Infravision Foundation" }],
  publisher: "The Infravision Foundation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theinfravisionfoundation.org/outreach-and-engagements",
    siteName: "The Infravision Foundation",
    title: "Upcoming programmes of The Infravision Foundation",
    description:
      "Stay informed about the upcoming programmes, engagements, & initiatives of  The Infravision Foundation. Join the discourse to contribute to change.",
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
    title: "Upcoming programmes of The Infravision Foundation",
    description:
      "Stay informed about the upcoming programmes, engagements, & initiatives of  The Infravision Foundation. Join the discourse to contribute to change.",
    images: ["https://theinfravisionfoundation.org/assets/og/ogImage.png"],
  },
};
const OutreachAndEngagements = () => {
  return (
    <>
      <OutreachBanner />
      <Upcoming />
      <Involved />
    </>
  );
};

export default OutreachAndEngagements;
