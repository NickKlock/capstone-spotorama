import {
    Box,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {beachtypes, disciplines, wavetypes} from "../statics/Statics";
import {useState} from "react";
import CustomSelect from "./ui/CustomSelect";
import {Spot} from "../models/Spot";

export const emptySpot:Spot = {
    id:"",
    name:"empty",
    disciplines:[],
    wavetypes:[],
    beachtypes:[],
    experiencesLevel:[],
    hazards:[],
    bestMonths:[],
    bestDirections:[],
}
export default function AddSpot() {
    const [newSpot, setNewSpot] = useState<Spot>(emptySpot);

    function handleInputChange(event: SelectChangeEvent<string[] | string>){
        setNewSpot({...newSpot, [event.target.name]: event.target.value})
    }

    return (
        <Box flexWrap={"wrap"}
             display={"flex"}
             justifyContent={"space-between"}
             alignItems={"center"}
             flexDirection={"column"}>
            <Typography textAlign={"center"} variant={"h6"}>Create a new spot</Typography>
            <Box
                component={"form"}
                noValidate
                flexWrap={"wrap"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={"column"}
                width={"80%"}
            >
                <TextField id={"name"} type={"text"} label={"Spotname"}></TextField>

                <CustomSelect
                    fieldName={"disciplines"}
                    label={"Disciplines"}
                    selectedValue={newSpot.disciplines}
                    data={disciplines}
                    handleSelectChange={handleInputChange}
                />

                <CustomSelect
                    fieldName={"wavetypes"}
                    selectedValue={newSpot.wavetypes}
                    data={wavetypes}
                    label={"Wavetype"}
                    handleSelectChange={handleInputChange}
                />

                <CustomSelect
                    fieldName={"beachtypes"}
                    selectedValue={newSpot.beachtypes}
                    data={beachtypes}
                    label={"Beach"}
                    handleSelectChange={handleInputChange}
                />



            </Box>
        </Box>)
}