import {Box} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import UserForm from "./UserForm";
import {Edit} from "@mui/icons-material";
import {useState} from "react";

type ProfileProps = {
    loggedInUser: UserSpot
    handleLogout(): Promise<void>
    handleDeleteUser(): Promise<void>
    handleEditUser(): Promise<void>
}
export default function Profile(props: ProfileProps) {

    const [enableEdit, setEnableEdit] = useState<boolean>(false)

    function handleEditUser(userRequest: UserRequest) {

    }

    return (
        <Box>
            <UserForm loggedInUser={props.loggedInUser}
                      editable={enableEdit}
                      formTitle={"Profile"}
                      buttonIcon={<Edit/>}
                      buttonText={"Save"}
                      handleButtonClick={handleEditUser}/>
        </Box>
    )

}