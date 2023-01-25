import {useState} from "react";
import {Spot, SpotMinimal} from "../models/Spot";
import {getSpotsAroundLocation, postSpot} from "../api-calls";

export default function useSpots() {
    const [spots, setSpots] = useState<SpotMinimal[]>([])

    // useEffect(() => {
    //     getAllSpotsMinimal()
    //         .then((allSpotsAsMinimal: SpotMinimal[]) => setSpots(allSpotsAsMinimal))
    // }, [])

    function addSpot(newSpot: Spot): Promise<void> {
        return postSpot(newSpot)
            .then(response => setSpots([...spots, response]))
    }

    function getSpotsAroundUser1(lng: number, lat: number, rad: number) {
        getSpotsAroundLocation(lng, lat, rad).then(response => {
            setSpots(response)
        })
    }

    return {spots, addSpot, getSpotsAroundUser1}
}