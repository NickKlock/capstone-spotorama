import {Box} from "@mui/material";
import TitleBar from "./TitleBar";
import {Outlet} from "react-router-dom";

export default function TitleBarRoutes() {
    return (<Box>
            <TitleBar/>
            <Outlet/>
        </Box>
    )
}