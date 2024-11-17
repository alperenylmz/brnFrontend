"use client";
import "./globals.css";
import { poppins } from "@/config/fonts";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import GameHeader from "@/components/gameheader";
import { ellipses, walletEllipses } from "@/helpers/strings";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";
import useMediaQuery from "@/hooks/useMediaQuery"; // Import the hook
import { usePathname } from "next/navigation";
import { useState } from "react";

// Register String Extensions
String.prototype.ellipses = ellipses;
String.prototype.walletEllipses = walletEllipses;

function RootLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Determine whether to use GameHeader or default Navigation
  const isGamePage = pathname.startsWith("/game");

  return (
    <html lang="en">
      <head>
        <title>BRN Metaverse</title>
        <meta
          name="description"
          content="BRN connects the metaverse with infrastructures powered by our token. Connecting these bridges happens through the game we develop."
        />
        <link rel="canonical" href="https://www.brnmetaverse.net" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${
          poppins.regular.className
        } bg-primary-dark text-white overflow-x-hidden ${
          isMobile ? "min-h-screen flex flex-col justify-between" : ""
        }`}
      >
        {/* Navigation Bar */}
        <div
          className={
            "fixed top-0 md:absolute left-[50%] translate-x-[-50%] flex items-center justify-center z-[9999]"
          }
        >
          {isGamePage ? <GameHeader /> : <Navigation />}
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
