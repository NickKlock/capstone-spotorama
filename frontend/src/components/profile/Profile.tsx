import {Box} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import {useState} from "react";

type ProfileProps = {
    loggedInUser: UserSpot
    handleLogout(): Promise<void>
    handleDeleteUser(): Promise<void>
    handleEditUser(): Promise<void>
}
export default function Profile(props: ProfileProps) {
    const [currentUser, setCurrentUser] = useState<UserRequest>(props.loggedInUser)

    return (<Box>

    </Box>)
}