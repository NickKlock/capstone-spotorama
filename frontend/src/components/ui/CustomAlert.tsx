import {Alert, AlertColor, Fade, Snackbar} from "@mui/material";

type CustomAlertProps = {
    severity: AlertColor | undefined
    alertMessage: string
    open: boolean
}
export default function CustomAlert(props: CustomAlertProps) {


    return (
        <Snackbar open={props.open} autoHideDuration={6000}>
            <Fade>
                <Alert variant={"outlined"}
                       severity={props.severity}
                       sx={{width: "100%"}}>
                    {props.alertMessage}
                </Alert>
            </Fade>

        </Snackbar>);
}