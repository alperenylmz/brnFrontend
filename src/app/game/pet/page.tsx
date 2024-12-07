/* Sağ tarafta seçilen pet'in büyük görünümünü tüm sayfayı kaplayacak şekilde arka plan olarak ayarlama */

"use client";
import { archivo_black } from "@/config/fonts";
import { getStrapiMedia } from "@/lib/media";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LinkCardsSection from "@/components/game-link-card";
import useMediaQuery from "@/hooks/useMediaQuery";

interface PetIconAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

interface PetIcon {
  id: number;
  attributes: PetIconAttributes;
}

interface GifAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
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
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

interface Gif {
  data: {
    id: number;
    attributes: GifAttributes;
  } | null;
}

interface PetAttributes {
  PetName: string;
  PetHP: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  role: string | null;
  Description: string | null;
  AutoAttackDamage: number | null;
  SkillDamage: string | null;
  SkillEffect: string | null;
  PetIcon: {
    data: PetIcon;
  };
  Gif: Gif;
}

interface PetData {
  id: number;
  attributes: PetAttributes;
}

interface PetApiResponse {
  data: PetData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function Page() {
  const [pets, setPets] = useState<PetData[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: Math.random() * 0.5,
        dy: Math.random() * 0.5,
        alpha: Math.random() * 0.5 + 0.5,
      }));

      const drawStars = () => {
        if (ctx) {
          // Temizleme
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Yıldızların çizilmesi
          stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
            star.x += star.dx;
            star.y += star.dy;
            if (star.x > canvas.width || star.x < 0) star.dx *= -1;
            if (star.y > canvas.height || star.y < 0) star.dy *= -1;
          });

          // Animasyon devamı
          requestAnimationFrame(drawStars);
        }
      };

      drawStars();
    }
  }, []);

  useEffect(() => {
    // API'den veri çekme kısmı
    const fetchPets = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/pets?populate=*"
        );
        const data: PetApiResponse = await response.json();
        setPets(data.data);
        setSelectedPet(data.data[0]); // İlk pet'i varsayılan olarak seç
      } catch (error) {
        console.error("Error fetching pets: ", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <main className="bg-gradient-home">
      <div
        className="flex flex-row items-start justify-center py-16 w-full h-screen relative"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {selectedPet?.attributes?.Gif?.data?.attributes?.url ? (
          // Eğer medya bir video ise
          <video
            src={getStrapiMedia(selectedPet.attributes.Gif.data.attributes)}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // Eğer medya yoksa varsayılan arka plan
          <div
            style={{
              backgroundImage: `url(/default/path/to/pets.webp)`,
            }}
            className="absolute inset-0 w-full h-full bg-cover"
          />
        )}
        {/* Sol tarafta dikey swiper - Glass Container */}
        <div className="absolute top-[20%] bottom-[10%] left-[8%] w-[25vh]">
          <div className="bg-glass border-2 border-gray-400 backdrop-blur-lg p-2 rounded-lg shadow-lg h-[90%] flex items-center justify-center">
            <Swiper
              direction="vertical"
              style={{ height: "100%" }} // Swiper'ın yüksekliğini kapsayıcıya tam oturtmak için
              spaceBetween={10}
              slidesPerView={5}
            >
              {pets.map((pet) => (
                <SwiperSlide
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)}
                  className="cursor-pointer p-2 relative"
                >
                  {/* PetIcon ve Role İkonu birlikte */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        pet.attributes.PetIcon?.data?.attributes?.url
                          ? getStrapiMedia(
                              pet.attributes.PetIcon.data.attributes
                            )
                          : "/default/path/to/pets.webp"
                      }
                      alt={pet.attributes.PetName}
                      width={80}
                      height={80}
                      className={`border border-gray-300 rounded-lg ${
                        selectedPet?.id === pet.id
                          ? "border-4 border-accent shadow-[0_0_5px_3px_rgba(58,123,253,0.6)]"
                          : ""
                      }`}
                    />
                    {/* Role İkonu */}
                    {pet.attributes.role && (
                      <div className="flex items-center justify-center">
                        <div className="bg-white ml-2 p-1 rounded-full shadow-md">
                          {pet.attributes.role.toLowerCase() === "tank" ? (
                            <img
                              src="/assets/images/symbols/Tank.png" // Tank ikonu için yol
                              alt="Tank"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <img
                              src="/assets/images/symbols/Warrior.png" // Warrior veya diğer roller için ikon
                              alt="Damage"
                              width={40}
                              height={40}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Sağ tarafta seçilen pet'in büyük görünümü */}
        <div className="w-[100vh] pt-4 p-4 flex flex-col items-center justify-center">
          {selectedPet && (
            <div className="flex flex-col gap-32 items-center">
              <div className="bg-glass shadow-lg p-6 rounded-lg flex flex-col items-center justify-center w-3/4 h-full border-2 border-gray-400 backdrop-blur-lg">
                <h3
                  className={`${archivo_black.className} text-4xl font-bold mb-4 text-white`}
                >
                  {" "}
                  {/* Yazı boyutunu büyüttüm */}
                  {selectedPet.attributes.PetName}
                </h3>
                <p>
                  {selectedPet.attributes.Description !== null
                    ? selectedPet.attributes.Description
                    : "N/A"}
                </p>
                <div className="flex flex-col p-4">
                  <div className="flex flex-row items-center justify-center gap-16">
                    <div className="flex flex-col gap-4 items-center">
                      <img
                        src="/assets/images/symbols/auto.svg"
                        alt="Auto Attack Damage"
                        width={50}
                        height={50}
                      />
                      <p className="font-bold">
                        {selectedPet.attributes.AutoAttackDamage !== null
                          ? selectedPet.attributes.AutoAttackDamage
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                      <img
                        src="/assets/images/symbols/skill.svg"
                        alt="Skill Attack Damage"
                        width={50}
                        height={50}
                      />
                      <p className="font-bold">
                        {selectedPet.attributes.SkillDamage !== null
                          ? selectedPet.attributes.SkillDamage
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                      <img
                        src="/assets/images/symbols/health.svg" // Warrior veya diğer roller için ikon
                        alt="Health Points"
                        width={50}
                        height={50}
                      />
                      <p className="font-bold">
                        {selectedPet.attributes.PetHP !== null
                          ? selectedPet.attributes.PetHP.toFixed(2)
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <p className="text-white py-4">
                    {selectedPet.attributes.SkillEffect !== null
                      ? selectedPet.attributes.SkillEffect
                      : "N/A"}{" "}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <span className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent z-20"></span>
      </div>
      <div className="relative z-0 flex flex-col bg-gradient-to-b from-black via-fuchsia-900 to-black items-center justify-center w-full h-screen">
        {/* Canvas for Background Animation */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        ></canvas>

        {/* LinkCardsSection */}
        <div className="relative z-10 w-full max-w-6xl py-12">
          <LinkCardsSection />
        </div>
      </div>
    </main>
  );
}
