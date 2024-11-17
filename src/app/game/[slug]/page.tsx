"use client"
import { useEffect, useState } from "react";
import { archivo_black } from "@/config/fonts";
import { getStrapiMedia } from "@/lib/media";
import parse from "html-react-parser";

interface PageProps {
  params: {
    slug: string;
  };
}

interface PatchNoteData {
  id: number;
  attributes: {
    Title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Description: string;
    coverImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const PatchNotePage = (props: PageProps) => {
  const [patchNote, setPatchNote] = useState<PatchNoteData | null>(null);
  const API_HOST = "http://localhost:1337";

  useEffect(() => {
    if (props.params.slug) {
      fetch(
        `${API_HOST}/api/patch-notes?filters[slug]=${props.params.slug}&populate[coverImage]=*&populate[Seo][populate][SharedImage][populate][media]=*`
      )
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const response = await res.json();
          if (response.data && response.data.length > 0) {
            setPatchNote(response.data[0]); // Set the first patch note
          } else {
            setPatchNote(null); // Handle no data found
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [props.params.slug]);

  return (
    <main className="flex flex-col items-start justify-center min-h-[60vh] m-auto w-[80vw] py-32">
      {patchNote ? (
        <div>
          <div
            className={
              "max-h-[500px] w-full bg-cover rounded-2xl overflow-clip"
            }
          >
            {patchNote.attributes.coverImage?.data ? (
              <img
                src={`${API_HOST}${patchNote.attributes.coverImage.data.attributes.url}`}
                alt={patchNote.attributes.Title}
                className={"w-full"}
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div className={"flex w-full my-8"}>
            <h1 className={`${archivo_black.className} text-4xl font-bold`}>
              {patchNote.attributes.Title}
            </h1>
          </div>
          <div>{parse(patchNote.attributes.Description)}</div>
        </div>
      ) : (
        <div className={"flex items-center justify-center"}>
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
};

export default PatchNotePage;
