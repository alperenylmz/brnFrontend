"use client"
import Image from 'next/image'
import {archivo_black, poppins} from "@/config/fonts";
import {focused_industries, NFTCollections, token_allocations} from "@/data";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa";
import {FiCopy, FiLinkedin} from "react-icons/fi";
import {useEffect, useState} from "react";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import {API_HOST} from "@/config";
import useConfig from "@/hooks/useConfig";
import formatNumber from "@/helpers";

export default function Team() {
    const [team, setTeam] = useState([]);
    const [{token: tokenInformation}] = useConfig('token');

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
    <main className="">
      <div className={'flex items-center justify-center min-h-[50vh] bg-gradient-token py-16'}>
        <div className={'w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center'}>
            <h2 className={`${archivo_black.className} uppercase text-2xl lg:text-5xl mb-5 text-secondary`}>Our <span className={'text-accent'}>Team</span></h2>
            <p>A team experienced in their specific fields and collaborating seamlessly to release a flawless platform.</p>
        </div>
      </div>

     <div className={'flex justify-center items-center min-h-[100vh] py-16'}>
         <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[90vw] md:w-[80vw] lg:w-[65vw]'}>
             {
                 team.sort((a: any, b: any) => a.order_index - b.order_index).map((member: any, index)=>(
                     <div key={index} className={'relative bg-primary-dark rounded-lg p-3'}>
                         <div className={'relative h-[350px] rounded-lg overflow-clip'}>
                             <Image src={`${API_HOST}${member.image_path}`} alt={member.name} fill={true} className={'object-cover object-top'} />
                         </div>
                         <div className={'text-center py-8'}>
                             <h3 className={`${archivo_black.className} uppercase text-xl`}>{member.name}</h3>
                             <p className={'text-accent'}>{member.role}</p>
                         </div>

                        <div className={'absolute left-[50%] bottom-[-5%] translate-x-[-50%]'}>
                            <Link href={member.linkedin} className={'flex items-center justify-center border-[10px] border-primary h-[70px] w-[70px] bg-accent rounded-full'}>
                                <FiLinkedin size={22} />
                            </Link>
                        </div>
                     </div>
                 ))
             }
         </div>
     </div>
    </main>
  )
}
