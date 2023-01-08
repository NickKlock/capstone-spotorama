import {Box, IconButton, Link, TextField, Typography} from "@mui/material";
import {UserLoginRequest, UserSpot} from "../../models/User";
import {LoginSharp} from "@mui/icons-material";
import {ChangeEvent, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

type LoginProps = {
    handleLoginRequest(userLoginRequest: UserLoginRequest): Promise<void>
    loggedInUser: UserSpot
}
export default function Login(props: LoginProps) {
    const navigate = useNavigate()

    const [userLoginRequest, setUserLoginRequest] = useState<UserLoginRequest>(
        {
            username: "",
            password: ""
        })

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserLoginRequest({...userLoginRequest, [event.target.name]: event.target.value})
    }

    function handleLogin() {
        props.handleLoginRequest(userLoginRequest).then(() => navigate("/"))
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


            </Box> : <Navigate to={"/profile"}/>
    )
}