import {useEffect, useState} from "react";

export default function useTokenAllocations() {
    const [tokenAllocations, setTokenAllocations] = useState([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    let API_HOST = 'http://51.20.121.61:1337/';



    useEffect(()=> {
        async function getTokenAllocations(){
            try{
                const request = await fetch(`${API_HOST}/api/v1/token-allocations`);
                const response = await request.json();
                setTokenAllocations(response);
            } catch (e: any) {
                console.log(e.message);
            }
        }
        getTokenAllocations();
    },[])


    return [tokenAllocations, isLoading, hasError, error];
}