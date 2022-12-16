import {Box, Drawer, Fab, SpeedDial, SpeedDialAction} from "@mui/material";
import Map from "./Map";
import {Add, AddLocation, MyLocation, WhereToVote} from "@mui/icons-material";
import React, {useState} from "react";
import AddSpot from "./AddSpot";
import {Position} from "../models/Position";
import mapboxgl from "mapbox-gl";
import {Spot} from "../models/Spot";
import {addSpot} from "../api-calls";

type HomepageProps = {
    mapboxToken: string
}
export default function Homepage(props: HomepageProps) {
    const [openAddNewSpotDrawer, setOpenAddNewSpotDrawer] = useState<boolean>(false)
    const [pickedLocation, setPickedLocation] = useState<Position>({lat: 0, lng: 0})
    const [centerMarker, setCenterMarker] = useState<mapboxgl.Marker>()
    const [hidePickLocation, setHidePickLocation] = useState<boolean>(true)

    function handleCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            setPickedLocation({...pickedLocation, lat: position.coords.latitude, lng: position.coords.longitude})
            setOpenAddNewSpotDrawer(true)
        })
    }

    function handleDrawerClose() {
        setOpenAddNewSpotDrawer(false)
    }

    function handleSaveSpot(newSpot: Spot) {
        addSpot(newSpot).then(() => {
            setOpenAddNewSpotDrawer(false)
            setHidePickLocation(true)
            centerMarker?.remove()
            setCenterMarker(undefined)
        })
    }

    function handleCreateCenterMarker() {
        if (!centerMarker) {
            setCenterMarker(new mapboxgl.Marker().setLngLat([0, 0]))
            setHidePickLocation(false)
        }
    }

    function handleChoosePosition() {
        if (centerMarker?.getLngLat()) {
            setPickedLocation(
                {...pickedLocation, lat: centerMarker?.getLngLat().lat, lng: centerMarker?.getLngLat().lng})
            setOpenAddNewSpotDrawer(true)
        }
    }

    return (
        <Box>
            <Map centerMarker={centerMarker} token={props.mapboxToken}/>
            {!hidePickLocation &&
                <Fab color={"success"} variant={"extended"} hidden={true} onClick={handleChoosePosition} sx={{
                    left: 20,
                    position: 'fixed',
                    bottom: 20
                }}>
                    <WhereToVote sx={{mr: 1}}/>
                    Pick location
                </Fab>}

            <SpeedDial
                ariaLabel={"addSpot"}
                sx={{
                    right: 20,
                    position: 'fixed',
                    bottom: 20
                }}
                icon={<Add/>}
            >
                <SpeedDialAction key={"currentpostion"}
                                 icon={<MyLocation/>}
                                 tooltipOpen={true}
                                 tooltipTitle={"Current position"}
                                 onClick={handleCurrentPosition}
                />
                <SpeedDialAction key={"choosepostion"}
                                 icon={<AddLocation/>}
                                 tooltipOpen={true}
                                 tooltipTitle={"Pick a position"}
                                 onClick={handleCreateCenterMarker}
                />
            </SpeedDial>

            <Drawer
                anchor={"bottom"}
                open={openAddNewSpotDrawer}>
                <AddSpot pickedLocation={pickedLocation}
                         handleCancel={handleDrawerClose}
                         handleSave={handleSaveSpot}/>
            </Drawer>

        </Box>
    )
}