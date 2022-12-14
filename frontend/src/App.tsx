import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddSpot from "./components/AddSpot";

function App() {

    const {token} = useAccessToken()

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage token={token}/>} path={"/"}/>
                <Route element={<AddSpot/>} path={"/add-spot"}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
