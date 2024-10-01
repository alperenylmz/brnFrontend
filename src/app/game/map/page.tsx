'use client';

import {CustomFlowbiteTheme, Tabs} from 'flowbite-react';
import {archivo_black} from "@/config/fonts";
import React, {useState} from "react";
import {BOSS, BRN, EVENT} from "@/helpers/strings";
import {arenas, ArenaType} from "@/data/dataElements";
import Image from "next/image";
import {FiArrowRight, FiArrowLeft} from "react-icons/fi";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";

import "swiper/css";
import "swiper/css/pagination";

export default function DefaultTabs() {
    const [value, setValue] = useState<number>(0);
    const [arena, setArena] = useState<ArenaType>(EVENT);

    const is = (_arena: ArenaType) => _arena == arena;

    const customTheme: CustomFlowbiteTheme['tab'] = {
        tablist: {
            base: 'flex',
            tabitem:{
               base: 'aria-selected:text-[#8325DB] p-3 px-5 text-white text-md aria-selected:border-[#8325DB]'
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const getData = (arena: ArenaType) => {
        switch (arena){
            case BRN:
                return arenas[BRN];
            case EVENT:
                return arenas[EVENT];
            case BOSS:
                return arenas[BOSS];
            default:
                return []
        }
    }
    return (
        <main className="flex flex-col items-center justify-center">
            <div className={'flex items-center justify-center min-h-[50vh] bg-gradient-token py-16 w-full'}>
                <div className={'w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center'}>
                    <h2 className={`${archivo_black.className} uppercase text-2xl lg:text-5xl mb-5 text-secondary`}>MAP<span className={'text-accent'}>S</span></h2>
                    <p>Be up to date with what we are about and the current waves of web3 and the metaverse.</p>
                </div>
            </div>
            <div className={'w-[90vw] text-white'}>
                <div className={'grid grid-cols-3 items-center justify-start w-full my-8'}>
                    <button onClick={()=> {
                        setValue(0);
                        setArena(EVENT);

                    }} className={`text-sm md:text-md border-2 border-r-2 rounded-l-xl border-accent p-3 px-8 ${arena == EVENT ? 'bg-accent text-white' : 'text-white'}`}>
                        Event Arena
                    </button>
                    <button onClick={()=> {
                        setValue(0);
                        setArena(BOSS);

                    }} className={`text-sm md:text-md border-t-2 border-r-2 border-b-2 border-accent p-3 px-8 ${arena == BOSS ? 'bg-accent text-white' : 'text-white'}`}>Boss Arena</button>
                    <button onClick={()=> {
                        setValue(0);
                        setArena(BRN);
                    }} className={`text-sm md:text-md border-t-2 border-r-2 border-b-2 rounded-r-xl border-accent p-3 px-8 ${arena == BRN ? 'bg-accent text-white' : 'text-white'}`}>BRN Arena</button>
                </div>

                {
                    is(BRN) ? (
                        <div>
                            {
                                getData(arena as ArenaType).map((arena, index)=>(
                                    <div key={index} className={'grid grid-cols-1 gap-8 py-8 min-h-[200px]'}>
                                                <span>
                                                    {arena.description}
                                                </span>
                                        <div className={'grid grid-cols-1 md:grid-cols-3 gap-5 w-full h-full'}>
                                            {
                                                arena.images.map((image, index)=>(
                                                    <div style={{
                                                        background: `url('/assets/images/arenas${image}')`,
                                                        backgroundPosition:'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }} className={'group relative h-[250px] lg:min-h-[400px] w-full rounded-xl md:rounded-2xl overflow-clip'} key={index}>
                                                        <div className={'absolute transition-all bottom-[-200px] group-hover:bottom-0 p-5 bg-gradient-to-r from-accent via-secondary to-pink-500 w-full'}>
                                                            <h3 className={`${archivo_black.className}`}>{index+1}vs{index+1}</h3>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                       <div>
                           <Tabs.Group
                               aria-label="Default tabs"
                               style="underline"
                               className={'border-none'}
                               theme={customTheme}
                               onActiveTabChange={(tab)=> {
                                   setValue(tab);
                               }}
                           >
                               {
                                   getData(arena as ArenaType).map((arena, index)=>(
                                       <Tabs.Item
                                           active={index == value}
                                           title={arena.name.toUpperCase()}
                                           key={index}
                                           className={'border-none aria-selected:bg-red-500'}
                                       >
                                           <div className={'grid grid-cols-1 md:grid-cols-2 gap-8 py-8 min-h-[200px]'}>
                                               <div className={'group relative w-full'}>
                                                   <div className={`transition-all opacity-0 group-hover:opacity-100 flex items-center justify-between absolute top-[50%] translate-y-[-50%] w-full h-[50px] z-[99]`}>
                                                       <button type={'button'} onClick={() => null} className={`prev_${arena.name.toLowerCase().split(' ').join('_')} bg-white p-2 md:p-3 rounded-full text-primary ml-3`}>
                                                           <FiArrowLeft size={32}/>
                                                       </button>
                                                       <button type={'button'} onClick={() => null} className={`next_${arena.name.toLowerCase().split(' ').join('_')} bg-white p-2 md:p-3 rounded-full text-primary mr-3`}>
                                                           <FiArrowRight size={32}/>
                                                       </button>

                                                   </div>
                                                   <Swiper
                                                       loop={true}
                                                       slidesPerView={1}
                                                       modules={[Navigation]}
                                                       spaceBetween={20}
                                                       onSwiper={(swiper) => console.log(swiper)}
                                                       navigation={{
                                                           nextEl: `.next_${arena.name.toLowerCase().split(' ').join('_')}`,
                                                           prevEl: `.prev_${arena.name.toLowerCase().split(' ').join('_')}`
                                                       }}
                                                   >
                                                       {
                                                           arena.images.map((image, index)=>(
                                                               <SwiperSlide key={index}>
                                                                   <div style={{
                                                                   }} className={'relative h-[200px] lg:min-h-[400px] w-full overflow-clip rounded-xl md:rounded-2xl'}>
                                                                       <Image src={`/assets/images/arenas${image}`} className={'object-cover'} alt={''} fill={true} />
                                                                   </div>
                                                               </SwiperSlide>

                                                           ))
                                                       }
                                                   </Swiper>

                                               </div>
                                               <span>
                                                    {arena.description}
                                               </span>
                                           </div>
                                       </Tabs.Item>
                                   ))
                               }



                           </Tabs.Group>
                       </div>
                    )
                }


            </div>

        </main>
    )
}


