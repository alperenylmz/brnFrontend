"use client";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import { archivo_black } from "@/config/fonts";
import React, { useState, useEffect } from "react";
import { EVENT, BRN, BOSS } from "@/helpers/strings";
import Image from "next/image";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { getStrapiMedia } from "@/lib/media";

interface ImageFormats {
  thumbnail?: {
    url: string;
  };
  large?: {
    url: string;
  };
  medium?: {
    url: string;
  };
  small?: {
    url: string;
  };
}

interface ImageAttributes {
  name: string;
  url: string;
  formats?: ImageFormats;
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface ModeImage {
  data: ImageData[];
}

interface ArenaMode {
  id: number;
  ModeDescription: string;
  Title: string;
  ModeImages: ModeImage;
}

interface ArenaAttributes {
  Title: string;
  ArenaMode?: ArenaMode[];
  Description?: string;
  ArenaImages?: {
    data: ImageData[];
  };
}

interface ApiResponse {
  data: {
    attributes: {
      EventArena: ArenaAttributes;
      BossArena: ArenaAttributes;
      BrnArena: ArenaAttributes;
    };
  };
}

export default function DefaultTabs() {
  const [value, setValue] = useState<number>(0);
  const [arena, setArena] = useState<string>(EVENT);
  const [arenasData, setArenasData] = useState<ApiResponse | null>(null);
  const [arenaData, setArenaData] = useState<ArenaAttributes | null>(null);

  useEffect(() => {
    const fetchArenasData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/map?populate[EventArena][populate][ArenaMode][populate][ModeImages]=*&populate[BossArena][populate][ArenaMode][populate][ModeImages]=*&populate[BrnArena][populate][ArenaImages]=*",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // API'den dönen veriyi kontrol edin
        setArenasData(data);
      } catch (error) {
        console.error("Error fetching arenas data:", error);
      }
    };
    fetchArenasData();
  }, []);

  useEffect(() => {
    if (!arenasData || !arena) {
      setArenaData(null);
      return;
    }

    const getData = (arena: string): ArenaAttributes | null => {
      if (arenasData && arenasData.data && arenasData.data.attributes) {
        const { attributes } = arenasData.data;
        switch (arena) {
          case BRN:
            return attributes.BrnArena;
          case EVENT:
            return attributes.EventArena;
          case BOSS:
            return attributes.BossArena;
          default:
            return null;
        }
      }
      return null;
    };

    const data = getData(arena);
    console.log("Arena Data:", data); // Arena verisini kontrol edin
    setArenaData(data);
  }, [arenasData, arena]);

  const is = (_arena: string) => _arena === arena;

  return (
    <main className="flex flex-col items-center bg-gradient-home justify-center">
      <div
        className={"flex items-center justify-center min-h-[50vh] py-16 w-full"}
      >
        <div className={"w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center"}>
          <h2
            className={`${archivo_black.className} uppercase text-2xl lg:text-5xl mb-5`}
          >
            MAPS
          </h2>
          <p>
            Be up to date with what we are about and the current waves of web3
            and the metaverse.
          </p>
        </div>
      </div>
      <div className={"w-[90vw] text-white"}>
        <div
          className={"grid grid-cols-3 items-center justify-start w-full pb-8"}
        >
          <button
            onClick={() => {
              setValue(0);
              setArena(EVENT);
            }}
            className={`${
              archivo_black.className
            } text-md md:text-md border-2 border-r-2 rounded-l-xl border-accent p-3 px-8 ${
              arena === EVENT ? "bg-accent text-white" : "text-white"
            }`}
          >
            Event Arena
          </button>
          <button
            onClick={() => {
              setValue(0);
              setArena(BOSS);
            }}
            className={`${
              archivo_black.className
            } text-md md:text-md border-t-2 border-r-2 border-b-2 border-accent p-3 px-8 ${
              arena === BOSS ? "bg-accent text-white" : "text-white"
            }`}
          >
            Boss Arena
          </button>
          <button
            onClick={() => {
              setValue(0);
              setArena(BRN);
            }}
            className={`${
              archivo_black.className
            } text-md md:text-md border-t-2 border-r-2 border-b-2 rounded-r-xl border-accent p-3 px-8 ${
              arena === BRN ? "bg-accent text-white" : "text-white"
            }`}
          >
            BRN Arena
          </button>
        </div>
        {arenaData ? (
          is(BRN) && arenaData.ArenaImages ? (
            <div className={"grid grid-cols-1 gap-8 py-8 min-h-[200px]"}>
              <span>{arenaData.Description}</span>
              <div
                className={
                  "grid grid-cols-1 md:grid-cols-3 gap-5 w-full h-full"
                }
              >
                {arenaData.ArenaImages.data.map((image, index) => (
                  <div
                    key={index}
                    className="group relative flex items-center justify-center h-[250px] lg:min-h-[400px] w-full rounded-xl md:rounded-2xl overflow-hidden"
                  >
                    <div
                      className="shadow-xl border border-transparent rounded-lg overflow-hidden transition-transform duration-300"
                      style={{
                        width: "95%", // Görselin %95 genişliğinde olması için
                        height: "95%", // Görselin %95 yüksekliğinde olması için
                        boxShadow: "0 0 10px 5px rgba(58, 123, 253, 0.6)", // Light glow effect
                      }}
                    >
                      <img
                        src={`http://localhost:1337${
                          image.attributes.formats?.small?.url ||
                          image.attributes.url
                        }`}
                        className="w-full h-full object-cover rounded-lg"
                        alt={image.attributes.name || "Arena Image"}
                      />
                    </div>
                    <div
                      className={
                        "absolute transition-all bottom-[-200px] group-hover:bottom-0 p-5 bg-gradient-to-r from-accent via-secondary to-pink-500 w-full rounded-b-lg"
                      }
                    >
                      <h3 className={`${archivo_black.className} text-white`}>
                        {index + 1}vs{index + 1}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            arenaData.ArenaMode && (
              <Tabs.Group
                aria-label="Default tabs"
                style="underline"
                className={"border-none"}
                onActiveTabChange={(tab) => {
                  setValue(tab);
                }}
              >
                {arenaData.ArenaMode.map((arenaMode, index) => (
                  <Tabs.Item
                    active={index === value}
                    title={
                      <span className="text-secondary">
                        {arenaMode.Title.toUpperCase()}
                      </span>
                    }
                    key={index}
                    className={"border-none"}
                  >
                    <div
                      className={
                        "grid grid-cols-1 md:grid-cols-2 gap-8 py-8 min-h-[200px]"
                      }
                    >
                      <div className={"group relative w-full"}>
                        {/* Swiper için navigasyon butonları */}
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition duration-300">
                          <button
                            type="button"
                            className={`prev_${arenaMode.Title.toLowerCase().replace(
                              /\s+/g,
                              "_"
                            )} bg-white p-2 md:p-3 rounded-full text-primary ml-3`}
                          >
                            <FiArrowLeft size={32} />
                          </button>
                        </div>
                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition duration-300">
                          <button
                            type="button"
                            className={`next_${arenaMode.Title.toLowerCase().replace(
                              /\s+/g,
                              "_"
                            )} bg-white p-2 md:p-3 rounded-full text-primary mr-3`}
                          >
                            <FiArrowRight size={32} />
                          </button>
                        </div>
                        <Swiper
                          loop={true}
                          slidesPerView={1}
                          modules={[Navigation]}
                          spaceBetween={20}
                          navigation={{
                            nextEl: `.next_${arenaMode.Title.toLowerCase().replace(
                              /\s+/g,
                              "_"
                            )}`,
                            prevEl: `.prev_${arenaMode.Title.toLowerCase().replace(
                              /\s+/g,
                              "_"
                            )}`,
                          }}
                        >
                          {arenaMode.ModeImages.data.map((image, imgIndex) => (
                            <SwiperSlide key={imgIndex}>
                              <div className="relative flex items-center justify-center h-[200px] lg:min-h-[400px] w-full rounded-xl md:rounded-2xl overflow-hidden">
                                <div
                                  className="shadow-xl border border-transparent rounded-lg overflow-hidden transition-transform duration-300"
                                  style={{
                                    width: "95%", // Görselin %95 genişliğinde olması için
                                    height: "95%", // Görselin %95 yüksekliğinde olması için
                                    boxShadow:
                                      "0 0 10px 5px rgba(58, 123, 253, 0.6)", // Light glow effect
                                  }}
                                >
                                  <img
                                    src={
                                      image?.attributes?.formats?.large?.url
                                        ? getStrapiMedia(
                                            image.attributes.formats.large
                                          )
                                        : "/path/to/default_image.png"
                                    }
                                    className="w-full h-full object-cover"
                                    alt={image.attributes.name || "Arena Image"}
                                  />
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <span>{arenaMode.ModeDescription}</span>
                    </div>
                  </Tabs.Item>
                ))}
              </Tabs.Group>
            )
          )
        ) : (
          <p>Loading arenas...</p>
        )}
      </div>
    </main>
  );
}
