import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SpotDetail from "./components/SpotDetail";
import useSpots from "./hooks/useSpots";
import SpotList from "./components/spot_list/SpotList";
import BottomNavigationBar from "./components/BottomNavigationBar";
import {Spot} from "./models/Spot";

function App() {

    const {mapboxToken} = useAccessToken()
    const {spots, addSpot} = useSpots()

    function handleAddSpot(newSpot:Spot):Promise<void> {
        return addSpot(newSpot).then(()=>{
        })
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage handleAddSpot={handleAddSpot} spots={spots} mapboxToken={mapboxToken}/>} path={"/"}/>
                <Route element={<SpotList spots={spots}/>} path={"/spots"}/>
                <Route element={<SpotDetail/>} path={"/spots/:id/details"}/>
            </Routes>
            <BottomNavigationBar/>

        </BrowserRouter>
    )
}

export default App;
