import {Alert, AlertColor, Fade, Snackbar} from "@mui/material";

type CustomAlertProps = {
    severity: AlertColor | undefined
    alertMessage: string
    open: boolean
    onClose(): void
}
export default function CustomAlert(props: CustomAlertProps) {
    function handleClose() {
        props.onClose()
    }

    return (
        <Snackbar open={props.open}
                  onClose={handleClose}
                  autoHideDuration={6000}
                  anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                  sx={{bottom: 80}}
        >
            <Fade>
                <Alert variant={"filled"}
                       severity={props.severity}
                       onClose={handleClose}
                       sx={{width: "100%"}}>
                    {props.alertMessage}
                </Alert>
            </Fade>

        </Snackbar>);
}