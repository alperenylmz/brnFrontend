"use client"
import {archivo_black} from "@/config/fonts";
import RoadmapCard from "@/components/roadmap-card";
import useRoadmap from "@/hooks/useRoadmap";


export default function Team() {
    const [roadmap] = useRoadmap();

  return (
    <main className="flex flex-col items-center justify-center w-full">
        <div className={'flex items-center justify-center min-h-[60vh] bg-gradient-token py-16 w-full'}>
            <div className={'w-[80vw] lg:w-[40vw] m-auto lg:text-center'}>
                <h2 className={`${archivo_black.className} uppercase text-3xl lg:text-5xl mb-5 text-secondary`}>Road<span className={'text-accent'}>map</span></h2>
                <p>We have our entire journey mapped out. Know exactly what we are up to reading through our roadmap.</p>
            </div>
        </div>

        <div className={'flex flex-col gap-36 mb-16 lg:w-[70vw] mt-16 z-[-1000]'}>
            {
                roadmap.length > 0 && roadmap.map((data, index: number) => {
                    return (<div key={index}>
                        <div className={'relative flex flex-col gap-16'}>
                            <div className={'flex'}>
                                <div className={'flex p-3 px-8 bg-white text-primary rounded-full '}>{Object.keys(data)[0]}</div>
                            </div>

                            <div className={'grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-[auto_1fr_auto_0.3fr] items-start justify-between'}>
                                <RoadmapCard quarter={data[Object.keys(data)[0]]?.quarters[0].quarter} items={data[Object.keys(data)[0]]?.quarters[0].items} />
                                <div className={'hidden lg:flex items-center h-full'}>
                                    <div className={'border-t-2 border-dashed border-spacing-[3px] border-accent w-full'}/>
                                </div>
                                <RoadmapCard quarter={data[Object.keys(data)[0]]?.quarters[1].quarter} items={data[Object.keys(data)[0]]?.quarters[1].items} />
                                <div className={`relative hidden lg:flex items-center h-full  ${data[Object.keys(data)[0]]?.quarters[1].items.length > 4 ? 'top-[34.6%]' : 'top-[56%]'}`}>
                                    <div className={`border-t-2 border-r-2 border-b-2 border-dashed border-spacing-[3px] border-accent 
                                    ${data[Object.keys(data)[0]]?.quarters[1].items.length > 4 ? 'h-[70%]' : 'h-full'}
                                     w-full rounded-tr-xl rounded-br-xl`}/>
                                </div>
                            </div>

                            <div className={`hidden lg:inline-block absolute border-t-2 border-l-2 border-dashed border-spacing-[3px] border-accent h-[300px]
                            ${data[Object.keys(data)[0]]?.quarters[1].items.length > 4 ? 'top-[50.5%]' : 'top-[48.7%]'}
                            ml-[13.1%]  w-[85%] rounded-tl-xl rounded-bl-xl z-[-100]`}/>

                            <div className={'grid grid-cols-1 lg:grid-cols-[auto_1fr_auto_0.3fr] gap-8 lg:gap-0 items-start justify-between lg:mt-[200px]'}>
                                <RoadmapCard quarter={data[Object.keys(data)[0]]?.quarters[2].quarter} items={data[Object.keys(data)[0]]?.quarters[2].items} />
                                <div className={'hidden lg:flex items-center h-full'}>
                                    <div className={'border-t-2 border-dashed border-spacing-[3px] border-accent w-full'}/>
                                </div>
                                <RoadmapCard quarter={data[Object.keys(data)[0]]?.quarters[3].quarter} items={data[Object.keys(data)[0]]?.quarters[3].items} />
                                <div className={'hidden md:flex items-center h-full mt-[50%]'}>
                                    <div className={'border-spacing-[3px] border-accent h-full w-full rounded-tr-xl rounded-br-xl'}/>
                                </div>
                            </div>

                        </div>
                    </div>);
                })
            }


        </div>

    </main>
  )
}
