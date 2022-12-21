import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {getSpotById} from "../api-calls";
import {ArrowBack} from "@mui/icons-material";

const titles = {
    "/spots":"Spot overview"
}
export default function TitleBar(){
    const location = useLocation()
    const [title,setTitle] = useState<string>("")
    const navigate = useNavigate()

    useEffect(()=>{
        if(location.pathname === "/spots"){
            setTitle(titles[location.pathname])
        }else {
            const splitString = location.pathname.split("/")
            const spotId = splitString[2];
            getSpotById(spotId).then(res => setTitle("Details about "+res.name))
        }
    },[location.pathname])

    function handleNavigateBack() {
        navigate(-1)
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" component={"nav"}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="backButton"
                        sx={{ mr: 2 }}
                        onClick={handleNavigateBack}
                    >
                        <ArrowBack />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}