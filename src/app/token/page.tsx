"use client"
import Image from 'next/image'
import {archivo_black,} from "@/config/fonts";
import {useEffect, useState} from "react";
import useTokenAllocations from "@/hooks/useTokenAllocations";
import useConfig from "@/hooks/useConfig";
import formatNumber from "@/helpers";
import {TokenAllocation} from "@/components/token-allocation";
import {API_HOST} from "@/config";
import useMarkets from "@/hooks/useMarkets";
import useTokenPrice from "@/hooks/useTokenPrice";
import TokenInfo from "@/components/tokenInfo";

export default function Token() {
    const [currentNFT, setCurrentNFT] = useState(0);
    const [tokenAllocations] = useTokenAllocations();
    const [{token: tokenInformation}] = useConfig('token');
    const [markets] = useMarkets();
    const [token] = useTokenPrice();

  return (
    <main className="">
        <div className={'flex items-center justify-center min-h-[70vh] bg-gradient-token py-16 mt-16'}>
            <div className={'grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-[80vw] m-auto'}>
                <div className={''}>
                    <h2 className={`${archivo_black.className} uppercase text-3xl lg:text-5xl font-bold mb-5 text-secondary`}>BRN</h2>
                    <p>Join the future of finance and gaming with $BRN and embark on a journey where your investments and passions align.</p>

                    <div className={'flex gap-8 my-8'}>
                        <div className={'flex flex-col'}>
                            <h3 className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}>{formatNumber(tokenInformation?.total_supply,2)}</h3>
                            <p className={'text-sm'}>TOTAL SUPPLY</p>
                        </div>
                        <div className={'flex flex-col'}>
                            <h3 className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}>{formatNumber(tokenInformation?.maximum_supply,2)}</h3>
                            <p className={'text-sm'}>MAX SUPPLY</p>
                        </div>
                    </div>
                    <TokenInfo />
                    {/*<div className={'flex items-center gap-2 md:gap-4 mt-16'}>*/}
                    {/*    {*/}
                    {/*        tokenAllocations.map((token: any, index: number) =>(*/}
                    {/*            <div style={{backgroundColor: token.color}} key={index} className={`bg-[${token.color}] p-2 rounded-full`}></div>*/}
                    {/*        ))*/}
                    {/*    }*/}
                    {/*</div>*/}
                    <div className={'flex justify-center mt-16'}>
                        <div className={'flex justify-center w-full lg:w-[70vw] h-[20px] rounded-full'}>
                            {
                                Array.from(tokenAllocations).map((token: any, index)=>(
                                    <div style={{
                                        backgroundColor: token.color,
                                        width: `${token.percentage + 5}%`,
                                        zIndex: 100 -index
                                    }} key={index} className={`h-[20px] rounded-full ${index > 0 ? 'ml-[-15px] lg:ml-[-15px]': ''}`} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={'relative flex flex-col justify-start items-center h-full w-full'}>
                    <Image src={'/assets/images/trend.svg'} alt={''} fill={true}/>
                </div>
            </div>
        </div>

        <div className={`flex flex-col lg:flex-row items-start md:items-center justify-center gap-3 lg:gap-5 w-[90vw] lg:w-[80vw] m-auto my-8`}>
            {markets?.map((listing: any, index: number) => (
                <a href={listing.token_url} target={'_blank'} key={index}>
                    <div className={'flex gap-3 justify-start items-center p-3 text-sm hover:bg-primary-light rounded-full'}>
                        <img src={`${API_HOST}${listing.image_path}`} height={30} width={30} className={'rounded-full'} alt={listing.name}/>
                        {listing.name}
                    </div>
                </a>
            ))}
        </div>

        <div className={'grid grid-cols-1 md:grid-cols-[1fr_0.7fr] items-center justify-center m-auto w-[90vw] lg:w-[60vw] min-h-[70vh]'}>
              <div className={'relative h-[400px] md:h-[800px]'}>
                  <Image src={'/assets/images/tokenomics.png'} fill className='w-full h-full object-contain'  alt='Tokenomics'/>
                {/* <TokenAllocation
                    allocations={tokenAllocations}
                    sx={{ height: '100%' }}
                /> */}
            </div>
            <div id={'stats'} className={'mt-14 lg:mt-0'}>
                <div className={'grid grid-cols-1 md:grid-cols-3 gap-5'}>
                    <div className={'flex flex-col gap-2 bg-primary-light p-3 rounded-lg'}>
                        <div className={'flex flex-wrap items-center justify-between'}>
                            <span className={'text-xl font-bold'}>${token?.price}</span>
                            <span className={`${token?.up ? 'text-green-400':'text-red-500'} text-sm font-bold`}>{token?.h24}</span>
                        </div>
                        <span className={'text-sm'}>BRN Price</span>
                    </div>
                    <div className={'flex flex-col gap-2 bg-primary-light p-3 rounded-lg'}>
                        <span className={'text-xl font-bold'}>{formatNumber(tokenInformation?.total_supply,2)}</span>
                        <span className={'text-sm'}>Total Supply</span>
                    </div>
                    <div className={'flex flex-col gap-2 bg-primary-light p-3 rounded-lg'}>
                        <span className={'text-xl font-bold'}>{formatNumber(tokenInformation?.maximum_supply,2)}</span>
                        <span className={'text-sm'}>Max Supply</span>
                    </div>
                </div>
                <div className={'grid grid-cols-2 justify-center items-start gap-5 lg:gap-8 mt-16'}>
                    {
                        Array.from(tokenAllocations).map((token: any, index) =>(
                            <div key={index} className={'flex items-center gap-3'}>
                                <div style={{backgroundColor: token.color}} className={`bg-[${token.color}] p-5 rounded-xl`}/>
                                <div key={index} className={'flex flex-col items-start gap-0'}>
                                    <span className={'text-sm'}>{token.title}</span>
                                    <span className={'text-sm font-black'}>{token.percentage}%</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    </main>
  )
}
