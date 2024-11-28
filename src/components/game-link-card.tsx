import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { archivo_black } from "@/config/fonts";

interface LinkCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ title, imageUrl, link }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      let animationFrameId: number;
      let direction = 1;
      let position = 0;

      const animate = () => {
        position += 0.5 * direction;
        if (position > 10 || position < -10) {
          direction *= -1;
        }
        card.style.transform = `translateY(${position}px)`;
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <Link href={link} legacyBehavior>
      <a>
        <div ref={cardRef} className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill={true}
            className="opacity-70 rounded-lg object-contain hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent">
            <div className={`${archivo_black.className} text-white text-xl font-semibold`}>
              {title}
            </div>
          </div>
        </div>
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
    },
    {
      title: "Arenas",
      imageUrl: "/assets/images/arenas/Boss/Wild/1.png",
      link: "/game/map",
    },
    {
      title: "Pets",
      imageUrl: "/assets/images/pets/pet.gif",
      link: "/game/pet",
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
          />
        ))}
      </div>
    </section>
  );
}
