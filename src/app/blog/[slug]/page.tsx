"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import parse from "html-react-parser";

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

// Interface for blog post attributes
interface BlogPostAttributes {
  Description: string;
  Title: string;
  coverImage: CoverImage;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

// Interface for a single blog post
interface BlogPostData {
  id: number;
  attributes: BlogPostAttributes;
}

// Interface for the API response
interface BlogResponse {
  data: BlogPostData[];
  meta: any;
}

// Interface for the component props
interface PageProps {
  params: {
    slug: string;
  };
}

const Page = (props: PageProps) => {
  const [blog, setBlog] = useState<BlogPostData | null>(null);
  const API_HOST = "http://localhost:1337";

  useEffect(() => {
    if (props.params.slug) {
      fetch(
        `${API_HOST}/api/blog-posts?filters[slug]=${props.params.slug}&populate[coverImage]=*`
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
      <Head>
        <title>Blog | {blog?.attributes?.Title || "Loading..."}</title>
      </Head>
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
