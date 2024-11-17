"use client";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { socialMap } from "@/data/dataElements";
import { useEffect, useState } from "react";
import ParticleBackground from "./particle-background";
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";
import { archivo_black } from "@/config/fonts";
import BRNLogo from "../../public/favicon-16x16.png";
import useMediaQuery from "@/hooks/useMediaQuery";

// Image Formats Interface
interface ApiResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      Social: {
        id: number;
        name: string;
        url: string;
        Followers: string;
        Icon: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              caption: string | null;
              width: number;
              height: number;
              formats: null; // Formatlar burada null, isteğe göre nullable yapılabilir
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
      Footer: {
        id: number;
        AvailableOn: {
          id: number;
          url: string;
          name: string;
          PlaceImage: {
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
                    sizeInBytes: number;
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
                    sizeInBytes: number;
                    url: string;
                  };
                  medium?: {
                    name: string;
                    hash: string;
                    ext: string;
                    mime: string;
                    path: string | null;
                    width: number;
                    height: number;
                    size: number;
                    sizeInBytes: number;
                    url: string;
                  };
                  large?: {
                    name: string;
                    hash: string;
                    ext: string;
                    mime: string;
                    path: string | null;
                    width: number;
                    height: number;
                    size: number;
                    sizeInBytes: number;
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
  };
  meta: object;
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

const Footer = () => {
  const [subscribing, setSubscribing] = useState(false);
  const [message, setMessage] = useState({ success: false, message: "" });
  const [socialHandles, setSocialHandles] = useState([]);
  const [data, setData] = useState<ApiResponse>();

  const [coinData, setCoinData] = useState<CoinResponse>();
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size

  let API_HOST = "http://51.20.121.61:1337/";

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetchAPI<ApiResponse>(
          "/api/home?populate[Social][populate][Icon]=*&populate[Footer][populate][AvailableOn][populate][PlaceImage]=*"
        );
        setData(response);
        console.log("FOOTER DATA: ", response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFooterData();
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
        setCoinData(result);
      } catch (err) {
        setError("Veri alınırken bir hata oluştu.");
        console.error(err);
      }
    };

    fetchCoinData();
  }, []);

