import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SpotDetail from "./components/SpotDetail";
import useSpots from "./hooks/useSpots";
import SpotList from "./components/spot_list/SpotList";

function App() {

    const {mapboxToken} = useAccessToken()
    const {spots} = useSpots()
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage spots={spots} mapboxToken={mapboxToken}/>} path={"/"}/>
                <Route element={<SpotList spots={spots}/>} path={"/spots"}/>
                <Route element={<SpotDetail/>} path={"/spots/:id/details"}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
