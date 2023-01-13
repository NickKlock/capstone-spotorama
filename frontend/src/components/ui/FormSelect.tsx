import {Controller, RegisterOptions, useFormContext} from "react-hook-form";
import {SpotFormInputs} from "../../models/FormInputTypes";
import CustomSelect from "./CustomSelect";

type FormSelectProps = {
    required: boolean;
    name: string
    label: string
    rules?: RegisterOptions
    editable: boolean
    inputType: string
    data: any
}
export default function FormSelect(props: FormSelectProps) {
    const {control, register} = useFormContext();

    const spotFormInputKey = props.name as keyof SpotFormInputs

    return (
        <Controller
            render={({field: {onChange, value}, fieldState: {error}, formState}) =>
                <CustomSelect
                    {...register(props.name)}
                    selectedValue={value}
                    data={props.data}
                    label={props.label}
                    fieldName={props.name}
                    error={error}
                    helperText={error ? formState.errors[spotFormInputKey]?.message as string : null}
                    required={props.required}
                    handleSelectChange={onChange}/>}
            rules={props.rules}
            control={control}
            name={props.name}/>
    )
}