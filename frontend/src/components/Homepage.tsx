import {Box, Fab} from "@mui/material";
import Map from "./Map";
import {useNavigate} from "react-router-dom";

type HomepageProps = {
    token: string
}
export default function Homepage(props: HomepageProps) {
    const navigate = useNavigate()
    function handleAddButtonClick() {
        navigate("/add-spot")
    }

    return (
        <Box>
            <Map handleAddButtonClick={handleAddButtonClick} token={props.token}/>
        </Box>
    )
}