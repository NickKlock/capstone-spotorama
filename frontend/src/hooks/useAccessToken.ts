import {useEffect, useState} from "react";
import {getAccessToken} from "../api-calls";

export default function useAccessToken(){
    const [mapboxToken, setMapboxToken] = useState<string>("")

    useEffect(()=>{
        getAccessToken().then(data => {
            setMapboxToken(data)
        })
    },[])

    return {mapboxToken}
}