"use client"
import Image from 'next/image'
import {archivo_black, poppins} from "@/config/fonts";
import {focused_industries} from "@/data";
import Link from "next/link";
import {FaArrowRight, FaChevronDown, FaChevronUp} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import {API_HOST} from "@/config";
import useTokenAllocations from "@/hooks/useTokenAllocations";
import useConfig from "@/hooks/useConfig";
import formatNumber, {isiOS} from "@/helpers";
import usePartners from "@/hooks/usePartners";
import useMarkets from "@/hooks/useMarkets";import {FiPlay} from "react-icons/fi";
import TokenInfoSlide from "@/components/tokenInfoSlide";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import "swiper/css/pagination";


export default function Home() {
    const [showTokenInfo, setShowTokenInfo] = useState(false);
    const [showSocialInfo, setShowSocialInfo] = useState(false);
    const [tokenAllocations] = useTokenAllocations();
    const [{token: tokenInformation}] = useConfig('token');
    const [{documents}] = useConfig('documents');
    const [partners] = usePartners();
    const [markets] = useMarkets();
    const [modalIslOpen, setModalIsOpen] = useState(false);
    const [videoIsPlaying, setVideoIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [socialHandles, setSocialHandles] = useState([]);

    useEffect(()=>{
        async function getSocialHandles(){
            try{
                const res = await fetch(`${API_HOST}/api/v1/social-handles`);
                const repo = await res.json();
                setSocialHandles(repo);
            } catch (e: any) {
                console.log(e.message)
            }
        }
        getSocialHandles();
    },[])


    useEffect(()=>{
        if(videoRef.current && videoRef.current.currentTime > 0){
            setVideoIsPlaying(true);
        }
    },[videoRef.current])

    const playVideo = () => {
        videoRef.current?.play();
        setVideoIsPlaying(true);
    }

  return (
    <main className="">

        {/*TOKEN SLIDE*/}
        <div className={`flex items-center fixed ${showTokenInfo ? 'right-0':'right-[-75vw] md:right-[-430px]'} transition-all top-[50%] translate-[-50%,-50%] z-[9999] w-[75vw] md:w-[430px] min-w-[200px]`}>
            <button onClick={()=> setShowTokenInfo(!showTokenInfo)} className={'absolute left-[-70px] md:left-[-80px] rotate-[90deg] flex items-center gap-2 bg-primary-dark p-5 rounded-2xl '}>
                {
                    showTokenInfo ?  <FaChevronUp /> : <FaChevronDown />
                }
                <span className={`font-black text-sm md:text-lg ${poppins.bold.className}`}>BRN</span>
            </button>
            <TokenInfoSlide />
        </div>

        {/*SOCIAL SLIDE*/}
        {
            socialHandles.length > 0 &&
            (
                <div className={`flex flex-col gap-3 md:gap-5 items-center p-2 md:p-3 fixed ${showSocialInfo ? 'left-0' : 'md:left-[-75px] left-[-65px]'} transition-all bg-primary-dark rounded-r-2xl top-[30%] translate-[-50%,-50%] z-[999]`}>
                    {
                        socialHandles.map((social: any, index)=>(
                            <Link key={index} href={social.url}>
                                <div className={'bg-primary-light p-3 rounded-lg'}>
                                    <Image className={'hidden md:block'} src={`${API_HOST}${social.icon_path}`} alt={social.name} height={25} width={25} />
                                    <Image className={'md:hidden'} src={`${API_HOST}${social.icon_path}`} alt={social.name} height={20} width={20} />
                                </div>
                            </Link>
                        ))
                    }
                    <button onClick={()=> setShowSocialInfo(!showSocialInfo)} className={'absolute top-[40%] transform-y-[-50%] right-[-45px] md:right-[-45px] rotate-[90deg] flex items-center gap-2 bg-primary-dark p-5 py-3 rounded-t-2xl '}>
                        {
                            showSocialInfo ?  <FaChevronDown /> : <FaChevronUp />
                        }
                    </button>
                </div>
            )
        }


        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
                <div className={'relative h-screen lg:min-h-[800px] w-full'}>
                    <div className={'absolute bg-primary-dark/50 h-full w-full'} />
                    <video
                        ref={videoRef}
                        className={'w-full h-full select-none object-cover'}
                        src="/assets/videos/landingpage.mp4"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                    />
                    {
                        isiOS() && (
                            <div className={`flex items-center justify-center absolute translate-[-50%] top-[50%] left-[45%] z-[999] ${videoIsPlaying ? '' : 'flex'}`}>
                                <button onClick={playVideo} className={'flex items-center justify-center bg-white w-[70px] h-[70px] rounded-full'}>
                                    <FiPlay size={36} className={'text-accent'}/>
                                </button>
                            </div>
                        )
                    }

                    <div className={'flex items-center justify-center absolute self-center bottom-[2vh] md:bottom-[5vh] w-full p-8 rounded-xl'}>
                        <div className={'grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 items-center justify-center w-auto'}>
                            <Link href={documents?.audit ?? ''} target={'_blank'} className={'border-2 border-white bg-primary-light text-white p-3 rounded-lg min-w-[100px] text-center'}>Audit</Link>
                            <Link href={'https://whitepaper.brntoken.net'} target={'_blank'} className={'border-2 border-white bg-secondary text-primary p-3 rounded-lg min-w-[100px] text-center'}>Whitepaper</Link>
                            <Link href={'/assets/docs/legal-opinion.pdf'} target={'_blank'} className={'border-2 border-white bg-white text-primary p-3 rounded-lg min-w-[100px] col-span-2 md:col-span-1 text-center'}>Legal Opinion</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex items-center justify-around min-h-[15vh] m-auto w-[90vw]'}>
                <Swiper
                    loop={true}
                    spaceBetween={45}
                    slidesPerView={2}
                    breakpoints={{
                        640: {
                            width: 640,
                            slidesPerView: 3,
                        },
                        768: {
                            width: 768,
                            slidesPerView: 4,
                        },
                    }}
                    className={'w-auto'}
                >
                    {
                        ["1.png","2.png","3.png","4.png","5.png","6.png"].map((image,index)=>(
                            <SwiperSlide key={index}>
                                <div className={'relative w-full h-[65px] overflow-clip'}>
                                    <Image src={`/assets/images/features/${image}`} className={'object-contain'} alt={''} fill={true} />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>

        <div className={'flex items-center justify-center min-h-[80vh] bg-gradient-token py-16'}>
            <div className={'grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-[80vw] m-auto'}>
                <div className={'w-[100%]'}>
                    <h2 className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5 text-secondary`}>BRN</h2>
                    <p>
                        The cutting-edge cryptocurrency backed by the gaming industry, offering a seamless blend of value and versatility. Unlock the power
                        of digital assets as you trade and engage in immersive gaming experiences, revolutionizing the way you interact with virtual economies.
                    </p>

                   <div className={'flex gap-8 my-8'}>
                       <div className={'flex flex-col'}>
                           <h3 className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}>{formatNumber(tokenInformation?.total_supply)}</h3>
                           <p className={'text-sm'}>TOTAL SUPPLY</p>
                       </div>

                       <div className={'flex flex-col'}>
                           <h3 className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}>{formatNumber(tokenInformation?.maximum_supply)}</h3>
                           <p className={'text-sm'}>MAX SUPPLY</p>
                       </div>
                   </div>
                   <div className={'flex items-center gap-4 mt-16'}>
                        {
                            tokenAllocations.map((token: any, index: number) =>(
                                <div style={{backgroundColor: token.color}} key={index} className={`bg-[${token.color}] p-2 rounded-full`}></div>
                            ))
                        }
                   </div>
                   <div className={'my-24'}>
                       <Link href={'token'}>
                           <div className={'flex items-center gap-2'}>
                               <span className={archivo_black.className}>Explore</span>
                               <FaArrowRight />
                           </div>
                       </Link>
                   </div>
                </div>
                <div className={'relative flex flex-col justify-start items-center h-full w-full'}>
                   <Image src={'/assets/images/trend.svg'} alt={''} fill={true}/>
                </div>
            </div>
        </div>

        {/*  FOCUSED SECTIONS OF THE WEB  */}
        <div className="flex flex-col items-center justify-start min-h-[85vh] py-16 bg-gradient-priority">
            <div className={'w-[90vw] lg:w-[40vw] lg:text-center mb-16'}>
                <h2 className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5`}>Strategic <span className={'text-accent'}>PRIORITIES</span></h2>
                <p>Unleash success in our key focus areas. With expertise and innovation at our core, we deliver exceptional results. Explore our strategic
                    priorities and reach your full potential.
                </p>
            </div>



        {/*    OTHER FOCUSED SECTIONS */}
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-[90vw] lg:w-[70vw] my-12'}>
            {
                focused_industries.map((industry, index)=>(
                    <div key={index}>
                        <div className={'relative inline-block bg-accent p-3 rounded-xl'}>
                            <Image src={`/assets/images/icons/${industry.icon}`} height={45} width={45} alt={''} />
                        </div>
                        <h2 className={`${archivo_black.className} uppercase text-2xl font-bold my-5`}>{industry.title.prefix}<span className={'text-accent'}>{industry.title.suffix}</span></h2>
                        <p>{industry.description}</p>
                    </div>
                ))
            }
        </div>

        </div>


        {/*  PARTNERS  */}
        <div className="flex flex-col items-center justify-start min-h-[85vh] py-16">
            <div className={'w-[90vw] lg:w-[40vw] md:text-center'}>
                <h2 className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5`}>Our <span className={'text-accent'}>Partners</span></h2>
                <p>Trusted by <span className={'font-bold'}>{partners.length}+</span> partners, we are making waves in the web3 space, changing the norm and introducing a project that will change the way we see web3 and gaming.</p>
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 items-start justify-start md:justify-center mt-12 w-[90vw]'}>
                {
                    partners.sort((a: any, b: any) => a.order_index - b.order_index).map((_:any,index: number)=>(
                        <Link key={index} href={_.url} target={'_blank'} className={'h-full'}>
                            <div  className={'bg-primary-light min-w-[300px] p-5 rounded-lg h-full'}>
                                <div className={'relative'}>
                                    <img className={'h-[100px] w-[200px] object-contain'} src={`${API_HOST}${_.image_url}`} alt={''} />
                                </div>
                                <p>{_.description}</p>
                            </div>
                        </Link>

                    ))
                }
            </div>


        </div>

        {/*  BOTTOM MODAL PANEL  */}
        <div className={`lg:hidden fixed left-0 px-8 py-5 transition-all ${modalIslOpen ? 'bottom-0 opacity-100 visible' : 'bottom-[-100vh] invisible opacity-0'} items-center justify-center w-[100vw] bg-primary z-10`}>
            {markets.sort((a, b) => a.order_index - b.order_index)?.map((listing: any, index: number) => (
                <a href={listing.token_url} target={'_blank'} key={index} className={'hover:bg-cDark'}>
                    <div className={'flex gap-3 items-center p-3 text-sm'}>
                        <img src={`${API_HOST}${listing.image_path}`} height={30} width={30} className={'rounded-full'} alt={listing.name}/>
                        {listing.name}
                    </div>
                </a>
            ))}
            <button onClick={()=> setModalIsOpen(false)} className={'bg-primary-light p-5 w-full rounded-full mt-5'}>
                Close
            </button>
        </div>
        {/*  BOTTOM MODAL PANEL  */}

    </main>
  )
}
