"use client";
import Image from "next/image";
import { archivo_black, poppins } from "@/config/fonts";
import { useEffect, useRef, useState } from "react";
import useTokenAllocations from "@/hooks/useTokenAllocations";
import useConfig from "@/hooks/useConfig";
import formatNumber from "@/helpers";
import { TokenAllocation } from "@/components/token-allocation";
import useMarkets from "@/hooks/useMarkets";
import useTokenPrice from "@/hooks/useTokenPrice";
import TokenInfo from "@/components/tokenInfo";
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";
import { ellipses } from "@/helpers/strings";
import { FiCheck, FiCopy } from "react-icons/fi";
import React from "react";
import ParticleBackground from "@/components/particle-background";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCoins,
  FaInfoCircle,
  FaPercentage,
} from "react-icons/fa";
import TokenInfoSlide from "@/components/tokenInfoSlide";
import useMediaQuery from "@/hooks/useMediaQuery";

interface TokenPageData {
  data: {
    id: number;
    attributes: {
      Title: string;
      Description: string;
      TotalSupply: number;
      MaxSupply: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      LineGraph?: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string | null;
            caption: string | null;
            width: number;
            height: number;
            formats: {
              thumbnail?: {
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
            } | null;
            url: string;
            mime: string;
          };
        };
      };
      CoinCode: {
        id: number;
        Number: number;
        DecimalText: string;
        Code: string;
      };
      ChartSection: {
        id: number;
        CoinLinks: Array<{
          id: number;
          url: string;
          name: string;
          PlaceImage?: {
            data: {
              id: number;
              attributes: {
                name: string;
                alternativeText: string | null;
                caption: string | null;
                width: number;
                height: number;
                formats: {
                  thumbnail?: {
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
        }>;
        ChartImage?: {
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
        TokenChartBlock: {
          id: number;
          Number: string;
          Change: string;
          Title: string;
        }[];
        ColorPercentages: {
          id: number;
          Color: string;
          PercentageTitle: string;
          Percentage: number;
        }[];
      };
    };
  };
}

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

interface ApiResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      StrategicPriorities: {
        id: number;
        StrategicTitle: string;
        StrategicDescription: string;
        StrategicIcon: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              caption: string | null;
              width: number;
              height: number;
              formats: null;
              hash: string;
              ext: string;
              mime: string;
              size: number;
              url: string;
              previewUrl: string | null;
              provider: string;
              provider_metadata: any | null;
              createdAt: string;
              updatedAt: string;
            };
          };
        };
      }[];
      ListedOn: {
        id: number;
        Description: string;
        Image: {
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
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string | null;
                  width: number;
                  height: number;
                  size: number;
                  sizeInBytes?: number;
                  url: string;
                };
                small?: {
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string | null;
                  width: number;
                  height: number;
                  size: number;
                  sizeInBytes?: number;
                  url: string;
                };
              };
              hash: string;
              ext: string;
              mime: string;
              size: number;
              url: string;
              previewUrl: string | null;
              provider: string;
              provider_metadata: any | null;
              createdAt: string;
              updatedAt: string;
            };
          };
        };
      }[];
    };
  };
  meta: object;
}

