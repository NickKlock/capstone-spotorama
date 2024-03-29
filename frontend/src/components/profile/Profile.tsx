import {Box, SpeedDial, SpeedDialAction} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import UserForm from "./UserForm";
import {DeleteForever, EditAttributes, Logout, ManageAccounts, Save} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {AlertModel} from "../../models/AlertModel";
import CustomAlert from "../ui/custom-mui-components/CustomAlert";
import {AxiosError} from "axios";
import ConfirmationModal from "../ui/custom-mui-components/ConfirmationModal";
import useNavigationWithAlert from "../../hooks/useNavigationWithAlert";

type ProfileProps = {
    loggedInUser: UserSpot
    handleLogout(): Promise<void>
    handleDeleteUser(id: string): Promise<void>
    handleEditUser(id: string, userRequest: UserRequest): Promise<void>
}
export default function Profile(props: ProfileProps) {
    const [enableEdit, setEnableEdit] = useState<boolean>(false)
    const [alert, setAlert] = useState<AlertModel>({alertMessage: "", open: false, severity: "info"})
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [editedUser, setEditedUser] = useState<UserRequest>()
    const {setNavigateWithAlert, setNavigationAlert, setNavigationUrl} = useNavigationWithAlert();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setAlert(location.state)
        }
    }, [location.state])

    function handleEditUser(userRequest: UserRequest) {
        setEditedUser(userRequest)
        setShowEditModal(true)
    }

    function handleEditButtonClick() {
        setEnableEdit(!enableEdit)
    }

    function handleLogout() {
        props.handleLogout()
            .then(() => {
                setNavigationUrl("/")
                setNavigationAlert({
                    severity: "success",
                    open: true,
                    alertMessage: "Successfully logged you out."
                })
                setNavigateWithAlert(true)
            })
    }

    function handleDelete() {
        setShowDeleteModal(true)
    }

    function handleAlertClose() {
        setAlert({...alert, open: false})
    }

    function handleDeleteModalButtonClick(role: string) {
        switch (role) {
            case "confirm":
                props.handleDeleteUser(props.loggedInUser.id)
                    .then(() => {
                        setNavigationUrl("/")
                        setNavigationAlert({
                            severity: "success",
                            open: true,
                            alertMessage: "Successfully deleted your account."
                        })
                        setNavigateWithAlert(true)
                    })

                setShowDeleteModal(false)
                break
            case "cancel":
                setAlert({...alert, severity: "info", alertMessage: "Canceled the edit process", open: true})
                setShowDeleteModal(false)
                break
        }
    }

    function handleEditModalButtonClick(role: string) {
        switch (role) {
            case "confirm":
                if (editedUser) {
                    props.handleEditUser(props.loggedInUser.id, editedUser)
                        .then(() => {
                            setEnableEdit(false)
                            setAlert({
                                ...alert,
                                severity: "success",
                                open: true,
                                alertMessage: "Successfully edited yourself."
                            })
                        }).catch((error: AxiosError) => {
                        if (!error.response) {
                            setAlert({
                                ...alert,
                                severity: "error",
                                alertMessage: "An error occurred, please report to the admin.",
                                open: true
                            })
                        }
                    })
                }
                setShowEditModal(false)
                setAlert({
                    ...alert,
                    severity: "error",
                    alertMessage: "An error occurred, please report to the admin.",
                    open: true
                })
                break
            case "cancel":
                setShowEditModal(false)
                setAlert({...alert, severity: "info", alertMessage: "Canceled the edit process", open: true})
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
                          marginTop={10}
                          showEditButton={true}
                          displayAvatarMode={"profile"}
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
                                     tooltipOpen={true}
                                     onClick={handleLogout}/>

                    <SpeedDialAction key={"delete"}
                                     icon={<DeleteForever/>}
                                     tooltipTitle={"Delete"}
                                     sx={{color: "#E53935"}}
                                     tooltipOpen={true}
                                     onClick={handleDelete}/>

                    <SpeedDialAction key={"edit"}
                                     icon={<EditAttributes/>}
                                     tooltipTitle={"Edit"}
                                     tooltipOpen={true}
                                     onClick={handleEditButtonClick}/>

                </SpeedDial>

                <CustomAlert severity={alert.severity} alertMessage={alert.alertMessage} open={alert.open}
                             onClose={handleAlertClose}/>

                <ConfirmationModal open={showDeleteModal}
                                   title={"Are you sure?"}
                                   description={"Do you really want to delete your account?"}
                                   onButtonClick={handleDeleteModalButtonClick}/>

                <ConfirmationModal open={showEditModal}
                                   title={"Are you sure?"}
                                   description={"Do you really want to edit your account?"}
                                   onButtonClick={handleEditModalButtonClick}/>

            </Box> : <Navigate to={"/login"}/>
    );

}