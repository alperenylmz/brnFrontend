'use client'
import React, { useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import {API_HOST} from "@/config";
import parse from 'html-react-parser'


type Blog = {
    title: string,
    body: string,
    banner: string,
    created_at: string,
    updated_at: string,
}

const Page = (props: any)=> {
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        if(props.params.slug){
            fetch(`${API_HOST}/api/v1/blog/${props.params.slug}`).then(async res => {
                const blog = await res.json();
                setBlog(blog);
            })
        }
    },[props.params.slug])

    return (
        <>
            <Head>
                <title>
                    Blog | {blog?.title}
                </title>
            </Head>
            <main className="flex flex-col items-start justify-center min-h-[60vh] m-auto w-[80vw] py-32">
                {
                    blog ? (
                        <div>
                            <div className={'max-h-[500px] w-full bg-cover rounded-2xl overflow-clip'}>
                                <img src={`${API_HOST}${blog?.banner}`} className={'w-full'} />
                            </div>
                            <div className={'flex w-full my-8'}>
                                <h1 className={'text-4xl font-bold'}>{blog?.title}</h1>
                            </div>
                            <div>
                                {parse(`${blog?.body}`)}
                            </div>
                        </div>
                    ) : (
                        <div className={'flex items-center justify-center'}>
                            <p>Loading</p>
                        </div>
                    )
                }
            </main>
        </>
    );
}


export default Page;