import {Box, Button, FormControl, List, ListItem, TextField, Typography} from "@mui/material";
import CustomListItemTextInput from "../ui/CustomListItemTextInput";
import {UserRequest, UserSpot} from "../../models/User";
import {ChangeEvent, ReactNode, useState} from "react";

type RegisterProps = {
    loggedInUser: UserSpot
    formTitle: string
    buttonIcon: ReactNode
    buttonText: string
    color?: "secondary" | "success" | "inherit" | "warning" | "error" | "primary" | "info"
    handleButtonClick(userRequestForm: UserRequest): void
    editable: boolean
}

export default function UserForm(props: RegisterProps) {
    let authorInputFields = [
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
    ]
    let userRequest: UserRequest = {
        author: {
            createdSpots: [],
            firstName: "",
            lastName: "",
            nickname: ""
        },
        password: "",
        username: ""
    }

    if (props.loggedInUser.username !== "anonymousUser") {
        userRequest.author = props.loggedInUser.author
        userRequest.username = props.loggedInUser.username
        userRequest.password = "********"

        authorInputFields[0].value = userRequest.author.nickname
        authorInputFields[1].value = userRequest.author.firstName
        authorInputFields[2].value = userRequest.author.lastName
    }

    const [userRequestForm, setUserRequestForm] = useState<UserRequest>(userRequest)

    function handleUserObjectInputChanges(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserRequestForm({...userRequestForm, [event.target.name]: event.target.value})
    }

    function handleAuthorObjectInputChanges(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUserRequestForm(newUser => ({
            ...newUser,
            author: {
                ...newUser.author,
                [event.target.name]: event.target.value
            }
        }))
    }


    function handleRegisterUser() {
        props.handleButtonClick(userRequestForm)
    }

    return (
        <Box flexWrap={"wrap"}
             display={"flex"}
             justifyContent={"space-between"}
             alignItems={"center"}
             flexDirection={"column"}
             marginTop={10}
        >

            <Typography textAlign={"center"} variant={"h6"}>{props.formTitle}</Typography>

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