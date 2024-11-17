"use client";
import { archivo_black, poppins } from "@/config/fonts";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getStrapiMedia } from "@/lib/media";

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

  const handleClick = (event: any) => {
    const clickedElement = event.target;
    const clientIndex = Number(clickedElement.getAttribute("data-id"));
    setCurrentIndex(clientIndex);
    if (currentIndex > clientIndex) {
      swiperRef.current?.swiper.slidePrev();
    } else {
      swiperRef.current?.swiper.slideNext();
    }
  };

  return (
    <main className="flex flex-col bg-gradient-home items-center justify-center">
      <div
        className={
          "flex items-center justify-center h-[70vh] lg:h-[50vh] min-h-[50vh] py-16 w-full"
        }
      >
        <div className={"w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center"}>
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
      <div className={"flex items-start w-[90vw] h-[600px] overflow-clip p-8"}>
        <div className={"hidden md:block h-[600px] w-[50vw]"}>
          <Swiper
            ref={swiperRef}
            direction={"vertical"}
            slidesPerView={"auto"}
            className="mySwiper"
          >
            {heroes.map((hero, index) => (
              <SwiperSlide key={index} className={"my-5"}>
                <div
                  data-id={index}
                  onClick={handleClick}
                  className={`${archivo_black.className} ${
                    currentIndex === index ? "text-accent" : ""
                  } 
                                    transition-all lg:hover:ml-5 text-3xl md:text-5xl lg:text-6xl uppercase select-none cursor-pointer`}
                >
                  {hero.attributes.Name}
                  <div className={"text-xs"}>
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={"md:hidden flex h-[90px] w-[90vw]"}>
          <Swiper
            ref={swiperRef}
            slidesPerView={2}
            spaceBetween={15}
            className="mySwiper"
          >
            {heroes.map((hero, index) => (
              <SwiperSlide key={index}>
                <div
                  data-id={index}
                  onClick={handleClick}
                  className={`${archivo_black.className} ${
                    currentIndex === index ? "text-accent" : ""
                  } 
                                    transition-all lg:hover:ml-3 text-2xl md:text-5xl lg:text-6xl uppercase select-none cursor-pointer min-w-[200px]`}
                >
                  {hero.attributes.Name}
                  <div className={"text-xs"}>
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className={
            "absolute w-[90vw] lg:w-[40vw] translate-x-[50%] top-[75%] lg:top-[50%] right-[50%] lg:right-[35%]"
          }
        >
          {heroes.map((hero, index) => (
            <div
              key={index}
              className={`absolute bounce ${archivo_black.className} ${
                currentIndex === index
                  ? "opacity-100 visible top-0"
                  : "opacity-0 invisible top-36"
              } h-[850px] w-full transition-all select-none cursor-pointer pointer-events-none`}
            >
              <Image
                src={`/assets/images/heroes/${hero.attributes.Name.toLowerCase()}.png`}
                alt={hero.attributes.Name}
                fill={true}
                className={"object-contain"}
              />
              <div
                className={
                  "absolute bottom-[-120px] bg-primary-light p-5 rounded-xl lg:w-[500px]"
                }
              >
                <div className={"mb-5"}>
                  <div className={"flex gap-3 items-center"}>
                    <Image
                      src={`/assets/images/symbols/${
                        hero.attributes.Role.charAt(0).toUpperCase() +
                        hero.attributes.Role.slice(1).toLowerCase()
                      }.png`}
                      className="rounded-full border-2 border-accent"
                      alt={hero.attributes.Role}
                      height={35}
                      width={35}
                    />

                    <h4
                      className={`text-xl uppercase ${archivo_black.className}`}
                    >
                      {hero.attributes.Role}
                    </h4>
                  </div>
                </div>
                <p
                  className={`${poppins.regular.className} text-sm leading-6 text-gray-300`}
                >
                  {hero.attributes.Description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={"h-[60vh]"} />
      <div className={"relative pb-16"}>
        <div className={"w-[90vw] lg:w-[80vw] m-auto "}>
          <h2
            className={`${archivo_black.className} uppercase text-4xl lg:text-5xl mb-5`}
          >
            Special Abilities
          </h2>
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
          <div className={"order-2 md:order-none"}>
            <div className={"my-8 lg:my-16"}>
              <div className={"max-w-[90vw]"}>
                <div className={"relative inline-block"}>
                  <div
                    className={
                      "flex items-center justify-between gap-5 lg:gap-12"
                    }
                  >
                    {heroes[currentIndex]?.attributes.Abilities.map(
                      (ability, index) => (
                        <div
                          onClick={() => setSkillIndex(index)}
                          key={index}
                          className={"inline-block cursor-pointer"}
                        >
                          <div className={"flex gap-3"}>
                            <img
                              src={
                                ability?.SkillLogo?.data?.attributes?.url
                                  ? getStrapiMedia(
                                      ability.SkillLogo.data.attributes
                                    )
                                  : "/path/to/default_image.png"
                              }
                              className={`rounded-full border-2 ${
                                index === skillIndex
                                  ? "border-accent"
                                  : "border-primary-light"
                              }`}
                              alt={ability.Title}
                              height={60}
                              width={60}
                            />
                          </div>
                        </div>
                      )
                    )}
                    <div
                      className={
                        "absolute left-0 w-full h-[5px] bg-primary-light z-[-99]"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className={
                  "flex flex-col gap-8 w-[90vw] md:w-[50vw] lg:w-[35vw]"
                }
              >
                <h3 className={"text-2xl font-bold"}>
                  {
                    heroes[currentIndex]?.attributes.Abilities[skillIndex]
                      ?.Title
                  }
                </h3>
                <p className={"text-gray-300"}>
                  {
                    heroes[currentIndex]?.attributes.Abilities[skillIndex]
                      ?.Description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className={"order-1 md:order-none"}>
            {heroes[currentIndex]?.attributes.Abilities.map(
              (ability, index) =>
                index === skillIndex &&
                ability.SkillLogo.data.attributes.url && (
                  <video
                    key={index}
                    controls={true}
                    className={
                      "h-full max-w-[90vw] lg:max-w-[40vw] object-cover"
                    }
                  >
                    <source src={ability.SkillLogo.data.attributes.url} />
                    No Video
                  </video>
                )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
