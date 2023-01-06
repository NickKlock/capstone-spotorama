import {Box} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import {PersonAdd} from "@mui/icons-material";
import {Navigate, useNavigate} from "react-router-dom";
import UserForm from "./UserForm";

type RegisterProps = {
    handleRegisterUser(newUser: UserRequest): Promise<void>
    loggedInUser: UserSpot
}

export default function Register(props: RegisterProps) {
    const navigate = useNavigate()

    function handleRegisterUser(userRequest: UserRequest) {
        props.handleRegisterUser(userRequest)
            .then(() => navigate("/login"))
    }

    return (
        props.loggedInUser.username === "anonymousUser" ?
            <Box>
                <UserForm loggedInUser={props.loggedInUser}
                          formTitle={"Register a new account"}
                          editable={true}
                          buttonIcon={<PersonAdd/>}
                          buttonText={"Register"}
                          handleButtonClick={handleRegisterUser}/>
            </Box> : <Navigate to={"/"}/>
    )
}