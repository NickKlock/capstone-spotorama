import React from 'react';
import Homepage from "./components/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SpotDetail from "./components/SpotDetail";
import useSpots from "./hooks/useSpots";
import SpotList from "./components/spot-list/SpotList";
import BottomNavigationBar from "./components/BottomNavigationBar";
import TitleBarRoutes from "./components/TitleBarRoutes";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Register from "./components/profile/Register";
import useUser from "./hooks/useUser";
import Login from "./components/profile/Login";
import Profile from "./components/profile/Profile";
import {muiTheme} from "./mui-theme";

function App() {
    const {spots, addSpot} = useSpots()
    const {registerUser, loggedInUser, login, logout, edit, deletee} = useUser();

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route element={<Homepage handleAddSpot={addSpot}
                                              spots={spots}/>}
                           path={"/"}/>

                    <Route element={<TitleBarRoutes/>}>
                        <Route element={<Profile handleDeleteUser={deletee}
                                                 handleEditUser={edit}
                                                 handleLogout={logout}
                                                 loggedInUser={loggedInUser}/>}
                               path={"/profile"}/>
                        <Route element={<Login loggedInUser={loggedInUser}
                                               handleLoginRequest={login}/>}
                               path={"/login"}/>
                        <Route element={<Register loggedInUser={loggedInUser}
                                                  handleRegisterUser={registerUser}/>}
                               path={"/register"}/>
                        <Route element={<SpotList spots={spots}/>}
                               path={"/spots"}/>
                        <Route element={<SpotDetail/>}
                               path={"/spots/:id/details"}/>
                    </Route>
                </Routes>
                <BottomNavigationBar/>
            </BrowserRouter>

        </ThemeProvider>

    )
}

export default App;
