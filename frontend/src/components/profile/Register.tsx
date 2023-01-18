import {Box} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import {PersonAdd} from "@mui/icons-material";
import {Navigate} from "react-router-dom";
import UserForm from "./UserForm";
import {useState} from "react";
import {AlertModel} from "../../models/AlertModel";
import CustomAlert from "../ui/custom-mui-components/CustomAlert";
import {AxiosError} from "axios";
import useNavigationWithAlert from "../../hooks/useNavigationWithAlert";

type RegisterProps = {
    handleRegisterUser(newUser: UserRequest): Promise<void>
    loggedInUser: UserSpot
}

export default function Register(props: RegisterProps) {
    const [alert, setAlert] = useState<AlertModel>({
        alertMessage: "",
        open: false,
        severity: "success"
    })
    const {setNavigateWithAlert, setNavigationAlert, setNavigationUrl} = useNavigationWithAlert();


    function handleRegisterUser(userRequest: UserRequest) {
        props.handleRegisterUser(userRequest)
            .then(() => {
                setNavigateWithAlert(true)
                setNavigationUrl("/login")
                setNavigationAlert({
                    open: true,
                    severity: "success",
                    alertMessage: "Successfully created your account."
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
            })
    }

    function handleClose() {
        setAlert({...alert, open: false})
    }

    return (
        props.loggedInUser.username === "anonymousUser" ?
            <Box>
                <UserForm loggedInUser={props.loggedInUser}
                          formTitle={"Register a new account"}
                          editable={true}
                          buttonIcon={<PersonAdd/>}
                          buttonText={"Register"}
                          onFormButtonClick={handleRegisterUser}
                          showEditButton={false}
                          marginTop={10}
                          displayAvatarMode={"register"}
                />
                <CustomAlert severity={alert.severity} alertMessage={alert.alertMessage} open={alert.open}
                             onClose={handleClose}/>
            </Box> : <Navigate to={"/"}/>
    )
}