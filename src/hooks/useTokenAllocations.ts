import {useEffect, useState} from "react";

export default function useTokenAllocations() {
    const [tokenAllocations, setTokenAllocations] = useState([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    let API_HOST = 'https://test.brntoken.net';



    useEffect(()=> {
        async function getTokenAllocations(){
            try{
                const request = await fetch(`${API_HOST}/api/v1/token-allocations`);
                const response = await request.json();
                console.log("TOKEN ALLOCATIONS RESPONSE: ", response);
                
                setTokenAllocations(response);
            } catch (e: any) {
                console.log(e.message);
            }
        }
        getTokenAllocations();
    },[])


    return [tokenAllocations, isLoading, hasError, error];
}