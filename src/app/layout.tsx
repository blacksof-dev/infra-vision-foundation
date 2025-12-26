
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/_components/organism/footer";
import Header from "@/_components/organism/header";
import { HeaderProvider } from "@/context/useHeader";
import Provider from "./queryProvider";
import Image from "next/image";



export const metadata: Metadata = {
  title: 'The Infravision Foundation | India’s First Infra Think Tank',
  description:'As a think tank dedicated to infrastructure-led progress, we shape public discourse & policy interventions in infrastructure through action research & advocacy.',
  keywords: ['think tank india','think tanks','the infravision foundation','infravision foundation','policy research','public policy'],
  icons: {
    icon: [
      { url: 'https://theinfravisionfoundation.org/favicon16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'https://theinfravisionfoundation.org/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
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
    canonical: 'https://theinfravisionfoundation.org/',
  },
  authors: [{ name: 'The Infravision Foundation' }],
  publisher: 'The Infravision Foundation',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theinfravisionfoundation.org/',
    siteName: 'The Infravision Foundation',
    title: 'The Infravision Foundation | India’s First Infra Think Tank',
    description:
      'As a think tank dedicated to infrastructure-led progress, we shape public discourse & policy interventions in infrastructure through action research & advocacy.',
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
    title: 'The Infravision Foundation | India’s First Infra Think Tank',
    description:
      'As a think tank dedicated to infrastructure-led progress, we shape public discourse & policy interventions in infrastructure through action research & advocacy.',
    images: ['https://theinfravisionfoundation.org/assets/og/ogImage.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={` antialiased `}>

        <HeaderProvider>
          <Header />
        <Image
        src="/logo.png"
        alt="The Infravision Foundation"
        width={200}
        height={60}
        priority
      />
          <Provider>
           {children}
          </Provider>
         
          <Footer />
        </HeaderProvider>
      </body>
    </html>
  );
}
