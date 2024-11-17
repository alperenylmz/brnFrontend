"use client";
import { archivo_black } from "@/config/fonts";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { getStrapiMedia } from "@/lib/media";

interface PatchNote {
  id: number;
  attributes: {
    Title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Description: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>; 
    }>; 
    miniDescription: string;
    coverImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export default function Page() {
  const [patchNotes, setPatchNotes] = useState<PatchNote[]>([]);

  useEffect(() => {
    async function fetchPatchNotes() {
      try {
        const response = await fetch("http://localhost:1337/api/patch-notes?populate[coverImage]=*&populate[Seo][populate][SharedImage][populate][media]=*"); // API URL'yi güncelleyin
        const data = await response.json();
        setPatchNotes(data.data);
      } catch (error) {
        console.error("Error fetching patch notes:", error);
      }
    }
    fetchPatchNotes();
  }, []);

  return (
    <main className="relative flex bg-gradient-home flex-col items-center justify-center">
      {/* Arka Plan Video */}
      <div className="relative h-screen w-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/assets/videos/landingpage.mp4" // Video kaynağını buraya ekleyin
          autoPlay
          loop
          muted
        />
      </div>

      {/* About Us Bölümü */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] pt-16">
        <div className="relative z-10 w-full h-full flex items-center justify-center py-10">
          <div
            className={
              "w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center text-white"
            }
          >
            <h2
              className={`${archivo_black.className} uppercase text-4xl lg:text-5xl mb-2`}
            >
              GAME
            </h2>
          </div>
        </div>
        <div
          className={`relative lg:min-h-[500px] w-full flex flex-col lg:flex-row items-center gap-3 justify-between px-4 lg:px-32`}
        >
          {/* Metin Bölümü */}
          <div className="justify-start w-full">
            <p className="text-lg text-justify lg:text-xl">
              <span
                className={`${archivo_black.className} text-white text-2xl lg:text-4xl font-extrabold block mb-4`}
              >
                What is ERA
              </span>
              At BRN Metaverse, we are revolutionizing the future of digital
              interaction and gaming by seamlessly merging the virtual world
              with reality. Our innovative platform harnesses the power of
              cutting-edge technology, including Blockchain, Artificial
              Intelligence, and Web 3.0, to create an immersive metaverse
              experience. We aim to redefine gaming by integrating play-to-earn
              mechanics, virtual economies, and in-game inventories, where every
              asset has real-world value. Players can explore new dimensions of
              gaming, where rarity, demand, and utility determine the worth of
              their in-game assets, turning gaming into more than just
              entertainment—it's an economic adventure. Join us as we lead the
              charge in shaping the future of tech-driven interactions and
              groundbreaking digital experiences. BRN Metaverse is where the
              boundaries of the virtual and real worlds blur, creating limitless
              possibilities for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Patch Notes Bölümü */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-[50vh] py-8 px-4 lg:px-32">
        <div className="w-full text-left text-white mb-8">
          <h2 className={`${archivo_black.className} text-2xl lg:text-4xl font-extrabold mb-4`}>Patch Notes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {patchNotes.map((note) => (
            <a
              key={note.id}
              href={`/game/${note.attributes.slug}`}
              className="bg-black bg-opacity-40 text-white p-6 rounded-lg shadow-lg w-full transition-transform duration-300 hover:scale-105 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Patch Note Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={
                    note?.attributes?.coverImage?.data?.attributes?.url
                      ? getStrapiMedia(note.attributes.coverImage.data.attributes)
                      : "/default/path/to/patchnotes.webp"
                  }
                  alt={note.attributes.Title}
                  width={400}
                  height={225}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Patch Note Title */}
              <h3
                className={`${archivo_black.className} text-2xl text-cyan-400 font-bold text-center mb-4`}
              >
                {note.attributes.Title}
              </h3>

              {/* Patch Note Description */}
              <p className="text-sm lg:text-base text-justify mb-4">
                {note.attributes.miniDescription}
              </p>

              {/* Visit Link */}
              <div className="text-center mt-4">
                <span className="text-cyan-500 hover:text-cyan-300 underline transition-all duration-200">
                  Click for more
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FQA Bölümü */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-[50vh] py-16 px-4 lg:px-32">
        <div className="w-full text-left text-white mb-8">
          <h2 className={`${archivo_black.className} text-2xl lg:text-4xl font-extrabold mb-4`}>FQA</h2>
        </div>
        <div className="w-full text-left text-white space-y-6">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold mb-2">Nedir?</h3>
            <p className="text-sm lg:text-base text-justify">
              BRN Metaverse, dijital etkileşim ve oyun dünyasında devrim yaratmayı amaçlayan bir platformdur. Sanal dünya ile gerçek dünyayı birleştirerek kullanıcılar için eşsiz bir deneyim sunuyor.
            </p>
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold mb-2">Nasıl oynanır?</h3>
            <p className="text-sm lg:text-base text-justify">
              Oyuna katılmak oldukça basit. BRN Metaverse platformuna kaydolduktan sonra karakterinizi oluşturabilir ve sanal dünyada maceraya başlayabilirsiniz. Oyun, keşif, görevler ve rekabetçi etkinlikler içerir.
            </p>
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold mb-2">Oyunun amacı nedir?</h3>
            <p className="text-sm lg:text-base text-justify">
              Oyunun temel amacı, sanal dünyada görevleri tamamlamak, kaynakları toplamak ve diğer oyuncularla etkileşime girerek kendinizi geliştirmektir. Ayrıca, play-to-earn mekanizmasıyla gerçek dünya değeri taşıyan ödüller kazanabilirsiniz.
            </p>
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-bold mb-2">Play to Earn Mekanizması?</h3>
            <p className="text-sm lg:text-base text-justify">
              Play-to-earn mekanizması, oyuncuların oyun içi aktivitelerle gerçek dünya değeri taşıyan kripto varlıklar kazanmalarını sağlar. Görevleri tamamlayarak, turnuvalarda başarılı olarak ve sanal ekonomide yer alarak kazanç elde edebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
