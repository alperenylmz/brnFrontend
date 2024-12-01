import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { archivo_black } from "@/config/fonts";

interface LinkCardProps {
  title: string;
  imageUrl: string;
  link: string;
  description: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
  title,
  imageUrl,
  link,
  description,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [objectFitClass, setObjectFitClass] = useState("object-cover");

  return (
    <Link href={link} legacyBehavior>
      <a className="flex flex-col items-center space-y-4">
        {/* Title Outside and Above Card */}
        <div className="text-center py-2">
          <h3
            className={`${archivo_black.className} text-white text-2xl font-bold`}
          >
            {title}
          </h3>
        </div>
        {/* Card Structure */}
        <div className="relative bg-glass border-2 border-gray-400 w-full h-80 rounded-lg overflow-hidden shadow-2xl">
          {/* Image */}
          <Image
            src={imageUrl}
            alt={title}
            fill={true}
            className={`rounded-lg ${objectFitClass}`}
            onLoadingComplete={() => {
              const imgElement = imageRef.current;
              if (imgElement) {
                const { naturalWidth, naturalHeight } = imgElement;
                if (naturalWidth > naturalHeight) {
                  setObjectFitClass("object-cover");
                } else {
                  setObjectFitClass("object-contain");
                }
              }
            }}
            ref={imageRef}
          />
        </div>
        {/* Description */}
        <p className="text-center text-white text-sm py-4">{description}</p>
      </a>
    </Link>
  );
};

export default function LinkCardsSection() {
  const cards = [
    {
      title: "Rangers",
      imageUrl: "/assets/images/heroes/witch.png",
      link: "/game/hero",
      description:
        "Be up to date with what we are about and the current waves of web3 and the metaverse.",
    },
    {
      title: "Arenas",
      imageUrl: "/assets/images/arenas/Boss/Wild/1.png",
      link: "/game/map",
      description:
        "Be up to date with what we are about and the current waves of web3 and the metaverse.",
    },
    {
      title: "Pets",
      imageUrl: "/assets/images/pets/pet.gif",
      link: "/game/pet",
      description: "Explore the pets and their unique abilities.",
    },
  ];

  return (
    <section className="w-full py-12 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <LinkCard
            key={index}
            title={card.title}
            imageUrl={card.imageUrl}
            link={card.link}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}
