"use client";
import { archivo_black, poppins } from "@/config/fonts";
import { useEffect, useState } from "react";

import useConfig from "@/hooks/useConfig";
import useBlog from "@/hooks/useBlog";
import Grid from "@mui/material/Unstable_Grid2";
import TimeAgo from "timeago-react";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function Blog() {
  const [posts] = useBlog("filter[published]=1");
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screen size

  return ( 
    <main className="flex flex-col items-center bg-gradient-home justify-center w-full overflow-x-hidden"> {/* Added w-full and overflow-x-hidden */}
      <div
        className={`flex items-center justify-center min-h-[50vh] pt-16 w-full ${
          isMobile ? "px-4" : ""
        }`} // Add padding for mobile screens
      >
        <div
          className={`w-full max-w-[90vw] lg:max-w-[40vw] m-auto text-left lg:text-center ${
            isMobile ? "text-center" : ""
          }`} // Ensures the content does not exceed screen width
        >
          <h2
            className={`${archivo_black.className} uppercase text-2xl lg:text-5xl mb-5 text-white`}
          >
            Blog <span className={"text-secondary"}>Posts</span>
          </h2>
          <p>
            Be up to date with what we are about and the current waves of web3
            and the metaverse.
          </p>
        </div>
      </div>
      <div className={`w-full max-w-[90vw] pb-32 ${isMobile ? "px-2" : ""}`}>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${
            isMobile ? "gap-3" : ""
          }`} // Reduce gap size for mobile screens
        >
          {posts.map((post: any, index: number) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <Grid xs={12} lg={4}>
                <div className="bg-black min-h-[450px] bg-opacity-30 backdrop-blur-md post-card p-2 text-white rounded-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                  <div
                    className={
                      "relative h-[200px] w-full overflow-hidden rounded-xl"
                    }
                  >
                    <img
                      src={`${post.imageUrl}`}
                      alt={""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={"flex justify-between mt-5 mb-3 px-5"}>
                    <div className={"flex flex-col gap-2"}>
                      <p className={"text-xl font-bold"}>{post.title}</p>
                      <div
                        className={
                          "flex items-center text-xs gap-1 text-accent"
                        }
                      >
                        <span>Posted </span>
                        <TimeAgo
                          className={"text-xs text-white"}
                          datetime={post.createdAt}
                          locale="us_En"
                          live={true}
                        />
                      </div>

                      <p className={"text-sm mt-3"}>{post.description}</p>
                    </div>
                  </div>
                </div>
              </Grid>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
