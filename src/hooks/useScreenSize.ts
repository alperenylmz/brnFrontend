import {useCallback, useEffect, useState} from "react";
import {API_HOST} from "@/config";

type Screen = {
    width: number,
    height: number
}

export default function useScreenSize() {
    const [screen, setScreen] = useState<Screen>({width: 0, height: 0});
    const [hasError, setHasError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const getSize = useCallback(() => {
        return {width: window.screen.width, height: window.screen.height};
    },[]);

    useEffect(()=>{
        setScreen(getSize());
    },[getSize])

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setScreen(getSize());
        })
    },[getSize])


    return [screen, isLoading, hasError, error];
}