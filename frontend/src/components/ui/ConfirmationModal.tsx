import {Box, Button, ButtonGroup, Fade, Modal, Typography} from "@mui/material";
import {MouseEventHandler} from "react";

type ConfirmationModalProps = {
    open: boolean
    title?: string
    description?: string
    onButtonClick(role: string): void
}
export default function ConfirmationModal(props: ConfirmationModalProps) {

    // @ts-ignore
    function onButtonClick(event: MouseEventHandler<HTMLButtonElement, MouseEvent>) {
        props.onButtonClick(event.target.name)
    }

    return (
        <Modal open={props.open}>
            <Fade in={props.open}>
                <Box sx={{
                    borderRadius: 2,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "60%",
                    backgroundColor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>

                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                        {props.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2, mb: 2}}>
                        {props.description}
                    </Typography>
                    <ButtonGroup orientation={"horizontal"}
                                 fullWidth={true}
                                 variant={"contained"}>
                        <Button name={"confirm"} id={"confirm"} color={"success"}
                                onClick={onButtonClick}> Confirm</Button>
                        <Button name={"cancel"} id={"confirm"} color={"error"} onClick={onButtonClick}> Cancel</Button>
                    </ButtonGroup>

                </Box>
            </Fade>

        </Modal>)
}