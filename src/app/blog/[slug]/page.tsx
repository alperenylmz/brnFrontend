"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import parse from "html-react-parser";
import Seo from "@/components/seo";

// Interface for the image formats
interface ImageFormat {
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
}

// Interface for the cover image attributes
interface CoverImageAttributes {
  url: string;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
  };
}

// Interface for the cover image data
interface CoverImageData {
  id: number;
  attributes: CoverImageAttributes;
}

// Interface for the cover image
interface CoverImage {
  data: CoverImageData | null;
}

// Interface for SEO shared image attributes
interface SharedImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
}

// Interface for SEO shared image data
interface SharedImageData {
  id: number;
  attributes: SharedImageAttributes;
}

// Interface for SEO shared image
interface SharedImage {
  data: SharedImageData | null;
}

// Interface for SEO information
interface SeoAttributes {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  SharedImage: {
    id: number;
    alt: string;
    media: SharedImage;
  };
}

// Interface for blog post attributes
interface BlogPostAttributes {
  Description: string;
  Title: string;
  coverImage: CoverImage;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  miniDescription: string;
  Seo: SeoAttributes;
}

// Interface for a single blog post
interface BlogPostData {
  id: number;
  attributes: BlogPostAttributes;
}

// Interface for the pagination meta
interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Interface for the API response meta
interface ResponseMeta {
  pagination: PaginationMeta;
}

// Interface for the API response
interface BlogResponse {
  data: BlogPostData[];
  meta: ResponseMeta;
}


// Interface for the component props
interface PageProps {
  params: {
    slug: string;
  };
}

const Page = (props: PageProps) => {
  const [blog, setBlog] = useState<BlogPostData | null>(null);
  const API_HOST = "https://strapiornek3.onrender.com";

  useEffect(() => {
    if (props.params.slug) {
      fetch(
        `${API_HOST}/api/blog-posts?filters[slug]=${props.params.slug}&populate[coverImage]=*&populate[Seo][populate][SharedImage][populate][media]=*`
      )
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const response: BlogResponse = await res.json();
          console.log(response);

          if (response.data && response.data.length > 0) {
            setBlog(response.data[0]); // Set the first blog post
          } else {
            // Handle no data found
            setBlog(null);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          // Optionally, set an error state or display an error message
        });
    }
  }, [props.params.slug]);

  return (
    <>
      {blog && blog.attributes.Seo && (
        <Seo
          metaTitle={blog.attributes.Seo.metaTitle}
          metaDescription={blog.attributes.Seo.metaDescription}
          ogImage={`${API_HOST}${blog.attributes.Seo.SharedImage?.media?.data?.attributes.url}`}
          siteName="BRN Metaverse"
          keywords={blog.attributes.Seo.keywords}
        />
      )}
      <main className="flex flex-col items-start justify-center min-h-[60vh] m-auto w-[80vw] py-32">
        {blog ? (
          <div>
            <div
              className={
                "max-h-[500px] w-full bg-cover rounded-2xl overflow-clip"
              }
            >
              {blog.attributes.coverImage?.data ? (
                <img
                  src={`${API_HOST}${blog.attributes.coverImage.data.attributes.url}`}
                  alt={blog.attributes.Title}
                  className={"w-full"}
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className={"flex w-full my-8"}>
              <h1 className={"text-4xl font-bold"}>
                {blog.attributes.Title}
              </h1>
            </div>
            <div>{parse(blog.attributes.Description)}</div>
          </div>
        ) : (
          <div className={"flex items-center justify-center"}>
            <p>Loading...</p>
          </div>
        )}
      </main>
    </>
  );
};

export default Page;
