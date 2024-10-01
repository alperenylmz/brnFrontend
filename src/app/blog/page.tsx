"use client"
import {archivo_black, poppins} from "@/config/fonts";
import {useEffect, useState} from "react";

import {API_HOST} from "@/config";
import useConfig from "@/hooks/useConfig";
import useBlog from "@/hooks/useBlog";
import Grid from '@mui/material/Unstable_Grid2';
import TimeAgo from 'timeago-react';
import Link from "next/link";

export default function Blog() {
    const [team, setTeam] = useState([]);
    const [{token: tokenInformation}] = useConfig('token');
    const [posts] = useBlog('filter[published]=1');

    useEffect(()=>{
        async function getTeam(){
            try{
                const res = await fetch(`${API_HOST}/api/v1/staff`);
                const repo = await res.json();
                setTeam(repo);
            } catch (e: any) {
                console.log(e.message)
            }
        }
        getTeam();
    },[])

  return (
    <main className="flex flex-col items-center justify-center">
      <div className={'flex items-center justify-center min-h-[50vh] bg-gradient-token py-16 w-full'}>
        <div className={'w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center'}>
            <h2 className={`${archivo_black.className} uppercase text-2xl lg:text-5xl mb-5 text-secondary`}>Blog <span className={'text-accent'}>Posts</span></h2>
            <p>Be up to date with what we are about and the current waves of web3 and the metaverse.</p>
        </div>
      </div>
      <div className={'w-[80vw] my-16'}>
          <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}>
              {
                  posts.map((post: any, index: number)=>(
                      <Link key={index} href={`/blog/${post.slug}`}>
                          <Grid xs={12} lg={4}>
                              <div className={'p-2 bg-primary-dark text-white rounded-xl'}>
                                  <div className={'relative h-[200px] w-full overflow-clip rounded-xl'}>
                                      <img src={`${API_HOST}${post.banner}`} alt={''} />
                                  </div>
                                  <div className={'flex justify-between mt-5 mb-3 px-5'}>
                                      <div className={'flex flex-col gap-2'}>
                                          <p className={'text-xl font-bold'}>{post.title}</p>
                                          <div className={'flex items-center text-xs gap-1 text-accent'}>
                                              <span>Posted </span>
                                              <TimeAgo
                                                  className={'text-xs text-white'}
                                                  datetime={post.created_at}
                                                  locale='us_En'
                                                  live={true}
                                              />
                                          </div>

                                          <p className={'text-sm mt-3'}>{post.body.replace(/<[^>]+>/g, '').slice(0,100)}</p>
                                      </div>
                                  </div>
                              </div>
                          </Grid>
                      </Link>
                  ))
              }
          </div>
      </div>
    </main>
  )
}
