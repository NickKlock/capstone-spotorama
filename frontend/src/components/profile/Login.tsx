import {Box, IconButton, Link, TextField, Typography} from "@mui/material";
import {UserLoginRequest, UserSpot} from "../../models/User";
import {LoginSharp} from "@mui/icons-material";
import {ChangeEvent, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {AlertModel} from "../../models/AlertModel";
import CustomAlert from "../ui/custom-mui-components/CustomAlert";
import {AxiosError} from "axios";

type LoginProps = {
    handleLoginRequest(userLoginRequest: UserLoginRequest): Promise<void>
    loggedInUser: UserSpot
}
export default function Login(props: LoginProps) {
    const [userLoginRequest, setUserLoginRequest] = useState<UserLoginRequest>({username: "", password: ""})
    const [alert, setAlert] = useState<AlertModel>({alertMessage: "", open: false, severity: "success"})
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setAlert(location.state)
        }
    }, [location.state])

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserLoginRequest({...userLoginRequest, [event.target.name]: event.target.value})
    }

    function handleLogin() {
        props.handleLoginRequest(userLoginRequest)
            .then(() => {
                setAlert({
                    severity: "success",
                    alertMessage: "Successfully logged in",
                    open: true
                })
            })
            .catch((error: AxiosError) => {
                if (!error.response) {
                    setAlert({
                        ...alert,
                        severity: "error",
                        alertMessage: "An error occurred, please report to the admin ",
                        open: true
                    })
                }
                if (error.response!.status === 401) {
                    setAlert({
                        ...alert,
                        severity: "error",
                        alertMessage: "Bad Login credentials",
                        open: true
                    })
                }
            })
    }

    function handleAlertClose() {
        setAlert({...alert, open: false})
    }

    return (
        props.loggedInUser.username === "anonymousUser" ?
            <Box flexDirection={"column"}
                 display={"grid"}
                 flexWrap={"wrap"}
                 justifyContent={"center"}
                 marginTop={"65px"}>

                <Typography variant={"h4"} textAlign={"center"} sx={{mb: 5}}>Login</Typography>

                <TextField name={"username"}
                           onChange={handleInputChange}
                           value={userLoginRequest.username}
                           placeholder={"Hi, dude"}/>

                <TextField name={"password"}
                           type={"password"}
                           onChange={handleInputChange}
                           value={userLoginRequest.password}
                           placeholder={"****"}/>

                <IconButton onClick={handleLogin} color={"secondary"}>
                    <LoginSharp/>
                </IconButton>
                <Link href={"/register"} underline={"hover"}>
                    {"Register an account"}
                </Link>
                <CustomAlert severity={alert.severity} alertMessage={alert.alertMessage} open={alert.open}
                             onClose={handleAlertClose}/>


            </Box> : <Navigate to={"/profile"} state={alert}/>
    )
}