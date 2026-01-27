import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/_components/organism/footer";
import Header from "@/_components/organism/header";
import { HeaderProvider } from "@/context/useHeader";
import Provider from "./queryProvider";
 
import Script from "next/script";
import GoogleAnalytics from "./googleAnalytics";


export const metadata: Metadata = {
  title: 'The Infravision Foundation | India’s First Infra Think Tank',
  description: 'As a think tank dedicated to infrastructure-led progress, we shape public discourse & policy interventions in infrastructure through action research & advocacy.',
  keywords: ['think tank india', 'think tanks', 'the infravision foundation', 'infravision foundation', 'policy research', 'public policy'],
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
    canonical: 'https://theinfravisionfoundation.org/',
     languages: {
      'x-default': 'https://theinfravisionfoundation.org/',
    },
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
      <GoogleAnalytics/>
      <head>
        <Script
         id="corporation-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Infravision Foundation",
              url: "https://theinfravisionfoundation.org",
              logo: "https://theinfravisionfoundation.org/logo.png",
               sameAs: [
               'https://www.linkedin.com/company/the-infravision-foundation/?originalSubdomain=in',
                'https://www.youtube.com/@theinfravisionfoundation',
                'https://www.instagram.com/theinfravisionfoundation/',
                'https://x.com/TheInfravision?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
              ],
            }),
          }}
        />
         <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'The Infravision Foundation',
              url: 'https://theinfravisionfoundation.org',
            }),
          }}
        />
      </head>
      <body className={` antialiased `}>
        <HeaderProvider>
          <Header />

          
          <Provider>
            {children}
          </Provider>

          <Footer />
        </HeaderProvider>
      </body>
    </html>
  );
}
