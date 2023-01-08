import {Box, Button, FormControl, IconButton, List, ListItem, TextField, Typography} from "@mui/material";
import CustomListItemTextInput from "../ui/CustomListItemTextInput";
import {UserRequest, UserSpot} from "../../models/User";
import {ChangeEvent, ReactNode, useMemo, useState} from "react";
import {Edit} from "@mui/icons-material";

type UserFormProps = {
    loggedInUser: UserSpot
    formTitle: string
    buttonIcon: ReactNode
    buttonText: string
    color?: "secondary" | "success" | "inherit" | "warning" | "error" | "primary" | "info"
    onFormButtonClick(userRequestForm: UserRequest): void
    editable: boolean
    marginTop: number
    showEditButton: boolean
    onEditButtonClick?(): void
}

export default function UserForm(props: UserFormProps) {

    const authorInputFields = useMemo(() => [
        {
            name: "nickname",
            label: "Displayed name",
            value: ""
        },
        {
            name: "firstName",
            label: "Name",
            value: ""
        },
        {
            name: "lastName",
            label: "Last name",
            value: ""
        }
    ], [])

    const initialUserRequest = useMemo(() => {
        return {
            author: {
                createdSpots: [""],
                firstName: "",
                lastName: "",
                nickname: ""
            },
            password: "",
            username: ""
        }

    }, [])

    useMemo(() => {
        if (props.loggedInUser.username !== "anonymousUser") {
            initialUserRequest.author = props.loggedInUser.author
            initialUserRequest.username = props.loggedInUser.username

            authorInputFields[0].value = initialUserRequest.author.nickname
            authorInputFields[1].value = initialUserRequest.author.firstName
            authorInputFields[2].value = initialUserRequest.author.lastName
        }
    }, [authorInputFields, initialUserRequest, props.loggedInUser.author, props.loggedInUser.username])

    const [userRequestForm, setUserRequestForm] = useState<UserRequest>(initialUserRequest)

    function handleUserObjectInputChanges(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserRequestForm({...userRequestForm, [event.target.name]: event.target.value})
    }

    function handleAuthorObjectInputChanges(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        setUserRequestForm(userRequestForm => ({
            ...userRequestForm,
            author: {
                ...userRequestForm.author,
                [event.target.name]: event.target.value
            }
        }))
        let toEditInputField = authorInputFields.find(inputField => inputField.name === event.target.name)
        if (toEditInputField) {
            toEditInputField.value = event.target.value
        }
    }

    function handleRegisterUser() {
        props.onFormButtonClick(userRequestForm)
    }

    return (
        <Box flexWrap={"wrap"}
             display={"flex"}
             justifyContent={"space-between"}
             alignItems={"center"}
             flexDirection={"column"}
             marginTop={props.marginTop}
        >

            <Box display={"flex"} flexGrow={1}>
                <Typography textAlign={"center"}
                            variant={"h6"}>
                    {props.formTitle}
                </Typography>


                {props.showEditButton &&
                    <IconButton size={"small"}
                                onClick={props.onEditButtonClick && props.onEditButtonClick}>
                        <Edit/>
                    </IconButton>}

            </Box>


            <List>
                <ListItem>
                    <FormControl fullWidth={true} margin={"dense"}>
                        <TextField name={"username"}
                                   type={"email"}
                                   label={"E-Mail"}
                                   value={userRequestForm.username}
                                   disabled={!props.editable}
                                   onChange={handleUserObjectInputChanges}/>
                    </FormControl>
                </ListItem>

                <ListItem>
                    <FormControl fullWidth={true} margin={"dense"}>
                        <TextField name={"password"}
                                   type={"password"}
                                   label={"Password"}
                                   placeholder={"**********"}
                                   value={userRequestForm.password}
                                   disabled={!props.editable}
                                   onChange={handleUserObjectInputChanges}/>
                    </FormControl>
                </ListItem>

                {authorInputFields.map((inputField) =>
                    <CustomListItemTextInput name={inputField.name}
                                             label={inputField.label}
                                             editable={props.editable}
                                             onChange={handleAuthorObjectInputChanges}
                                             value={inputField.value}
                                             key={inputField.name}/>)}
            </List>

            <Button
                color={props.color}
                startIcon={props.buttonIcon}
                variant={"contained"}
                onClick={handleRegisterUser}
            >
                {props.buttonText}
            </Button>

        </Box>
    )
}