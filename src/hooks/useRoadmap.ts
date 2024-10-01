import {useEffect, useState} from "react";
import {API_HOST} from "@/config";
import RoadmapCard, {Roadmap} from "@/components/roadmap-card";

export default function useRoadmap(): [Array<{ [p: string]: { quarters: Roadmap[] } }>, boolean, boolean, any] {
    const [data, setData] = useState<Array<{[key: string]: {
        quarters: Roadmap[]
        }}>>([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);


    useEffect(()=>{
        async function getRoadmap(){
            try{
                const request = await fetch(`${API_HOST}/api/v1/years?include=quarters.tasks`);
                const response = await request.json();

                setData(
                    response.map((year: any) => ({
                        [year.title]: {
                            quarters: year.quarters.map((quarter: any) => ({
                                quarter: quarter.title,
                                items: quarter.tasks
                            }))
                        }
                    }))
                )

            } catch (e: any) {
                console.log(e.message)
            }
        }
        getRoadmap();
    },[])


    return [data, isLoading, hasError, error];
}