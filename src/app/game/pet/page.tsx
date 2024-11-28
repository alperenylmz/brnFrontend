/* Sağ tarafta seçilen pet'in büyük görünümünü tüm sayfayı kaplayacak şekilde arka plan olarak ayarlama */

"use client";
import { archivo_black } from "@/config/fonts";
import { getStrapiMedia } from "@/lib/media";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LinkCardsSection from "@/components/game-link-card";

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
          backgroundImage: `url(${
            selectedPet?.attributes?.Gif?.data?.attributes?.url
              ? getStrapiMedia(selectedPet.attributes.Gif.data.attributes)
              : "/default/path/to/pets.webp"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Sol tarafta dikey swiper - Glass Container */}
        <div className="absolute top-[20%] bottom-[10%] left-[8%] w-[15vh]">
          <div className="bg-glass border-2 border-gray-400 backdrop-blur-lg p-4 rounded-lg shadow-lg h-[80%] flex items-center justify-center">
            <Swiper
              direction="vertical"
              style={{ height: "100%" }} // Swiper'ın yüksekliğini kapsayıcıya tam oturtmak için
              spaceBetween={10}
              slidesPerView={5}
              onSlideChange={(swiper) =>
                setSelectedPet(pets[swiper.activeIndex])
              }
            >
              {pets.map((pet) => (
                <SwiperSlide
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)}
                  className="cursor-pointer p-2"
                >
                  <img
                    src={
                      pet.attributes.PetIcon?.data?.attributes?.url
                        ? getStrapiMedia(pet.attributes.PetIcon.data.attributes)
                        : "/default/path/to/pets.webp"
                    }
                    alt={pet.attributes.PetName}
                    width={80}
                    height={80}
                    className={`border border-gray-300 ${
                      selectedPet?.id === pet.id
                        ? "border-4 border-accent shadow-[0_0_5px_3px_rgba(58,123,253,0.6)]"
                        : ""
                    }`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Sağ tarafta seçilen pet'in büyük görünümü */}
        <div className="w-[70vh] pt-4 p-4 flex flex-col items-center">
          {selectedPet && (
            <div className="bg-glass shadow-lg p-6 rounded-lg flex flex-col items-center w-3/4 h-full">
              <h3
                className={`${archivo_black.className} text-4xl font-bold mb-4 text-white`}
              >
                {" "}
                {/* Yazı boyutunu büyüttüm */}
                {selectedPet.attributes.PetName}
              </h3>
              <p className="text-2xl text-gray-200">
                {" "}
                {/* Yazı boyutunu büyüttüm */}
                Health Points:{" "}
                {selectedPet.attributes.PetHP !== null
                  ? selectedPet.attributes.PetHP
                  : "N/A"}
              </p>
            </div>
          )}
        </div>
        </div>
        <div className="items-center bg-black py-12">
          <LinkCardsSection />
        </div>

        {/* Geçiş efekti için span */}
        <span className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></span>
    </main>
  );
}
