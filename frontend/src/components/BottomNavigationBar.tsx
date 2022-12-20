import {BottomNavigation, BottomNavigationAction, Box, Paper} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {SyntheticEvent, useState} from "react";
import {MapSharp, Search} from "@mui/icons-material";

export default function BottomNavigationBar(){
    const pathname = useLocation().pathname
    const [value, setValue] = useState(pathname)


    function onChange(event: SyntheticEvent<Element, Event>, newValue: any) {
        setValue(newValue)
    }

    return(<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box>
                <BottomNavigation value={value} onChange={onChange}>
                    <BottomNavigationAction component={Link} to={'/'} value={'/'} label={'Map'} icon={<MapSharp/>} />
                    <BottomNavigationAction component={Link} to={'/spots'} value={'/spots'} label={'Search'} icon={<Search/>} />
                </BottomNavigation>
            </Box>
    </Paper>


    )
}