"use client";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/config/fonts";
import { FiMenu, FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";

const GameHeader = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [activeLink, setActiveLink] = useState("/game");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleNavigation = () => setShowNavigation(!showNavigation);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size
  const router = useRouter();

  return (
    <div
      className={`${
        showNavigation ? "z-100 bg-transparent" : "bg-primary-dark"
      } md:bg-transparent md:h-auto flex z-100 items-start justify-center w-[100vw] overflow-x-clip`}
    >
      <div className={"flex items-center justify-between w-[90vw] lg:w-[80vw] p-5"}>
        <Link href={"/game"}>
          <div
            className={
              "relative h-[30px] w-[150px] lg:h-[50px] lg:w-[200px] overflow-visible"
            }
          >
            <Image
              src={"/assets/images/eralogo.png"}
              alt="BRN Metaverse Logo"
              width={200}
              height={70}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                position: "absolute",
                top: "-10px",
                left: "0",
              }}
            />
          </div>
        </Link>

        <button onClick={toggleNavigation} className={"md:hidden"}>
          <FiMenu size={32} />
        </button>

        <div
          className={`fixed top-0 left-0 w-[100vw] lg:w-auto h-[100vh] md:h-auto lg:relative bg-primary-dark lg:bg-transparent z-[99] transition-all ${
            showNavigation ? "left-0" : "left-[100vw] lg:left-0"
          }`}
        >
          <div className={"md:hidden absolute top-[30px] right-[30px]"}>
            <button
              onClick={toggleNavigation}
              className={"p-3 bg-accent rounded-full"}
            >
              <FiX size={22} />
            </button>
          </div>
          <div
            className={`${
              isMobile ? "text-3xl" : ""
            } flex flex-col z-50 md:flex-row items-center justify-center gap-8 h-full`}
          >
            {[
              { url: "/game/hero", text: "Rangers" },
              { url: "/game/map", text: "Arenas" },
              { url: "/game/rank", text: "Rank" },
              { url: "/game/pet", text: "Pets" },
              { url: "/game/items", text: "Items" },
              { url: "/game/marketplace", text: "Marketplace" },
            ].map((link, index) => (
              <Link
                href={link.url}
                key={index}
                className={`${
                  activeLink == link.url ? "text-accent" : ""
                } hover:text-accent ${poppins.bold.className} flex items-center gap-2`}
              >
                <button
                  onClick={() => {
                    setActiveLink(link.url);
                    setShowNavigation(false);
                  }}
                >
                  {link.text}
                </button>
              </Link>
            ))}
            <button
              onClick={() => {
                router.push("/");
              }}
              className={
                " bg-white text-primary p-2 rounded-lg min-w-[100px] text-center"
              }
            >
              <span className="text-primary font-bold">BRN Metaverse</span>
            </button>
            <button
              onClick={() => {
                toggleNavigation();
                setModalIsOpen(true);
              }}
              className={
                "md:hidden bg-white text-primary p-2 rounded-lg min-w-[100px] text-center"
              }
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
