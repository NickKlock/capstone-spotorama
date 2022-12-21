import {BottomNavigation, BottomNavigationAction, Box, Paper} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {SyntheticEvent, useState} from "react";
import {MapSharp, Search} from "@mui/icons-material";

export default function BottomNavigationBar(){
    const pathname = useLocation().pathname
    const [currentPath, setCurrentPath] = useState<string>(pathname)


    function handlePatchChange(event: SyntheticEvent<Element, Event>, newValue: string) {
        setCurrentPath(newValue)
    }

    return(<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box>
                <BottomNavigation value={currentPath} onChange={handlePatchChange}>
                    <BottomNavigationAction component={Link} to={'/'} value={'/'} label={'Map'} icon={<MapSharp/>} />
                    <BottomNavigationAction component={Link} to={'/spots'} value={'/spots'} label={'Search'} icon={<Search/>} />
                </BottomNavigation>
            </Box>
    </Paper>


    )
}