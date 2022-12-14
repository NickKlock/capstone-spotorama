import {Box, Fab} from "@mui/material";
import Map from "./Map";

type HomepageProps = {
    token: string
}
export default function Homepage(props: HomepageProps) {

    return (
        <Box>
            <Map token={props.token}/>
        </Box>
    )
}