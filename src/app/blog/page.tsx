"use client";
import { archivo_black, poppins } from "@/config/fonts";
import { useEffect, useState } from "react";

import useConfig from "@/hooks/useConfig";
import useBlog from "@/hooks/useBlog";
import Grid from "@mui/material/Unstable_Grid2";
import TimeAgo from "timeago-react";
import Link from "next/link";

export default function Blog() {
  const [posts] = useBlog("filter[published]=1");
  return (
    <main className="flex flex-col items-center bg-gradient-home justify-center">
      <div
        className={"flex items-center justify-center min-h-[50vh] pt-16 w-full"}
      >
        <div className={"w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center"}>
          <h2
            className={`${archivo_black.className} uppercase text-2xl lg:text-5xl mb-5 text-secondary`}
          >
            Blog <span className={"text-accent"}>Posts</span>
          </h2>
          <p>
            Be up to date with what we are about and the current waves of web3
            and the metaverse.
          </p>
        </div>
      </div>
      <div className={"w-[80vw] pb-32"}>
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"}>
          {posts.map((post: any, index: number) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <Grid xs={12} lg={4}>
                <div className="bg-black min-h-[400px] bg-opacity-30 backdrop-blur-md post-card p-2 text-white rounded-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                  <div
                    className={
                      "relative h-[200px] w-full overflow-clip rounded-xl"
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
