import {FormControl, ListItem, TextField} from "@mui/material";
import {ChangeEvent} from "react";

type CustomListItemProps = {
    name: string
    label: string
    onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
    value?: string
}
export default function CustomListItemTextInput(props: CustomListItemProps) {


    function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        props.onChange(event)
    }

    return (
        <ListItem>
            <FormControl fullWidth={true} margin={"dense"}>
                <TextField name={props.name}
                           type={"text"}
                           label={props.label}
                           value={props.value}
                           onChange={onChange}/>
            </FormControl>
        </ListItem>
    )
}