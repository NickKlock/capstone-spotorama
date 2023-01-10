import {Box, SpeedDial, SpeedDialAction} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import UserForm from "./UserForm";
import {DeleteForever, Logout, ManageAccounts, Save} from "@mui/icons-material";
import {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {AlertModel} from "../../models/AlertModel";
import CustomAlert from "../ui/CustomAlert";
import {AxiosError} from "axios";
import ConfirmationModal from "../ui/ConfirmationModal";

type ProfileProps = {
    loggedInUser: UserSpot
    handleLogout(): Promise<void>
    handleDeleteUser(id: string): Promise<void>
    handleEditUser(userRequest: UserRequest): Promise<void>
}
export default function Profile(props: ProfileProps) {
    const navigate = useNavigate()
    const [enableEdit, setEnableEdit] = useState<boolean>(false)
    const [alert, setAlert] = useState<AlertModel>({alertMessage: "", open: false, severity: "success"})
    const [showModal, setShowModal] = useState<boolean>(false)

    function handleEditUser(userRequest: UserRequest) {
        props.handleEditUser(userRequest)
            .then(() => {
                setEnableEdit(false)
                setAlert({...alert, open: true, alertMessage: "Successfully edited yourself"})
            }).catch((error: AxiosError) => {
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

    function handleEditButtonClick() {
        setEnableEdit(!enableEdit)
    }

    function handleLogout() {
        props.handleLogout()
            .then(() => navigate("/"))
    }

    function handleDelete() {
        setShowModal(true)
    }

    function handleAlertClose() {
        setAlert({...alert, open: false})
    }

    function handleModalButtonClick(role: string) {
        switch (role) {
            case "confirm":
                props.handleDeleteUser(props.loggedInUser.id)
                    .then(() => navigate("/"))

                setShowModal(false)
                break
            case "cancel":
                setShowModal(false)
                break
        }
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
                <CustomAlert severity={alert.severity} alertMessage={alert.alertMessage} open={alert.open}
                             onClose={handleAlertClose}/>
                <ConfirmationModal open={showModal}
                                   title={"Are you sure?"}
                                   description={"Do you really want to delete your account?"}
                                   onButtonClick={handleModalButtonClick}/>

            </Box> : <Navigate to={"/login"}/>
    );

}