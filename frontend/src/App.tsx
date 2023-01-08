import React from 'react';
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SpotDetail from "./components/SpotDetail";
import useSpots from "./hooks/useSpots";
import SpotList from "./components/spot_list/SpotList";
import BottomNavigationBar from "./components/BottomNavigationBar";
import TitleBarRoutes from "./components/TitleBarRoutes";
import {Box} from "@mui/material";
import Register from "./components/profile/Register";
import useUser from "./hooks/useUser";
import Login from "./components/profile/Login";
import Profile from "./components/profile/Profile";

function App() {

    const {spots, addSpot} = useSpots()

    const {registerUser, loggedInUser, login, logout, edit, deletee} = useUser();


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage handleAddSpot={addSpot} spots={spots}/>} path={"/"}/>

                <Route element={<Profile handleDeleteUser={deletee}
                                         handleEditUser={edit}
                                         handleLogout={logout}
                                         loggedInUser={loggedInUser}/>} path={"/profile"}/>

                <Route element={<TitleBarRoutes/>}>
                    <Route element={<Login
                        loggedInUser={loggedInUser}
                        handleLoginRequest={login}/>} path={"/login"}/>
                    <Route element={<Register loggedInUser={loggedInUser}
                                              handleRegisterUser={registerUser}/>} path={"/register"}/>
                    <Route element={<SpotList spots={spots}/>} path={"/spots"}/>
                    <Route element={<SpotDetail/>} path={"/spots/:id/details"}/>
                </Route>
            </Routes>

            <Box height={56}>
                <BottomNavigationBar/>
            </Box>
        </BrowserRouter>
    )
}

export default App;
