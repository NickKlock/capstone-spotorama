import React from 'react';
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SpotDetail from "./components/SpotDetail";
import useSpots from "./hooks/useSpots";
import SpotList from "./components/spot_list/SpotList";
import BottomNavigationBar from "./components/BottomNavigationBar";
import {Spot} from "./models/Spot";
import TitleBarRoutes from "./components/TitleBarRoutes";
import {Box} from "@mui/material";
import Register from "./components/profile/Register";
import useUser from "./hooks/useUser";
import {NewUserRequest, UserLoginRequest} from "./models/User";
import Login from "./components/profile/Login";
import Profile from "./components/profile/Profile";

function App() {

    const {spots, addSpot} = useSpots()

    const {registerUser, loggedInUser, login, logout, updateUser, deleteUser} = useUser();

    function handleAddSpot(newSpot: Spot): Promise<void> {
        return addSpot(newSpot).then(() => Promise.resolve())
    }

    function handleRegisterNewUser(newUser: NewUserRequest): Promise<void> {
        return registerUser(newUser)
    }

    function handleLoginUser(loginUserRequest: UserLoginRequest): Promise<void> {
        return login(loginUserRequest)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage handleAddSpot={handleAddSpot} spots={spots}/>} path={"/"}/>

                <Route element={<Profile handleDeleteUser={deleteUser}
                                         handleEditUser={updateUser}
                                         handleLogout={logout}
                                         loggedInUser={loggedInUser}/>} path={"/profile"}/>

                <Route element={<TitleBarRoutes/>}>
                    <Route element={<Login
                        loggedInUser={loggedInUser}
                        handleLoginRequest={handleLoginUser}/>} path={"/login"}/>
                    <Route element={<Register loggedInUser={loggedInUser}
                                              handleRegisterUser={handleRegisterNewUser}/>} path={"/register"}/>
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
