import Map, {GeolocateControl, Layer, Marker, Popup, Source} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {SpotMinimal} from "../../models/Spot";
import {useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {ArrowForward, Explore, Kitesurfing, Waves} from "@mui/icons-material";
import Controls from "./Controls";
import {Position} from "../../models/Position";
import "./PopOver.css"
import {FeatureCollection} from "geojson";
import {heatmapLayer} from "./heatmap-style";

type SpotMapProps = {
    spots: SpotMinimal[]
    handleSpotPopupButtonClick(id: string): void
    showCenterMarker: boolean
    handleCenterPositionChange(center: Position): void
    handleZoomChange(zoom: number): void
    centerLng: number | undefined
    centerLat: number | undefined
}
export default function SpotMap(props: SpotMapProps) {
    const [popupData, setPopupData] = useState<SpotMinimal | null>(null)

    const data: FeatureCollection = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [6.3398, 50.9988]
                },
                properties: {
                    name: "Test"
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [6.3398, 50.9988]
                },
                properties: {
                    name: "Test"
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [6.3398, 50.9988]
                },
                properties: {
                    name: "Test"
                }
            },
        ]
    }

    function handPopupClose() {
        setPopupData(null)
    }

    const spotMarkers = props.spots.map((spot) =>
        <Marker
            key={spot.id}
            longitude={spot.position.geo.coordinates[0]}
            latitude={spot.position.geo.coordinates[1]}
            anchor={"bottom"}
            onClick={e => {
                e.originalEvent.stopPropagation()
                setPopupData(spot)
            }
            }
        />)

    function handleSpotPopupButtonClick() {
        if (popupData) {
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
            maxZoom={15.5}
            style={{width: "100%", height: "100%"}}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            mapboxAccessToken={"pk.eyJ1Ijoibmlja2tsb2NrIiwiYSI6ImNsYm5kZTBqcDBxcnIzb3BxdGg5cDlxcmYifQ.ZQHKwQswuvyOW4_1ZBZONg"}
        >
            <GeolocateControl position="top-right"/>

            <Controls handleCenterCoordinatesChange={props.handleCenterPositionChange}
                      showCenterMarker={props.showCenterMarker}
                      handleZoomChange={props.handleZoomChange}
                      centerLat={props.centerLat}
                      centerLng={props.centerLng}
            />

            <Source type={"geojson"} data={data}>
                <Layer {...heatmapLayer}/>
            </Source>

            {spotMarkers}

            {popupData && (
                <Popup longitude={popupData.position.geo.coordinates[0]}
                       latitude={popupData.position.geo.coordinates[1]}
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