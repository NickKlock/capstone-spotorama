import {Box, Button} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import UserForm from "./UserForm";
import {Save} from "@mui/icons-material";
import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

type ProfileProps = {
    loggedInUser: UserSpot
    handleLogout(): Promise<void>
    handleDeleteUser(id: String): Promise<void>
    handleEditUser(userRequest: UserRequest): Promise<void>
}
export default function Profile(props: ProfileProps) {
    const navigate = useNavigate()
    const [enableEdit, setEnableEdit] = useState<boolean>(false)


    function handleEditUser(userRequest: UserRequest) {
        props.handleEditUser(userRequest)
            .then(() => setEnableEdit(false))
    }

    function handleEditButtonClick() {
        setEnableEdit(!enableEdit)
    }

    function handleLogout() {
        props.handleLogout()
            .then(() => navigate("/"))
    }

    function handleDelete() {
        props.handleDeleteUser(props.loggedInUser.id)
            .then(() => navigate("/"))
    }

    return (
        props.loggedInUser.username !== "anonymousUser" ?
            <Box>
                <UserForm loggedInUser={props.loggedInUser}
                          editable={enableEdit}
                          formTitle={"Profile"}
                          buttonIcon={<Save/>}
                          buttonText={"Save"}
                          onFormButtonClick={handleEditUser}
                          marginTop={2}
                          showEditButton={true}
                          onEditButtonClick={handleEditButtonClick}
                />
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

            </Box> : <Navigate to={"/login"}/>
    )

}