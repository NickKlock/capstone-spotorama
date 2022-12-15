import React from 'react';
import useAccessToken from "./hooks/useAccessToken";
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

    const {token} = useAccessToken()

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage token={token}/>} path={"/"}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
