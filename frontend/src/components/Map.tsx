import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import mapboxgl from 'mapbox-gl'
import {Box} from "@mui/material";
import {Spot} from "../models/Spot";
import SpotPopover from "./SpotPopover";
import {createRoot} from "react-dom/client";


type MapProps = {
    token: string
    centerMarker:mapboxgl.Marker | undefined
    spots:Spot[]
}
export default function Map(props: MapProps) {
    mapboxgl.accessToken = props.token
    const mapContainer = useRef<HTMLDivElement | string>("") as MutableRefObject<HTMLDivElement>;
    const map = useRef<mapboxgl.Map>();
    const [lng, setLng] = useState(6.3398);
    const [lat, setLat] = useState(50.9988);
    const [zoom, setZoom] = useState(3.5);

    useEffect(() => {
        if (props.token === "") return;

        if (props.centerMarker && map.current){
            props.centerMarker.addTo(map.current)
        }

        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            attributionControl: false,
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [lng, lat],
            zoom: zoom,
            minZoom: 2.3
        });
        map.current?.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            showAccuracyCircle: true

        }))
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            if (map.current) {
                setLng(parseFloat(map.current?.getCenter().lng.toFixed(4)));
                setLat(parseFloat(map.current?.getCenter().lat.toFixed(4)));
                setZoom(parseFloat(map.current?.getZoom().toFixed(2)));
                if (props.centerMarker){
                    props.centerMarker.setLngLat(map.current?.getCenter())
                }
            }
        });
    });

    useEffect(()=>{
        if (!map.current) return; // wait for map to initialize
        if (props.spots && props.spots.length > 0){
            props.spots.forEach((spot) => {
                if (map.current){
                    const htmlDivElement= document.createElement("div")
                    const root = createRoot(htmlDivElement)
                    root.render(<SpotPopover spot={spot}/>)

                    const spotPopup = new mapboxgl.Popup({offset: 25, maxWidth:"none"})
                        .setDOMContent(htmlDivElement)

                    new mapboxgl.Marker()
                        .setPopup(spotPopup)
                        .setLngLat(spot.position)
                        .addTo(map.current)
                }

            })
        }
    },[props.spots])


    return (
        <Box height={"100vh"} display={"flex"} flexDirection={"column"}>
            <Box ref={mapContainer} flex={1}/>
        </Box>
    )
}