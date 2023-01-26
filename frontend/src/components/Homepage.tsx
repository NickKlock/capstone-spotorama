import {
    Backdrop,
    Box,
    CircularProgress,
    CloseReason,
    Drawer,
    Fab,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography
} from "@mui/material";
import {AddLocation, Cancel, MyLocation, WhereToVote} from "@mui/icons-material";
import React, {SyntheticEvent, useEffect, useState} from "react";
import AddSpot from "./AddSpot";
import {Position} from "../models/Position";
import {Spot, SpotMinimal} from "../models/Spot";
import {useLocation, useNavigate} from "react-router-dom";
import {MapProvider} from "react-map-gl";
import SpotMap from "./map/SpotMap";
import CustomAlert from "./ui/custom-mui-components/CustomAlert";
import {AlertModel} from "../models/AlertModel";
import {AxiosError} from "axios";
import useZoomToKM from "../hooks/useZoomToKM";
import useGeoJson from "../hooks/useGeoJson";

type HomepageProps = {
    spots: SpotMinimal[]
    handleAddSpot(newSpot: Spot): Promise<void>
    getSpotsAroundUser(lng: number, lat: number, rad: number): Promise<SpotMinimal[] | void>
}

export default function Homepage(props: HomepageProps) {
    const [openAddNewSpotDrawer, setOpenAddNewSpotDrawer] = useState<boolean>(false)
    const [pickedLocation, setPickedLocation] = useState<Position>({
        country: "",
        geo: {type: "Point", coordinates: [0, 1]}
    })
    const [showCenterMarker, setShowCenterMarker] = useState<boolean>(false)
    const [hidePickLocation, setHidePickLocationButton] = useState<boolean>(true)
    const navigate = useNavigate()
    const [centerPosition, setCenterPosition] = useState<Position>()
    const [alert, setAlert] = useState<AlertModel>({alertMessage: "", open: false, severity: "success"})
    const {calculateZoomToKM} = useZoomToKM();
    const [zoom, setZoom] = useState<number>(15.5)
    const location = useLocation();
    const [currentRequest, setCurrentRequest] = useState<NodeJS.Timeout>()
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const {geoJson, refreshGeoJson} = useGeoJson()

    useEffect(() => {
        if (location.state) {
            setAlert(location.state)
        }
    }, [location.state])

    useEffect(() => {
        if (zoom > 4.9) return

        if (currentRequest) {
            clearTimeout(currentRequest)
        }

        const timeout = setTimeout(() => {
            findSpotsAroundPosition()
        }, 3000);
        setCurrentRequest(timeout)


        return () => clearTimeout(timeout);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [centerPosition, zoom])

    function findSpotsAroundPosition() {
        if (centerPosition) {
            setShowLoading(true)
            const zoomInKM = calculateZoomToKM(zoom)
            props.getSpotsAroundUser(
                centerPosition.geo.coordinates[0], centerPosition.geo.coordinates[1], zoomInKM)
                .then(() => setShowLoading(false))
        }
    }


    function handleCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            setPickedLocation(
                {
                    ...pickedLocation,
                    geo: {
                        ...pickedLocation.geo,
                        coordinates: [position.coords.longitude, position.coords.latitude]
                    }
                })
            setOpenAddNewSpotDrawer(true)
        })
    }

    function resetUi(event?: SyntheticEvent<{}, Event> | {}, reason?: CloseReason | "escapeKeyDown" | "backdropClick") {


        if (reason &&
            reason !== "toggle" &&
            // @ts-ignore  ignoring es-lint since reason could be backdropClick
            reason !== "backdropClick" &&
            reason !== "escapeKeyDown") {

            return;
        }
        setOpenAddNewSpotDrawer(false)
        setHidePickLocationButton(true)
        setShowCenterMarker(false)
    }

    function handleSaveSpot(newSpot: Spot) {
        props.handleAddSpot(newSpot)
            .then(() => {
                refreshGeoJson()
                resetUi()
                setAlert({
                    ...alert,
                    alertMessage: "New spot saved successfully",
                    open: true
                })
            }).catch((error: AxiosError) => {
            if (!error.response) {
                setAlert({
                    ...alert,
                    severity: "error",
                    alertMessage: "An error occurred, please report to the admin ",
                    open: true
                })
            }
            if (error.response!.status === 401) {
                setAlert({
                    ...alert,
                    severity: "error",
                    alertMessage: "Please login to create new spots",
                    open: true
                })
            }
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
                {
                    ...pickedLocation,
                    geo: {
                        ...pickedLocation.geo,
                        coordinates: [centerPosition.geo.coordinates[0], centerPosition.geo.coordinates[1]]
                    }
                })
            setOpenAddNewSpotDrawer(true)
        }
    }

    function handleNavigateToSpotDetails(id: string) {
        navigate("/spots/" + id + "/details")
    }

    function handleCenterPosition(center: Position) {
        setCenterPosition(center)
    }

    function handleAlertClose() {
        setAlert({...alert, open: false})
    }

    return (
        <Box>
            <Backdrop open={showLoading} sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <CircularProgress sx={{marginRight: 1}}/>
                <Typography textAlign={"center"}>Loading spots...</Typography>
            </Backdrop>

            <Box position={"fixed"} height={"calc(100% - 56px)"} width={"100%"}>
                <MapProvider>
                    <SpotMap showCenterMarker={showCenterMarker}
                             handleSpotPopupButtonClick={handleNavigateToSpotDetails}
                             spots={props.spots}
                             handleCenterPositionChange={handleCenterPosition}
                             handleZoomChange={setZoom}
                             geoJson={geoJson}
                             zoom={zoom}
                             centerLng={centerPosition?.geo.coordinates[0]}
                             centerLat={centerPosition?.geo.coordinates[1]}
                    />
                </MapProvider>
            </Box>


            {!hidePickLocation &&
                <Fab color={"secondary"}
                     variant={"extended"}
                     hidden={true}
                     onClick={handleChoosePosition} sx={{
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
                FabProps={{
                    sx: {
                        bgcolor: "secondary.main",
                        "&:hover": {
                            bgcolor: "secondary.main"
                        }
                    }
                }}
                onClose={resetUi}
                icon={<SpeedDialIcon openIcon={<Cancel/>}/>}
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
                anchor={"right"}
                PaperProps={{
                    sx: {
                        width: "70%",
                        height: "calc(100% - 56px)"
                    }
                }}
                onClose={resetUi}
                open={openAddNewSpotDrawer}>
                <AddSpot pickedLocation={pickedLocation}
                         handleCancel={resetUi}
                         handleSave={handleSaveSpot}/>
            </Drawer>

            <CustomAlert severity={alert.severity}
                         onClose={handleAlertClose}
                         alertMessage={alert.alertMessage}
                         open={alert.open}/>
        </Box>
    )
}