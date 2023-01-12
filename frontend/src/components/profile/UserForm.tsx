import {Box, Button, List, ListItem, Typography} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import {ReactNode, useMemo} from "react";
import {RegisterOptions, useForm} from "react-hook-form";
import FormTextInput from "../ui/FormTextInput";
import {UserFormInputs} from "../../models/UserFormInputs";

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
}

interface IInputFields {
    name: "username" | "password" | "author" | "author.nickname" | "author.firstName" | "author.lastName" | "author.createdSpots",
    label: string,
    editable: boolean,
    required: boolean,
    rules?: RegisterOptions
}

export default function UserForm(props: UserFormProps) {

    const inputFields: IInputFields[] = useMemo(() => [
        {
            name: "username",
            label: "E-Mail address",
            editable: true,
            required: true,
            rules: {
                required: "This field is required",
                pattern: {
                    message: "This is not a valid e-mail address.",
                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
                }
            }
        },
        {
            name: "password",
            label: "Password",
            editable: true,
            required: true,
            rules: {
                required: "This field is required",
                minLength: {
                    message: "Password is to short.",
                    value: 6
                },
                maxLength: {
                    message: "Password is to long",
                    value: 12
                },
                pattern: {
                    message: "Your password is to weak.",
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm
                }
            }
        },
        {
            name: "author.nickname",
            label: "Displayed name",
            editable: true,
            required: true,
            rules: {
                required: "This field is required"
            }
        },
        {
            name: "author.firstName",
            label: "Name",
            editable: true,
            required: true,
            rules: {
                required: "This field is required"
            }
        },
        {
            name: "author.lastName",
            label: "Lastname",
            editable: true,
            required: true,
            rules: {
                required: "This field is required"
            }
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
            initialUserRequest.author = props.loggedInUser.author
        }
    }, [initialUserRequest, props.loggedInUser.author, props.loggedInUser.username])

    const {handleSubmit, control, reset} = useForm<UserFormInputs>({
        defaultValues: {
            username: initialUserRequest.username,
            password: initialUserRequest.password,
            author: initialUserRequest.author
        }
    });

    function onSubmit(data: UserFormInputs) {
        props.onFormButtonClick(data as UserRequest)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
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
                </Box>

                <List>
                    {inputFields.map((inputField) =>
                        <ListItem key={"listItem-" + inputField.name}>
                            <FormTextInput required={inputField.required}
                                           key={inputField.name}
                                           name={inputField.name}
                                           control={control}
                                           label={inputField.label}
                                           rules={inputField.rules}
                                           editable={inputField.editable}/>
                        </ListItem>)}

                </List>
                <Button
                    type={"submit"}
                    color={props.color}
                    startIcon={props.buttonIcon}
                    variant={"contained"}
                >
                    {props.buttonText}
                </Button>

            </Box>
        </form>

    )
}