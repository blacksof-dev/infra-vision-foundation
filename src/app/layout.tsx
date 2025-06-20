import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/_components/organism/footer";
import Header from "@/_components/organism/header";
import { HeaderProvider } from "@/context/useHeader";


export const metadata: Metadata = {
  title: "The Infravision Foundation",
  description: "The Infravision Foundation is dedicated to advancing infrastructure knowledge, research, and engagement in India.",
  keywords: "infrastructure, research, India, foundation, knowledge, engagement, policy",
  authors: [{ name: "The Infravision Foundation" }],
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
          {children}
          <Footer />
        </HeaderProvider>
      </body>
    </html>
  );
}
