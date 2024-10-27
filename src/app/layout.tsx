"use client";
import "./globals.css";
import { poppins } from "@/config/fonts";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { ellipses, walletEllipses } from "@/helpers/strings";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";
import useMediaQuery from "@/hooks/useMediaQuery"; // Import the hook
import Head from "next/head";

{
  /*export const metadata = { title: "BRN Token", description: "BRN connects the metaverse with infrastructures powered by our token. Connecting these bridges happens through the game we develop.", }; */
}

// Register String Extensions
String.prototype.ellipses = ellipses;
String.prototype.walletEllipses = walletEllipses;

function RootLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size

  return (
    <html lang="en">
      <body
        className={`${
          poppins.regular.className
        } bg-primary-dark text-white overflow-x-hidden ${
          isMobile ? "min-h-screen flex flex-col justify-between" : ""
        }`}
      >
        {/* Navigation Bar */}
        <div
          className={`absolute top-0 w-full ${
            isMobile ? "left-0" : "md:left-0 md:w-full"
          } flex items-center justify-center z-[9999]`}
        >
          <Navigation />
        </div>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </main>

        {/* Telegram Button for non-mobile screens */}
        {!isMobile && (
          <div
            className={
              "flex justify-center fixed bottom-5 right-5 p-3 lg:p-5 bg-primary rounded-full min-w-[150px] border border-gray-100 z-[999]"
            }
          >
            <Link href={"https://t.me/filizgr"} target={"_blank"}>
              <div className={"flex items-center gap-2"}>
                <BsTelegram size={26} />
                <span>Live Support</span>
              </div>
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="bg-primary w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
