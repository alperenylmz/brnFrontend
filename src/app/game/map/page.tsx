"use client";
import { CustomFlowbiteTheme, Tabs } from "flowbite-react";
import { archivo_black, poppins } from "@/config/fonts";
import React, { useState, useEffect, useRef } from "react";
import { EVENT, BRN, BOSS } from "@/helpers/strings";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getStrapiMedia } from "@/lib/media";
import useMediaQuery from "@/hooks/useMediaQuery";

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
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface ModeImageData {
  id: number;
  attributes: ImageAttributes;
}

interface ModeImage {
  data: ModeImageData | null;
}

interface ArenaMode {
  id: number;
  ModeDescription: string;
  Title: string;
  ModeImage: ModeImage;
}

interface ArenaAttributes {
  id: number;
  Title: string;
  ArenaMode: ArenaMode[];
}

interface ApiResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      EventArena: ArenaAttributes;
      BossArena: ArenaAttributes;
      BrnArena: ArenaAttributes;
    };
  };
}

export default function DefaultTabs() {
  const [arenasData, setArenasData] = useState<ApiResponse | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedModeImage, setSelectedModeImage] = useState<{
    [key: string]: string;
  }>({
    EventArena: "",
    BossArena: "",
    BrnArena: "",
  });
  const [selectedModeDescription, setSelectedModeDescription] = useState<{
    [key: string]: string;
  }>({
    EventArena: "",
    BossArena: "",
    BrnArena: "",
  });
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({
    EventArena: null,
    BossArena: null,
    BrnArena: null,
  });
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchArenasData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/map?populate[EventArena][populate][ArenaMode][populate][ModeImage]=*&populate[BossArena][populate][ArenaMode][populate][ModeImage]=*&populate[BrnArena][populate][ArenaMode][populate][ModeImage]=*",
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
        setArenasData(data);

        // Set default background images and descriptions for each arena
        setSelectedModeImage({
          EventArena: data.data.attributes.EventArena.ArenaMode[0]?.ModeImage
            .data?.attributes.url
            ? `http://localhost:1337${data.data.attributes.EventArena.ArenaMode[0].ModeImage.data.attributes.url}`
            : "",
          BossArena: data.data.attributes.BossArena.ArenaMode[0]?.ModeImage.data
            ?.attributes.url
            ? `http://localhost:1337${data.data.attributes.BossArena.ArenaMode[0].ModeImage.data.attributes.url}`
            : "",
          BrnArena: data.data.attributes.BrnArena.ArenaMode[0]?.ModeImage.data
            ?.attributes.url
            ? `http://localhost:1337${data.data.attributes.BrnArena.ArenaMode[0].ModeImage.data.attributes.url}`
            : "",
        });
        setSelectedModeDescription({
          EventArena:
            data.data.attributes.EventArena.ArenaMode[0]?.ModeDescription || "",
          BossArena:
            data.data.attributes.BossArena.ArenaMode[0]?.ModeDescription || "",
          BrnArena:
            data.data.attributes.BrnArena.ArenaMode[0]?.ModeDescription || "",
        });
      } catch (error) {
        console.error("Error fetching arenas data:", error);
      }
    };
    fetchArenasData();
  }, []);

  const handleModeSelection = (
    arena: string,
    imageUrl: string,
    modeDescription: string
  ) => {
    const fullImageUrl = imageUrl ? `http://localhost:1337${imageUrl}` : "";
    setSelectedModeImage((prev) => ({ ...prev, [arena]: fullImageUrl }));
    setSelectedModeDescription((prev) => ({
      ...prev,
      [arena]: modeDescription,
    }));

    // Reset and play the video for the selected arena
    if (videoRefs.current[arena]) {
      videoRefs.current[arena].pause();
      videoRefs.current[arena].currentTime = 0;
      videoRefs.current[arena].load();
      videoRefs.current[arena].play();
    }
  };

  const renderArenaSection = (
    arenaKey: string,
    arenaData: ArenaAttributes | undefined
  ) => {
    if (!arenaData) return null;

    const isBrnArena = arenaKey === "BrnArena";

    return (
      <div className="flex flex-col items-center justify-center w-full h-screen relative">
        {!isBrnArena && selectedModeImage[arenaKey] && (
          <video
            ref={(el) => (videoRefs.current[arenaKey] = el)}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
          >
            <source src={selectedModeImage[arenaKey]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Top Left Gradient Span */}
        <span className="absolute top-0 left-0 z-0 w-1/2 h-1/2 bg-gradient-to-br from-black to-transparent" />
        {/* Top Right Gradient Span */}
        <span className="absolute top-0 right-0 z-0 w-1/2 h-1/2 bg-gradient-to-bl from-black to-transparent" />
        {/* Bottom Left Gradient Span */}
        <span className="absolute bottom-0 left-0 z-0 w-1/2 h-1/2 bg-gradient-to-tr from-black to-transparent" />
        {/* Bottom Right Gradient Span */}
        <span className="absolute bottom-0 right-0 z-0 w-1/2 h-1/2 bg-gradient-to-tl from-black to-transparent" />
        {/* Left Gradient Span */}
        <span className="absolute left-0 top-0 z-0 h-full w-4 bg-gradient-to-r from-black to-transparent" />
        {/* Right Gradient Span */}
        <span className="absolute right-0 top-0 z-0 h-full w-4 bg-gradient-to-l from-black to-transparent" />

        <h2
          className={`${archivo_black.className} text-5xl z-10 font-bold mt-24 text-center text-white glow-effect`}
        >
          {arenaData.Title}
        </h2>
        {isMobile ? (
          <Swiper
            ref={swiperRef}
            direction="horizontal" // Yatay düzen
            slidesPerView="auto" // Elemanların doğal genişliğine göre gösterim
            spaceBetween={0} // Elemanlar arasında boşluk bırakma
            className="mySwiper"
            navigation={true}
          >
            {arenaData.ArenaMode.map((mode, index) => (
              <SwiperSlide
                key={index}
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() =>
                    handleModeSelection(
                      arenaKey,
                      mode.ModeImage.data?.attributes.url || "",
                      mode.ModeDescription
                    )
                  }
                  className={`px-4 py-2 text-white text-center uppercase cursor-pointer rounded-lg ${
                    selectedModeImage[arenaKey] ===
                    `http://localhost:1337${mode.ModeImage.data?.attributes.url}`
                      ? "bg-accent"
                      : "bg-transparent"
                  }`}
                  style={{
                    minWidth: "fit-content",
                    background:
                      selectedModeImage[arenaKey] ===
                      `http://localhost:1337${mode.ModeImage.data?.attributes.url}`
                        ? "rgba(0, 0, 0, 0.7)"
                        : "transparent",
                  }}
                >
                  {mode.Title}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex flex-row items-start w-[90vw] h-[600px] overflow-clip p-8 mt-16">
            <div className={"hidden md:block h-[600px] w-[30vw]"}>
              <Swiper
                ref={swiperRef}
                direction={"vertical"}
                slidesPerView={"auto"}
                height={600}
                allowTouchMove={false}
                className="mySwiper"
              >
                {arenaData.ArenaMode?.map((mode, index) => (
                  <SwiperSlide key={index} className={"my-5"}>
                    <div
                      data-id={index}
                      onClick={() =>
                        handleModeSelection(
                          arenaKey,
                          mode.ModeImage.data?.attributes.url || "",
                          mode.ModeDescription
                        )
                      }
                      className={`${archivo_black.className} ${
                        selectedModeImage[arenaKey] ===
                        `http://localhost:1337${
                          mode.ModeImage.data?.attributes.url || ""
                        }`
                          ? "text-accent"
                          : ""
                      } transition-all lg:hover:ml-5 text-3xl md:text-3xl lg:text-4xl uppercase select-none cursor-pointer`}
                    >
                      {mode.Title}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="bg-glass rounded-lg shadow-lg w-[35vh] flex items-end text-justify z-10 justify-end p-8 text-white ml-auto">
              <span className={`${poppins.regular.className}`}>{selectedModeDescription[arenaKey]}</span>
            </div>
          </div>
        )}

        {isBrnArena && (
          <div className="absolute flex items-center justify-center">
            <div
              className="w-[45%] h-[50%] rounded-lg flex items-center justify-center"
              style={{
                boxShadow: "0 0 20px 5px rgba(58, 123, 253, 0.6)", // Light glow effect
              }}
            >
              <video
                ref={(el) => (videoRefs.current[arenaKey] = el)}
                autoPlay
                muted
                loop
                src={selectedModeImage[arenaKey]}
                className="max-w-full max-h-full object-cover rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center z-50 bg-gradient-home justify-center overflow-hidden relative">
      {arenasData ? (
        <>
          {renderArenaSection(
            "EventArena",
            arenasData.data.attributes.EventArena
          )}
          <span className="w-full h-1.5 bg-gradient-to-r from-black via-fuchsia-900 to-black" />

          {renderArenaSection("BrnArena", arenasData.data.attributes.BrnArena)}

          <span className="w-full h-1.5 bg-gradient-to-r from-black via-fuchsia-900 to-black" />

          {renderArenaSection(
            "BossArena",
            arenasData.data.attributes.BossArena
          )}
          {/* Bottom Gradient Span */}
          <span className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-black to-transparent" />
        </>
      ) : (
        <p className="w-[50%] h-[50%] flex items-center justify-center">
          Loading arenas...
        </p>
      )}
    </main>
  );
}
