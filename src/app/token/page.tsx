"use client";
import Image from "next/image";
import { archivo_black } from "@/config/fonts";
import { useEffect, useState } from "react";
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

  return (
    <main className="bg-gradient-home -z-50">
      <div className={"flex items-center justify-center min-h-[70vh]"}>
        <div
          className={
            "grid grid-cols-1 z-50 lg:grid-cols-2 py-32 items-center justify-center w-[80vw] m-auto"
          }
        >
          <div className={""}>
            <h2
              className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5 text-secondary`}
            >
              BRN
            </h2>
            <p>
              Join the future of finance and gaming with $BRN and embark on a
              journey where your investments and passions align.
            </p>

            <div className={"flex gap-8 my-8"}>
              <div className={"flex flex-col"}>
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
              <div className={"flex flex-col"}>
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
            </div>

            <div className="relative w-[80vw] md:w-auto inline-block p-1 rounded-2xl">
              {/* Gradient background */}
              <div className="absolute inset-0 animate-gradient rounded-2xl z-[-1]"></div>

              {/* İçerik */}
              <div className="relative z-[1] bg-primary-light rounded-2xl p-5">
                <div className="flex flex-col">
                  <h3
                    className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}
                  >
                    18
                  </h3>
                  <p className="text-sm uppercase">
                    {data?.data?.attributes?.CoinCode?.DecimalText}
                  </p>
                </div>

                <div
                  style={{ transitionDelay: "5s" }}
                  className="flex items-center justify-between gap-3 bg-primary-light text-white rounded-lg font-bold text-sm w-full"
                >
                  <span>0x926ecC7687fCFB296E97a2b4501F41A6f5F8C214</span>
                  <button
                    disabled={textCopied}
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        tokenInformation?.address
                      );
                      setTextCopied(true);
                      setTimeout(() => {
                        setTextCopied(false);
                      }, 3000);
                    }}
                    className="bg-white p-2 rounded-lg text-accent"
                  >
                    {textCopied ? <FiCheck size={22} /> : <FiCopy size={22} />}
                  </button>
                </div>
              </div>
            </div>

            {/*</div>*/}
            <div className={"flex justify-center mt-16"}>
              <div
                className={
                  "flex justify-center w-full lg:w-[70vw] h-[20px] rounded-full"
                }
              >
                {Array.from(tokenAllocations).map((token: any, index) => (
                  <div
                    style={{
                      backgroundColor: token.attributes.Color, // Color değerine doğru erişim
                      width: `${token.attributes.Percentage + 5}%`, // +5 ekleme yapılıyor
                      zIndex: 100 - index,
                    }}
                    key={index}
                    className={`h-[20px] rounded-full ${
                      index > 0 ? "ml-[-15px] lg:ml-[-15px]" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className={
              "relative flex flex-col justify-start items-center h-full w-full"
            }
          >
            <img
              src={
                data?.data?.attributes?.LineGraph?.data?.attributes?.url
                  ? getStrapiMedia(
                      data?.data?.attributes?.LineGraph?.data?.attributes
                    )
                  : "/default/path/to/coinsites.webp"
              }
              alt={""}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/*<div
        className={`flex flex-col z-100 lg:flex-row items-start md:items-center justify-center gap-3 lg:gap-5 w-[90vw] lg:w-[80vw] m-auto mt-10 my-5`}
      >
        {data?.data?.attributes?.ChartSection?.CoinLinks?.map(
          (coin: any, index: number) => (
            <a href={coin.url} target={"_blank"} key={index}>
              <div
                className={
                  "flex gap-3 justify-start items-center p-3 text-sm hover:bg-gray-200/20 rounded-full transition-colors duration-300"
                }
              >
                <img
                  src={
                    coin?.PlaceImage?.data?.attributes?.formats?.thumbnail?.url
                      ? getStrapiMedia(
                          coin.PlaceImage?.data?.attributes?.formats?.thumbnail
                        )
                      : "/default/path/to/coinsites.webp"
                  }
                  height={30}
                  width={30}
                  className={"rounded-full"}
                  alt={coin.name}
                />
                {coin.name}
              </div>
            </a>
          )
        )}
      </div> */}

      {/* STRATEGIC PRIORITIES */}
      <div className="flex flex-col items-center py-32 min-h-screen">
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
                  className={`${archivo_black.className} text-2xl text-cyan-400 font-bold text-center mb-4`}
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

      {/* LISTED ON */}
      <div className="transition-opacity flex flex-col items-center py-24">
        <div className={"w-[90vw] lg:w-[40vw] md:text-center mb-12"}>
          <h2
            className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5 text-white`}
          >
            Listed <span className={"text-secondary"}>On</span>
          </h2>
        </div>

        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4 items-start justify-start md:justify-center mt-8 w-[90vw]"
          }
        >
          {actualData?.data?.attributes?.ListedOn?.length ? (
            actualData?.data?.attributes?.ListedOn?.sort(
              (a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)
            ).map((block: any, index: number) => (
              <Link
                key={index}
                href={block?.url}
                target={"_blank"}
                className="h-full transition-transform min-h-[300px] duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-md min-w-[300px] p-6 rounded-lg h-full text-center hover:bg-opacity-20 hover:shadow-lg transition-all duration-300">
                  <div className="relative mb-4">
                    <img
                      className="h-[100px] w-[200px] object-contain mx-auto"
                      src={
                        block?.Image?.data?.attributes
                          ? getStrapiMedia(
                              block.Image.data.attributes.formats?.thumbnail ||
                                {}
                            )
                          : "/default/path/to/coinsites.webp"
                      }
                      alt={block.Description || "Partner Icon"}
                    />
                  </div>
                  <p className="text-white text-lg text-justify">
                    {block.Description || "No description available"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white">No partners available.</p>
          )}
        </div>
      </div>

      <div
        className={
          "grid grid-cols-1 mt-[100px] md:grid-cols-[1fr_0.7fr] items-center justify-center m-auto w-[90vw] lg:w-[60vw] min-h-[70vh] pb-24"
        }
      >
        <div className={"relative h-[400px] md:h-[800px]"}>
          <img
            src={
              data?.data?.attributes?.ChartSection?.ChartImage?.data?.attributes
                ?.formats?.large?.url
                ? getStrapiMedia(
                    data?.data?.attributes?.ChartSection?.ChartImage?.data
                      ?.attributes?.formats?.large
                  )
                : "/default/path/to/coinsites.webp"
            }
            className="w-full h-full object-contain"
            alt="Tokenomics"
          />
          {/* <TokenAllocation
                    allocations={tokenAllocations}
                    sx={{ height: '100%' }}
                /> */}
        </div>
        <div id={"stats"} className={"mt-14 lg:mt-0"}>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-5"}>
            <div
              className={"flex flex-col gap-2 bg-primary-light p-3 rounded-lg"}
            >
              <div className={"flex flex-wrap items-center justify-between"}>
                <span className={"text-xl font-bold"}>
                  {coinData?.data?.BRN[0]?.quote?.USD?.price?.toFixed(4)}
                </span>
              </div>
              <span className={"text-sm"}>BRN Price</span>
            </div>
            <div
              className={"flex flex-col gap-2 bg-primary-light p-3 rounded-lg"}
            >
              <span className={"text-xl font-bold"}>
                {coinData?.data?.BRN[0]?.total_supply
                  ? (coinData.data.BRN[0].total_supply / 1e6).toFixed(1)
                  : "N/A"}
              </span>
              <span className={"text-sm"}>Total Supply</span>
            </div>
            <div
              className={"flex flex-col gap-2 bg-primary-light p-3 rounded-lg"}
            >
              <span className={"text-xl font-bold"}>
                {coinData?.data?.BRN[0]?.max_supply
                  ? (coinData.data.BRN[0].max_supply / 1e6).toFixed(1)
                  : "N/A"}
              </span>
              <span className={"text-sm"}>Max Supply</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mt-16">
            <div className="flex items-center gap-3">
              <div
                className="bg-[#e83b43] p-5 rounded-xl"
                style={{ backgroundColor: "rgb(232, 59, 67)" }}
              />
              <div className="flex flex-col items-start gap-0">
                <span className="text-sm">Play to Earn</span>
                <span className="text-sm font-black">20%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-[#00aaff] p-5 rounded-xl"
                style={{ backgroundColor: "rgb(0, 170, 255)" }}
              />
              <div className="flex flex-col items-start gap-0">
                <span className="text-sm">Stake</span>
                <span className="text-sm font-black">35%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-[#0a9400] p-5 rounded-xl"
                style={{ backgroundColor: "rgb(10, 148, 0)" }}
              />
              <div className="flex flex-col items-start gap-0">
                <span className="text-sm">Liquidity</span>
                <span className="text-sm font-black">5%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-[#fff700] p-5 rounded-xl"
                style={{ backgroundColor: "rgb(255, 247, 0)" }}
              />
              <div className="flex flex-col items-start gap-0">
                <span className="text-sm">Presale</span>
                <span className="text-sm font-black">10%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-[#d226df] p-5 rounded-xl"
                style={{ backgroundColor: "rgb(210, 38, 223)" }}
              />
              <div className="flex flex-col items-start gap-0">
                <span className="text-sm">Brain</span>
                <span className="text-sm font-black">10%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-[#ff7b00] p-5 rounded-xl"
                style={{ backgroundColor: "rgb(255, 123, 0)" }}
              />
              <div className="flex flex-col items-start gap-0">
                <span className="text-sm">Marketing</span>
                <span className="text-sm font-black">8%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-[#3ec7ea] p-5 rounded-xl"
                style={{ backgroundColor: "rgb(62, 199, 234)" }}
              />
              <div className="flex flex-col items-start gap-0">
                <span className="text-sm">Airdrop</span>
                <span className="text-sm font-black">2%</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-[#fafafa] p-5 rounded-xl"
                style={{ backgroundColor: "rgb(250, 250, 250)" }}
              />
              <div className="flex flex-col items-start gap-0">
                <span className="text-sm">Ecosystem</span>
                <span className="text-sm font-black">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
