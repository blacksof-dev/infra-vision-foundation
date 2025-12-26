import banner from "@/../public/assets/infraShakti/banner.png"
import Banner from "@/_components/molecules/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Celebrating infra changemakers | InfraShakti Awards',
  description:' A flagship initiative by The Infravision Foundation & NDTV honouring innovators & leaders driving citizen-centric change in India’s infrastructure.', 
  keywords: ['think tank india','think tanks','the infravision foundation','infravision foundation','policy research','public policy','Infrashakti-award'],
  icons: {
    icon: [
      { url: 'https://theinfravisionfoundation.org/favicon16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'https://theinfravisionfoundation.org/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
       { url: 'https://theinfravisionfoundation.org/favicon.png' },
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
    canonical: 'https://theinfravisionfoundation.org/infrashakti-awards',
  },
  authors: [{ name: 'The Infravision Foundation' }],
  publisher: 'The Infravision Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theinfravisionfoundation.org/infrashakti-awards',
    siteName: 'The Infravision Foundation',
    title: 'Celebrating infra changemakers | InfraShakti Awards',
    description:
      ' A flagship initiative by The Infravision Foundation & NDTV honouring innovators & leaders driving citizen-centric change in India’s infrastructure.',
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
    title: 'Celebrating infra changemakers | InfraShakti Awards',
    description:
      ' A flagship initiative by The Infravision Foundation & NDTV honouring innovators & leaders driving citizen-centric change in India’s infrastructure.',
    images: ['https://theinfravisionfoundation.org/assets/og/ogImage.png'],
  },
};
export default function BannerSection() {
    return (
        <Banner
            id="infrashaktiBanner"
            image={banner}
            heading="InfraShakti Awards"
            title="InfraShakti Awards"
            subdesc="From innovation, impact, and beyond... Celebrating the champions of infrastructure."
            buttonText="Watch the ceremony "
            link="https://www.youtube.com/embed/9DIAhTDim9Y"
        />
    )
}