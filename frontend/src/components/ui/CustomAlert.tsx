import {Alert, AlertColor, Fade, Snackbar} from "@mui/material";
import {SyntheticEvent} from "react";

type CustomAlertProps = {
    handleClose(event?: SyntheticEvent | Event, reason?: string): void
    severity: AlertColor | undefined
    alertMessage: string
    open: boolean
}
export default function CustomAlert(props: CustomAlertProps) {
    function handleClose(event?: SyntheticEvent | Event, reason?: string) {
        props.handleClose(event, reason)
    }

    return (
        <Snackbar open={props.open} autoHideDuration={6000}>
            <Fade>
                <Alert onClose={handleClose}
                       variant={"outlined"}
                       severity={props.severity}
                       sx={{width: "100%"}}>
                    {props.alertMessage}
                </Alert>
            </Fade>

        </Snackbar>);
}