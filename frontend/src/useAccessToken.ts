import {useEffect, useState} from "react";
import {getAccessToken} from "./api-calls";

export default function useAccessToken(){
    const [token, setToken] = useState<string>("")

    useEffect(()=>{
        getAccessToken().then(data => {
            setToken(data)
        })
    },[])

    return {token}
}