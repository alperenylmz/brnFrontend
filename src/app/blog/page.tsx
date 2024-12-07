"use client";
import { archivo_black, poppins } from "@/config/fonts";
import { useEffect, useState } from "react";

import useBlog from "@/hooks/useBlog";
import Grid from "@mui/material/Unstable_Grid2";
import TimeAgo from "timeago-react";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";

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

// Interface for the attributes of each blog post
interface BlogPostAttributes {
  Title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  miniDescription: string;
  coverImage: CoverImage;
}

// Interface for each item in the data array
interface BlogPostDataItem {
  id: number;
  attributes: BlogPostAttributes;
}

// Interface for the API response
interface ApiResponse {
  data: BlogPostDataItem[];
  meta: any;
}

// Interface for your blog post after transformation
interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export default function Blog() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isClient, setIsClient] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]); // Burada tür belirtildi
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNumber: number) => {
    setLoading(true);
    try {
      // const response = await fetch(
      //   `https://strapiornek3.onrender.com/api/blog-posts?filter[published]=1&pagination[page]=${pageNumber}&pagination[pageSize]=6&fields[0]=Title&fields[1]=slug&fields[2]=createdAt&fields[3]=miniDescription&populate[coverImage][fields][0]=url&populate[coverImage][fields][1]=formats`
      // );

      const response = await fetch(
        `http://localhost:1337/api/blog-posts?filter[published]=1&pagination[page]=${pageNumber}&pagination[pageSize]=6&fields[0]=Title&fields[1]=slug&fields[2]=createdAt&fields[3]=miniDescription&populate[coverImage][fields][0]=url&populate[coverImage][fields][1]=formats`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }

      const responseJson = await response.json();
      console.log("BLOG API RESPONSE: ", responseJson);

      const responseData: ApiResponse = responseJson;

      // Blog gönderilerini dönüştürme
      const newPosts: BlogPost[] = responseData.data.map(
        (item: BlogPostDataItem) => {
          const attributes = item.attributes;

          // Görsel URL'sini çıkarma
          const imageData = attributes.coverImage?.data;
          const imageUrl =
            imageData?.attributes?.url ||
            imageData?.attributes?.formats?.thumbnail?.url ||
            null;

          return {
            id: item.id,
            title: attributes.Title,
            description: attributes.miniDescription,
            imageUrl: imageUrl ? `https://strapiornek3.onrender.com${imageUrl}` : null,
            createdAt: attributes.createdAt,
            updatedAt: attributes.updatedAt,
            slug: attributes.slug,
          };
        }
      );

      // Yeni gönderileri mevcut gönderilere ekleme
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchPosts(page);
    }
  }, [page, isClient]);

  return (
    <>
      <main className="flex flex-col items-center bg-black justify-center w-full overflow-x-hidden">
        <div
          className={`flex items-center justify-center min-h-[50vh] pt-16 w-full ${
            isMobile ? "px-4" : ""
          }`}
        >
          <div
            className={`w-full max-w-[90vw] lg:max-w-[65vw] m-auto text-left lg:text-center ${
              isMobile ? "text-center" : ""
            }`}
          >
            <h2
              className={`${archivo_black.className} uppercase text-2xl lg:text-5xl mb-5 text-white glow-effect`}
            >
              Blog <span className={"text-secondary"}>Posts</span>
            </h2>
            <p className={`${poppins.regular.className} text-xl`}>
              Be up to date with what we are about and the current waves of web3
              and the metaverse.
            </p>
          </div>
        </div>
        <div className={`w-full max-w-[90vw] pb-32 ${isMobile ? "px-2" : ""}`}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${
              isMobile ? "gap-3" : ""
            }`}
          >
            {posts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <Grid xs={12} lg={4}>
                  {/* bg-black min-h-[450px] bg-opacity-30 backdrop-blur-md */}
                  <div className="bg-glass min-h-[450px] post-card p-2 text-white rounded-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                    <div
                      className={
                        "relative h-[200px] w-full overflow-hidden rounded-xl"
                      }
                    >
                      <img
                        src={`${post.imageUrl}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={"flex justify-between mt-5 mb-3 px-5"}>
                      <div className={"flex flex-col gap-2"}>
                        <p className={`${archivo_black.className} text-xl font-bold`}>{post.title}</p>
                        <div
                          className={
                            `${poppins.bold.className} flex items-center text-xs gap-1 text-secondary`
                          }
                        >
                          <span>Posted </span>
                          <TimeAgo
                            className={`${poppins.regular.className} text-xs text-white`}
                            datetime={post.createdAt}
                            locale="us_En"
                            live={true}
                          />
                        </div>
                        <p className={`${poppins.regular.className} text-sm mt-3`}>{post.description}</p>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Link>
            ))}
          </div>
          {/* Load More Button */}
          {hasMore && !loading && (
            <div className="flex justify-center pt-12">
              <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="bg-transparent text-white text-lg p-5 rounded-full text-center w-[180px] hover:bg-gradient-to-r hover:from-[#7F3FF2] hover:via-[#4976E2] hover:to-[#00C0FF] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className={`${archivo_black.className}`}>Load More</span>
            </button>
            </div>
            
          )}
          {loading && <p className="text-center text-white mt-5">Loading...</p>}
        </div>
      </main>
    </>
  );
}
