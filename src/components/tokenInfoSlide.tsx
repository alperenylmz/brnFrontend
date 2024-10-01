"use client"
import {ellipses} from "@/helpers/strings";
import {FiCheck, FiCopy} from "react-icons/fi";
import {useState} from "react";
import useConfig from "@/hooks/useConfig";
import {archivo_black} from "@/config/fonts";

const TokenInfoSlide = () => {
    const [textCopied, setTextCopied] = useState(false);
    const [{token: tokenInformation}] = useConfig('token');

    return (
        <div className={'w-full p-5 bg-primary-light rounded-2xl'}>
            <div className={'flex gap-8 mb-5'}>
                <div className={'flex flex-col'}>
                    <h3 className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}>BRN</h3>
                    <p className={'text-sm uppercase'}>Symbol</p>
                </div>
                <div className={'flex flex-col'}>
                    <h3 className={`${archivo_black.className} uppercase text-4xl font-bold text-white`}>18</h3>
                    <p className={'text-sm uppercase'}>Decimal</p>
                </div>
            </div>
            <div style={{transitionDelay: '5s'}} className={'flex items-center justify-between gap-3 bg-primary-light text-white rounded-lg font-bold text-sm w-full'}>
                {
                    tokenInformation?.address && (
                        <>
                            <span className={'md:hidden'}>{ellipses(20, tokenInformation?.address ?? '','***')}</span>
                            <span className={'hidden md:inline-block'}>{(tokenInformation?.address ?? '')}</span>
                        </>
                    )
                }
                <button disabled={textCopied} onClick={async ()=> {
                    await navigator.clipboard.writeText(tokenInformation?.address);
                    setTextCopied(true);
                    setTimeout(()=>{
                        setTextCopied(false);
                    },3000);
                }} className={'bg-white p-2 rounded-lg text-accent'}>
                    {textCopied ? <FiCheck size={22} /> : <FiCopy size={22}/>}
                </button>
            </div>
        </div>
    )
}

export default TokenInfoSlide;