export default function Token() {
  const [currentNFT, setCurrentNFT] = useState(0);
  const [tokenAllocations] = useTokenAllocations();
  const [{ token: tokenInformation }] = useConfig("token");
  const [markets] = useMarkets();
  const [token] = useTokenPrice();
  const [data, setData] = useState<TokenPageData>();
  const [textCopied, setTextCopied] = useState(false);
  const [coinData, setCoinData] = useState<CoinResponse>();
  const [actualData, setActualData] = useState<ApiResponse>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const chartSectionRef = useRef<HTMLDivElement | null>(null); // Ana div için referans
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [showTokenInfo, setShowTokenInfo] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size

  let API_HOST = "http://localhost:1337/";

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetchAPI<TokenPageData>(
          "/api/token?populate[LineGraph]=*&populate[CoinCode]=*&populate[ChartSection][populate][CoinLinks][populate]=*&populate[ChartSection][populate][ChartImage]=*&populate[ChartSection][populate][TokenChartBlock]=*&populate[ChartSection][populate][ColorPercentages]=*"
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
    const fetchHomeData = async () => {
      try {
        const response = await fetchAPI<ApiResponse>(
          "/api/actual-token?populate[StrategicPriorities][populate][StrategicIcon]=*&populate[ListedOn][populate][Image]=*"
        );
        setActualData(response);
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
          "http://localhost:1337/api/coin/brn-price",
          {
            method: "GET",
          }
        );
        const result = await response.json();
        setCoinData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCoinData();
  }, []);

  const toggleDescription = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsChartVisible(true); // Görünür olduğunda animasyonu başlat
          } else {
            setIsChartVisible(false); // Div görünmez olduğunda durdur
          }
        });
      },
      { threshold: 0.1 } // %10 görünürlükte tetiklenir
    );

    if (chartSectionRef.current) {
      observer.observe(chartSectionRef.current);
    }

    return () => {
      if (chartSectionRef.current) {
        observer.unobserve(chartSectionRef.current);
      }
    };
  }, []);

  return (
    <main className="bg-gradient-home -z-50">
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

      <div className="flex flex-col text-center items-center pt-28">
        <div className="w-[90vw] lg:w-[40vw]">
          <h2
            className={`${archivo_black.className} uppercase md:text-center text-3xl lg:text-5xl font-bold mb-5`}
          >
            BRN
          </h2>
          <p className="text-white">
            Join the future of finance and gaming with $BRN and embark on a
            journey where your investments and passions align.
          </p>
        </div>
      </div>

      <div className={"flex items-center justify-center min-h-[70vh]"}>
        <div
          className={
            "grid grid-cols-1 z-50 lg:grid-cols-2 py-8 items-center justify-center w-[80vw] m-auto"
          }
        >
          <div className={""}>
            <div className={`flex ${isMobile ? "flex-col gap-4" : "gap-4"} w-full`}>
              <div
                className={
                  "flex flex-col bg-gray-500 bg-opacity-50 p-4 rounded-lg w-full"
                }
              >
                <h3
                  className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}
                >
                  {coinData?.data?.BRN[0]?.total_supply
                    ? (coinData.data.BRN[0].total_supply / 1e6).toFixed(1)
                    : "N/A"}
                  M
                </h3>
                <p className={"text-sm"}>TOTAL SUPPLY</p>
              </div>

              <div
                className={
                  "flex flex-col bg-gray-500 bg-opacity-50 p-4 rounded-lg w-full"
                }
              >
                <h3
                  className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}
                >
                  {coinData?.data?.BRN[0]?.max_supply
                    ? (coinData.data.BRN[0].max_supply / 1e6).toFixed(1)
                    : "N/A"}
                  M
                </h3>
                <p className={"text-sm"}>MAX SUPPLY</p>
              </div>

              <div
                className={
                  "flex flex-col bg-gray-500 bg-opacity-50 p-4 rounded-lg w-full"
                }
              >
                <h3
                  className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}
                >
                  $
                  {coinData?.data?.BRN[0]?.quote?.USD?.price
                    ? coinData.data.BRN[0].quote.USD.price.toFixed(4)
                    : "N/A"}
                </h3>
                <p className={"text-sm"}>PRICE</p>
              </div>
            </div>

            <div className="relative w-[80vw] md:w-auto inline-block p-1 rounded-2xl">
              <div className="grid grid-cols-2 items-center justify-center gap-10 lg:gap-16 mt-8">
                {Array.from(tokenAllocations).map((token: any, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start relative"
                  >
                    <div className="flex items-center gap-4">
                      {" "}
                      {/* Aradaki boşluğu artırdık */}
                      {/* Info icon */}
                      <button
                        onClick={() => toggleDescription(index)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaInfoCircle color="white" /> {/* Info icon */}
                      </button>
                      {/* Renkli kutu */}
                      <div
                        style={{ backgroundColor: token.attributes.Color }}
                        className={`p-5 rounded-xl`}
                      />
                      {/* Token Bilgileri */}
                      <div className="flex flex-col items-start gap-0">
                        <span className="text-sm">
                          {token?.attributes?.Title}
                        </span>
                        <span className="text-sm font-black">
                          {token?.attributes?.Percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Açıklama kısmı */}
                    {openIndex === index && (
                      <div
                        className={`absolute left-10 top-6 p-3 bg-gray-100 rounded-lg shadow-lg w-[250px] z-10 transition-transform transform-gpu scale-95 opacity-0 ${
                          openIndex === index
                            ? "scale-100 opacity-100"
                            : "scale-95 opacity-0"
                        }`}
                        style={{ transition: "all 0.3s ease-out" }}
                      >
                        <p className="text-sm text-gray-700">
                          {token?.attributes?.Description ||
                            "No description available"}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            ref={chartSectionRef}
            className={"relative flex flex-col justify-start items-center"}
          >
            {/* Chart Section */}
            <div className="flex justify-center items-center">
              {isChartVisible && (
                <TokenAllocation
                  allocations={tokenAllocations}
                  sx={{ height: "100%" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col z-100 lg:flex-row items-start md:items-center justify-center gap-3 lg:gap-5 w-[90vw] py-8 lg:w-[80vw] m-auto`}
      >
        {actualData?.data?.attributes?.ListedOn?.map(
          (coin: any, index: number) => (
            <a href={coin.url} target={"_blank"} key={index}>
              <div
                className={
                  "flex gap-3 justify-start items-center p-3 text-sm hover:bg-gray-200/20 rounded-full transition-colors duration-300"
                }
              >
                <img
                  src={
                    coin?.Image?.data?.attributes?.formats?.thumbnail?.url
                      ? getStrapiMedia(
                          coin.Image?.data?.attributes?.formats?.thumbnail
                        )
                      : "/default/path/to/coinsites.webp"
                  }
                  height={200}
                  width={200}
                  className={"rounded-full"}
                  alt={coin.name}
                />
              </div>
            </a>
          )
        )}
      </div>

      {/* STRATEGIC PRIORITIES */}
      <div className="flex flex-col items-center py-16 min-h-screen">
        <div className="w-[90vw] lg:w-[40vw] md:text-center pb-24">
          <h2
            className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5 text-white`}
          >
            Strategic <span className={"text-secondary"}>Priorities</span>
          </h2>
          <p className="text-white">
            Unleash success in our key focus areas. With expertise and
            innovation at our core, we deliver exceptional results. Explore our
            strategic priorities and reach your full potential.
          </p>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-8 px-8">
          {actualData?.data?.attributes?.StrategicPriorities?.length ? (
            actualData?.data?.attributes?.StrategicPriorities.sort(
              (a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)
            ).map((block: any, index: number) => (
              <div
                key={index}
                className="bg-black bg-opacity-20 text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[45%] lg:w-[30%] block"
              >
                {/* Icon Section */}
                <div className="flex justify-center mb-4">
                  <img
                    src={
                      block?.StrategicIcon?.data
                        ? getStrapiMedia(block?.StrategicIcon?.data?.attributes)
                        : "/default/path/to/coinsites.webp"
                    }
                    alt={
                      block?.StrategicIcon?.data?.attributes?.alternativeText ||
                      "Strategic Icon"
                    }
                    className="h-24 w-24 object-contain rounded-lg"
                  />
                </div>

                {/* Title Section */}
                <h3
                  className={`${archivo_black.className} text-2xl text-secondary font-bold text-center mb-4`}
                >
                  {block.StrategicTitle}
                </h3>

                {/* Description Section */}
                <p className="text-sm min-h-[300px] lg:text-base text-justify mb-4">
                  {block.StrategicDescription || "No description available"}
                </p>

                {/* Tags Section */}
                {block.Tags && (
                  <div className="flex justify-center flex-wrap gap-2">
                    {block.Tags.split(",").map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-block bg-purple-600 bg-opacity-70 text-white py-1 px-3 rounded-lg text-sm"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-white">No strategic available.</p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-12">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://whitepaper.brnmetaverse.net/"
          className="bg-transparent text-white text-lg p-5 rounded-full text-center w-[170px] hover:bg-gray-200/20 transition-colors duration-300"
        >
          WhitePaper
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.brnmetaverse.net/assets/docs/legal-opinion.pdf"
          className="bg-transparent text-white text-lg p-5 rounded-full text-center w-[170px] hover:bg-gray-200/20 transition-colors duration-300"
        >
          Legal Opinion
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/interfinetwork/smart-contract-audits/blob/audit-updates/BRNMetaverse_0x926ecC7687fCFB296E97a2b4501F41A6f5F8C214.pdf"
          className="bg-transparent text-white text-lg p-5 rounded-full text-center w-[170px] hover:bg-gray-200/20 transition-colors duration-300"
        >
          Audit
        </a>
      </div>

      <div className="flex flex-col items-center pb-16">
        {/* Image */}
        <div className="relative w-full max-w-4xl h-[600px]">
          {/* Genişliği %100 ve maksimum genişlik */}
          <Image
            src="/assets/images/Stake.png"
            alt={"Stake"}
            fill
            className="rounded-lg object-contain"
          />
        </div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://stake.brntoken.net/"
          className="bg-transparent text-white text-lg p-5 rounded-full text-center w-[180px] hover:bg-gradient-to-r hover:from-[#7F3FF2] hover:via-[#4976E2] hover:to-[#00C0FF] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <FaCoins />
          Stake & Earn
        </a>

        {/*<div className="text-left">
            <h3 className="font-bold flex items-center text-2xl mb-4 border-b border-gray-400 pb-2">
              <FaPercentage className="mr-4" size={24} />
              Stake <span className="text-secondary ml-2">Rates</span>
            </h3>
            <ul className="list-disc pl-6 mb-8 text-sm lg:text-xl leading-loose">
              <li>2% for 30 days</li>
              <li>7% for 90 days</li>
              <li>15% for 180 days</li>
              <li>35% for 1 year</li>
            </ul>

            <h3 className="font-bold flex items-center text-2xl mb-4 border-b border-gray-400 pb-2">
              <FaCoins className="mr-4" size={24} />
              Min Stake <span className="text-secondary ml-2">Amounts</span>
            </h3>
            <ul className="list-disc pl-6 text-sm lg:text-xl leading-loose">
              <li>100 BRN and above can only be locked for 1 month.</li>
              <li>500 BRN and above can only be locked for 1 or 3 months.</li>
              <li>1000 BRN and above can be locked for 1, 3 or 6 months.</li>
            </ul>
          </div> */}
      </div>
    </main>
  );
}
