import {useEffect, useState} from "react";
import {Spot} from "../models/Spot";
import {getSpotById} from "../api-calls";

export default function useSpot(id: string | undefined) {
    const [spot, setSpot] = useState<Spot>()

    useEffect(() => {
        if (id) {
            getSpotById(id)
                .then(response => setSpot(response))
        }
    }, [id])

    return {spot}
}