import {Controller, RegisterOptions, useFormContext} from "react-hook-form";
import CustomSelect from "../custom-mui-components/CustomSelect";
import {Spot} from "../../../models/Spot";

type FormSelectProps = {
    required: boolean;
    name: string
    label: string
    rules?: RegisterOptions
    data: string[]
}
export default function FormSelect(props: FormSelectProps) {
    const {control, register} = useFormContext();

    const spotFormInputKey = props.name as keyof Spot

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