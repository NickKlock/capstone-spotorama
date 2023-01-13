import {Controller, RegisterOptions, useFormContext} from "react-hook-form";
import {Box, FormHelperText, Slider} from "@mui/material";
import {Spot} from "../../models/Spot";

type FormSliderProps = {
    name: string
    minValue: number
    maxValue: number
    defaultValue: number
    step: number
    marks: { value: number; label: string; }[]
    rules?: RegisterOptions

}
export default function FormSlider(props: FormSliderProps) {
    const {control, register} = useFormContext();
    const userFormInputsKey = props.name as keyof Spot

    return (
        <Controller render={({field: {onChange, value}, fieldState: {error}, formState}) =>
            <Box marginTop={1} width={"100%"}>
                <Slider
                    {...register(props.name)}
                    name={props.name}
                    value={value}
                    onChange={onChange}
                    min={props.minValue}
                    max={props.maxValue}
                    defaultValue={props.defaultValue}
                    step={props.step}
                    valueLabelDisplay={"off"}
                    marks={props.marks}/>
                <FormHelperText>{error ? formState.errors[userFormInputsKey]?.message as string : null}</FormHelperText>
            </Box>}
                    rules={props.rules}
                    control={control}
                    name={props.name}/>
    )
}