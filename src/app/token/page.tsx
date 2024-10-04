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

export default function Token() {
  const [currentNFT, setCurrentNFT] = useState(0);
  const [tokenAllocations] = useTokenAllocations();
  const [{ token: tokenInformation }] = useConfig("token");
  const [markets] = useMarkets();
  const [token] = useTokenPrice();
  const [data, setData] = useState<TokenPageData>();
  const [textCopied, setTextCopied] = useState(false);


  let API_HOST = "http://51.20.121.61:1337/";

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

  return (
    <main className="">
      <div
        className={
          "flex items-center justify-center min-h-[70vh] bg-gradient-token py-16 mt-16"
        }
      >
        <div
          className={
            "grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-[80vw] m-auto"
          }
        >
          <div className={""}>
            <h2
              className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5 text-secondary`}
            >
              {data?.data?.attributes?.Title}
            </h2>
            <p>{data?.data?.attributes?.Description}</p>

            <div className={"flex gap-8 my-8"}>
              <div className={"flex flex-col"}>
                <h3
                  className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}
                >
                  {data?.data?.attributes?.TotalSupply}
                </h3>
                <p className={"text-sm"}>TOTAL SUPPLY</p>
              </div>
              <div className={"flex flex-col"}>
                <h3
                  className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}
                >
                  {data?.data?.attributes?.MaxSupply}
                </h3>
                <p className={"text-sm"}>MAX SUPPLY</p>
              </div>
            </div>

            <div
              className={
                "w-[80vw] md:w-auto inline-block p-5 bg-primary-light right-[-2%] top-[50%] rounded-2xl"
              }
            >
              <div className={"flex flex-col"}>
                <h3
                  className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}
                >
                  {data?.data?.attributes?.CoinCode?.Number}
                </h3>
                <p className={"text-sm uppercase"}>{data?.data?.attributes?.CoinCode?.DecimalText}</p>
              </div>
              <div
                style={{ transitionDelay: "5s" }}
                className={
                  "flex items-center justify-between gap-3 bg-primary-light text-white rounded-lg font-bold text-sm w-full"
                }
              >
                {data?.data?.attributes?.CoinCode?.Code && (
                  <>
                    <span className={"md:hidden"}>
                      {ellipses(20, data?.data?.attributes?.CoinCode?.Code ?? "", "***")}
                    </span>
                    <span className={"hidden md:inline-block text-white"}>
                      {data?.data?.attributes?.CoinCode?.Code ?? ""}
                    </span>
                  </>
                )}
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
                  className={"bg-white p-2 rounded-lg text-accent"}
                >
                  {textCopied ? <FiCheck size={22} /> : <FiCopy size={22} />}
                </button>
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
                      backgroundColor: token.color,
                      width: `${token.percentage + 5}%`,
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
            />
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col lg:flex-row items-start md:items-center justify-center gap-3 lg:gap-5 w-[90vw] lg:w-[80vw] m-auto my-8`}
      >
        {data?.data?.attributes?.ChartSection?.CoinLinks?.map(
          (coin: any, index: number) => (
            <a href={coin.url} target={"_blank"} key={index}>
              <div
                className={
                  "flex gap-3 justify-start items-center p-3 text-sm hover:bg-primary-light rounded-full"
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
      </div>

      <div
        className={
          "grid grid-cols-1 md:grid-cols-[1fr_0.7fr] items-center justify-center m-auto w-[90vw] lg:w-[60vw] min-h-[70vh]"
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
                  {
                    data?.data?.attributes?.ChartSection?.TokenChartBlock[0]
                      .Number
                  }
                </span>
                <span
                  className={`${
                    token?.up ? "text-green-400" : "text-red-500"
                  } text-sm font-bold`}
                >
                  {
                    data?.data?.attributes?.ChartSection?.TokenChartBlock[0]
                      .Change
                  }
                </span>
              </div>
              <span className={"text-sm"}>BRN Price</span>
            </div>
            <div
              className={"flex flex-col gap-2 bg-primary-light p-3 rounded-lg"}
            >
              <span className={"text-xl font-bold"}>
                {data?.data?.attributes?.TotalSupply}
              </span>
              <span className={"text-sm"}>Total Supply</span>
            </div>
            <div
              className={"flex flex-col gap-2 bg-primary-light p-3 rounded-lg"}
            >
              <span className={"text-xl font-bold"}>
                {data?.data?.attributes?.MaxSupply}
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
