import {AlertColor} from "@mui/material";

export interface AlertModel {
    severity: AlertColor
    alertMessage: string
    open: boolean
}