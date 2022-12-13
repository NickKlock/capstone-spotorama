import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import mapboxgl from 'mapbox-gl'
import {Box} from "@mui/material";

mapboxgl.accessToken = "pk.eyJ1Ijoibmlja2tsb2NrIiwiYSI6ImNraXEzZDhqNDFzaWEyeXBrbm5sOTd4OTAifQ.1qnQdThQElj-xFUOc85aPQ"
export default function Map(){
    const mapContainer= useRef<HTMLDivElement| string>("") as MutableRefObject<HTMLDivElement>;
    const map = useRef<mapboxgl.Map>();
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            attributionControl:false,
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            if (map.current){
                setLng(parseFloat(map.current?.getCenter().lng.toFixed(4)));
                setLat(parseFloat(map.current?.getCenter().lat.toFixed(4)));
                setZoom(parseFloat(map.current?.getZoom().toFixed(2)));
            }

        });
    });

    return(
        <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
            <Box ref={mapContainer} flex={1}/>
        </Box>
    )
}