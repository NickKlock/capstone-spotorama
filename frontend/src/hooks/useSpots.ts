import {useEffect, useState} from "react";
import {Spot} from "../models/Spot";
import {getAllSpots, postSpot} from "../api-calls";

export default function useSpots() {
    const [spots, setSpots] = useState<Spot[]>([])

    useEffect(() => {
        getAllSpots().then(data => setSpots(data))
    }, [])

    function addSpot(newSpot: Spot):Promise<void> {
        return postSpot(newSpot)
            .then(response => setSpots([...spots, response]))
    }

    return {spots,addSpot}
}