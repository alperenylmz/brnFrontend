import {useEffect, useState} from "react";

export default function useTokenPrice() : (any[] | boolean | any | ((value: (((prevState: undefined) => undefined) | undefined)) => void))[] {
  const [tokenPrice, setTokenPrice] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState();

  let API_HOST = 'https://strapiornek3.onrender.com/';



  useEffect(()=> {
    async function getTokenPrice(){
      setLoading(true);
      try{
        const request = await fetch(`${API_HOST}/api/v1/token-price`);
        const response = await request.json();
        setTokenPrice(response);
      } catch (e: any) {
        console.log(e.message)
      }
      setLoading(false);
    }
    getTokenPrice();
  },[reload])


  return [tokenPrice, isLoading, hasError, error, setReload];
}