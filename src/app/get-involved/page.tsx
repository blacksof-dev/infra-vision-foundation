import { Metadata } from "next";
import ContactBanner from "./01_banner";
import ContactForm from "./contactUsForm";


export const metadata: Metadata = {
  title: 'Contact The Infravision Foundation | India’s infra think tank',
  description:'Get in touch with The Infravision Foundation, India’s first think tank dedicated to solving core infrastructure challenges through action research & advocacy.', 
  keywords: ['think tank india','think tanks','the infravision foundation','infravision foundation','policy research','public policy','Get Involved'],
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
    canonical: 'https://theinfravisionfoundation.org/get-involved',
  },
  authors: [{ name: 'The Infravision Foundation' }],
  publisher: 'The Infravision Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theinfravisionfoundation.org/get-involved',
    siteName: 'The Infravision Foundation',
    title: 'Contact The Infravision Foundation | India’s infra think tank',
    description:
      'Get in touch with The Infravision Foundation, India’s first think tank dedicated to solving core infrastructure challenges through action research & advocacy.',
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
    title: 'Contact The Infravision Foundation | India’s infra think tank',
    description:
      'Get in touch with The Infravision Foundation, India’s first think tank dedicated to solving core infrastructure challenges through action research & advocacy.',
    images: ['https://theinfravisionfoundation.org/assets/og/ogImage.png'],
  },
};
export default function ContactUs() {
  return (
    <>
      <ContactBanner />
      <ContactForm/>
    </>
  );
}
