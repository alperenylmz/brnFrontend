import "./globals.css";
import { poppins } from "@/config/fonts";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { ellipses, walletEllipses } from "@/helpers/strings";
import Link from "next/link";
import { BsTelegram } from "react-icons/bs";
import Image from "next/image";

export const metadata = {
  title: "BRN Token",
  description:
    "BRN connects the metaverse with infrastructures powered by our token. Connecting these bridges happens through the game we develop.",
};

// Register String Extensions
String.prototype.ellipses = ellipses;
String.prototype.walletEllipses = walletEllipses;

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.regular.className} bg-primary-dark text-white overflow-x-clip`}
      >
        <div
          className={
            "fixed top-0 md:absolute left-[50%] translate-x-[-50%] flex items-center justify-center z-[9999]"
          }
        >
          <Navigation />
        </div>
        {children}
        {/*<div
          title="Join BRN Tap"
          className={
            "flex justify-center fixed bottom-5  right-[185px] lg:right-[200px] bg-primary rounded-full w-[60px] z-[999]"
          }
        >
          <Link href={"https://t.me/brntap_bot"} target={"_blank"}>
            <div className="relative h-[60px] w-[60px]">
              <Image
                src="/assets/images/endless.png"
                fill
                className="object-cover "
                alt=""
              />
            </div>
          </Link>
        </div>*/}
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
        <div className="bg-primary">
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
