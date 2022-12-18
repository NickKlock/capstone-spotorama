import {useParams} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";
import useSpot from "../hooks/useSpot";

export default function SpotDetail(){
    const {id} = useParams()
    const {spot} = useSpot(id)

    if (!spot){
        return (<Box display={"flex"} justifyContent={"center"} alignItems={"center"} margin={20} >
                <CircularProgress/>
            </Box>
        )
    }else {
        return(<Box>

        </Box>)
    }

}