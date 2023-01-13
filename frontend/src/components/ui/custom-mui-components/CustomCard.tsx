import {Avatar, Box, IconButton, Paper, Typography} from "@mui/material";
import {ArrowRight} from "@mui/icons-material";

type CustomCardProps={
    onClick(): void;
    subtitle: string;
    avatarLetter:string
    title:string
}
export default function CustomCard(props:CustomCardProps) {

    function onClick() {
        props.onClick()
    }

    return (<Paper elevation={8} sx={{borderRadius: 5}}>
            <Box display={"flex"}
                 alignItems={"center"}
                 padding={2}
            >
                <Box
                    marginRight={2}
                >
                    <Avatar>{props.avatarLetter}</Avatar>
                </Box>
                <Box flexDirection={"column"}>
                    <Typography
                        fontSize={""}
                    >{props.title}
                    </Typography>

                    <Typography variant={"subtitle1"} color={"grey"} fontSize={""}>
                        {props.subtitle}
                    </Typography>
                </Box>

                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"end"}
                    flexDirection={"column"}
                    marginLeft={"auto"}
                >
                    <IconButton onClick={onClick}>
                        <ArrowRight/>
                    </IconButton>
                </Box>
            </Box>
        </Paper>

    )
}