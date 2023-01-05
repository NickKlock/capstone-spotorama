import {Box, Button, FormControl, List, ListItem, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {NewUserRequest} from "../../models/User";
import {PersonAdd} from "@mui/icons-material";
import CustomListItemTextInput from "../ui/CustomListItemTextInput";

type RegisterProps = {
    handleRegisterUser(newUser: NewUserRequest): void
}

export default function Register(props: RegisterProps) {
    const authorInputFields = [
        {
            name: "nickname",
            label: "Displayed name"
        },
        {
            name: "firstName",
            label: "Name"
        },
        {
            name: "lastName",
            label: "Last name"
        }
    ]

    const initialNewUser: NewUserRequest = {
        author: {
            createdSpots: [],
            firstName: "",
            lastName: "",
            nickname: ""
        },
        password: "",
        username: ""
    }

    const [newUser, setNewUser] = useState<NewUserRequest>(initialNewUser)

    function handleUserObjectInputChanges(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }

    function handleAuthorObjectInputChanges(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setNewUser(newUser => ({
            ...newUser,
            author: {
                ...newUser.author,
                [event.target.name]: event.target.value
            }
        }))
    }

    function handleRegisterUser() {
        props.handleRegisterUser(newUser)
    }

    return (
        <Box flexWrap={"wrap"}
             display={"flex"}
             justifyContent={"space-between"}
             alignItems={"center"}
             flexDirection={"column"}
             marginTop={10}
        >

            <Typography textAlign={"center"} variant={"h6"}>Register a new account</Typography>

            <List>
                <ListItem>
                    <FormControl fullWidth={true} margin={"dense"}>
                        <TextField name={"username"} type={"email"} label={"E-Mail"}
                                   onChange={handleUserObjectInputChanges}/>
                    </FormControl>
                </ListItem>

                <ListItem>
                    <FormControl fullWidth={true} margin={"dense"}>
                        <TextField name={"password"} type={"password"} label={"Password"}
                                   onChange={handleUserObjectInputChanges}/>
                    </FormControl>
                </ListItem>

                {authorInputFields.map((inputField) =>
                    <CustomListItemTextInput name={inputField.name}
                                             label={inputField.label}
                                             onChange={handleAuthorObjectInputChanges}
                                             key={inputField.name}/>)}
            </List>

            <Button
                color={"secondary"}
                startIcon={<PersonAdd/>}
                variant={"contained"}
                onClick={handleRegisterUser}
            >
                Register
            </Button>

        </Box>
    )
}