"use client";
import { archivo_black, poppins, source_sans_pro } from "@/config/fonts";
import useMediaQuery from "@/hooks/useMediaQuery";
import React from "react";
import { FaCogs, FaShieldAlt } from "react-icons/fa";
import {
  FaApple,
  FaBolt,
  FaCircleHalfStroke,
  FaGooglePlay,
} from "react-icons/fa6";

export default function Brain() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <main className="flex flex-col w-full">
      {/* First Image Section with Video */}
      <div
        className={`relative w-full ${
          isMobile ? "h-[90vh]" : "h-[100vh]"
        } bg-[url('/assets/images/BrainBg.png')] bg-cover bg-center flex flex-col justify-between`}
      >
        {/* Üstteki yazı */}
        <div className={`${isMobile ? "mx-6 mt-12 py-16" : "ml-[10%] mt-[8%]"}`}>
          <h1
            className={`${poppins.bold.className} text-white ${
              isMobile ? "text-base" : "text-[20px]"
            } font-bold flex items-center`}
          >
            <FaCircleHalfStroke className="mr-2" /> Where Digital Experiences
            Meet Advanced Protection
          </h1>

          <h1
            className={`${archivo_black.className} text-white ${
              isMobile ? "text-[40px]" : "text-[80px]"
            } font-bold mt-4`}
          >
            BRAIN
          </h1>
        </div>

        {/* Butonlar */}
        <div
          className={`${
            isMobile
              ? "mx-6 mb-6 flex-col space-y-4"
              : "ml-[10%] mb-[8%] flex space-x-4"
          } flex`}
        >
          {/* App Store Butonu */}
          <a
            href="#"
            className={`bg-white text-black p-4 rounded-xl flex items-center space-x-3 cursor-not-allowed pointer-events-none ${
              isMobile ? "w-[200px]" : "w-[250px]"
            }`}
          >
            <FaApple size={isMobile ? 24 : 36} className="text-black" />
            <div>
              <span
                className={`${source_sans_pro.className} font-bold block ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                Coming soon on
              </span>
              <span
                className={`${source_sans_pro.className} block ${
                  isMobile ? "text-lg" : "text-xl"
                } font-bold`}
              >
                App Store
              </span>
            </div>
          </a>

          {/* Google Play Butonu */}
          <a
            href="#"
            className={`bg-white text-black p-4 rounded-xl flex items-center space-x-3 cursor-not-allowed pointer-events-none ${
              isMobile ? "w-[200px]" : "w-[250px]"
            }`}
          >
            <img
              src="/assets/images/google-play-5.svg"
              alt="playstore"
              className={`${
                isMobile ? "w-[24px] h-[28px]" : "w-[32px] h-[36px]"
              } object-cover`}
            />
            <div>
              <span
                className={`${source_sans_pro.className} font-bold block ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                Coming soon on
              </span>
              <span
                className={`${source_sans_pro.className} block ${
                  isMobile ? "text-lg" : "text-xl"
                } font-bold`}
              >
                Google Play
              </span>
            </div>
          </a>
        </div>

        {/* iPhone Çerçevesi ve Video */}
        <div
          className={`absolute ${
            isMobile
              ? "right-1/2 transform translate-x-1/2 top-[30%]"
              : "right-0 top-[15%]"
          } flex`}
        >
          <img
            src="/assets/images/iphone-x-4515390_1920-2.svg"
            alt="iphoneframe"
            className={`relative z-10 ${isMobile ? "h-[300px]" : "h-[600px]"}`}
          />
          <div
            className={`absolute ${
              isMobile
                ? "right-8 top-1 w-[150px] h-[285px]"
                : "right-32 top-4 w-[305px] h-[565px]"
            } rounded-3xl overflow-hidden`}
          >
            <video
              src="/assets/videos/BrainAppdemo1.MOV"
              autoPlay
              muted
              loop
              className="h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* Second Image Section */}
      <div
        className={`relative w-full ${
          isMobile ? "h-[70vh]" : "h-[100vh]"
        } bg-[url('/assets/images/BrainBg2.png')] bg-cover bg-center flex justify-end items-center`}
      >
        <div
          className={`absolute ${
            isMobile ? "left-1/2 transform -translate-x-1/2" : "left-[0%]"
          }`}
        >
          <img
            src="/assets/images/iphone-x-4515390_1920-2.svg"
            alt="iphoneframe"
            className={`relative z-10 ${isMobile ? "h-[300px]" : "h-[700px]"}`}
          />
          <div
            className={`absolute ${
              isMobile
                ? "left-[14%] top-1 w-[150px] h-[285px]"
                : "left-[28%] top-4 w-[305px] h-[665px]"
            } rounded-3xl overflow-hidden`}
          >
            <img
              src="/assets/images/Onboarding.png"
              className="h-full object-cover rounded-3xl"
            />
          </div>
        </div>
        <div
          className={`items-center justify-center ${
            isMobile ? "w-[300px] h-[150px]" : "w-[650px] h-[300px]"
          } ${isMobile ? "mr-4" : "mr-[10%]"}`}
        >
          <h1
            className={`${poppins.regular.className} text-secondary ${
              isMobile ? "text-xl" : "text-3xl"
            }`}
          >
            Brain is a secure and user-friendly platform for the metaverse,
            offering multi-layered security and seamless usability. It protects
            digital assets, ensures smooth interactions, and sets a new standard
            for safety and engagement.
          </h1>
        </div>
      </div>

      {/* Third Image Section */}
      <div
        className={`w-full ${
          isMobile ? "h-auto py-8" : "h-[100vh]"
        } bg-[url('/assets/images/BrainBg3.png')] bg-cover bg-center`}
      >
        <div className="w-[85%] border-t-2 border-[#B2B6F4] mt-16 mx-auto"></div>

        <div className={`${isMobile ? "pb-8" : ""} items-center mt-12 justify-center text-center`}>
          <h1
            className={`${archivo_black.className} ${
              isMobile ? "text-5xl" : "text-8xl"
            }`}
          >
            KEY FEATURES
          </h1>
        </div>

        {/* Features Section */}
        <div
          className={`${
            isMobile
              ? "flex-col space-y-8 px-4"
              : "flex justify-center items-center mt-20 space-x-8"
          } flex`}
        >
          {/* Feature 1 */}
          <div
            className={`border-2 border-[#00ffff] p-6 rounded-lg ${
              isMobile ? "h-[300px] w-full" : "h-[420px] w-[420px]"
            }`}
          >
            <div
              className={`text-[#00ffff] mb-5 flex justify-center ${
                isMobile ? "text-4xl" : "text-5xl"
              }`}
            >
              <FaShieldAlt size={isMobile ? 48 : 64} />
            </div>
            <h2
              className={`${
                poppins.regular.className
              } text-secondary text-center font-bold mb-2 ${
                isMobile ? "text-xl" : "text-3xl"
              }`}
            >
              Multi-Layered Security
            </h2>
            <p className={`${isMobile ? "text-base" : "text-2xl"} mt-8`}>
              Provides advanced protection for your digital assets with
              multi-layered security protocols.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            className={`border-2 border-[#00ffff] p-6 rounded-lg ${
              isMobile ? "h-[300px] w-full" : "h-[420px] w-[420px]"
            }`}
          >
            <div
              className={`text-[#00ffff] mb-5 flex justify-center ${
                isMobile ? "text-4xl" : "text-5xl"
              }`}
            >
              <FaBolt size={isMobile ? 48 : 64} />
            </div>
            <h2
              className={`${
                poppins.regular.className
              } text-secondary text-center font-bold mb-2 ${
                isMobile ? "text-xl" : "text-3xl"
              }`}
            >
              User-Friendly Interaction
            </h2>
            <p className={`${isMobile ? "text-base" : "text-2xl"} mt-8`}>
              Offers high performance and seamless integration for a smooth user
              experience.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            className={`border-2 border-[#00ffff] p-6 rounded-lg ${
              isMobile ? "h-[300px] w-full" : "h-[420px] w-[420px]"
            }`}
          >
            <div
              className={`text-[#00ffff] mb-5 flex justify-center ${
                isMobile ? "text-4xl" : "text-5xl"
              }`}
            >
              <FaCogs size={isMobile ? 48 : 64} />
            </div>
            <h2
              className={`${
                poppins.regular.className
              } text-secondary text-center font-bold mb-2 ${
                isMobile ? "text-xl" : "text-3xl"
              }`}
            >
              Fraud Prevention
            </h2>
            <p className={`${isMobile ? "text-base" : "text-2xl"} mt-8`}>
              Fully customizable features to adapt to your needs and
              preferences.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