  const subscribe = async (evt: any) => {
    setSubscribing(true);
    setMessage({ success: false, message: "" });
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    evt?.preventDefault();
    const email = evt.target.email.value;

    if (emailRegex.test(email)) {
      try {
        const subscriptionRequest = await fetch(`${API_HOST}/api/subscribers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email: email,
            },
          }),
        });
        const subscriptionResponse = await subscriptionRequest.json();

        // subscriptionResponse.error var mı diye kontrol ediyoruz
        if (subscriptionResponse?.error?.status === 400) {
          setMessage({
            success: false,
            message: "Your email is already subscribed.",
          });
        } else if (subscriptionResponse?.data) {
          setMessage({ success: true, message: "Thank you for subscribing." });
        } else {
          // Beklenmedik bir yanıt alındığında
          setMessage({
            success: false,
            message: "Unexpected response from server.",
          });
        }
      } catch (e: any) {
        setMessage({ success: false, message: e.message });
      }
    } else {
      setMessage({ success: false, message: "Incorrect email format" });
    }
    setSubscribing(false);
  };

  return (
    <footer className="relative">
      {/* Particle Background */}
      <div
        className={`${
          isMobile
            ? "absolute z-0 h-full w-full object-cover"
            : "absolute min-h-full inset-0 z-0"
        }`}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ParticleBackground />
      </div>

      <div className="relative z-10">
        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 justify-between items-center w-[90vw] lg:w-[70vw] m-auto min-h-[40vh] pt-8 gap-16 bg-transparent"
          }
        >
          <div className={"md:order-none order-2"}>
            <h4 className={"text-xl lg:text-3xl font-bold mb-5"}>
              We only send valuable emails, you are safe from spam emails.
            </h4>
            <p>Go ahead and explore them to find some really cool NFTs.</p>
            <div className={`${isMobile ? "" : "mt-8"}`}>
              <form onSubmit={subscribe}>
                <div
                  className={
                    "flex gap-2 justify-between items-center border border-white rounded-lg p-2"
                  }
                >
                  <input
                    name={"email"}
                    type={"text"}
                    className={
                      "text-sm w-full border-white bg-transparent outline-0 p-3 rounded-lg"
                    }
                    placeholder={"SUBSCRIBE TO OUR NEWSLETTER"}
                  />
                  <button
                    type={"submit"}
                    disabled={subscribing}
                    className={" p-3 rounded-lg"}
                  >
                    {subscribing ? (
                      <FiLoader size={22} className="animate-spin" />
                    ) : (
                      <FiArrowRight size={32} />
                    )}
                  </button>
                </div>
              </form>
              <p
                className={`${
                  message.success ? "text-accent" : "text-red-500"
                } mt-3`}
              >
                {message.message}
              </p>
            </div>
          </div>
          <div
            className={
              "flex items-center justify-center relative w-full order-1 md:order-none m-auto text-center"
            }
          >
            <Image
              src={"/assets/images/official-gmail-icon-2020-.svg"} // Gmail logosunun yolu
              width={isMobile ? 90 : 300} // Mobilde 100px, webde 300px genişlik
              height={isMobile ? 80 : 270} // Mobilde 90px, webde 270px yükseklik
              alt="Gmail Logo"
            />
          </div>
        </div>

        <div className={`${isMobile ? "" : " mt-4"} relative flex items-center justify-center min-h-[320px]`}>
          {/* İçerik */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-[90vw] lg:w-[80vw]">
            <div className={`${isMobile ? "" : "mt-8"} flex flex-row gap-8 items-start `}>
              {/* Sol Kolon - Linkler */}
              <div className={`${isMobile ? "space-y-2" : "space-y-4"} flex flex-col  text-white`}>
                <a
                  href="https://www.brnmetaverse.net/token"
                  className="hover:text-gray-400"
                >
                  $BRN
                </a>
                <a
                  href="https://stake.brntoken.net/"
                  className="hover:text-gray-400"
                >
                  Stake
                </a>
                <a
                  href="https://whitepaper.brnmetaverse.net/"
                  className="hover:text-gray-400"
                >
                  Whitepaper
                </a>
                <a
                  href="https://github.com/interfinetwork/smart-contract-audits/blob/audit-updates/BRNMetaverse_0x926ecC7687fCFB296E97a2b4501F41A6f5F8C214.pdf"
                  className="hover:text-gray-400"
                >
                  Audit
                </a>
                <a
                  href="https://www.brnmetaverse.net/assets/docs/legal-opinion.pdf"
                  className="hover:text-gray-400"
                >
                  Legal Opinion
                </a>
                <a href="#link3" className="hover:text-gray-400">
                  Roadmap
                </a>
                <a href="#link3" className="hover:text-gray-400">
                  Endless Ranger Awakening
                </a>
                <a href="#link3" className="hover:text-gray-400">
                  Brain
                </a>
                <a href="#link3" className="hover:text-gray-400">
                  Dracarys
                </a>
              </div>

              {/* Dikey Çizgi */}
              <div className="border-[1px] border-gray-700 self-stretch"></div>

              {/* Sağ Kolon - Platform Listesi */}
              <div className={`${isMobile ? "" : "gap-5"} flex flex-col items-start text-white`}>
                <h1 className={`${archivo_black} font-bold text-lg`}>
                  Available Platforms:
                </h1>

                {/* Liste şeklinde platformları gösteriyoruz */}
                <ul className="list-none space-y-2 w-full">
                  {data?.data?.attributes?.Footer?.AvailableOn.map(
                    (platform) => (
                      <li
                        key={platform.id}
                        className="border-b border-gray-700 pb-2"
                      >
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4"
                        >
                          <img
                            src={
                              platform?.PlaceImage?.data?.attributes?.url
                                ? getStrapiMedia(
                                    platform.PlaceImage.data.attributes
                                  )
                                : "/path/to/default_image.png"
                            }
                            alt={platform?.PlaceImage?.data?.attributes?.name || "alternativeText"}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: 500,
                            }}
                          />
                          <span className="whitespace-nowrap">
                            {platform.name}
                          </span>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Image Section with Logos Positioned on Top */}
            <div
              className={`${isMobile ? "" : "gap-y-8"} relative flex flex-col`}
            >
              {/* CMC'den alınan veriyi burada gösteriyoruz */}
              <div className="flex flex-row gap-8 items-center">
                {/* Image */}
                <Image src={BRNLogo} alt={""} height={100} width={100} />

                {/* Error Display */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Coin Data */}
                {coinData ? (
                  <div className="relative flex flex-col justify-center">
                    <h2
                      className={`${archivo_black.className} font-bold text-2xl self-center`}
                    >
                      $BRN Price:
                    </h2>
                    <h3
                      className={`${archivo_black.className} font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] via-[#7B3FE4] to-[#22D3EE] self-center`}
                    >
                      ${coinData.data?.BRN[0]?.quote?.USD?.price?.toFixed(4)}
                    </h3>
                  </div>
                ) : (
                  <p>Yükleniyor...</p>
                )}
              </div>

              <div className="border-b border-gray-700 pb-2"></div>

              {/* Sosyal Medya Logolarını Burada Görüntüleyin */}
              <div className="flex justify-center space-x-6">
                {data?.data?.attributes?.Social?.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative hover:scale-110 transition-transform ${
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
                      src={getStrapiMedia(social.Icon.data.attributes)}
                      alt={social.name}
                      style={{ width: "40px", height: "40px" }}
                    />
                  </a>
                ))}
              </div>

              <div className="border-b border-gray-700 pb-2"></div>

              <h3
                className={`${archivo_black.className} font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] via-[#7B3FE4] to-[#22D3EE] self-center`}
              >
                support@brntoken.net
              </h3>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
