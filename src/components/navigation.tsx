"use client";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/config/fonts";
import { FiMenu, FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
//import useMarkets from "@/hooks/useMarkets";
import { BiMapPin } from "react-icons/bi";
import { GiNinjaHeroicStance } from "react-icons/gi";
import useMarkets from "@/hooks/useMarkets";
import useMediaQuery from "@/hooks/useMediaQuery";

const Navigation = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [modalIslOpen, setModalIsOpen] = useState(false);
  const [gameModalIslOpen, setGameModalIsOpen] = useState(false);
  const toggleNavigation = () => setShowNavigation(!showNavigation);
  const [showDropdown, setShowDropdown] = useState(0);
  const [showGameDropdown, setShowGameShowDropdown] = useState(0);
  const showDropdownRef = useRef(showDropdown);
  const showGameDropdownRef = useRef(showGameDropdown);
  const [markets] = useMarkets();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size

  let API_HOST = "https://test.brntoken.net";

  useEffect(() => {
    showDropdownRef.current = showDropdown;
    showGameDropdownRef.current = showGameDropdown;
  }, [showDropdown, showGameDropdown]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, []);

  return (
    <div
      className={`${
        modalIslOpen || gameModalIslOpen
          ? "z-100 bg-transparent"
          : "bg-primary-dark"
      } md:bg-transparent md:h-auto flex z-100 items-start justify-center w-[100vw] overflow-x-clip`}
    >
      {(modalIslOpen || gameModalIslOpen) && (
        <div className={"min-h-screen bg-red-500"} />
      )}
      <div
        className={"flex items-center justify-between w-[90vw] lg:w-[80vw] p-5"}
      >
        <Link href={"/"}>
          <div
            className={
              "relative h-[30px] w-[150px] lg:h-[50px] lg:w-[200px] overflow-visible"
            }
          >
            <Image
              src={"/assets/images/brnmetaversesoftwareıncWhite.png"}
              alt="BRN Metaverse Logo"
              width={200}
              height={70}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                position: "absolute", // Görseli kartın dışına taşır
                top: "-30px", // Görseli yukarı taşır
                left: "0",
              }}
            />
          </div>
        </Link>

        <button onClick={toggleNavigation} className={"md:hidden"}>
          <FiMenu size={32} />
        </button>
        {/* */}

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
            } flex flex-col z-50 md:flex-row items-center justify-center gap-5 h-full`}
          >
            {[
              { url: "/", text: "Home" },
              { url: "/token", text: "BRN" },
              {
                url: "#",
                text: "",
                component: (
                  <div
                    className={"md:flex relative z-50 cursor-pointer"}
                    key={Date.now()}
                  >
                    <div
                      className={`group relative ${poppins.bold.className}`}
                      onMouseLeave={() => {
                        setTimeout(() => {
                          if (showGameDropdownRef.current == 1) {
                            setShowGameShowDropdown(0);
                          }
                        }, 300);
                      }}
                      onMouseEnter={() => setShowGameShowDropdown(1)}
                    >
                      <button
                        onClick={() => {
                          toggleNavigation();
                          setGameModalIsOpen(true);
                        }}
                        className={`hover:text-accent ${
                          activeLink.startsWith("/game")
                            ? "text-accent"
                            : "text-white"
                        } rounded-lg text-center`}
                      >
                        Game
                      </button>

                      <div
                        onMouseLeave={() => setShowGameShowDropdown(0)}
                        onMouseEnter={() => setShowGameShowDropdown(2)}
                        id={"game-dropdown"}
                        className={`hidden md:inline transition-all absolute  overflow-clip ${
                          showGameDropdown > 0
                            ? "flex opacity-100 visible top-12"
                            : "opacity-0 invisible top-32"
                        } flex-col z-40 w-[250px] h-auto bg-primary rounded-xl`}
                      >
                        <Link
                          href={"/game/hero"}
                          className={"hover:bg-cDark"}
                          onClick={() => {
                            setActiveLink("/game/hero");
                            setShowNavigation(false);
                          }}
                        >
                          <div
                            className={`flex gap-3 items-center p-3 text-sm ${poppins.bold.className} border-b border-primary-light hover:bg-primary-dark`}
                          >
                            <GiNinjaHeroicStance size={32} />
                            <span>Heroes</span>
                          </div>
                        </Link>

                        <Link
                          href={"/game/map"}
                          className={"hover:bg-primary-dark"}
                          onClick={() => {
                            setActiveLink("/game/map");
                            setShowNavigation(false);
                          }}
                        >
                          <div
                            className={`flex gap-3 items-center p-3 text-sm ${poppins.bold.className} border-b border-primary-light hover:bg-primary-dark`}
                          >
                            <BiMapPin size={32} />
                            <span>Map</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
              // {url: 'https://brnmarkets.io', text: 'NFT Marketplace', newTab: true},
              {
                url: "https://stake.brntoken.net",
                text: "Stake",
                newTab: true,
              },
              { url: "/roadmap", text: "Roadmap" },
              { url: "/team", text: "Team" },
              { url: "/blog", text: "Blog" },
              { url: "/brain", text: "Brain" },
              { url: "https://dracoin.net", text: "Dracarys", newTab: true },
            ].map((link, index) =>
              link.component ? (
                link.component
              ) : (
                <Link
                  href={link.url}
                  target={link.newTab ? "_blank" : "_self"}
                  key={index}
                  className={`${
                    activeLink == link.url ? "text-accent" : ""
                  } hover:text-accent ${poppins.bold.className}`}
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
              )
            )}

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

            <div className={"hidden md:flex relative cursor-pointer"}>
              <div
                className={`group relative ${poppins.bold.className}`}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (showDropdownRef.current == 1) {
                      setShowDropdown(0);
                    }
                  }, 300);
                }}
                onMouseEnter={() => setShowDropdown(1)}
              >
                <button
                  className={
                    "bg-white z-50 text-primary p-2 rounded-lg min-w-[100px] text-center"
                  }
                >
                  Buy
                </button>

                <div
                  onMouseLeave={() => setShowDropdown(0)}
                  onMouseEnter={() => setShowDropdown(2)}
                  id={"dropdown"}
                  className={`transition-all absolute  overflow-clip ${
                    showDropdown > 0
                      ? "flex opacity-100 visible top-12"
                      : "opacity-0 invisible top-32"
                  } flex-col z-40 w-[250px] h-auto bg-primary rounded-xl`}
                >
                  {markets.map((listing, index) => (
                    <a
                      href={listing.token_url}
                      target={"_blank"}
                      key={index}
                      className={"hover:bg-cDark"}
                    >
                      <div
                        className={`flex gap-3 items-center p-3 text-sm ${poppins.bold.className} border-b border-primary-light hover:bg-primary-dark`}
                      >
                        <Image
                          src={`${API_HOST}${listing.image_path}`}
                          height={30}
                          width={30}
                          className={"rounded-full"}
                          alt={listing.label}
                        />
                        {listing.name}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  BOTTOM MODAL PANEL
                <div className={`lg:hidden fixed left-0 px-8 py-5 transition-all ${modalIslOpen ? 'bottom-0 opacity-100 visible' : 'bottom-[-100vh] invisible opacity-0'} items-center justify-center w-[100vw] bg-primary z-10`}>
                    {markets?.map((listing: any, index: number) => (
                        <a href={listing.token_url} target={'_blank'} key={index} className={'hover:bg-cDark'}>
                            <div className={'flex gap-3 items-center p-3 text-sm'}>
                                <img src={`${API_HOST}${listing.image_path}`} height={30} width={30} className={'rounded-full'} alt={listing.name}/>
                                {listing.name}
                            </div>
                        </a>
                    ))}
                    <button onClick={()=> setModalIsOpen(false)} className={'bg-primary-light p-5 w-full rounded-full mt-5'}>
                        Close
                    </button>
                </div>
                 BOTTOM MODAL PANEL  */}

      {/*  BOTTOM GAME MODAL PANEL  */}
      <div
        style={{ position: "fixed" }}
        className={`lg:hidden fixed left-0 px-8 py-5 transition-all ${
          gameModalIslOpen
            ? "bottom-0 z-50 opacity-100 visible"
            : "bottom-[-100vh] invisible opacity-0"
        } items-center justify-center w-[100vw] bg-primary z-10`}
      >
        <div
          className={`transition-all overflow-clip flex-col z-40 w-full h-auto bg-primary rounded-xl`}
        >
          <Link
            href={"/game/hero"}
            className={"hover:bg-cDark"}
            onClick={() => {
              setActiveLink("/game/hero");
              setShowNavigation(false);
              setGameModalIsOpen(false);
            }}
          >
            <div
              className={`flex gap-3 items-center p-3 py-5 text-sm ${poppins.bold.className} border-b border-primary-light hover:bg-primary-dark`}
            >
              <GiNinjaHeroicStance size={32} />
              <span>Heroes</span>
            </div>
          </Link>

          <Link
            href={"/game/map"}
            className={"hover:bg-primary-dark"}
            onClick={() => {
              setActiveLink("/game/map");
              setShowNavigation(false);
              setGameModalIsOpen(false);
            }}
          >
            <div
              className={`flex gap-3 items-center p-3 py-5 text-sm ${poppins.bold.className} border-b border-primary-light hover:bg-primary-dark`}
            >
              <BiMapPin size={32} />
              <span>Map</span>
            </div>
          </Link>
        </div>
        <button
          onClick={() => setGameModalIsOpen(false)}
          className={"bg-primary-light p-5 w-full rounded-full mt-5"}
        >
          Close
        </button>
      </div>
      {/*   BOTTOM GAME MODAL PANEL  */}
    </div>
  );
};

export default Navigation;
