import {Box} from "@mui/material";
import {UserSpot} from "../../models/User";

type ProfileProps = {
    loggedInUser: UserSpot
    handleLogout(): Promise<void>
    handleDeleteUser(): Promise<void>
    handleEditUser(): Promise<void>
}
export default function Profile(props: ProfileProps) {

    return (<Box>

    </Box>)
}