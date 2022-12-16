import {useEffect, useState} from "react";
import {Spot} from "../models/Spot";
import {getAllSpots} from "../api-calls";

export default function useSpots(){
    const [spots,setSpots] = useState<Spot[]>([])

    useEffect(()=>{
        getAllSpots().then(data => setSpots(data))
    },[])

    return {spots}
}