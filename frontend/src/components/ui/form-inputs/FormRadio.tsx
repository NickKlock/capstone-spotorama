import {Controller, RegisterOptions, useFormContext} from "react-hook-form";
import {Spot} from "../../../models/Spot";
import {FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup} from "@mui/material";

type FormRadioProps = {
    label: string
    defaultValue: string
    name: string
    options: string[]
    rules?: RegisterOptions

}
export default function FormRadio(props: FormRadioProps) {
    const {control, register} = useFormContext();

    const spotFormInputKey = props.name as keyof Spot
    return (
        <Controller render={({field: {onChange, value}, fieldState: {error}, formState}) =>
            <FormControl
                {...register(props.name)}
                error={!!error}>
                <FormLabel>{props.label}</FormLabel>
                <RadioGroup defaultValue={props.defaultValue}
                            name={props.name}
                            onChange={onChange}
                            value={value}>
                    {props.options.map((option) =>
                        <FormControlLabel control={<Radio/>} label={option}/>)}
                </RadioGroup>
                <FormHelperText>{error ? formState.errors[spotFormInputKey]?.message as string : null}</FormHelperText>
            </FormControl>}
                    rules={props.rules}
                    control={control}
                    name={props.name}/>
    )
}