import {useState} from "react";
import {Spot, SpotMinimal} from "../models/Spot";
import {getSpotsAroundLocation as apiGetSpotsAroundLocation, postSpot} from "../api-calls";

export default function useSpots() {
    const [spots, setSpots] = useState<SpotMinimal[]>([])

    function addSpot(newSpot: Spot): Promise<void> {
        return postSpot(newSpot)
            .then(response => setSpots([...spots, response]))
    }

    function getSpotsAroundLocation(lng: number, lat: number, rad: number): Promise<SpotMinimal[] | void> {
        return apiGetSpotsAroundLocation(lng, lat, rad).then(response => {
            setSpots(response)
        })
    }

    return {spots, addSpot, getSpotsAroundLocation}
}