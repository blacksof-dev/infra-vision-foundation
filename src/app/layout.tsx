import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/_components/organism/footer";
import Header from "@/_components/organism/header";
import { HeaderProvider } from "@/context/useHeader";
import Provider from "./queryProvider";
<<<<<<< HEAD
import ErrorBoundary from "./errorBoundaries";
=======
>>>>>>> 220ebb1993f67443f659b5661a6320e7d44aeab1

export const metadata: Metadata = {
  title: "The Infravision Foundation",
  description:
    "The Infravision Foundation is dedicated to advancing infrastructure knowledge, research, and engagement in India.",
  keywords:
    "infrastructure, research, India, foundation, knowledge, engagement, policy",
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
<<<<<<< HEAD
        <Provider>
          <HeaderProvider>
            <Header />
            <ErrorBoundary>{children}</ErrorBoundary>
            <Footer />
          </HeaderProvider>
        </Provider>
=======
        <HeaderProvider>
          {/* <Header /> */}
          <Provider>{children}</Provider>
          {/* <Footer /> */}
        </HeaderProvider>
>>>>>>> 220ebb1993f67443f659b5661a6320e7d44aeab1
      </body>
    </html>
  );
}
