import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SpotDetail from "./components/SpotDetail";

function App() {

    const {mapboxToken} = useAccessToken()

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage mapboxToken={mapboxToken}/>} path={"/"}/>
                <Route element={<SpotDetail/>} path={"/spots/:id/details"}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
