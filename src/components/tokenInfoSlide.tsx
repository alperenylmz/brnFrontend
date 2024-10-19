"use client";
import { ellipses } from "@/helpers/strings";
import { FiCheck, FiCopy } from "react-icons/fi";
import { useState } from "react";
import useConfig from "@/hooks/useConfig";
import { archivo_black } from "@/config/fonts";

interface TokenInfoSlideProps {
  coinData: any; // Burada coinData'nın tipini belirtebilirsiniz
}

const TokenInfoSlide = ({ coinData }: TokenInfoSlideProps) => {
  const [textCopied, setTextCopied] = useState(false);
  const [{ token: tokenInformation }] = useConfig("token");

  return (
    <div
      className={
        "w-full p-5 bg-gradient-to-r from-[#3B82F6] via-[#7B3FE4] to-[#22D3EE] rounded-2xl shadow-lg animate-gradient"
      }
      style={{ width: "500px" }} // Slide genişliği artırıldı
    >
      <div className={"flex gap-8 mb-5"}>
        <div className={"flex flex-col"}>
          <h3
            className={`${archivo_black.className} uppercase text-4xl font-bold text-white drop-shadow-lg`}
          >
            BRN
          </h3>
          <p className={"text-sm uppercase text-gray-200"}>Symbol</p>
        </div>
        <div className={"flex flex-col"}>
          <h3
            className={`${archivo_black.className} uppercase text-4xl font-bold text-white drop-shadow-lg`}
          >
            18
          </h3>
          <p className={"text-sm uppercase text-gray-200"}>Decimal</p>
        </div>
        {coinData && (
          <div className="flex flex-col">
            <h3
            className={`${archivo_black.className} uppercase text-4xl font-bold text-white drop-shadow-lg`}
          >
            ${coinData.data?.BRN[0]?.quote?.USD?.price.toFixed(4)}
          </h3>
          <p className={"text-sm uppercase text-gray-200"}>Price</p>
          </div>
        )}
      </div>
      <div
        className={
          "flex items-center justify-between gap-3 bg-white/20 text-white rounded-lg font-bold text-sm w-full p-3"
        }
      >
        {tokenInformation?.address && (
          <div className="flex-grow">
            <span className="block md:hidden">
              {ellipses(20, tokenInformation?.address ?? "", "***")}
            </span>
            <span className="hidden md:block">
              {tokenInformation?.address ?? ""}
            </span>
          </div>
        )}
        <button
          disabled={textCopied}
          onClick={async () => {
            await navigator.clipboard.writeText(tokenInformation?.address);
            setTextCopied(true);
            setTimeout(() => {
              setTextCopied(false);
            }, 3000);
          }}
          className={
            "bg-white text-accent p-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
          }
        >
          {textCopied ? (
            <FiCheck size={22} className="text-green-500" />
          ) : (
            <FiCopy size={22} />
          )}
        </button>
      </div>
    </div>
  );
};

export default TokenInfoSlide;
