import {useEffect, useState} from "react";

export default function useTokenAllocations() {
    const [tokenAllocations, setTokenAllocations] = useState([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    //let API_HOST = 'https://strapiornek3.onrender.com';


    let API_HOST = 'http://localhost:1337';

    useEffect(()=> {
        async function getTokenAllocations(){
            try{
                const request = await fetch(`${API_HOST}/api/token-allocations`);
                const response = await request.json();
                console.log("TOKEN ALLOCATIONS RESPONSE: ", response);
                
                setTokenAllocations(response.data);
            } catch (e: any) {
                console.log(e.message);
            }
        }
        getTokenAllocations();
    },[])


    return [tokenAllocations, isLoading, hasError, error];
}