import React from "react";
import Banner from "@/_components/molecules/banner";
import image from "@/../public/assets/archive/banner/banner.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Insights & resources on infrastructure | TIF Archives',
  description:'Explore newsletters, media features, videos & galleries capturing infrastructure discourse by The Infravision Foundation, India’s first infrastructure think tank', 
  keywords: ['think tank india','think tanks','the infravision foundation','infravision foundation','policy research','public policy','archive'],
  icons: {
    icon: [
      { url: 'https://theinfravisionfoundation.org/favicon16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'https://theinfravisionfoundation.org/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://theinfravisionfoundation.org/icon.svg' },
    ],
    apple: '/apple-touch-icon.png',
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
    canonical: 'https://theinfravisionfoundation.org/archive',
  },
  authors: [{ name: 'The Infravision Foundation' }],
  publisher: 'The Infravision Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theinfravisionfoundation.org/archive',
    siteName: 'The Infravision Foundation',
    title: 'Insights & resources on infrastructure | TIF Archives',
    description:
      'Explore newsletters, media features, videos & galleries capturing infrastructure discourse by The Infravision Foundation, India’s first infrastructure think tank.',
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
    title: 'Insights & resources on infrastructure | TIF Archives',
    description:
      'Explore newsletters, media features, videos & galleries capturing infrastructure discourse by The Infravision Foundation, India’s first infrastructure think tank.',
    images: ['https://theinfravisionfoundation.org/assets/og/ogImage.png'],
  },
};

export default function BannerSection() {
  return (
    <Banner
      id="archiveBanner"
      image={image}
      heading="Archives"
      title="Archives"
      subdesc="Knowledge resources shaping India's <br/> infrastructure growth story."
    />
  );
}
