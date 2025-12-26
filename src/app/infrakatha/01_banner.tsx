import image from "@/../public/assets/infrakatha/banner/banner.png"
import mobileBanner from "@/../public/assets/infrakatha/banner/mobileBanner.png"
import Banner from "@/_components/molecules/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Nationalising conversations around infrastructure | Infrakatha',
  description:'Discover a new perspective on infrastructure & public policy with Infrakatha by The Infravision Foundation. Catch exclusive insights from experts & thought leaders.', 
  keywords: ['think tank india','think tanks','the infravision foundation','infravision foundation','policy research','public policy','Infrakatha'],
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
    canonical: 'https://theinfravisionfoundation.org/infrakatha',
     languages: {
      'x-default': 'https://theinfravisionfoundation.org/',
    },
  },
  authors: [{ name: 'The Infravision Foundation' }],
  publisher: 'The Infravision Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theinfravisionfoundation.org/infrakatha',
    siteName: 'The Infravision Foundation',
    title: 'Nationalising conversations around infrastructure | Infrakatha',
    description:
      'Discover a new perspective on infrastructure & public policy with Infrakatha by The Infravision Foundation. Catch exclusive insights from experts & thought leaders.',
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
    title: 'Nationalising conversations around infrastructure | Infrakatha',
    description:
      'Discover a new perspective on infrastructure & public policy with Infrakatha by The Infravision Foundation. Catch exclusive insights from experts & thought leaders.',
    images: ['https://theinfravisionfoundation.org/assets/og/ogImage.png'],
  },
};
export default function BannerSection() {
    return (
        <Banner
            id="infrakathaBanner"
            image={image}
             mobileimage={mobileBanner}
            heading="Infrakatha"
            title="Infrakatha"
            subdesc="A series of conversations <br/> on infrastructure with  brilliant minds, <br/> exclusive insights, and compelling stories."
        />
    )
}
