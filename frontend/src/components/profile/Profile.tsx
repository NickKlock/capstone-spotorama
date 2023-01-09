import {Box, SpeedDial, SpeedDialAction} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import UserForm from "./UserForm";
import {DeleteForever, Logout, ManageAccounts, Save} from "@mui/icons-material";
import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";

type ProfileProps = {
    loggedInUser: UserSpot
    handleLogout(): Promise<void>
    handleDeleteUser(id: string): Promise<void>
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

                <SpeedDial ariaLabel={"user-actions"}
                           sx={
                               {
                                   position: "absolute",
                                   bottom: 80,
                                   right: 16
                               }}
                           icon={<ManageAccounts/>}>

                    <SpeedDialAction key={"logout"}
                                     icon={<Logout/>}
                                     tooltipTitle={"Logout"}
                                     sx={{color: "#1976D2"}}
                                     onClick={handleLogout}/>

                    <SpeedDialAction key={"delete"}
                                     icon={<DeleteForever/>}
                                     tooltipTitle={"Delete your account"}
                                     sx={{color: "#E53935"}}
                                     onClick={handleDelete}/>

                </SpeedDial>


            </Box> : <Navigate to={"/login"}/>
    )

}