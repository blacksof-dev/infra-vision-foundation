import image from "@/../public/assets/knowledeg/banner/banner.jpg"
import bannerMobile from "@/../public/assets/knowledeg/banner/bannerMobile.jpg"
import Banner from "@/_components/molecules/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Research & insights by The Infravision Foundation | Knowledge',
  description:'Access research papers, expert conversations & blogs on India’s infrastructure issues by The Infravision Foundation, India’s first infrastructure think tank.', 
  keywords: ['think tank india','think tanks','the infravision foundation','infravision foundation','policy research','public policy','Knowledge'],
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
    canonical: 'https://theinfravisionfoundation.org/knowledge',
  },
  authors: [{ name: 'The Infravision Foundation' }],
  publisher: 'The Infravision Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theinfravisionfoundation.org/knowledge',
    siteName: 'The Infravision Foundation',
    title: 'Research & insights by The Infravision Foundation | Knowledge',
    description:
      'Access research papers, expert conversations & blogs on India’s infrastructure issues by The Infravision Foundation, India’s first infrastructure think tank.',
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
    title: 'Research & insights by The Infravision Foundation | Knowledge',
    description:
      'Access research papers, expert conversations & blogs on India’s infrastructure issues by The Infravision Foundation, India’s first infrastructure think tank.',
    images: ['https://theinfravisionfoundation.org/assets/og/ogImage.png'],
  },
};

export default function BannerSection() {
    return (
        <Banner
            id="knowledge-section1"
            image={image}
            mobileimage={bannerMobile}
            heading="Knowledge"
            title="Knowledge"
            subdesc="In-depth and independent analyses of India's infrastructure-related issues."
        />
    )
}
