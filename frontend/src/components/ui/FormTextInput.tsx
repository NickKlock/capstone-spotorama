import {Control, Controller, FieldErrors, RegisterOptions} from "react-hook-form";
import {TextField} from "@mui/material";
import {UserFormInputs} from "../../models/UserFormInputs";

interface FormTextInputProps {
    required: boolean;
    name: string,
    control: Control,
    label: string
    rules: RegisterOptions
    editable: boolean
}

export default function FormTextInput(props: FormTextInputProps) {
    const userFormInputsKey = props.name as keyof FieldErrors<UserFormInputs>
    return (
        <Controller
            render={({field: {onChange, value}, fieldState: {error}, formState}) =>
                <TextField
                    label={props.label}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    helperText={error ? formState.errors[userFormInputsKey]?.message as string : null}
                    disabled={!props.editable}
                    required={props.required}
                />}
            name={props.name}
            rules={props.rules}
            control={props.control}
        />
    )
}