/* Sağ tarafta seçilen pet'in büyük görünümünü tüm sayfayı kaplayacak şekilde arka plan olarak ayarlama */

'use client'
import { archivo_black } from "@/config/fonts";
import { getStrapiMedia } from "@/lib/media";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

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
        const response = await fetch("http://localhost:1337/api/pets?populate=*");
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
    <main
      className="flex flex-row bg-gradient-home items-start justify-center py-16 w-full h-screen"
      style={{
        backgroundImage: `url(${selectedPet?.attributes?.Gif?.data?.attributes?.url
          ? getStrapiMedia(selectedPet.attributes.Gif.data.attributes)
          : "/default/path/to/pets.webp"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Sol tarafta dikey swiper */}
      <div className="w-1/4 p-4 overflow-hidden">
        <Swiper direction="vertical" height={400} spaceBetween={0} slidesPerView={'auto'} onSlideChange={(swiper) => setSelectedPet(pets[swiper.activeIndex])}>
          {pets.map((pet) => (
            <SwiperSlide key={pet.id} onClick={() => setSelectedPet(pet)} className="cursor-pointer">
              <img
                src={
                  pet.attributes.PetIcon?.data?.attributes?.url
                    ? getStrapiMedia(pet.attributes.PetIcon.data.attributes)
                    : "/default/path/to/pets.webp"
                }
                alt={pet.attributes.PetName}
                width={60} height={60}
                className="rounded-full border border-gray-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Sağ tarafta seçilen pet'in büyük görünümü */}
      <div className="w-3/4 p-4 flex flex-col items-center">
        {selectedPet && (
          <div className="bg-glass p-6 rounded-lg shadow-md flex flex-col items-center w-full h-full">
            <h3 className="text-3xl font-bold mb-2 text-white">{selectedPet.attributes.PetName}</h3>
            <p className="text-lg text-gray-200">
              Health Points: {selectedPet.attributes.PetHP !== null ? selectedPet.attributes.PetHP : "N/A"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
