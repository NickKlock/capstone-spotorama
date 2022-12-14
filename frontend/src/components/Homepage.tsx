import {Box, Drawer, Fab, SpeedDial, SpeedDialAction} from "@mui/material";
import {Add, AddLocation, MyLocation, WhereToVote} from "@mui/icons-material";
import React, {useState} from "react";
import AddSpot from "./AddSpot";
import {Position} from "../models/Position";
import {Spot} from "../models/Spot";
import {useNavigate} from "react-router-dom";
import {MapProvider} from "react-map-gl";
import SpotMap from "./map/SpotMap";

type HomepageProps = {
    spots: Spot[]
    handleAddSpot(newSpot: Spot): Promise<void>
}
export default function Homepage(props: HomepageProps) {
    const [openAddNewSpotDrawer, setOpenAddNewSpotDrawer] = useState<boolean>(false)
    const [pickedLocation, setPickedLocation] = useState<Position>({lat: 0, lng: 0})
    const [showCenterMarker, setShowCenterMarker] = useState<boolean>(false)
    const [hidePickLocation, setHidePickLocationButton] = useState<boolean>(true)
    const navigate = useNavigate()
    const [centerPosition, setCenterPosition] = useState<Position>()

    function handleCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            setPickedLocation({...pickedLocation, lat: position.coords.latitude, lng: position.coords.longitude})
            setOpenAddNewSpotDrawer(true)
        })
    }

    function handleCancelAddSpot() {
        setOpenAddNewSpotDrawer(false)
        setHidePickLocationButton(true)
        setShowCenterMarker(false)
    }

    function handleSaveSpot(newSpot: Spot) {
        props.handleAddSpot(newSpot).then(() => {
            handleCancelAddSpot()
        })
    }

    function handleCreateCenterMarker() {
        if (!showCenterMarker) {
            setShowCenterMarker(true)
            setHidePickLocationButton(false)
        }
    }

    function handleChoosePosition() {
        if (showCenterMarker && centerPosition) {
            setPickedLocation(
                {...pickedLocation, lat: centerPosition.lat, lng: centerPosition.lng})
            setOpenAddNewSpotDrawer(true)
        }
    }

    function handleNavigateToSpotDetails(id: string) {
        navigate("/spots/" + id + "/details")
    }

    function handleCenterPosition(center:Position) {
        setCenterPosition(center)
    }

    return (
        <Box>
            <MapProvider>
                <SpotMap showCenterMarker={showCenterMarker}
                         handleSpotPopupButtonClick={handleNavigateToSpotDetails}
                         spots={props.spots}
                         handleCenterPositionChange={handleCenterPosition}
                         centerLng={centerPosition?.lng}
                         centerLat={centerPosition?.lat}
                />
            </MapProvider>

            {!hidePickLocation &&
                <Fab color={"success"} variant={"extended"} hidden={true} onClick={handleChoosePosition} sx={{
                    left: 20,
                    position: 'fixed',
                    bottom: 80
                }}>
                    <WhereToVote sx={{mr: 1}}/>
                    Pick location
                </Fab>}

            <SpeedDial
                ariaLabel={"addSpot"}
                sx={{
                    right: 20,
                    position: 'fixed',
                    bottom: 80
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
                         handleCancel={handleCancelAddSpot}
                         handleSave={handleSaveSpot}/>
            </Drawer>
        </Box>
    )
}