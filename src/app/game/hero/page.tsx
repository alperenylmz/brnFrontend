"use client";
import { archivo_black, poppins } from "@/config/fonts";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getStrapiMedia } from "@/lib/media";
import ThreeScene from "@/components/three-scene";

interface SkillLogo {
  id: number;
  attributes: {
    name: string;
    url: string;
  };
}

interface Ability {
  id: number;
  Title: string;
  Description: string;
  SkillLogo: {
    data: SkillLogo;
  };
}

interface HeroAttributes {
  Name: string;
  Description: string;
  Role: string;
  Abilities: Ability[];
}

interface Hero {
  id: number;
  attributes: HeroAttributes;
}

export default function Hero() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [skillIndex, setSkillIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  const [screen] = useScreenSize();

  useEffect(() => {
    const fetchHeroes = async () => {
      const response = await fetch(
        "http://localhost:1337/api/heroes?populate=*&populate[HeroImage]&populate[Abilities][populate][SkillLogo][populate][SkillVideo]=*"
      );
      const data = await response.json();
      setHeroes(data.data);
    };
    fetchHeroes();
  }, []);

  useEffect(() => {
    if (screen.width <= 400) {
      setCurrentIndex(0);
    }
  }, [screen]);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <main className="flex flex-col bg-gradient-home items-center justify-center">
      <div className="flex items-center justify-center h-[70vh] lg:h-[40vh] min-h-[40vh] w-full">
        <div className="w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center">
          <h2
            className={`${archivo_black.className} uppercase text-4xl lg:text-5xl mb-5`}
          >
            Heroes
          </h2>
          <p>
            Be up to date with what we are about and the current waves of web3
            and the metaverse.
          </p>
        </div>
      </div>
      <div className="flex items-start w-[90vw] h-auto overflow-clip relative">
        {/* Special Abilities Section */}
        <div className="w-[50vw] lg:w-[40vw] p-5 bg-glass rounded-xl border-2 border-gray-500 border-opacity-10">
          <h2
            className={`${archivo_black.className} uppercase text-2xl lg:text-3xl mb-5`}
          >
            Special Abilities
          </h2>
          <div className="flex flex-row gap-4">
            {heroes[currentIndex]?.attributes.Abilities.map(
              (ability, index) => (
                <div
                  key={index}
                  className={`p-1 border rounded-full cursor-pointer ${
                    skillIndex === index
                      ? "border-accent shadow-[0_0_10px_3px_rgba(58,123,253,0.6)]"
                      : "border-primary-light"
                  }`}
                  onClick={() => setSkillIndex(index)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        ability?.SkillLogo?.data?.attributes?.url
                          ? getStrapiMedia(ability.SkillLogo.data.attributes)
                          : "/path/to/default_image.png"
                      }
                      alt={ability.Title}
                      className="rounded-full h-12 w-12"
                    />
                  </div>
                </div>
              )
            )}
          </div>
          <div className="py-8">
            <h3 className="text-lg font-bold">
              {heroes[currentIndex]?.attributes.Abilities[skillIndex]?.Title}
            </h3>
            <p className="text-gray-300 text-sm">
              {
                heroes[currentIndex]?.attributes.Abilities[skillIndex]
                  ?.Description
              }
            </p>
          </div>

          {/* Video Section */}
          <div className="py-8">
            {heroes[currentIndex]?.attributes.Abilities.map(
              (ability, index) =>
                index === skillIndex &&
                ability.SkillLogo.data.attributes.url && (
                  <video
                    key={index}
                    controls={true}
                    className="w-full object-cover rounded-lg border-accent shadow-[0_0_10px_5px_rgba(58,123,253,0.6)]"
                  >
                    <source src={ability.SkillLogo.data.attributes.url} />
                    No Video
                  </video>
                )
            )}
          </div>
        </div>

        {/* Hero Names and ThreeScene */}
        <div className="w-[50vw] flex flex-col justify-center items-center">
          <div className="flex gap-5 justify-start">
            {heroes.map((hero, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`${archivo_black.className} ${
                  currentIndex === index ? "text-accent font-bold" : ""
                } transition-all text-3xl uppercase cursor-pointer`}
              >
                {hero.attributes.Name}
              </div>
            ))}
          </div>
          {/* ThreeScene Component */}
          <div className="w-full flex justify-center">
            <ThreeScene />
          </div>
        </div>
      </div>
    </main>
  );
}
