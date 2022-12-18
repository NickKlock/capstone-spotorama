import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

    const {mapboxToken} = useAccessToken()

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage mapboxToken={mapboxToken}/>} path={"/"}/>
                <Route element={<p/>} path={"/spots/:id/details"}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
