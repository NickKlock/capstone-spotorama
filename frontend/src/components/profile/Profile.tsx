import {Box, Button, IconButton} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import UserForm from "./UserForm";
import {Edit, Save} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

type ProfileProps = {
    loggedInUser: UserSpot
    handleLogout(): Promise<void>
    handleDeleteUser(): Promise<void>
    handleEditUser(): Promise<void>
}
export default function Profile(props: ProfileProps) {
    const navigate = useNavigate()
    const [enableEdit, setEnableEdit] = useState<boolean>(false)


    function handleEditUser(userRequest: UserRequest) {

    }

    function handleEditButton() {
        setEnableEdit(!enableEdit)
    }

    function handleLogout() {
        props.handleLogout()
        // .then(() => navigate("/"))
    }

    function handleDelete() {
        props.handleDeleteUser()
    }

    return (
        <Box>
            <UserForm loggedInUser={props.loggedInUser}
                      editable={enableEdit}
                      formTitle={"Profile"}
                      buttonIcon={<Save/>}
                      buttonText={"Save"}
                      handleButtonClick={handleEditUser}/>
            <IconButton size={"small"} onClick={handleEditButton}>
                <Edit/>
            </IconButton>
            <Button variant={"contained"}
                    color={"warning"}
                    onClick={handleLogout}
            >
                Logout
            </Button>

            <Button variant={"contained"}
                    color={"error"}
                    onClick={handleDelete}
            >
                Delete
            </Button>

        </Box>
    )

}