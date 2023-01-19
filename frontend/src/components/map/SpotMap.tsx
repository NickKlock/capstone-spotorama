import Map, {GeolocateControl, Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Spot} from "../../models/Spot";
import {useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {ArrowForward, Explore, Kitesurfing, Waves} from "@mui/icons-material";
import Controls from "./Controls";
import {Position} from "../../models/Position";
import "./PopOver.css"

type SpootMap = {
    spots: Spot[]
    handleSpotPopupButtonClick(id:string):void
    showCenterMarker:boolean
    handleCenterPositionChange(center:Position):void
    centerLng:number | undefined
    centerLat:number | undefined
}
export default function SpotMap(props: SpootMap) {
    const [popupData, setPopupData] = useState<Spot | null>(null)
    function handPopupClose() {
        setPopupData(null)
    }

    const spotMarkers = props.spots.map((spot) =>
        <Marker
            key={spot.id}
            longitude={spot.position.lng}
            latitude={spot.position.lat}
            anchor={"bottom"}
            onClick={e => {
                e.originalEvent.stopPropagation()
                setPopupData(spot)
            }
            }
        />)

    function handleSpotPopupButtonClick() {
        if (popupData){
            props.handleSpotPopupButtonClick(popupData?.id)
            setPopupData(null)
        }
    }


    return (
        <Map
            id={"spotmap"}
            initialViewState={{
                longitude: 6.3398,
                latitude: 50.9988,
                zoom: 3.5
            }}

            style={{width: "100%", height: "100%"}}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            mapboxAccessToken={"pk.eyJ1Ijoibmlja2tsb2NrIiwiYSI6ImNsYm5kZTBqcDBxcnIzb3BxdGg5cDlxcmYifQ.ZQHKwQswuvyOW4_1ZBZONg"}
        >
            <GeolocateControl position="top-right"/>

            <Controls handleCenterCoordinatesChange={props.handleCenterPositionChange}
                      showCenterMarker={props.showCenterMarker}
                      centerLat={props.centerLat}
                      centerLng={props.centerLng}
            />

            {spotMarkers}

            {popupData && (
                <Popup longitude={popupData.position.lng}
                       latitude={popupData.position.lat}
                       offset={25}
                       onClose={handPopupClose}>
                        <Typography variant={"h6"} textAlign={"center"}>{popupData.name}</Typography>
                        <Typography><Kitesurfing/> {popupData.disciplines.join(", ").toLowerCase()}</Typography>
                        <Typography> <Explore/> {popupData.bestDirections.join(", ")}</Typography>
                        <Typography><Waves/> {popupData.waveTypes.join(", ")}</Typography>
                        <Box display={"flex"} justifyContent={"flex-end"} alignItems={"flex-end"}>
                            <IconButton onClick={handleSpotPopupButtonClick}>
                                <ArrowForward/>
                            </IconButton>
                        </Box>
                </Popup>
            )}
        </Map>
    )
}