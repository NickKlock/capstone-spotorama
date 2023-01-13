import {
    Box,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {FieldError} from "react-hook-form";

type CustomSelectProps = {
    selectedValue: string[]
    data: string[]
    label: string
    fieldName: string
    handleSelectChange(event: SelectChangeEvent<string[]>): void;
    error: FieldError | undefined
    helperText: string | null
    required: boolean
}
//error
//helperText
//required
export default function CustomSelect(props: CustomSelectProps) {

    function handleSelectChange(event: SelectChangeEvent<string[]>) {
        props.handleSelectChange(event)
    }

    return (
        <FormControl fullWidth={true}
                     margin={"dense"}>

            <InputLabel required={props.required}>{props.label}</InputLabel>

            <Select
                name={props.fieldName}
                multiple={true}
                input={<OutlinedInput label={props.label}/>}
                value={props.selectedValue}
                onChange={handleSelectChange}
                error={!!props.error}
                renderValue={(selected: string[]) => (
                    <Box display={"flex"} flexWrap={"wrap"} gap={0.5}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
            >
                {props.data.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    )
}