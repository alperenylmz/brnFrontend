"use client";
import Image from "next/image";
import { archivo_black, poppins } from "@/config/fonts";
import { focused_industries } from "@/data";
import Link from "next/link";
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Button,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import useTokenAllocations from "@/hooks/useTokenAllocations";
import useConfig from "@/hooks/useConfig";
import formatNumber, { isiOS } from "@/helpers";
//import useMarkets from "@/hooks/useMarkets";import {FiPlay} from "react-icons/fi";
import TokenInfoSlide from "@/components/tokenInfoSlide";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";
import { FiChevronRight, FiLinkedin, FiPlay } from "react-icons/fi";
import useMarkets from "@/hooks/useMarkets";
import RoadmapCard from "@/components/roadmap-card";
import useRoadmap from "@/hooks/useRoadmap";

import BRNIcon from "../../public/favicon-16x16.png";
import ParticleBackground from "@/components/particle-background";
import HomeIcon from "../../public/assets/images/home1.png";
import DraLogo from "../../public/assets/images/DRALogo.png";
import EraLogo from "../../public/assets/images/eralogo.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import Head from "next/head";

interface HomePageData {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      Projects: {
        id: number;
        Title: string;
        Description: string;
        Tags: string;
        Link: string | null;
        logo: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              caption: string | null;
              width: number;
              height: number;
              formats: {
                thumbnail: {
                  url: string;
                };
                small?: {
                  url: string;
                };
                medium?: {
                  url: string;
                };
                large?: {
                  url: string;
                };
              };
              url: string;
            };
          };
        };
      }[];
      Team: {
        id: number;
        NameSurname: string;
        Position: string;
        url: string;
        Photo: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              caption: string | null;
              width: number;
              height: number;
              formats: {
                thumbnail: {
                  url: string;
                };
                small?: {
                  url: string;
                };
                medium?: {
                  url: string;
                };
                large?: {
                  url: string;
                };
              };
              url: string;
            };
          };
        };
      }[];
      Partners: {
        id: number;
        PartnerDescription: string;
        url: string;
        PartnerIcon: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              caption: string | null;
              width: number;
              height: number;
              formats: {
                thumbnail: {
                  url: string;
                };
                small?: {
                  url: string;
                };
              };
              url: string;
            };
          };
        };
      }[];
      Roadmap: {
        id: number;
        Year: string;
        List: {
          id: number;
          Quarter: number;
          List: {
            id: number;
            Substances: string;
            isDone: boolean;
          }[];
        }[];
      }[];
      Social: {
        id: number;
        name: string;
        url: string;
        Icon: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              caption: string | null;
              width: number;
              height: number;
              formats: null;
              url: string;
            };
          };
        };
      }[];
    };
  };
  meta: object;
}

const YearNavigation = ({
  years,
  onYearClick,
}: {
  years: string[];
  onYearClick: (year: string) => void;
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {years.map((year, index) => (
        <div key={index} className="flex items-center">
          <button
            onClick={() => onYearClick(year)}
            className="px-4 py-2 bg-white text-primary rounded-full hover:bg-accent hover:text-white transition-all"
          >
            {year}
          </button>
          {index < years.length - 1 && (
            <FaArrowRight className="text-white mx-4" size={20} />
          )}
        </div>
      ))}
    </div>
  );
};

interface CoinResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
  data: {
    BRN: {
      id: number;
      name: string;
      symbol: string;
      slug: string;
      num_market_pairs: number | null;
      date_added: string;
      tags: {
        slug: string;
        name: string;
        category: string;
      }[];
      max_supply: number | null;
      circulating_supply: number | null;
      total_supply: number | null;
      platform: {
        id: number;
        name: string;
        symbol: string;
        slug: string;
        token_address: string;
      } | null;
      is_active: number;
      infinite_supply: boolean;
      cmc_rank: number | null;
      is_fiat: number;
      self_reported_circulating_supply: number | null;
      self_reported_market_cap: number | null;
      tvl_ratio: number | null;
      last_updated: string;
      quote: {
        USD: {
          price: number | null;
          volume_24h: number | null;
          volume_change_24h: number | null;
          percent_change_1h: number | null;
          percent_change_24h: number | null;
          percent_change_7d: number | null;
          percent_change_30d: number | null;
          percent_change_60d: number | null;
          percent_change_90d: number | null;
          market_cap: number | null;
          market_cap_dominance: number | null;
          fully_diluted_market_cap: number | null;
          tvl: number | null;
          last_updated: string;
        };
      };
    }[];
  };
}

