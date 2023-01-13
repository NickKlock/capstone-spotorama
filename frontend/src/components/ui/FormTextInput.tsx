import {Controller, RegisterOptions, useFormContext} from "react-hook-form";
import {TextField} from "@mui/material";
import {SpotFormInputs, UserFormInputs} from "../../models/FormInputTypes";

interface FormTextInputProps {
    required: boolean;
    name: "username" | "password" | "author" | "author.nickname" | "author.firstName" | "author.lastName" | "author.createdSpots" | "name"
    label: string
    rules?: RegisterOptions
    editable: boolean
    inputType: string
}

export default function FormTextInput(props: FormTextInputProps) {
    const {control, register} = useFormContext();

    const userFormInputsKey = props.name as keyof UserFormInputs | SpotFormInputs

    return (
        <Controller
            render={({field: {onChange, value}, fieldState: {error}, formState}) =>
                <TextField
                    {...register(props.name)}
                    label={props.label}
                    error={!!error}
                    onChange={onChange}
                    type={props.inputType}
                    value={value}
                    // @ts-ignore
                    helperText={error ? formState.errors[userFormInputsKey]?.message as string : null}
                    disabled={!props.editable}
                    required={props.required}
                />}
            name={props.name}
            rules={props.rules}
            control={control}
        />
    )
}