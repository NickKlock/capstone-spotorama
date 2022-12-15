import {Box, Drawer, Fab, SpeedDial, SpeedDialAction} from "@mui/material";
import Map from "./Map";
import {Add, AddLocation, MyLocation, WhereToVote} from "@mui/icons-material";
import React, {useState} from "react";
import AddSpot from "./AddSpot";
import {Position} from "../models/Position";
import mapboxgl from "mapbox-gl";

type HomepageProps = {
    token: string
}
export default function Homepage(props: HomepageProps) {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [pickedLocation, setPickedLocation] = useState<Position>({lat: 0, lng: 0})
    const [centerMarker, setCenterMarker] = useState<mapboxgl.Marker>()
    const [hidePickLocation, setHidePickLocation] = useState(true)
    function handleCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            setPickedLocation({...pickedLocation, lat: position.coords.latitude, lng: position.coords.longitude})
            setOpenDrawer(true)
        })
    }

    function handleDrawerClose() {
        setOpenDrawer(false)
    }

    function handleSaveSpot() {
        //apiCall

        //closeDrawer
        setOpenDrawer(false)
        setHidePickLocation(true)
        //delete marker
        centerMarker?.remove()
        setCenterMarker(undefined)


    }

    function handleCreateCenterMarker() {
        if (!centerMarker){
            setCenterMarker(new mapboxgl.Marker().setLngLat([0,0]))
            setHidePickLocation(false)
        }
    }

    function handleChoosePosition() {
        if (centerMarker?.getLngLat()){
            setPickedLocation(
                {...pickedLocation, lat: centerMarker?.getLngLat().lat, lng:centerMarker?.getLngLat().lng})
            setOpenDrawer(true)
        }
    }

    return (
        <Box>
            <Map choosePositionMarker={centerMarker} token={props.token}/>
            <Fab variant={"extended"} hidden={hidePickLocation} onClick={handleChoosePosition} sx={{
                right: 20,
                position: 'fixed',
                bottom: 80
            }} >
                <WhereToVote sx={{mr:1}}/>
                Pick location
            </Fab>
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
                open={openDrawer}>
                <AddSpot pickedLocation={pickedLocation} handleCancel={handleDrawerClose} handleSave={handleSaveSpot}/>
            </Drawer>

        </Box>
    )
}