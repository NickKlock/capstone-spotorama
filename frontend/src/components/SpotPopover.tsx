import {Spot} from "../models/Spot";
import {Box, Typography} from "@mui/material";

type SpotPopoverProps={
    spot:Spot
}
export default function SpotPopover(props:SpotPopoverProps){


    return(<Box>
            <Typography variant={"h3"}>{props.spot.name}</Typography>
        </Box>
    )
}