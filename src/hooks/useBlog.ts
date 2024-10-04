import {useEffect, useState} from "react";


export default function useBlog(filter: string): [[], boolean, boolean, any, ((value: (((prevState: undefined) => undefined) | undefined)) => void)] {
    const [data, setData] = useState<[]>([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState();

    let API_HOST = 'http://localhost:1337';



    useEffect(()=>{
        async function getBlogPosts(){
            setLoading(true);
            try{
                const request = await fetch(`${API_HOST}/api/v1/blog?${filter}`);
                const response = await request.json();
                setData(response.reverse());
            } catch (e: any) {
                console.log(e.message)
            }
            setLoading(false);
        }
        getBlogPosts();
    },[reload, filter])


    return [data, isLoading, hasError, error, setReload];
}