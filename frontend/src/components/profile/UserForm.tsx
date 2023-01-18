import {Box, Button, List, ListItem} from "@mui/material";
import {UserRequest, UserSpot} from "../../models/User";
import {ReactNode, useMemo} from "react";
import {Controller, FormProvider, RegisterOptions, useForm} from "react-hook-form";
import FormTextInput from "../ui/form-inputs/FormTextInput";
import ImageSelect from "../ui/custom-mui-components/ImageSelect";

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
    displayAvatarMode: "register" | "profile"
}

type InputFields = {
    name: "username" | "password" | "author" | "author.nickname" | "author.firstName" | "author.lastName" | "author.createdSpots",
    label: string,
    required: boolean,
    rules?: RegisterOptions
    inputType: string
}

export default function UserForm(props: UserFormProps) {

    const inputFields: InputFields[] = useMemo(() => [
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
            },
            inputType: "text"
        },
        {
            name: "password",
            label: "Password",
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
            },
            inputType: "password"

        },
        {
            name: "author.nickname",
            label: "Displayed name",
            required: true,
            rules: {
                required: "This field is required"
            },
            inputType: "text"
        },
        {
            name: "author.firstName",
            label: "Name",
            required: true,
            rules: {
                required: "This field is required"
            },
            inputType: "text"

        },
        {
            name: "author.lastName",
            label: "Lastname",
            required: true,
            rules: {
                required: "This field is required"
            },
            inputType: "text"
        }
    ], [])
    const initialUser = useMemo(() => {
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
            initialUser.author = props.loggedInUser.author
            initialUser.username = props.loggedInUser.username
            initialUser.author = props.loggedInUser.author
        }
    }, [initialUser, props.loggedInUser.author, props.loggedInUser.username])

    const methods = useForm<UserRequest>({
        defaultValues: {
            username: initialUser.username,
            password: initialUser.password,
            author: initialUser.author
        }
    });

    return (
        <FormProvider {...methods}>
            <Box flexWrap={"wrap"}
                 display={"flex"}
                 justifyContent={"space-between"}
                 alignItems={"center"}
                 flexDirection={"column"}
                 marginTop={props.marginTop}
            >

                <List>

                    {props.displayAvatarMode === "register" || props.editable ?
                        <ListItem>
                            <Controller
                                render={({field: {onChange}}) =>
                                    <ImageSelect
                                        onChange={onChange}
                                        name={"avatar"}/>}
                                name={"avatar"}/>
                        </ListItem> :
                        props.loggedInUser.avatarBase64Encoded === null || undefined ?
                            <></> :
                            <ListItem sx={{justifyContent: "center"}}>
                                <Box width={"100px"} height={"100px"} position={"relative"} overflow={"hidden"}
                                     borderRadius={"50%"}>
                                    <img
                                        style={{
                                            display: "inline",
                                            margin: "0 auto",
                                            marginLeft: "-25%",
                                            height: "100%",
                                            width: "auto"
                                        }}
                                        alt={""}
                                        src={`data:image/jpeg;base64,${props.loggedInUser.avatarBase64Encoded}`}/>

                                </Box>
                            </ListItem>
                    }


                    {inputFields.map((inputField) =>
                        <ListItem key={"listItem-" + inputField.name}>
                            <FormTextInput required={inputField.required}
                                           key={inputField.name}
                                           name={inputField.name}
                                           label={inputField.label}
                                           rules={inputField.rules}
                                           inputType={inputField.inputType}
                                           editable={props.editable}/>
                        </ListItem>)}

                </List>
                <Button
                    type={"submit"}
                    disabled={!props.editable}
                    color={props.color}
                    startIcon={props.buttonIcon}
                    variant={"contained"}
                    onClick={methods.handleSubmit(props.onFormButtonClick)}
                >
                    {props.buttonText}
                </Button>

            </Box>
        </FormProvider>


    )
}