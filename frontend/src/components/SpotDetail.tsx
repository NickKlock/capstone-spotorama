import {useParams} from "react-router-dom";
import {
    Box,
    CircularProgress,
    Stack,
} from "@mui/material";
import useSpot from "../hooks/useSpot";
import CustomAccordion from "./ui/CustomAccordion";
import {
    Attractions,
    BeachAccess,
    CalendarMonth,
    Explore,
    LocalParking,
    MilitaryTech,
    PriorityHigh,
    Waves, Wc
} from "@mui/icons-material";


export default function SpotDetail(){
    const {id} = useParams()
    const {spot} = useSpot(id)

    if (!spot){
        return (<Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={20} >
                <CircularProgress/>
            </Box>
        )
    }else {
        return(<Stack direction={"column"} spacing={2}>
                <CustomAccordion icon={<Attractions/>} mainContent={spot.disciplines} title={"Best for"}/>
                <CustomAccordion icon={<Explore/>} mainContent={spot.bestDirections} title={"Best wind directions"}/>
                <CustomAccordion icon={<Waves/>} mainContent={spot.waveTypes} title={"Wave conditions"}/>
                <CustomAccordion icon={<MilitaryTech/>} mainContent={spot.experiencesLevel} title={"Riders level"}/>
                <CustomAccordion icon={<BeachAccess/>} mainContent={spot.beachTypes} title={"Beach"}/>
                <CustomAccordion icon={<PriorityHigh/>} mainContent={spot.hazards} title={"Hazards"}/>
                <CustomAccordion icon={<CalendarMonth/>} mainContent={spot.bestMonths} title={"Best time"}/>
                <CustomAccordion icon={<LocalParking/>} mainContent={spot.parkingSpace} title={"Available parking space"}/>
                <CustomAccordion icon={<Wc/>} mainContent={spot.restrooms} title={"Restrooms"}/>
            </Stack>
        )


    }

}