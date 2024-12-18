import {useEffect, useState} from "react";
import { spatie } from '@limitless.claver/laravel-query-builder';

export default function useMarkets() : [any[], boolean, boolean, any, ((value: (((prevState: undefined) => undefined) | undefined)) => void)] {
    const [markets, setMarkets] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState();

    let API_HOST = 'https://test.brntoken.net';



    useEffect(()=>{
        async function getMarkets(){
            setLoading(true);
            try{
                const url = spatie(`${API_HOST}/api/v1/markets`).build();
                const request = await fetch(url);
                const response = await request.json();
                setMarkets(response);
            } catch (e: any) {
                console.log(e.message)
            }
            setLoading(false);
        }
        getMarkets();
    },[reload])


    return [markets, isLoading, hasError, error, setReload];
}