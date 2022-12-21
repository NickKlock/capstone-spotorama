import {BottomNavigation, BottomNavigationAction, Box, Paper} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {MapSharp, Search} from "@mui/icons-material";

export default function BottomNavigationBar() {
    const pathname = useLocation().pathname
    const [currentPath, setCurrentPath] = useState<string>(pathname)

    useEffect(()=>{
        setCurrentPath(pathname)
    },[pathname])


    return (<Paper sx={{position: 'fixed', height: 56, bottom: 0, left: 0, right: 0}} elevation={3}>
            <Box>
                <BottomNavigation value={currentPath}>
                    <BottomNavigationAction component={Link} to={'/'} value={'/'} label={'Map'} icon={<MapSharp/>}/>
                    <BottomNavigationAction component={Link} to={'/spots'} value={'/spots'} label={'Search'}
                                            icon={<Search/>}/>
                </BottomNavigation>
            </Box>

        </Paper>


    )
}