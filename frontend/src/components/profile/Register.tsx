import {Box, Button, FormControl, List, ListItem, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {UserAuth} from "../../models/User";
import {PersonAdd} from "@mui/icons-material";
import useUser from "../../hooks/useUser";

export default function Register() {
    const initialNewUser: UserAuth = {
        author: {
            createdSpots: [],
            firstName: "",
            lastName: "",
            nickname: ""
        },
        password: "",
        username: ""
    }

    const [newUser, setNewUser] = useState<UserAuth>(initialNewUser)
    const {registerUser} = useUser()

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
        registerUser(newUser)
    }

    return (
        <Box flexWrap={"wrap"}
             display={"flex"}
             justifyContent={"space-between"}
             alignItems={"center"}
             flexDirection={"column"}>

            <Typography textAlign={"center"} variant={"h6"}>Register a new account</Typography>

            <form>
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

                    <ListItem>
                        <FormControl fullWidth={true} margin={"dense"}>
                            <TextField name={"nickname"} type={"text"} label={"Displayed Name"}
                                       onChange={handleAuthorObjectInputChanges}/>
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <FormControl fullWidth={true} margin={"dense"}>
                            <TextField name={"firstName"} type={"text"} label={"Name"}
                                       onChange={handleAuthorObjectInputChanges}/>
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <FormControl fullWidth={true} margin={"dense"}>
                            <TextField name={"lastName"} type={"text"} label={"Last name"}
                                       onChange={handleAuthorObjectInputChanges}/>
                        </FormControl>
                    </ListItem>
                </List>
            </form>
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