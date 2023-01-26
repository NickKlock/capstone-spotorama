import {useEffect, useState} from "react";
import {getGeoJson} from "../api-calls";
import {GeoJSON} from "../models/GeoJson";

export default function useGeoJson() {
    const [geoJson, setGeoJson] = useState<GeoJSON>()

    useEffect(() => {
        getGeoJson().then(data => setGeoJson(data))
    }, [])

    function refreshGeoJson() {
        getGeoJson().then(data => setGeoJson(data))
    }

    return {geoJson, refreshGeoJson}
}