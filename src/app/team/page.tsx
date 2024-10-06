"use client";
import Image from "next/image";
import { archivo_black, poppins } from "@/config/fonts";
import { focused_industries, NFTCollections, token_allocations } from "@/data";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FiCopy, FiLinkedin } from "react-icons/fi";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import useConfig from "@/hooks/useConfig";
import formatNumber from "@/helpers";
import { fetchAPI } from "@/lib/api";
import { getStrapiMedia } from "@/lib/media";

interface TeamPageData {
  data: {
    id: number;
    attributes: {
      Title: string;
      Description: Array<{
        type: string;
        children: Array<{
          type: string;
          text: string;
        }>;
      }>;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      TeamBlocks: Array<{
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
                  name: string;
                  hash: string;
                  ext: string;
                  mime: string;
                  path: string | null;
                  width: number;
                  height: number;
                  size: number;
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
      }>;
    };
  };
}

export default function Team() {
  const [team, setTeam] = useState([]);
  const [{ token: tokenInformation }] = useConfig("token");
  const [data, setData] = useState<TeamPageData>();

  let API_HOST = "http://localhost:1337/";

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetchAPI<TeamPageData>(
          "/api/team?populate[TeamBlocks][populate][Photo]=*"
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
          "flex items-center justify-center min-h-[50vh] bg-gradient-token py-16"
        }
      >
        <div className={"w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center"}>
          <h2
            className={`${archivo_black.className} uppercase text-2xl lg:text-5xl mb-5 text-secondary`}
          >
            Our <span className={"text-accent"}>Team</span>
          </h2>
          <p>{data?.data?.attributes?.Description[0].children[0].text}</p>
        </div>
      </div>

      <div className={"flex justify-center items-center min-h-[100vh] py-16"}>
        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[90vw] md:w-[80vw] lg:w-[65vw]"
          }
        >
          {data?.data?.attributes?.TeamBlocks?.sort(
            (a: any, b: any) => a.order_index - b.order_index
          ).map((member: any, index) => (
            <div
              key={index}
              className={"relative bg-primary-dark rounded-lg p-3"}
            >
              <div className={"relative h-[350px] rounded-lg overflow-hidden"}>
                <img
                  src={
                    member?.Photo?.data?.attributes?.formats?.large?.url
                      ? getStrapiMedia(
                          member?.Photo?.data?.attributes?.formats?.large
                        )
                      : "/default/path/to/coinsites.webp"
                  }
                  alt={member.NameSurname}
                  className={"object-cover object-top w-full h-full"}
                />
              </div>
              <div className={"text-center py-8"}>
                <h3 className={`${archivo_black.className} uppercase text-xl`}>
                  {member.NameSurname}
                </h3>
                <p className={"text-accent"}>{member.Position}</p>
              </div>

              <div
                className={
                  "absolute left-[50%] bottom-[-5%] translate-x-[-50%]"
                }
              >
                <Link
                  href={member.url}
                  className={
                    "flex items-center justify-center border-[10px] border-primary h-[70px] w-[70px] bg-accent rounded-full"
                  }
                >
                  <FiLinkedin size={22} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
