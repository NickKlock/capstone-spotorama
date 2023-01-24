import {useEffect, useState} from "react";
import {Spot, SpotMinimal} from "../models/Spot";
import {getAllSpotsMinimal, postSpot} from "../api-calls";

export default function useSpots() {
    const [spots, setSpots] = useState<SpotMinimal[]>([])

    useEffect(() => {
        getAllSpotsMinimal()
            .then((allSpotsAsMinimal: SpotMinimal[]) => setSpots(allSpotsAsMinimal))
    }, [])

    function addSpot(newSpot: Spot): Promise<void> {
        return postSpot(newSpot)
            .then(response => setSpots([...spots, response]))
    }

    return {spots,addSpot}
}