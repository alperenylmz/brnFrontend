import {FiCheck, FiLoader, FiDisc} from "react-icons/fi";

type RoadMapItem = {
    title: string,
    status: 'in-active'|'developing'|'completed'
}
export type Roadmap = {
    quarter: string,
    items: Array<RoadMapItem>
}
const RoadmapCard = (props: Roadmap)=>{
    return (
        <div className={'flex flex-col w-[90vw] md:w-[400px] rounded-xl overflow-clip bg-primary-dark'}>
            <div className={'flex bg-accent w-full p-2 rounded-xl'}>
                <div className={'flex items-center justify-center h-[40px] w-[40px] bg-accent border-4 border-white/20 rounded-full font-bold text-sm'}>{props.quarter}</div>
            </div>
            <div className={'flex flex-col gap-3 p-5 mt-5'}>
                {
                    (props.items.length > 12 ? props.items.slice((props.items.length - 12), props.items.length) : props.items)?.map((item, index) => (
                        <div key={index} className={'flex gap-3 items-center justify-start'}>
                            <div className={'p-2 bg-accent rounded-full'}>
                                {
                                    item.status == "completed" ?
                                        <FiCheck size={12} /> :
                                        item.status == "developing" ?
                                            <FiLoader className={'animate-spin'} /> :
                                            <FiDisc />
                                }
                            </div>
                            <p>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default RoadmapCard;