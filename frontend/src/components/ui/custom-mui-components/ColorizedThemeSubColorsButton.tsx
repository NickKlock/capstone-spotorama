import {Button, styled} from "@mui/material";

type ColorizedThemSubTypesButtonProps = {
    variant: "dark" | "light" | "main"
    palletColor: "primary" | "secondary" | "error" | "warning" | "info" | "success"
    onClick(): void
    text: string
}
export default function ColorizedThemeSubColorsButton(props: ColorizedThemSubTypesButtonProps) {

    const ColorButton = styled(Button)(({theme}) => ({
        backgroundColor: theme.palette[props.palletColor][props.variant],
        '&:hover': {
            backgroundColor: theme.palette[props.palletColor][props.variant],
        }
    }));

    return (
        <ColorButton onClick={props.onClick}>{props.text}</ColorButton>
    )

}