import {useState} from "react";
import {Spot, SpotMinimal} from "../models/Spot";
import {getAllSpotsMinimal, getSpotsAroundLocation as apiGetSpotsAroundLocation, postSpot} from "../api-calls";

export default function useSpots() {
    const [spots, setSpots] = useState<SpotMinimal[]>([])
    const spotSet = new Set<SpotMinimal>(spots);

    function addSpot(newSpot: Spot): Promise<void> {
        return postSpot(newSpot)
            .then(response => setSpots([...spots, response]))
    }

    function getSpotsAroundLocation(lng: number, lat: number, rad: number): Promise<SpotMinimal[] | void> {
        return apiGetSpotsAroundLocation(lng, lat, rad).then((response: SpotMinimal[]) => {
            const newSpots = response.filter((spot: SpotMinimal) => !spotSet.has(spot))
            setSpots([...spots, ...newSpots])
        })
    }

    function getAllSpots(): Promise<SpotMinimal[]> {
        return getAllSpotsMinimal()
            .then(response => response)
    }

    return {spots, addSpot, getSpotsAroundLocation, getAllSpots}
}