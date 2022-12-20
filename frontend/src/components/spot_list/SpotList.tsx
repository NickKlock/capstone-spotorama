import {Spot} from "../../models/Spot";
import SpotItem from "./SpotItem";
import {Stack} from "@mui/material";

type SpotListProps = {
    spots:Spot[]
}
export default function SpotList(props:SpotListProps){

    return(<Stack direction={"column"} spacing={2}  marginTop={2} >
        {props.spots.map((spot) => <SpotItem spot={spot} key={spot.id}/>
        )}
    </Stack>)
}