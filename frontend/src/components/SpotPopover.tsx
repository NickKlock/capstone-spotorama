import {Spot} from "../models/Spot";
import {Box, IconButton, Typography} from "@mui/material";
import {ArrowForward, Explore, Kitesurfing, Waves} from "@mui/icons-material";

type SpotPopoverProps={
    spot:Spot
    handleNavigate(id:string):void
}
export default function SpotPopover(props:SpotPopoverProps){

    function handleArrowButtonClick() {
        props.handleNavigate(props.spot.id)
    }

    return(<Box>
            <Typography variant={"h6"} textAlign={"center"}>{props.spot.name}</Typography>
            <Typography><Kitesurfing/> {props.spot.disciplines.join(", ").toLowerCase()}</Typography>
            <Typography> <Explore/> {props.spot.bestDirections.join(", ")}</Typography>
            <Typography><Waves/> {props.spot.waveTypes.join(", ")}</Typography>
            <Box display={"flex"} justifyContent={"flex-end"} alignItems={"flex-end"}>
                <IconButton onClick={handleArrowButtonClick}>
                    <ArrowForward/>
                </IconButton>
            </Box>

            </Box>
    )
}