export default function Home() {
  const [showTokenInfo, setShowTokenInfo] = useState(false);
  {
    /*const [showSocialInfo, setShowSocialInfo] = useState(false);
  const [tokenAllocations] = useTokenAllocations();
  const [{ token: tokenInformation }] = useConfig("token");
  const [{ documents }] = useConfig("documents");
  const [markets] = useMarkets();
  const [modalIslOpen, setModalIsOpen] = useState(false); */
  }
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState<HomePageData>();
  const [roadmap] = useRoadmap();

  const rotatingTexts = [
    "Web3",
    "Blockchain",
    "Artificial Intelligence",
    "Gaming",
  ];
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(75);

  const [coinData, setCoinData] = useState<CoinResponse>();

  const [isPartnersVisible, setPartnersVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isJoinVisible, setJoinVisible] = useState(false);
  const roadmapRef = useRef(null);
  const joinRef = useRef(null);
  const partnersRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size
  const [isClient, setIsClient] = useState(false);

  // Yeni eklenen referanslar
  const yearRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleYearClick = useCallback((year: string) => {
    if (yearRefs.current[year]) {
      yearRefs.current[year]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // Yılları roadmap'ten alıyoruz
  const years = roadmap.map((data) => Object.keys(data)[0]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetchAPI<HomePageData>(
          "/api/home?populate[Projects][populate]=*&populate[Team][populate]=*&populate[Partners][populate]=*&populate[Roadmap][populate][List][populate]=*&populate[Social][populate][Icon]=*"
        );
        setData(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHomeData();
  }, []);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          "https://strapiornek3.onrender.com/api/coin/brn-price",
          {
            method: "GET",
          }
        );
        const result = await response.json();
        console.log("COIN DATAAAA RESPONSEEEE: ", result);
        setCoinData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCoinData();
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = rotatingTexts[loopNum % rotatingTexts.length];
      setDisplayedText(
        isDeleting
          ? currentText.substring(0, displayedText.length - 1)
          : currentText.substring(0, displayedText.length + 1)
      );

      if (!isDeleting && displayedText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause after writing
        setTypingSpeed(100); // Speed up deleting
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(75); // Reset typing speed
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const roadmapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Görünür olduğunda veya görünmez olduğunda tetikleme
          if (entry.isIntersecting) {
            setIsVisible(true); // Görünür olduğunda animasyonu başlat
          } else {
            setIsVisible(false); // Görünür değilse opacity'yi sıfır yapar
          }
        });
      },
      {
        threshold: 0.15, // %15 görünürlükte tetikler
      }
    );

    if (roadmapRef.current) {
      roadmapObserver.observe(roadmapRef.current);
    }

    return () => {
      if (roadmapRef.current) {
        roadmapObserver.unobserve(roadmapRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const partnersObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Görünür olduğunda veya görünmez olduğunda tetikleme
          if (entry.isIntersecting) {
            setPartnersVisible(true); // Görünür olduğunda animasyonu başlat
          } else {
            setPartnersVisible(false); // Görünür değilse opacity'yi sıfır yapar
          }
        });
      },
      {
        threshold: 0.15, // %15 görünürlükte tetikler
      }
    );

    if (partnersRef.current) {
      partnersObserver.observe(partnersRef.current);
    }

    return () => {
      if (partnersRef.current) {
        partnersObserver.unobserve(partnersRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const joinObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Görünür olduğunda veya görünmez olduğunda tetikleme
          if (entry.isIntersecting) {
            setJoinVisible(true); // Görünür olduğunda animasyonu başlat
          } else {
            setJoinVisible(false); // Görünür değilse opacity'yi sıfır yapar
          }
        });
      },
      {
        threshold: 0.15, // %15 görünürlükte tetikler
      }
    );

    if (joinRef.current) {
      joinObserver.observe(joinRef.current);
    }

    return () => {
      if (joinRef.current) {
        joinObserver.unobserve(joinRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && videoRef.current.currentTime > 0) {
      setVideoIsPlaying(true);
    }
  }, [videoRef.current]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <main className="bg-gradient-home -z-50">
        {/*TOKEN SLIDE*/}
        <div
          className={`flex items-center fixed ${
            showTokenInfo ? "right-0" : "right-[-75vw] md:right-[-500px]"
          } transition-all duration-500 ease-in-out top-[50%] translate-[-50%,-50%] z-[9999] w-[75vw] md:w-[500px] min-w-[200px] shadow-lg rounded-l-3xl`}
        >
          <button
            onClick={() => setShowTokenInfo(!showTokenInfo)}
            className={
              "absolute left-[-70px] md:left-[-65px] flex flex-col items-center gap-4 bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4] p-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 animate-gradient"
            }
          >
            {showTokenInfo ? (
              <FaChevronRight className="text-white" /> // Butonu yukarı değil, sola baktırıyoruz
            ) : (
              <FaChevronLeft className="text-white" /> // Butonu aşağı değil, sağa baktırıyoruz
            )}
            <span
              className={`rotate-90 font-black text-sm md:text-lg text-white ${poppins.bold.className}`}
            >
              BRN
            </span>
          </button>

          <TokenInfoSlide coinData={coinData} />
        </div>

        {/* Container with both text and image side by side */}
        <div className="flex flex-col w-full min-h-screen items-center justify-center">
          <ParticleBackground />

          {/* Text section */}
          <div className="flex flex-col z-50 items-center w-full justify-center p-10 text-center">
            <div className="flex-grow flex items-center justify-center">
              <div className="min-h-[300px]">
                <h1
                  className={`${archivo_black.className} uppercase text-4xl lg:text-6xl font-bold mb-5`}
                >
                  Transforming the cryptocurrency landscape through cutting-edge
                  advancements in
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] via-[#7B3FE4] to-[#22D3EE]">
                    {displayedText}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <span className="black-to-gradient"></span>

        <div className="flex flex-col items-center justify-center min-h-[100vh] py-16">
          <div className="w-[90vw] lg:w-[40vw] text-center">
            <h2
              className={`${archivo_black.className} uppercase text-3xl py-4 lg:text-5xl font-bold text-white glow-effect`}
            >
              ABOUT <span className={"text-secondary"}>US</span>
            </h2>
          </div>

          <div
            className={`relative py-4 lg:min-h-[700px] w-full flex ${
              isMobile ? "flex-col" : "flex-row"
            } items-center gap-6 justify-between px-4 lg:px-32`}
          >
            {/* Text Section */}
            <div className="justify-start w-full">
              <p
                className={`${poppins.regular.className} text-lg text-justify lg:text-xl`}
              >
                <span
                  className={`${archivo_black.className} text-white text-2xl lg:text-4xl font-extrabold block mb-4`}
                >
                  Welcome to BRN Metaverse
                </span>
                At BRN Metaverse, we are redefining the future of digital
                interaction. By combining Blockchain, AI, and Web 3.0, we create
                an immersive world where virtual and reality merge seamlessly.
                <br/>
                <br/>
                We elevate gaming with play-to-earn mechanics, virtual
                economies, and assets that hold real-world value. Here, rarity
                and utility transform gaming into an economic adventure, making
                it more than just entertainment. 
                <br/>
                <br/>
                Join us as we push the limits
                of tech-driven interactions and groundbreaking digital
                experiences. BRN Metaverse blurs the line between the real and
                virtual worlds—unleashing limitless possibilities.
              </p>
            </div>

            {/* Video Section */}
            <div
              className={`flex items-center ${
                isMobile ? "justify-center" : "justify-end"
              } w-full`}
            >
              <div
                className="shadow-xl border-transparent rounded-lg overflow-hidden transition-transform duration-300"
                style={{
                  width: "90%", // Yüzdesel genişlik ayarı
                  boxShadow: "0 0 20px 5px rgba(58, 123, 253, 0.6)", // Light glow effect
                }}
              >
                <video
                  className="w-full h-auto object-cover rounded-lg"
                  src="/assets/videos/aboutvideo.mp4" // Update with actual video source
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-16 min-h-screen">
          <div className="w-[90vw] lg:w-[40vw] text-center mb-16">
            <h2
              className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold text-white mb-5 glow-effect`}
            >
              PROJECTS
            </h2>
          </div>

          {/* Project List */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8">
            {data?.data?.attributes?.Projects.map((project, index) => (
              <a
                key={index}
                href={project.Link || "#"} // Default to "#" if no link is available
                className={`${isMobile ? "w-[100%]" : "w-[90%]"} bg-gradient-to-r from-[#5A2BB2] via-[#3753A6] to-[#0073B2] text-white p-6 rounded-lg shadow-2xl sm:w-[45%] lg:w-[100%] transition-transform duration-300 hover:scale-105 block`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Project Logo */}
                <div className="flex justify-center mb-4">
                  <img
                    src={
                      project.logo.data.attributes.url
                        ? getStrapiMedia(project.logo.data.attributes)
                        : "/path/to/default_image.png"
                    }
                    alt={
                      project.logo.data.attributes.alternativeText ||
                      "Project Logo"
                    }
                    className={`h-24 rounded-lg ${
                      project.logo.data.attributes.width /
                        project.logo.data.attributes.height >
                      1.5
                        ? "object-cover"
                        : "object-contain"
                    }`}
                  />
                </div>

                {/* Project Title */}
                <h3
                  className={`${archivo_black.className} text-2xl text-cyan-400 font-bold text-center mb-4`}
                >
                  {project.Title}
                </h3>

                {/* Project Description */}
                <p
                  className={`${poppins.regular.className} text-sm min-h-[300px] lg:text-base text-justify mb-4`}
                >
                  {project.Description}
                </p>

                <div>
                  {/* Project Tags */}
                  <div className="flex justify-center flex-wrap gap-2">
                    {project.Tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-purple-600 bg-opacity-70 text-white py-1 px-3 rounded-lg text-sm"
                      >
                        {tag.trim()} {/* Boşlukları temizlemek için .trim() */}
                      </span>
                    ))}
                  </div>

                  {/* Visit Link */}
                  <div className="text-center pt-4">
                    {project.Link ? (
                      <span className="text-cyan-500 hover:text-cyan-300 underline transition-all duration-200">
                        Learn More
                      </span>
                    ) : (
                      <span className="text-gray-500">No link</span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center py-24 min-h-screen">
          <div className="w-[90vw] lg:w-[40vw] text-center mb-16">
            <h2
              className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold text-white mb-5 glow-effect`}
            >
              TEAM
            </h2>
          </div>

          {/* Team List */}
          <div className="w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            {data?.data?.attributes?.Team?.map((member: any, index: number) => (
              <a
                key={index}
                href={member.url || "#"} // Eğer link yoksa "#" kullanıyoruz
                className={`bg-glass shadow-2xl text-white p-6 rounded-2xl w-full transition-transform duration-300 hover:scale-105 min-h-[75vh] flex flex-col justify-between ${
                  index === 3
                    ? "lg:col-span-1 lg:row-start-2 lg:col-start-1"
                    : ""
                }`} // Dördüncü eleman sol alta hizalanacak şekilde ayarlandı
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  {/* Team Member Photo */}
                  <div className="h-[400px] rounded-lg overflow-hidden mb-4">
                    <img
                      src={
                        member?.Photo?.data?.attributes?.url
                          ? getStrapiMedia(member.Photo.data.attributes)
                          : "/path/to/default_image.png"
                      }
                      alt={
                        member?.Photo?.data?.attributes?.alternativeText ||
                        "Team Member Photo"
                      }
                      className="object-cover object-top w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col min-h-[100px]">
                    {/* Member Name */}
                    <h3
                      className={`${archivo_black.className} text-2xl text-cyan-400 font-bold text-center mb-4`}
                    >
                      {member.NameSurname}
                    </h3>

                    {/* Member Position */}
                    <p
                      className={`${poppins.regular.className} text-sm min-h-[50px] lg:text-base text-center`}
                    >
                      {member.Position}
                    </p>
                  </div>
                </div>

                {/* Visit LinkedIn */}
                <div className="flex justify-center mt-auto">
                  {member.url ? (
                    <div className="flex items-center justify-center border-2 border-cyan-400 h-[50px] w-[50px] rounded-full">
                      <FiLinkedin size={22} className="text-cyan-500" />
                    </div>
                  ) : (
                    <span className="text-gray-500">No LinkedIn link</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/*  PARTNERS  */}
        <div className="flex flex-col items-center justify-start min-h-[100vh] py-24">
          <div
            ref={partnersRef}
            className={`transition-opacity flex flex-col items-center duration-1000 ease-in-out ${
              isPartnersVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`w-[90vw] lg:w-[65vw] ${
                isMobile ? "text-center" : "md:text-center"
              } mb-12`}
            >
              <h2
                className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5 text-white glow-effect`}
              >
                Our <span className={"text-secondary"}>Partners</span>
              </h2>
              <p className={`${poppins.regular.className} text-white text-xl`}>
                Trusted by 25+ partners, we are making waves in the web3 space,
                changing the norm and introducing a project that will change the
                way we see web3 and gaming.
              </p>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 items-start ${
                isMobile ? "justify-center" : "justify-start"
              } mt-8 w-[90vw]`}
            >
              {data?.data?.attributes?.Partners?.length ? (
                data.data.attributes.Partners.sort(
                  (a: any, b: any) =>
                    (a.order_index || 0) - (b.order_index || 0)
                ).map((block: any, index: number) => (
                  <Link key={index} href={block?.url} target={"_blank"}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s",
                        backgroundColor: "rgba(255, 255, 255, 0.1)", // Saydam arka plan rengi
                        backdropFilter: "blur(10px)", // Bulanık arka plan efekti
                        borderRadius: 2,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      }}
                      className="bg-glass shadow-2xl"
                    >
                      {/* Üst Başlık ve Yeni Partner Rozeti */}
                      <CardHeader
                        title={
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="white"
                          >
                            {block?.PartnerName}
                          </Typography>
                        }
                        action={
                          <Chip
                            label="New Partner"
                            size="small"
                            sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              color: "white",
                            }}
                          />
                        }
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                        }}
                        // Avatar yerine img etiketi ekledik
                        subheader={
                          <img
                            src={
                              block?.PartnerIcon?.data
                                ? getStrapiMedia(
                                    block.PartnerIcon.data.attributes || {}
                                  )
                                : "/default/path/to/coinsites.webp"
                            }
                            alt={block.PartnerDescription || "Partner Icon"}
                            style={{
                              width: 200,
                              height: 80,
                              objectFit: "contain",
                              marginRight: 16,
                            }}
                          />
                        }
                      />

                      {/* İçerik */}
                      <CardContent sx={{ flexGrow: 1 }}>
                        {/* Etiketler */}
                        <div style={{ marginBottom: "1rem" }}>
                          {block.Tags?.map((tag: string, tagIndex: number) => (
                            <Chip
                              key={tagIndex}
                              label={tag}
                              size="small"
                              sx={{
                                marginRight: "0.5rem",
                                marginBottom: "0.5rem",
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                color: "white",
                              }}
                            />
                          ))}
                        </div>

                        {/* Açıklama */}
                        <Typography variant="body2" color="white">
                          <span className={`${poppins.regular.className}`}>
                            {block.PartnerDescription ||
                              "No description available"}
                          </span>
                        </Typography>
                      </CardContent>

                      {/* Alt Kısım */}
                      <CardActions
                        sx={{ justifyContent: "center", paddingBottom: "1rem" }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          href={block?.websiteLink || "#"}
                          target="_blank"
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)", // Saydam arka plan
                            color: "white", // Beyaz yazı rengi
                            backdropFilter: "blur(4px)", // Bulanık arka plan efekti
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.2)", // Hover durumunda biraz daha koyu
                            },
                          }}
                        >
                          Website
                        </Button>
                      </CardActions>
                    </Card>
                  </Link>
                ))
              ) : (
                <Typography variant="body1" color="text.primary">
                  No partners available.
                </Typography>
              )}
            </div>
          </div>

          {/* Social Media Section */}
          <div
            ref={joinRef}
            className={`text-center transition-opacity duration-1000 ease-in-out ${
              isMobile ? "mt-16" : "lg:mt-64" }
              ${isJoinVisible ? "opacity-100" : "opacity-0"}

            }`}
          >
            <h2
              className={`${archivo_black.className} uppercase text-3xl lg:text-5xl mb-32 glow-effect`}
            >
              Join <span className="text-secondary">Us</span>
            </h2>
            <div
              className={`flex ${
                isMobile ? "flex-row gap-8" : "gap-24"
              } items-center text-white`}
            >
              {data?.data?.attributes?.Social?.length ? (
                data.data.attributes.Social.map(
                  (social: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <Link
                        target="_blank"
                        href={social.url}
                        className={`flex flex-col items-center hover:scale-110 ${
                          social.name === "Instagram"
                            ? "instagram-hover"
                            : social.name === "Youtube"
                            ? "youtube-hover"
                            : social.name === "X"
                            ? "x-hover"
                            : social.name === "Telegram"
                            ? "telegram-hover"
                            : social.name === "Discord"
                            ? "discord-hover"
                            : ""
                        }`}
                      >
                        <img
                          className="transition-transform duration-300 object-contain"
                          src={
                            social?.Icon?.data
                              ? getStrapiMedia(social?.Icon?.data?.attributes)
                              : "/default/path/to/coinsites.webp"
                          }
                          alt={social.name}
                          style={{ width: "60px", height: "60px" }}
                        />
                        <p className="mt-2 text-center text-lg text-white">
                          {social.Followers}
                        </p>
                      </Link>
                    </div>
                  )
                )
              ) : (
                <p className="text-white">No social links available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-32 min-h-screen">
          <div
            ref={roadmapRef}
            className={`transition-opacity duration-1000 ease-in-out flex flex-col items-center ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-[80vw] lg:w-[65vw] text-center mb-16">
              {/* Başlık ve açıklama */}
              <h2
                className={`${archivo_black.className} uppercase text-3xl lg:text-5xl mb-5 glow-effect`}
              >
                Road<span className="text-secondary">map</span>
              </h2>
              <p className={`${poppins.regular.className} text-xl`}>
                We have our entire journey mapped out. Know exactly what we are
                up to by reading through our roadmap.
              </p>
            </div>

            {/* Yıl Navigasyonu */}
            <YearNavigation years={years} onYearClick={handleYearClick} />

            <div className="relative w-full max-w-4xl lg:w-[70vw] mt-16">
              {/* Zaman Çizgisi */}
              <div
                className={`${
                  isMobile
                    ? "h-full absolute left-0 transform -translate-x-1/2 border-l-4 border-cyan-400"
                    : "absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-cyan-400"
                }`}
              ></div>

              {/* Roadmap Kısmı */}
              {roadmap.length > 0 &&
                roadmap.map((data, index: number) => {
                  const yearKey = Object.keys(data)[0];
                  const yearData = data[yearKey];
                  const quarters = yearData?.quarters || [];

                  return (
                    <div
                      key={index}
                      ref={(el) => (yearRefs.current[yearKey] = el)}
                      className={`relative mb-12 flex ${
                        isMobile
                          ? "flex-col"
                          : index % 2 === 0
                          ? "flex-row-reverse"
                          : ""
                      } items-center justify-between w-full`}
                    >
                      {/* Kartın solunda veya sağında */}
                      <div
                        className={`${
                          isMobile ? "w-full text-center" : "w-[45%]"
                        } space-y-6 ${
                          index % 2 === 0 && !isMobile
                            ? "text-right pr-8"
                            : "text-left pl-2"
                        }`}
                      >
                        {quarters.map((quarter, qIndex) => (
                          <div
                            key={qIndex}
                            className={`${qIndex !== 0 ? "mt-6" : ""}`}
                          >
                            <RoadmapCard
                              quarter={quarter.quarter}
                              items={quarter.items}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Zaman çizgisi üzerindeki yuvarlak ve yearKey */}
                      <div
                        className={`w-12 h-12 bg-cyan-400 rounded-full absolute ${
                          isMobile
                            ? "top-0 left-0 translate-x-[-50%]"
                            : "left-1/2 transform -translate-x-1/2"
                        } flex items-center justify-center text-white font-bold`}
                      >
                        {yearKey}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* <div className={`lg:hidden fixed left-0 px-8 py-5 transition-all ${modalIslOpen ? 'bottom-0 opacity-100 visible' : 'bottom-[-100vh] invisible opacity-0'} items-center justify-center w-[100vw] bg-primary z-10`}>
            {markets.sort((a, b) => a.order_index - b.order_index)?.map((listing: any, index: number) => (
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
        </div> */}
        <span className="gradient-to-black mb-16"></span>
      </main>
    </>
  );
}
