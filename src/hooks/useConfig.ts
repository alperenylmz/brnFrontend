import {useEffect, useState} from "react";
import {API_HOST} from "@/config";

export default function useConfig(key: string) {
    const [data, setData] = useState(0);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);


    useEffect(()=>{
        async function getTokenAllocations(){
            try{
                const request = await fetch(`${API_HOST}/api/v1/config/${key}`);
                const response = await request.json();
                setData(response);
            } catch (e: any) {
                console.log(e.message)
            }
        }
        getTokenAllocations();
    },[key])


    return [data, isLoading, hasError, error];
}