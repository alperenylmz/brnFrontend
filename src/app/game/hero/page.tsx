"use client"
import {archivo_black, poppins} from "@/config/fonts";
import {heroes, HeroName, skills} from "@/data";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";

import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(2);
    const [skillIndex, setSkillIndex] = useState(0);
    const swiperRef = useRef<SwiperRef>(null);

    const [screen] = useScreenSize();

    useEffect(()=>{
        if(screen.width <= 400){
            setCurrentIndex(0)
        }
    },[screen])

    const handleClick = (event: any) => {
        const clickedElement = event.target;
        const clientIndex = Number(clickedElement.getAttribute('data-id'))
        setCurrentIndex(clientIndex);

        if(currentIndex > clientIndex){
            swiperRef.current?.swiper.slidePrev()
        }else{
            swiperRef.current?.swiper.slideNext()
        }
    };

    return (
        <main className="flex flex-col items-center justify-center">
            <div className={'flex items-center justify-center h-[70vh] lg:h-[50vh] min-h-[50vh] bg-gradient-token py-16 w-full'}>
                <div className={'w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center'}>
                    <h2 className={`${archivo_black.className} uppercase text-4xl lg:text-5xl mb-5 text-secondary`}>Hero<span className={'text-accent'}>es</span></h2>
                    <p>Be up to date with what we are about and the current waves of web3 and the metaverse.</p>
                </div>
            </div>

            <div className={'flex items-start w-[90vw] h-[600px] overflow-clip p-8 mt-16'}>

                <div className={'hidden md:block h-[600px] w-[50vw]'}>
                    <Swiper
                        ref={swiperRef}
                        direction={'vertical'}
                        slidesPerView={'auto'}
                        height={600}
                        onSeeked={console.log}
                        className="mySwiper"
                    >
                        {
                            heroes.map((hero, index)=>(
                                <SwiperSlide key={index} className={'my-5'}>
                                    <div
                                        data-id={index}
                                        onClick={handleClick}
                                        key={index}
                                        className={`${archivo_black.className} ${currentIndex == index ? 'text-accent': ''} 
                                    transition-all lg:hover:ml-5 text-3xl md:text-5xl lg:text-6xl uppercase select-none cursor-pointer`}
                                    >
                                        {hero.name}
                                        <div className={'text-xs'}>{index < 9 ? `0${index+1}`: index+1}</div>
                                    </div>
                                </SwiperSlide>

                            ))
                        }
                    </Swiper>
                </div>

                <div className={'md:hidden flex h-[90px] w-[90vw]'}>
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={2}
                        spaceBetween={15}
                        height={90}
                        navigation={true}
                        className="mySwiper"
                    >
                        {
                            heroes.map((hero, index)=>(
                                <SwiperSlide key={index}>
                                    <div
                                        data-id={index}
                                        onClick={handleClick}
                                        key={index}
                                        className={`${archivo_black.className} ${currentIndex == index ? 'text-accent': ''} 
                                    transition-all lg:hover:ml-3 text-2xl md:text-5xl lg:text-6xl uppercase select-none cursor-pointer min-w-[200px]`}
                                    >
                                        {hero.name}
                                        <div className={'text-xs'}>{index < 9 ? `0${index+1}`: index+1}</div>
                                    </div>
                                </SwiperSlide>

                            ))
                        }
                    </Swiper>
                </div>


                <div className={'absolute w-[90vw] lg:w-[40vw] translate-x-[50%] top-[75%] lg:top-[50%] right-[50%] lg:right-[35%]'}>
                    {
                        heroes.map((hero, index)=>(
                            <div key={index} className={`absolute bounce ${archivo_black.className} ${currentIndex == index ? 'opacity-100 visible top-0': 'opacity-0 invisible top-36'} h-[850px] w-full transition-all select-none cursor-pointer pointer-events-none`}>
                                <Image src={`/assets/images/heroes/${hero.name.toLowerCase()}.png`} alt={hero.name} fill={true} className={'object-contain'} />

                                <div className={'absolute bottom-[-120px] bg-primary-light p-5 rounded-xl lg:w-[500px]'}>
                                    <div className={'mb-5'}>
                                        <div className={'flex gap-3 items-center'}>
                                            <Image
                                                src={`/assets/images/symbols/${hero.warriorType?.image}`}
                                                className={`rounded-full border-2 border-accent`}
                                                alt={hero.warriorType?.name as string}
                                                height={35}
                                                width={35}
                                            />
                                            <h4 className={`text-xl uppercase ${archivo_black.className}`}>
                                                {
                                                    hero.warriorType?.name
                                                }
                                            </h4>
                                        </div>
                                    </div>
                                    <p className={`${poppins.regular.className} text-sm leading-6 text-gray-300`}>
                                        {hero.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className={'h-[60vh]'}/>

            <div className={'relative'}>
                <div className={'w-[90vw] lg:w-[80vw] m-auto '}>
                    <h2 className={`${archivo_black.className} uppercase text-4xl lg:text-5xl mb-5 text-secondary`}>Special <span className={'text-accent'}>Abilities</span></h2>
                </div>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-5'}>
                    <div className={'order-2 md:order-none'}>
                        <div className={'my-8 lg:my-16'}>
                            <div className={'max-w-[90vw]'}>
                                <div className={'relative inline-block'}>
                                    <div className={'flex items-center justify-between gap-5 lg:gap-12'}>
                                        {
                                            skills[heroes[currentIndex].name.toLowerCase() as HeroName].map((skill, index) => (
                                                <div
                                                    onClick={()=> setSkillIndex(index)}
                                                    key={index} className={'inline-block cursor-pointer'}>
                                                    <div className={'flex gap-3'}>
                                                        <Image
                                                            src={`/assets/images/skills/${heroes[currentIndex].name.toLowerCase()}/${skill.icon}`}
                                                            className={`rounded-full border-2 ${index == skillIndex ? 'border-accent' : 'border-primary-light'}`}
                                                            alt={skill.name}
                                                            height={60}
                                                            width={60}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className={'absolute left-0 w-full h-[5px] bg-primary-light z-[-99]'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={'flex flex-col gap-8 w-[90vw] md:w-[50vw] lg:w-[35vw]'}>
                                <h3 className={'text-2xl font-bold'}>{skills[heroes[currentIndex].name.toLowerCase() as HeroName][skillIndex].name}</h3>
                                <p className={'text-gray-300'}>{skills[heroes[currentIndex].name.toLowerCase() as HeroName][skillIndex].description}</p>
                            </div>
                        </div>
                    </div>
                    <div className={'order-1 md:order-none'}>
                        {
                            skills[heroes[currentIndex].name.toLowerCase() as HeroName].map((skill, index) => {
                                if(index === skillIndex){
                                    return (
                                        (skills[heroes[currentIndex].name.toLowerCase() as HeroName][skillIndex].video.trim().length > 0) &&
                                        <video key={index} controls={true}  className={'h-full max-w-[90vw] lg:max-w-[40vw] object-cover'}>
                                            <source
                                                src={skill.video}
                                                // type="video/mp4" // Change the type as per your video format
                                            />
                                            No Video
                                        </video>
                                    )
                                }
                                return (<span key={index}></span>);
                            })
                        }
                        {/*{*/}
                        {/*    (*/}
                        {/*        (skills[heroes[currentIndex].name.toLowerCase() as HeroName][skillIndex].video.trim().length > 0) &&*/}
                        {/*        <video controls={true}  className={'h-full max-w-[90vw] lg:max-w-[40vw] object-cover'}>*/}
                        {/*            <source*/}
                        {/*                src={skills[heroes[currentIndex].name.toLowerCase() as HeroName][skillIndex].video}*/}
                        {/*                // type="video/mp4" // Change the type as per your video format*/}
                        {/*            />*/}
                        {/*            No Video*/}
                        {/*        </video>*/}
                        {/*    )*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
        </main>
    )
}
